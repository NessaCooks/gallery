fetch('images.json')
  .then(res => res.json())
  .then(images => {

    images.sort((a, b) =>
      new Date(b.created_at) - new Date(a.created_at)
    );

    const gallery = document.getElementById('gallery');

    images.forEach(image => {

      const img = document.createElement('img');

      img.src = image.secure_url;

      img.loading = "lazy";

      gallery.appendChild(img);
    });
  });
