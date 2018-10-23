package com.example.company;

import com.example.company.model.Department;
import com.example.company.model.User;
import com.example.company.payload.DepartmentInfo;
import com.example.company.service.DepartmentService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;
import org.assertj.core.api.Assertions;


import java.math.BigDecimal;
import java.math.RoundingMode;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class ServiceTests {
    @Autowired
    private TestEntityManager entityManager;

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
    private ModelMapper modelMapper;

    private Department testDepartment;
    private User firstUser;
    private User secondUser;
    private User thirdUser;

    @Before
    public void setUp() {
        testDepartment = new Department("department1","city","user1",
                BigDecimal.valueOf(300),BigDecimal.valueOf(5000));

        firstUser = new User("seb","fel","sebfel","xxx@xx.xx","password",
                "123123123","123123123", BigDecimal.valueOf(6000));

        secondUser = new User ("seb_1", "fel_1", "sebfel_1", "xxx1@xx.xx",
                "password", "123123123","123123123",BigDecimal.valueOf(3500));

        thirdUser = new User ("seb_2", "fel_2", "sebfel_2", "xxx2@xx.xx",
                "password", "123123123","123123123",BigDecimal.valueOf(2500));

        testDepartment.addUser(firstUser);
        testDepartment.addUser(secondUser);
        testDepartment.addUser(thirdUser);
    }

    @Test
    public void whenValidDepartment_thenGetDepartmentInfo() {
        //given
        Department savedDepartment = entityManager.persistFlushFind(testDepartment);

        //when
        DepartmentInfo departmentInfo = departmentService.getUsersSalaryData(savedDepartment.getId().toString());

        //then
        Assertions.assertThat(departmentInfo)
                .hasFieldOrPropertyWithValue("numberOfUsers", Long.valueOf(3))
                .hasFieldOrPropertyWithValue("averageSalary", BigDecimal.valueOf(4000).setScale(2, RoundingMode.CEILING))
                .hasFieldOrPropertyWithValue("medianSalary", BigDecimal.valueOf(3500).setScale(2, RoundingMode.CEILING));
    }
}

