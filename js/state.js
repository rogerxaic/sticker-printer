/* js/state.js */
export const state = {
  // STATE VARIABLES
  initialized: false,
  images: [null, null, null, null, null, null, null, null],
  rotations: [0, 0, 0, 0, 0, 0, 0, 0],
  fits: ['contain', 'contain', 'contain', 'contain', 'contain', 'contain', 'contain', 'contain'],
  scales: [1, 1, 1, 1, 1, 1, 1, 1],
  cellModes: ['single', 'single', 'single', 'single'],
  selectedIndex: 0,
  dragOverIndex: null,
  layoutLocked: true,
  calibrationLocked: true,
  toasts: [],
  
  layout: {
    top: 0.75,
    bottom: 0.75,
    left: 0.50,
    right: 0.50,
    gapX: 0.25,
    gapY: 0.00,
    padding: 0.00,
    offsetX: 0.0,
    offsetY: 0.0
  },

  // GETTERS (Computed Properties)
  get stickerWidth() {
    const left = parseFloat(this.layout.left) || 0;
    const right = parseFloat(this.layout.right) || 0;
    const gapX = parseFloat(this.layout.gapX) || 0;
    return ((210 - (left + right) * 10 - gapX * 10) / 2).toFixed(2);
  },

  get stickerHeight() {
    const top = parseFloat(this.layout.top) || 0;
    const bottom = parseFloat(this.layout.bottom) || 0;
    const gapY = parseFloat(this.layout.gapY) || 0;
    return ((297 - (top + bottom) * 10 - gapY * 10) / 2).toFixed(2);
  },

  rootStyles() {
    return {
      '--margin-top': `${this.layout.top}cm`,
      '--margin-bottom': `${this.layout.bottom}cm`,
      '--margin-left': `${this.layout.left}cm`,
      '--margin-right': `${this.layout.right}cm`,
      '--gap-x': `${this.layout.gapX}cm`,
      '--gap-y': `${this.layout.gapY}cm`,
      '--sticker-padding': `${this.layout.padding}cm`,
      '--offset-x': `${this.layout.offsetX}mm`,
      '--offset-y': `${this.layout.offsetY}mm`
    };
  }
};
