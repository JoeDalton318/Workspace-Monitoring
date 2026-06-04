import type { EventStore } from './eventStore';
import type { MonitoringEvent } from '../monitoring/eventTypes';

/**
 * EN: In-memory storage adapter. Ideal for tests or non-persistent mode.
 * FR: Adaptateur de stockage en mémoire. Idéal pour les tests ou mode non-persistant.
 */
export class MemoryStore implements EventStore {
  private events: MonitoringEvent[] = [];

  async init(): Promise<void> {
    // EN: Nothing to initialize
    // FR: Rien à initialiser
  }

  async addEvent(event: MonitoringEvent): Promise<void> {
    this.events.push(event);
  }

  async getEventsBySession(sessionId: string): Promise<MonitoringEvent[]> {
    return this.events.filter(e => e.sessionId === sessionId);
  }

  async getAllEvents(): Promise<MonitoringEvent[]> {
    return [...this.events];
  }

  async clear(): Promise<void> {
    this.events = [];
  }
}
