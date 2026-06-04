# EN: Architecture / FR: Architecture

EN: The application is composed of several key modules:
FR: L'application est composée de plusieurs modules clés :

## EN: Monitoring Core / FR: Cœur de Monitoring
- **visibilityMonitor.ts**: EN: Listens to basic browser visibility events. / FR: Écoute les événements basiques de visibilité du navigateur.
- **focusMonitor.ts**: EN: Listens to window focus/blur. / FR: Écoute le focus/blur de la fenêtre.
- **activityMonitor.ts**: EN: Tracks DOM interactions (mouse, keyboard, scroll) with throttling to detect user idle state. / FR: Suit les interactions DOM avec un bridage pour détecter l'état d'inactivité de l'utilisateur.
- **networkMonitor.ts**: EN: Listens to online/offline network changes. / FR: Écoute les changements réseau en ligne/hors ligne.
- **tabState.ts**: EN: Safely extracts the unified state across all monitors. / FR: Extrait en toute sécurité l'état unifié de tous les moniteurs.
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
