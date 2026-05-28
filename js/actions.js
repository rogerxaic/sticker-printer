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
    if (this.images[index] && this.images[index].startsWith('blob:')) {
      URL.revokeObjectURL(this.images[index]);
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      
      // If the image is large, compress/resize it to fit within localStorage limits
      if (file.size > 800 * 1024) {
        const img = new Image();
        img.onload = () => {
          const maxDimension = 1200;
          let width = img.width;
          let height = img.height;
          
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }
          
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          const type = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
          const quality = type === 'image/jpeg' ? 0.85 : undefined;
          
          try {
            this.images[index] = canvas.toDataURL(type, quality);
          } catch (err) {
            console.error("Canvas toDataURL failed, using original data URL:", err);
            this.images[index] = dataUrl;
          }
          this.rotations[index] = 0;
          this.fits[index] = 'contain';
          this.scales[index] = 1;
          this.focusNextEmptyCell();
        };
        img.onerror = () => {
          this.images[index] = dataUrl;
          this.rotations[index] = 0;
          this.fits[index] = 'contain';
          this.scales[index] = 1;
          this.focusNextEmptyCell();
        };
        img.src = dataUrl;
      } else {
        this.images[index] = dataUrl;
        this.rotations[index] = 0;
        this.fits[index] = 'contain';
        this.scales[index] = 1;
        this.focusNextEmptyCell();
      }
    };
    reader.onerror = (err) => {
      console.error("FileReader failed:", err);
      this.showToast("❌ Failed to load image file");
    };
    reader.readAsDataURL(file);
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
      if (this.images[index].startsWith('blob:')) {
        URL.revokeObjectURL(this.images[index]);
      }
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
