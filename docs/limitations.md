# EN: Limitations / FR: Limites

- EN: The Page Visibility API only detects when the tab is hidden, minimized, or backgrounded. It does not detect partial window overlays.
- FR: La Page Visibility API détecte uniquement quand l'onglet est caché, minimisé ou mis en arrière-plan. Elle ne détecte pas les superpositions partielles de fenêtres.
- EN: `beforeunload` is a minimal fallback and may not reliably fire in all environments (e.g. mobile browsers).
- FR: `beforeunload` est un secours minimal et peut ne pas se déclencher fiablement dans tous les environnements (ex: navigateurs mobiles).
- EN: Focus tracking (`hasFocus`) accurately tells if the window is active, but a user clicking a second monitor will instantly trigger a blur, even if they are still "looking" at the browser.
- FR: Le suivi du focus (`hasFocus`) indique avec précision si la fenêtre est active, mais si un utilisateur clique sur un second écran, un "blur" est immédiatement déclenché, même s'il regarde toujours le navigateur.
- EN: Activity tracking (idle detection) relies strictly on DOM events inside the browser window. Interactions with the OS taskbar or other applications do not reset the idle timer.
- FR: Le suivi de l'activité (détection d'inactivité) repose strictement sur les événements DOM à l'intérieur de la fenêtre du navigateur. Les interactions avec la barre des tâches de l'OS ou d'autres applications ne réinitialisent pas le minuteur d'inactivité.
- EN: Network tracking (`navigator.onLine`) can sometimes report false positives if the computer is connected to a local router that has lost its upstream internet connection.
- FR: Le suivi réseau peut donner des faux positifs si le routeur local perd internet.

## Integrity & Proctoring Limitations
- EN: Facial recognition and desktop app detection are currently **mocked** for demonstration purposes and do not invoke actual ML models or OS-level agents.
- FR: La reconnaissance faciale et la détection d'applications de bureau sont actuellement simulées à des fins de démonstration.
- EN: Screen recording and webcam snapshots use standard web APIs which the user must grant permissions for. They can be bypassed at the OS level.
- FR: L'enregistrement d'écran nécessite l'accord de l'utilisateur.
- EN: Fullscreen state is browser-provided and reliable, but it only reflects the browser's fullscreen mode, not OS-level screen capture or other apps.
- FR: L'état plein écran est fourni par le navigateur et fiable, mais il reflète uniquement le mode plein écran du navigateur, pas la capture d'écran OS ou d'autres applications.
- EN: Data is strictly stored client-side unless explicitly exported.
- FR: Les données sont strictement stockées côté client sauf si exportées explicitement.
