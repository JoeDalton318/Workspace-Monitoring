# Workspace Monitoring

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

</div>
<br />

> **EN**: A complete, production-minded browser monitoring project to detect hidden/visible transitions, window focus, user activity, network status, and export data in JSON/CSV formats.  
> **FR**: Un projet complet, orienté production, pour détecter les transitions hidden/visible de la page du navigateur, le focus de la fenêtre, l'activité utilisateur, le statut du réseau, et exporter les données aux formats JSON/CSV.

---

## ✨ EN: Features / FR: Fonctionnalités

- **EN**: Page Visibility API tracking (visible, hidden, pagehide, beforeunload).  
  **FR**: Suivi via la Page Visibility API (visible, hidden, pagehide, beforeunload).

- **EN**: Window Focus tracking (focus, blur).  
  **FR**: Suivi du focus de la fenêtre (focus, blur).

- **EN**: User Activity tracking (idle detection after 60s of inactivity via mouse/keyboard/scroll).  
  **FR**: Suivi de l'activité utilisateur (détection d'inactivité après 60s via souris/clavier/défilement).

- **EN**: Network Status tracking (online, offline).  
  **FR**: Suivi du statut réseau (en ligne, hors ligne).

- **EN**: Fullscreen Monitoring. The app detects when the user enters or exits fullscreen mode. It records `fullscreen_enter` and `fullscreen_exit` events. This is implemented using the Fullscreen API and `fullscreenchange` event.  
  **FR**: Surveillance plein écran. L'application détecte quand l'utilisateur entre ou sort du mode plein écran. Il enregistre les événements `fullscreen_enter` et `fullscreen_exit`. C'est implémenté avec la Fullscreen API et l'événement `fullscreenchange`.  
  ([MDN Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API), [MDN fullscreenchange event](https://developer.mozilla.org/en-US/docs/Web/API/Document/fullscreenchange_event))

- **EN**: In-memory, LocalStorage, and IndexedDB storage layers.  
  **FR**: Couches de stockage en mémoire, LocalStorage et IndexedDB.

- **EN**: JSON and CSV data export functionality.  
  **FR**: Fonctionnalité d'export de données JSON et CSV.

- **EN**: Simulation dev/demo mode.  
  **FR**: Mode de simulation dev/démo.

- **EN**: Clean React/Vite Dashboard.  
  **FR**: Dashboard propre avec React/Vite.

---

## 🛠️ EN: Architecture Overview / FR: Vue d'ensemble de l'architecture

EN: Workspace Monitoring is built with a modular architecture:  
FR: Workspace Monitoring est construit avec une architecture modulaire :

- **EN**: `src/config/` – Centralized configuration schema and defaults.  
  **FR**: `src/config/` – Schéma de configuration centralisé et valeurs par défaut.

- **EN**: `src/monitoring/` – Cœur de suivi de visibilité, focus, activité et session.  
  **FR**: `src/monitoring/` – Cœur de suivi de visibilité, focus, activité et session.

- **EN**: `src/storage/` – Pluggable storage adapters (memory, localStorage, IndexedDB).  
  **FR**: `src/storage/` – Adaptateurs de stockage interchangeables (mémoire, localStorage, IndexedDB).

- **EN**: Extensible event model (JSON / CSV export).  
  **FR**: Modèle d'événements extensible (export JSON / CSV).

- **EN**: Advanced Integrity Platform (Node/Express backend).
  **FR**: Plateforme d'intégrité avancée (Backend Node/Express).

### Advanced Modules / Modules Avancés

- **Identity Verification**: ID photo & selfie simulation.
- **Network & Location**: IP tracking and VPN detection.
- **Plagiarism Detection**: Code similarity cross-referencing.
- **Proctoring**: Webcam snapshot intervals and screen record tracking.
- **Suspicious Activity**: Track pastes, fast-typing anomalies, and focus loss.
- **Desktop App Detection**: Flag invisible AI apps.
- **Risk Engine**: Aggregate signals into None/Low/Moderate/High risk scores.

- **EN**: `src/demo/` – Demo/simulation mode with tagged events (`source: demo`).  
  **FR**: `src/demo/` – Mode démo/simulation avec événements tagués (`source: demo`).

- **EN**: `src/ui/` – React dashboard UI.  
  **FR**: `src/ui/` – Interface React du dashboard.

- **EN**: `src/utils/` – Shared utilities (clock, id, serialization, guards).  
  **FR**: `src/utils/` – Utilitaires partagés (clock, id, sérialisation, garde-fous).

---

## 🚀 EN: Quickstart / FR: Démarrage rapide

```bash
# EN: Install dependencies / FR: Installer les dépendances
npm install

# EN: Start the development server / FR: Lancer le serveur de développement
npm run dev

# EN: Run unit tests / FR: Lancer les tests unitaires
npm run test

# EN: Build for production / FR: Compiler pour la production
npm run build
```

---

## 📚 EN: Documentation / FR: Documentation

- 🏗️ **[Architecture](docs/architecture.md)**  
- 🔌 **[API Reference](docs/api.md)**  
- ⚠️ **[Limitations](docs/limitations.md)**  

---

## ⚠️ EN: Important Limitations / FR: Limitations importantes

### EN: 1. Browser-side detection only

EN: This tool runs entirely in the browser and relies on browser APIs to detect visibility, focus, and activity.  
FR: Cet outil s'exécute entièrement dans le navigateur et repose sur les API du navigateur pour détecter la visibilité, le focus et l'activité.

EN: It **cannot** detect:  
FR: Il **ne peut pas** détecter :

- **EN**: User actions outside the current page (other tabs, other applications, OS-level activity).  
  **FR**: Les actions de l'utilisateur en dehors de la page actuelle (autres onglets, autres applications, activité au niveau du système d'exploitation).

- **EN**: System-wide focus or idle state managed by the OS.  
  **FR**: Le focus global ou l'état d'inactivité gérés au niveau du système d'exploitation.

- **EN**: Activity monitored by external agents, enterprise security tools, or OS-level monitoring.  
  **FR**: L'activité surveillée par des agents externes, des outils de sécurité entreprise ou des systèmes de surveillance au niveau OS.

---

### EN: 2. Possible to bypass `isIdle`, `hasFocus`, and Page Visibility API

EN: Because all signals are coming from the browser page itself, a user can **circumvent** detection using:  
FR: Comme tous les signaux proviennent de la page elle-même, un utilisateur peut **contourner** la détection en utilisant :

- **EN**: Browser extensions that block the Page Visibility API (e.g., "Page Visibility API Blocker").  
  **FR**: Des extensions de navigateur qui bloquent la Page Visibility API (ex: "Page Visibility API Blocker").

- **EN**: Userscripts (Tampermonkey/Greasemonkey) that override:  
  `document.hidden`, `document.visibilityState`, `document.hasFocus()`, and block `visibilitychange`, `blur`, `focus` events.  
  **FR**: Des userscripts (Tampermonkey/Greasemonkey) qui surchargent :  
  `document.hidden`, `document.visibilityState`, `document.hasFocus()` et bloquent les événements `visibilitychange`, `blur`, `focus`.

- **EN**: Console scripts injected manually to force `hidden = false`, `visibilityState = "visible"`, and `hasFocus() = true`.  
  **FR**: Des scripts injectés manuellement dans la console pour forcer `hidden = false`, `visibilityState = "visible"` et `hasFocus() = true`.

EN: Example of what a bypass script can do:  
FR: Exemple de ce qu'un script de contournement peut faire :

```js
Object.defineProperty(document, 'hidden', { value: false, configurable: true });
Object.defineProperty(document, 'visibilityState', { value: 'visible', configurable: true });
document.hasFocus = () => true;
```

EN: With such a script, the page will **always appear visible and focused**, even if the user switched tabs or minimized the window.  
FR: Avec un tel script, la page semblera **toujours visible et focusée**, même si l'utilisateur a changé d'onglet ou minimisé la fenêtre.

EN: This is a **fundamental limitation of client-side monitoring**: the monitored page is both the sensor and the potential attacker.  
FR: C'est une **limite fondamentale du monitoring côté client** : la page surveillée est à la fois le capteur et le potentiel attaquant.

See also:
- [Page Visibility API Blocker – Chrome Web Store](https://chromewebstore.google.com/detail/page-visibility-api-block/biolcodohjbehmfhaomdobnmbiangdfc)
- [Bypassing JavaScript Focus Detection in the Browser](https://blog.haicon.moe/posts/bypass-focus-detection-in-browser/)
- [focus-mode-bypass – GitHub](https://github.com/Anghkooey/focus-mode-bypass)

---

### EN: 3. Server-side and enterprise monitoring are out of scope

EN: Workspace Monitoring does **not** implement:  
FR: Workspace Monitoring **n'implémente pas** :

- **EN**: Server-side heartbeat or activity pings.  
  **FR**: Des heartbeats ou pings d'activité côté serveur.

- **EN**: OS-level keyboard/mouse activity tracking.  
  **FR**: Le suivi clavier/souris au niveau du système d'exploitation.

- **EN**: Enterprise security agents, DLP, or screen capture.  
  **FR**: Des agents de sécurité entreprise, DLP, ou capture d'écran.

EN: If your use case requires these, you need a **complementary system outside the browser**.  
FR: Si ton cas d'usage nécessite ces fonctionnalités, tu as besoin d'un **système complémentaire en dehors du navigateur**.

---

### EN: 4. Honest and transparent monitoring

EN: This project is designed as a **transparent monitoring tool** for the current browser page.  
FR: Ce projet est conçu comme un **outil de surveillance transparent** pour la page actuelle du navigateur.

EN: It is **not** intended for:  
FR: Il **n'est pas** destiné à :

- **EN**: Covert or hidden surveillance.  
  **FR**: De la surveillance clandestine ou cachée.

- **EN**: Deceptive or manipulative monitoring practices.  
  **FR**: Des pratiques de surveillance trompeuses ou manipulatrices.

EN: The implementation is intentionally honest about its capabilities and limitations.  
FR: L'implémentation est intentionnellement honnête sur ses capacités et ses limites.

---

## 🧪 EN: Demo Mode / FR: Mode démo

EN: The demo mode allows you to simulate visibility and focus transitions without a real browser environment:  
FR: Le mode démo permet de simuler des transitions de visibilité et de focus sans environnement navigateur réel :

- **EN**: Simulate `hidden → visible` and `visible → hidden` transitions.  
  **FR**: Simuler des transitions `hidden → visible` et `visible → hidden`.

- **EN**: Simulate rapid toggling and prolonged background states.  
  **FR**: Simuler des bascules rapides et des états prolongés en arrière-plan.

- **EN**: All simulated events are tagged with `source: demo`.  
  **FR**: Tous les événements simulés sont tagués avec `source: demo`.

- **EN**: Exports are deterministic and reproducible from the same event set.  
  **FR**: Les exports sont déterministes et reproductibles à partir du même jeu d'événements.

---

## 📤 EN: Export Data / FR: Exporter les données

EN: You can export the current session timeline to:  
FR: Tu peux exporter la timeline de la session courante vers :

- **EN**: JSON (structured, includes metadata).  
  **FR**: JSON (structuré, inclut les métadonnées).

- **EN**: CSV (tabular, suitable for spreadsheets).  
  **FR**: CSV (tabulaire, adapté aux tableurs).

EN: Exports are deterministic: the same event set produces the same output every time.  
FR: Les exports sont déterministes : un même jeu d'événements produit la même sortie à chaque fois.

---

## 🧱 EN: Storage Layers / FR: Couches de stockage

EN: Workspace Monitoring supports multiple storage backends:  
FR: Workspace Monitoring supporte plusieurs backends de stockage :

| EN Adapter | FR Adaptateur | Description |
|---|---|---|
| **EN**: `MemoryStore` | **FR**: `MemoryStore` | **EN**: In-memory only, best for testing and demos.<br>**FR**: Uniquement en mémoire, idéal pour tests et démos. |
| **EN**: `LocalStorageStore` | **FR**: `LocalStorageStore` | **EN**: Persistent across page reloads, limited size.<br>**FR**: Persiste entre les recharges de page, taille limitée. |
| **EN**: `IndexedDBStore` | **FR**: `IndexedDBStore` | **EN**: Larger capacity, asynchronous, production-ready.<br>**FR**: Capacité plus grande, asynchrone, prêt pour production. |

---

## 🧪 EN: Testing / FR: Tests

EN: Unit tests are implemented with **Vitest**.  
FR: Les tests unitaires sont implémentés avec **Vitest**.

EN: The code is fully testable **without a real browser** using:  
FR: Le code est entièrement testable **sans navigateur réel** grâce à :

- **EN**: Mocked clocks (`src/utils/clock.ts`).  
  **FR**: Des clocks mockées (`src/utils/clock.ts`).

- **EN**: Mocked browser APIs (`document`, `window`, events).  
  **FR**: Des API navigateur mockées (`document`, `window`, événements).

- **EN**: Deterministic event generation for reproducible tests.  
  **FR**: Une génération d'événements déterministe pour des tests reproductibles.

---

## 📝 EN: License / FR: Licence

EN: This project is licensed under the **MIT License**.  
FR: Ce projet est licencié sous la **Licence MIT**.

---

<div align="center">

<i>Built with ❤️ using Vite & React</i>

</div>