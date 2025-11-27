package com.homeservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5000", "http://127.0.0.1:5000"}, allowCredentials = "true")
public class ServiceController {

    // For demo - in a real app, inject ServiceRepository
    // @Autowired
    // private ServiceRepository serviceRepository;

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllServices() {
        // For demo, return some sample services
        // In a real app, return serviceRepository.findAll()
        
        List<Map<String, Object>> sampleServices = new ArrayList<>();
        
        sampleServices.add(createSampleService(1L, "Home Cleaning", "Professional home cleaning services", "CLEANING", 80.0));
        sampleServices.add(createSampleService(2L, "Plumbing", "Expert plumbing repair and installation", "REPAIRS", 100.0));
        sampleServices.add(createSampleService(3L, "Electrical Work", "Certified electricians for all your needs", "REPAIRS", 120.0));
        sampleServices.add(createSampleService(4L, "Gardening", "Lawn and garden maintenance", "OUTDOOR", 70.0));
        sampleServices.add(createSampleService(5L, "Painting", "Interior and exterior painting services", "HOME_IMPROVEMENT", 95.0));
        
        return ResponseEntity.ok(sampleServices);
    }
    
    private Map<String, Object> createSampleService(Long id, String name, String description, String category, Double price) {
        Map<String, Object> service = new HashMap<>();
        service.put("id", id);
        service.put("name", name);
        service.put("description", description);
        service.put("category", category);
        service.put("price", price);
        service.put("imageUrl", "https://via.placeholder.com/300x200?text=" + name.replace(" ", "+"));
        return service;
    }
} 