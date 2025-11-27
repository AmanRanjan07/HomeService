package com.homeservice.controller;

import com.homeservice.model.User;
import com.homeservice.service.UserService;
import com.homeservice.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5000", "http://127.0.0.1:5000"}, allowCredentials = "true")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            User registeredUser = userService.registerUser(user);
            
            // Generate JWT token
            String token = jwtUtil.generateToken(registeredUser.getEmail());
            
            // Create response with token and user
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            
            Map<String, Object> userMap = new HashMap<>();
            userMap.put("id", registeredUser.getId());
            userMap.put("email", registeredUser.getEmail());
            userMap.put("firstName", registeredUser.getFirstName());
            userMap.put("lastName", registeredUser.getLastName());
            userMap.put("role", registeredUser.getRole().toString());
            
            response.put("user", userMap);
            
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginRequest) {
        try {
            String email = loginRequest.get("email");
            String password = loginRequest.get("password");
            
            User user = userService.authenticateUser(email, password);
            
            // Generate JWT token
            String token = jwtUtil.generateToken(user.getEmail());
            
            // Create response with token and user
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            
            Map<String, Object> userMap = new HashMap<>();
            userMap.put("id", user.getId());
            userMap.put("email", user.getEmail());
            userMap.put("firstName", user.getFirstName());
            userMap.put("lastName", user.getLastName());
            userMap.put("role", user.getRole().toString());
            
            response.put("user", userMap);
            
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body("Invalid email or password");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
} 