import React, { useEffect, useState } from 'react';
import { activityDetector } from '../../../modules/activity/activityClient';
import { eventBus } from '../../../monitoring/eventBus';

export const SuspiciousActivityCard: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    activityDetector.start();
    
    const unsubscribe = eventBus.subscribe(events => {
      const activityEvents = events.filter(e => 
        ['paste_event', 'large_code_insertion', 'shortcut_detected', 'focus_loss', 'tab_switch'].includes(e.eventType)
      );
      if (activityEvents.length > 0) {
        setLogs(prev => [...activityEvents, ...prev].slice(0, 5));
      }
    });

    return () => {
      activityDetector.stop();
      unsubscribe();
    };
  }, []);

  return (
    <div className="stat-card" style={{ gridColumn: 'span 2' }}>
      <h3>EN: Suspicious Activity / FR: Activité Suspecte</h3>
      <div style={{ marginTop: '10px', fontSize: '0.85em', textAlign: 'left', background: '#333', color: '#fff', padding: '10px', borderRadius: '4px', height: '100px', overflowY: 'auto' }}>
        {logs.length === 0 && <div>No suspicious activity detected yet. (Try Ctrl+C or pasting text)</div>}
        {logs.map((l, i) => (
          <div key={i} style={{ marginBottom: '4px', borderBottom: '1px solid #444', paddingBottom: '4px' }}>
            <span style={{ color: '#ffaaaa' }}>[{new Date(l.timestamp).toLocaleTimeString()}]</span> {l.eventType.toUpperCase()} 
            {l.metadata && ` - ${JSON.stringify(l.metadata)}`}
          </div>
        ))}
      </div>
    </div>
  );
};
