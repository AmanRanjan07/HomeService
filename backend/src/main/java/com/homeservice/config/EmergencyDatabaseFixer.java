package com.homeservice.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

/**
 * Emergency utility to fix the duplicate column issue in the users table.
 * This runs before the regular DatabaseInitializer.
 */
@Component
@Order(1)  // This runs before DatabaseInitializer which has default order of 0
public class EmergencyDatabaseFixer implements CommandLineRunner {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public EmergencyDatabaseFixer(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(String... args) {
        try {
            System.out.println("🔧 EMERGENCY DATABASE FIXER: Starting...");
            
            // First check if the users table exists
            if (!tableExists("users")) {
                System.out.println("🔧 EMERGENCY DATABASE FIXER: No users table found, nothing to fix.");
                return;
            }

            // Try to fix the issue with a direct SQL approach - create a new users table with correct schema
            fixDuplicateColumnsIssue();
            
            System.out.println("🔧 EMERGENCY DATABASE FIXER: Completed.");
        } catch (Exception e) {
            System.err.println("🔧 EMERGENCY DATABASE FIXER: Error: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    private void fixDuplicateColumnsIssue() {
        try {
            System.out.println("🔧 EMERGENCY DATABASE FIXER: Checking for duplicate columns...");
            
            // Check if firstName exists
            boolean hasFirstName = columnExists("users", "firstName");
            // Check if first_name exists
            boolean hasFirstNameUnderscore = columnExists("users", "first_name");
            
            if (hasFirstName && hasFirstNameUnderscore) {
                System.out.println("🔧 EMERGENCY DATABASE FIXER: Detected both firstName and first_name columns. Fixing...");
                
                // Drop the firstName column
                System.out.println("🔧 EMERGENCY DATABASE FIXER: Dropping firstName column");
                jdbcTemplate.execute("ALTER TABLE users DROP COLUMN firstName");
            }
            
            // Check if lastName exists
            boolean hasLastName = columnExists("users", "lastName");
            // Check if last_name exists
            boolean hasLastNameUnderscore = columnExists("users", "last_name");
            
            if (hasLastName && hasLastNameUnderscore) {
                System.out.println("🔧 EMERGENCY DATABASE FIXER: Detected both lastName and last_name columns. Fixing...");
                
                // Drop the lastName column
                System.out.println("🔧 EMERGENCY DATABASE FIXER: Dropping lastName column");
                jdbcTemplate.execute("ALTER TABLE users DROP COLUMN lastName");
            }
        } catch (Exception e) {
            System.err.println("🔧 EMERGENCY DATABASE FIXER: Error fixing duplicate columns: " + e.getMessage());
            e.printStackTrace();
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