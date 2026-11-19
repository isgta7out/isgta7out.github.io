# Is GTA 7 Out?

Static site for **[isgta7out.github.io](https://isgta7out.github.io/)** — a one-word answer, a live clock since *Grand Theft Auto VI* (19 November 2026), and a long-haul GTA 7 wiki.

No build step. No npm. Open `index.html` or push this folder to the `isgta7out.github.io` GitHub Pages repo.

## Local preview

Any static server from this directory:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080/`.

## Deploy to GitHub Pages

1. Create (or use) the repository `isgta7out/isgta7out.github.io`.
2. Push these files to the default branch (`main`).
3. GitHub Pages → Source: **Deploy from a branch** → `main` / `/ (root)`.
4. The site is served at `https://isgta7out.github.io/`.

Relative paths only. Do not prefix assets with a repo subpath.

---

## How to add or update wiki articles

All wiki copy lives in **`index.html`** inside `#wiki .wiki-list`. JavaScript only filters and searches; crawlers still see the HTML.

### Add an article

Duplicate an existing `<article class="wiki-article">` block and fill it in:

```html
<article
  class="wiki-article"
  id="wiki-short-slug"
  data-tags="status"
  data-title="Plain-language title for search">
  <figure class="wiki-figure">
    <img
      src="assets/your-image.jpg"
      alt="Descriptive alt text"
      width="1200"
      height="675"
      loading="lazy"
      decoding="async">
  </figure>
  <div class="wiki-body">
    <div class="meta-row">
      <span class="chip">Status</span>
      <time class="cite" datetime="2026-12-01">Updated 1 Dec 2026</time>
    </div>
    <h3>Headline</h3>
    <p>Body copy in English (primary language for search traffic).</p>
  </div>
</article>
```

Rules:

- **`id`** — unique, used as `#wiki-short-slug` deep link.
- **`data-tags`** — space-separated. Must match a `data-tag` on a filter button (`status`, `rumor`, `patents`, `locations`, `meme`). Multiple tags are allowed (`data-tags="rumor patents"`).
- **`data-title`** — included in instant search together with the article text.
- Put new images in `assets/` (WebP or compressed JPEG). Record the license in `assets/CREDITS.txt`. Always set `alt` and `loading="lazy"`.
- Keep facts labeled. Rumors and patents stay in `[RUMOR / PATENTS]`. Jokes stay in `[MEME ARCHIVE]`.

### New filter tag

1. Add a button in `.tags`:

   ```html
   <button class="tag-btn" type="button" data-tag="jobs" aria-pressed="false">Jobs</button>
   ```

2. Use that same token in `data-tags` on articles.

No changes are required in `app.js`.

### Meme timeline

Add a row to the `<ol class="timeline">` in `#wiki-memes`:

```html
<li>
  <time datetime="2027-01-01">2027-01-01</time>
  <span>We got another year before GTA 7</span>
</li>
```

### After content edits

- Bump `<time datetime>` / “Updated …” on the article.
- Set `<lastmod>` in `sitemap.xml` to the edit date (`YYYY-MM-DD`).
- If the article answers a new common question, add a `Question` node to the `FAQPage` JSON-LD in `<head>`.

Sarcastic “Check Again” lines live in the `LINES` array at the top of **`app.js`**. The countdown epoch is `GTA6_LAUNCH` (`2026-11-19T00:00:00Z`) — do not change it unless the official VI date is restated.

---

## Cómo actualizar la wiki (ES)

Los artículos están en `index.html` (`.wiki-list`). Copia un `<article class="wiki-article">`, cambia `id`, `data-tags`, `data-title`, imagen (`alt` + `loading="lazy"`) y el texto. Si usas una etiqueta nueva, añade un botón `.tag-btn` con el mismo `data-tag`. Actualiza la fecha del artículo y `sitemap.xml`. Créditos de fotos en `assets/CREDITS.txt`. Las frases irónicas del botón *Check Again* están en `app.js` (`LINES`).

---

## File map

| File | Role |
| --- | --- |
| `index.html` | Page, SEO, JSON-LD, wiki articles |
| `styles.css` | Layout |
| `app.js` | Clock, Check Again, wiki filter/search, meme copy/share |
| `sitemap.xml` / `robots.txt` | Crawlers |
| `assets/` | Images, favicon, Open Graph |
| `404.html` | GitHub Pages unknown-path fallback |

Unofficial. Not affiliated with Rockstar Games or Take-Two Interactive.
