import { configManager } from '../config';

type ActivityChangeCallback = (type: 'user_idle' | 'user_active') => void;

export class ActivityMonitor {
  private callback: ActivityChangeCallback | null = null;
  private isIdle = false;
  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  private lastActivityTime = 0;
  
  private onActivity = () => {
    const now = Date.now();
    // EN: Throttle events to max 1 per second to save CPU
    // FR: Limiter les événements à 1 max par seconde pour économiser le CPU
    if (now - this.lastActivityTime < 1000) return;
    this.lastActivityTime = now;
    
    if (this.isIdle) {
      this.isIdle = false;
      if (this.callback) this.callback('user_active');
    }
    
    this.resetIdleTimer();
  };

  private onIdle = () => {
    this.isIdle = true;
    if (this.callback) this.callback('user_idle');
  };

  start(callback: ActivityChangeCallback): void {
    this.callback = callback;
    const config = configManager.get();

    if (config.monitoring.captureIdle && typeof window !== 'undefined') {
      window.addEventListener('mousemove', this.onActivity, { passive: true });
      window.addEventListener('keydown', this.onActivity, { passive: true });
      window.addEventListener('scroll', this.onActivity, { passive: true });
      window.addEventListener('click', this.onActivity, { passive: true });
      window.addEventListener('touchstart', this.onActivity, { passive: true });
      
      this.resetIdleTimer();
    }
  }

  stop(): void {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    
    if (typeof window !== 'undefined') {
      window.removeEventListener('mousemove', this.onActivity);
      window.removeEventListener('keydown', this.onActivity);
      window.removeEventListener('scroll', this.onActivity);
      window.removeEventListener('click', this.onActivity);
      window.removeEventListener('touchstart', this.onActivity);
    }
    this.callback = null;
  }

  private resetIdleTimer() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    const config = configManager.get();
    if (config.monitoring.captureIdle) {
      this.timeoutId = setTimeout(this.onIdle, config.monitoring.idleTimeoutMs);
    }
  }

  getIsIdle(): boolean {
    return this.isIdle;
  }
}

export const activityMonitor = new ActivityMonitor();
