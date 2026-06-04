import { describe, it, expect } from 'vitest';
import { configManager, defaultConfig } from '../../src/config';

describe('ConfigManager', () => {
  it('EN: should return default config initially / FR: devrait retourner la config par défaut initialement', () => {
    expect(configManager.get()).toEqual(defaultConfig);
  });

  it('EN: should update config / FR: devrait mettre à jour la config', () => {
    configManager.update({ app: { name: 'Test', environment: 'test' } });
    expect(configManager.get().app.name).toBe('Test');
  });
});
