const pool = require("../db");

async function measure(req, res, next) {
    const id = req.params.user_id;
    
    try {
        const [rows] = await pool.query("SELECT * FROM measurements WHERE user_id = ?", [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: "לא נמצאו מדידות למשתמש זה." });
        }
        
        res.measurements = rows;
        next();
    } catch (error) {
        res.status(500).json({ message: "שגיאת שרת", error: error.message });
    }
}

module.exports = measure;