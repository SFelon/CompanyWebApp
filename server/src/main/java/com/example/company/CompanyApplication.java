package com.example.company;

import com.example.company.repository.DepartmentRepository;
import com.example.company.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CompanyApplication {

	public static void main(String[] args) {
		SpringApplication.run(CompanyApplication.class, args);
	}

	/*@Bean
	CommandLineRunner runner(){
		return args -> {
			System.out.println("Lista");
			System.out.println(departmentService.getEmployeesByDepartment("50"));
		};
	}*/
}

