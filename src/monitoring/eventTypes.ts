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
  | 'network_offline'
  | 'fullscreen_enter'
  | 'fullscreen_exit'
  | 'pagehide'
  | 'beforeunload'
  | 'manual_demo_transition'
  | 'storage_export'
  | 'config_loaded'
  | 'identity_verification_start'
  | 'identity_verification_success'
  | 'identity_verification_failed'
  | 'third_party_identity_check'
  | 'network_ip_capture'
  | 'network_ip_change'
  | 'location_capture'
  | 'location_change'
  | 'external_monitor_detected'
  | 'plagiarism_check_start'
  | 'plagiarism_detected'
  | 'similarity_score'
  | 'cross_candidate_match'
  | 'proctoring_webcam_snapshot'
  | 'proctoring_video_start'
  | 'proctoring_video_end'
  | 'proctoring_screen_start'
  | 'proctoring_screen_end'
  | 'live_proctoring_tab_switch'
  | 'live_proctoring_focus_loss'
  | 'live_proctoring_copy_attempt'
  | 'live_proctoring_external_paste'
  | 'typing_pattern_suspicious'
  | 'paste_event'
  | 'tab_switch'
  | 'focus_loss'
  | 'timing_anomaly'
  | 'large_code_insertion'
  | 'shortcut_detected'
  | 'desktop_app_scan'
  | 'invisible_ai_app_detected'
  | 'risk_level_computed'
  | 'risk_level_updated';

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
  metadata: {
    fullscreenElementTag?: string | null;
    fullscreenEnabled?: boolean;
    [key: string]: any;
  } | null;
  
  // EN: System creation timestamp
  // FR: Horodatage de création système
  createdAt: number;
}
