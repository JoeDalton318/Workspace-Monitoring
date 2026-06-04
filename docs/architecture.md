# EN: Architecture / FR: Architecture

EN: The application is composed of several key modules:
FR: L'application est composée de plusieurs modules clés :

## EN: Monitoring Core / FR: Cœur de Monitoring
- **tabState.ts**: EN: Safely extracts `document.visibilityState` / FR: Extrait `document.visibilityState` en toute sécurité.
- **visibilityMonitor.ts**: EN: Listens to browser events. / FR: Écoute les événements du navigateur.
- **sessionTracker.ts**: EN: Orchestrates the session and creates domain events. / FR: Orchestre la session et crée les événements métier.
- **eventBus.ts**: EN: Pub/sub decoupling mechanism. / FR: Mécanisme de découplage pub/sub.

## EN: Storage Layer / FR: Couche de Stockage
EN: Abstractions via `EventStore` allowing adapters:
FR: Abstractions via `EventStore` permettant les adaptateurs :
- MemoryStore (default)
- LocalStorageStore
- IndexedDbStore

## EN: UI / FR: UI
EN: A Vite + React application presenting the dashboard.
FR: Une application Vite + React présentant le dashboard.
