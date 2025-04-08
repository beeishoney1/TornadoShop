document.addEventListener('DOMContentLoaded', () => {
  console.log('action.js loaded and DOMContentLoaded event fired.');

  // Explicitly hide popups on page load
  const imageViewer = document.getElementById('image-viewer');
  const textPopup = document.getElementById('text-popup');

  if (imageViewer) {
    imageViewer.style.display = 'none';
  }
  if (textPopup) {
    textPopup.style.display = 'none';
  }

  // Define toggleSidebar globally to prevent fallback script from running
  window.toggleSidebar = function() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.toggle('active');
      console.log('toggleSidebar: Sidebar active:', sidebar.classList.contains('active'));
    }
  };

  // Menu icon tap functionality for mobile
  const menuBtn = document.getElementById('menu-btn');
  const sidebar = document.getElementById('sidebar');

  if (menuBtn && sidebar) {
    // Remove any existing listeners to prevent duplicates
    menuBtn.removeEventListener('click', window.toggleSidebar);
    menuBtn.removeEventListener('touchstart', window.toggleSidebar);

    // Only enable tap toggle on mobile (≤768px)
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      console.log('Mobile device detected, enabling tap toggle for sidebar.');
      let isToggling = false; // Debounce flag to prevent rapid toggles

      menuBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent default touch behavior
        if (isToggling) return; // Skip if already toggling
        isToggling = true;
        window.toggleSidebar();
        setTimeout(() => {
          isToggling = false;
        }, 300); // 300ms debounce to match CSS transition duration
      });

      // Prevent the click event from firing after touchstart
      menuBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent click event from triggering toggle
      });
    }
  } else {
    console.error('Menu button or sidebar not found!', { menuBtn, sidebar });
  }

  // Image viewer functionality
  const contentImages = document.querySelectorAll('.content-img');
  const viewerImg = document.getElementById('viewer-img');
  const closeImageBtn = document.getElementById('close-image-btn');

  console.log('Image viewer elements:', {
    contentImages: contentImages.length,
    imageViewer,
    viewerImg,
    closeImageBtn
  });

  if (contentImages.length > 0 && imageViewer && viewerImg && closeImageBtn) {
    contentImages.forEach((img, index) => {
      console.log(`Attaching click event to image ${index}:`, img);
      img.addEventListener('click', () => {
        console.log('Image clicked:', img.src);
        viewerImg.src = img.src;
        imageViewer.style.display = 'flex';
      });
    });

    closeImageBtn.addEventListener('click', () => {
      console.log('Closing image viewer');
      imageViewer.style.display = 'none';
      viewerImg.src = '';
    });

    imageViewer.addEventListener('click', (e) => {
      if (e.target === imageViewer) {
        console.log('Clicked outside image, closing viewer');
        imageViewer.style.display = 'none';
        viewerImg.src = '';
      }
    });
  } else {
    console.error('Image viewer elements not found!', {
      contentImages: contentImages.length,
      imageViewer,
      viewerImg,
      closeImageBtn
    });
  }

  // Text popup functionality
  const contentTexts = document.querySelectorAll('.content-text');
  const popupText = document.getElementById('popup-text');
  const closeTextBtn = document.getElementById('close-text-btn');

  console.log('Text popup elements:', {
    contentTexts: contentTexts.length,
    textPopup,
    popupText,
    closeTextBtn
  });

  if (contentTexts.length > 0 && textPopup && popupText && closeTextBtn) {
    contentTexts.forEach((text, index) => {
      console.log(`Attaching click event to text ${index}:`, text);
      text.addEventListener('click', () => {
        const textContent = text.getAttribute('data-text');
        console.log('Text clicked, data-text:', textContent);
        if (textContent) {
          popupText.textContent = textContent;
          textPopup.style.display = 'block';
        }
      });
    });

    closeTextBtn.addEventListener('click', () => {
      console.log('Closing text popup');
      textPopup.style.display = 'none';
      popupText.textContent = '';
    });

    textPopup.addEventListener('click', (e) => {
      if (e.target === textPopup) {
        console.log('Clicked outside popup, closing');
        textPopup.style.display = 'none';
        popupText.textContent = '';
      }
    });
  } else {
    console.error('Text popup elements not found!', {
      contentTexts: contentTexts.length,
      textPopup,
      popupText,
      closeTextBtn
    });
  }

  // Search bar functionality
  const searchBox = document.getElementById('search-box');
  const contentBoxes = document.querySelectorAll('.content-box');

  if (searchBox && contentBoxes.length > 0) {
    console.log('Search box and content boxes found:', searchBox, contentBoxes.length);
    searchBox.addEventListener('input', () => {
      const searchTerm = searchBox.value.toLowerCase();
      console.log('Search term:', searchTerm);

      contentBoxes.forEach(box => {
        const text = box.querySelector('.content-text').textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          box.style.display = 'flex';
        } else {
          box.style.display = 'none';
        }
      });
    });
  } else {
    console.error('Search box or content boxes not found!', { searchBox, contentBoxes: contentBoxes.length });
  }
});