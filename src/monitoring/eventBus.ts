import type { MonitoringEvent } from './eventTypes';

type EventHandler = (event: MonitoringEvent) => void;

/**
 * EN: A simple pub/sub event bus to decouple monitoring from storage/UI.
 * FR: Un simple bus d'événements pub/sub pour découpler le monitoring du stockage/UI.
 */
class EventBus {
  private handlers: EventHandler[] = [];

  /**
   * EN: Subscribe to monitoring events.
   * FR: S'abonner aux événements de monitoring.
   */
  subscribe(handler: EventHandler): () => void {
    this.handlers.push(handler);
    // EN: Return unsubscribe function
    // FR: Retourner la fonction de désabonnement
    return () => {
      this.handlers = this.handlers.filter((h) => h !== handler);
    };
  }

  /**
   * EN: Publish a monitoring event.
   * FR: Publier un événement de monitoring.
   */
  publish(event: MonitoringEvent): void {
    this.handlers.forEach((handler) => {
      try {
        handler(event);
      } catch (error) {
        // EN: Catch and log to prevent one handler from breaking others
        // FR: Attraper et logger pour éviter qu'un handler n'en casse d'autres
        console.error('Error in event handler', error);
      }
    });
  }
}

export const eventBus = new EventBus();
