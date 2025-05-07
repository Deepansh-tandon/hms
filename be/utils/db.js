// db.js
import mysql from 'mysql2/promise';

let db;

try {
  db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Deep12117$',
    database: 'HMS'
  });

  console.log("MySQL connected");
} catch (err) {
  console.error("MySQL connection failed:", err.message);
  process.exit(1);
}

export default db;
