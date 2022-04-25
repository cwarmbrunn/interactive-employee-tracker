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
const addEmployee = async () => {
  // Create an empty Manager Choices array that will hold current employees
  const managerChoices = [];
  // Create an empty Role Choices array that will hold current roles
  const roleChoices = [];

  // Set a variable const employees equal to the db.query() that will call the employee table

  const [employees] = await db.promise().query(`SELECT * FROM employee`);

  // Set variable const roleOptions equal to the db.query that will call the role table

  const [roleOptions] = await db.promise().query(`SELECT * FROM role`);

  // Push the data into the managerChoices array
  for (i = 0; i < employees.length; i++) {
    managerChoices.push({
      name: employees[i].first_name + " " + employees[i].last_name,
      value: employees[i].id,
    });
  }

  // Push the role options into the roleChoices
  for (i = 0; i < roleOptions.length; i++) {
    roleChoices.push({ name: roleOptions[i].title, value: roleOptions[i].id });
  }

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
          // Uses spread operator to add role choices
          choices: [...roleChoices],
        },
        {
          // Question #4 - Select Manager (If Applicable)
          type: "list",
          name: "manager_id",
          // Uses spread operator to add manager choices and also adds a string of "Null"
          choices: [...managerChoices, "Null"],
        },
      ])
      // RETURN TO MENU AFTER PROMPTS ARE ANSWERED
      .then((answer) => {
        console.log(answer);
        db.query(
          `INSERT INTO employee SET ?`,
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.role,
            manager_id: answer.manager_id,
          },
          (err, res) => {
            if (err) throw err;
          }
        );
        console.log(
          `Added ${answer.first_name} ${answer.last_name} to the database!`
        ),
          promptUser();
      })
  );
};

// #3  - UPDATE EXISTING EMPLOYEE ROLE //
const updateEmployeeRole = async () => {
  // Set up an empty array to hold the current employees
  const changeRoleOfEmployee = [];

  // Set up an empty array to hold what the role will change to
  const changeRoleTo = [];

  // Set a variable "employees" equal to the db.query that will call the employee table
  const [employees] = await db.promise().query(`SELECT * FROM employee`);

  // Set a variable roleOptions equal to the db.query that will call the role table
  const [roleOptions] = await db.promise().query(`SELECT * FROM role`);

  // Push the employee options data into changeRoleOfEmployee

  // Set up a for loop to cycle through the employees length
  for (i = 0; i < employees.length; i++) {
    changeRoleOfEmployee.push({
      name: employees[i].first_name + " " + employees[i].last_name,
      value: employees[i].id,
    });
  }
  // TEST
  console.log(changeRoleOfEmployee);

  // Push the role options into the roleChoices
  for (i = 0; i < roleOptions.length; i++) {
    changeRoleTo.push({ name: roleOptions[i].title, value: roleOptions[i].id });
  }
  // TEST
  console.log(changeRoleTo);

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
          choices: [...changeRoleOfEmployee],
        },
        {
          // Question #2 - Asks which role you want to assign to the selected employee
          type: "list",
          name: "newEmployeeRole",
          message: "Which role do you want to assign to the selected employee?",

          // TO DO //

          // Pull roles from the database
          choices: [...changeRoleTo],
        },
      ])
      // Then console.log answers via template literal
      .then((answer) => {
        console.log(answer);
        db.query(
          `INSERT INTO role SET ?`,
          {
            id: answer.updatedEmployeeRole,
            role_id: answer.newEmployeeRole,
          },
          (err, res) => {
            if (err) throw err;
          }
        );
        // Console log to inform user of the changed role
        console.log(
          `You have updated ${answer.updatedEmployeeRole} to a ${answer.newEmployeeRole} - this change has been added to the database!`
        ),
          // RETURN TO MENU AFTER PROMPTS ARE ANSWERED
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
  const departmentsforRole = `SELECT name, id FROM department`;

  db.query(departmentsforRole, (err, addedDepartments) => {
    if (err) throw err;

    const departmentChoices = addedDepartments.map((dept) => {
      const departmentChoiceforRole = { name: dept.name, value: dept.id };
      return departmentChoiceforRole;
    });
  });
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
  db.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    promptUser();
  });
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
          validate: (answers) => {
            if (answers) {
              return true;
            } else {
              console.log("Please enter the name of the department!");
              return false;
            }
          },
        },
      ])
      .then((answers) => {
        const sql = `INSERT INTO department (name) VALUES (?)`;
        db.query(sql, answers.addedDepartment, (err, res) => {
          if (err) throw err;
          // Need to add new department to list in department database
          // Set up a console log with template literals
          console.log(
            `You've added ${answers.addedDepartment} to the database!`
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
