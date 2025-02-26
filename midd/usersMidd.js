const pool = require("../db");

async function getUsers(req, res, next) {
    try {
        const [rows] = await pool.query("SELECT * FROM users");
        res.users = rows;
        next();
    } catch (error) {
        res.status(500).json({ message: "שגיאת שרת", error: error.message });
    }
}

async function addUser(req, res, next) {
    const name = req.body.name;

    try {
        const [result] = await pool.query(
            "INSERT INTO users (name) VALUES (?)",
            [name]
        );

        res.newUser = {
            message: "המשתמש נוסף בהצלחה",
            user_id: result.insertId
        };

        next();
    } catch (error) {
        res.status(500).json({ message: "שגיאת שרת", error: error.message });
    }
}

module.exports = { getUsers, addUser };