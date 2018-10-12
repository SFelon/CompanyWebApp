package com.example.company.service;

import com.example.company.model.User;
import com.example.company.payload.ApiResponse;
import com.example.company.payload.UserProfile;
import com.example.company.repository.DepartmentRepository;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    @Autowired
    DepartmentRepository departmentRepository;

    @Autowired
    private ModelMapper modelMapper;


    private static String formatDateToString(Object v) {
        String dateFormat = "yyyy-MM-dd";
        if(v!=null)
            return new SimpleDateFormat(dateFormat).format(v).toString();
        else return "";
    }

    private Converter<Date, String> formatDate = ctx -> ctx.getSource() != null
            ? formatDateToString(ctx.getSource())
            : "";

    private UserProfile convertUserToDto(User user) {

        if(modelMapper.getTypeMap(User.class, UserProfile.class) == null) {
            modelMapper
                    .createTypeMap(User.class, UserProfile.class)
                    .addMappings(mapper -> {
                        mapper.using(formatDate).map(User::getDateOfEmployment, UserProfile::setDateOfEmployment);
                        mapper.map(src -> src.getDepartment().getDepartmentName(), UserProfile::setDepartmentName);
                    });
        }

        return modelMapper.map(user, UserProfile.class);
    }


    private static final Logger logger = LoggerFactory.getLogger(DepartmentService.class);


    public ResponseEntity<?> convertUserToUserDTO(User user) {
        return ResponseEntity.ok(convertUserToDto(user));
    }


    public ResponseEntity<?> getEmployeesByDepartment(String id) {
        Long idLong = Long.parseLong(id);

        List<User> users = departmentRepository.getUsersByDepartment(idLong);
        users.removeAll(Collections.singleton(null));
        if(CollectionUtils.isEmpty(users)) {
            return new ResponseEntity<>(new ApiResponse(false, "Department does not have registered employees!"),
                    HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok(new ArrayList<>(users.stream().map(user -> convertUserToDto(user)).collect(Collectors.toList())));
    }
}
