import React, { useEffect, useState } from 'react';
import { eventBus } from '../../../monitoring/eventBus';
import { riskClient } from '../../../modules/risk/riskClient';

export const RiskLevelCard: React.FC = () => {
  const [level, setLevel] = useState<string>('None');

  useEffect(() => {
    riskClient.start();
    
    const unsubscribe = eventBus.subscribe(events => {
      const riskEvents = events.filter(e => e.eventType === 'risk_level_updated');
      if (riskEvents.length > 0) {
        setLevel(riskEvents[riskEvents.length - 1].metadata?.level || 'None');
      }
    });

    return () => {
      riskClient.stop();
      unsubscribe();
    };
  }, []);

  const getBackgroundColor = () => {
    if (level === 'High') return '#ff4d4d';
    if (level === 'Moderate') return '#ffaa00';
    if (level === 'Low') return '#ffff99';
    return '#e6ffe6';
  };

  const getTextColor = () => {
    if (level === 'Low' || level === 'None') return '#000';
    return '#fff';
  };

  return (
    <div className="stat-card" style={{ gridColumn: 'span 2' }}>
      <h3>EN: Risk Level / FR: Niveau de Risque</h3>
      <div style={{
        marginTop: '10px',
        padding: '20px',
        borderRadius: '8px',
        background: getBackgroundColor(),
        color: getTextColor(),
        fontSize: '2em',
        fontWeight: 'bold',
        textAlign: 'center'
      }}>
        {level.toUpperCase()}
      </div>
    </div>
  );
};
