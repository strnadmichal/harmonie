// Unified toggle function for both service descriptions and price sections
function toggleAccordion(element, contentSelector) {
  // Only run this function on small screens
  if (window.innerWidth >= 890) return;
  
  // Get the toggle button and content element
  const toggleBtn = element.querySelector('.toggle-btn');
  const content = element.nextElementSibling;
  
  // Check if content element exists
  if (!content) {
    console.error("Content element not found for:", element);
    return;
  }
  
  // Toggle the active class on button for rotation
  if (toggleBtn) {
    toggleBtn.classList.toggle('active');
  } else {
    console.warn("Toggle button not found in:", element);
  }
  
  // Toggle the expanded class on the content
  content.classList.toggle('expanded');
}

function toggleServiceDescription(element) {
  toggleAccordion(element, '.service-description');
}

function togglePriceSection(element) {
  toggleAccordion(element, '.price-content');
} 