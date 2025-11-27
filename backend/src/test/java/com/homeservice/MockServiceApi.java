package com.homeservice;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;

public class MockServiceApi {
    public static void main(String[] args) throws Exception {
        int port = 5000;
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        
        // Routes
        server.createContext("/api/services", new ServicesHandler());
        server.createContext("/api/auth/login", new LoginHandler());
        server.createContext("/api/auth/register", new RegisterHandler());
        
        server.setExecutor(null); // Use the default executor
        server.start();
        System.out.println("Mock API Server started on port " + port);
        System.out.println("API endpoints available:");
        System.out.println("- GET /api/services");
        System.out.println("- POST /api/auth/login");
        System.out.println("- POST /api/auth/register");
    }
    
    static class ServicesHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                handleCors(exchange);
                return;
            }
            
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
            
            setCorsHeaders(exchange);
            exchange.sendResponseHeaders(200, response.getBytes(StandardCharsets.UTF_8).length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(response.getBytes(StandardCharsets.UTF_8));
            }
            System.out.println("Served request: GET /api/services");
        }
    }
    
    static class LoginHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                handleCors(exchange);
                return;
            }
            
            // Get input from request if it's a POST
            String email = "user@example.com";
            if ("POST".equals(exchange.getRequestMethod())) {
                String requestBody = convertInputStreamToString(exchange.getRequestBody());
                System.out.println("Login request received: " + requestBody);
                
                // Extract email from request if possible (simple parsing)
                if (requestBody.contains("email")) {
                    int start = requestBody.indexOf("email") + 7;
                    int end = requestBody.indexOf("\"", start);
                    if (end > start) {
                        email = requestBody.substring(start, end);
                    }
                }
            }
            
            String response = "{\n" +
                    "  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNTg2MzM0NzgxLCJleHAiOjE1ODY0MjExODF9.7EpJS_ZODOiTFNkxpEjIKQWfIECjvA3_7HHo0gjmsWE\",\n" +
                    "  \"user\": {\n" +
                    "    \"id\": 1,\n" +
                    "    \"email\": \"" + email + "\",\n" +
                    "    \"firstName\": \"John\",\n" +
                    "    \"lastName\": \"Doe\",\n" +
                    "    \"role\": \"USER\"\n" +
                    "  }\n" +
                    "}";
            
            setCorsHeaders(exchange);
            exchange.sendResponseHeaders(200, response.getBytes(StandardCharsets.UTF_8).length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(response.getBytes(StandardCharsets.UTF_8));
            }
            System.out.println("Served request: POST /api/auth/login - Logged in: " + email);
        }
    }
    
    static class RegisterHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                handleCors(exchange);
                return;
            }
            
            // Get input from request if it's a POST
            String email = "newuser@example.com";
            String firstName = "New";
            String lastName = "User";
            
            if ("POST".equals(exchange.getRequestMethod())) {
                String requestBody = convertInputStreamToString(exchange.getRequestBody());
                System.out.println("Registration request received: " + requestBody);
                
                // Very simple parsing to extract info (in production you'd use JSON parser)
                if (requestBody.contains("email")) {
                    try {
                        int start = requestBody.indexOf("\"email\"") + 8;
                        int end = requestBody.indexOf("\"", start + 2);
                        if (end > start) {
                            email = requestBody.substring(start + 2, end);
                        }
                        
                        // Try to extract firstName
                        if (requestBody.contains("firstName")) {
                            start = requestBody.indexOf("\"firstName\"") + 12;
                            end = requestBody.indexOf("\"", start + 2);
                            if (end > start) {
                                firstName = requestBody.substring(start + 2, end);
                            }
                        }
                        
                        // Try to extract lastName
                        if (requestBody.contains("lastName")) {
                            start = requestBody.indexOf("\"lastName\"") + 11;
                            end = requestBody.indexOf("\"", start + 2);
                            if (end > start) {
                                lastName = requestBody.substring(start + 2, end);
                            }
                        }
                    } catch (Exception e) {
                        System.out.println("Error parsing registration data: " + e.getMessage());
                    }
                }
            }
            
            String response = "{\n" +
                    "  \"message\": \"Registration successful\",\n" +
                    "  \"user\": {\n" +
                    "    \"id\": 2,\n" +
                    "    \"email\": \"" + email + "\",\n" +
                    "    \"firstName\": \"" + firstName + "\",\n" +
                    "    \"lastName\": \"" + lastName + "\",\n" +
                    "    \"role\": \"USER\"\n" +
                    "  }\n" +
                    "}";
            
            setCorsHeaders(exchange);
            exchange.sendResponseHeaders(200, response.getBytes(StandardCharsets.UTF_8).length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(response.getBytes(StandardCharsets.UTF_8));
            }
            System.out.println("Served request: POST /api/auth/register - Registered: " + email);
        }
    }
    
    private static String convertInputStreamToString(InputStream inputStream) {
        try (Scanner scanner = new Scanner(inputStream, StandardCharsets.UTF_8.name())) {
            return scanner.useDelimiter("\\A").next();
        } catch (Exception e) {
            return "";
        }
    }
    
    private static void handleCors(HttpExchange exchange) throws IOException {
        setCorsHeaders(exchange);
        exchange.sendResponseHeaders(204, -1);
        exchange.close();
    }
    
    private static void setCorsHeaders(HttpExchange exchange) {
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type, Authorization");
        exchange.getResponseHeaders().add("Content-Type", "application/json");
    }
} 