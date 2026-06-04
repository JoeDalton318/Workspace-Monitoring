/**
 * EN: Clock utility to allow mocking time in tests.
 * FR: Utilitaire d'horloge pour permettre de mocker le temps dans les tests.
 */

// EN: By default, uses Date.now(). Can be overridden in tests.
// FR: Par défaut, utilise Date.now(). Peut être surchargé dans les tests.
let timeProvider = () => Date.now();

export const getCurrentTimestamp = (): number => {
  return timeProvider();
};

export const setTimeProvider = (provider: () => number): void => {
  timeProvider = provider;
};
