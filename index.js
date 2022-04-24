const express = require("express");
// Import Connection File
const db = require("./db/connection");
// Require Inquirer
const inquirer = require("inquirer");
// Require console.table
require("console.table");

// Set up the PORT access
const PORT = process.env.PORT || 3001;
const app = express();

// Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// NOT FOUND response for unmatched routes
app.use((req, res) => {
  res.status(404).end();
});

// Inquirer Prompt Begins
const promptUser = () => {
  return inquirer
    .prompt([
      {
        // Question #1 - Options
        type: "list",
        name: "nextSteps",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
      },
    ])
    .then((userSelection) => {
      // Set up if statements for user input
      if (userSelection.nextSteps === "View All Employees") {
        // Create a function to get all of the employees' data - including
        // employee ID, first/last names, job title, salary, and manager (if applicable)
        getEmployees();
      }
      if (userSelection.nextSteps === "Add Employee") {
        addEmployee();
        // TEST VERSION IS COMPLETE //

        // Ask for Employee First Name
        // Ask for Employee Last Name
        // Ask for Employee Role (list) - should include the added roles
        // Ask for Employee's Manager (list, can include "None")
        // RETURN TO MENU
      }
      if (userSelection.nextSteps === "Update Employee Role") {
        updateEmployeeRole();
        // TEST VERSION IS COMPLETE //

        // Ask Which Employee's role you want to update (list of existing employees)
        // Ask Which role you want to assign to the selected employee
        // RETURN TO MENU
      }

      if (userSelection.nextSteps === "View All Roles") {
        getRoles();
        // TEST VERSION IS COMPLETE //
      }
      if (userSelection.nextSteps === "Add Role") {
        console.log("You chose to add a role!");
        // TEST VERSION IS COMPLETE //

        // Function to trigger prompts for adding a new role to the datbase
        addEmployeeRole();
        // Ask for Name of Role
        // Ask for Salary of Role
        // Ask Which Department does Role belong to (list)
        // RETURN TO MENU
      }
      if (userSelection.nextSteps === "View All Departments") {
        // Create a function to get all of the departments
        getDepartments();
      }
      if (userSelection.nextSteps === "Add Department") {
        // TEST VERSION IS COMPLETE //

        addDepartment();
        // RETURN TO MENU
      }

      // If the user selects the "Quit" option - they will trigger the endPrompt() function below
      if (userSelection.nextSteps === "Quit") {
        // This function will send a console log thanking them for using the application and saying goodbye
        endPrompt();
      }
    });
};

// #1 - VIEW ALL EMPLOYEES //

// Function to get all employee data - including employee ID, first and last names
// job titles, departments, salaries, and manager that the employees report to

function getEmployees() {
  db.query(
    // Select employee ID, first/last name, job title, department name, salary, and manager they report to (if applicable)
    `SELECT employee.id,employee.first_name AS 'first name', employee.last_name AS 'last name', role.title AS 'job title', department.name AS 'department', role.salary, CONCAT (manager.first_name, ' ', manager.last_name) AS 'manager'  FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      // RETURN TO TABLE AFTER DISPLAYED
      promptUser();
    }
  );
}

// #2 - ADD NEW EMPLOYEE //

// ADD NEW EMPLOYEE //
const addEmployee = () => {
  // Set up inquirer prompts to begin asking questions
  return (
    inquirer
      .prompt([
        // Question #1 - Employee's Name
        {
          type: "input",
          name: "first_name",
          message: "What's the employee's first name? (Required)",

          // Validation to ensure input
          validate: (answer) => {
            if (answer) {
              return true;
            } else {
              console.log("Please enter the employee's first name!");
              return false;
            }
          },
        },
        {
          // Question #2 - Employee Last Name
          type: "input",
          name: "last_name",
          message: "What's the employee's last name? (Required)",

          // Validation to ensure input
          validate: (answer) => {
            if (answer) {
              return true;
            } else {
              console.log("Please enter the employee's last name!");
              return false;
            }
          },
        },
        {
          // Question #3 - Select Employee Role from Database
          type: "list",
          name: "role",

          // TO DO //
          // Need to input role types from database here
          choices: ["TEST1", "TEST2"],

          // May need to do a .then statement to capture data at end
        },
        {
          // Question #4 - Select Manager (If Applicable)
          type: "list",
          name: "manager_id",
          // TO DO //
          // Need to insert employee choices from database (and include None)
          choices: ["TEST MANAGER", "None"],
        },
      ])
      .then((answer) => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
        // Set up Parameters with the answers
        const params = [
          answer.first_name,
          answer.last_name,
          answer.role,
          answer.manager_id,
        ];
        console.log("DATA FROM PARAMS - LINE 198", params);

        // TO DO

        // Figure out how to make this work and push the data to the
        db.query(sql, params, (err, res) => {
          if (err) {
            res.status(400).json({ error: err.message });
            return;
          }
          // TODO - Figure out how to make this work and push the data to employee database
          res.json({ message: "Success!", data: answer });
        });
        console.log(
          `Added ${answer.first_name} ${answer.last_name} to the database!`
        );
      })
      // TO DO //

      // Get this to properly return to the menu after questions are answered
      // RETURN TO MENU AFTER PROMPTS ARE ANSWERED
      .then((answers) => {
        promptUser();
      })
  );
};

// #3  - UPDATE EXISTING EMPLOYEE ROLE //
const updateEmployeeRole = () => {
  // Set up inquirer prompts
  return (
    inquirer
      .prompt([
        {
          // Question #1 - Asks which employee needs to be updated
          type: "list",
          name: "updatedEmployeeRole",
          message: "Which employee's role would you like to update?",

          // TO DO //

          // Pull employee first/last names from database
          choices: ["TEST #1", "TEST #2"],
        },
        {
          // Question #2 - Asks which role you want to assign to the selected employee
          type: "list",
          name: "newEmployeeRole",
          message: "Which role do you want to assign to the selected employee?",

          // TO DO //

          // Pull roles from the database
          choices: ["TEST ROLE #1", "TEST ROLE #2"],
        },
      ])
      // Then console.log answers via template literal
      .then((answers) => {
        console.log(
          `You have updated ${answers.updatedEmployeeRole} to a ${answers.newEmployeeRole} - this change has been added to the database!`
        );
      })
      // RETURN TO MENU AFTER PROMPTS ARE ANSWERED
      .then((answers) => {
        promptUser();
      })
  );
};
// #4 - VIEW ALL ROLES //

// Function to get all roles, role ID, the department that role belongs to and the salary
function getRoles() {
  db.query(
    "SELECT employee.id, role.title, department.name AS 'department', role.salary FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      promptUser();
    }
  );
}

// #5 - ADD EMPLOYEE ROLE //
const addEmployeeRole = () => {
  // Set up inquirer prompts
  // const sql = `SELECT * FROM department`;
  // db.promise().query(sql, (err, res) => {
  //   if (err) throw err;
  //   let deptNamesArray = [];
  // });
  return (
    inquirer
      .prompt([
        {
          // Question #1 - Name of Role
          type: "input",
          name: "addedRole",
          message: "What is the name of the role? (Required)",

          // Validation to ensure input
          validate: (answer) => {
            if (answer) {
              return true;
            } else {
              console.log("Please enter the name of the role!");
              return false;
            }
          },
        },
        {
          // Question #2 - Salary of Role
          type: "input",
          name: "newRoleSalary",
          message:
            "What is the salary of the role? (Required and Numbers ONLY!)",

          // Validation to ensure input - NUMERIC
          validate: (answer) => {
            if (isNaN(answer) || !answer) {
              return "Please enter a number for the salary - delete your entry with the backspace key and try again!";
            }
            return true;
          },
        },
        {
          // Question #3 - Where Does Role Belong (Department Location)
          type: "list",
          name: "newRoleDepartment",
          message: "What department does the role belong to?",
          // TO DO //

          // Pull the department list from the database
          choices: ["Banking", "Marketing", "Legal"],
        },
      ])
      .then((answers) => {
        console.log(
          `You've added a ${answers.addedRole} to the ${answers.newRoleDepartment} department - this change has been added to the database.`
        );
      })
      // RETURN TO MENU AFTER PROMPTS ARE ANSWERED
      .then((answers) => {
        promptUser();
      })
  );
};

//#6 - VIEW ALL DEPARTMENTS //

// Function to get all departments and their ids

function getDepartments() {
  db.query(
    "SELECT employee.id, department.name AS 'department' FROM employee  JOIN role on employee.role_id = role.id JOIN department ON role.department_id = department.id",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      promptUser();
    }
  );
}

// #7 - ADD A DEPARTMENT //

const addDepartment = () => {
  // Set up inquirer prompts
  return (
    inquirer
      .prompt([
        {
          type: "input",
          name: "addedDepartment",
          message: "What is the name of the department? (Required)",
          // Validation to ensure input
          validate: (answer) => {
            if (answer) {
              return true;
            } else {
              console.log("Please enter the name of the department!");
              return false;
            }
          },
        },
      ])
      .then((answer) => {
        const sql = `INSERT INTO department (name) VALUES (?)`;
        db.query(sql, answer.addedDepartment, (err, res) => {
          if (err) throw err;
          // Need to add new department to list in department database
          // Set up a console log with template literals
          console.log(
            `You've added ${answer.addedDepartment} to the database!`
          );
        });
      })
      // RETURN TO MENU AFTER PROMPT IS ANSWERED
      .then((answers) => {
        getDepartments();
      })
  );
};

// #8 - QUIT //

// Sets up the endPrompt function - this is only activated when a user selects "Quit"
const endPrompt = () => {
  console.log("Thank you for using the application, goodbye! 👋");
};

// ACTIVATION //
// Activate the inquirer prompts
promptUser();
