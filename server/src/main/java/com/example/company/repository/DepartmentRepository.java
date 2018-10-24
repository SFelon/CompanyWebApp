package com.example.company.repository;

import com.example.company.model.Department;
import com.example.company.model.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {

    Optional<Department> findByDepartmentName(String departmentName);

    Optional<Department> findById(long departmentId);

    List<Department> findByIdIn(List<Long> departmentIds);

    List<Department> findByIdIn(List<Long> departmentIds, Sort sort);

    @Query("SELECT COUNT(u.id) FROM Department d LEFT JOIN User u ON d.id = u.department.id WHERE d.id = (:id) GROUP BY d.id")
    long countUsersByDepartmentId(@Param("id") Long id);

    @Query("SELECT u.salary FROM Department d LEFT JOIN User u ON d.id = u.department.id WHERE d.id = (:id) GROUP BY u.id")
    List<BigDecimal> getUsersSalaryByDepartment(@Param("id") Long id);

    @Query("SELECT u FROM Department d LEFT JOIN User u ON d.id = u.department.id WHERE d.id = (:id) GROUP BY u.id")
    List<User> getUsersByDepartment(@Param("id") Long id);

    Boolean existsByDepartmentName(String departmentName);
}
