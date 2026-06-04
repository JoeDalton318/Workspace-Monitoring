import { configManager } from '../config';
import { getTabState } from './tabState';

type VisibilityChangeCallback = (type: 'visibilitychange' | 'pagehide' | 'beforeunload') => void;

/**
 * EN: Core visibility monitor that listens to browser events.
 * FR: Moniteur central de visibilité qui écoute les événements du navigateur.
 */
export class VisibilityMonitor {
  private callback: VisibilityChangeCallback | null = null;
  private onVisibilityChange = () => this.trigger('visibilitychange');
  private onPageHide = () => this.trigger('pagehide');
  private onBeforeUnload = () => this.trigger('beforeunload');

  /**
   * EN: Start listening to visibility events.
   * FR: Commencer à écouter les événements de visibilité.
   */
  start(callback: VisibilityChangeCallback): void {
    this.callback = callback;
    const config = configManager.get();

    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', this.onVisibilityChange);
    }
    
    if (typeof window !== 'undefined') {
      if (config.monitoring.capturePageHide) {
        window.addEventListener('pagehide', this.onPageHide);
      }
      if (config.monitoring.captureBeforeUnload) {
        window.addEventListener('beforeunload', this.onBeforeUnload);
      }
    }
  }

  /**
   * EN: Stop listening to visibility events.
   * FR: Arrêter d'écouter les événements de visibilité.
   */
  stop(): void {
    if (typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', this.onVisibilityChange);
    }
    
    if (typeof window !== 'undefined') {
      window.removeEventListener('pagehide', this.onPageHide);
      window.removeEventListener('beforeunload', this.onBeforeUnload);
    }
    this.callback = null;
  }

  private trigger(type: 'visibilitychange' | 'pagehide' | 'beforeunload'): void {
    if (this.callback) {
      this.callback(type);
    }
  }
}

export const visibilityMonitor = new VisibilityMonitor();
