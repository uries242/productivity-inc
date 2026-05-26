import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = Router();

// POST /api/users/register
router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.status(201).json({ token });
  }
  catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/users/login
router.post('/login', async (req, res) => { 
  const { email, password } = req.body; //
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.isCorrectPassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
  } 
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
