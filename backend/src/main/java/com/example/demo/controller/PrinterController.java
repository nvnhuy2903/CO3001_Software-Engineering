package com.example.demo.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.PrinterService;
import com.example.demo.dto.request.AddPage;
import com.example.demo.dto.request.ApiResponse;
import com.example.demo.models.Printer;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/printers")
public class PrinterController {
    private final PrinterService printerService;
    @GetMapping("/location_{locationId}")
    public ApiResponse<List<Printer>> getPrintersByLocationId(@PathVariable Integer locationId){
        return ApiResponse.<List<Printer>>builder().
                            result(printerService.getPrintersByLocationId(locationId)).
                            build();
    }


    @GetMapping("/getAll")
    public ApiResponse<List<Printer>> getPrinters(){
        return ApiResponse.<List<Printer>>builder().
                            result(printerService.getAllPrinters()).
                            build();
    }

    @PostMapping("create/{locationId}")
    public ApiResponse<Printer> createPrinter(@RequestBody Printer request, @PathVariable Integer locationId){
        return ApiResponse.<Printer>builder().
                            result(printerService.createPrinter(request, locationId)).
                            build();
    }
    @PostMapping("addPages/{id}")
    public ApiResponse<Printer> addPages(@RequestBody AddPage request, @PathVariable Integer id){
        return ApiResponse.<Printer>builder().
                            result(printerService.addPages(request, id)).
                            build();
    }
    @GetMapping("checkAvailable/{id}")
    public ApiResponse<Boolean> checkAvailable(@PathVariable Integer id){
        return ApiResponse.<Boolean>builder().
                            result(printerService.checkAvailable(id)).
                            build();
    }
    @GetMapping("{id}")
    public ApiResponse<Printer> getPrinterById(@PathVariable Integer id){
        return ApiResponse.<Printer>builder().
                            result(printerService.getPrinterById(id)).
                            build();
    }
}
