import { eventBus } from '../../monitoring/eventBus';

const API_BASE = 'http://localhost:3001/api/proctoring';

export class ProctoringClient {
  private webcamInterval: any;
  private isScreenRecording = false;

  startWebcamSnapshots(intervalMs = 30000) {
    this.webcamInterval = setInterval(() => {
      // Mock snapshot creation
      this.publishEvent('proctoring_webcam_snapshot', { status: 'mock_snapshot_taken' });
      fetch(`${API_BASE}/snapshot`, { method: 'POST' });
    }, intervalMs);
  }

  stopWebcamSnapshots() {
    if (this.webcamInterval) {
      clearInterval(this.webcamInterval);
    }
  }

  startScreenRecording() {
    this.isScreenRecording = true;
    this.publishEvent('proctoring_screen_start', {});
  }

  stopScreenRecording() {
    this.isScreenRecording = false;
    this.publishEvent('proctoring_screen_end', {});
  }

  sendLiveSignal(signalType: string) {
    fetch(`${API_BASE}/signal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ signalType, timestamp: Date.now() })
    });
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

export const proctoringClient = new ProctoringClient();
