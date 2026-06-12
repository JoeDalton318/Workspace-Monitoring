import { eventBus } from '../../monitoring/eventBus';

const API_BASE = 'http://localhost:3001/api/risk';

export class RiskClient {
  private recentEvents: any[] = [];
  private scoreInterval: any;

  start() {
    eventBus.subscribe(events => {
      this.recentEvents = [...events];
    });

    this.scoreInterval = setInterval(() => {
      this.computeRisk();
    }, 5000);
  }

  stop() {
    if (this.scoreInterval) clearInterval(this.scoreInterval);
  }

  async computeRisk() {
    if (this.recentEvents.length === 0) return;

    try {
      const response = await fetch(`${API_BASE}/score`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events: this.recentEvents })
      });
      const data = await response.json();

      eventBus.publish({
        eventId: crypto.randomUUID(),
        sessionId: 'global',
        timestamp: Date.now(),
        eventType: 'risk_level_updated',
        visibilityState: 'visible',
        hidden: false,
        hasFocus: true,
        isIdle: false,
        isOnline: navigator.onLine,
        source: 'system',
        durationSincePreviousMs: null,
        metadata: { level: data.riskLevel },
        createdAt: Date.now()
      });

      return data.riskLevel;
    } catch (e) {
      console.error('Failed to compute risk', e);
    }
  }
}

export const riskClient = new RiskClient();
