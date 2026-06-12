import type { AppConfig } from './schema';

/**
 * EN: Default configuration values.
 * FR: Valeurs de configuration par défaut.
 */
export const defaultConfig: AppConfig = {
  monitoring: {
    enabled: true,
    pollIntervalMs: 1000,
    capturePageHide: true,
    captureBeforeUnload: true,
    deduplicateTransitions: true,
    captureFocus: true,
    captureIdle: true,
    captureNetwork: true,
    idleTimeoutMs: 60000,
    captureFullscreen: true,
  },
  identity: { enabled: true },
  network: { enabled: true },
  plagiarism: { enabled: true },
  proctoring: { enabled: true },
  activity: { enabled: true },
  desktopApp: { enabled: true },
  riskAggregation: { enabled: true },
  storage: {
    adapter: 'memory',
    maxEvents: 10000,
    persistEvents: true,
  },
  export: {
    enabled: true,
    formats: ['json', 'csv'],
  },
  demo: {
    enabled: false,
    autoSimulate: false,
    defaultPattern: 'random',
    simulateFullscreen: true,
  },
  ui: {
    theme: 'system',
    showRawEvents: false,
    maxTimelineItems: 100,
    showFullscreenStatus: true,
    showFullscreenFilter: true,
  },
  logging: {
    level: 'info',
  },
  app: {
    name: 'Workspace Monitoring',
    environment: 'development',
  },
};
