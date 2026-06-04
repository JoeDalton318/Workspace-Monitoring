import React, { useEffect, useState } from 'react';
import { EventTimeline } from '../components/EventTimeline';
import { DashboardActions } from '../components/DashboardActions';
import { getTabState } from '../../monitoring/tabState';
import type { TabState } from '../../monitoring/tabState';
import { eventBus } from '../../monitoring/eventBus';
import '../styles/dashboard.css';

export const Dashboard: React.FC = () => {
  const [state, setState] = useState<TabState>(getTabState());

  useEffect(() => {
    // EN: Update live state on any event
    // FR: Mettre à jour l'état en direct à chaque événement
    const unsubscribe = eventBus.subscribe(() => {
      setState(getTabState());
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>Workspace Monitoring</h1>
        <DashboardActions />
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>EN: Visibility / FR: Visibilité</h3>
          <p style={{ color: state.visibilityState === 'visible' ? 'green' : 'red', fontWeight: 'bold' }}>
            {state.visibilityState.toUpperCase()}
          </p>
        </div>
        <div className="stat-card">
          <h3>EN: Focus / FR: Focus</h3>
          <p style={{ color: state.hasFocus ? 'green' : 'red', fontWeight: 'bold' }}>
            {state.hasFocus ? 'FOCUSED' : 'BLURRED'}
          </p>
        </div>
        <div className="stat-card">
          <h3>EN: Activity / FR: Activité</h3>
          <p style={{ color: state.isIdle ? 'orange' : 'green', fontWeight: 'bold' }}>
            {state.isIdle ? 'IDLE' : 'ACTIVE'}
          </p>
        </div>
        <div className="stat-card">
          <h3>EN: Network / FR: Réseau</h3>
          <p style={{ color: state.isOnline ? 'green' : 'red', fontWeight: 'bold' }}>
            {state.isOnline ? 'ONLINE' : 'OFFLINE'}
          </p>
        </div>
      </div>

      <EventTimeline />
    </div>
  );
};
