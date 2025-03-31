export function initializeDropdownMenu() {
  const dropdownContainer = document.querySelector('[data-dropdown]');
  const button = dropdownContainer.querySelector('[dropdown-button]');
  const dropdown = document.querySelector('[dropdown-menu]');
  const header = document.querySelector('[data-header]');

  const dropdownIconOpen = button.querySelectorAll('.dropdown-icon-open');
  const dropdownIconClose = button.querySelector('.dropdown-icon-close');

  // Add a global flag to track if dropdown is open
  window.isDropdownOpen = false;

  button.addEventListener('click', function () {
    const isOpening = dropdown.classList.contains('hidden');
    dropdown.classList.toggle('hidden');
    
    // Update dropdown state
    window.isDropdownOpen = !dropdown.classList.contains('hidden');

    dropdownIconOpen.forEach(icon => {
      icon.classList.toggle('hiddenOveride');
    });

    dropdownIconClose.classList.toggle('hiddenOveride');

    if (header) {
      // Store the original header color when opening the dropdown
      if (isOpening) {
        // Save current header color before changing it
        header.dataset.originalHeaderColor = header.getAttribute('data-header-color');
        
        // When opening menu, always set to light theme (white logo) and ensure header is visible
        header.setAttribute('data-header-color', 'light');
        header.classList.remove('header-hidden');
      } else {
        // When closing menu, temporarily disable transitions
        header.style.transition = 'none';
        
        // Restore the original header color or check the scroll position
        if (header.dataset.originalHeaderColor) {
          header.setAttribute('data-header-color', header.dataset.originalHeaderColor);
          delete header.dataset.originalHeaderColor;
        } else {
          // Fallback to check scroll position to determine proper theme
          const slideshow = document.getElementById('slideshow');
          
          if (slideshow) {
            // Only on index page with slideshow
            const scrollThreshold = window.innerHeight * 0.9;
            if (window.scrollY <= scrollThreshold) {
              header.setAttribute('data-header-color', 'light');
            } else {
              header.setAttribute('data-header-color', 'dark');
            }
          } else {
            // On other pages without slideshow, use dark theme
            header.setAttribute('data-header-color', 'dark');
          }
        }
        
        // Force a reflow to ensure the transition property is applied before we change it back
        void header.offsetWidth;
        
        // Re-enable transitions after a small delay
        setTimeout(() => {
          header.style.transition = '';
        }, 50);
      }
      console.log(header.getAttribute('data-header-color'));
    }
  })
}