import { Router } from 'express';

export const router = Router();

router.post('/verify', (req, res) => {
  const { idImage, selfieImage } = req.body;
  
  if (!idImage || !selfieImage) {
    return res.status(400).json({ error: 'Missing images' });
  }

  // Simulate processing delay
  setTimeout(() => {
    // Mock random success
    const success = Math.random() > 0.1; // 90% success
    if (success) {
      res.json({ status: 'success', matchScore: 98, message: 'Identity verified successfully' });
    } else {
      res.json({ status: 'failed', matchScore: 45, message: 'Facial mismatch' });
    }
  }, 1500);
});

router.post('/third-party', (req, res) => {
  setTimeout(() => {
    res.json({ status: 'success', provider: 'OnfidoMock', message: 'Third-party check passed' });
  }, 1000);
});
