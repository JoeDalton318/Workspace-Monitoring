import { configManager } from '../config';
import { sessionTracker } from '../monitoring/sessionTracker';
import { simulator } from './simulator';
import type { DemoPattern } from './fixtures';

/**
 * EN: High-level controller for demo mode interactions.
 * FR: Contrôleur de haut niveau pour les interactions du mode démo.
 */
export class DemoController {
  
  /**
   * EN: Initialize demo mode if configured.
   * FR: Initialiser le mode démo si configuré.
   */
  init(): void {
    const config = configManager.get();
    if (config.demo.enabled && config.demo.autoSimulate) {
      this.triggerPattern(config.demo.defaultPattern as DemoPattern);
    }
  }

  /**
   * EN: Manually toggle visibility state for demo purposes.
   * FR: Basculer manuellement l'état de visibilité à des fins de démo.
   */
  toggleVisibility(targetState: 'visible' | 'hidden'): void {
    const config = configManager.get();
    if (!config.demo.enabled) return;
    
    simulator.stop();
    sessionTracker.simulateTransition(targetState);
  }

  /**
   * EN: Trigger a specific simulation pattern.
   * FR: Déclencher un motif de simulation spécifique.
   */
  triggerPattern(pattern: DemoPattern): void {
    simulator.runPattern(pattern);
  }

  /**
   * EN: Stop any active simulation.
   * FR: Arrêter toute simulation active.
   */
  stopSimulation(): void {
    simulator.stop();
  }
}

export const demoController = new DemoController();
