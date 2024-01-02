import express from 'express';

const router = express.Router();

router.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  return res.json({ username, email, password, msg: 'register route' });
});

export { router };
