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

async function deleteUser(req, res, next) {
  const user_id = req.params.user_id;

  try {
      const [user] = await pool.query("SELECT * FROM users WHERE id = ?", [user_id]);
      if (user.length === 0) {
          return res.status(404).json({ message: "המשתמש לא נמצא" });
      }

      await pool.query("DELETE FROM users WHERE id = ?", [user_id]);

      res.deletedUser = {
          message: "המשתמש נמחק בהצלחה",
          user_id: user_id
      };

      next();
  } catch (error) {
      res.status(500).json({ message: "שגיאת שרת", error: error.message });
  }
}

async function updateUser(req, res, next) {
  const id = req.params.user_id;
  const name = req.body.name;

  try {
      const [user] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
      if (user.length === 0) {
          return res.status(404).json({ message: "המשתמש לא נמצא" });
      }

      await pool.query("UPDATE users SET name = ? WHERE id = ?", [name, id]);

      res.updatedUser = {
          message: "המשתמש עודכן בהצלחה",
          user_id: id
      };

      next();
  } catch (error) {
      res.status(500).json({ message: "שגיאת שרת", error: error.message });
  }
}

module.exports = { getUsers, addUser, deleteUser, updateUser };