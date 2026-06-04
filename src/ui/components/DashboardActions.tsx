import React from 'react';
import { exportService } from '../../export/exportService';
import { runtime } from '../../app/runtime';
import { demoController } from '../../demo/demoController';

export const DashboardActions: React.FC = () => {
  const handleExport = async (format: 'json' | 'csv') => {
    const events = await runtime.getStore().getAllEvents();
    exportService.exportEvents(events, format);
  };

  const handleSimulate = (state: 'visible' | 'hidden' | 'blur' | 'focus' | 'idle' | 'active' | 'offline' | 'online') => {
    switch(state) {
      case 'visible': demoController.simulateEvent('page_visible'); break;
      case 'hidden': demoController.simulateEvent('page_hidden'); break;
      case 'blur': demoController.simulateEvent('page_blur'); break;
      case 'focus': demoController.simulateEvent('page_focus'); break;
      case 'idle': demoController.simulateEvent('user_idle'); break;
      case 'active': demoController.simulateEvent('user_active'); break;
      case 'offline': demoController.simulateEvent('network_offline'); break;
      case 'online': demoController.simulateEvent('network_online'); break;
    }
  };

  return (
    <div className="actions">
      <button onClick={() => handleExport('json')}>Export JSON</button>
      <button onClick={() => handleExport('csv')}>Export CSV</button>
      <div style={{ marginTop: '0.5rem' }}>
        <button onClick={() => handleSimulate('hidden')}>Simulate Hidden</button>
        <button onClick={() => handleSimulate('visible')}>Simulate Visible</button>
        <button onClick={() => handleSimulate('blur')}>Simulate Blur</button>
        <button onClick={() => handleSimulate('focus')}>Simulate Focus</button>
        <button onClick={() => handleSimulate('idle')}>Simulate Idle</button>
        <button onClick={() => handleSimulate('active')}>Simulate Active</button>
      </div>
    </div>
  );
};
