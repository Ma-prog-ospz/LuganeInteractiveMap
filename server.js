const express = require("express");
const app = express();

app.use(express.json());

let vehicles = {}; // ovdje spremamo sve autobuse

// Roblox šalje GPS podatke
app.post("/vehicle/update", (req, res) => {
    const v = req.body;

    if (!v.id) {
        return res.status(400).json({ error: "Missing id" });
    }

    vehicles[v.id] = v;
    vehicles[v.id].updatedAt = Date.now();

    res.json({ status: "ok" });
});

// Web mapa traži listu svih vozila
app.get("/vehicles", (req, res) => {
    res.json(Object.values(vehicles));
});

app.get("/", (req, res) => {
    res.send("Transport API is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("API running on port", PORT));
