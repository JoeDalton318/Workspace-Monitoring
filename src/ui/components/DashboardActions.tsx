import React from 'react';
import { exportService } from '../../export/exportService';
import { runtime } from '../../app/runtime';
import { demoController } from '../../demo/demoController';

export const DashboardActions: React.FC = () => {
  const handleExport = async (format: 'json' | 'csv') => {
    const events = await runtime.getStore().getAllEvents();
    exportService.exportEvents(events, format);
  };

  const handleSimulate = (state: 'visible' | 'hidden') => {
    demoController.toggleVisibility(state);
  };

  return (
    <div className="actions">
      <button onClick={() => handleExport('json')}>Export JSON</button>
      <button onClick={() => handleExport('csv')}>Export CSV</button>
      <button onClick={() => handleSimulate('hidden')}>Simulate Hidden</button>
      <button onClick={() => handleSimulate('visible')}>Simulate Visible</button>
    </div>
  );
};
