import { sessionTracker } from '../monitoring/sessionTracker';
import { PATTERNS } from './fixtures';

/**
 * EN: Simulates specific sequences of visibility events.
 * FR: Simule des séquences spécifiques d'événements de visibilité.
 */
export class Simulator {
  private timeoutIds: number[] = [];

  /**
   * EN: Run a predefined pattern of visibility transitions.
   * FR: Exécuter un motif prédéfini de transitions de visibilité.
   */
  runPattern(patternId: string): void {
    this.stop(); // EN: Stop any ongoing simulation / FR: Arrêter toute simulation en cours

    const pattern = PATTERNS[patternId];
    if (!pattern) return;

    let cumulativeDelay = 0;
    
    pattern.sequence.forEach((step) => {
      cumulativeDelay += step.delayMs;
      
      const timeoutId = window.setTimeout(() => {
        sessionTracker.simulateTransition(step.type);
      }, cumulativeDelay);
      
      this.timeoutIds.push(timeoutId);
    });

    if (patternId === 'session_end_sim') {
      const endTimeoutId = window.setTimeout(() => {
        sessionTracker.endSession();
      }, cumulativeDelay + 500);
      this.timeoutIds.push(endTimeoutId);
    }
  }

  /**
   * EN: Stop any currently running simulation.
   * FR: Arrêter toute simulation en cours d'exécution.
   */
  stop(): void {
    this.timeoutIds.forEach(id => window.clearTimeout(id));
    this.timeoutIds = [];
  }
}

export const simulator = new Simulator();
