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
    const { user_id, date, lowValue, highValue, pulse } = req.body;

    try {
        const [result] = await pool.query(
            "INSERT INTO measurements (user_id, time, lowValue, highValue, pulse) VALUES (?, ?, ?, ?, ?)",
            [user_id, date, lowValue, highValue, pulse]
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

async function getHistory(req, res, next) {
    const user_id = req.params.user_id;
    let { start_date, end_date } = req.body;

    try {
        start_date += " 00:00:00";
        end_date += " 23:59:59";

        const [averageResult] = await pool.query(
            "SELECT AVG(lowValue) AS avgLow, AVG(highValue) AS avgHigh, AVG(pulse) AS avgPulse FROM measurements WHERE user_id = ? AND time BETWEEN ? AND ?",
            [user_id, start_date, end_date]
        );

        const avgLow = averageResult[0]?.avgLow || 0;
        const avgHigh = averageResult[0]?.avgHigh || 0;
        const avgPulse = averageResult[0]?.avgPulse || 0;

        if (avgLow === 0 && avgHigh === 0 && avgPulse === 0) {
            res.locals.measurements = [];
            res.locals.avgLow = avgLow;
            res.locals.avgHigh = avgHigh;
            res.locals.avgPulse = avgPulse;
            return next();
        }

        const lowThresholdMin = avgLow * 0.8; 
        const highThresholdMax = avgHigh * 1.2; 
        const pulseThresholdMax = avgPulse * 1.2; 
        const pulseThresholdMin = avgPulse * 0.8; 

        const [measurements] = await pool.query(
            `SELECT id, time, lowValue, highValue, pulse, 
                    (lowValue < ?) AS is_low_low,
                    (highValue > ?) AS is_high,
                    (pulse > ?) AS is_pulse_high,
                    (pulse < ?) AS is_pulse_low
             FROM measurements 
             WHERE user_id = ? AND time BETWEEN ? AND ?`,
            [lowThresholdMin, highThresholdMax, pulseThresholdMax, pulseThresholdMin, user_id, start_date, end_date]
        );

        res.locals.measurements = measurements;
        res.locals.avgLow = avgLow;
        res.locals.avgHigh = avgHigh;
        res.locals.avgPulse = avgPulse;
        next();
    } catch (error) {
        console.error("Error fetching history:", error);
        res.status(500).json({ message: "שגיאת שרת", error: error.message });
    }
}

async function getUsersSummary(req, res, next) {
    let { month, year } = req.body;

    try {
        if (!month || !year) {
            return res.status(400).json({ message: "חובה לספק חודש ושנה" });
        }

        const start_date = `${year}-${month}-01 00:00:00`;
        const end_date = `${year}-${month}-31 23:59:59`;

        const [usersSummary] = await pool.query(
            `WITH avg_values AS (
                SELECT user_id, 
                       IFNULL(AVG(lowValue), 0) AS avgLow, 
                       IFNULL(AVG(highValue), 0) AS avgHigh, 
                       IFNULL(AVG(pulse), 0) AS avgPulse
                FROM measurements 
                WHERE time BETWEEN ? AND ?
                GROUP BY user_id
            )
            SELECT u.id AS user_id, u.name, 
                   IFNULL(av.avgLow, 0) AS avgLow,
                   IFNULL(av.avgHigh, 0) AS avgHigh,
                   IFNULL(av.avgPulse, 0) AS avgPulse,
                   COUNT(DISTINCT CASE WHEN m.highValue > av.avgHigh * 1.2 THEN m.id END) AS highOutliers,
                   COUNT(DISTINCT CASE WHEN m.lowValue < av.avgLow * 0.8 THEN m.id END) AS lowOutliers,
                   COUNT(DISTINCT CASE WHEN m.pulse > av.avgPulse * 1.2 THEN m.id END) AS pulseHighOutliers,
                   COUNT(DISTINCT CASE WHEN m.pulse < av.avgPulse * 0.8 THEN m.id END) AS pulseLowOutliers
            FROM users u
            LEFT JOIN avg_values av ON u.id = av.user_id
            LEFT JOIN measurements m ON u.id = m.user_id AND m.time BETWEEN ? AND ?
            GROUP BY u.id, u.name, av.avgLow, av.avgHigh, av.avgPulse;`,
            [start_date, end_date, start_date, end_date]
        );

        res.locals.usersSummary = usersSummary;
        next();
    } catch (error) {
        console.error("Error fetching users summary:", error);
        res.status(500).json({ message: "שגיאת שרת", error: error.message });
    }
}

module.exports = {getMeasure,addMeasure, getHistory, getUsersSummary};