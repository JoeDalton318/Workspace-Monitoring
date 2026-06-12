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
// Activity: 'user_active', 'user_idle', 'paste_event', 'large_code_insertion', 'shortcut_detected'
// Network: 'network_online', 'network_offline', 'network_ip_change', 'location_change', 'external_monitor_detected'
// Fullscreen: 'fullscreen_enter', 'fullscreen_exit'
// Proctoring: 'proctoring_webcam_snapshot', 'proctoring_screen_start'
// Security: 'invisible_ai_app_detected', 'plagiarism_detected', 'risk_level_updated'
demoController.startDemo();
```

## Events and Metadata
EN: New event types include `fullscreen_enter` and `fullscreen_exit`.
FR: Les nouveaux types d'événements incluent `fullscreen_enter` et `fullscreen_exit`.
EN: Metadata fields: `fullscreenElementTag` and `fullscreenEnabled`.
FR: Champs metadata : `fullscreenElementTag` and `fullscreenEnabled`.
```

## exportService
EN: Generates file downloads with the enriched data model.
FR: Génère les téléchargements de fichiers avec le modèle de données enrichi.
```typescript
import { exportService } from './export/exportService';
exportService.exportEvents(events, 'json');
```
