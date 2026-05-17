const express = require('express');
const cors = require('cors');
const cartRoutes = require('./cart');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount cart routes
app.use('/api/cart', cartRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Shamims Abaya API is running.' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});