const express = require('express');
const path = require('path'); // To handle paths more efficiently
const usersRouter = require('./routes/users'); // Import Users Router
const productsRouter = require('./routes/products');

const app = express();

// Middleware
app.use(express.json()); // Built-in middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Built-in middleware to parse URL-encoded data

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.get('/', (req,res)=> {
  res.sendFile(__dirname+"/views/index.html")
})
app.get('/register', (req,res)=> {
  res.sendFile(__dirname+"/views/register.html")
})
app.get('/cart', (req,res)=>{
  res.sendFile(__dirname+"/views/cart.html")
})
app.get('/add', (req,res)=>{
  res.sendFile(__dirname+"/views/add-product.html")
})

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
