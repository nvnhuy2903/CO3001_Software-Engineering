package com.example.demo.controller;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import jakarta.validation.Valid;
import com.example.demo.service.PrintingRequestService;
import com.example.demo.models.PrintingRequest;
import com.example.demo.dto.request.PrintingRequestCreation;
import com.example.demo.dto.request.ApiResponse;
@RestController 
@RequiredArgsConstructor
@RequestMapping("/printingRequest")
public class PrintingRequestController {
    private final PrintingRequestService printingRequestService;
    @PostMapping("/create/{id}/{printerId}")
    public ApiResponse<PrintingRequest> createPrintingRequest(@Valid @ModelAttribute PrintingRequestCreation request, @PathVariable Integer id, @PathVariable Integer printerId){
        return ApiResponse.<PrintingRequest>builder()
                            .result(printingRequestService.createPrintingRequest(request, id, printerId)).
                            build();
    }
    @PostMapping("/check")
    public ApiResponse<Boolean> checkPrintingRequest(@RequestParam("file") MultipartFile file){
        return ApiResponse.<Boolean>builder()
                            .result(printingRequestService.checkPrintingRequest(file)).
                            build();
    }
    @PostMapping("/getNumberOfPages")
    public ApiResponse<Integer> getNumberOfPages(@RequestParam("file") MultipartFile file){
        return ApiResponse.<Integer>builder()
                            .result(printingRequestService.getNumberOfPages(file)).
                            build();
    }
}
