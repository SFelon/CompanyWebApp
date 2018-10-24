package com.example.company.payload;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

public class DepartmentResponse {

    private static final Logger logger = LoggerFactory.getLogger(DepartmentRequest.class);

    @NotBlank
    private Long id;

    @NotBlank
    @Size(min = 3, max = 40)
    private String departmentName;

    @NotBlank
    @Size(min = 3, max = 30)
    private String city;

    @Size(max = 60)
    private String headOfDepartment;

    private int numberOfEmployees;
    private BigDecimal minSalary;
    private BigDecimal maxSalary;

    public DepartmentResponse() {
    }

    public DepartmentResponse(Long id, String departmentName, String city, String headOfDepartment,
                              int numberOfEmployees, BigDecimal minSalary, BigDecimal maxSalary) {
        this.id = id;
        this.departmentName = departmentName;
        this.city = city;
        this.headOfDepartment = headOfDepartment;
        this.numberOfEmployees = numberOfEmployees;
        this.minSalary = minSalary;
        this.maxSalary = maxSalary;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getHeadOfDepartment() {
        return headOfDepartment;
    }

    public void setHeadOfDepartment(String headOfDepartment) {
        this.headOfDepartment = headOfDepartment;
    }

    public int getNumberOfEmployees() {
        return numberOfEmployees;
    }

    public void setNumberOfEmployees(int numberOfEmployees) {
        this.numberOfEmployees = numberOfEmployees;
    }

    public BigDecimal getMinSalary() {
        return minSalary;
    }

    public void setMinSalary(BigDecimal minSalary) {
        this.minSalary = minSalary;
    }

    public BigDecimal getMaxSalary() {
        return maxSalary;
    }

    public void setMaxSalary(BigDecimal maxSalary) {
        this.maxSalary = maxSalary;
    }
}
