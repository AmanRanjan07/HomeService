-- Update existing users without a role to have USER role
UPDATE users SET role = 'USER' WHERE role IS NULL OR role = ''; 