package com.example.company;

import com.example.company.payload.DepartmentResponse;
import com.example.company.payload.LoginRequest;
import com.example.company.service.DepartmentService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;


@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
public class DepartmentControllerTests {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private DepartmentService departmentService;

    private String token;

    private DepartmentResponse testDepartment1;
    private DepartmentResponse testDepartment2;
    private DepartmentResponse testDepartment3;


    @Before
    public void authSetUp() throws Exception {
        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity()) // enable security for the mock set up
                .build();

        String authData= mvc
                .perform(post("/api/auth/signin")
                        .contentType(MediaType.APPLICATION_JSON_UTF8_VALUE)
                        .content(objectMapper.writeValueAsString(new LoginRequest("seb2","password"))))
                        .andReturn().getResponse().getContentAsString();

        Pattern pattern = Pattern.compile(":\"(.*?)\",");
        Matcher matcher = pattern.matcher(authData);
        if(matcher.find())
        token = "Bearer " + matcher.group(1);
    }

    @Before
    public void testDataSetUp() {
        testDepartment1 = new DepartmentResponse(Long.valueOf(1),"department1","city1","user1", 3,
                BigDecimal.valueOf(300),BigDecimal.valueOf(5000));

        testDepartment2 = new DepartmentResponse(Long.valueOf(2),"department2","city2","user2", 5,
                BigDecimal.valueOf(500),BigDecimal.valueOf(4000));

        testDepartment3 = new DepartmentResponse(Long.valueOf(3),"department3","city3","user3", 10,
                BigDecimal.valueOf(8000),BigDecimal.valueOf(12000));
    }


    @Test
    public void givenDepartments_whenGetDepartments_thenReturnJson() throws Exception {
        //given
        List<DepartmentResponse> allDepartments = Arrays.asList(testDepartment1,testDepartment2,testDepartment3);

        //when
        Mockito.when(departmentService.getAllDepartments()).thenReturn(allDepartments);

        //then
        mvc.perform(get("/api/departments")
        .contentType(MediaType.APPLICATION_JSON_UTF8_VALUE).header("Authorization", token))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$", hasSize(3)))
        .andExpect(jsonPath("$[0].departmentName", is(testDepartment1.getDepartmentName())));
    }
}
