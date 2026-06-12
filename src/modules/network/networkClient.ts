import { eventBus } from '../../monitoring/eventBus';

const API_BASE = 'http://localhost:3001/api/network';

export class NetworkClient {
  private lastIp: string | null = null;
  private lastLocation: string | null = null;

  async captureLocation() {
    try {
      const response = await fetch(`${API_BASE}/ip-info`);
      const data = await response.json();
      
      const { ip, country, city, isp, isVpn } = data;
      const locationString = `${city}, ${country}`;

      if (this.lastIp && this.lastIp !== ip) {
        this.publishEvent('network_ip_change', { oldIp: this.lastIp, newIp: ip, isp, isVpn });
      } else if (!this.lastIp) {
        this.publishEvent('network_ip_capture', { ip, isp, isVpn });
      }
      this.lastIp = ip;

      if (this.lastLocation && this.lastLocation !== locationString) {
        this.publishEvent('location_change', { oldLocation: this.lastLocation, newLocation: locationString });
      } else if (!this.lastLocation) {
        this.publishEvent('location_capture', { location: locationString, country, city });
      }
      this.lastLocation = locationString;

      return data;
    } catch (e) {
      console.error('Failed to capture location', e);
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

export const networkClient = new NetworkClient();
