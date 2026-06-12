import { eventBus } from '../../monitoring/eventBus';

export class ActivityDetector {
  start() {
    window.addEventListener('paste', this.handlePaste);
    window.addEventListener('keydown', this.handleKeydown);
  }

  stop() {
    window.removeEventListener('paste', this.handlePaste);
    window.removeEventListener('keydown', this.handleKeydown);
  }

  private handlePaste = (e: ClipboardEvent) => {
    const text = e.clipboardData?.getData('text') || '';
    if (text.length > 50) {
      this.publishEvent('large_code_insertion', { length: text.length });
    }
    this.publishEvent('paste_event', { length: text.length });
  };

  private handleKeydown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
      this.publishEvent('shortcut_detected', { shortcut: 'Copy' });
    }
  };

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

    // Also send to backend
    fetch('http://localhost:3001/api/activity/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: 'global', events: [{ eventType, metadata, timestamp: Date.now() }] })
    });
  }
}

export const activityDetector = new ActivityDetector();
