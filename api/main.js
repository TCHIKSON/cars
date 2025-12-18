const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./Config/db.js");

const carRoutes = require("./Routes/cars.routes");
const authRoutes = require("./Routes/auth.routes");  // ← AJOUTE CETTE LIGNE

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/cars", carRoutes);
app.use("/auth", authRoutes);  // ← AJOUTE CETTE LIGNE

app.get("/api/message", (req, res) => {
  res.json({ message: "Backend opérationnel avec DB et Services !" });
});

app.listen(PORT, () => {
  console.log(` Serveur démarré sur http://localhost:${PORT}`);
});