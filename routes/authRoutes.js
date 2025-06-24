import express from 'express';
const router = express.Router();

// your routes
router.get('/', (req, res) => {
  res.send('Auth route works');
});

export default router;
