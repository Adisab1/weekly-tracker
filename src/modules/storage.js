import { CONFIG, getTargetDate } from '../config.js';

/**
 * Storage manager for handling localStorage operations
 */
export class StorageManager {
  static getBirthDate() {
    try {
      const birthDateStr = localStorage.getItem('birthDate');
      return birthDateStr ? new Date(birthDateStr) : null;
    } catch {
      return null;
    }
  }

  static saveBirthDate(birthDate) {
    try {
      localStorage.setItem('birthDate', birthDate.toISOString());
      return true;
    } catch {
      return false;
    }
  }

  static getHighlights(weekNumber) {
    try {
      const data = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY) || '{}');
      return data[weekNumber] || null;
    } catch {
      return null;
    }
  }

  static saveHighlights(weekNumber, highlights) {
    try {
      const data = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY) || '{}');
      if (highlights.trim() === '') {
        delete data[weekNumber];
      } else {
        data[weekNumber] = highlights;
      }
      localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch {
      return false;
    }
  }

  static getAllHighlights() {
    try {
      return JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY) || '{}');
    } catch {
      return {};
    }
  }

  static exportData() {
    try {
      const data = this.getAllHighlights();
      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      return dataBlob;
    } catch {
      return null;
    }
  }

  static importData(jsonData) {
    try {
      const data = JSON.parse(jsonData);
      localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch {
      return false;
    }
  }

  static clearAllData() {
    try {
      localStorage.removeItem(CONFIG.STORAGE_KEY);
      return true;
    } catch {
      return false;
    }
  }
}
