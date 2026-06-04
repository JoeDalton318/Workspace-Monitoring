import type { AppConfig } from './schema';
import { defaultConfig } from './defaults';

/**
 * EN: Configuration module for accessing the current config.
 * FR: Module de configuration pour accéder à la config actuelle.
 */
class ConfigManager {
  private config: AppConfig;

  constructor(initialConfig: AppConfig) {
    this.config = { ...initialConfig };
  }

  /**
   * EN: Get the current configuration.
   * FR: Obtenir la configuration actuelle.
   */
  get(): AppConfig {
    return this.config;
  }

  /**
   * EN: Update the configuration partially.
   * FR: Mettre à jour la configuration partiellement.
   */
  update(partialConfig: Partial<AppConfig>): void {
    // EN: Basic merge (in a real app, this might use a deep merge utility)
    // FR: Fusion basique (dans une vraie appli, cela pourrait utiliser un utilitaire de fusion profonde)
    this.config = { ...this.config, ...partialConfig };
  }
}

export const configManager = new ConfigManager(defaultConfig);
export * from './schema';
export * from './defaults';
