fetch('./images.json')
  .then(response => response.json())
  .then(images => {

    const gallery = document.getElementById('gallery');

    images.sort((a, b) =>
      new Date(b.created_at) - new Date(a.created_at)
    );

    images.forEach(image => {

      const link = document.createElement('a');
      link.href = image.secure_url;
      link.target = "_blank";

      const img = document.createElement('img');

      img.src = image.secure_url;
      img.loading = "lazy";

      link.appendChild(img);
      gallery.appendChild(link);
    });
  });
