// import AESKey from '../models/AESKey.js';
// import crypto from 'crypto';

// export const getOrGenerateAESKey = async (req, res) => {
//   const { userA, userB } = req.body;

//   const user1 = userA < userB ? userA : userB;
//   const user2 = userA < userB ? userB : userA;

//   try {
//     let keyDoc = await AESKey.findOne({ user1, user2 });

//     if (!keyDoc) {
//       const newKey = crypto.randomBytes(32).toString('hex'); // 256-bit key
//       keyDoc = new AESKey({ user1, user2, aesKey: newKey });
//       await keyDoc.save();
//     }

//     res.json({ aesKey: keyDoc.aesKey });
//   } catch (error) {
//     console.error('❌ AES key error:', error.message);
//     res.status(500).json({ error: 'Server error' });
//   }
// };
import AESKey from '../models/AESKey.js';
import crypto from 'crypto';

export const getOrCreateAESKey = async (req, res) => {
  const { fingerprint1, fingerprint2 } = req.body;

  if (!fingerprint1 || !fingerprint2) {
    return res.status(400).json({ message: 'Missing fingerprint IDs' });
  }

  const sorted = [fingerprint1, fingerprint2].sort();

  try {
    let keyDoc = await AESKey.findOne({ fingerprints: sorted });

    if (!keyDoc) {
      const newKey = crypto.randomBytes(32).toString('hex');
      keyDoc = new AESKey({ fingerprints: sorted, key: newKey });
      await keyDoc.save();
      console.log('🔐 New AES key created for fingerprints:', sorted);
    }

    res.status(200).json({ key: keyDoc.key });
  } catch (err) {
    console.error('❌ Error exchanging AES key:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
