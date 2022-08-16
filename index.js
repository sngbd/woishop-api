require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const productsRouter = require('./controllers/products')

app.use(cors());

app.use('/api/products', productsRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});