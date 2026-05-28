/* js/actions.js */
export const actions = {
  selectCell(index) {
    this.selectedIndex = index;
    if (!this.images[index]) {
      document.getElementById('file-picker').click();
    }
  },

  handleFilePickerChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.loadImageFile(event.target.files[0], this.selectedIndex);
      event.target.value = '';
    }
  },

  loadImageFile(file, index) {
    if (this.images[index]) {
      URL.revokeObjectURL(this.images[index]);
    }
    this.images[index] = URL.createObjectURL(file);
    this.rotations[index] = 0;
    this.fits[index] = 'contain';
    this.scales[index] = 1;
    this.focusNextEmptyCell();
  },

  focusNextEmptyCell() {
    for (let i = 0; i < 4; i++) {
      const nextIdx = (this.selectedIndex + 1 + i) % 4;
      if (!this.images[nextIdx]) {
        this.selectedIndex = nextIdx;
        break;
      }
    }
  },

  deleteImage(index) {
    if (this.images[index]) {
      URL.revokeObjectURL(this.images[index]);
      this.images[index] = null;
    }
    this.rotations[index] = 0;
    this.fits[index] = 'contain';
    this.scales[index] = 1;
    this.selectedIndex = index;
    this.showToast(`🗑️ Sticker ${index + 1} cleared`);
  },

  rotate(index) {
    this.rotations[index] = (this.rotations[index] + 90) % 360;
    this.updateRotationScales();
    this.showToast(`🔄 Sticker ${index + 1} rotated to ${this.rotations[index]}°`);
  },

  toggleFit(index) {
    this.fits[index] = this.fits[index] === 'contain' ? 'cover' : 'contain';
    this.updateRotationScales();
    this.showToast(`🖼️ Sticker ${index + 1} fit mode: ${this.fits[index]}`);
  }
};
