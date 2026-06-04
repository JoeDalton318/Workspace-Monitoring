import { EventStore } from './eventStore';
import { MonitoringEvent } from '../monitoring/eventTypes';
// import { configManager } from '../config';

const DB_NAME = 'WorkspaceMonitoringDB';
const STORE_NAME = 'events';
const DB_VERSION = 1;

/**
 * EN: IndexedDB adapter. Best for robust, persistent local storage.
 * FR: Adaptateur IndexedDB. Le meilleur pour un stockage local robuste et persistant.
 */
export class IndexedDbStore implements EventStore {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    if (typeof indexedDB === 'undefined') {
      console.warn('IndexedDB is not available');
      return;
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'eventId' });
          store.createIndex('sessionId', 'sessionId', { unique: false });
          store.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve();
      };

      request.onerror = (event) => {
        console.error('IndexedDB open error', event);
        reject('Failed to open IndexedDB');
      };
    });
  }

  async addEvent(event: MonitoringEvent): Promise<void> {
    if (!this.db) await this.init();
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      const request = store.add(event);

      request.onsuccess = () => resolve();
      request.onerror = (e) => reject(e);
      
      // EN: Cleanup old events could be added here in a background task
      // FR: Le nettoyage des anciens événements pourrait être ajouté ici dans une tâche de fond
    });
  }

  async getEventsBySession(sessionId: string): Promise<MonitoringEvent[]> {
    if (!this.db) await this.init();
    if (!this.db) return [];

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index('sessionId');
      
      const request = index.getAll(sessionId);

      request.onsuccess = (event) => {
        resolve((event.target as IDBRequest).result);
      };
      request.onerror = (e) => reject(e);
    });
  }

  async getAllEvents(): Promise<MonitoringEvent[]> {
    if (!this.db) await this.init();
    if (!this.db) return [];

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      
      const request = store.getAll();

      request.onsuccess = (event) => {
        resolve((event.target as IDBRequest).result);
      };
      request.onerror = (e) => reject(e);
    });
  }

  async clear(): Promise<void> {
    if (!this.db) await this.init();
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = (e) => reject(e);
    });
  }
}
