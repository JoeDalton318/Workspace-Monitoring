import { Router } from 'express';

export const router = Router();

router.post('/snapshot', (req, res) => {
  // We would normally save the base64 image to disk/S3 here
  // const { image, timestamp } = req.body;
  res.json({ status: 'saved' });
});

router.post('/signal', (req, res) => {
  // Receive live proctoring signals like tab switch, focus loss
  // const { signalType, timestamp } = req.body;
  res.json({ status: 'acknowledged' });
});
