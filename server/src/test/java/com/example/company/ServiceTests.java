package com.example.company;

import com.example.company.model.Department;
import com.example.company.repository.DepartmentRepository;
import com.example.company.service.DepartmentService;
import com.example.company.service.EmployeeService;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

import java.math.BigDecimal;

@RunWith(SpringRunner.class)
public class ServiceTests {

    @TestConfiguration
    static class DepartmentServiceImplTestContextConfiguration {

        @Bean
        public DepartmentService departmentService() {
            return new DepartmentService();
        }
    }

    @Autowired
    private DepartmentService departmentService;

    @MockBean
    private DepartmentRepository departmentRepository;

    /*
    @Before
    public void setUp() {

        Department department1 = new Department("department1","city","user1", BigDecimal.valueOf(300),BigDecimal.valueOf(5000));
        Employee alex = new Employee("alex");

        Mockito.when(employeeRepository.findByName(alex.getName()))
                .thenReturn(alex);
    }

    */
}
