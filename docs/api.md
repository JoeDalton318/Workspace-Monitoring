# EN: API Documentation / FR: Documentation de l'API

## configManager
EN: Controls global configuration including advanced toggles.
FR: Contrôle la configuration globale incluant les options avancées.
```typescript
import { configManager } from './config';
configManager.update({ 
  monitoring: { 
    enabled: true,
    captureFocus: true,
    captureIdle: true,
    captureNetwork: true,
    idleTimeoutMs: 60000
  } 
});
```

## demoController
EN: Controls simulated events for all tracked dimensions.
FR: Contrôle les événements simulés pour toutes les dimensions suivies.
```typescript
import { demoController } from './demo/demoController';
// Visibility: 'page_visible', 'page_hidden'
// Focus: 'page_focus', 'page_blur'
// Activity: 'user_active', 'user_idle'
// Network: 'network_online', 'network_offline'
demoController.simulateEvent('page_blur');
```

## exportService
EN: Generates file downloads with the enriched data model.
FR: Génère les téléchargements de fichiers avec le modèle de données enrichi.
```typescript
import { exportService } from './export/exportService';
exportService.exportEvents(events, 'json');
```
