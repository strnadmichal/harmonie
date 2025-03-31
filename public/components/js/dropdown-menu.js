export function initializeDropdownMenu() {
  const dropdownContainer = document.querySelector('[data-dropdown]');
  const button = dropdownContainer.querySelector('[dropdown-button]');
  const dropdown = document.querySelector('[dropdown-menu]');
  const header = document.querySelector('[data-header]');

  const dropdownIconOpen = button.querySelectorAll('.dropdown-icon-open');
  const dropdownIconClose = button.querySelector('.dropdown-icon-close');

  button.addEventListener('click', function () {
    dropdown.classList.toggle('hidden');

    dropdownIconOpen.forEach(icon => {
      icon.classList.toggle('hiddenOveride');
    });

    dropdownIconClose.classList.toggle('hiddenOveride');

    if (header) {
      const currentTheme = header.getAttribute('data-header-color');

      if (header.getAttribute('static-color') === 'true') {
        return;
      }

      if (!dropdown.classList.contains('hidden')) {
        // When opening menu, set to light
        header.setAttribute('data-header-color', 'light');
      } else {
        // When closing menu, temporarily disable transitions
        header.style.transition = 'none';
        
        // Check scroll position to determine proper theme
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