package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.dto.request.StudentCreateRequest;
import com.example.demo.dto.response.AuthenticationResponse;
import com.example.demo.dto.response.StudentResponse;
import com.example.demo.exception.AppException;
import com.example.demo.exception.ErrorCode;
import com.example.demo.models.Student;
import com.example.demo.models.User;
import com.example.demo.repository.StudentRepository;
import com.example.demo.repository.UserRepository;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.Payload;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;

import lombok.RequiredArgsConstructor;

import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final StudentService studentService;
    private final StudentRepository studentRepository;
    @Value("${jwt.valid-duration}")
    private long VALID_DURATION;
    @Value("${jwt.signerKey}")
    private String SIGNER_KEY;
    public AuthenticationResponse checkPass(String name, String password){
        User user = userRepository.findByName(name).orElse(null);
        if(user != null){
            boolean isMatch = passwordEncoder.matches(password, user.getPassword());
            if(isMatch)
            return AuthenticationResponse.builder().
                            token(generateToken(user)).
                            success(true).
                            id(user.getId()).
                            build();
            else throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
        studentService.createStudent(name,password);
        User user2=userRepository.findByName(name).orElse(null);
        return AuthenticationResponse.builder().
                            token(generateToken(user2)).
                            success(true).
                            id(user2.getId()).
                            build();
    }
    public String generateToken(User user){
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);
        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
            .subject(user.getName())
            .issueTime(new Date())
            .expirationTime(new Date(
                        Instant.now().plus(VALID_DURATION, ChronoUnit.SECONDS).toEpochMilli()))
            .jwtID(UUID.randomUUID().toString())
            .claim("scope", user.getRole())
            .build();
        Payload payload = new Payload(claimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(header, payload);
        try{
            jwsObject.sign(new MACSigner(SIGNER_KEY));
            return jwsObject.serialize();
        }catch(JOSEException e){
            throw new RuntimeException(e);
        }
    }
}
