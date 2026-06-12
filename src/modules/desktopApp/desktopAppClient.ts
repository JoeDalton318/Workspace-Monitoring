import { eventBus } from '../../monitoring/eventBus';

const API_BASE = 'http://localhost:3001/api/desktopApp';

export class DesktopAppClient {
  async scanForInvisibleApps() {
    this.publishEvent('desktop_app_scan', { status: 'started' });
    try {
      const response = await fetch(`${API_BASE}/scan`, { method: 'POST' });
      const data = await response.json();

      if (data.status === 'warning' && data.detectedApps.length > 0) {
        this.publishEvent('invisible_ai_app_detected', { apps: data.detectedApps });
      } else {
        this.publishEvent('desktop_app_scan', { status: 'completed_clean' });
      }

      return data;
    } catch (e) {
      console.error('Failed to scan desktop apps', e);
      return null;
    }
  }

  private publishEvent(eventType: any, metadata: any) {
    eventBus.publish({
      eventId: crypto.randomUUID(),
      sessionId: 'global',
      timestamp: Date.now(),
      eventType,
      visibilityState: 'visible',
      hidden: false,
      hasFocus: true,
      isIdle: false,
      isOnline: navigator.onLine,
      source: 'system',
      durationSincePreviousMs: null,
      metadata,
      createdAt: Date.now()
    });
  }
}

export const desktopAppClient = new DesktopAppClient();
