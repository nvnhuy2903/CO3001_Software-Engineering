package com.example.demo.configuration;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;
import com.nimbusds.jose.proc.SecurityContext;
import com.nimbusds.jose.util.Base64;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {
    private final String[] PUBLIC_ENDPOINTS={"/spso/create", "/student/create", "/locations/create", "/printers/create/*", "/printingRequest/create/*/*",
            "/printingRequest/check", "/printingRequest/getNumberOfPages", 
            "/transactions/payment/*", "/transactions/recharge/*", 
            "/student/checkLogin", "/auth/check", "/printers/addPages/*"
        };
    private final String[] PUBLIC_GET_ENDPOINTS={ "/printers/*", "/locations/getAll", "/printers/checkAvailable/*"};
    @Value("${jwt.signerKey}")
    private String signerKey;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception{
        httpSecurity.authorizeHttpRequests(request->
                                    request.requestMatchers(HttpMethod.POST, PUBLIC_ENDPOINTS).permitAll()
                                    .requestMatchers(HttpMethod.GET, PUBLIC_GET_ENDPOINTS)
                                    .permitAll()
                                    .anyRequest()
                                    .authenticated());
        httpSecurity.oauth2ResourceServer(o->
                                    o.jwt(jwtConfigurer->jwtConfigurer.decoder(jwtDecoder()))
    );
        httpSecurity.csrf(abc->abc.disable());
        return httpSecurity.build();
    }
    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder(10);
    }
    @Bean
    JwtDecoder jwtDecoder(){
        SecretKeySpec secretKeySpec=new SecretKeySpec(signerKey.getBytes(), "HS512");
        return NimbusJwtDecoder
                .withSecretKey(secretKeySpec)
                .macAlgorithm((MacAlgorithm.HS512))
                .build();
    }

}
