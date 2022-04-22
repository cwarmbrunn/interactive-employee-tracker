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

// START SERVER - After database connection
// db.connect((err) => {
//   if (err) throw err;
//   console.log("Database Connection Successful! 🚀");
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}✅`);
//   });
// });

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
        console.log("You chose to show all employees");
        // Show Console.table of all Employees
        // RETURN TO MENU
        promptUser();
      }
      if (userSelection.nextSteps === "Add Employee") {
        console.log("You chose to add an employee");
        // Need to Create Inquirer Prompts
        // Ask for Employee First Name
        // Ask for Employee Last Name
        // Ask for Employee Role (list) - should include the added roles
        // Ask for Employee's Manager (list, can include "None")
        // RETURN TO MENU
        promptUser();
      }
      if (userSelection.nextSteps === "Update Employee Role") {
        console.log("You chose to update an employee's role");
        // Ask Which Employee's role you want to update (list of existing employees)
        // Ask Which role you want to assign to the selected employee
        // RETURN TO MENU
        promptUser();
      }

      if (userSelection.nextSteps === "View All Roles") {
        console.log("You chose to view all roles");

        // RETURN TO MENU
        promptUser();
      }
      if (userSelection.nextSteps === "Add Role") {
        console.log("You chose to add a role!");
        // Need to Create Inquirer Prompts
        // Ask for Name of Role
        // Ask for Salary of Role
        // Ask Which Department does Role belong to (list)
        // RETURN TO MENU
        promptUser();
      }
      if (userSelection.nextSteps === "View All Departments") {
        console.log("You chose to view all departments");

        // Create a function to get all of the departments
        getDepartments();
        // RETURN TO MENU
        promptUser();
      }
      if (userSelection.nextSteps === "Add Department") {
        console.log("You chose to ADD a department");
        // Need to Create Inquirer Prompts
        // Console.log = Added "ADDED DEPARTMENT" to the database
        // RETURN TO MENU
        promptUser();
      }

      // If the user selects the "Quit" option - they will trigger the endPrompt() function below
      if (userSelection.nextSteps === "Quit") {
        // This function will send a console log thanking them for using the application and saying goodbye
        endPrompt();
      }
    });
};

// Sets up the endPrompt function - this is only activated when a user selects "Quit"
const endPrompt = () => {
  console.log("Thank you for using the application, goodbye! 👋");
};

function getDepartments() {
  db.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
  });
}
// Activate the inquirer prompts
promptUser();
