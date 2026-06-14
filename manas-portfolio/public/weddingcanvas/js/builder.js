// js/builder.js — WeddingCanvas Builder Logic

let currentStep = 1;
let selectedTheme = 'rajasthani';
let ceremonies = JSON.parse(JSON.stringify(CEREMONIES_DEFAULT));
let activeCerIdx = null;
let uploadSlotIdx = null;
let photos = new Array(8).fill(null); // base64 strings
let blessingCount = 2;

/* ─── LANDING PAGE ─── */
function startBuilder() {
  document.getElementById('landingPage').style.display = 'none';
  document.getElementById('builderApp').style.display = 'block';
  initCeremoniesBuilder();
  goStep(1);
  window.scrollTo(0, 0);
}

function startBuilderWithTheme(theme) {
  selectedTheme = theme;
  startBuilder();
  // mark correct card selected
  document.querySelectorAll('.theme-pick-card').forEach(c => {
    c.classList.toggle('selected', c.dataset.theme === theme);
  });
  goStep(1);
}

function previewDemo() {
  // Pre-fill demo data and jump to preview
  selectedTheme = 'rajasthani';
  startBuilder();
  document.getElementById('brideName').value = 'Arya Sharma';
  document.getElementById('groomName').value = 'Dev Malhotra';
  document.getElementById('weddingDate').value = '21 February 2025';
  document.getElementById('venueCity').value = 'Jaipur, Rajasthan';
  document.getElementById('venueName').value = 'Rambagh Palace';
  document.getElementById('howMet').value = 'A rainy afternoon, a shared umbrella at Bandra station — two souls who had never quite fit anywhere suddenly fit perfectly together.';
  document.getElementById('proposal').value = 'At the stepwells of Rani ki Vav, with marigold petals trailing into the water below, he went down on one knee. She said yes before he finished the question.';
  document.getElementById('filmTitle').value = 'Arya & Dev — A Wedding Film';
  document.getElementById('filmDuration').value = '5 mins 30 secs';
  // Fill timeline
  const dates = ['June 2020','Diwali 2021','March 2023','February 2025'];
  const titles = ['The First Meeting','He Said She Was His Home','The Proposal','We Became One'];
  const descs = [
    'A rainy afternoon, a shared umbrella at Bandra station, and two souls who found forever in each other\'s eyes.',
    'On a rooftop in Colaba, Dev told Arya he\'d never seen light the way he saw it in her eyes.',
    'At the stepwells of Rani ki Vav, with marigold petals trailing into the water below.',
    'Under the stars of Jaipur, before family, fire, and the gods — Arya and Dev took their seven pheras.'
  ];
  document.querySelectorAll('.timeline-item-form').forEach((el, i) => {
    el.querySelector('.tif-date').value = dates[i] || '';
    el.querySelector('.tif-title').value = titles[i] || '';
    el.querySelector('.tif-desc').value = descs[i] || '';
  });
  ceremonies[0].date = '18 Feb 2025';
  ceremonies[1].date = '19 Feb 2025';
  ceremonies[2].date = '20 Feb 2025';
  ceremonies[3].date = '21 Feb 2025';
  ceremonies[4].enabled = true; ceremonies[4].date = '22 Feb 2025';
  ceremonies[5].enabled = true; ceremonies[5].date = '22 Feb 2025';
  document.querySelector('.bl-from').value = "Dev's parents";
  document.querySelector('.bl-rel').value = 'Parents';
  document.querySelector('.bl-text').value = 'Dev, you waited for the right person. Arya, you are everything we hoped for him. Welcome home, beta.';
  renderCeremoniesList();
  goStep(5);
  syncPreview();
}

function goHome() {
  document.getElementById('landingPage').style.display = 'block';
  document.getElementById('builderApp').style.display = 'none';
  window.scrollTo(0, 0);
}

/* ─── STEP NAVIGATION ─── */
function goStep(n) {
  // Hide all steps
  for (let i = 1; i <= 5; i++) {
    const el = document.getElementById('step' + i);
    if (el) el.style.display = 'none';
    const st = document.getElementById('bstep' + i);
    if (st) {
      st.classList.remove('active', 'done');
      if (i < n) st.classList.add('done');
      else if (i === n) st.classList.add('active');
    }
  }
  const target = document.getElementById('step' + n);
  if (target) target.style.display = 'block';
  currentStep = n;
  if (n === 5) buildPortalPreview();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ─── THEME PICKER ─── */
function pickTheme(card) {
  document.querySelectorAll('.theme-pick-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  selectedTheme = card.dataset.theme;
}

/* ─── SYNC PREVIEW URL ─── */
function syncPreview() {
  const bride = (document.getElementById('brideName')?.value || 'bride').toLowerCase().replace(/\s+/g, '');
  const groom = (document.getElementById('groomName')?.value || 'groom').toLowerCase().replace(/\s+/g, '');
  const url = bride + '-' + groom + '.weddingcanvas.in';
  const el1 = document.getElementById('pudUrl');
  const el2 = document.getElementById('fpfUrl');
  if (el1) el1.textContent = url;
  if (el2) el2.textContent = url;
}

/* ─── CEREMONIES BUILDER ─── */
function initCeremoniesBuilder() {
  renderCeremoniesList();
}

function renderCeremoniesList() {
  const list = document.getElementById('cerList');
  if (!list) return;
  list.innerHTML = '';
  ceremonies.forEach((cer, idx) => {
    const div = document.createElement('div');
    div.className = 'cer-list-item' + (cer.enabled ? ' enabled' : '') + (activeCerIdx === idx ? ' active' : '');
    div.innerHTML = `
      <div class="cli-left" onclick="selectCer(${idx})">
        <span class="cli-icon">${cer.icon}</span>
        <div>
          <div class="cli-name">${cer.name}</div>
          <div class="cli-date">${cer.date || 'No date set'}</div>
        </div>
      </div>
      <div class="cli-right">
        <div class="cer-toggle-sw" onclick="toggleCer(${idx}, event)">
          <div class="cer-toggle-knob"></div>
        </div>
      </div>`;
    list.appendChild(div);
  });
}

function toggleCer(idx, e) {
  e.stopPropagation();
  ceremonies[idx].enabled = !ceremonies[idx].enabled;
  renderCeremoniesList();
}

function selectCer(idx) {
  activeCerIdx = idx;
  renderCeremoniesList();
  renderCerEditor(idx);
}

function renderCerEditor(idx) {
  const cer = ceremonies[idx];
  const editor = document.getElementById('cerEditor');
  editor.innerHTML = `
    <div class="cer-editor-title">
      <span class="cer-editor-icon-big">${cer.icon}</span> ${cer.name}
    </div>
    <p style="font-size:0.8rem;color:rgba(250,245,233,0.4);margin-bottom:1.5rem;">Customize this ceremony's details.</p>
    <div class="field-group">
      <label>Date</label>
      <input type="text" id="cerDate_${idx}" value="${cer.date}" placeholder="e.g. 19 Feb 2025" oninput="updateCer(${idx})"/>
    </div>
    <div class="field-group">
      <label>Description</label>
      <textarea id="cerDesc_${idx}" oninput="updateCer(${idx})" style="min-height:120px;">${cer.desc}</textarea>
    </div>
    <div class="field-group">
      <label>Special Note (optional)</label>
      <input type="text" id="cerNote_${idx}" placeholder="e.g. Traditional Punjabi Haldi ceremony" oninput="updateCer(${idx})"/>
    </div>
  `;
}

function updateCer(idx) {
  const dateEl = document.getElementById('cerDate_' + idx);
  const descEl = document.getElementById('cerDesc_' + idx);
  if (dateEl) ceremonies[idx].date = dateEl.value;
  if (descEl) ceremonies[idx].desc = descEl.value;
  renderCeremoniesList();
}

/* ─── PHOTO UPLOAD ─── */
function triggerUpload(idx) {
  uploadSlotIdx = idx;
  document.getElementById('photoInput').click();
}

function handlePhotoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    photos[uploadSlotIdx] = e.target.result;
    const slot = document.querySelectorAll('.photo-slot')[uploadSlotIdx];
    if (slot) {
      slot.innerHTML = `<img src="${e.target.result}" alt="Wedding photo"/>`;
    }
  };
  reader.readAsDataURL(file);
  event.target.value = '';
}

/* ─── BLESSINGS ─── */
function addBlessing() {
  const list = document.getElementById('blessingsList');
  const div = document.createElement('div');
  div.className = 'blessing-form-item';
  div.setAttribute('data-idx', blessingCount);
  div.innerHTML = `
    <div class="field-row two-col">
      <div class="field-group"><label>From</label><input type="text" class="bl-from" placeholder="e.g. Dadi"/></div>
      <div class="field-group"><label>Relationship</label><input type="text" class="bl-rel" placeholder="e.g. Grandmother"/></div>
    </div>
    <div class="field-group"><label>Blessing / Message</label><textarea class="bl-text" placeholder="Their heartfelt message..."></textarea></div>
  `;
  list.appendChild(div);
  blessingCount++;
}

/* ─── COLLECT ALL DATA ─── */
function collectData() {
  const bride = document.getElementById('brideName')?.value || 'Bride';
  const groom = document.getElementById('groomName')?.value || 'Groom';
  const date  = document.getElementById('weddingDate')?.value || '';
  const city  = document.getElementById('venueCity')?.value || '';
  const venue = document.getElementById('venueName')?.value || '';
  const howMet = document.getElementById('howMet')?.value || '';
  const proposal = document.getElementById('proposal')?.value || '';
  const loveNote = document.getElementById('loveNote')?.value || '';
  const filmUrl  = document.getElementById('filmUrl')?.value || '';
  const filmTitle = document.getElementById('filmTitle')?.value || (bride + ' & ' + groom + ' — A Wedding Film');
  const filmDuration = document.getElementById('filmDuration')?.value || '';

  // Timeline
  const timeline = [];
  document.querySelectorAll('.timeline-item-form').forEach(el => {
    const d = el.querySelector('.tif-date')?.value || '';
    const t = el.querySelector('.tif-title')?.value || '';
    const desc = el.querySelector('.tif-desc')?.value || '';
    if (t) timeline.push({ date: d, title: t, desc });
  });

  // Blessings
  const blessings = [];
  document.querySelectorAll('.blessing-form-item').forEach(el => {
    const from = el.querySelector('.bl-from')?.value || '';
    const rel  = el.querySelector('.bl-rel')?.value || '';
    const text = el.querySelector('.bl-text')?.value || '';
    if (from && text) blessings.push({ from, rel, text });
  });

  return { bride, groom, date, city, venue, howMet, proposal, loveNote, filmUrl, filmTitle, filmDuration, timeline, blessings, theme: selectedTheme, ceremonies, photos };
}

/* ─── BUILD PREVIEW IN IFRAME ─── */
function buildPortalPreview() {
  syncPreview();
  const data = collectData();
  const html = generatePortalHTML(data);
  const iframe = document.getElementById('portalIframe');
  if (iframe) {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    iframe.src = url;
  }
}

/* ─── DOWNLOAD ─── */
function generateAndDownload() {
  const data = collectData();
  const html = generatePortalHTML(data);
  const bride = data.bride.toLowerCase().replace(/\s+/g, '-');
  const groom = data.groom.toLowerCase().replace(/\s+/g, '-');
  const filename = bride + '-' + groom + '-wedding-portal.html';
  const blob = new Blob([html], { type: 'text/html' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}

function copyUrl() {
  const url = document.getElementById('pudUrl')?.textContent || '';
  navigator.clipboard.writeText('https://' + url).then(() => {
    const btn = document.querySelector('.pud-copy');
    if (btn) { btn.textContent = 'Copied!'; setTimeout(() => btn.textContent = 'Copy', 2000); }
  });
}

function sharePortal() {
  const url = 'https://' + (document.getElementById('pudUrl')?.textContent || 'weddingcanvas.in');
  if (navigator.share) {
    navigator.share({ title: 'Our Wedding Portal', url });
  } else {
    copyUrl();
    alert('Link copied! Share it with your guests.');
  }
}
