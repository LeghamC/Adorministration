const express = require("express");
const db = require("../database");
const router = express.Router();

router.post("/", async (req, res) => {
  const { userId, description, points } = req.body;

  if (!userId || !description)
    return res.status(400).json({ message: "Invalid record" });

  await db.query(
    "INSERT INTO BehaviorRecords (UserID, DateRecord, Description, BehaviorPoints) VALUES (?, CURDATE(), ?, ?)",
    [userId, description, points]
  );

  res.json({ message: "Behavior recorded" });
});

router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM BehaviorRecords");
  res.json(rows);
});

module.exports = router;
