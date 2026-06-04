/**
 * EN: Utility to safely read browser visibility state.
 * FR: Utilitaire pour lire l'état de visibilité du navigateur de façon sûre.
 */
export const getTabState = (): { visibilityState: DocumentVisibilityState; hidden: boolean } => {
  // EN: Handle cases where window or document might not exist (e.g., SSR or tests)
  // FR: Gérer les cas où window ou document pourraient ne pas exister (ex: SSR ou tests)
  if (typeof document !== 'undefined') {
    return {
      visibilityState: document.visibilityState,
      hidden: document.hidden,
    };
  }
  
  // EN: Fallback for non-browser environments
  // FR: Secours pour les environnements non-navigateur
  return {
    visibilityState: 'visible',
    hidden: false,
  };
};
