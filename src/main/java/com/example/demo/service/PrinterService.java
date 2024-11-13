package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.request.AddPage;
import com.example.demo.exception.AppException;
import com.example.demo.exception.ErrorCode;
import com.example.demo.models.Location;
import com.example.demo.models.Printer;
import com.example.demo.repository.LocationRepository;
import com.example.demo.repository.PrinterRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PrinterService {
    private final PrinterRepository printerRepository;
    private final LocationRepository locationRepository;
    public Printer createPrinter(Printer request,Integer locationId){
        Location location = locationRepository.findById(locationId).orElse(null);
        if(location==null){
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }
        request.setLocation(location);
        
        List<Printer> printers = location.getPrinters();
        printers.add(request);
        location.setPrinters(printers);
        //locationRepository.save(location);
        printerRepository.save(request);
        return request;
    }
    public List<Printer> getPrintersByLocationId(Integer id){
        return locationRepository.findById(id).orElse(null).getPrinters();
    }
    public Printer addPages(AddPage request, Integer id){
        Printer printer = printerRepository.findById(id).orElse(null);
        if(printer==null){
            throw new AppException(ErrorCode.PRINTER_NOT_FOUND);
        }
        printer.setPagesA0(request.getPagesA0()+printer.getPagesA0());
        printer.setPagesA1(request.getPagesA1()+printer.getPagesA1());
        printer.setPagesA2(request.getPagesA2()+printer.getPagesA2());
        printer.setPagesA3(request.getPagesA3()+printer.getPagesA3());
        printer.setPagesA4(request.getPagesA4()+printer.getPagesA4());
        printerRepository.save(printer);
        return printer;
    }
    public boolean checkAvailable(Integer id){
        Printer printer= printerRepository.findById(id).orElse(null);
        if(printer==null){
            throw new AppException(ErrorCode.PRINTER_NOT_FOUND);
        }
        return printer.getIsAvailable();
    }
    public Printer getPrinterById(Integer id){
        Printer printer = printerRepository.findById(id).orElse(null);
        if(printer==null){
            throw new AppException(ErrorCode.PRINTER_NOT_FOUND);
        }
        return printer;
    }
}
