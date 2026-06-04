import { activityMonitor } from './activityMonitor';

export interface TabState {
  visibilityState: 'visible' | 'hidden';
  hidden: boolean;
  hasFocus: boolean;
  isIdle: boolean;
  isOnline: boolean;
}

/**
 * EN: Safely extracts current tab state (visibility, focus, idle, network).
 * FR: Extrait l'état actuel de l'onglet en toute sécurité.
 */
export const getTabState = (): TabState => {
  const isDocHidden = typeof document !== 'undefined' ? document.hidden : false;
  
  let visState: 'visible' | 'hidden' = 'visible';
  if (typeof document !== 'undefined') {
    if (document.visibilityState === 'hidden' || document.visibilityState === 'visible') {
      visState = document.visibilityState;
    } else {
      visState = isDocHidden ? 'hidden' : 'visible';
    }
  }

  return {
    visibilityState: visState,
    hidden: isDocHidden,
    hasFocus: (typeof document !== 'undefined' && typeof document.hasFocus === 'function') ? document.hasFocus() : true,
    isIdle: activityMonitor.getIsIdle(),
    isOnline: (typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean') ? navigator.onLine : true,
  };
};
