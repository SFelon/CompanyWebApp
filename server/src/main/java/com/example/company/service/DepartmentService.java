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

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private ModelMapper modelMapper;

    private DepartmentResponse convertDepartmentToDto(Department department) {
        DepartmentResponse departmentResponse = modelMapper.map(department, DepartmentResponse.class);
        return departmentResponse;
    }

    private Sort sortByNameAsc() {
        return new Sort(Sort.Direction.ASC, "departmentName");
    }

    private static final Logger logger = LoggerFactory.getLogger(DepartmentService.class);


    public List<DepartmentResponse> getAllDepartments() {
        List<Department> departments = departmentRepository.findAll(sortByNameAsc());

        if(departments.size() == 0) {
            return new ArrayList<>(Collections.emptyList());
        }

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

    public ResponseEntity<?> updateDepartment(String id, DepartmentRequest departmentRequest) {
        Long idLong = Long.parseLong(id);
        if(!departmentRepository.existsById(idLong)) {
            return new ResponseEntity<>(new ApiResponse(false, "Department with set id does not exist!"),
                    HttpStatus.BAD_REQUEST);
        }
        try {
            Department department = modelMapper.map(departmentRequest, Department.class);
            departmentRepository.save(department);
        } catch (Exception e) {
            return new ResponseEntity<>(new ApiResponse(false, "Could not update department in database!"),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(new ApiResponse(true, "Department deleted successfully!"),
                HttpStatus.OK);
    }

    public ResponseEntity<?> deleteDepartment(String id) {
        Long idLong = Long.parseLong(id);
        if(!departmentRepository.existsById(idLong)) {
            return new ResponseEntity<>(new ApiResponse(false, "Department with set id does not exist!"),
                    HttpStatus.BAD_REQUEST);
        } else if(departmentRepository.countUsersByDepartmentId(idLong) > 0) {
            System.out.println(departmentRepository.countUsersByDepartmentId(idLong));
            return new ResponseEntity<>(new ApiResponse(false, "Cannot delete department with saved employees!"),
                    HttpStatus.BAD_REQUEST);
        }

        try {
            departmentRepository.deleteById(idLong);
        } catch (Exception e) {
            return new ResponseEntity<>(new ApiResponse(false, "Could not delete department from database!"),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(new ApiResponse(true, "Department deleted successfully!"),
                HttpStatus.OK);
    }

    public ResponseEntity<?> getUsersSalaryData(String id) {

        Long idLong = Long.parseLong(id);
        if(!departmentRepository.existsById(idLong)) {
            return new ResponseEntity<>(new ApiResponse(false, "Department with set id does not exist!"),
                    HttpStatus.BAD_REQUEST);
        }

        BigDecimal numberOfUsers = BigDecimal.valueOf(departmentRepository.countUsersByDepartmentId(idLong));

        if(numberOfUsers == null || numberOfUsers.longValue() == 0 ) {
            return ResponseEntity.ok(new DepartmentInfo(Long.valueOf(0), Collections.emptyList(), BigDecimal.valueOf(0),
                    BigDecimal.valueOf(0)));
        }

        List<BigDecimal> listOfSalaries = departmentRepository.getUsersSalaryByDepartment(idLong);
        BigDecimal sumOfSalaries = listOfSalaries.stream().reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal averageSalary = sumOfSalaries.divide(numberOfUsers, RoundingMode.CEILING);

        Collections.sort(listOfSalaries);
        BigDecimal medianSalary = listOfSalaries.get(listOfSalaries.size()/2);
        if (listOfSalaries.size() % 2 == 0) {
            medianSalary = (medianSalary.add(listOfSalaries.get(listOfSalaries.size()/2 - 1)))
                    .divide(BigDecimal.valueOf(2), RoundingMode.CEILING);
        }

        return ResponseEntity.ok(new DepartmentInfo(numberOfUsers.longValue(), listOfSalaries, averageSalary, medianSalary));
    }
}
