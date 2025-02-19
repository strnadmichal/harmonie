import translations from '../translations/translations.js';

class LanguageManager {
  constructor() {
    this.currentLanguage = localStorage.getItem('language') || 'cs';
    this.translations = translations;
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
    let value = this.translations[this.currentLanguage];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return value;
  }

  // Aktualizace obsahu stránky
  updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = this.getText(key);
    });
  }
}

// Vytvoření globální instance
window.languageManager = new LanguageManager();

// Inicializace při načtení stránky
document.addEventListener('DOMContentLoaded', () => {
  window.languageManager.updateContent();
});

export default LanguageManager;
