# EN: API Documentation / FR: Documentation de l'API

## configManager
EN: Controls global configuration.
FR: Contrôle la configuration globale.
```typescript
import { configManager } from './config';
configManager.update({ monitoring: { enabled: true } });
```

## demoController
EN: Controls simulated events.
FR: Contrôle les événements simulés.
```typescript
import { demoController } from './demo/demoController';
demoController.toggleVisibility('hidden');
```

## exportService
EN: Generates file downloads.
FR: Génère les téléchargements de fichiers.
```typescript
import { exportService } from './export/exportService';
exportService.exportEvents(events, 'json');
```
