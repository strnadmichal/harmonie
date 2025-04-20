import { loadTranslations } from '../translations/translations.js';

class LanguageManager {
  constructor() {
    // This setup needs to be async now
    // We'll call an async init method instead
    this.currentLanguage = localStorage.getItem('language') || 'cs';
    this.translations = {}; // Initialize as empty
  }

  // Async initialization method
  async init() {
    this.translations = await loadTranslations();
    this.currentLanguage = localStorage.getItem('language') || 'cs';
    // Initial content update after loading translations
    this.updateContent(); 
  }

  // Změna jazyka
  setLanguage(lang) {
    this.currentLanguage = lang;
    localStorage.setItem('language', lang);
    this.updateContent();
  }

  // Získání překladu podle klíče
  getText(key) {
    const keys = key.split('.');
    // Ensure translations for the current language are loaded
    if (!this.translations[this.currentLanguage]) {
      console.warn(`Translations not loaded for language: ${this.currentLanguage}`);
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
    if (!this.translations || Object.keys(this.translations).length === 0) {
        console.log("Translations not yet loaded, skipping content update.");
        return; 
    }
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translatedText = this.getText(key);
      if (translatedText !== key) { // Only update if translation exists
          element.textContent = translatedText;
      } else {
        // Optional: Log if a key wasn't found, but only once?
        // console.warn(`Translation missing for key: ${key}`)
      }
    });
  }
}

// Vytvoření globální instance a inicializace
async function initializeLanguageManager() {
  const manager = new LanguageManager();
  await manager.init(); // Wait for translations to load
  window.languageManager = manager;
}

// Spustíme inicializáciu po načítaní DOMu
document.addEventListener('DOMContentLoaded', initializeLanguageManager);

// Keep the default export if other parts of the code might use it directly,
// although the primary usage is via the global window.languageManager
export default LanguageManager;
