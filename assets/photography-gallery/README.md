# Photography gallery

The `/photography/` page uses a dedicated Jekyll layout based on
[rampatra/photography](https://github.com/rampatra/photography) and
[Multiverse by HTML5 UP](https://html5up.net/multiverse).

## Maintaining photos

Add, replace, or remove images in `assets/photography/wildlife/` and
`assets/photography/scenic/`, then commit and deploy the site normally.
The next Jekyll build discovers the images automatically. No photo list,
separate thumbnails, Node build, or custom Jekyll plugin is required.

The continuous gallery shows all wildlife images, then all scenic images,
sorted by filename within each category. JPG/JPEG, PNG, GIF, and WebP are
supported, including uppercase extensions. Only files directly in those two
folders are included. Different filenames are separate entries, including copies.

Images are used directly for tiles and full-size viewing. For a growing portfolio,
upload web-sized exports to keep downloads reasonable. Keep EXIF in your exports
if you want camera settings displayed. Missing EXIF is simply omitted.

## Adding photo locations

Edit `_data/photography_locations.yml` and fill in the place name for each photo:

```yaml
"/assets/photography/wildlife/IMG_4590.jpg": "City, Country"
```

Keys are full site-relative paths, including the leading slash, category folder,
filename, and extension. This keeps photos with the same filename in different
folders independent. Use the original path even if the site has a `baseurl`.
Quote place names, and use single quotes around a name that contains double
quotes. Non-English names are supported.

The location appears above the camera settings in the lightbox after the next
Jekyll build and deployment. Blank or missing entries hide the location line;
new images still appear automatically without a location entry. Locations are
entered manually; the gallery does not look them up from GPS coordinates.

## Assets and credits

- `css/template.min.css` and `css/images/` are copied from rampatra/photography
  (GPL-3.0; `licenses/photography-GPL-3.0.txt`). Its underlying Multiverse design
  is by HTML5 UP, credited visibly on the page under
  [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).
- `js/exif.js` is exif-js, by Jacob Seidelin and contributors
  (MIT; `licenses/exif-js-MIT.txt`), copied from the template.
- `fonts/source-sans-3.ttf` is Source Sans 3 by Adobe
  (SIL Open Font License; `licenses/source-sans-3-OFL.txt`).
- `css/gallery.css`, `js/gallery.js`, and the dedicated photography layout are
  local adaptations for folder discovery, native accessible lightbox controls,
  lazy loading, and EXIF lookup by full photo path. These gallery adaptations
  are distributed under GPL-3.0 alongside the template.

Gallery CSS, JavaScript, and fonts are served locally and loaded only by the
photography layout. Other pages retain the existing site theme.
