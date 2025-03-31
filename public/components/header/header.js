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
    const slideshow = document.getElementById('slideshow');
    
    if (slideshow) {
        // Check if the header has static-color attribute
        if (header.hasAttribute('static-color')) {
            // Remove the static-color attribute to allow dynamic changes
            const staticColor = header.getAttribute('static-color');
            header.removeAttribute('static-color');
            
            // Then immediately check scroll position
                const scrollThreshold = window.innerHeight * 0.9;
            if (window.scrollY > scrollThreshold) {
                header.setAttribute('data-header-color', 'dark');
            }
        }
        
        // Rest of the function remains the same
        function handleScroll() {
            const scrollThreshold = window.innerHeight * 0.9;
            
            if (window.scrollY > scrollThreshold) {
                if (header.getAttribute('data-header-color') !== 'dark') {
                    header.setAttribute('data-header-color', 'dark');
                }
            } else {
                if (header.getAttribute('data-header-color') !== 'light') {
                    header.setAttribute('data-header-color', 'light');
                }
            }
        }
        
        // Use all the event handlers we added before
        requestAnimationFrame(handleScroll);
        setTimeout(handleScroll, 0);
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('load', handleScroll);
        document.addEventListener('DOMContentLoaded', handleScroll);
        document.addEventListener('visibilitychange', handleScroll);
        
        // Add a MutationObserver to watch for static-color being added
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && 
                    mutation.attributeName === 'static-color' ||
                    mutation.attributeName === 'data-header-color') {
                    
                    // If static-color was added, remove it and check scroll
                    if (header.hasAttribute('static-color')) {
                        header.removeAttribute('static-color');
                        handleScroll();
                    }
                }
            });
        });
        
        observer.observe(header, { attributes: true });
    }
}

// IIFE to run immediately - highest priority execution
(function() {
    // Try to initialize as early as possible
    try {
        if (document.getElementById('slideshow')) {
            const header = document.querySelector('header');
            if (header) {
                const scrollThreshold = window.innerHeight * 0.9;
                if (window.scrollY > scrollThreshold) {
                    header.setAttribute('data-header-color', 'dark');
                } else {
                    header.setAttribute('data-header-color', 'light');
                }
            }
        }
    } catch (e) {
        console.log('Early header init failed:', e);
    }
})();

// Run the scroll behavior initialization immediately to set correct initial state
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        updateLogoVisibility();
        initializeHeaderHideOnScroll();
    });
    // Initialize scroll behavior immediately 
    initializeScrollBehavior();
} else {
    // Document already loaded
    updateLogoVisibility();
    initializeScrollBehavior();
    initializeHeaderHideOnScroll();
}