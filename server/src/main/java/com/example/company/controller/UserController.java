package com.example.company.controller;

import com.example.company.exception.ResourceNotFoundException;
import com.example.company.model.RoleName;
import com.example.company.model.User;
import com.example.company.payload.HeadsNameResponse;
import com.example.company.payload.UserProfile;
import com.example.company.payload.UserResponse;
import com.example.company.repository.UserRepository;
import com.example.company.security.CurrentUser;
import com.example.company.security.UserPrincipal;

import com.example.company.service.EmployeeService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployeeService employeeService;

    private HeadsNameResponse convertToDto(User user) {
        HeadsNameResponse headNames = modelMapper.map(user, HeadsNameResponse.class);
        return headNames;
    }

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping
    @PreAuthorize("hasAnyRole('ROLE_CEO','ROLE_HEAD','ROLE_EMPLOYEE')")
    public UserResponse getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        UserResponse userResponse = new UserResponse(currentUser.getId(), currentUser.getUsername(),
                currentUser.getAuthorities());
        return userResponse;
    }

    @GetMapping("/{username}")
    @PreAuthorize("hasAnyRole('ROLE_CEO','ROLE_HEAD','ROLE_EMPLOYEE')")
    public ResponseEntity<?> getUserProfile(@PathVariable(value = "username") String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        return employeeService.convertUserToUserDTO(user);
    }

    @GetMapping("/heads")
    @PreAuthorize("hasAnyRole('ROLE_CEO','ROLE_HEAD')")
    public List<HeadsNameResponse> getUserHeads() {
        List<User> heads = userRepository.findAllByRolesName(RoleName.ROLE_HEAD);
        return heads.stream().map(head -> convertToDto(head)).collect(Collectors.toList());
    }

}
