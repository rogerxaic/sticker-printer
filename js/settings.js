/* js/settings.js */
export const settings = {
  printPage() {
    if (!this.images.some(img => img !== null)) {
      this.showToast("⚠️ Add at least one image before printing!");
      return;
    }
    window.print();
  },

  resetLayout() {
    this.layout.top = 0.75;
    this.layout.bottom = 0.75;
    this.layout.left = 0.50;
    this.layout.right = 0.50;
    this.layout.gapX = 0.25;
    this.layout.gapY = 0.00;
    this.layout.padding = 0.00;
    this.showToast("⚙️ Layout margins reset to defaults!");
  },

  resetCalibration() {
    this.layout.offsetX = 0.0;
    this.layout.offsetY = 0.0;
    this.showToast("🔧 Print Calibration offsets reset to 0!");
  },

  clearAll() {
    for (let i = 0; i < 4; i++) {
      if (this.images[i]) {
        if (this.images[i].startsWith('blob:')) {
          URL.revokeObjectURL(this.images[i]);
        }
        this.images[i] = null;
      }
      this.rotations[i] = 0;
      this.fits[i] = 'contain';
      this.scales[i] = 1;
    }
    this.selectedIndex = 0;
    this.showToast("🧹 Sticker sheet reset!");
  },

  loadDemo() {
    const demoImages = [
      'https://picsum.photos/id/1025/600/800',
      'https://picsum.photos/id/237/600/800',
      'https://picsum.photos/id/1084/600/800',
      'https://picsum.photos/id/200/600/800'
    ];
    this.showToast("⏳ Fetching demo images...");
    demoImages.forEach((url, idx) => {
      fetch(url)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], `demo_${idx}.jpg`, { type: 'image/jpeg' });
          this.loadImageFile(file, idx);
          if (idx === demoImages.length - 1) {
            this.showToast("✨ Demo images loaded!");
          }
        })
        .catch(err => {
          console.error("Demo load failed:", err);
          this.showToast("❌ Failed loading demo images. Check internet connection.");
        });
    });
  }
};
