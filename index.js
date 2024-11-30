const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

const TELEGRAM_BOT_TOKEN = "7138395020:AAF98yTTnZ_jDkGLqdbmNGo9_GkGYotoHl8";
const TELEGRAM_CHAT_ID = "1779078520";

app.use((req, res, next) => {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const timestamp = new Date().toISOString();

    const message = `New visitor detected!\nIP Address: ${ip}\nTime: ${timestamp}`;
    
    // Send message to Telegram
    axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: TELEGRAM_CHAT_ID,
        text: message
    }).then(() => {
        console.log("Notification sent to Telegram.");
    }).catch((error) => {
        console.error("Error sending Telegram message:", error.message);
    });

    // Redirect user to GitHub
    res.redirect("https://github.com");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
