const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const [users] = await db.query(
      "SELECT * FROM Users WHERE Email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        message: "Account does not exist"
      });
    }

    const user = users[0];
    const valid = await bcrypt.compare(password, user.Password);

    if (!valid) {
      return res.status(401).json({
        message: "Incorrect password"
      });
    }

    const token = jwt.sign(
      { id: user.UserID, role: user.Role },
      "secret",
      { expiresIn: "1h" }
    );

    res.json({ token, role: user.Role });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error during login"
    });
  }
});

// REGISTER (SIGN UP)
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // 1. Missing fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "All required fields must be filled"
      });
    }

    // 2. Invalid role (extra safety)
    const allowedRoles = ["student", "receptionist", "service", "admin"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        message: "Invalid role selected"
      });
    }

    // 3. Check if account already exists
    const [existing] = await db.query(
      "SELECT UserID FROM Users WHERE Email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        message: "This account already exists"
      });
    }

    // 4. Password validation
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long"
      });
    }

    // 5. Create account
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO Users
       (Name, Email, PhoneNumber, Password, Role)
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, phone || null, hashedPassword, role]
    );

    res.json({
      message: "Account created successfully. You can now log in."
    });
  } catch (err) {
    console.error(err);

    // 6. Database or unexpected error
    res.status(500).json({
      message: "Failed to create account due to server error"
    });
  }
});

module.exports = router;
