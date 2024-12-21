const express = require('express');
const router = express.Router();
const db = require('../db');

// ดึงข้อมูลผู้ใช้ทั้งหมด
router.get('/', async (req, res) => {
  try {
    const [users] = await db.query('SELECT * FROM Users');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ดึงข้อมูลผู้ใช้ตาม ID
router.get("/", (req,res)=> {
    res.sendFile(__dirname+"/register.html")
  })

// สมัครสมาชิกผู้ใช้ใหม่
router.post('/register', async (req, res) => {
    const { FirstName, LastName, Email, Password } = req.body;

    // ตรวจสอบข้อมูลที่รับมา
    console.log(req.body);  // ดูข้อมูลที่รับจากฟอร์ม

    if (!FirstName || !LastName || !Email || !Password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      const result = await db.query(
        'INSERT INTO Users (FirstName, LastName, Email, Password) VALUES (?, ?, ?, ?)',
        [FirstName, LastName, Email, Password || 'user']
      );
      res.status(201).json({ message: 'User registered successfully!', userId: result[0].insertId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

  

// แก้ไขข้อมูลผู้ใช้
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { FirstName, LastName, Email, Password } = req.body;
  try {
    const result = await db.query(
      'UPDATE Users SET FirstName = ?, LastName = ?, Email = ?, Password = ? WHERE UserID = ?',
      [FirstName, LastName, Email, Password, id]
    );
    if (result[0].affectedRows > 0) {
      res.json({ message: 'User updated successfully!' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ลบผู้ใช้
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM Users WHERE UserID = ?', [id]);
    if (result[0].affectedRows > 0) {
      res.json({ message: 'User deleted successfully!' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
