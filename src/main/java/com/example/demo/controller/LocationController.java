package com.example.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.dto.request.ApiResponse;
import com.example.demo.models.Location;
import com.example.demo.service.LocationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/locations")
public class LocationController {
    private final LocationService locationService;
    @PostMapping("/create")
    public ApiResponse<Location> createLocation(@RequestBody Location request){
        return ApiResponse.<Location>builder().
                            result(locationService.createLocation(request)).
                            build();
    }
    @GetMapping("/getAll")
    public ApiResponse<List<Location>> getLocations(){
        return ApiResponse.<List<Location>>builder().
                            result(locationService.getLocations()).
                            build();
    }
}
