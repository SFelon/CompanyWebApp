package com.example.company.controller;

import com.example.company.exception.AppException;
import com.example.company.model.Department;
import com.example.company.model.Role;
import com.example.company.model.RoleName;
import com.example.company.model.User;
import com.example.company.payload.*;
import com.example.company.repository.DepartmentRepository;
import com.example.company.repository.RoleRepository;
import com.example.company.repository.UserRepository;
import com.example.company.security.JwtTokenProvider;
import com.example.company.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.math.BigDecimal;
import java.net.URI;
import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserService userService;

    @Autowired
    DepartmentRepository departmentRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        /* An Authentication implementation that is designed for simple presentation of a username and password.
         */

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );

        /* public interface SecurityContext
        Interface defining the minimum security information associated with the current thread of execution.
        The security context is stored in a SecurityContextHolder.
        */

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        userService.saveLastLoginDate(loginRequest.getUsernameOrEmail());

        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        if(userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity(new ApiResponse(false, "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

        // Creating user's account
        User user = new User(signUpRequest.getFirstName(), signUpRequest.getLastName(), signUpRequest.getUsername(),
                signUpRequest.getEmail(), signUpRequest.getPassword(), signUpRequest.getPrivatePhone(),
                signUpRequest.getBusinessPhone());

        /*java.lang.String encode(java.lang.CharSequence rawPassword) Encode the raw password.
        Generally, a good encoding algorithm applies a SHA-1 or greater hash combined with an 8-byte or greater
        randomly generated salt.*/

        user.setSalary(BigDecimal.valueOf(500));

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Department userDepartment = departmentRepository.findByDepartmentName(signUpRequest.getDepartmentName())
                .orElseThrow(() -> new AppException("Department does not exist."));

        user.setDepartment(userDepartment);

        Role userRole = roleRepository.findByName(RoleName.ROLE_EMPLOYEE)
                .orElseThrow(() -> new AppException("User Role not set."));

        /*
        java.util.Collections.singleton() method is a java.util.Collections class method. It creates a immutable set over
        a single specified element. An application of this method is to remove an element from Collections like List and Set.
        */
        user.setRoles(Collections.singleton(userRole));

        User result = userRepository.save(user);

        /*
        public class ServletUriComponentsBuilder
        UriComponentsBuilder with additional static factory methods to create links based on the current HttpServletRequest.
        Typical usage involves:
        Create a UriComponentsBuilder with one of the static factory methods (such as fromPath(String) or fromUri(URI))
        Set the various URI components through the respective methods (scheme(String), userInfo(String), host(String),
        port(int), path(String), pathSegment(String...), queryParam(String, Object...), and fragment(String).
        Build the UriComponents instance with the build() method.
         */
        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/users/{username}")
                .buildAndExpand(result.getUsername()).toUri();


        /* ResponseEntity with a CREATED status and a location header set to the given URI.
        return ResponseEntity.created(location).header("MyResponseHeader", "MyValue").body("Hello World");
         */
        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }

    @GetMapping("/checkUsernameAvailability")
    public ResponseEntity<?> checkUsernameAvailability(@RequestParam(value = "username") String username) {
        Boolean isAvailable = !userRepository.existsByUsername(username);
        return ResponseEntity.ok(new UsernameAvailability(isAvailable));
    }

    @GetMapping("/checkEmailAvailability")
    public ResponseEntity<?> checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return ResponseEntity.ok(new UsernameAvailability(isAvailable));
    }

}


