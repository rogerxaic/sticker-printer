/* js/events.js */
export const events = {
  handlePaste(event) {
    if (document.activeElement.tagName === 'TEXTAREA' || document.activeElement.tagName === 'INPUT') return;
    const clipboardItems = event.clipboardData.items;
    let foundImage = false;

    for (let i = 0; i < clipboardItems.length; i++) {
      const item = clipboardItems[i];
      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile();
        this.loadImageFile(file, this.selectedIndex);
        foundImage = true;
        break;
      }
    }

    if (foundImage) {
      this.showToast("📸 Image pasted from clipboard!");
    }
  },

  handleKeyDown(event) {
    if (document.activeElement.tagName === 'TEXTAREA' || document.activeElement.tagName === 'INPUT') return;
    if (event.key === 'Delete' || event.key === 'Backspace') {
      const activeImage = this.images[this.selectedIndex];
      if (activeImage) {
        this.deleteImage(this.selectedIndex);
      }
    }
  },

  cellDrop(event, index) {
    this.dragOverIndex = null;
    this.selectedIndex = index;

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        this.loadImageFile(file, index);
        this.showToast("📸 Image dropped successfully!");
      } else {
        this.showToast("⚠️ Only images are supported!");
      }
    }
  }
};
