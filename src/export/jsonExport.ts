import { MonitoringEvent } from '../monitoring/eventTypes';
import { configManager } from '../config';

/**
 * EN: Export events to JSON format.
 * FR: Exporter les événements au format JSON.
 */
export const generateJsonExport = (events: MonitoringEvent[]): string => {
  const config = configManager.get();
  
  const payload = {
    metadata: {
      appName: config.app.name,
      environment: config.app.environment,
      exportedAt: new Date().toISOString(),
      eventCount: events.length,
    },
    events,
  };

  return JSON.stringify(payload, null, 2);
};
