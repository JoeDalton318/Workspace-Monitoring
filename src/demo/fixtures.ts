import type { EventType } from '../monitoring/eventTypes';

export interface DemoPattern {
  name: string;
  sequence: {
    delayMs: number;
    type: EventType;
  }[];
}

export const PATTERNS: Record<string, DemoPattern> = {
  quickToggle: {
    name: 'Quick Visibility Toggle',
    sequence: [
      { delayMs: 1000, type: 'page_hidden' },
      { delayMs: 2000, type: 'page_visible' }
    ]
  },
  awayFromKeyboard: {
    name: 'Away From Keyboard (Idle)',
    sequence: [
      { delayMs: 1000, type: 'page_blur' },
      { delayMs: 2000, type: 'user_idle' },
      { delayMs: 3000, type: 'user_active' },
      { delayMs: 4000, type: 'page_focus' }
    ]
  },
  networkDrop: {
    name: 'Network Drop',
    sequence: [
      { delayMs: 1000, type: 'network_offline' },
      { delayMs: 5000, type: 'network_online' }
    ]
  }
};
