// Configuration
const BIRTH_DATE = new Date(1994, 5, 6); // June 6, 1994 (month is 0-indexed)
const TARGET_AGE = 100;
const WEEKS_IN_YEAR = 52.1429; // More accurate calculation

// Calculate dates
const targetDate = new Date(BIRTH_DATE);
targetDate.setFullYear(targetDate.getFullYear() + TARGET_AGE);

// Storage key
const STORAGE_KEY = "lifeWeeksHighlights";

// DOM elements
const weeksGrid = document.getElementById("weeksGrid");
const toggleBtn = document.getElementById("toggleBtn");
const searchInput = document.getElementById("searchInput");
const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close");
const saveBtn = document.getElementById("saveBtn");
const highlightsText = document.getElementById("highlightsText");

let allWeeks = [];
let showOnlyRemaining = true;
let currentSelectedWeek = null;

// Initialize app
function init() {
  calculateAndDisplayStats();
  generateWeeks();
  renderWeeks();
  setupEventListeners();
}

// Calculate statistics
function calculateAndDisplayStats() {
  const now = new Date();

  // Calculate total weeks
  const totalWeeks = Math.floor(
    (targetDate - BIRTH_DATE) / (7 * 24 * 60 * 60 * 1000),
  );

  // Calculate weeks passed
  const weeksPassed = Math.floor(
    (now - BIRTH_DATE) / (7 * 24 * 60 * 60 * 1000),
  );

  // Calculate weeks remaining
  const weeksRemaining = totalWeeks - weeksPassed;

  // Update UI
  document.getElementById("totalWeeks").textContent =
    totalWeeks.toLocaleString();
  document.getElementById("weeksPassed").textContent =
    weeksPassed.toLocaleString();
  document.getElementById("weeksRemaining").textContent =
    weeksRemaining.toLocaleString();

  // Calculate current age
  let ageYears = now.getFullYear() - BIRTH_DATE.getFullYear();
  const monthDiff = now.getMonth() - BIRTH_DATE.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && now.getDate() < BIRTH_DATE.getDate())
  ) {
    ageYears--;
  }

  const yearsRemaining = TARGET_AGE - ageYears;
  document.getElementById("ageInfo").textContent =
    `You are ${ageYears} years old. ${weeksRemaining} weeks remaining until you turn ${TARGET_AGE}!`;
}

// Generate all weeks
function generateWeeks() {
  allWeeks = [];
  const now = new Date();

  const totalWeeks = Math.floor(
    (targetDate - BIRTH_DATE) / (7 * 24 * 60 * 60 * 1000),
  );

  for (let i = 1; i <= totalWeeks; i++) {
    const weekStartDate = new Date(BIRTH_DATE);
    weekStartDate.setDate(weekStartDate.getDate() + (i - 1) * 7);

    const weekEndDate = new Date(weekStartDate);
    weekEndDate.setDate(weekEndDate.getDate() + 6);

    const isPassed = weekEndDate < now;
    const isCurrent = weekStartDate <= now && now <= weekEndDate;

    allWeeks.push({
      number: i,
      startDate: weekStartDate,
      endDate: weekEndDate,
      isPassed,
      isCurrent,
      highlights: getHighlights(i),
    });
  }
}

// Render weeks
function renderWeeks() {
  weeksGrid.innerHTML = "";

  let visibleWeeks = allWeeks;

  // Filter by remaining weeks if toggle is on
  if (showOnlyRemaining) {
    const now = new Date();
    visibleWeeks = allWeeks.filter((week) => week.endDate >= now);
  }

  // Filter by search
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm) {
    visibleWeeks = visibleWeeks.filter((week) => {
      return (
        week.number.toString().includes(searchTerm) ||
        week.startDate.toDateString().toLowerCase().includes(searchTerm)
      );
    });
  }

  // Create week elements
  visibleWeeks.forEach((week) => {
    const weekEl = document.createElement("div");
    weekEl.className = "week";

    if (week.isPassed) weekEl.classList.add("passed");
    if (week.isCurrent) weekEl.classList.add("current");
    if (week.highlights) weekEl.classList.add("with-highlights");

    // Format dates for display
    const startMonth = String(week.startDate.getMonth() + 1).padStart(2, "0");
    const startDay = String(week.startDate.getDate()).padStart(2, "0");
    const startYear = week.startDate.getFullYear();
    const endMonth = String(week.endDate.getMonth() + 1).padStart(2, "0");
    const endDay = String(week.endDate.getDate()).padStart(2, "0");
    const endYear = week.endDate.getFullYear();

    weekEl.innerHTML = `
            <span class="week-number">${week.number}</span>
            <span class="week-date">${startMonth}/${startDay}/${startYear} - ${endMonth}/${endDay}/${endYear}</span>
        `;

    weekEl.addEventListener("click", () => openModal(week));
    weeksGrid.appendChild(weekEl);
  });

  // Show empty state if no weeks
  if (visibleWeeks.length === 0) {
    weeksGrid.innerHTML =
      '<div class="empty-state"><p>No weeks found</p></div>';
  }
}

// Open modal for week
function openModal(week) {
  currentSelectedWeek = week;

  document.getElementById("weekNumber").textContent = week.number;

  const dateRange = `${week.startDate.toLocaleDateString()} - ${week.endDate.toLocaleDateString()}`;
  document.getElementById("weekDateInfo").textContent = dateRange;

  highlightsText.value = week.highlights || "";

  modal.style.display = "block";
}

// Close modal
function closeModal() {
  modal.style.display = "none";
  currentSelectedWeek = null;
  highlightsText.value = "";
}

// Save highlights
function saveHighlights() {
  if (!currentSelectedWeek) return;

  const highlights = highlightsText.value;
  saveHighlightsToStorage(currentSelectedWeek.number, highlights);

  currentSelectedWeek.highlights = highlights;

  generateWeeks();
  renderWeeks();

  closeModal();
}

// Storage functions
function getHighlights(weekNumber) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  return data[weekNumber] || null;
}

function saveHighlightsToStorage(weekNumber, highlights) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  if (highlights.trim() === "") {
    delete data[weekNumber];
  } else {
    data[weekNumber] = highlights;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Event listeners
function setupEventListeners() {
  toggleBtn.addEventListener("click", () => {
    showOnlyRemaining = !showOnlyRemaining;
    toggleBtn.textContent = showOnlyRemaining
      ? "Show All Weeks"
      : "Show Remaining Weeks";
    toggleBtn.classList.toggle("active");
    renderWeeks();
  });

  searchInput.addEventListener("input", renderWeeks);

  closeBtn.addEventListener("click", closeModal);

  saveBtn.addEventListener("click", saveHighlights);

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", init);
