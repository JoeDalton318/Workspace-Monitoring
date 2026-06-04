/**
 * EN: Fixtures and predefined patterns for demo mode.
 * FR: Données de test et motifs prédéfinis pour le mode démo.
 */

export type DemoPattern = 'rapid_toggle' | 'prolonged_background' | 'session_end_sim';

export const PATTERNS: Record<DemoPattern, { state: 'visible' | 'hidden', delayMs: number }[]> = {
  rapid_toggle: [
    { state: 'hidden', delayMs: 500 },
    { state: 'visible', delayMs: 500 },
    { state: 'hidden', delayMs: 500 },
    { state: 'visible', delayMs: 500 },
  ],
  prolonged_background: [
    { state: 'hidden', delayMs: 5000 },
    { state: 'visible', delayMs: 500 },
  ],
  session_end_sim: [
    { state: 'hidden', delayMs: 1000 },
    // EN: Actual session end is handled separately in the simulator
    // FR: La fin réelle de session est gérée séparément dans le simulateur
  ],
};
