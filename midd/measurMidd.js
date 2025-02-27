const pool = require("../db");

async function getMeasure(req, res, next) {
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


async function addMeasure(req, res, next) {
    const { user_id, lowValue, highValue, pulse } = req.body;

    try {
        const [result] = await pool.query(
            "INSERT INTO measurements (user_id, time, lowValue, highValue, pulse) VALUES (?, NOW(), ?, ?, ?)",
            [user_id, lowValue, highValue, pulse]
        );

        res.newMeasurement = {
            message: "המדידה נוספה בהצלחה",
            measurement_id: result.insertId
        };

        next(); 
    } catch (error) {
        res.status(500).json({ message: "שגיאת שרת", error: error.message });
    }
}

module.exports = {getMeasure,addMeasure};