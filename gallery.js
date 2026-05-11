fetch('./images.json')

      if (!lightbox.classList.contains('visible')) return;

      if (e.key === 'ArrowRight') {
        showNext();
      }

      if (e.key === 'ArrowLeft') {
        showPrev();
      }

      if (e.key === 'Escape') {
        closeLightbox();
      }
    });

    // ---------- SWIPE SUPPORT ----------

    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    lightbox.addEventListener('touchend', (e) => {

      touchEndX = e.changedTouches[0].screenX;

      const distance = touchEndX - touchStartX;

      if (distance < -50) {
        showNext();
      }

      if (distance > 50) {
        showPrev();
      }
    });

    // ---------- GALLERY ----------

    images.forEach((image, index) => {

      const img = document.createElement('img');

      img.src = image.secure_url.replace(
        '/upload/',
        '/upload/w_800,q_auto,f_auto/'
      );

      img.loading = 'lazy';

      // Fade in
      img.onload = () => {
        img.classList.add('loaded');
      };

      // Open fullscreen
      img.addEventListener('click', () => {
        openLightbox(index);
      });

      gallery.appendChild(img);
    });
  })
  .catch(error => {
    console.error('Error loading gallery:', error);
  });
