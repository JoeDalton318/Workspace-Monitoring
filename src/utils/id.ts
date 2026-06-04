/**
 * EN: Utility for generating unique IDs.
 * FR: Utilitaire pour générer des IDs uniques.
 */

export const generateId = (): string => {
  // EN: Use crypto API if available, fallback to Math.random
  // FR: Utiliser l'API crypto si disponible, sinon Math.random en secours
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
