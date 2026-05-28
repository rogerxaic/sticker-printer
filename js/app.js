/* js/app.js */
import { state } from './state.js';
import { actions } from './actions.js';
import { settings } from './settings.js';
import { utils } from './utils.js';
import { events } from './events.js';

document.addEventListener('alpine:init', () => {
  const store = {
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

      // Load stickers from local storage
      try {
        const savedImages = localStorage.getItem('sticker_printer_images');
        if (savedImages) this.images = JSON.parse(savedImages);

        const savedRotations = localStorage.getItem('sticker_printer_rotations');
        if (savedRotations) this.rotations = JSON.parse(savedRotations);

        const savedFits = localStorage.getItem('sticker_printer_fits');
        if (savedFits) this.fits = JSON.parse(savedFits);

        const savedScales = localStorage.getItem('sticker_printer_scales');
        if (savedScales) this.scales = JSON.parse(savedScales);
      } catch (err) {
        console.error("Failed to load sticker data from localStorage:", err);
      }

      // Set up reactive effect for auto-saving layout, stickers, and resizing
      Alpine.effect(() => {
        Object.keys(this.layout).forEach(key => {
          const val = this.layout[key];
          try {
            localStorage.setItem(`sticker_printer_${key}`, val);
          } catch (e) {
            console.error(`Failed to save layout ${key}:`, e);
          }
        });

        try {
          localStorage.setItem('sticker_printer_images', JSON.stringify(this.images));
          localStorage.setItem('sticker_printer_rotations', JSON.stringify(this.rotations));
          localStorage.setItem('sticker_printer_fits', JSON.stringify(this.fits));
          localStorage.setItem('sticker_printer_scales', JSON.stringify(this.scales));
        } catch (e) {
          if (e.name === 'QuotaExceededError' || e.code === 22) {
            this.showToast("⚠️ Storage full! Unable to save some images for next session.");
          } else {
            console.error("Failed to save stickers to localStorage:", e);
          }
        }

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
  };

  Object.defineProperties(store, Object.getOwnPropertyDescriptors(state));

  Alpine.store('stickerStore', store);
});
