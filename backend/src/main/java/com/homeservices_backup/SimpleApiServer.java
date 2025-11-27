package com.homeservices_backup;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;
import java.util.HashMap;
import java.util.Map;

public class SimpleApiServer {
    
    // Store registered users for simple in-memory state
    private static Map<String, UserInfo> users = new HashMap<>();
    
    // Static class for storing basic user info
    static class UserInfo {
        String email;
        String firstName;
        String lastName;
        String password;
        String role;
        
        public UserInfo(String email, String firstName, String lastName, String password, String role) {
            this.email = email;
            this.firstName = firstName;
            this.lastName = lastName;
            this.password = password;
            this.role = role;
        }
    }
    
    public static void main(String[] args) throws Exception {
        // Add some default users
        users.put("user@example.com", new UserInfo("user@example.com", "John", "Doe", "password", "USER"));
        users.put("admin@example.com", new UserInfo("admin@example.com", "Admin", "User", "password", "ADMIN"));
        
        int port = 5000;
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        
        // Define routes
        server.createContext("/api/services", new ServicesHandler());
        server.createContext("/api/auth/login", new LoginHandler());
        server.createContext("/api/auth/register", new RegisterHandler());
        
        server.setExecutor(null); // Use default executor
        server.start();
        
        System.out.println("");
        System.out.println("====================================================");
        System.out.println("  Simple API Server started on http://localhost:" + port);
        System.out.println("====================================================");
        System.out.println("");
        System.out.println("Available endpoints:");
        System.out.println("  GET  /api/services           - List of services");
        System.out.println("  POST /api/auth/login         - Login with email/password");
        System.out.println("  POST /api/auth/register      - Register new user");
        System.out.println("");
        System.out.println("Default users:");
        System.out.println("  Email: user@example.com  / Password: password  / Role: USER");
        System.out.println("  Email: admin@example.com / Password: password  / Role: ADMIN");
        System.out.println("");
        System.out.println("====================================================");
        System.out.println("Waiting for requests...");
        System.out.println("");
    }
    
    static class ServicesHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            // Handle CORS preflight requests
            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                handleCors(exchange);
                return;
            }
            
            // Sample data - static services list
            String response = "[\n" +
                    "  {\n" +
                    "    \"id\": 1,\n" +
                    "    \"name\": \"Home Cleaning\",\n" +
                    "    \"description\": \"Professional home cleaning services\",\n" +
                    "    \"category\": \"CLEANING\",\n" +
                    "    \"price\": 80.0,\n" +
                    "    \"imageUrl\": \"https://via.placeholder.com/300x200?text=Home+Cleaning\"\n" +
                    "  },\n" +
                    "  {\n" +
                    "    \"id\": 2,\n" +
                    "    \"name\": \"Plumbing\",\n" +
                    "    \"description\": \"Expert plumbing repair and installation\",\n" +
                    "    \"category\": \"REPAIRS\",\n" +
                    "    \"price\": 100.0,\n" +
                    "    \"imageUrl\": \"https://via.placeholder.com/300x200?text=Plumbing\"\n" +
                    "  },\n" +
                    "  {\n" +
                    "    \"id\": 3,\n" +
                    "    \"name\": \"Electrical Work\",\n" +
                    "    \"description\": \"Certified electricians for all your needs\",\n" +
                    "    \"category\": \"REPAIRS\",\n" +
                    "    \"price\": 120.0,\n" +
                    "    \"imageUrl\": \"https://via.placeholder.com/300x200?text=Electrical+Work\"\n" +
                    "  },\n" +
                    "  {\n" +
                    "    \"id\": 4,\n" +
                    "    \"name\": \"Gardening\",\n" +
                    "    \"description\": \"Lawn and garden maintenance\",\n" +
                    "    \"category\": \"OUTDOOR\",\n" +
                    "    \"price\": 70.0,\n" +
                    "    \"imageUrl\": \"https://via.placeholder.com/300x200?text=Gardening\"\n" +
                    "  },\n" +
                    "  {\n" +
                    "    \"id\": 5,\n" +
                    "    \"name\": \"Painting\",\n" +
                    "    \"description\": \"Interior and exterior painting services\",\n" +
                    "    \"category\": \"HOME_IMPROVEMENT\",\n" +
                    "    \"price\": 95.0,\n" +
                    "    \"imageUrl\": \"https://via.placeholder.com/300x200?text=Painting\"\n" +
                    "  }\n" +
                    "]";
            
            // Set headers and send response
            setCorsHeaders(exchange);
            exchange.sendResponseHeaders(200, response.getBytes(StandardCharsets.UTF_8).length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(response.getBytes(StandardCharsets.UTF_8));
            }
            
            System.out.println("[" + getCurrentTime() + "] GET /api/services - 200 OK");
        }
    }
    
    static class LoginHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            // Handle CORS preflight requests
            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                handleCors(exchange);
                return;
            }
            
            String email = "user@example.com"; // Default email
            boolean authSuccess = true;
            int statusCode = 200;
            
            // Process POST login request
            if ("POST".equals(exchange.getRequestMethod())) {
                try {
                    // Read request body
                    String requestBody = readInputStream(exchange.getRequestBody());
                    System.out.println("[" + getCurrentTime() + "] Login request: " + requestBody);
                    
                    // Extract credentials
                    String parsedEmail = extractValue(requestBody, "email");
                    String password = extractValue(requestBody, "password");
                    
                    if (parsedEmail != null && !parsedEmail.isEmpty()) {
                        email = parsedEmail;
                    }
                    
                    // Simple credential validation
                    if (users.containsKey(email)) {
                        UserInfo user = users.get(email);
                        if (password != null && password.equals(user.password)) {
                            authSuccess = true;
                        } else {
                            authSuccess = false;
                            statusCode = 401;
                        }
                    } else {
                        // For demo, accept any credentials
                        authSuccess = true;
                        // Add this user to our in-memory storage
                        users.put(email, new UserInfo(email, "User", "Name", password != null ? password : "password", "USER"));
                    }
                } catch (Exception e) {
                    System.out.println("[" + getCurrentTime() + "] Error processing login: " + e.getMessage());
                    authSuccess = false;
                    statusCode = 400;
                }
            }
            
            String response;
            
            if (authSuccess) {
                // Get user info if available
                UserInfo userInfo = users.get(email);
                String firstName = userInfo != null ? userInfo.firstName : "John";
                String lastName = userInfo != null ? userInfo.lastName : "Doe";
                String role = userInfo != null ? userInfo.role : "USER";
                
                // Create successful login response
                response = "{\n" +
                        "  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c\",\n" +
                        "  \"user\": {\n" +
                        "    \"id\": 1,\n" +
                        "    \"email\": \"" + email + "\",\n" +
                        "    \"firstName\": \"" + firstName + "\",\n" +
                        "    \"lastName\": \"" + lastName + "\",\n" +
                        "    \"role\": \"" + role + "\"\n" +
                        "  }\n" +
                        "}";
            } else {
                // Return error response
                response = "{\n" +
                        "  \"error\": \"Invalid credentials\",\n" +
                        "  \"message\": \"The email or password you entered is incorrect\"\n" +
                        "}";
            }
            
            // Set headers and send response
            setCorsHeaders(exchange);
            exchange.sendResponseHeaders(statusCode, response.getBytes(StandardCharsets.UTF_8).length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(response.getBytes(StandardCharsets.UTF_8));
            }
            
            System.out.println("[" + getCurrentTime() + "] POST /api/auth/login - " + statusCode + 
                    (authSuccess ? " Success: " : " Failed: ") + email);
        }
    }
    
    static class RegisterHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            // Handle CORS preflight requests
            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                handleCors(exchange);
                return;
            }
            
            String email = "newuser@example.com";
            String firstName = "New";
            String lastName = "User";
            String password = "password";
            String role = "USER";
            boolean registerSuccess = true;
            int statusCode = 200;
            
            // Process POST register request
            if ("POST".equals(exchange.getRequestMethod())) {
                try {
                    // Read request body
                    String requestBody = readInputStream(exchange.getRequestBody());
                    System.out.println("[" + getCurrentTime() + "] Register request: " + requestBody);
                    
                    // Extract user data
                    String parsedEmail = extractValue(requestBody, "email");
                    String parsedFirstName = extractValue(requestBody, "firstName");
                    String parsedLastName = extractValue(requestBody, "lastName");
                    String parsedPassword = extractValue(requestBody, "password");
                    
                    // Use parsed values if available
                    if (parsedEmail != null && !parsedEmail.isEmpty()) email = parsedEmail;
                    if (parsedFirstName != null && !parsedFirstName.isEmpty()) firstName = parsedFirstName;
                    if (parsedLastName != null && !parsedLastName.isEmpty()) lastName = parsedLastName;
                    if (parsedPassword != null && !parsedPassword.isEmpty()) password = parsedPassword;
                    
                    // Save the new user (in-memory only)
                    users.put(email, new UserInfo(email, firstName, lastName, password, role));
                    registerSuccess = true;
                    
                } catch (Exception e) {
                    System.out.println("[" + getCurrentTime() + "] Error processing registration: " + e.getMessage());
                    registerSuccess = false;
                    statusCode = 400;
                }
            }
            
            String response;
            
            if (registerSuccess) {
                // Return successful registration response
                response = "{\n" +
                        "  \"message\": \"Registration successful\",\n" +
                        "  \"user\": {\n" +
                        "    \"id\": " + (users.size() + 1) + ",\n" +
                        "    \"email\": \"" + email + "\",\n" +
                        "    \"firstName\": \"" + firstName + "\",\n" +
                        "    \"lastName\": \"" + lastName + "\",\n" +
                        "    \"role\": \"" + role + "\"\n" +
                        "  }\n" +
                        "}";
            } else {
                // Return error response
                response = "{\n" +
                        "  \"error\": \"Registration failed\",\n" +
                        "  \"message\": \"Unable to register user. Please try again.\"\n" +
                        "}";
            }
            
            // Set headers and send response
            setCorsHeaders(exchange);
            exchange.sendResponseHeaders(statusCode, response.getBytes(StandardCharsets.UTF_8).length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(response.getBytes(StandardCharsets.UTF_8));
            }
            
            System.out.println("[" + getCurrentTime() + "] POST /api/auth/register - " + statusCode + 
                    (registerSuccess ? " Success: " : " Failed: ") + email);
        }
    }
    
    // Helper methods
    
    // Extract a value from JSON-like string (basic implementation)
    private static String extractValue(String json, String key) {
        try {
            String fullKey = "\"" + key + "\"";
            int keyIndex = json.indexOf(fullKey);
            if (keyIndex == -1) return null;
            
            int valueStartIndex = json.indexOf(":", keyIndex) + 1;
            // Skip whitespace
            while (valueStartIndex < json.length() && 
                   (json.charAt(valueStartIndex) == ' ' || json.charAt(valueStartIndex) == '\t')) {
                valueStartIndex++;
            }
            
            // Check if value is a string
            if (json.charAt(valueStartIndex) == '"') {
                valueStartIndex++; // Skip opening quote
                int valueEndIndex = json.indexOf("\"", valueStartIndex);
                if (valueEndIndex > valueStartIndex) {
                    return json.substring(valueStartIndex, valueEndIndex);
                }
            }
            // Non-string value (number, boolean, null)
            else {
                int valueEndIndex = -1;
                for (int i = valueStartIndex; i < json.length(); i++) {
                    char c = json.charAt(i);
                    if (c == ',' || c == '}' || c == ']') {
                        valueEndIndex = i;
                        break;
                    }
                }
                if (valueEndIndex > valueStartIndex) {
                    return json.substring(valueStartIndex, valueEndIndex).trim();
                }
            }
        } catch (Exception e) {
            System.out.println("[" + getCurrentTime() + "] Error extracting " + key + ": " + e.getMessage());
        }
        return null;
    }
    
    // Read input stream to string
    private static String readInputStream(InputStream inputStream) {
        try (Scanner scanner = new Scanner(inputStream, StandardCharsets.UTF_8.name())) {
            return scanner.useDelimiter("\\A").hasNext() ? scanner.next() : "";
        }
    }
    
    // Get current time as formatted string
    private static String getCurrentTime() {
        return java.time.LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("HH:mm:ss"));
    }
    
    // Handle CORS preflight requests
    private static void handleCors(HttpExchange exchange) throws IOException {
        setCorsHeaders(exchange);
        exchange.sendResponseHeaders(204, -1);
        exchange.close();
    }
    
    // Set CORS headers
    private static void setCorsHeaders(HttpExchange exchange) {
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Credentials", "true");
        exchange.getResponseHeaders().add("Content-Type", "application/json");
    }
} 