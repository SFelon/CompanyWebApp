package com.example.company.payload;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.util.List;

public class DepartmentInfo {

    private static final Logger logger = LoggerFactory.getLogger(DepartmentInfo.class);

    private Long numberOfUsers;
    private List<BigDecimal> usersSalaries;
    private BigDecimal averageSalary;
    private BigDecimal medianSalary;

    public DepartmentInfo(Long numberOfUsers, List<BigDecimal> usersSalaries, BigDecimal averageSalary, BigDecimal medianSalary) {
        this.numberOfUsers = numberOfUsers == null ? 0 : numberOfUsers;
        this.usersSalaries = usersSalaries;
        this.averageSalary = averageSalary;
        this.medianSalary = medianSalary;
    }

    public Long getNumberOfUsers() {
        return numberOfUsers;
    }

    public void setNumberOfUsers(Long numberOfUsers) {
        this.numberOfUsers = numberOfUsers;
    }

    public List<BigDecimal> getUsersSalaries() {
        return usersSalaries;
    }

    public void setUsersSalaries(List<BigDecimal> usersSalaries) {
        this.usersSalaries = usersSalaries;
    }

    public BigDecimal getAverageSalary() {
        return averageSalary;
    }

    public void setAverageSalary(BigDecimal averageSalary) {
        this.averageSalary = averageSalary;
    }

    public BigDecimal getMedianSalary() {
        return medianSalary;
    }

    public void setMedianSalary(BigDecimal medianSalary) {
        this.medianSalary = medianSalary;
    }

    @Override
    public String toString() {
        return "DepartmentInfo{" +
                "numberOfUsers=" + numberOfUsers +
                ", usersSalaries=" + usersSalaries +
                ", averageSalary=" + averageSalary +
                ", medianSalary=" + medianSalary +
                '}';
    }
}



