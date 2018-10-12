package com.example.company.payload;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

public class DepartmentRequest {

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

    public DepartmentRequest(@NotBlank @Size(min = 3, max = 40) String departmentName, @NotBlank @Size(min = 3, max = 30)
            String city, @Size(max = 60) String headOfDepartment, BigDecimal minSalary, BigDecimal maxSalary) {
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

