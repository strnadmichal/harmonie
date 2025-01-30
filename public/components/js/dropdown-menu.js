export function initializeDropdownMenu() {
  const dropdowns = document.querySelectorAll('[data-dropdown]');

  dropdowns.forEach(dropdown => {
    const button = dropdown.querySelector('[data-dropdown-button]');
    const openIcon = button.querySelector('.dropdown-icon-open');
    const closeIcon = button.querySelector('.dropdown-icon-close');

    button.addEventListener('click', function () {
      dropdown.classList.toggle('active');
      openIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
    });

    document.addEventListener('click', function (event) {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('active');
        openIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    });
  });
}