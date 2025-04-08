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

      // Restore the original header color that was saved when the menu opened
      if (header.dataset.originalHeaderColor) {
        header.setAttribute('data-header-color', header.dataset.originalHeaderColor);
        // Clean up the temporary storage
        delete header.dataset.originalHeaderColor;
      } else {
        // This case should ideally not happen if the open logic is correct,
        // but log a warning if it does. The header will retain its current color.
        console.warn('Could not restore original header color: dataset.originalHeaderColor not found.');
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
    const isCurrentlyOpen = !dropdown.classList.contains('hidden');

    if (isCurrentlyOpen) {
        // --- Closing Action ---
        closeDropdown();
    } else {
        // --- Opening Action ---
        if (header) {
            // Store the original header color *before* changing it
            header.dataset.originalHeaderColor = header.getAttribute('data-header-color');
            // Set to light theme for the open dropdown view (dark background)
            header.setAttribute('data-header-color', 'light');
            // Ensure header is visible if it was hidden by scrolling
            header.classList.remove('header-hidden');
        }
        // Show the dropdown
        dropdown.classList.remove('hidden');
        window.isDropdownOpen = true;

        // Toggle icons
        dropdownIconOpen.forEach(icon => icon.classList.add('hiddenOveride'));
        dropdownIconClose.classList.remove('hiddenOveride');
    }
    console.log('Button clicked. Dropdown open:', window.isDropdownOpen, 'Header color:', header ? header.getAttribute('data-header-color') : 'N/A');
  });

  // Add click listeners to all dropdown links to close the menu
  dropdownLinks.forEach(link => {
      link.addEventListener('click', () => {
          console.log('Dropdown link clicked');
          closeDropdown();
      });
  });
}