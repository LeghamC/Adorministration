const express = require("express");
const cors = require("cors");

const authRoutes = require("./paths/authentification");
const roomRoutes = require("./paths/rooms");
const interventionRoutes = require("./paths/interventions");
const behaviorRoutes = require("./paths/behaviors");


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/interventions", interventionRoutes);
app.use("/api/behavior", behaviorRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));