package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.dto.request.LocationRequest;
import com.example.demo.models.Location;
import com.example.demo.repository.LocationRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;

//import org.springframework.beans.factory.annotation.Autowired;
@Service
@RequiredArgsConstructor
public class LocationService {
    private final LocationRepository locationRepository;
    public Integer getLocationId(LocationRequest request){
        List<Location> locations = locationRepository.findAll();
        for(Location location : locations){
            if(location.getCampus().equals(request.getCampus()) && location.getBuilding().equals(request.getBuilding()) && location.getRoom().equals(request.getRoom())){
                return location.getId();
            }
        }
        return 0;
    }
    public Location createLocation(Location request){
        return locationRepository.save(request);
    }
    public List<Location> getLocations(){
        return locationRepository.findAll();
    }
}
