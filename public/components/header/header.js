import { initializeDropdownMenu } from '../js/dropdown-menu.js';

export function initializeHeader() {
  initializeDropdownMenu();
  initializeScrollBehavior();
  initializeHeaderHideOnScroll();
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

function initializeHeaderHideOnScroll() {
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    let lastScrollDirection = 0; // 0 = initial, 1 = up, -1 = down
    const minScrollBeforeHide = 50; // Minimum scroll before we start hiding

    function handleHeaderVisibility() {
        const currentScrollY = window.scrollY;
        
        // Skip if we're at the very top of the page
        if (currentScrollY < minScrollBeforeHide) {
            header.classList.remove('header-hidden');
            lastScrollY = currentScrollY;
            return;
        }
        
        // Determine scroll direction
        const scrollDirection = currentScrollY > lastScrollY ? -1 : 1;
        
        // Only toggle class if direction changed and we're past minimum scroll
        if (scrollDirection !== lastScrollDirection && currentScrollY > minScrollBeforeHide) {
            if (scrollDirection < 0) {
                // Scrolling down - hide header
                header.classList.add('header-hidden');
            } else {
                // Scrolling up - show header
                header.classList.remove('header-hidden');
            }
            lastScrollDirection = scrollDirection;
        }
        
        // Update the last scroll position
        lastScrollY = currentScrollY;
    }

    // Call once on page load
    handleHeaderVisibility();
    
    // Use passive event listener for better performance
    window.addEventListener('scroll', () => {
        // Use requestAnimationFrame to optimize performance
        window.requestAnimationFrame(handleHeaderVisibility);
    }, { passive: true });
}

function initializeScrollBehavior() {
    const header = document.querySelector('header');
    
    // Check if we're on the index page by looking for the slideshow element
    // This is unique to the index page and more reliable than checking URLs
    const slideshow = document.getElementById('slideshow');
    
    if (slideshow) {
        // This function handles changing the header theme based on scroll position
        function handleScroll() {
            // Get the height of the hero image section - approximately 100vh
            const scrollThreshold = window.innerHeight * 0.9; // 90% of viewport height
            
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
    initializeHeaderHideOnScroll();
});