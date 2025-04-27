import { loadTranslations } from '../translations/translations.js';

let languageManagerInstance = null;
let languageManagerReady = null; // This will hold our promise

class LanguageManager {
  constructor() {
    // This setup needs to be async now
    // We'll call an async init method instead
    this.currentLanguage = localStorage.getItem('language') || 'cs';
    this.translations = {}; // Initialize as empty
    this.isInitialized = false; // Add an initialization flag
  }

  // Async initialization method
  async init() {
    try {
      this.translations = await loadTranslations();
      this.currentLanguage = localStorage.getItem('language') || 'cs';
      this.isInitialized = true;
      // Initial content update after loading translations
      // Removed from here, should be called by the page after awaiting the promise
      // this.updateContent(); 
      console.log("Language Manager Initialized");
    } catch (error) {
        console.error("Failed to initialize Language Manager:", error);
        // Handle initialization failure if needed
    }
  }

  // Změna jazyka
  setLanguage(lang) {
    if (!this.isInitialized) {
      console.warn("Cannot set language: Language Manager not initialized.");
      return;
    }
    this.currentLanguage = lang;
    localStorage.setItem('language', lang);
    this.updateContent();
  }

  // Získání překladu podle klíče
  getText(key) {
    const keys = key.split('.');
    // Ensure translations for the current language are loaded
    if (!this.isInitialized || !this.translations[this.currentLanguage]) {
      console.warn(`Translations not loaded for language: ${this.currentLanguage} or manager not initialized.`);
      return key; // Return key if translations aren't ready
    }

    let value = this.translations[this.currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && value.hasOwnProperty(k)) {
        value = value[k];
      } else {
        // console.warn(`Translation key not found: ${key} (failed at ${k})`);
        return key; // Return the original key if not found
      }
    }
    
    // Check if the final value is a string, otherwise return the key
    return typeof value === 'string' ? value : key;
  }

  // Aktualizace obsahu stránky
  updateContent() {
    // Ensure translations are loaded before updating
    if (!this.isInitialized || !this.translations || Object.keys(this.translations).length === 0) {
        console.log("Translations not yet loaded or manager not initialized, skipping content update.");
        return; 
    }
    console.log("Updating content based on language:", this.currentLanguage);
    document.querySelectorAll('[data-i18n]').forEach(element => {
      this.updateElement(element);
    });
  }

  // Helper to update a single element
  updateElement(element) {
      if (!this.isInitialized) return; // Guard clause
      const key = element.getAttribute('data-i18n');
      const translatedText = this.getText(key);
      if (translatedText !== key) { // Only update if translation exists
          element.textContent = translatedText;
      } else {
        // Optional: Log if a key wasn't found
        // console.warn(`Translation missing for key: ${key}`)
      }
  }
}

// Immediately-invoked async function to initialize the manager
languageManagerReady = (async () => {
  if (!languageManagerInstance) {
    console.log("Initializing Language Manager...");
    languageManagerInstance = new LanguageManager();
    await languageManagerInstance.init(); // Wait for translations to load
    window.languageManager = languageManagerInstance; // Assign to global scope
  }
  return languageManagerInstance; // Resolve the promise with the instance
})();

// Export the promise and the class (if needed elsewhere)
export { languageManagerReady, LanguageManager };

