package com.homeservice.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.dao.DataAccessException;

import java.util.List;
import java.util.Map;

import com.homeservice.model.Role;
import com.homeservice.model.User;
import com.homeservice.repository.UserRepository;

@Component
@Order(2)  // Run after EmergencyDatabaseFixer
@Configuration
public class DatabaseInitializer implements CommandLineRunner {
    
    private static final Logger log = LoggerFactory.getLogger(DatabaseInitializer.class);

    private final JdbcTemplate jdbcTemplate;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public DatabaseInitializer(JdbcTemplate jdbcTemplate, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.jdbcTemplate = jdbcTemplate;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        try {
            // Check if users table exists
            if (!tableExists("users")) {
                log.info("Users table does not exist. Creating default schema...");
                createDefaultSchema();
                return;
            }
            
            // Print database schema information for debugging
            printTableStructure("users");
            
            // Handle duplicate columns first
            handleDuplicateColumns();
            
            // Make sure all required columns exist
            addRequiredColumns();
            
            // Print final structure
            printTableStructure("users");
            
            // Initialize default users
            initializeDefaultUsers();
            
        } catch (DataAccessException e) {
            log.error("Database error while initializing: {}", e.getMessage());
            throw new RuntimeException("Failed to initialize database", e);
        } catch (Exception e) {
            log.error("Unexpected error while initializing: {}", e.getMessage());
            throw new RuntimeException("Failed to initialize database", e);
        }
    }
    
    private void createDefaultSchema() {
        log.info("Creating default database schema...");
        jdbcTemplate.execute(
            "CREATE TABLE users (" +
            "id BIGINT AUTO_INCREMENT PRIMARY KEY," +
            "email VARCHAR(255) NOT NULL UNIQUE," +
            "password VARCHAR(255) NOT NULL," +
            "first_name VARCHAR(255) NOT NULL," +
            "last_name VARCHAR(255) NOT NULL," +
            "phone VARCHAR(20) NOT NULL," +
            "role ENUM(`ADMIN`, `USER`, `SERVICE_PROVIDER`) NOT NULL," +
            "enabled BIT(1) NOT NULL DEFAULT 1," +
            "created_at DATETIME DEFAULT CURRENT_TIMESTAMP," +
            "updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP" +
            ")"
        );
        log.info("Created users table with default schema");
    }
    
    private void handleDuplicateColumns() {
        log.info("Checking for duplicate columns...");
        
        // Check if both firstName and first_name exist
        boolean firstNameCamelExists = columnExists("users", "firstName");
        boolean firstNameSnakeExists = columnExists("users", "first_name");
        
        if (firstNameCamelExists && firstNameSnakeExists) {
            log.info("Both firstName and first_name exist. Dropping firstName.");
            jdbcTemplate.execute("ALTER TABLE users DROP COLUMN firstName");
        } else if (firstNameCamelExists && !firstNameSnakeExists) {
            log.info("Only firstName exists. Renaming to first_name.");
            jdbcTemplate.execute("ALTER TABLE users CHANGE firstName first_name VARCHAR(255) NOT NULL");
        }
        
        // Check if both lastName and last_name exist
        boolean lastNameCamelExists = columnExists("users", "lastName");
        boolean lastNameSnakeExists = columnExists("users", "last_name");
        
        if (lastNameCamelExists && lastNameSnakeExists) {
            log.info("Both lastName and last_name exist. Dropping lastName.");
            jdbcTemplate.execute("ALTER TABLE users DROP COLUMN lastName");
        } else if (lastNameCamelExists && !lastNameSnakeExists) {
            log.info("Only lastName exists. Renaming to last_name.");
            jdbcTemplate.execute("ALTER TABLE users CHANGE lastName last_name VARCHAR(255) NOT NULL");
        }
    }
    
    private void addRequiredColumns() {
        // Check if created_at column exists
        if (!columnExists("users", "created_at")) {
            log.info("Adding `created_at` column to users table");
            jdbcTemplate.execute("ALTER TABLE users ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP");
        }

        // Check if updated_at column exists
        if (!columnExists("users", "updated_at")) {
            log.info("Adding `updated_at` column to users table");
            jdbcTemplate.execute("ALTER TABLE users ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
        }

        // Check if first_name exists
        if (!columnExists("users", "first_name")) {
            log.info("Adding `first_name` column to users table");
            jdbcTemplate.execute("ALTER TABLE users ADD COLUMN first_name VARCHAR(255) NOT NULL DEFAULT ``");
        }

        // Check if last_name exists
        if (!columnExists("users", "last_name")) {
            log.info("Adding `last_name` column to users table");
            jdbcTemplate.execute("ALTER TABLE users ADD COLUMN last_name VARCHAR(255) NOT NULL DEFAULT ``");
        }

        // Check if phone exists
        if (!columnExists("users", "phone")) {
            log.info("Adding `phone` column to users table");
            jdbcTemplate.execute("ALTER TABLE users ADD COLUMN phone VARCHAR(20) NOT NULL DEFAULT ``");
        }
    }

    private void initializeDefaultUsers() {
        // Create admin user if it does not exist
        if (userRepository.findByEmail("admin@example.com").isEmpty()) {
            User adminUser = new User();
            adminUser.setEmail("admin@example.com");
            adminUser.setPassword(passwordEncoder.encode("admin123"));
            adminUser.setFirstName("Admin");
            adminUser.setLastName("User");
            adminUser.setPhone("+1234567890");
            adminUser.setRole(Role.ADMIN);
            adminUser.setEnabled(true);
            userRepository.save(adminUser);
            log.info("Created admin user: admin@example.com");
        }
        
        // Create regular user if it does not exist
        if (userRepository.findByEmail("user@example.com").isEmpty()) {
            User regularUser = new User();
            regularUser.setEmail("user@example.com");
            regularUser.setPassword(passwordEncoder.encode("user123"));
            regularUser.setFirstName("Regular");
            regularUser.setLastName("User");
            regularUser.setPhone("+1987654321");
            regularUser.setRole(Role.USER);
            regularUser.setEnabled(true);
            userRepository.save(regularUser);
            log.info("Created regular user: user@example.com");
        }
        
        // Create service provider if it does not exist
        if (userRepository.findByEmail("provider@example.com").isEmpty()) {
            User providerUser = new User();
            providerUser.setEmail("provider@example.com");
            providerUser.setPassword(passwordEncoder.encode("provider123"));
            providerUser.setFirstName("Service");
            providerUser.setLastName("Provider");
            providerUser.setPhone("+1122334455");
            providerUser.setRole(Role.SERVICE_PROVIDER);
            providerUser.setEnabled(true);
            userRepository.save(providerUser);
            log.info("Created provider user: provider@example.com");
        }
    }

    private void printTableStructure(String tableName) {
        log.info("Current structure of {} table:", tableName);
        
        List<Map<String, Object>> columns = jdbcTemplate.queryForList(
            "SELECT COLUMN_NAME, DATA_TYPE, COLUMN_KEY, IS_NULLABLE, COLUMN_DEFAULT " +
            "FROM INFORMATION_SCHEMA.COLUMNS " +
            "WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? " +
            "ORDER BY ORDINAL_POSITION",
            tableName
        );
        
        for (Map<String, Object> column : columns) {
            log.info("{} - {} - {} - {}",
                column.get("COLUMN_NAME"),
                column.get("DATA_TYPE"),
                column.get("IS_NULLABLE").equals("YES") ? "NULL" : "NOT NULL",
                column.get("COLUMN_DEFAULT") != null ? "DEFAULT: " + column.get("COLUMN_DEFAULT") : "NO DEFAULT");
        }
    }

    private boolean tableExists(String tableName) {
        Integer count = jdbcTemplate.queryForObject(
            "SELECT COUNT(*) FROM information_schema.TABLES WHERE " +
            "TABLE_SCHEMA = DATABASE() AND " +
            "TABLE_NAME = ?",
            Integer.class,
            tableName
        );
        return count != null && count > 0;
    }

    private boolean columnExists(String tableName, String columnName) {
        Integer count = jdbcTemplate.queryForObject(
            "SELECT COUNT(*) FROM information_schema.COLUMNS WHERE " +
            "TABLE_SCHEMA = DATABASE() AND " +
            "TABLE_NAME = ? AND " +
            "COLUMN_NAME = ?",
            Integer.class,
            tableName, columnName
        );
        return count != null && count > 0;
    }
}
