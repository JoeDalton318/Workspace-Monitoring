import { describe, it, expect } from 'vitest';
import { generateJsonExport } from '../../src/export/jsonExport';
import { generateCsvExport } from '../../src/export/csvExport';

describe('Export Layer', () => {
  const mockEvents = [
    {
      eventId: '1', sessionId: 's1', eventType: 'page_visible',
      visibilityState: 'visible', hidden: false, source: 'system',
      timestamp: 123, durationSincePreviousMs: null, metadata: null, createdAt: 123
    } as any
  ];

  it('EN: should export JSON / FR: devrait exporter en JSON', () => {
    const json = generateJsonExport(mockEvents);
    expect(json).toContain('"eventId": "1"');
  });

  it('EN: should export CSV / FR: devrait exporter en CSV', () => {
    const csv = generateCsvExport(mockEvents);
    expect(csv).toContain('1,s1,page_visible,visible');
  });
});
