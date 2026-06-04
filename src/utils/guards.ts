import type { MonitoringEvent } from '../monitoring/eventTypes';

/**
 * EN: Type guards for runtime validation.
 * FR: Type guards pour la validation à l'exécution.
 */

export const isMonitoringEvent = (obj: any): obj is MonitoringEvent => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.eventId === 'string' &&
    typeof obj.sessionId === 'string' &&
    typeof obj.eventType === 'string' &&
    typeof obj.visibilityState === 'string' &&
    typeof obj.hidden === 'boolean' &&
    typeof obj.source === 'string' &&
    typeof obj.timestamp === 'number' &&
    (typeof obj.durationSincePreviousMs === 'number' || obj.durationSincePreviousMs === null) &&
    typeof obj.createdAt === 'number'
  );
};
