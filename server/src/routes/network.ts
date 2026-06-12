import { Router } from 'express';

export const router = Router();

router.get('/ip-info', (req, res) => {
  // Try to get real IP if proxied, else fallback
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  
  if (Array.isArray(ip)) {
    ip = ip[0];
  }

  // Mock geo location lookup
  const mockGeo = {
    country: 'FR',
    city: 'Paris',
    isp: 'MockISP Telecom',
    isVpn: false
  };

  res.json({
    ip,
    ...mockGeo
  });
});
