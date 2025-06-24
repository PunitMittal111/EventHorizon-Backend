import express from 'express';
const router = express.Router();

// Example event route
router.get('/', (req, res) => {
  res.send('Event routes working');
});

export default router;
