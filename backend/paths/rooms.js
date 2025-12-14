const express = require("express");
const db = require("../database");
const router = express.Router();

router.get("/available", async (req, res) => {
  const [rooms] = await db.query(
    "SELECT * FROM Rooms WHERE Status = 'Available'"
  );
  res.json(rooms);
});

router.post("/assign", async (req, res) => {
  const { userId, roomId } = req.body;

  const [room] = await db.query(
    "SELECT * FROM Rooms WHERE RoomID = ? AND Status = 'Available'",
    [roomId]
  );

  if (room.length === 0)
    return res.status(400).json({ message: "Room not available" });

  await db.query(
    "INSERT INTO RoomAssignments (UserID, RoomID) VALUES (?, ?)",
    [userId, roomId]
  );

  await db.query(
    "UPDATE Rooms SET Status='Occupied' WHERE RoomID=?",
    [roomId]
  );

  res.json({ message: "Room assigned successfully" });
});

router.post("/pay", async (req, res) => {
  const { userId } = req.body;

  await db.query(
    "UPDATE RoomAssignments SET Paid=true WHERE UserID=?",
    [userId]
  );

  res.json({ message: "Payment successful" });
});

module.exports = router;
