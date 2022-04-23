-- Set up DROP conditions if tables for departments, roles, employees already exist
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;
-- Create a department table
CREATE TABLE department (
  -- Sets id as an integer and as primary key
  id INT PRIMARY KEY,
  -- Sets name with a character limit of 30
  name VARCHAR(30)
);
-- Insert the following into the department table
-- Note that each item has a id (integer)
-- and a string (under 30 characters) for the name
INSERT INTO
  department (id, name)
VALUES
  (1, "Marketing"),
  (2, "Legal"),
  (3, "Technology"),
  (4, "DEI"),
  (5, "HR"),
  (6, "Finance");
-- Create a table called role
  CREATE TABLE role (
    -- Sets id as a primary key/integer
    id INT PRIMARY KEY,
    -- Sets title with a character limit of 30
    title VARCHAR(30),
    -- Sets salary with decimal for accuracy
    salary DECIMAL,
    -- Sets deparment_id as a intger to hold reference to department role it belongs to
    department_id INT
  );
INSERT INTO
  role (id, title, salary, department_id)
VALUES
  (123123, "Broker", 55000, 6),
  (212312, "Lawyer", 100000, 2),
  (345353, "HR Manager", 62000, 5),
  (412312, "Chief Diversity Officer", 120000, 4),
  (512412, "Intern", 1000, 1);
CREATE TABLE employee (
    -- Sets id as a primary key/integer
    id INT PRIMARY KEY,
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
INSERT INTO
  employee (id, first_name, last_name, role_id, manager_id)
VALUES
  (1, "Kyle", "Barker", 123123, NULL),
  (2, "Maxine", "Shaw", 212312, NULL),
  (3, "Synclaire", "Jones", 345353, 4),
  (4, "Khadijah", "James", 412312, NULL),
  (5, "Ivan", "Ennis", 512412, 4);