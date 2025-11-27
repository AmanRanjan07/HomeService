package com.homeservice.util;

import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

/**
 * Utility to test database connection from the command line
 */
public class DatabaseConnectionTest {
    public static void main(String[] args) {
        Properties props = new Properties();
        
        try {
            // Try to load from application.properties
            String propertiesPath = "src/main/resources/application.properties";
            FileInputStream fis = new FileInputStream(propertiesPath);
            props.load(fis);
            
            String url = props.getProperty("spring.datasource.url");
            String username = props.getProperty("spring.datasource.username");
            String password = props.getProperty("spring.datasource.password");
            
            if (url == null || username == null) {
                System.err.println("Missing database configuration in application.properties");
                System.exit(1);
                return; // Unreachable but helps compiler understand url is not null below
            }
            
            // Extract the first part of URL for simple test
            String jdbcUrl = url.split("\\?")[0];
            
            System.out.println("Testing connection to: " + jdbcUrl);
            System.out.println("Username: " + username);
            
            // Load the MySQL JDBC driver
            Class.forName("com.mysql.cj.jdbc.Driver");
            
            // Try to connect
            try (Connection conn = DriverManager.getConnection(jdbcUrl, username, password)) {
                System.out.println("Database connection successful!");
                System.exit(0);
            } catch (SQLException e) {
                System.err.println("Database connection failed: " + e.getMessage());
                System.exit(1);
            }
            
        } catch (IOException e) {
            System.err.println("Error reading properties file: " + e.getMessage());
            System.exit(1);
        } catch (ClassNotFoundException e) {
            System.err.println("JDBC driver not found: " + e.getMessage());
            System.exit(1);
        }
    }
} 