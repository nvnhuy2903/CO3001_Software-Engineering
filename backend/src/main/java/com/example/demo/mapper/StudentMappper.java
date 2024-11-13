package com.example.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.demo.dto.request.StudentCreateRequest;
import com.example.demo.dto.response.StudentResponse;
import com.example.demo.models.Student;

@Mapper(componentModel = "spring")
public interface StudentMappper {
    //@Mapping(target = "account", ignore = true)
    StudentResponse toResponse(Student student);
    Student toStudent(StudentCreateRequest request);
}
