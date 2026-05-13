// Configuration
export const CONFIG = {
  BIRTH_DATE: null, // Will be set from localStorage or user input
  TARGET_AGE: 100,
  WEEKS_IN_YEAR: 52.1429,
  STORAGE_KEY: 'lifeWeeksHighlights',
  APP_VERSION: '1.0.0'
};

// Get computed dates
export const getTargetDate = () => {
  const targetDate = new Date(CONFIG.BIRTH_DATE);
  targetDate.setFullYear(targetDate.getFullYear() + CONFIG.TARGET_AGE);
  return targetDate;
};

export const setBirthDate = (birthDate) => {
  CONFIG.BIRTH_DATE = birthDate;
};
