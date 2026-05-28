/* js/utils.js */
export const utils = {
  updateRotationScales() {
    for (let i = 0; i < 4; i++) {
      this.scales[i] = 1;
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
