package com.example.company.controller;

import com.example.company.service.EmployeeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/departments")
public class EmployeeController {

    private static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/employees")
    @PreAuthorize("hasAnyRole('ROLE_CEO','ROLE_HEAD')")
    public ResponseEntity<?> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @GetMapping("/{id}/employees")
    @PreAuthorize("hasAnyRole('ROLE_CEO','ROLE_HEAD','ROLE_EMPLOYEE')")
    public ResponseEntity<?> getEmployeesByDepartment(@PathVariable("id") String id) {
        return employeeService.getEmployeesByDepartment(id);
    }
}
