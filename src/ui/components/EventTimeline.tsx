import React, { useEffect, useState } from 'react';
import type { MonitoringEvent } from '../../monitoring/eventTypes';
import { eventBus } from '../../monitoring/eventBus';
import { runtime } from '../../app/runtime';

export const EventTimeline: React.FC = () => {
  const [events, setEvents] = useState<MonitoringEvent[]>([]);

  useEffect(() => {
    runtime.getStore().getAllEvents().then(setEvents);

    const unsubscribe = eventBus.subscribe((newEvent) => {
      setEvents((prev) => [...prev, newEvent].slice(-100));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="timeline">
      <h2>EN: Recent Events / FR: Événements Récents</h2>
      <div style={{ overflowX: 'auto' }}>
        <table className="events-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Type</th>
              <th>Visibility</th>
              <th>Focus</th>
              <th>Idle</th>
              <th>Network</th>
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
                <td style={{ color: e.hasFocus ? 'green' : 'red' }}>{e.hasFocus ? 'Yes' : 'No'}</td>
                <td style={{ color: e.isIdle ? 'orange' : 'green' }}>{e.isIdle ? 'Idle' : 'Active'}</td>
                <td style={{ color: e.isOnline ? 'green' : 'red' }}>{e.isOnline ? 'Online' : 'Offline'}</td>
                <td>{e.source}</td>
                <td>{e.durationSincePreviousMs || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
