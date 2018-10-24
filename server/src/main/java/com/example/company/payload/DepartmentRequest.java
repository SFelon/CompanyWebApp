package com.example.company.payload;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

public class DepartmentRequest {

    private static final Logger logger = LoggerFactory.getLogger(DepartmentRequest.class);

    @NotBlank
    @Size(min = 3, max = 40)
    private String departmentName;

    @NotBlank
    @Size(min = 3, max = 30)
    private String city;

    @Size(max = 60)
    private String headOfDepartment;

    private BigDecimal minSalary;

    private BigDecimal maxSalary;

    public DepartmentRequest() {
    }

    public DepartmentRequest(String departmentName, String city, String headOfDepartment, BigDecimal minSalary, BigDecimal maxSalary) {
        this.departmentName = departmentName;
        this.city = city;
        this.headOfDepartment = headOfDepartment;
        this.minSalary = minSalary;
        this.maxSalary = maxSalary;
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

