const componentScripts = {
  'header': {
    init: async () => {
      const module = await import('../header/header.js');
      return module.initializeHeader();
    }
  }
};

async function loadComponent(name, targetId) {
  try {
    const response = await fetch(`./components/${name}/${name}.html`);
    const html = await response.text();
    const targetElement = document.getElementById(targetId);
    targetElement.innerHTML = html;

    // Apply page-specific theme before initializing component scripts
    const pageTheme = targetElement.getAttribute('data-page-theme');
    const headerElement = targetElement.querySelector('header'); // Find the actual header element within the loaded HTML
    if (pageTheme && headerElement) {
      headerElement.setAttribute('data-header-color', pageTheme);
    }

    const config = componentScripts[name];
    if (config) {
      await config.init();
    }
    
    // Apply language translations immediately after component is loaded
    if (window.languageManager) {
      window.languageManager.updateContent();
    }
  } catch (error) {
    console.error(`Error loading component ${name}:`, error);
  }
}