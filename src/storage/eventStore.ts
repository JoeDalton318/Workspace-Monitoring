import { MonitoringEvent } from '../monitoring/eventTypes';

/**
 * EN: Interface for all event storage adapters.
 * FR: Interface pour tous les adaptateurs de stockage d'événements.
 */
export interface EventStore {
  /**
   * EN: Initialize the storage (e.g. open DB connection).
   * FR: Initialiser le stockage (ex: ouvrir connexion DB).
   */
  init(): Promise<void>;

  /**
   * EN: Add an event to the store.
   * FR: Ajouter un événement au store.
   */
  addEvent(event: MonitoringEvent): Promise<void>;

  /**
   * EN: Get all events for a specific session.
   * FR: Obtenir tous les événements d'une session spécifique.
   */
  getEventsBySession(sessionId: string): Promise<MonitoringEvent[]>;

  /**
   * EN: Get all stored events.
   * FR: Obtenir tous les événements stockés.
   */
  getAllEvents(): Promise<MonitoringEvent[]>;

  /**
   * EN: Clear all events from the store.
   * FR: Effacer tous les événements du store.
   */
  clear(): Promise<void>;
}
