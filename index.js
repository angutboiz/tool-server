const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3080;

app.use(cors());
// Middleware để parse JSON
app.use(bodyParser.json());

// Route để xử lý yêu cầu đăng nhập
app.post("/login", (req, res) => {
    var ip = (req.headers["x-forwarded-for"] || "").split(",")[0] || req.connection.remoteAddress;
    console.log(ip);
    console.log(req.headers["user-agent"]);
    const { username, password, deviceId } = req.body;

    // Logic kiểm tra thông tin đăng nhập
    if (username === "trongan" && password === "123") {
        res.json({ success: true, message: "Login successful" });
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
});
app.get("/", (req, res) => {
    res.send("GET request to the homepage");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
