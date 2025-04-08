export function initializeDropdownMenu() {
  const dropdownContainer = document.querySelector('[data-dropdown]');
  const button = dropdownContainer.querySelector('[dropdown-button]');
  const dropdown = document.querySelector('[dropdown-menu]');
  const header = document.querySelector('[data-header]');
  const dropdownLinks = dropdown.querySelectorAll('a'); // Select all links within the dropdown

  const dropdownIconOpen = button.querySelectorAll('.dropdown-icon-open');
  const dropdownIconClose = button.querySelector('.dropdown-icon-close');

  // Add a global flag to track if dropdown is open
  window.isDropdownOpen = false;

  function closeDropdown() {
    if (dropdown.classList.contains('hidden')) return; // Already closed

    dropdown.classList.add('hidden');
    window.isDropdownOpen = false;

    dropdownIconOpen.forEach(icon => {
      icon.classList.remove('hiddenOveride'); // Show open icons
    });
    dropdownIconClose.classList.add('hiddenOveride'); // Hide close icon

    if (header) {
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
    console.log('Dropdown closed. Header color:', header ? header.getAttribute('data-header-color') : 'N/A');
  }


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
        // Delegate closing logic to the reusable function
        closeDropdown(); // Call close function, but the state is already toggled, so we need to handle that nuance or refactor
        // Re-check state as closeDropdown might have just run
         if (!window.isDropdownOpen) {
             // If it's now closed (because button click toggled it *back* to closed)
             // Need to ensure the icons are correct for a closed state
             dropdownIconOpen.forEach(icon => icon.classList.remove('hiddenOveride'));
             dropdownIconClose.classList.add('hiddenOveride');

             // Also re-run the color logic if needed (handled by closeDropdown)
         }
      }
      console.log(header.getAttribute('data-header-color'));
    }
  })

  // Add click listeners to all dropdown links
  dropdownLinks.forEach(link => {
      link.addEventListener('click', () => {
          console.log('Dropdown link clicked');
          closeDropdown();
      });
  });
}