import { Router } from 'express';

export const router = Router();

// A simple risk engine that aggregates points based on events
export function calculateRisk(events: any[]) {
  let score = 0;
  
  for (const ev of events) {
    switch(ev.eventType) {
      case 'paste_event': score += 15; break;
      case 'tab_switch': score += 10; break;
      case 'focus_loss': score += 5; break;
      case 'timing_anomaly': score += 20; break;
      case 'large_code_insertion': score += 25; break;
      case 'identity_verification_failed': score += 50; break;
      case 'invisible_ai_app_detected': score += 80; break;
      case 'plagiarism_detected': score += 80; break;
      case 'external_monitor_detected': score += 10; break;
    }
  }

  if (score >= 80) return 'High';
  if (score >= 40) return 'Moderate';
  if (score >= 10) return 'Low';
  return 'None';
}

router.post('/score', (req, res) => {
  const { events } = req.body;
  if (!events || !Array.isArray(events)) {
    return res.status(400).json({ error: 'Missing events' });
  }

  const riskLevel = calculateRisk(events);
  
  res.json({
    riskLevel,
    totalEventsProcessed: events.length
  });
});
