import { eventBus } from './eventBus';
import { MonitoringEvent, EventType, EventSource } from './eventTypes';
import { getTabState } from './tabState';
import { visibilityMonitor } from './visibilityMonitor';
import { configManager } from '../config';

// EN: Temporary imports until Step 7
// FR: Imports temporaires en attendant l'Étape 7
const generateIdTemp = () => typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2);
const getCurrentTimestampTemp = () => Date.now();

/**
 * EN: Tracks the current monitoring session and generates events.
 * FR: Suit la session de monitoring courante et génère les événements.
 */
export class SessionTracker {
  private sessionId: string | null = null;
  private lastEventTime: number | null = null;
  private lastVisibilityState: DocumentVisibilityState | null = null;

  /**
   * EN: Start a new tracking session.
   * FR: Démarrer une nouvelle session de suivi.
   */
  startSession(): void {
    const config = configManager.get();
    if (!config.monitoring.enabled) return;

    this.sessionId = generateIdTemp();
    this.lastEventTime = getCurrentTimestampTemp();
    const { visibilityState } = getTabState();
    this.lastVisibilityState = visibilityState;

    this.emitEvent('session_start', 'system');

    visibilityMonitor.start((type) => {
      this.handleBrowserEvent(type);
    });
  }

  /**
   * EN: End the tracking session.
   * FR: Terminer la session de suivi.
   */
  endSession(): void {
    if (!this.sessionId) return;
    
    this.emitEvent('session_end', 'system');
    visibilityMonitor.stop();
    this.sessionId = null;
  }

  /**
   * EN: Handle browser events and map them to monitoring events.
   * FR: Gérer les événements du navigateur et les mapper aux événements de monitoring.
   */
  private handleBrowserEvent(browserEventType: 'visibilitychange' | 'pagehide' | 'beforeunload'): void {
    const config = configManager.get();
    const { visibilityState } = getTabState();

    let eventType: EventType = 'page_visible';

    if (browserEventType === 'visibilitychange') {
      eventType = visibilityState === 'visible' ? 'page_visible' : 'page_hidden';
    } else if (browserEventType === 'pagehide') {
      eventType = 'pagehide';
    } else if (browserEventType === 'beforeunload') {
      eventType = 'beforeunload';
    }

    // EN: Deduplicate transitions if configured
    // FR: Dédupliquer les transitions si configuré
    if (
      config.monitoring.deduplicateTransitions &&
      browserEventType === 'visibilitychange' &&
      this.lastVisibilityState === visibilityState
    ) {
      return;
    }

    this.lastVisibilityState = visibilityState;
    this.emitEvent(eventType, 'browser');
  }

  /**
   * EN: Manually emit a simulated event (for demo mode).
   * FR: Émettre manuellement un événement simulé (pour le mode démo).
   */
  simulateTransition(targetState: 'visible' | 'hidden'): void {
    this.lastVisibilityState = targetState;
    const eventType = targetState === 'visible' ? 'page_visible' : 'page_hidden';
    this.emitEvent(eventType, 'demo');
  }

  private emitEvent(eventType: EventType, source: EventSource): void {
    if (!this.sessionId) return;

    const now = getCurrentTimestampTemp();
    const { visibilityState, hidden } = getTabState();
    
    // EN: For demo source, we might need to override the physical tab state
    // FR: Pour la source démo, on pourrait devoir surcharger l'état physique de l'onglet
    const actualVisibilityState = source === 'demo' ? (this.lastVisibilityState || visibilityState) : visibilityState;
    const actualHidden = source === 'demo' ? (actualVisibilityState === 'hidden') : hidden;

    const durationSincePreviousMs = this.lastEventTime ? now - this.lastEventTime : null;

    const event: MonitoringEvent = {
      eventId: generateIdTemp(),
      sessionId: this.sessionId,
      eventType,
      visibilityState: actualVisibilityState,
      hidden: actualHidden,
      source,
      timestamp: now,
      durationSincePreviousMs,
      metadata: null,
      createdAt: now,
    };

    this.lastEventTime = now;
    eventBus.publish(event);
  }
}

export const sessionTracker = new SessionTracker();
