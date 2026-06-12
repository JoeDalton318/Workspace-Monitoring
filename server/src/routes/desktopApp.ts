import { Router } from 'express';

export const router = Router();

router.post('/scan', (req, res) => {
  // Simulate an agent scanning local processes
  setTimeout(() => {
    // 5% chance of detecting a bad app in mock mode
    const hasBadApp = Math.random() > 0.95;
    
    if (hasBadApp) {
      res.json({
        status: 'warning',
        detectedApps: [
          { name: 'ChatGPT Desktop', processId: 1337, threatLevel: 'high' }
        ]
      });
    } else {
      res.json({
        status: 'clean',
        detectedApps: []
      });
    }
  }, 2000);
});
