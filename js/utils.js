/* js/utils.js */
export const utils = {
  updateRotationScales() {
    const cellElements = document.querySelectorAll('.sticker-cell');
    for (let i = 0; i < 4; i++) {
      const cellEl = cellElements[i];
      if (!cellEl) continue;

      const rotation = this.rotations[i];
      const fit = this.fits[i];

      if (rotation !== 90 && rotation !== 270) {
        this.scales[i] = 1;
        continue;
      }

      const w = cellEl.clientWidth;
      const h = cellEl.clientHeight;
      if (w === 0 || h === 0) {
        this.scales[i] = 1;
        continue;
      }

      const ratio = w / h;
      this.scales[i] = fit === 'contain' ? Math.min(ratio, 1 / ratio) : Math.max(ratio, 1 / ratio);
    }
  },

  resizeSheet() {
    const wrapper = document.querySelector('.sheet-wrapper');
    const sheet = document.getElementById('a4-sheet');
    if (!wrapper || !sheet) return;

    const wrapperW = wrapper.clientWidth;
    const wrapperH = wrapper.clientHeight;
    
    const pxPerMm = 3.779527559;
    const sheetW = 210 * pxPerMm;
    const sheetH = 297 * pxPerMm;
    
    const padding = 40;
    const scaleX = (wrapperW - padding) / sheetW;
    const scaleY = (wrapperH - padding) / sheetH;
    const scale = Math.min(scaleX, scaleY, 1);
    
    sheet.style.transform = `scale(${scale})`;

    Alpine.nextTick(() => {
      this.updateRotationScales();
    });
  },

  showToast(message) {
    const id = Date.now() + Math.random();
    this.toasts.push({ id, message });
    setTimeout(() => {
      this.toasts = this.toasts.filter(t => t.id !== id);
    }, 3000);
  }
};
