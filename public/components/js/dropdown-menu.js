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

      if (window.location.pathname.includes('index.html')) {
        return;
      }

      if (!dropdown.classList.contains('hidden')) {
        header.setAttribute('data-header-color', 'light');
      } else {
        header.setAttribute('data-header-color', 'dark');
      }
      console.log(header.getAttribute('data-header-color'));
    }
  })
}