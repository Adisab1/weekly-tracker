import { WeekManager } from './weekManager.js';
import { UIManager } from './ui.js';
import { StorageManager } from './storage.js';
import { CONFIG, setBirthDate } from '../config.js';

/**
 * Main app manager
 */
class App {
  constructor() {
    this.weekManager = WeekManager;
    this.ui = new UIManager();
    this.allWeeks = [];
    this.currentSelectedWeek = null;
    this.showOnlyRemaining = true;
  }

  initBirthDate() {
    // Check if birth date is stored
    const storedBirthDate = StorageManager.getBirthDate();
    
    if (storedBirthDate) {
      setBirthDate(storedBirthDate);
      return true;
    } else {
      // Show birth date modal
      this.ui.showBirthDateModal();
      
      // Bind submit button
      this.ui.elements.birthDateSubmitBtn?.addEventListener('click', () => this.handleBirthDateSubmit());
      
      // Handle Enter key
      this.ui.elements.birthDateInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.handleBirthDateSubmit();
        }
      });
      
      // Prevent closing modal by clicking outside
      this.ui.elements.birthDateModal?.addEventListener('click', (e) => {
        if (e.target === this.ui.elements.birthDateModal) {
          e.stopPropagation();
        }
      });
      
      return false;
    }
  }

  handleBirthDateSubmit() {
    const birthDate = this.ui.getBirthDate();
    
    if (!birthDate || isNaN(birthDate.getTime())) {
      this.ui.showNotification('Please select a valid date of birth', 'error');
      return;
    }

    if (birthDate > new Date()) {
      this.ui.showNotification('Date of birth cannot be in the future', 'error');
      return;
    }

    // Save birth date
    StorageManager.saveBirthDate(birthDate);
    setBirthDate(birthDate);

    // Close modal and initialize app
    this.ui.closeBirthDateModal();
    this.ui.showNotification('Birth date saved successfully!');
    
    // Initialize the app
    this.init();
  }

  init() {
    try {
      // Generate weeks
      this.allWeeks = this.weekManager.generateAllWeeks();

      // Update stats
      const stats = this.weekManager.calculateStats(this.allWeeks);
      this.ui.updateStats(stats);

      // Initial render
      this.renderWeeks();

      // Setup event listeners
      this.setupEventListeners();
    } catch (error) {
      this.ui.showNotification('Error initializing app', 'error');
    }
  }

  renderWeeks() {
    const filtered = this.weekManager.filterWeeks(
      this.allWeeks,
      this.showOnlyRemaining,
      this.ui.getSearchTerm()
    );
    this.ui.renderWeeks(filtered, (week) => this.handleWeekClick(week));
  }

  handleWeekClick(week) {
    this.currentSelectedWeek = week;
    this.ui.openModal(week);
  }

  handleSaveHighlights() {
    if (!this.currentSelectedWeek) return;

    const highlights = this.ui.getHighlightsText();
    const saved = StorageManager.saveHighlights(this.currentSelectedWeek.number, highlights);

    if (saved) {
      this.currentSelectedWeek.highlights = highlights;
      this.ui.showNotification('Highlights saved successfully!');
      this.renderWeeks();
      this.ui.closeModal();
    } else {
      this.ui.showNotification('Error saving highlights', 'error');
    }
  }

  handleToggle() {
    this.showOnlyRemaining = this.ui.toggleShowRemaining();
    this.renderWeeks();
  }

  handleSearch() {
    this.renderWeeks();
  }

  setupEventListeners() {
    this.ui.elements.toggleBtn?.addEventListener('click', () => this.handleToggle());
    this.ui.elements.searchInput?.addEventListener('input', () => this.handleSearch());
    this.ui.elements.closeBtn?.addEventListener('click', () => this.ui.closeModal());
    this.ui.elements.saveBtn?.addEventListener('click', () => this.handleSaveHighlights());

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
      if (event.target === this.ui.elements.modal) {
        this.ui.closeModal();
      }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.ui.closeModal();
      }
    });
  }

  // Public methods for data management
  exportData() {
    const data = StorageManager.exportData();
    if (data) {
      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = `life-weeks-backup-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(url);
      this.ui.showNotification('Data exported successfully!');
    } else {
      this.ui.showNotification('Error exporting data', 'error');
    }
  }

  importData(jsonData) {
    if (StorageManager.importData(jsonData)) {
      this.allWeeks = this.weekManager.generateAllWeeks();
      this.renderWeeks();
      this.ui.showNotification('Data imported successfully!');
    } else {
      this.ui.showNotification('Error importing data', 'error');
    }
  }
}

export const app = new App();

export function init() {
  // First check and handle birth date initialization
  if (!app.initBirthDate()) {
    // Birth date modal is shown, init will be called after submission
    return;
  }
  // If birth date already exists, initialize the app
  app.init();
}
