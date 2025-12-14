const express = require("express");
const db = require("../database");
const router = express.Router();

router.post("/", async (req, res) => {
  const { userId, description } = req.body;
  if (!description)
    return res.status(400).json({ message: "Missing description" });

  await db.query(
    "INSERT INTO Interventions (UserID, Description, Status, DateRequest) VALUES (?, ?, 'Pending', CURDATE())",
    [userId, description]
  );

  res.json({ message: "Request submitted" });
});

router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM Interventions");
  res.json(rows);
});

router.post("/update", async (req, res) => {
  const { interventionId, status } = req.body;
  await db.query(
    "UPDATE Interventions SET Status=? WHERE InterventionID=?",
    [status, interventionId]
  );
  res.json({ message: "Status updated" });
});

module.exports = router;
