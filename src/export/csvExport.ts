import type { MonitoringEvent } from '../monitoring/eventTypes';

/**
 * EN: Export events to CSV format.
 * FR: Exporter les événements au format CSV.
 */
export const generateCsvExport = (events: MonitoringEvent[]): string => {
  if (events.length === 0) return '';

  const headers = [
    'eventId',
    'sessionId',
    'eventType',
    'visibilityState',
    'hidden',
    'source',
    'timestamp',
    'durationSincePreviousMs',
    'createdAt',
  ];

  const rows = events.map((event) => {
    return [
      event.eventId,
      event.sessionId,
      event.eventType,
      event.visibilityState,
      String(event.hidden),
      event.source,
      String(event.timestamp),
      event.durationSincePreviousMs ? String(event.durationSincePreviousMs) : '',
      String(event.createdAt),
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
};
