const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../db');

const router = express.Router();

// กำหนดตำแหน่งที่เก็บไฟล์รูปภาพ
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/'); // เก็บรูปภาพในโฟลเดอร์ public/uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // ตั้งชื่อไฟล์ไม่ให้ซ้ำ
  },
});

const upload = multer({ storage });

// แสดงหน้าเพิ่มสินค้า
router.get('/add', (req, res) => {
  res.sendFile(__dirname.replace('routes', 'views') + '/add-product.html');
});

// เพิ่มสินค้าใหม่
router.post('/add', upload.single('ImageURL'), async (req, res) => {
  const { ProductName, Description, Price, Category, StockQuantity } = req.body;
  const ImageURL = req.file ? `/uploads/${req.file.filename}` : null;

  if (!ProductName || !Description || !Price || !Category || !StockQuantity || !ImageURL) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // เพิ่มข้อมูลสินค้าในฐานข้อมูล
    const result = await db.query(
      'INSERT INTO Products (ProductName, Description, Price, Category, StockQuantity, ImageURL) VALUES (?, ?, ?, ?, ?, ?)',
      [ProductName, Description, Price, Category, StockQuantity, ImageURL]
    );

    res.status(201).json({ message: 'Product added successfully!', productId: result[0].insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
