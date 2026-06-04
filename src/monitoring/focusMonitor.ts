import { configManager } from '../config';

type FocusChangeCallback = (type: 'page_focus' | 'page_blur') => void;

export class FocusMonitor {
  private callback: FocusChangeCallback | null = null;
  private onFocus = () => this.trigger('page_focus');
  private onBlur = () => this.trigger('page_blur');

  start(callback: FocusChangeCallback): void {
    this.callback = callback;
    const config = configManager.get();

    if (config.monitoring.captureFocus && typeof window !== 'undefined') {
      window.addEventListener('focus', this.onFocus);
      window.addEventListener('blur', this.onBlur);
    }
  }

  stop(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('focus', this.onFocus);
      window.removeEventListener('blur', this.onBlur);
    }
    this.callback = null;
  }

  private trigger(type: 'page_focus' | 'page_blur'): void {
    if (this.callback) this.callback(type);
  }
}

export const focusMonitor = new FocusMonitor();
