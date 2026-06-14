// js/generator.js — Generates the complete standalone wedding portal HTML

function getVideoEmbed(url) {
  if (!url) return null;
  let videoId = '';
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const m = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (m) videoId = m[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0` : null;
  }
  if (url.includes('vimeo.com')) {
    const m = url.match(/vimeo\.com\/(\d+)/);
    if (m) return `https://player.vimeo.com/video/${m[1]}`;
  }
  return null;
}

function getMandala(color, opacity = 0.12) {
  return `<svg class="mandala-svg" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="${color}" stroke-width="0.7" opacity="${opacity}">
      <circle cx="250" cy="250" r="240"/><circle cx="250" cy="250" r="195"/><circle cx="250" cy="250" r="150"/><circle cx="250" cy="250" r="105"/><circle cx="250" cy="250" r="60"/><circle cx="250" cy="250" r="25"/>
      <line x1="250" y1="10" x2="250" y2="490"/><line x1="10" y1="250" x2="490" y2="250"/>
      <line x1="80" y1="80" x2="420" y2="420"/><line x1="420" y1="80" x2="80" y2="420"/>
      <line x1="165" y1="10" x2="335" y2="490"/><line x1="10" y1="165" x2="490" y2="335"/>
      <line x1="10" y1="335" x2="490" y2="165"/><line x1="335" y1="10" x2="165" y2="490"/>
      <ellipse cx="250" cy="110" rx="18" ry="32" transform="rotate(0 250 250)"/>
      <ellipse cx="250" cy="110" rx="18" ry="32" transform="rotate(45 250 250)"/>
      <ellipse cx="250" cy="110" rx="18" ry="32" transform="rotate(90 250 250)"/>
      <ellipse cx="250" cy="110" rx="18" ry="32" transform="rotate(135 250 250)"/>
      <ellipse cx="250" cy="110" rx="18" ry="32" transform="rotate(180 250 250)"/>
      <ellipse cx="250" cy="110" rx="18" ry="32" transform="rotate(225 250 250)"/>
      <ellipse cx="250" cy="110" rx="18" ry="32" transform="rotate(270 250 250)"/>
      <ellipse cx="250" cy="110" rx="18" ry="32" transform="rotate(315 250 250)"/>
      <ellipse cx="250" cy="155" rx="11" ry="22" transform="rotate(22 250 250)"/>
      <ellipse cx="250" cy="155" rx="11" ry="22" transform="rotate(67 250 250)"/>
      <ellipse cx="250" cy="155" rx="11" ry="22" transform="rotate(112 250 250)"/>
      <ellipse cx="250" cy="155" rx="11" ry="22" transform="rotate(157 250 250)"/>
      <ellipse cx="250" cy="155" rx="11" ry="22" transform="rotate(202 250 250)"/>
      <ellipse cx="250" cy="155" rx="11" ry="22" transform="rotate(247 250 250)"/>
      <ellipse cx="250" cy="155" rx="11" ry="22" transform="rotate(292 250 250)"/>
      <ellipse cx="250" cy="155" rx="11" ry="22" transform="rotate(337 250 250)"/>
      <circle cx="250" cy="250" r="8" fill="${color}" opacity="0.5"/>
    </g>
  </svg>`;
}

function generatePortalHTML(data) {
  const t = THEMES[data.theme] || THEMES.rajasthani;
  const { bride, groom, date, city, venue, howMet, proposal, loveNote, filmUrl, filmTitle, filmDuration, timeline, blessings, ceremonies, photos } = data;
  const embedUrl = getVideoEmbed(filmUrl);
  const enabledCers = ceremonies.filter(c => c.enabled);
  const isLight = data.theme === 'modern';
  const textOnDark = isLight ? t.nameColor : '#FAF5E9';

  // Build timeline HTML
  const timelineHTML = timeline.length ? timeline.map((item, i) => `
    <div class="tl-item ${i % 2 === 0 ? 'tl-left' : 'tl-right'} reveal">
      <div class="tl-content">
        <p class="tl-year">${item.date}</p>
        <p class="tl-heading">${item.title}</p>
        <p class="tl-desc">${item.desc}</p>
      </div>
      <div class="tl-dot-col"><div class="tl-dot"></div></div>
      <div class="tl-empty"></div>
    </div>`).join('') : `
    <div class="tl-item tl-left reveal">
      <div class="tl-content">
        <p class="tl-year">The Beginning</p>
        <p class="tl-heading">How They Met</p>
        <p class="tl-desc">${howMet || 'A beautiful story waiting to be told.'}</p>
      </div>
      <div class="tl-dot-col"><div class="tl-dot"></div></div>
      <div class="tl-empty"></div>
    </div>
    <div class="tl-item tl-right reveal">
      <div class="tl-content">
        <p class="tl-year">The Proposal</p>
        <p class="tl-heading">She Said Yes</p>
        <p class="tl-desc">${proposal || 'A perfect moment that changed everything.'}</p>
      </div>
      <div class="tl-dot-col"><div class="tl-dot"></div></div>
      <div class="tl-empty"></div>
    </div>
    <div class="tl-item tl-left reveal">
      <div class="tl-content">
        <p class="tl-year">${date}</p>
        <p class="tl-heading">We Became One</p>
        <p class="tl-desc">Under the sacred fire, before family and the gods, two souls became forever one.</p>
      </div>
      <div class="tl-dot-col"><div class="tl-dot"></div></div>
      <div class="tl-empty"></div>
    </div>`;

  // Ceremony cards HTML
  const cerCardsHTML = enabledCers.map((cer, i) => `
    <div class="cer-card reveal">
      <div class="cer-num">${String(i+1).padStart(2,'0')}</div>
      <div class="cer-icon-big">${cer.icon}</div>
      <div class="cer-name">${cer.name}</div>
      <div class="cer-sub">${cer.date || ''}</div>
      <div class="cer-desc">${cer.desc}</div>
    </div>`).join('');

  // Gallery cells
  const galLabels = ['The Portrait','The Ceremony','Together Forever','With Family','Bridal Detail','Dancing & Joy','A Candid Moment','The Reception'];
  const galCells = photos.map((photo, i) => {
    if (photo) return `<div class="gal-cell gc${i+1}" style="background-image:url('${photo}');background-size:cover;background-position:center;"></div>`;
    return `<div class="gal-cell gc${i+1}"><span class="gal-label">${galLabels[i] || ''}</span></div>`;
  }).join('');

  // Film section
  const filmSection = embedUrl ? `
    <div class="film-embed-wrap">
      <iframe src="${embedUrl}" frameborder="0" allow="autoplay;fullscreen" allowfullscreen></iframe>
    </div>` : `
    <div class="film-strip-wrap">
      <div class="film-strip">
        <div class="film-holes left"><span></span><span></span><span></span><span></span><span></span></div>
        <div class="film-frames">
          <div class="film-frame"><span>Haldi Morning</span></div>
          <div class="film-frame"><span>Mehendi Evening</span></div>
          <div class="film-frame"><span>Sangeet Night</span></div>
          <div class="film-frame"><span>The Vivah</span></div>
        </div>
        <div class="film-holes right"><span></span><span></span><span></span><span></span><span></span></div>
      </div>
      <div class="film-play-row">
        <div class="film-play-btn">▶</div>
        <div>
          <div class="film-play-title">${filmTitle}</div>
          <div class="film-play-sub">${filmDuration}${city ? ' · ' + city : ''}</div>
        </div>
      </div>
    </div>`;

  // Blessings HTML
  const blessingsHTML = blessings.length ? blessings.map(b => `
    <div class="blessing-card reveal">
      <div class="blessing-quote">"</div>
      <p class="blessing-text">${b.text}</p>
      <p class="blessing-from">— ${b.from}${b.rel ? ', ' + b.rel : ''}</p>
    </div>`).join('') : `
    <div class="blessing-card reveal">
      <div class="blessing-quote">"</div>
      <p class="blessing-text">May your love grow deeper with every season and your home always be full of laughter and light.</p>
      <p class="blessing-from">— With love, from those who were there</p>
    </div>`;

  // Love note
  const loveNoteHTML = loveNote ? `
    <section class="love-note-section">
      <div class="love-note-inner reveal">
        <div class="section-eyebrow">A Note From Us</div>
        <blockquote class="love-note-text">${loveNote}</blockquote>
        <p class="love-note-sig">— ${bride} &amp; ${groom}</p>
      </div>
    </section>` : '';

  // Blessings form
  const blessingsFormHTML = `
    <div class="blessing-form reveal">
      <h3 class="bf-title">Leave Your Blessing</h3>
      <p class="bf-sub">Share your wishes with ${bride} &amp; ${groom}</p>
      <input class="bf-input" type="text" placeholder="Your name" id="bfName"/>
      <textarea class="bf-input bf-textarea" placeholder="Your blessing or message..." id="bfMsg"></textarea>
      <button class="bf-btn" onclick="submitBlessing()">Send Blessing</button>
      <div id="bfThanks" style="display:none;margin-top:1rem;font-size:0.88rem;color:var(--accent);">Thank you for your blessing! 🙏</div>
    </div>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${bride} &amp; ${groom} — Wedding Portal</title>
<meta name="description" content="The wedding of ${bride} and ${groom} — ${date}${city ? ', ' + city : ''}"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Lato:wght@300;400&display=swap" rel="stylesheet"/>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: ${t.bodyBg};
    --bg-alt: ${t.sectionAltBg};
    --bg-hero: ${t.heroBg};
    --bg-footer: ${t.footerBg};
    --accent: ${t.accentPrimary};
    --accent2: ${t.accentSecondary};
    --text: ${t.nameColor};
    --body-text: ${t.bodyText};
    --muted: ${t.mutedText};
    --border: ${t.borderColor};
    --cer-bg: ${t.cerBg};
    --gal-bg: ${t.galBg};
    --card-bg: ${t.cardBg};
  }
  html { scroll-behavior: smooth; }
  body { font-family: 'Lato', sans-serif; font-weight: 300; background: var(--bg); color: var(--text); overflow-x: hidden; }

  /* NAV */
  .portal-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1rem 3rem;
    background: rgba(${isLight?'245,240,234':'13,6,8'},0.93);
    border-bottom: 0.5px solid var(--border);
    backdrop-filter: blur(12px);
  }
  .nav-couple {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem; color: var(--accent); letter-spacing: 0.06em;
  }
  .nav-links { display: flex; gap: 2.5rem; }
  .nav-links a {
    font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--body-text); text-decoration: none; transition: color 0.3s;
  }
  .nav-links a:hover { color: var(--accent); }

  /* HERO */
  .hero {
    min-height: 100vh; position: relative;
    display: flex; align-items: center; justify-content: center;
    background: var(--bg-hero); overflow: hidden; padding: 6rem 2rem 3rem;
  }
  .hero-gradient {
    position: absolute; inset: 0;
    background: ${t.heroGradient};
    pointer-events: none;
  }
  .mandala-svg {
    position: absolute; width: min(560px,88vw); height: min(560px,88vw);
    animation: rotateMandala 80s linear infinite;
    pointer-events: none;
  }
  @keyframes rotateMandala { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

  .hero-content { position: relative; z-index: 2; text-align: center; max-width: 700px; }
  .hero-eyebrow {
    font-size: 0.65rem; letter-spacing: 0.35em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 1.8rem;
    display: flex; align-items: center; justify-content: center; gap: 1rem;
  }
  .hero-eyebrow::before, .hero-eyebrow::after {
    content: ''; display: block; width: 40px; height: 0.5px; background: var(--accent); opacity: 0.5;
  }
  .hero-names {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3.5rem, 8vw, 6.5rem);
    font-weight: 300; line-height: 1.05; color: var(--text);
  }
  .hero-names em { color: var(--accent); font-style: italic; }
  .hero-amp {
    display: block; font-size: clamp(2rem, 5vw, 4rem);
    color: var(--accent); font-style: italic; margin: -0.2rem 0;
  }
  .hero-date {
    margin-top: 2rem; font-size: 0.72rem; letter-spacing: 0.28em;
    text-transform: uppercase; color: var(--muted);
  }
  .hero-venue {
    margin-top: 0.5rem; font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem; font-style: italic; color: var(--body-text); opacity: 0.7;
  }
  .hero-scroll {
    position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
  }
  .scroll-line {
    width: 1px; height: 50px;
    background: linear-gradient(to bottom, var(--accent), transparent);
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse { 0%,100%{opacity:0.3;transform:scaleY(0.8)} 50%{opacity:1;transform:scaleY(1)} }
  .scroll-text { font-size: 0.58rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--muted); }

  /* PETALS */
  .petal { position: absolute; border-radius: 50%; background: var(--accent); opacity: 0; animation: floatUp 10s ease-in infinite; }
  @keyframes floatUp { 0%{transform:translateY(100vh) scale(1);opacity:0} 15%{opacity:0.45} 85%{opacity:0.1} 100%{transform:translateY(-5vh) scale(0.3);opacity:0} }

  /* DIVIDER */
  .golden-divider {
    display: flex; align-items: center; gap: 1.2rem;
    padding: 0.5rem 3rem; max-width: 700px; margin: 0 auto;
  }
  .gd-line { flex: 1; height: 0.5px; background: var(--accent); opacity: 0.25; }
  .gd-star { font-size: 0.85rem; color: var(--accent); opacity: 0.7; }

  /* STORY */
  .story-section { background: var(--bg-alt); padding: 5rem 2rem; }
  .story-inner { max-width: 1100px; margin: 0 auto; }

  .section-eyebrow {
    font-size: 0.62rem; letter-spacing: 0.32em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 0.8rem;
  }
  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.2rem, 4vw, 3.2rem); font-weight: 300; line-height: 1.15;
    color: var(--text); margin-bottom: 1rem;
  }
  .section-title em { color: var(--accent); font-style: italic; }
  .section-body { font-size: 0.92rem; line-height: 1.85; color: var(--body-text); max-width: 540px; }

  /* TIMELINE */
  .timeline { position: relative; margin-top: 3.5rem; }
  .timeline::before {
    content: ''; position: absolute; left: 50%; top: 0; bottom: 0;
    width: 0.5px; background: var(--border); transform: translateX(-50%);
  }
  .tl-item { display: grid; grid-template-columns: 1fr 60px 1fr; margin-bottom: 3.5rem; align-items: start; }
  .tl-left .tl-content  { grid-column: 1; text-align: right; padding-right: 2.5rem; }
  .tl-left .tl-empty    { grid-column: 3; }
  .tl-right .tl-content { grid-column: 3; text-align: left; padding-left: 2.5rem; }
  .tl-right .tl-empty   { grid-column: 1; }
  .tl-dot-col { grid-column: 2; display: flex; justify-content: center; padding-top: 0.3rem; }
  .tl-dot {
    width: 12px; height: 12px; border-radius: 50%;
    background: var(--accent); border: 2.5px solid var(--bg-alt);
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 20%, transparent);
  }
  .tl-year { font-size: 0.62rem; letter-spacing: 0.22em; color: var(--accent); text-transform: uppercase; margin-bottom: 0.4rem; }
  .tl-heading { font-family: 'Cormorant Garamond', serif; font-size: 1.35rem; color: var(--text); margin-bottom: 0.5rem; }
  .tl-desc { font-size: 0.88rem; line-height: 1.75; color: var(--body-text); }

  /* CEREMONIES */
  .cer-section { background: var(--bg); padding: 5rem 2rem; }
  .cer-inner { max-width: 1100px; margin: 0 auto; }
  .cer-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1px; background: var(--border); margin-top: 3rem; border: 0.5px solid var(--border); }
  .cer-card {
    background: var(--bg); padding: 2.5rem 2rem; position: relative;
    overflow: hidden; transition: background 0.3s;
  }
  .cer-card:hover { background: var(--cer-bg); }
  .cer-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(to right, transparent, var(--accent), transparent);
    opacity: 0; transition: opacity 0.3s;
  }
  .cer-card:hover::before { opacity: 1; }
  .cer-num { font-family: 'Cormorant Garamond', serif; font-size: 3rem; font-weight: 300; color: var(--border); position: absolute; top: 1rem; right: 1.5rem; line-height: 1; }
  .cer-icon-big { font-size: 1.7rem; margin-bottom: 1.2rem; }
  .cer-name { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 400; color: var(--text); margin-bottom: 0.3rem; }
  .cer-sub { font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin-bottom: 1rem; }
  .cer-desc { font-size: 0.87rem; line-height: 1.7; color: var(--body-text); }

  /* LOVE NOTE */
  .love-note-section { background: var(--bg-alt); padding: 5rem 2rem; text-align: center; }
  .love-note-inner { max-width: 640px; margin: 0 auto; }
  .love-note-text {
    font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-style: italic;
    font-weight: 300; line-height: 1.7; color: var(--text); margin: 1.5rem 0 1rem;
  }
  .love-note-sig { font-size: 0.8rem; letter-spacing: 0.15em; color: var(--accent); }

  /* GALLERY */
  .gallery-section { background: var(--bg); padding: 5rem 2rem; }
  .gallery-inner { max-width: 1100px; margin: 0 auto; }
  .gallery-grid {
    display: grid; gap: 4px; margin-top: 3rem;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(3, 160px);
  }
  .gal-cell {
    background: var(--gal-bg); border: 0.5px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    transition: border-color 0.3s;
  }
  .gal-cell:hover { border-color: var(--accent); }
  .gal-label { font-family: 'Cormorant Garamond', serif; font-size: 0.88rem; color: var(--accent); opacity: 0.35; font-style: italic; text-align: center; padding: 0.5rem; }
  .gc1 { grid-column: 1/5; grid-row: 1/3; }
  .gc2 { grid-column: 5/9; grid-row: 1/2; }
  .gc3 { grid-column: 9/13; grid-row: 1/3; }
  .gc4 { grid-column: 5/7; grid-row: 2/3; }
  .gc5 { grid-column: 7/9; grid-row: 2/3; }
  .gc6 { grid-column: 1/4; grid-row: 3/4; }
  .gc7 { grid-column: 4/9; grid-row: 3/4; }
  .gc8 { grid-column: 9/13; grid-row: 3/4; }

  /* FILM */
  .film-section { background: var(--bg-alt); padding: 5rem 2rem; text-align: center; }
  .film-inner { max-width: 900px; margin: 0 auto; }
  .film-embed-wrap { margin-top: 3rem; position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border: 0.5px solid var(--border); }
  .film-embed-wrap iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
  .film-strip-wrap { margin-top: 3rem; }
  .film-strip {
    background: rgba(0,0,0,0.4); border: 0.5px solid var(--border);
    padding: 1.5rem 2.5rem; display: flex; align-items: stretch; gap: 0; position: relative;
  }
  .film-holes { display: flex; flex-direction: column; justify-content: space-around; padding: 0 0.5rem; }
  .film-holes span { width: 14px; height: 10px; border: 1.5px solid var(--border); border-radius: 2px; display: block; }
  .film-frames { display: flex; gap: 4px; flex: 1; }
  .film-frame {
    flex: 1; aspect-ratio: 3/4; background: var(--card-bg);
    border: 0.5px solid var(--border); display: flex; align-items: center; justify-content: center;
  }
  .film-frame span { font-family: 'Cormorant Garamond', serif; font-size: 0.78rem; color: var(--accent); opacity: 0.4; font-style: italic; text-align: center; padding: 0.5rem; }
  .film-play-row { margin-top: 2rem; display: flex; align-items: center; justify-content: center; gap: 1.5rem; }
  .film-play-btn {
    width: 64px; height: 64px; border-radius: 50%;
    border: 0.5px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem; color: var(--accent); cursor: pointer;
    transition: background 0.3s;
  }
  .film-play-btn:hover { background: var(--cer-bg); }
  .film-play-title { font-family: 'Cormorant Garamond', serif; font-size: 1.15rem; color: var(--text); text-align: left; }
  .film-play-sub { font-size: 0.68rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted); margin-top: 0.3rem; }

  /* BLESSINGS */
  .blessings-section { background: var(--bg); padding: 5rem 2rem; }
  .blessings-inner { max-width: 1100px; margin: 0 auto; }
  .blessings-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(270px, 1fr)); gap: 1.5rem; margin-top: 3rem; }
  .blessing-card { background: var(--card-bg); border: 0.5px solid var(--border); padding: 2rem; position: relative; }
  .blessing-quote { font-family: 'Cormorant Garamond', serif; font-size: 5rem; color: var(--border); position: absolute; top: -0.5rem; left: 1.2rem; line-height: 1; }
  .blessing-text { font-family: 'Cormorant Garamond', serif; font-size: 1.05rem; font-style: italic; line-height: 1.7; color: var(--body-text); margin-bottom: 1.2rem; }
  .blessing-from { font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); }
  .blessing-form { max-width: 540px; margin: 3rem auto 0; padding: 2rem; border: 0.5px solid var(--border); background: var(--card-bg); }
  .bf-title { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; color: var(--text); margin-bottom: 0.4rem; }
  .bf-sub { font-size: 0.82rem; color: var(--body-text); margin-bottom: 1.5rem; }
  .bf-input {
    width: 100%; padding: 0.65rem 0.9rem; margin-bottom: 0.8rem;
    background: rgba(255,255,255,0.04); border: 0.5px solid var(--border);
    color: var(--text); font-family: 'Lato', sans-serif; font-size: 0.9rem; outline: none;
    transition: border-color 0.2s;
  }
  .bf-input:focus { border-color: var(--accent); }
  .bf-textarea { resize: vertical; min-height: 90px; display: block; line-height: 1.6; }
  .bf-btn {
    padding: 0.8rem 2rem; background: var(--accent);
    color: ${isLight ? '#fff' : '#1a0810'};
    border: none; font-family: 'Lato', sans-serif; font-size: 0.85rem; font-weight: 700;
    cursor: pointer; transition: opacity 0.2s; width: 100%;
  }
  .bf-btn:hover { opacity: 0.88; }

  /* FOOTER */
  .portal-footer { background: var(--bg-footer); border-top: 0.5px solid var(--border); padding: 3.5rem 2rem; text-align: center; }
  .footer-names { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; font-weight: 300; font-style: italic; color: var(--accent); }
  .footer-date { font-size: 0.68rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--muted); margin-top: 0.7rem; }
  .footer-divider { display: flex; align-items: center; gap: 1rem; justify-content: center; margin: 1.5rem auto; max-width: 200px; }
  .footer-divider span { flex: 1; height: 0.5px; background: var(--border); }
  .footer-credit { font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(250,245,233,0.15); }

  /* REVEAL ANIMATION */
  .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease, transform 0.8s ease; }
  .reveal.visible { opacity: 1; transform: none; }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .portal-nav { padding: 0.9rem 1.5rem; }
    .nav-links { display: none; }
    .hero-names { font-size: 3rem; }
    .timeline::before { left: 20px; }
    .tl-item { grid-template-columns: 40px 1fr; }
    .tl-left .tl-content, .tl-right .tl-content { grid-column: 2; text-align: left; padding: 0 0 0 1.5rem; }
    .tl-left .tl-empty, .tl-right .tl-empty { display: none; }
    .tl-dot-col { grid-column: 1; }
    .gallery-grid { grid-template-columns: 1fr 1fr; grid-template-rows: auto; }
    .gal-cell { min-height: 120px; }
    .gc1,.gc2,.gc3,.gc4,.gc5,.gc6,.gc7,.gc8 { grid-column: auto; grid-row: auto; }
    .golden-divider { padding: 0.5rem 1.5rem; }
  }
</style>
</head>
<body>

<nav class="portal-nav">
  <div class="nav-couple">${bride} &amp; ${groom}</div>
  <nav class="nav-links">
    <a href="#story">Story</a>
    <a href="#ceremonies">Ceremonies</a>
    <a href="#gallery">Gallery</a>
    <a href="#film">Film</a>
    <a href="#blessings">Blessings</a>
  </nav>
</nav>

<!-- HERO -->
<section class="hero" id="top">
  <div class="hero-gradient"></div>
  ${getMandala(t.accentPrimary, isLight ? 0.08 : 0.13)}
  <div class="petal" style="left:10%;animation-delay:0s;width:7px;height:7px;"></div>
  <div class="petal" style="left:25%;animation-delay:2.5s;width:5px;height:5px;"></div>
  <div class="petal" style="left:55%;animation-delay:4s;width:8px;height:8px;"></div>
  <div class="petal" style="left:72%;animation-delay:1.5s;width:5px;height:5px;"></div>
  <div class="petal" style="left:88%;animation-delay:3.2s;width:6px;height:6px;"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">The Wedding of</div>
    <div class="hero-names">
      <em>${bride}</em>
      <span class="hero-amp">&amp;</span>
      <em>${groom}</em>
    </div>
    <div class="hero-date">${date}${city ? ' &nbsp;·&nbsp; ' + city : ''}</div>
    ${venue ? `<div class="hero-venue">${venue}</div>` : ''}
  </div>
  <div class="hero-scroll">
    <div class="scroll-line"></div>
    <span class="scroll-text">Scroll</span>
  </div>
</section>

<div class="golden-divider"><div class="gd-line"></div><div class="gd-star">${t.decorChar}</div><div class="gd-line"></div></div>

<!-- STORY -->
<section class="story-section" id="story">
  <div class="story-inner">
    <p class="section-eyebrow reveal">Our Journey</p>
    <h2 class="section-title reveal">A love written<br/><em>across lifetimes</em></h2>
    ${howMet ? `<p class="section-body reveal">${howMet}</p>` : ''}
    <div class="timeline">${timelineHTML}</div>
  </div>
</section>

<div class="golden-divider"><div class="gd-line"></div><div class="gd-star">${t.decorChar}</div><div class="gd-line"></div></div>

<!-- CEREMONIES -->
<section class="cer-section" id="ceremonies">
  <div class="cer-inner">
    <p class="section-eyebrow reveal">The Celebrations</p>
    <h2 class="section-title reveal">Every sacred <em>ceremony</em></h2>
    <p class="section-body reveal">Each day a new chapter. Each ritual a promise.</p>
    <div class="cer-grid">${cerCardsHTML}</div>
  </div>
</section>

${loveNoteHTML}

<!-- GALLERY -->
<section class="gallery-section" id="gallery">
  <div class="gallery-inner">
    <p class="section-eyebrow reveal">The Moments</p>
    <h2 class="section-title reveal">Frames of a <em>lifetime</em></h2>
    <div class="gallery-grid">${galCells}</div>
  </div>
</section>

<div class="golden-divider"><div class="gd-line"></div><div class="gd-star">${t.decorChar}</div><div class="gd-line"></div></div>

<!-- FILM -->
<section class="film-section" id="film">
  <div class="film-inner">
    <p class="section-eyebrow reveal">The Cinematic Story</p>
    <h2 class="section-title reveal">Their wedding,<br/><em>a short film</em></h2>
    <p class="section-body reveal" style="margin:0 auto 0;text-align:center;max-width:480px;">Every stolen glance, every tear, every laugh — preserved the way it felt.</p>
    ${filmSection}
  </div>
</section>

<!-- BLESSINGS -->
<section class="blessings-section" id="blessings">
  <div class="blessings-inner">
    <p class="section-eyebrow reveal">Wishes &amp; Blessings</p>
    <h2 class="section-title reveal">Words from those<br/>who <em>love them</em></h2>
    <div class="blessings-grid">${blessingsHTML}</div>
    ${blessingsFormHTML}
  </div>
</section>

<!-- FOOTER -->
<footer class="portal-footer">
  <div class="footer-names">${bride} &amp; ${groom}</div>
  <div class="footer-date">Married · ${date}${city ? ' · ' + city : ''}</div>
  <div class="footer-divider"><span></span><span style="width:8px;height:8px;border-radius:50%;background:var(--accent);opacity:0.4;flex:none;"></span><span></span></div>
  <div class="footer-credit">Created with WeddingCanvas</div>
</footer>

<script>
// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
reveals.forEach(el => obs.observe(el));

// Blessing form
function submitBlessing() {
  const name = document.getElementById('bfName')?.value?.trim();
  const msg  = document.getElementById('bfMsg')?.value?.trim();
  if (!name || !msg) { alert('Please fill in your name and message.'); return; }
  // In production: POST to backend. For now, show thank you.
  document.getElementById('bfThanks').style.display = 'block';
  document.getElementById('bfName').value = '';
  document.getElementById('bfMsg').value = '';
}
</script>
</body>
</html>`;
}
