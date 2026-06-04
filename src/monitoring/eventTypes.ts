/**
 * EN: Types of monitoring events.
 * FR: Types d'événements de monitoring.
 */
export type EventType =
  | 'session_start'
  | 'page_visible'
  | 'page_hidden'
  | 'pagehide'
  | 'beforeunload'
  | 'manual_demo_transition'
  | 'session_end'
  | 'storage_export'
  | 'config_loaded';

/**
 * EN: Source of the monitoring event.
 * FR: Source de l'événement de monitoring.
 */
export type EventSource = 'browser' | 'demo' | 'system';

/**
 * EN: The core monitoring event model.
 * FR: Le modèle central d'événement de monitoring.
 */
export interface MonitoringEvent {
  eventId: string;
  sessionId: string;
  eventType: EventType;
  visibilityState: DocumentVisibilityState;
  hidden: boolean;
  source: EventSource;
  timestamp: number; // UNIX timestamp (ms)
  durationSincePreviousMs: number | null;
  metadata: Record<string, any> | null;
  createdAt: number;
}
