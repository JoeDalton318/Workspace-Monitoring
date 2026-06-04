import React from 'react';
import { EventTimeline } from '../components/EventTimeline';
import { DashboardActions } from '../components/DashboardActions';
import '../styles/dashboard.css';

export const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>Workspace Monitoring</h1>
        <DashboardActions />
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>EN: Status / FR: Statut</h3>
          <p>Active</p>
        </div>
      </div>

      <EventTimeline />
    </div>
  );
};
