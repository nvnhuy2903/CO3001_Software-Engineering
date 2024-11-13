package com.example.demo.service;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.request.ChangPassRequest;
import com.example.demo.dto.request.SPSOCreateRequest;
import com.example.demo.dto.response.SPSOResponse;
import com.example.demo.exception.AppException;
import com.example.demo.exception.ErrorCode;
import com.example.demo.mapper.SPSOMapper;
import com.example.demo.models.Location;
import com.example.demo.models.Printer;
import com.example.demo.models.SPSO;
import com.example.demo.repository.LocationRepository;
import com.example.demo.repository.PrinterRepository;
import com.example.demo.repository.SPSORepository;
//import com.example.demo.repository.StudentRepository;
import com.example.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SPSOService {
    private final SPSORepository spsoRepository;
    private final PasswordEncoder passwordEncoder;
    private final LocationRepository locationRepository;
    private final PrinterRepository printerRepository;
    private final SPSOMapper spsoMapper;
    private final UserRepository userRepository;

    public SPSOResponse createSPSO(SPSOCreateRequest request){
        if(userRepository.existsByName(request.getName())){ 
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        SPSO spso = spsoMapper.toSPSO(request);
        spso.setPassword(passwordEncoder.encode(request.getPassword()));
        spso.setRole("SPSO");
        spsoRepository.save(spso);
        return spsoMapper.toResponse(spso);
    }
    public List<SPSO> getAllSPSO(){
        return spsoRepository.findAll();
    }
    public SPSO getSPSOById(int id){
        return spsoRepository.findById(id).orElse(null);
    }
    public SPSOResponse changePassword(ChangPassRequest request){
        var context = SecurityContextHolder.getContext();
        String username = context.getAuthentication().getName();
        SPSO spso = spsoRepository.findByName(username);
        if(spso == null){
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }
        spso.setPassword(passwordEncoder.encode(request.getNewPassword()));
        return spsoMapper.toResponse(spsoRepository.save(spso));
    }

    


}
