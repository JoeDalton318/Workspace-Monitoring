import React, { useState, useEffect } from 'react';
import { proctoringClient } from '../../../modules/proctoring/proctoringClient';

export const ProctoringStatusCard: React.FC = () => {
  const [webcamActive, setWebcamActive] = useState(false);
  const [screenActive, setScreenActive] = useState(false);

  const toggleWebcam = () => {
    if (webcamActive) {
      proctoringClient.stopWebcamSnapshots();
    } else {
      proctoringClient.startWebcamSnapshots(10000); // 10s for demo
    }
    setWebcamActive(!webcamActive);
  };

  const toggleScreen = () => {
    if (screenActive) {
      proctoringClient.stopScreenRecording();
    } else {
      proctoringClient.startScreenRecording();
    }
    setScreenActive(!screenActive);
  };

  return (
    <div className="stat-card" style={{ gridColumn: 'span 2' }}>
      <h3>EN: Proctoring Controls / FR: Contrôles de Surveillance</h3>
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button 
          onClick={toggleWebcam} 
          style={{ padding: '8px 12px', cursor: 'pointer', background: webcamActive ? '#ffcccc' : '' }}
        >
          {webcamActive ? 'Stop Webcam' : 'Start Webcam Mock'}
        </button>
        <button 
          onClick={toggleScreen} 
          style={{ padding: '8px 12px', cursor: 'pointer', background: screenActive ? '#ffcccc' : '' }}
        >
          {screenActive ? 'Stop Screen Record' : 'Start Screen Record Mock'}
        </button>
      </div>
    </div>
  );
};
