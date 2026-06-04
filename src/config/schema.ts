/**
 * EN: Central configuration schema for the application.
 * FR: Schéma de configuration centralisé de l'application.
 */
export interface AppConfig {
  monitoring: {
    enabled: boolean;
    pollIntervalMs: number;
    capturePageHide: boolean;
    captureBeforeUnload: boolean;
    deduplicateTransitions: boolean;
    captureFocus: boolean;
    captureIdle: boolean;
    captureNetwork: boolean;
    idleTimeoutMs: number;
  };
  storage: {
    adapter: 'memory' | 'localStorage' | 'indexedDB';
    maxEvents: number;
    persistEvents: boolean;
  };
  export: {
    enabled: boolean;
    formats: ('json' | 'csv')[];
  };
  demo: {
    enabled: boolean;
    autoSimulate: boolean;
    defaultPattern: string;
  };
  ui: {
    theme: 'light' | 'dark' | 'system';
    showRawEvents: boolean;
    maxTimelineItems: number;
  };
  logging: {
    level: 'debug' | 'info' | 'warn' | 'error';
  };
  app: {
    name: string;
    environment: 'development' | 'production' | 'test';
  };
}
