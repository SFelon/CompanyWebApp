package com.example.company.controller;

import com.example.company.payload.ApiResponse;
import com.example.company.payload.DepartmentInfo;
import com.example.company.payload.DepartmentRequest;
import com.example.company.payload.DepartmentResponse;
import com.example.company.service.DepartmentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    private static final Logger logger = LoggerFactory.getLogger(DepartmentController.class);

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ROLE_CEO','ROLE_HEAD')")
    public List<DepartmentResponse> getAllDepartments() {
        return departmentService.getAllDepartments();
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_CEO')")
    public ResponseEntity<?> registerDepartment(@Valid @RequestBody DepartmentRequest departmentRequest) {
        return departmentService.addNewDepartment(departmentRequest);

    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_CEO')")
    public ResponseEntity<?> updateDepartment(@PathVariable("id") Long id,
                                              @RequestBody DepartmentRequest departmentRequest) {
        return departmentService.updateDepartment(id, departmentRequest);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_CEO')")
    public ResponseEntity<?> deleteDepartment(@PathVariable("id") Long id) {
        return departmentService.deleteDepartment(id);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_CEO','ROLE_HEAD')")
    public ResponseEntity<?> getDepartmentInfo(@PathVariable("id") Long id) {

        DepartmentInfo departmentInfo = departmentService.getUsersSalaryData(id);
        if (departmentInfo.getNumberOfUsers() == 0) {
            return new ResponseEntity<>(new ApiResponse(false, "Department with set id does not exist or does not have active employees!"),
                    HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(departmentInfo);
    }

}