const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Fake/In-Memory Database for Reviews
let reviews = [
  { id: 1, productId: 101, user: "Mohamed", rating: 5, comment: "Excellent product!" },
  { id: 2, productId: 101, user: "Ahmed", rating: 4, comment: "Very good quality." }
];

// Health Check Endpoint
app.get('/', (req, res) => {
  res.send('ShopSphere Review Microservice is Running!');
});

// Get all reviews or filter by productId
app.get('/api/reviews', (req, res) => {
  const { productId } = req.query;
  if (productId) {
    const filtered = reviews.filter(r => r.productId == productId);
    return res.json(filtered);
  }
  res.json(reviews);
});

// Add a new review
app.post('/api/reviews', (req, res) => {
  const { productId, user, rating, comment } = req.body;
  const newReview = { id: Date.now(), productId, user, rating, comment };
  reviews.push(newReview);
  res.status(201).json(newReview);
});

app.listen(PORT, () => {
  console.log(`Review service running on port ${PORT}`);
});