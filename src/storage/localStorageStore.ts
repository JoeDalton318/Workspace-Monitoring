import { EventStore } from './eventStore';
import { MonitoringEvent } from '../monitoring/eventTypes';
import { configManager } from '../config';

const STORAGE_KEY = 'workspace_monitoring_events';

/**
 * EN: LocalStorage adapter. Simple but limited in capacity.
 * FR: Adaptateur LocalStorage. Simple mais limité en capacité.
 */
export class LocalStorageStore implements EventStore {
  async init(): Promise<void> {
    if (typeof localStorage === 'undefined') {
      console.warn('LocalStorage is not available');
    }
  }

  async addEvent(event: MonitoringEvent): Promise<void> {
    const events = await this.getAllEvents();
    const config = configManager.get();
    
    events.push(event);

    // EN: Enforce max events limit
    // FR: Appliquer la limite max d'événements
    if (events.length > config.storage.maxEvents) {
      events.splice(0, events.length - config.storage.maxEvents);
    }

    this.saveEvents(events);
  }

  async getEventsBySession(sessionId: string): Promise<MonitoringEvent[]> {
    const events = await this.getAllEvents();
    return events.filter(e => e.sessionId === sessionId);
  }

  async getAllEvents(): Promise<MonitoringEvent[]> {
    if (typeof localStorage === 'undefined') return [];
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    try {
      return JSON.parse(stored) as MonitoringEvent[];
    } catch (e) {
      console.error('Failed to parse events from LocalStorage', e);
      return [];
    }
  }

  async clear(): Promise<void> {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  private saveEvents(events: MonitoringEvent[]): void {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
      } catch (e) {
        console.error('Failed to save events to LocalStorage (possibly quota exceeded)', e);
      }
    }
  }
}
