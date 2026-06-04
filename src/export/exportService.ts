import type { MonitoringEvent } from '../monitoring/eventTypes';
import { generateJsonExport } from './jsonExport';
import { generateCsvExport } from './csvExport';
import { configManager } from '../config';

/**
 * EN: Service to handle downloading exported data.
 * FR: Service pour gérer le téléchargement des données exportées.
 */
export class ExportService {
  /**
   * EN: Export given events in the specified format.
   * FR: Exporter les événements donnés dans le format spécifié.
   */
  exportEvents(events: MonitoringEvent[], format: 'json' | 'csv'): void {
    const config = configManager.get();
    if (!config.export.enabled) return;
    if (!config.export.formats.includes(format)) {
      console.warn(`Export format ${format} is disabled in config.`);
      return;
    }

    let content = '';
    let mimeType = '';
    let extension = '';

    if (format === 'json') {
      content = generateJsonExport(events);
      mimeType = 'application/json';
      extension = 'json';
    } else if (format === 'csv') {
      content = generateCsvExport(events);
      mimeType = 'text/csv';
      extension = 'csv';
    }

    this.downloadFile(content, mimeType, extension);
  }

  private downloadFile(content: string, mimeType: string, extension: string): void {
    if (typeof document === 'undefined') return;

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `workspace-monitoring-export-${timestamp}.${extension}`;

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    
    // EN: Cleanup
    // FR: Nettoyage
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }
}

export const exportService = new ExportService();
