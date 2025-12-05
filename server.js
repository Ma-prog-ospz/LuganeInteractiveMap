const express = require("express");
const cors = require("cors"); // 1. Uvezite cors paket
const app = express();

// ----------------------------------------------------
// 2. Definirajte DOMENU koja ima pravo pristupa (vaš Netlify sajt)
// Zamijenite 'https://interactivemaplugane.netlify.app' s vašom stvarnom Netlify domenom!
const NETLIFY_FRONTEND_URL = 'https://interactivemaplugane.netlify.app'; 

const corsOptions = {
    origin: NETLIFY_FRONTEND_URL,
    // Dozvoljavamo metode koje koristite (GET i POST)
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", 
    preflightContinue: false,
    optionsSuccessStatus: 204
};

// 3. Primijenite CORS middleware PRIJE definiranja ruta
app.use(cors(corsOptions));
// ----------------------------------------------------

app.use(express.json());

let vehicles = {}; 

// Omogućava CORS za sve preostale putanje (nakon preflight provjere)
app.options('*', cors(corsOptions)); 

// Roblox šalje GPS podatke
app.post("/vehicle/update", (req, res) => {
    const v = req.body;

    if (!v.id) {
        return res.status(400).json({ error: "Missing id" });
    }
    
    // Dodajemo log u konzolu Rendra da bismo potvrdili da podaci stižu
    console.log(`GPS Update received for ID: ${v.id}. Line: ${v.line}`); 

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
