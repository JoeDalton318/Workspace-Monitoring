import React, { useEffect, useState } from 'react';
import { EventTimeline } from '../components/EventTimeline';
import { DashboardActions } from '../components/DashboardActions';
import { getTabState } from '../../monitoring/tabState';
import type { TabState } from '../../monitoring/tabState';
import { eventBus } from '../../monitoring/eventBus';
import { IdentityStatusCard } from '../components/identity/IdentityStatusCard';
import { NetworkStatusCard } from '../components/network/NetworkStatusCard';
import { PlagiarismReportCard } from '../components/plagiarism/PlagiarismReportCard';
import { ProctoringStatusCard } from '../components/proctoring/ProctoringStatusCard';
import { SuspiciousActivityCard } from '../components/activity/SuspiciousActivityCard';
import { DesktopAppStatusCard } from '../components/desktopApp/DesktopAppStatusCard';
import { RiskLevelCard } from '../components/risk/RiskLevelCard';
import '../styles/dashboard.css';

export const Dashboard: React.FC = () => {
  const [state, setState] = useState<TabState>(getTabState());
  const [isFullscreen, setIsFullscreen] = useState<boolean>(
    typeof document !== 'undefined' 
      ? !!document.fullscreenElement || (window.innerHeight === window.screen.height && window.innerWidth === window.screen.width)
      : false
  );
  
  const [metrics, setMetrics] = useState({
    innerHeight: typeof window !== 'undefined' ? window.innerHeight : 0,
    screenHeight: typeof window !== 'undefined' ? window.screen.height : 0,
    innerWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
    screenWidth: typeof window !== 'undefined' ? window.screen.width : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setMetrics({
        innerHeight: window.innerHeight,
        screenHeight: window.screen.height,
        innerWidth: window.innerWidth,
        screenWidth: window.screen.width,
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // EN: Update live state on any event
    // FR: Mettre à jour l'état en direct à chaque événement
    const unsubscribe = eventBus.subscribe((e) => {
      setState(getTabState());
      if (e.eventType === 'fullscreen_enter') {
        setIsFullscreen(true);
      } else if (e.eventType === 'fullscreen_exit') {
        setIsFullscreen(false);
      }
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
        <div className="stat-card">
          <h3>EN: Fullscreen / FR: Plein écran</h3>
          <p style={{ color: isFullscreen ? 'green' : 'gray', fontWeight: 'bold' }}>
            {isFullscreen ? 'FULLSCREEN' : 'NORMAL'}
          </p>
          <div style={{ marginTop: '10px', fontSize: '0.85em', opacity: 0.8, textAlign: 'left', background: 'rgba(128,128,128,0.1)', padding: '5px', borderRadius: '4px' }}>
            <div style={{fontFamily: 'monospace'}}>W: {metrics.innerWidth} / {metrics.screenWidth}</div>
            <div style={{fontFamily: 'monospace'}}>H: {metrics.innerHeight} / {metrics.screenHeight}</div>
            <div style={{marginTop: '4px', fontWeight: 'bold', color: (metrics.innerWidth === metrics.screenWidth && metrics.innerHeight === metrics.screenHeight) ? 'green' : 'inherit'}}>
              Match F11: {(metrics.innerWidth === metrics.screenWidth && metrics.innerHeight === metrics.screenHeight) ? 'YES' : 'NO'}
            </div>
          </div>
        </div>
      </div>

      <h2 style={{ marginTop: '20px' }}>Integrity & Security Modules</h2>
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        <IdentityStatusCard />
        <NetworkStatusCard />
        <PlagiarismReportCard />
        <ProctoringStatusCard />
        <SuspiciousActivityCard />
        <DesktopAppStatusCard />
        <RiskLevelCard />
      </div>

      <EventTimeline />
    </div>
  );
};
