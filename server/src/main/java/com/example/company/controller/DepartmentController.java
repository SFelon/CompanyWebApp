package com.example.company.controller;

import com.example.company.payload.DepartmentRequest;
import com.example.company.payload.DepartmentResponse;
import com.example.company.repository.DepartmentRepository;
import com.example.company.service.DepartmentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    @Autowired
    DepartmentRepository departmentRepository;

    @Autowired
    DepartmentService departmentService;

    private static final Logger logger = LoggerFactory.getLogger(DepartmentController.class);

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
    public ResponseEntity<?> updateDepartment(@PathVariable("id") String id,
                                              @RequestBody DepartmentRequest departmentRequest) {
        return departmentService.updateDepartment(id, departmentRequest);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_CEO')")
    public ResponseEntity<?> deleteDepartment(@PathVariable("id") String id) {
        return departmentService.deleteDepartment(id);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_CEO','ROLE_HEAD')")
    public ResponseEntity<?> getDepartmentInfo(@PathVariable("id") String id) {
        return departmentService.getUsersSalaryData(id);
    }

}