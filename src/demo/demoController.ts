import { sessionTracker } from '../monitoring/sessionTracker';
import { simulator } from './simulator';
import type { EventType } from '../monitoring/eventTypes';

export const demoController = {
  init(): void {
    console.log('EN: Demo controller initialized / FR: Contrôleur de démo initialisé');
  },

  simulateEvent(state: EventType): void {
    sessionTracker.simulateTransition(state);
  },

  toggleVisibility(state: 'visible' | 'hidden'): void {
    sessionTracker.simulateTransition(state === 'visible' ? 'page_visible' : 'page_hidden');
  },

  runPattern(patternId: string): void {
    simulator.runPattern(patternId);
  },

  stopSimulation(): void {
    simulator.stop();
  }
};
