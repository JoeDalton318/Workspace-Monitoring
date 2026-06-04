import { describe, it, expect } from 'vitest';
import { MemoryStore } from '../../src/storage/memoryStore';

describe('MemoryStore', () => {
  it('EN: should add and retrieve events / FR: devrait ajouter et récupérer les événements', async () => {
    const store = new MemoryStore();
    await store.init();
    
    await store.addEvent({
      eventId: '1', sessionId: 's1', eventType: 'page_visible',
      visibilityState: 'visible', hidden: false, source: 'system',
      timestamp: 123, durationSincePreviousMs: null, metadata: null, createdAt: 123
    });
    
    const events = await store.getAllEvents();
    expect(events.length).toBe(1);
    expect(events[0].eventId).toBe('1');
  });
});
