const mysql = require('mysql2');

// สร้าง connection pool
const pool = mysql.createPool({
  host: 'localhost',        // ที่อยู่ของ MySQL Server
  user: 'root',             // ชื่อผู้ใช้ MySQL
  password: '',             // รหัสผ่าน
  database: 'beautystore',  // ชื่อฐานข้อมูล
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ใช้งาน pool แบบ promise
const db = pool.promise();

// เช็คการเชื่อมต่อ
db.getConnection()
  .then((connection) => {
    console.log('Connected Database');
    connection.release(); // ปล่อยการเชื่อมต่อกลับ pool
  })
  .catch((err) => {
    console.error('ไม่สามารถเชื่อมต่อฐานข้อมูลได้:', err.message);
  });

module.exports = db;
