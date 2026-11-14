
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

const inventoryRoutes = require("./routes/inventoryRoutes");
const userRoutes = require("./routes/userRoutes");

// Homepage
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CampusStock Backend is running!"
  });
});

// Test MySQL connection
app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT DATABASE() AS databaseName");

    res.json({
      success: true,
      message: "MySQL connected successfully!",
      database: rows[0].databaseName
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Database connection failed"
    });
  }
});

// Inventory routes
app.use("/api/inventory", inventoryRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`CampusStock server running on port ${PORT}`);
});
