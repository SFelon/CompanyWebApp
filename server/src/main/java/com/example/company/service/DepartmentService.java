package com.example.company.service;

import com.example.company.exception.AppException;
import com.example.company.model.Department;
import com.example.company.model.User;
import com.example.company.payload.*;
import com.example.company.repository.DepartmentRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.URI;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepartmentService {

    private static final Logger logger = LoggerFactory.getLogger(DepartmentService.class);

    private final DepartmentRepository departmentRepository;
    private final ModelMapper modelMapper;

    public DepartmentService(DepartmentRepository departmentRepository, ModelMapper modelMapper) {
        this.departmentRepository = departmentRepository;
        this.modelMapper = modelMapper;
    }

    private DepartmentResponse convertDepartmentToDto(Department department) {
        DepartmentResponse departmentResponse = modelMapper.map(department, DepartmentResponse.class);
        return departmentResponse;
    }

    private Sort sortByNameAsc() {
        return new Sort(Sort.Direction.ASC, "departmentName");
    }

    public List<DepartmentResponse> getAllDepartments() {
        List<Department> departments = departmentRepository.findAll(sortByNameAsc());

        return departments.stream().map(department -> convertDepartmentToDto(department)).collect(Collectors.toList());
    }


    public ResponseEntity<?> addNewDepartment(DepartmentRequest departmentRequest) {
        if(departmentRepository.existsByDepartmentName(departmentRequest.getDepartmentName())) {
            return new ResponseEntity<>(new ApiResponse(false, "Department name already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

        Department department = new Department(departmentRequest.getDepartmentName(),departmentRequest.getCity(),
                departmentRequest.getHeadOfDepartment(), departmentRequest.getMinSalary(), departmentRequest.getMaxSalary());

        Department result = departmentRepository.save(department);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/{id}")
                .buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "Department added successfully"));
    }

    public ResponseEntity<?> updateDepartment(Long id, DepartmentRequest departmentRequest) {
        if(!departmentRepository.existsById(id)) {
            return new ResponseEntity<>(new ApiResponse(false, "Department with set id does not exist!"),
                    HttpStatus.BAD_REQUEST);
        }
        try {
            Department department = modelMapper.map(departmentRequest, Department.class);
            departmentRepository.save(department);
        } catch (Exception e) {
            return new ResponseEntity<>(new ApiResponse(false, "Could not update department in database!"),
                    HttpStatus.EXPECTATION_FAILED);
        }

        return new ResponseEntity<>(new ApiResponse(true, "Department deleted successfully!"),
                HttpStatus.OK);
    }

    public ResponseEntity<?> deleteDepartment(Long id) {
        if(!departmentRepository.existsById(id)) {
            return new ResponseEntity<>(new ApiResponse(false, "Department with set id does not exist!"),
                    HttpStatus.BAD_REQUEST);
        } else if(departmentRepository.countUsersByDepartmentId(id) > 0) {
            return new ResponseEntity<>(new ApiResponse(false, "Cannot delete department with saved employees!"),
                    HttpStatus.BAD_REQUEST);
        }

        //TODO
        try {
            departmentRepository.deleteById(id);
        } catch (Exception e) {
            return new ResponseEntity<>(new ApiResponse(false, "Could not delete department from database!"),
                    HttpStatus.EXPECTATION_FAILED);
        }

        return new ResponseEntity<>(new ApiResponse(true, "Department deleted successfully!"),
                HttpStatus.OK);
    }

    public DepartmentInfo getUsersSalaryData(Long id) {

        if(!departmentRepository.existsById(id)) {
            return new DepartmentInfo(0L, Collections.emptyList(), BigDecimal.valueOf(0),
                    BigDecimal.valueOf(0));
        }

        BigDecimal numberOfUsers = BigDecimal.valueOf(departmentRepository.countUsersByDepartmentId(id));

        if(numberOfUsers == null || numberOfUsers.longValue() == 0 ) {
            return new DepartmentInfo(0L, Collections.emptyList(), BigDecimal.valueOf(0),
                    BigDecimal.valueOf(0));
        }

        List<BigDecimal> listOfSalaries = departmentRepository.getUsersSalaryByDepartment(id);
        BigDecimal sumOfSalaries = listOfSalaries.stream().reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal averageSalary = sumOfSalaries.divide(numberOfUsers, RoundingMode.CEILING);

        Collections.sort(listOfSalaries);
        BigDecimal medianSalary = listOfSalaries.get(listOfSalaries.size()/2);
        if (listOfSalaries.size() % 2 == 0) {
            medianSalary = (medianSalary.add(listOfSalaries.get(listOfSalaries.size()/2 - 1)))
                    .divide(BigDecimal.valueOf(2), RoundingMode.CEILING);
        }

        return new DepartmentInfo(numberOfUsers.longValue(), listOfSalaries, averageSalary, medianSalary);
    }
}
