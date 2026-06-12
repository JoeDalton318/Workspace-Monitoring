import React, { useEffect, useState } from 'react';
import { networkClient } from '../../../modules/network/networkClient';

export const NetworkStatusCard: React.FC = () => {
  const [ipInfo, setIpInfo] = useState<any>(null);

  useEffect(() => {
    networkClient.captureLocation().then(data => {
      setIpInfo(data);
    });
  }, []);

  return (
    <div className="stat-card" style={{ gridColumn: 'span 2' }}>
      <h3>EN: Network & Location / FR: Réseau & Localisation</h3>
      <div style={{ marginTop: '10px', fontSize: '0.9em', textAlign: 'left', background: 'rgba(128,128,128,0.1)', padding: '10px', borderRadius: '4px' }}>
        {ipInfo ? (
          <>
            <div><strong>IP:</strong> {ipInfo.ip}</div>
            <div><strong>Location:</strong> {ipInfo.city}, {ipInfo.country}</div>
            <div><strong>ISP:</strong> {ipInfo.isp}</div>
            <div><strong>VPN Detected:</strong> {ipInfo.isVpn ? 'YES' : 'NO'}</div>
          </>
        ) : (
          <div>Loading network data...</div>
        )}
      </div>
    </div>
  );
};
