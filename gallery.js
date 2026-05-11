fetch('./images.json')
  .then(response => response.json())
  .then(images => {

    const gallery = document.getElementById('gallery');

    images.sort((a, b) =>
      new Date(b.created_at) - new Date(a.created_at)
    );

    // ---------- LIGHTBOX ----------

    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';

    lightbox.innerHTML = `
      <button id="prevBtn">←</button>
      <img id="lightboxImage">
      <button id="nextBtn">→</button>
      <div id="closeBtn">✕</div>
    `;

    document.body.appendChild(lightbox);

    const lightboxImage = document.getElementById('lightboxImage');

    let currentIndex = 0;

    function openLightbox(index) {

      currentIndex = index;

      lightboxImage.src = images[index].secure_url.replace(
        '/upload/',
        '/upload/w_1400,q_auto,f_auto/'
      );

      lightbox.classList.add('visible');

      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('visible');
      document.body.style.overflow = '';
    }

    function nextImage() {
      currentIndex = (currentIndex + 1) % images.length;
      openLightbox(currentIndex);
    }

    function prevImage() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      openLightbox(currentIndex);
    }

    document.getElementById('nextBtn')
      .addEventListener('click', nextImage);

    document.getElementById('prevBtn')
      .addEventListener('click', prevImage);

    document.getElementById('closeBtn')
      .addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Keyboard navigation

    document.addEventListener('keydown', (e) => {

      if (!lightbox.classList.contains('visible')) return;

      if (e.key === 'ArrowRight') nextImage();

      if (e.key === 'ArrowLeft') prevImage();

      if (e.key === 'Escape') closeLightbox();
    });

    // Swipe support

    let startX = 0;

    lightbox.addEventListener('touchstart', (e) => {
      startX = e.changedTouches[0].screenX;
    });

    lightbox.addEventListener('touchend', (e) => {

      const endX = e.changedTouches[0].screenX;

      if (endX - startX > 50) {
        prevImage();
      }

      if (startX - endX > 50) {
        nextImage();
      }
    });

    // ---------- GALLERY ----------

    images.forEach((image, index) => {

      const link = document.createElement('a');

      link.href = '#';

      const img = document.createElement('img');

      img.src = image.secure_url.replace(
        '/upload/',
        '/upload/w_800,q_auto,f_auto/'
      );

      img.loading = "lazy";

      link.appendChild(img);

      link.addEventListener('click', (e) => {
        e.preventDefault();
        openLightbox(index);
      });

      gallery.appendChild(link);
    });
  });
