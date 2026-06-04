import { sessionTracker } from '../monitoring/sessionTracker';
import { eventBus } from '../monitoring/eventBus';
import { LocalStorageStore } from '../storage/localStorageStore';
import { IndexedDbStore } from '../storage/indexedDbStore';
import { MemoryStore } from '../storage/memoryStore';
import type { EventStore } from '../storage/eventStore';
import { configManager } from '../config';
import { demoController } from '../demo/demoController';

/**
 * EN: Orchestrates the initialization and teardown of the application runtime.
 * FR: Orchestre l'initialisation et l'arrêt du runtime de l'application.
 */
class Runtime {
  private store: EventStore | null = null;
  private unsubscribeBus: (() => void) | null = null;

  async start(): Promise<void> {
    const config = configManager.get();

    // EN: Initialize Storage Adapter
    // FR: Initialiser l'adaptateur de stockage
    switch (config.storage.adapter) {
      case 'indexedDB':
        this.store = new IndexedDbStore();
        break;
      case 'localStorage':
        this.store = new LocalStorageStore();
        break;
      case 'memory':
      default:
        this.store = new MemoryStore();
        break;
    }

    await this.store.init();

    // EN: Wire Event Bus to Storage
    // FR: Relier le bus d'événements au stockage
    this.unsubscribeBus = eventBus.subscribe((event) => {
      this.store?.addEvent(event).catch((e) => {
        console.error('Failed to store event', e);
      });
    });

    // EN: Initialize Monitoring Session
    // FR: Initialiser la session de monitoring
    sessionTracker.startSession();

    // EN: Initialize Demo Mode if enabled
    // FR: Initialiser le mode démo si activé
    demoController.init();
  }

  stop(): void {
    demoController.stopSimulation();
    sessionTracker.endSession();
    if (this.unsubscribeBus) {
      this.unsubscribeBus();
      this.unsubscribeBus = null;
    }
  }

  getStore(): EventStore {
    if (!this.store) {
      // EN: Fallback memory store if accessed before start
      // FR: Stockage en mémoire de secours si accédé avant démarrage
      this.store = new MemoryStore();
    }
    return this.store;
  }
}

export const runtime = new Runtime();
