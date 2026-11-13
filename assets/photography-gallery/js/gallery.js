/* Photography lightbox. EXIF parsing by exif-js (MIT); see ../licenses/. */
(() => {
  'use strict';
  const links = Array.from(document.querySelectorAll('#main a[data-photo-path]'));
  const dialog = document.querySelector('.photo-dialog');
  // Direct image links remain usable without JavaScript or native dialog support.
  if (!links.length || !dialog || typeof dialog.showModal !== 'function') return;
  const photo = dialog.querySelector('.photo-full');
  const status = dialog.querySelector('#photo-status');
  const locationLabel = dialog.querySelector('.photo-location');
  const details = dialog.querySelector('.photo-exif');
  const previous = dialog.querySelector('.photo-previous');
  const next = dialog.querySelector('.photo-next');
  const metadata = new Map();
  let currentIndex = 0;
  let revision = 0;
  let opener;

  function formatExif(tags) {
    const fields = [];
    const camera = [tags.Make, tags.Model].filter(Boolean).map(String);
    if (camera.length === 2 && camera[1].toLowerCase().startsWith(camera[0].toLowerCase())) camera.shift();
    if (camera.length) fields.push(camera.join(' ').trim());
    const aperture = Number(tags.FNumber);
    if (aperture > 0) fields.push(`f/${Number(aperture.toFixed(1))}`);
    const exposureText = String(tags.ExposureTime || '');
    const fraction = exposureText.match(/^(\d+)\/(\d+)$/);
    const exposure = fraction ? Number(fraction[1]) / Number(fraction[2]) : Number(exposureText);
    if (Number.isFinite(exposure) && exposure > 0) {
      fields.push(fraction ? `${exposureText} s` : `${Number(exposure.toFixed(4))} s`);
    }
    const focalLength = Number(tags.FocalLength);
    if (focalLength > 0) fields.push(`${Number(focalLength.toFixed(1))} mm`);
    const iso = Number(tags.ISOSpeedRatings);
    if (iso > 0) fields.push(`ISO ${iso}`);
    return fields.join(' · ');
  }

  function readMetadata(link) {
    const path = link.dataset.photoPath;
    if (!metadata.has(path)) {
      metadata.set(path, fetch(link.href)
        .then(response => {
          if (!response.ok) throw new Error('Unable to load photograph metadata');
          return response.arrayBuffer();
        })
        .then(buffer => window.EXIF ? formatExif(window.EXIF.readFromBinaryFile(buffer) || {}) : '')
        .catch(() => ''));
    }
    return metadata.get(path);
  }

  function show(index) {
    currentIndex = (index + links.length) % links.length;
    const link = links[currentIndex];
    const currentRevision = ++revision;
    const position = `Photograph ${currentIndex + 1} of ${links.length}`;
    status.textContent = `${position} — Loading…`;
    const locationName = (link.dataset.photoLocation || '').trim();
    locationLabel.textContent = locationName;
    locationLabel.hidden = !locationName;
    details.textContent = '';
    details.hidden = true;
    photo.alt = link.querySelector('img').alt;
    photo.onload = () => { status.textContent = position; };
    photo.onerror = () => { status.textContent = `${position} — Unable to load this photograph.`; };
    photo.src = link.href;
    previous.hidden = next.hidden = links.length < 2;
    readMetadata(link).then(text => {
      if (currentRevision !== revision || !dialog.open) return;
      details.textContent = text;
      details.hidden = !text;
    });
  }

  links.forEach((link, index) => {
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      dialog.showModal();
      document.body.classList.add('photo-open');
      show(index);
    });
  });
  previous.addEventListener('click', () => show(currentIndex - 1));
  next.addEventListener('click', () => show(currentIndex + 1));
  dialog.querySelector('.photo-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(currentIndex + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  // Native dialog traps focus and handles Escape; restore focus to the clicked tile.
  dialog.addEventListener('close', () => {
    revision++;
    document.body.classList.remove('photo-open');
    photo.removeAttribute('src');
    opener?.focus({ preventScroll: true });
  });
})();
