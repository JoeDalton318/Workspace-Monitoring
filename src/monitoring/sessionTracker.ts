import { generateId } from '../utils/id';
import { getCurrentTimestamp } from '../utils/clock';
import { eventBus } from './eventBus';
import type { MonitoringEvent, EventType, EventSource } from './eventTypes';
import { visibilityMonitor } from './visibilityMonitor';
import { focusMonitor } from './focusMonitor';
import { activityMonitor } from './activityMonitor';
import { networkMonitor } from './networkMonitor';
import { getTabState } from './tabState';
import { configManager } from '../config';

class SessionTracker {
  private currentSessionId: string | null = null;
  private lastEventTimeMs: number | null = null;
  private lastStateStr: string | null = null;

  startSession(): void {
    if (this.currentSessionId) return;

    this.currentSessionId = generateId();
    this.lastEventTimeMs = null;
    this.lastStateStr = null;

    visibilityMonitor.start(() => {
      const state = getTabState();
      this.handleEvent(state.visibilityState === 'visible' ? 'page_visible' : 'page_hidden', 'system');
    });
    focusMonitor.start((type) => this.handleEvent(type, 'system'));
    activityMonitor.start((type) => this.handleEvent(type, 'system'));
    networkMonitor.start((type) => this.handleEvent(type, 'system'));

    this.handleEvent('session_start', 'system');
  }

  endSession(): void {
    if (!this.currentSessionId) return;

    this.handleEvent('session_end', 'system');
    
    visibilityMonitor.stop();
    focusMonitor.stop();
    activityMonitor.stop();
    networkMonitor.stop();

    this.currentSessionId = null;
    this.lastEventTimeMs = null;
    this.lastStateStr = null;
  }

  simulateTransition(type: EventType): void {
    if (!this.currentSessionId) return;
    this.handleEvent(type, 'demo');
  }

  private handleEvent(type: EventType, source: EventSource): void {
    if (!this.currentSessionId) return;

    const now = getCurrentTimestamp();
    const config = configManager.get();
    
    const durationSincePreviousMs = this.lastEventTimeMs 
      ? now - this.lastEventTimeMs 
      : null;

    const tabState = getTabState();
    
    // EN: Deduplicate identical state transitions if configured
    // FR: Dédupliquer les transitions d'état identiques si configuré
    const currentStateStr = JSON.stringify(tabState);
    if (config.monitoring.deduplicateTransitions && this.lastStateStr === currentStateStr && type !== 'session_start' && type !== 'session_end' && source !== 'demo') {
      return;
    }

    const event: MonitoringEvent = {
      eventId: generateId(),
      sessionId: this.currentSessionId,
      timestamp: now,
      eventType: type,
      visibilityState: tabState.visibilityState,
      hidden: tabState.hidden,
      hasFocus: tabState.hasFocus,
      isIdle: tabState.isIdle,
      isOnline: tabState.isOnline,
      source,
      durationSincePreviousMs,
      metadata: null,
      createdAt: Date.now()
    };

    this.lastEventTimeMs = now;
    this.lastStateStr = currentStateStr;

    eventBus.publish(event);
  }
}

export const sessionTracker = new SessionTracker();
