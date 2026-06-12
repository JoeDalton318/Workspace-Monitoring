import { Router } from 'express';

export const router = Router();

const sessionActivities: Record<string, any[]> = {};

router.post('/log', (req, res) => {
  const { sessionId, events } = req.body;
  if (!sessionId || !events || !Array.isArray(events)) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  if (!sessionActivities[sessionId]) {
    sessionActivities[sessionId] = [];
  }

  sessionActivities[sessionId].push(...events);

  res.json({ status: 'logged', count: events.length });
});

router.get('/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  res.json(sessionActivities[sessionId] || []);
});
