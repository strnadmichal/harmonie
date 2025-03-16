/**
 * Modal Image Gallery
 * A reusable component for displaying images in a modal gallery.
 */

// Current gallery state
let currentGallery = {
  roomData: null,
  currentImageIndex: 0
};

/**
 * Initialize the modal gallery functionality
 * @param {string} galleryItemSelector - CSS selector for items that will trigger the gallery
 * @param {string} roomIdAttribute - Data attribute that contains the room ID (e.g., 'data-room-id')
 * @param {Object[]} roomData - Array of room objects with image paths
 */
function initModalGallery(galleryItemSelector = '.room-card', roomIdAttribute = 'data-room-id', roomData = []) {
  // Save room data
  currentGallery.roomData = roomData;
  
  // Check if the modal already exists, if not, create it
  if (!document.querySelector('.modal-gallery')) {
    createModalElement();
  }
  
  // Get all gallery items
  const galleryItems = document.querySelectorAll(galleryItemSelector);
  
  // Add click event to each gallery item
  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      // Find roomId from the data attribute
      const roomId = item.getAttribute(roomIdAttribute);
      const room = roomData.find(r => r.id.toString() === roomId);
      
      if (room) {
        openGallery(room);
      }
    });
  });
  
  // Close button functionality
  const closeBtn = document.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeGallery);
  }
  
  // Close modal when clicking outside the image
  const modal = document.querySelector('.modal-gallery');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeGallery();
      }
    });
  }
  
  // Navigation buttons
  const prevBtn = document.querySelector('.modal-prev');
  const nextBtn = document.querySelector('.modal-next');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      navigateGallery(-1);
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      navigateGallery(1);
    });
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!document.querySelector('.modal-gallery.active')) return;
    
    if (e.key === 'Escape') {
      closeGallery();
    } else if (e.key === 'ArrowLeft') {
      navigateGallery(-1);
    } else if (e.key === 'ArrowRight') {
      navigateGallery(1);
    }
  });
}

/**
 * Create the modal element if it doesn't exist
 */
function createModalElement() {
  const modalHTML = `
    <div class="modal-gallery">
      <span class="modal-close">&times;</span>
      <div class="modal-content">
        <div class="modal-nav">
          <button class="modal-nav-btn modal-prev">
            <i data-lucide="chevron-left" width="24" height="24"></i>
          </button>
          <button class="modal-nav-btn modal-next">
            <i data-lucide="chevron-right" width="24" height="24"></i>
          </button>
        </div>
        <img class="modal-image" src="" alt="Gallery image">
      </div>
      <div class="modal-caption"></div>
      <div class="modal-thumbnails"></div>
    </div>
  `;
  
  // Insert modal at the beginning of the body
  document.body.insertAdjacentHTML('afterbegin', modalHTML);
  
  // Initialize Lucide icons within the modal
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons({
      attrs: {
        class: ["modal-icon"]
      },
      nameAttr: 'data-lucide',
    });
  }
}

/**
 * Open the gallery for a specific room
 * @param {Object} room - The room object with images to display
 */
function openGallery(room) {
  currentGallery.room = room;
  currentGallery.currentImageIndex = 0;
  
  const modal = document.querySelector('.modal-gallery');
  const modalImg = document.querySelector('.modal-image');
  const modalCaption = document.querySelector('.modal-caption');
  const thumbnailsContainer = document.querySelector('.modal-thumbnails');
  
  // Show the first image
  if (modalImg && room.images.length > 0) {
    modalImg.src = room.images[0];
    modalImg.alt = `${room.name} - picture 1`;
  }
  
  // Set the caption
  if (modalCaption) {
    modalCaption.textContent = `${room.name} - picture 1/${room.images.length}`;
  }
  
  // Generate thumbnails
  if (thumbnailsContainer) {
    thumbnailsContainer.innerHTML = '';
    
    room.images.forEach((img, index) => {
      const thumbnail = document.createElement('img');
      thumbnail.src = img;
      thumbnail.alt = `Thumbnail ${index + 1}`;
      thumbnail.classList.add('modal-thumbnail');
      
      if (index === 0) {
        thumbnail.classList.add('active');
      }
      
      thumbnail.addEventListener('click', () => {
        currentGallery.currentImageIndex = index;
        updateGalleryImage();
      });
      
      thumbnailsContainer.appendChild(thumbnail);
    });
  }
  
  // Show modal
  if (modal) {
    modal.classList.add('active');
  }
  
  // Hide/show navigation buttons based on number of images
  const navButtons = document.querySelectorAll('.modal-nav-btn');
  if (navButtons.length > 0 && room.images.length <= 1) {
    navButtons.forEach(btn => {
      btn.style.display = 'none';
    });
  } else {
    navButtons.forEach(btn => {
      btn.style.display = 'flex';
    });
  }
}

/**
 * Close the gallery
 */
function closeGallery() {
  const modal = document.querySelector('.modal-gallery');
  if (modal) {
    modal.classList.remove('active');
  }
}

/**
 * Navigate through gallery images
 * @param {number} direction - Direction to navigate (-1 for previous, 1 for next)
 */
function navigateGallery(direction) {
  if (!currentGallery.room || currentGallery.room.images.length <= 1) return;
  
  currentGallery.currentImageIndex += direction;
  
  // Loop around if we go past the end or beginning
  if (currentGallery.currentImageIndex < 0) {
    currentGallery.currentImageIndex = currentGallery.room.images.length - 1;
  } else if (currentGallery.currentImageIndex >= currentGallery.room.images.length) {
    currentGallery.currentImageIndex = 0;
  }
  
  updateGalleryImage();
}

/**
 * Update the displayed gallery image
 */
function updateGalleryImage() {
  const modalImg = document.querySelector('.modal-image');
  const modalCaption = document.querySelector('.modal-caption');
  const thumbnails = document.querySelectorAll('.modal-thumbnail');
  
  if (modalImg) {
    modalImg.src = currentGallery.room.images[currentGallery.currentImageIndex];
    modalImg.alt = `${currentGallery.room.name} - obrázek ${currentGallery.currentImageIndex + 1}`;
  }
  
  if (modalCaption) {
    modalCaption.textContent = `${currentGallery.room.name} - obrázek ${currentGallery.currentImageIndex + 1}/${currentGallery.room.images.length}`;
  }
  
  // Update active thumbnail
  thumbnails.forEach((thumb, index) => {
    if (index === currentGallery.currentImageIndex) {
      thumb.classList.add('active');
    } else {
      thumb.classList.remove('active');
    }
  });
}

// Export functions for use in other files
export { initModalGallery };
