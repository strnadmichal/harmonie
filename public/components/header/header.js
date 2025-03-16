import { initializeDropdownMenu } from '../js/dropdown-menu.js';

export function initializeHeader() {
  initializeDropdownMenu();
  initializeScrollBehavior();
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

function initializeScrollBehavior() {
    const header = document.querySelector('header');
    
    // If header has a static color attribute, we don't change it on scroll
    // Check if we're on the home page (index.html, root path, or domain root)
    const isHomePage = window.location.pathname.includes('index.html') || 
                      window.location.pathname === '/' || 
                      window.location.pathname === '/public/' || 
                      window.location.pathname === '' || 
                      window.location.href === 'https://www.harmonie-bedrichov.cz/' || 
                      window.location.href === 'https://www.harmonie-bedrichov.cz';
    
    if (isHomePage) {
        // This function handles changing the header theme based on scroll position
        function handleScroll() {
            // Get the height of the hero image section - approximately 100vh
            const scrollThreshold = window.innerHeight * 0.9; // 70% of viewport height
            
            if (window.scrollY > scrollThreshold) {
                // User has scrolled past the hero image - switch to dark theme
                if (header.getAttribute('data-header-color') !== 'dark') {
                    header.setAttribute('data-header-color', 'dark');
                }
            } else {
                // User is at the hero image - use light theme
                if (header.getAttribute('data-header-color') !== 'light') {
                    header.setAttribute('data-header-color', 'light');
                }
            }
        }
        
        // Run once on load
        handleScroll();
        
        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateLogoVisibility();
    initializeScrollBehavior();
});