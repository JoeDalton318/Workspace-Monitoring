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
    captureFullscreen: boolean;
  };
  identity: { enabled: boolean; };
  network: { enabled: boolean; };
  plagiarism: { enabled: boolean; };
  proctoring: { enabled: boolean; };
  activity: { enabled: boolean; };
  desktopApp: { enabled: boolean; };
  riskAggregation: { enabled: boolean; };
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
    simulateFullscreen: boolean;
  };
  ui: {
    theme: 'light' | 'dark' | 'system';
    showRawEvents: boolean;
    maxTimelineItems: number;
    showFullscreenStatus: boolean;
    showFullscreenFilter: boolean;
  };
  logging: {
    level: 'debug' | 'info' | 'warn' | 'error';
  };
  app: {
    name: string;
    environment: 'development' | 'production' | 'test';
  };
}
