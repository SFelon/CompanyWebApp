package com.example.company;


import com.example.company.model.Department;
import com.example.company.model.User;
import com.example.company.repository.DepartmentRepository;
import com.example.company.repository.UserRepository;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;
import org.assertj.core.api.Assertions;

import javax.validation.ConstraintViolationException;
import java.math.BigDecimal;


@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class DatabaseTests {
    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserRepository userRepository;
    

    @Rule
    public ExpectedException thrown = ExpectedException.none();

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
    }

    @Test
    public void whenDepartmentData_thenSaveToDatabase() {
        //given testDepartment

        //when
        Department savedDepartment = entityManager.persistAndFlush(testDepartment);

        //then
        Assertions.assertThat(savedDepartment)
                .hasFieldOrPropertyWithValue("departmentName", "department1")
                .hasFieldOrPropertyWithValue("city", "city")
                .hasFieldOrPropertyWithValue("headOfDepartment", "user1")
                .hasFieldOrPropertyWithValue("minSalary", BigDecimal.valueOf(300))
                .hasFieldOrPropertyWithValue("maxSalary", BigDecimal.valueOf(5000));
    }


    @Test
    public void whenDepartmentDataWithoutDepartmentName_thenConstraintViolationException() throws Exception {

        //expect
        thrown.expect(ConstraintViolationException.class);

        //when
        entityManager.persistAndFlush(new Department("","city","user1", BigDecimal.valueOf(300),BigDecimal.valueOf(5000)));
    }

    @Test
    public void whenUserData_thenSaveUsersToDepartment() {
        //given
        testDepartment.addUser(firstUser);
        testDepartment.addUser(secondUser);

        //when
        Department savedDepartment = entityManager.persistFlushFind(testDepartment);

        //then
        Assertions.assertThat(savedDepartment).hasNoNullFieldsOrProperties();
        Assertions.assertThat(savedDepartment.getUsers().size()).isEqualTo(2);

    }

    @Test
    public void whenUsername_thenExistsInDatabase() {
        //given
        Department savedDepartment = entityManager.persistFlushFind(testDepartment);
        firstUser.setDepartment(savedDepartment);
        entityManager.persistAndFlush(firstUser);

        //when
        Boolean found = userRepository.existsByUsername("sebfel");

        //then
        Assertions.assertThat(found).isTrue();
    }


    @Test
    public void whenUsername_thenDeleteFromDepartment() {
        //given
        testDepartment.addUser(firstUser);
        testDepartment.addUser(secondUser);
        testDepartment.addUser(thirdUser);

        //when
        Department savedDepartment = entityManager.persistFlushFind(testDepartment);
        savedDepartment.removeUser(secondUser);
        Department updatedDepartment = entityManager.persistFlushFind(savedDepartment);

        //then
        Assertions.assertThat(updatedDepartment.getUsers().size()).isEqualTo(2);
        Assertions.assertThat(updatedDepartment.getUsers()).containsExactly(firstUser, thirdUser);
        Assertions.assertThat(updatedDepartment.getUsers().get(1).getFirstName()).isEqualTo("seb_2");

    }

}
