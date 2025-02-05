import { initializeDropdownMenu } from '../js/dropdown-menu.js';

export function initializeHeader() {
  initializeDropdownMenu();
  return {
    initialized: true
  };
}

function updateLogoVisibility() {
    const header = document.querySelector('header');
    const headerColor = header.getAttribute('data-header-color');
    
    // Watch for attribute changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'data-header-color') {
                const newColor = header.getAttribute('data-header-color');
                console.log('Header color changed to:', newColor);
            }
        });
    });

    observer.observe(header, { attributes: true });
}

document.addEventListener('DOMContentLoaded', updateLogoVisibility);