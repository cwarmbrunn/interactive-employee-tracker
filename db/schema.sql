-- Set up DROP conditions if tables for departments, roles, employees already exist
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;
-- Create a department table
CREATE TABLE department (
  -- Sets id as an integer and as primary key
  id INT PRIMARY KEY AUTO_INCREMENT,
  -- Sets name with a character limit of 30
  name VARCHAR(30)
);
-- Insert the following into the department table
-- Note that each item has a id (integer)
-- and a string (under 30 characters) for the name
  CREATE TABLE role (
    -- Sets id as a primary key/integer
    id INT PRIMARY KEY AUTO_INCREMENT,
    -- Sets title with a character limit of 30
    title VARCHAR(30),
    -- Sets salary with decimal for accuracy
    salary DECIMAL,
    -- Sets deparment_id as a intger to hold reference to department role it belongs to
    department_id INT
  );

CREATE TABLE employee (
    -- Sets id as a primary key/integer
    id INT PRIMARY KEY AUTO_INCREMENT,
    -- Sets first_name to hold employee first name with a limit of 30 characters
    first_name VARCHAR(30),
    -- Sets last_name to hold employee first name with a limit of 30 characters
    last_name VARCHAR(30),
    -- Sets role_id to hold reference to employee role
    role_id INT,
    -- Sets manager_id to hold reference to another employee that is their manager
    -- NULL if the employee has no manager
    manager_id INT
  );
