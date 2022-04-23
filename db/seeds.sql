-- Set up seed data for deparments
INSERT INTO
  department (id, name)
VALUES
  (1, "Marketing"),
  (2, "Legal"),
  (3, "Technology"),
  (4, "DEI"),
  (5, "HR"),
  (6, "Finance");
-- Set up seed data for role
INSERT INTO
  role (id, title, salary, department_id)
VALUES
  (123123, "Broker", 55000, 6),
  (212312, "Lawyer", 100000, 2),
  (345353, "HR Manager", 62000, 5),
  (412312, "Chief Diversity Officer", 120000, 4),
  (512412, "Intern", 1000, 1);
-- Set up seed data for employee details
INSERT INTO
  employee (id, first_name, last_name, role_id, manager_id)
VALUES
  (1, "Kyle", "Barker", 123123, NULL),
  (2, "Maxine", "Shaw", 212312, NULL),
  (3, "Synclaire", "Jones", 345353, 4),
  (4, "Khadijah", "James", 412312, NULL),
  (5, "Ivan", "Ennis", 512412, 4);