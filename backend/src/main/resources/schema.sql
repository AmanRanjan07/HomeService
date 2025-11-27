-- Add created_at and updated_at columns to users table if they don't exist
DROP PROCEDURE IF EXISTS add_columns;

DELIMITER //
CREATE PROCEDURE add_columns()
BEGIN
    -- Check if created_at column exists
    IF NOT EXISTS (
        SELECT * FROM information_schema.COLUMNS 
        WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = 'users' 
        AND COLUMN_NAME = 'created_at'
    ) THEN
        ALTER TABLE users 
        ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP;
    END IF;
    
    -- Check if updated_at column exists
    IF NOT EXISTS (
        SELECT * FROM information_schema.COLUMNS 
        WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = 'users' 
        AND COLUMN_NAME = 'updated_at'
    ) THEN
        ALTER TABLE users 
        ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
    END IF;
END //
DELIMITER ;

CALL add_columns();
DROP PROCEDURE IF EXISTS add_columns; 