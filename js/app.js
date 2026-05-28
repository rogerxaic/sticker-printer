/* js/app.js */
import { state } from './state.js';
import { actions } from './actions.js';
import { settings } from './settings.js';
import { utils } from './utils.js';
import { events } from './events.js';

document.addEventListener('alpine:init', () => {
  Alpine.store('stickerStore', {
    ...state,
    ...actions,
    ...settings,
    ...utils,
    ...events,

    init() {
      if (this.initialized) return;
      this.initialized = true;

      // Load layout settings from local storage
      Object.keys(this.layout).forEach(key => {
        const savedValue = localStorage.getItem(`sticker_printer_${key}`);
        if (savedValue !== null) {
          this.layout[key] = parseFloat(savedValue);
        }
      });

      // Set up reactive effect for auto-saving layout and resizing
      Alpine.effect(() => {
        Object.keys(this.layout).forEach(key => {
          const val = this.layout[key];
          localStorage.setItem(`sticker_printer_${key}`, val);
        });
        this.resizeSheet();
      });

      // Trigger resize on start
      Alpine.nextTick(() => {
        this.resizeSheet();
        setTimeout(() => this.resizeSheet(), 100);
      });

      // Bind global window events
      window.addEventListener('paste', (e) => this.handlePaste(e));
      window.addEventListener('keydown', (e) => this.handleKeyDown(e));
      window.addEventListener('resize', () => this.resizeSheet());
    }
  });
});
