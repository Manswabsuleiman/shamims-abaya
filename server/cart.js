const express = require('express');
const router = express.Router();

const carts = {};

const getCart = (userId) => {
  if (!carts[userId]) carts[userId] = [];
  return carts[userId];
};

router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  const cart = getCart(userId);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = cart.length > 0 ? 150 : 0;

  res.json({
    success: true,
    cart,
    summary: {
      subtotal,
      shipping,
      total: subtotal + shipping,
      itemCount: cart.reduce((acc, item) => acc + item.quantity, 0),
    },
  });
});

router.post('/:userId/add', (req, res) => {
  const { userId } = req.params;
  const { id, name, price, image, size, quantity = 1 } = req.body;

  if (!id || !name || !price) {
    return res.status(400).json({ success: false, message: 'id, name and price are required.' });
  }

  const cart = getCart(userId);

  // Check if same item + same size already in cart
  const existingIndex = cart.findIndex(
    (item) => item.id === id && item.size === size
  );

  if (existingIndex !== -1) {
    // Already exists — increment quantity
    cart[existingIndex].quantity += quantity;
  } else {
    // New item — push to cart
    cart.push({ id, name, price, image, size, quantity });
  }

  carts[userId] = cart;

  res.json({ success: true, message: 'Item added to cart.', cart });
});

// ─────────────────────────────────────────────
//  PATCH /api/cart/:userId/update
//  Updates quantity of a specific item
//  Body: { id, size, quantity }
// ─────────────────────────────────────────────
router.patch('/:userId/update', (req, res) => {
  const { userId } = req.params;
  const { id, size, quantity } = req.body;

  if (!id || quantity === undefined) {
    return res.status(400).json({ success: false, message: 'id and quantity are required.' });
  }

  if (quantity < 1) {
    return res.status(400).json({ success: false, message: 'Quantity must be at least 1.' });
  }

  const cart = getCart(userId);
  const itemIndex = cart.findIndex(
    (item) => item.id === id && item.size === size
  );

  if (itemIndex === -1) {
    return res.status(404).json({ success: false, message: 'Item not found in cart.' });
  }

  cart[itemIndex].quantity = quantity;
  carts[userId] = cart;

  res.json({ success: true, message: 'Quantity updated.', cart });
});

// ─────────────────────────────────────────────
//  DELETE /api/cart/:userId/remove
//  Removes a specific item by id + size
//  Body: { id, size }
// ─────────────────────────────────────────────
router.delete('/:userId/remove', (req, res) => {
  const { userId } = req.params;
  const { id, size } = req.body;

  if (!id) {
    return res.status(400).json({ success: false, message: 'id is required.' });
  }

  const cart = getCart(userId);
  const updatedCart = cart.filter(
    (item) => !(item.id === id && item.size === size)
  );

  carts[userId] = updatedCart;

  res.json({ success: true, message: 'Item removed.', cart: updatedCart });
});

// ─────────────────────────────────────────────
//  DELETE /api/cart/:userId/clear
//  Clears the entire cart for a user
// ─────────────────────────────────────────────
router.delete('/:userId/clear', (req, res) => {
  const { userId } = req.params;
  carts[userId] = [];
  res.json({ success: true, message: 'Cart cleared.', cart: [] });
});

module.exports = router;