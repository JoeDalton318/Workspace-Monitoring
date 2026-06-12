import React, { useState } from 'react';
import { desktopAppClient } from '../../../modules/desktopApp/desktopAppClient';

export const DesktopAppStatusCard: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'scanning' | 'clean' | 'warning'>('idle');
  const [apps, setApps] = useState<any[]>([]);

  const handleScan = async () => {
    setStatus('scanning');
    const data = await desktopAppClient.scanForInvisibleApps();
    if (data && data.status === 'warning') {
      setStatus('warning');
      setApps(data.detectedApps);
    } else {
      setStatus('clean');
      setApps([]);
    }
  };

  return (
    <div className="stat-card" style={{ gridColumn: 'span 2' }}>
      <h3>EN: Desktop App Scanner / FR: Scan d'Applications Locales</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
        <button onClick={handleScan} disabled={status === 'scanning'} style={{ padding: '8px 12px', cursor: 'pointer', alignSelf: 'flex-start' }}>
          {status === 'scanning' ? 'Scanning Processes...' : 'Run Deep Scan'}
        </button>
        {status === 'clean' && (
          <div style={{ padding: '10px', background: '#e6ffe6', borderRadius: '4px', color: 'black' }}>
            No suspicious applications detected.
          </div>
        )}
        {status === 'warning' && (
          <div style={{ padding: '10px', background: '#ffe6e6', borderRadius: '4px', color: 'black' }}>
            <strong>WARNING: Suspicious applications found!</strong>
            <ul style={{ margin: '5px 0 0 20px', padding: 0 }}>
              {apps.map((app, i) => (
                <li key={i}>{app.name} (PID: {app.processId}) - Threat: {app.threatLevel.toUpperCase()}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
