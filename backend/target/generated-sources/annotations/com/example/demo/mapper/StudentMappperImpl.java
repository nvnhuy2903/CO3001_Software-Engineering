package com.example.demo.mapper;

import com.example.demo.dto.request.StudentCreateRequest;
import com.example.demo.dto.response.StudentResponse;
import com.example.demo.models.PrintingRequest;
import com.example.demo.models.Student;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-12-09T14:28:19+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.40.0.z20241112-1021, environment: Java 17.0.13 (Eclipse Adoptium)"
)
@Component
public class StudentMappperImpl implements StudentMappper {

    @Override
    public StudentResponse toResponse(Student student) {
        if ( student == null ) {
            return null;
        }

        StudentResponse studentResponse = new StudentResponse();

        studentResponse.setId( student.getId() );
        studentResponse.setAccount( student.getAccount() );
        studentResponse.setDiachi( student.getDiachi() );
        studentResponse.setEmail( student.getEmail() );
        studentResponse.setFullname( student.getFullname() );
        studentResponse.setKhoa( student.getKhoa() );
        studentResponse.setMssv( student.getMssv() );
        studentResponse.setNganh( student.getNganh() );
        studentResponse.setPages( student.getPages() );
        studentResponse.setPrintingLog( student.getPrintingLog() );
        List<PrintingRequest> list = student.getPrintingRequests();
        if ( list != null ) {
            studentResponse.setPrintingRequests( new ArrayList<PrintingRequest>( list ) );
        }

        return studentResponse;
    }

    @Override
    public Student toStudent(StudentCreateRequest request) {
        if ( request == null ) {
            return null;
        }

        Student student = new Student();

        student.setName( request.getName() );
        student.setPassword( request.getPassword() );

        return student;
    }
}
