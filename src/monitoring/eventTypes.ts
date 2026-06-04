// EN: Core types for the monitoring domain
// FR: Types centraux pour le domaine de monitoring

export type EventType = 
  | 'session_start'
  | 'session_end'
  | 'page_visible'
  | 'page_hidden'
  | 'page_focus'
  | 'page_blur'
  | 'user_idle'
  | 'user_active'
  | 'network_online'
  | 'network_offline';

export type EventSource = 'system' | 'demo';

export interface MonitoringEvent {
  eventId: string;
  sessionId: string;
  timestamp: number;
  eventType: EventType;
  
  // EN: State snapshot at the time of the event
  // FR: Instantané de l'état au moment de l'événement
  visibilityState: 'visible' | 'hidden';
  hidden: boolean;
  hasFocus: boolean;
  isIdle: boolean;
  isOnline: boolean;

  source: EventSource;
  
  // EN: Duration since the last event in the same session
  // FR: Durée depuis le dernier événement dans la même session
  durationSincePreviousMs: number | null;
  
  // EN: Extensible metadata payload
  // FR: Charge utile de métadonnées extensible
  metadata: Record<string, any> | null;
  
  // EN: System creation timestamp
  // FR: Horodatage de création système
  createdAt: number;
}
