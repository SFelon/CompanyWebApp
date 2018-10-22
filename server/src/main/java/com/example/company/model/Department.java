package com.example.company.model;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "departments")
public class Department {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 40)
    private String departmentName;

    @NotBlank
    @Size(max = 30)
    private String city;

    @Size(max = 60)
    private String headOfDepartment;

    private BigDecimal minSalary;

    private BigDecimal maxSalary;


    @OneToMany(
            mappedBy = "department",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            orphanRemoval = true
    )
    @Fetch(value = FetchMode.SELECT)
    private List<User> users = new ArrayList<>();


    public Department() {

    }

    public Department(@NotBlank @Size(max = 40) String departmentName, @NotBlank @Size(max = 30) String city,
                      @Size(max = 60) String headOfDepartment, BigDecimal minSalary, BigDecimal maxSalary) {
        this.departmentName = departmentName;
        this.city = city;
        this.headOfDepartment = headOfDepartment;
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

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public void addUser(User user) {
        users.add(user);
        user.setDepartment(this);
    }

    public void removeUser(User user) {
        users.remove(user);
        user.setDepartment(null);
    }

}
