# Komplit Bite Bakery — Website

Plain HTML/CSS/JS, no build step. Open `index.html` directly in a browser to
preview, or host the whole folder as-is on any static host (Netlify, Vercel,
GitHub Pages, or regular shared hosting).

## What's already filled in
- Colors and fonts pulled from the actual branding (logo, packaging, posters).
- Real address, phone numbers, and WhatsApp links from the flyer.
- Product photos cropped from the flyers you sent (bread, coconut bread label,
  chin-chin) — see "Images" below for filenames.
- Site copy (hero, about, values) written to match the brand's voice
  ("fresh, delicious & nutricious", "rich taste, low price, heavy weight").

## What still needs your input
- **Reviews** — the three testimonials in the Reviews carousel are placeholder
  text, not real customer quotes. Swap them in `index.html` under
  `<div class="carousel-track">`.
- **About section photo/story** — currently uses the logo only; if your
  parents have a photo of the bakery or the team, swap it into
  `assets/images/` and update the `<img>` in the About section.
- **Contact form email** — currently sends to `hello@komplitbite.example`
  (a placeholder) via `mailto:`. Update the address in `js/main.js`
  (`contactForm.addEventListener`) once you know which inbox should receive
  enquiries, or wire it to a form service (e.g. Formspree) instead.
- **Instagram / social links** — the footer has a placeholder Instagram link
  (`href="#"`). Add the real URL once you have it.
- **Pricing** — I didn't put the price list from the flyer on the site. That
  sheet has distributor/table-top/consumer/commission columns, which reads as
  a wholesale price sheet rather than retail pricing — worth checking with
  your parents on what (if anything) they want customers to see before
  publishing prices.

## 360° product spin
The featured product card (Komplit Bite Bread) uses a drag-to-rotate
component in `js/main.js` (`data-spinner`). Right now it only has one clean
product photo, so dragging gives a subtle tilt as a placeholder.

To get a real 360° spin:
1. Take 12–24 photos of the wrapped bread rotating in fixed increments on a
   turntable (or by hand on a marked spot), same lighting/background each
   shot.
2. Save them in order, e.g. `assets/images/spin/bread-01.jpg` ... `bread-24.jpg`.
3. Update the `data-frames` attribute on the spinner `<div>` in `index.html`
   to the full ordered list, e.g.:
   ```html
   data-frames='["assets/images/spin/bread-01.jpg", "assets/images/spin/bread-02.jpg", ...]'
   ```
   No other code changes needed — the spinner automatically switches from
   "tilt" mode to true frame-cycling once more than one frame is provided.

## Images
All from the branding materials you shared, cropped down to product-only
where the original was a flyer with baked-in text:
- `logo.jpg` — Complete Baked Confectioneries logo (used in navbar/footer)
- `product-bread.jpg` — cropped from the "This isn't just bread" flyer
- `product-chinchin.jpg` — cropped from the chin-chin flyer
- `product-coconut-bread-label.jpg` — the coconut bread label graphic (used as-is)

## Structure
```
index.html
css/styles.css
js/main.js
assets/images/
```
"# Komplit-Bite" 
