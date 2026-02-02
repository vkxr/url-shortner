"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crypto_1 = require("crypto");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// CORS middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
        res.sendStatus(200);
        return;
    }
    next();
});
const PORT = Number(process.env.PORT) || 3000;
const db = new Map();
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    }
    catch (_a) {
        return false;
    }
}
function generateCode() {
    return (0, crypto_1.randomBytes)(6).toString("base64url").slice(0, 6);
}
function getBaseUrl(req) {
    if (process.env.BASE_URL) {
        return process.env.BASE_URL;
    }
    const protocol = req.get('x-forwarded-proto') || req.protocol || 'http';
    const host = req.get('host') || req.get('x-forwarded-host') || `localhost:${PORT}`;
    return `${protocol}://${host}`;
}
app.post("/api/shorturls", (req, res) => {
    const { url } = req.body;
    if (!url || !isValidUrl(url)) {
        res.status(400).json({ error: "Invalid URL" });
        return;
    }
    const code = generateCode();
    const expiry = Date.now() + 30 * 60 * 1000;
    const baseUrl = getBaseUrl(req);
    db.set(code, { url, expiry });
    res.json({ shortLink: `${baseUrl}/${code}` });
});
app.get("/:code", (req, res) => {
    const record = db.get(req.params.code);
    if (!record || Date.now() > record.expiry) {
        res.status(410).json({ error: "Link expired or invalid" });
        return;
    }
    res.redirect(record.url);
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
