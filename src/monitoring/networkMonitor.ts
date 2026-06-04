import { configManager } from '../config';

type NetworkChangeCallback = (type: 'network_online' | 'network_offline') => void;

export class NetworkMonitor {
  private callback: NetworkChangeCallback | null = null;
  private onOnline = () => this.trigger('network_online');
  private onOffline = () => this.trigger('network_offline');

  start(callback: NetworkChangeCallback): void {
    this.callback = callback;
    const config = configManager.get();

    if (config.monitoring.captureNetwork && typeof window !== 'undefined') {
      window.addEventListener('online', this.onOnline);
      window.addEventListener('offline', this.onOffline);
    }
  }

  stop(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('online', this.onOnline);
      window.removeEventListener('offline', this.onOffline);
    }
    this.callback = null;
  }

  private trigger(type: 'network_online' | 'network_offline'): void {
    if (this.callback) this.callback(type);
  }
}

export const networkMonitor = new NetworkMonitor();
