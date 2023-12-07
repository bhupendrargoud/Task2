-- init.sql

-- Create the nodedb database
CREATE DATABASE IF NOT EXISTS nodedb;

-- Switch to the nodedb database
USE nodedb;

-- Provide privileges to the root user
GRANT ALL PRIVILEGES ON nodedb.* TO 'root'@'localhost';

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Ps1234';
-- Flush privileges to apply changes
FLUSH PRIVILEGES;