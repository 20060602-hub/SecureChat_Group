import express from 'express';
import {
  sendOtp,
  verifyOtp,
  verifyFingerprint,
  getVerifiedUsers,
  signUp,
  signIn
} from '../controllers/authController.js';

import User from '../models/User.js'; // 🟡 Add this line

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/verify-fingerprint', verifyFingerprint);
router.get('/verified-users', getVerifiedUsers);
router.post('/signUp', signUp);
router.post('/signIn', signIn);

// ✅ Add this route to get user details by email
router.get('/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      email: user.email,
      username: user.username,
      isVerified: user.isVerified,
      fingerprintID: user.fingerprintID,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
