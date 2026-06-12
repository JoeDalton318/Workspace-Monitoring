import { eventBus } from '../../monitoring/eventBus';

const API_BASE = 'http://localhost:3001/api/plagiarism';

export class PlagiarismClient {
  async checkCode(code: string, candidateId: string = 'user1') {
    eventBus.publish({
      eventId: crypto.randomUUID(),
      sessionId: 'global',
      timestamp: Date.now(),
      eventType: 'plagiarism_check_start',
      visibilityState: 'visible',
      hidden: false,
      hasFocus: true,
      isIdle: false,
      isOnline: navigator.onLine,
      source: 'system',
      durationSincePreviousMs: null,
      metadata: null,
      createdAt: Date.now()
    });

    try {
      const response = await fetch(`${API_BASE}/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, candidateId })
      });
      const data = await response.json();

      if (data.isPlagiarized) {
        eventBus.publish({
          eventId: crypto.randomUUID(),
          sessionId: 'global',
          timestamp: Date.now(),
          eventType: 'plagiarism_detected',
          visibilityState: 'visible',
          hidden: false,
          hasFocus: true,
          isIdle: false,
          isOnline: navigator.onLine,
          source: 'system',
          durationSincePreviousMs: null,
          metadata: { similarityScore: data.similarityScore, matches: data.matches },
          createdAt: Date.now()
        });
      }

      eventBus.publish({
        eventId: crypto.randomUUID(),
        sessionId: 'global',
        timestamp: Date.now(),
        eventType: 'similarity_score',
        visibilityState: 'visible',
        hidden: false,
        hasFocus: true,
        isIdle: false,
        isOnline: navigator.onLine,
        source: 'system',
        durationSincePreviousMs: null,
        metadata: { score: data.similarityScore },
        createdAt: Date.now()
      });

      return data;
    } catch (e) {
      console.error('Plagiarism check failed', e);
      return null;
    }
  }
}

export const plagiarismClient = new PlagiarismClient();
