/**
 * UI manager for handling DOM interactions
 */
export class UIManager {
  constructor() {
    this.elements = {
      weeksGrid: document.getElementById('weeksGrid'),
      toggleBtn: document.getElementById('toggleBtn'),
      searchInput: document.getElementById('searchInput'),
      modal: document.getElementById('modal'),
      closeBtn: document.querySelector('.close'),
      saveBtn: document.getElementById('saveBtn'),
      highlightsText: document.getElementById('highlightsText'),
      weekNumber: document.getElementById('weekNumber'),
      weekDateInfo: document.getElementById('weekDateInfo'),
      totalWeeks: document.getElementById('totalWeeks'),
      weeksPassed: document.getElementById('weeksPassed'),
      weeksRemaining: document.getElementById('weeksRemaining'),
      ageInfo: document.getElementById('ageInfo'),
      birthDateModal: document.getElementById('birthDateModal'),
      birthDateInput: document.getElementById('birthDateInput'),
      birthDateSubmitBtn: document.getElementById('birthDateSubmitBtn')
    };

    this.validateElements();
  }

  validateElements() {
    // Silent validation - missing elements handled gracefully
  }

  showBirthDateModal() {
    if (this.elements.birthDateModal) {
      this.elements.birthDateModal.style.display = 'block';
    }
  }

  closeBirthDateModal() {
    if (this.elements.birthDateModal) {
      this.elements.birthDateModal.style.display = 'none';
    }
  }

  getBirthDate() {
    if (this.elements.birthDateInput) {
      return new Date(this.elements.birthDateInput.value);
    }
    return null;
  }

  setBirthDateValue(date) {
    if (this.elements.birthDateInput && date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      this.elements.birthDateInput.value = `${year}-${month}-${day}`;
    }
  }

  updateStats(stats) {
    this.elements.totalWeeks.textContent = stats.totalWeeks.toLocaleString();
    this.elements.weeksPassed.textContent = stats.weeksPassed.toLocaleString();
    this.elements.weeksRemaining.textContent = stats.weeksRemaining.toLocaleString();
    this.elements.ageInfo.textContent = `You are ${stats.currentAge} years old. ${stats.weeksRemaining} weeks remaining until you turn ${stats.currentAge + stats.yearsRemaining}!`;
  }

  renderWeeks(visibleWeeks, onWeekClick) {
    this.elements.weeksGrid.innerHTML = '';

    if (visibleWeeks.length === 0) {
      this.elements.weeksGrid.innerHTML = '<div class="empty-state"><p>No weeks found</p></div>';
      return;
    }

    visibleWeeks.forEach(week => {
      const weekEl = document.createElement('div');
      weekEl.className = 'week';

      if (week.isPassed) weekEl.classList.add('passed');
      if (week.isCurrent) weekEl.classList.add('current');
      if (week.highlights) weekEl.classList.add('with-highlights');

      const startMonth = String(week.startDate.getMonth() + 1).padStart(2, '0');
      const startDay = String(week.startDate.getDate()).padStart(2, '0');
      const startYear = week.startDate.getFullYear();
      const endMonth = String(week.endDate.getMonth() + 1).padStart(2, '0');
      const endDay = String(week.endDate.getDate()).padStart(2, '0');
      const endYear = week.endDate.getFullYear();

      weekEl.innerHTML = `
        <span class="week-number">${week.number}</span>
        <span class="week-date">${startMonth}/${startDay}/${startYear} - ${endMonth}/${endDay}/${endYear}</span>
      `;

      weekEl.addEventListener('click', () => onWeekClick(week));
      this.elements.weeksGrid.appendChild(weekEl);
    });
  }

  openModal(week) {
    this.elements.weekNumber.textContent = week.number;
    const dateRange = `${week.startDate.toLocaleDateString()} - ${week.endDate.toLocaleDateString()}`;
    this.elements.weekDateInfo.textContent = dateRange;
    this.elements.highlightsText.value = week.highlights || '';
    this.elements.modal.style.display = 'block';
  }

  closeModal() {
    this.elements.modal.style.display = 'none';
    this.elements.highlightsText.value = '';
  }

  getHighlightsText() {
    return this.elements.highlightsText.value;
  }

  getSearchTerm() {
    return this.elements.searchInput.value;
  }

  isShowingOnlyRemaining() {
    return this.elements.toggleBtn.classList.contains('active');
  }

  toggleShowRemaining() {
    this.elements.toggleBtn.classList.toggle('active');
    const isActive = this.elements.toggleBtn.classList.contains('active');
    this.elements.toggleBtn.textContent = isActive ? 'Show All Weeks' : 'Show Remaining Weeks';
    return !isActive; // Return opposite for showOnlyRemaining logic
  }

  showNotification(message, type = 'success', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      background: ${type === 'success' ? '#10b981' : '#ef4444'};
      color: white;
      border-radius: 8px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      z-index: 2000;
      animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, duration);
  }
}
