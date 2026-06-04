import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { sessionTracker } from '../../src/monitoring/sessionTracker';
import { eventBus } from '../../src/monitoring/eventBus';
import { setTimeProvider } from '../../src/utils/clock';

describe('SessionTracker', () => {
  let publishedEvents: any[] = [];
  let unsubscribe: () => void;

  beforeEach(() => {
    publishedEvents = [];
    unsubscribe = eventBus.subscribe(e => publishedEvents.push(e));
    setTimeProvider(() => 1000);
  });

  afterEach(() => {
    unsubscribe();
    sessionTracker.endSession();
  });

  it('EN: should start a session and emit session_start / FR: devrait démarrer une session et émettre session_start', () => {
    sessionTracker.startSession();
    expect(publishedEvents.length).toBe(1);
    expect(publishedEvents[0].eventType).toBe('session_start');
  });

  it('EN: should simulate transition / FR: devrait simuler une transition', () => {
    sessionTracker.startSession();
    sessionTracker.simulateTransition('page_hidden');
    expect(publishedEvents.length).toBe(2);
    expect(publishedEvents[1].eventType).toBe('page_hidden');
    expect(publishedEvents[1].source).toBe('demo');
    
    // EN: Verify enriched properties exist
    // FR: Vérifier que les propriétés enrichies existent
    expect(publishedEvents[1].hasFocus).toBeDefined();
    expect(publishedEvents[1].isIdle).toBeDefined();
    expect(publishedEvents[1].isOnline).toBeDefined();
  });
});
