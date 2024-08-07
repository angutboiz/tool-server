const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3080;
const { getDocs, query, where, updateDoc, doc, addDoc } = require("firebase/firestore");
const { userTool, history } = require("./config");
const { format } = require("date-fns");

app.use(cors());
// Middleware để parse JSON
app.use(bodyParser.json());

// Route để xử lý yêu cầu đăng nhập
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await findUser(username, password);
    console.log(username, password, req.headers);
    if (user) {
        await updateUser(user.id, req.headers);
        await addHistory(username, password, req.headers, true);
        res.json({ success: true, message: "Login successful" });
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials or account is locked" });
        await addHistory(username, password, req.headers, false);
    }
});
app.get("/", async (req, res) => {});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const fetchData = async () => {
    try {
        const snapshot = await getDocs(userTool);
        const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        return users;
    } catch (error) {
        console.error("Error fetching data: ", error);
        return [];
    }
};

const findUser = async (username, password) => {
    try {
        const q = query(userTool, where("username", "==", username), where("password", "==", password), where("isLocked", "==", false));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return null;
        } else {
            const userDoc = querySnapshot.docs[0];
            return { id: userDoc.id, ...userDoc.data() };
        }
    } catch (error) {
        console.error("Error finding user: ", error);
        return null;
    }
};

const updateUser = async (userId, headers) => {
    try {
        const userRef = doc(userTool, userId);
        await updateDoc(userRef, {
            isLocked: true,
            date: new Date().toLocaleString("vi-VN", { timeZone: "Asia/Jakarta" }),
            headers: headers,
        });
        console.log(`User ${userId} is locked.`);
    } catch (error) {
        console.error("Error locking user: ", error);
    }
};

const addHistory = async (username, password, headers, isSuccess) => {
    try {
        const histories = {
            username,
            password,
            isSuccess,
            headers,
            date: new Date().toLocaleString("vi-VN", { timeZone: "Asia/Jakarta" }),
        };
        await addDoc(history, histories);
    } catch (error) {
        console.error("Error adding history: ", error);
    }
};
