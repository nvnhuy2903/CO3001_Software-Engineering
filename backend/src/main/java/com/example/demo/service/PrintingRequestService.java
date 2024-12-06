package com.example.demo.service;

import java.io.File;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.request.PrintingRequestCreation;
import com.example.demo.exception.AppException;
import com.example.demo.exception.ErrorCode;
import com.example.demo.models.Printer;
import com.example.demo.models.PrintingLog;
import com.example.demo.models.PrintingRequest;
import com.example.demo.models.Student;
import com.example.demo.repository.PrinterRepository;
import com.example.demo.repository.PrintingLogRepository;
import com.example.demo.repository.PrintingRequestRepository;
import com.example.demo.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
@Slf4j
@Service
@RequiredArgsConstructor
public class PrintingRequestService {
    @Value("${spring.servlet.multipart.max-file-size}")
    private String maxFileSize;
    private final List<String> allowedFileTypes = Arrays.asList("application/pdf", "image/jpeg", "image/png", "image/jpg");
    private final PrintingRequestRepository printingRequestRepository;
    private final StudentRepository studentRepository;
    private final PrinterRepository printerRepository;
    private final PrintingLogRepository printingLogRepository;
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
    private final TransactionService transactionService;

    public PrintingRequest createPrintingRequest(PrintingRequestCreation request, Integer id, Integer printerId){
        if(!checkPrintingRequest(request.getFile())){
            throw new AppException(ErrorCode.INVALID_FILE_TYPE);
        }
        if(request.getFile().getSize() > getValidSize(maxFileSize)){
            throw new AppException(ErrorCode.FILE_TOO_LARGE);
        }
        Student student = studentRepository.findById(id).orElse(null);
        if(student == null){
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }
        Printer printer = printerRepository.findById(printerId).orElse(null);
        if(printer == null){
            throw new AppException(ErrorCode.PRINTER_NOT_FOUND);
        }
        PrintingRequest printingRequest = new PrintingRequest();
        printingRequest.setSomat(request.getSomat());
        printingRequest.setStudent(student);
        printingRequest.setTypePaper(request.getTypePaper());
        printingRequest.setPrinter(printer);
        printingRequest.setFileName(request.getFile().getOriginalFilename());
        printingRequest.setFileType(request.getFile().getContentType());
        printingRequest.setFileSize(Integer.parseInt(String.valueOf(request.getFile().getSize())));
        printingRequest.setPages(getNumberOfPages(request.getFile()));
        log.info("pages: {}", printingRequest.getPages());
        printingRequest.setCopies(request.getCopies());
        
        Integer result = printingRequest.getPages()*printingRequest.getCopies();
        Integer pages=printingRequest.getSomat()==2?(int) Math.ceil((double)result / 2):result;
        // if(!checkPage(pages, id)){
        //     throw new AppException(ErrorCode.YOUR_PAGES_NOT_ENOUGH);
        // }
        Integer getPages = student.getPages();
        String typePaper = printingRequest.getTypePaper();
        if(typePaper.equals("A2")){
            Integer pagesTransfer = pages*3;
            if(pages > printer.getPagesA2()){
                throw new AppException(ErrorCode.PAGES_NOT_ENOUGH_IN_PRINTER);
            }
            else if(getPages < pagesTransfer){
                throw new AppException(ErrorCode.YOUR_PAGES_NOT_ENOUGH);
            }
            transactionService.minusPage(pagesTransfer, id);
            printer.setPagesA2(printer.getPagesA2() - pages);
        }
        else if(typePaper.equals("A3")){
            Integer pagesTransfer = pages*2;
            if(pages > printer.getPagesA3()){
                throw new AppException(ErrorCode.PAGES_NOT_ENOUGH_IN_PRINTER);
            }
            else if(getPages < pagesTransfer){
                throw new AppException(ErrorCode.YOUR_PAGES_NOT_ENOUGH);
            }
            transactionService.minusPage(pagesTransfer, id);
            printer.setPagesA3(printer.getPagesA3() - pages);
            
        }
        else if(typePaper.equals("A4")){
            if(pages > printer.getPagesA4()){
                throw new AppException(ErrorCode.PAGES_NOT_ENOUGH_IN_PRINTER);
            }
            else if(getPages < pages){
                throw new AppException(ErrorCode.YOUR_PAGES_NOT_ENOUGH);
            }
            transactionService.minusPage(pages, id);
            printer.setPagesA4(printer.getPagesA4() - pages);
        }
        printingRequest.setCreatedAt(LocalDateTime.now());
        CountDownLatch latch = new CountDownLatch(1);
        
        printer.setIsAvailable(false);
        
        
        printingRequestRepository.save(printingRequest);

        scheduler.schedule(() -> {
            try {
            } finally {
                latch.countDown();
            }
        }, 10, TimeUnit.SECONDS);

        try {
            latch.await();  
        } catch (InterruptedException e) {
            System.out.println("Main thread was interrupted.");
        }
        executePrintingRequest(printingRequest, printer, student);
        printer.setIsAvailable(true);
        printingRequestRepository.save(printingRequest);

        return printingRequest;
        // printer.setIsAvailable(true);
        // printingRequestRepository.save(printingRequest);
        // return printingRequest;
        //return printingRequest;
    }


    public boolean checkPrintingRequest(MultipartFile file){
        try {
            Tika tika = new Tika();
            String fileType = tika.detect(file.getBytes());
            log.info("fileType: {}", fileType);
            if(allowedFileTypes.contains(fileType)){
                return true;
            }
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    public Integer getNumberOfPages(MultipartFile file) {
        try (InputStream inputStream = file.getInputStream()) {
            Tika tika = new Tika();
            String detectedType = tika.detect(file.getBytes());
            //  PDF
            if (detectedType.equals("application/pdf")) {
                PDDocument document = PDDocument.load(inputStream);
                int pages = document.getNumberOfPages();
                document.close();
                return pages;
            }     
            return 1;  //PNG
        } catch (Exception e) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
    }


    public Integer getValidSize(String maxFileSize){
        return Integer.parseInt(maxFileSize.substring(0, maxFileSize.length() - 2))*1024*1024;
    }


    public boolean checkPage(Integer pages, Integer id){
        Student student = studentRepository.findById(id).orElse(null);
        if(student == null){
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }
        return student.getPages() >= pages;
    }

    public void executePrintingRequest(PrintingRequest printingRequest, Printer printer, Student student){ 
        PrintingLog printingLog = student.getPrintingLog();
        if(printingLog == null){
            printingLog = new PrintingLog();
        }
        printingRequest.setPrintingLog(printingLog);
        printingLog.setStudent(student);
        // List<PrintingRequest> printingRequests = printingLog.getPrintingRequests();
        // printingRequests.add(printingRequest);
        // printingLog.setPrintingRequests(printingRequests);
        printingLogRepository.save(printingLog);
    }
    

}
