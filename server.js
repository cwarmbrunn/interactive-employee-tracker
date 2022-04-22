const express = require("express");
// Import Connection File
const db = require("./db/connection");
// Connect to API Routes - need to confirm if needed
const apiRoutes = require("./routes/apiRoutes");

// Set up the PORT access
const PORT = process.env.PORT || 3001;
const app = express();

// Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Add after middleware
app.use("/api", apiRoutes);

// NOT FOUND response for unmatched routes
app.use((req, res) => {
  res.status(404).end();
});

// START SERVER - After database connection
db.connect((err) => {
  if (err) throw err;
  console.log("Database Connection Successful! 🚀");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}✅`);
  });
});
