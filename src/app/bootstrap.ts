import { configManager } from '../config';
import { runtime } from './runtime';

/**
 * EN: Bootstraps the application by loading config and initializing core systems.
 * FR: Initialise l'application en chargeant la config et les systèmes centraux.
 */
export const bootstrap = async (): Promise<void> => {
  // EN: Load environment variables into config
  // FR: Charger les variables d'environnement dans la config
  const envConfig = {
    monitoring: {
      enabled: import.meta.env.VITE_MONITORING_ENABLED !== 'false',
      pollIntervalMs: Number(import.meta.env.VITE_POLL_INTERVAL_MS) || 1000,
      capturePageHide: true,
      captureBeforeUnload: true,
      deduplicateTransitions: true,
    },
    app: {
      name: import.meta.env.VITE_APP_NAME || 'Workspace Monitoring',
      environment: (import.meta.env.VITE_APP_ENVIRONMENT as 'development' | 'production' | 'test') || 'development',
    }
  };

  configManager.update(envConfig);

  // EN: Start runtime orchestration
  // FR: Démarrer l'orchestration du runtime
  await runtime.start();
};
