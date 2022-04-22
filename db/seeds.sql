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
  (1, "Broker", 55000, 6),
  (2, "Lawyer", 100000, 2),
  (3, "HR Manager", 62000, 5),
  (4, "Chief Diversity Officer", 120000, 4),
  (5, "Intern", 1000, 1);
-- Set up seed data for employee details
INSERT INTO
  employee (id, first_name, last_name, role_id, manager_id)
VALUES
  (1, "Kyle", "Barker", 1, NULL),
  (2, "Maxine", "Shaw", 2, NULL),
  (3, "Synclaire", "Jones", 3, 4),
  (4, "Khadijah", "James", 4, NULL),
  (5, "Ivan", "Ennis", 5, 4);