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
    document.getElementById(targetId).innerHTML = html;

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