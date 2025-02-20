const pool = require("../db");

async function name(req, res, next) {
  const [rows] = await pool.query("SELECT * FROM users");
  res.users = rows;
  next();
}

module.exports = name;