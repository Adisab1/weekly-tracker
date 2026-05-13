import { init, app } from '../src/modules/app.js';

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  init();

  // Setup export/import functionality
  const exportBtn = document.getElementById('exportBtn');
  const importBtn = document.getElementById('importBtn');
  const importFile = document.getElementById('importFile');

  exportBtn?.addEventListener('click', () => {
    app.exportData();
  });

  importBtn?.addEventListener('click', () => {
    importFile?.click();
  });

  importFile?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = event.target?.result;
          app.importData(data);
        } catch {
          app.ui.showNotification('Error importing file', 'error');
        }
      };
      reader.readAsText(file);
    } else {
      app.ui.showNotification('Please select a valid JSON file', 'error');
    }
  });
});
