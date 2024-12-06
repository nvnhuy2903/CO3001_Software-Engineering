package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.request.AccountCreateRequest;
import com.example.demo.dto.request.ChangPassRequest;
import com.example.demo.dto.request.PrintingRequestCreation;
import com.example.demo.dto.request.StudentCreateRequest;
import com.example.demo.dto.request.UserCreationRequest;
import com.example.demo.dto.response.StudentResponse;
import com.example.demo.exception.AppException;
import com.example.demo.exception.ErrorCode;
import com.example.demo.mapper.AccountMapper;
import com.example.demo.mapper.StudentMappper;
import com.example.demo.models.Account;
import com.example.demo.models.Printer;
import com.example.demo.models.PrintingRequest;
import com.example.demo.models.Student;
import com.example.demo.models.Transaction;
import com.example.demo.repository.AccountRepository;
import com.example.demo.repository.StudentRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.LocationRepository;
import com.example.demo.repository.PrinterRepository;
import com.example.demo.repository.PrintingRequestRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;
    private final StudentMappper studentMapper;
    private final PrinterRepository printerRepository;
    private final AccountRepository accountRepository;
    private final AccountMapper accountMapper;
    private final LocationRepository locationRepository;
    private final PrintingRequestRepository printingRequestRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ExternalAPIService externalAPIService;
    public void createStudent(String name, String password){

        if(!externalAPIService.checkLogin(name,password)){
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
        Map<String, Object> mp = externalAPIService.checkLogin2(name,password);
        StudentCreateRequest rq =new StudentCreateRequest();
        rq.setName(name);
        rq.setPassword(password);
        Student student = studentMapper.toStudent(rq);
        student.setPages(100);
        student.setPassword(passwordEncoder.encode(student.getPassword()));
        Account account = Account.builder().balance(100000).build();
        account.setStudent(student);
        student.setAccount(account);
        student.setFullname(mp.get("lastName")+" "+mp.get("firstName"));
        student.setEmail(String.valueOf(mp.get("orgEmail")));
        student.setMssv(String.valueOf(mp.get("code")));
        student.setDiachi(String.valueOf(mp.get("idCardPlace")));
        Map<String, Object> mp1=(Map<String, Object>)mp.get("teachingDep");
        student.setNganh(String.valueOf(mp1.get("nameVi")));
        Map<String, Object> mp2=(Map<String, Object>)mp.get("major");
        student.setKhoa(String.valueOf(mp2.get("nameVi")));
        student.setRole("STUDENT");
        userRepository.save(student);
        
    }

    // public List<Student> getAllStudents(){
    //     return studentRepository.findAll();
    // }
    @PreAuthorize("hasAuthority('SCOPE_STUDENT')")
    public StudentResponse getStudentById(int id){
        return studentMapper.toResponse(studentRepository.findById(id).orElse(null));
    }

    // public PrintingRequest createPrintingRequest(PrintingRequestCreation request, Integer id, Integer printerId){
    //     Student student = studentRepository.findById(id).orElse(null);
    //     if(student == null){
    //         throw new AppException(ErrorCode.USER_NOT_EXISTED);
    //     }
    //     Printer printer = printerRepository.findById(printerId).orElse(null);
    //     if(printer == null){
    //         throw new AppException(ErrorCode.USER_NOT_EXISTED);
    //     }
    //     PrintingRequest printingRequest = new PrintingRequest();
    //     printingRequest.setStudent(student);
    //     printingRequest.setPrinter(printer);
    //     printingRequest.setFileName(request.getFile().getOriginalFilename());
    //     printingRequest.setFileType(request.getFile().getContentType());
    //     printingRequest.setFileSize(Integer.parseInt(String.valueOf(request.getFile().getSize())));
    //     printingRequest.setPages(request.getPages());
    //     printingRequest.setCopies(request.getCopies());
    //     printingRequest.setCreatedAt(LocalDateTime.now());
    //     return printingRequestRepository.save(printingRequest);
    // }

    public StudentResponse changePassword(ChangPassRequest request){
        var context = SecurityContextHolder.getContext();
        String username = context.getAuthentication().getName();
        Student student = studentRepository.findByName(username);
        if(student == null){
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }
        student.setPassword(passwordEncoder.encode(request.getNewPassword()));
        return studentMapper.toResponse(studentRepository.save(student));
    }


    public Integer totalPageBuy(Integer id){
        Student student=studentRepository.findById(id).orElse(null);
        Integer total = student.getAccount().getTransactions().stream()
        .filter(tr -> "buyPage".equals(tr.getType()))
        .mapToInt(Transaction::getAmount)
        .sum();
        return total;


    }



    public Integer totalPagePrinted(Integer id){
        Student student=studentRepository.findById(id).orElse(null);
        Integer total = student.getAccount().getTransactions().stream()
        .filter(tr -> "minusPage".equals(tr.getType()))
        .mapToInt(Transaction::getAmount)
        .sum();
        return total;


    }

    public List<PrintingRequest> getAllPrinting(Integer id){
        Student student=studentRepository.findById(id).orElse(null);
        return student.getPrintingRequests();
    }

}
