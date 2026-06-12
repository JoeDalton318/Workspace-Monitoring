import { eventBus } from '../../monitoring/eventBus';

export class ExternalMonitorDetector {
  private displayCount: number = 1;

  start() {
    this.checkMonitors();
    // Recheck periodically or on window focus
    window.addEventListener('focus', this.checkMonitors);
  }

  stop() {
    window.removeEventListener('focus', this.checkMonitors);
  }

  private checkMonitors = () => {
    // Advanced heuristic using screen.isExtended if available
    let detectedExtended = false;
    if ('isExtended' in screen) {
      detectedExtended = (screen as any).isExtended;
    }

    if (detectedExtended && this.displayCount === 1) {
      this.displayCount = 2; // Arbitrary 2+ indicator
      eventBus.publish({
        eventId: crypto.randomUUID(),
        sessionId: 'global',
        timestamp: Date.now(),
        eventType: 'external_monitor_detected',
        visibilityState: 'visible',
        hidden: false,
        hasFocus: true,
        isIdle: false,
        isOnline: navigator.onLine,
        source: 'system',
        durationSincePreviousMs: null,
        metadata: { message: 'External monitor connected' },
        createdAt: Date.now()
      });
    }
  }
}

export const externalMonitorDetector = new ExternalMonitorDetector();
