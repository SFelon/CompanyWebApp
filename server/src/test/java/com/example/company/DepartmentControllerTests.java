package com.example.company;

import com.example.company.payload.DepartmentResponse;
import com.example.company.payload.LoginRequest;
import com.example.company.security.CustomUserDetailsService;
import com.example.company.service.DepartmentService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;


@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
public class DepartmentControllerTests {
    
    @Autowired
    private WebApplicationContext context;

    private MockMvc mvc;

    @Autowired
    ObjectMapper objectMapper;

    @MockBean
    private DepartmentService departmentService;


    private DepartmentResponse testDepartment1;
    private DepartmentResponse testDepartment2;
    private DepartmentResponse testDepartment3;


    @Before
    public void setUp() {
        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity()) // enable security for the mock set up
                .build();

        testDepartment1 = new DepartmentResponse(Long.valueOf(1),"department1","city1","user1", 3,
                BigDecimal.valueOf(300),BigDecimal.valueOf(5000));

        testDepartment2 = new DepartmentResponse(Long.valueOf(2),"department2","city2","user2", 5,
                BigDecimal.valueOf(500),BigDecimal.valueOf(4000));

        testDepartment3 = new DepartmentResponse(Long.valueOf(3),"department3","city3","user3", 10,
                BigDecimal.valueOf(8000),BigDecimal.valueOf(12000));
    }

    @WithMockUser(username = "seb2", password = "password")
    @Test
    public void givenDepartments_whenGetDepartments_thenReturnJson() throws Exception {
/*        //given
        List<DepartmentResponse> allDepartments = Arrays.asList(testDepartment1,testDepartment2,testDepartment3);

        //when
        Mockito.when(departmentService.getAllDepartments()).thenReturn(allDepartments);

        //then
        mvc.perform(get("/api/departments")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)));*/

        System.out.println(objectMapper.writeValueAsString(new LoginRequest("seb","password")));



        String authzToken = mvc
                .perform(
                        post("/api/auth/signin")
                                .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(new LoginRequest("seb2","password"))))
                                .andReturn().getResponse().getContentAsString();

        System.out.print(authzToken);

    }
}
