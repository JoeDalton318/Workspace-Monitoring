import React, { useEffect, useState } from 'react';
import { MonitoringEvent } from '../../monitoring/eventTypes';
import { eventBus } from '../../monitoring/eventBus';
import { runtime } from '../../app/runtime';

export const EventTimeline: React.FC = () => {
  const [events, setEvents] = useState<MonitoringEvent[]>([]);

  useEffect(() => {
    // EN: Load initial events
    // FR: Charger les événements initiaux
    runtime.getStore().getAllEvents().then(setEvents);

    // EN: Listen for new events
    // FR: Écouter les nouveaux événements
    const unsubscribe = eventBus.subscribe((newEvent) => {
      setEvents((prev) => [...prev, newEvent].slice(-100)); // EN: Keep last 100 / FR: Garder les 100 derniers
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="timeline">
      <h2>EN: Recent Events / FR: Événements Récents</h2>
      <table className="events-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Type</th>
            <th>State</th>
            <th>Source</th>
            <th>Duration (ms)</th>
          </tr>
        </thead>
        <tbody>
          {events.slice().reverse().map(e => (
            <tr key={e.eventId}>
              <td>{new Date(e.timestamp).toLocaleTimeString()}</td>
              <td>{e.eventType}</td>
              <td>{e.visibilityState}</td>
              <td>{e.source}</td>
              <td>{e.durationSincePreviousMs || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
