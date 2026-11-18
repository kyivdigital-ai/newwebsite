/**
 * Confirmed projects from the organized repository.
 * "another project" assets remain untouched and unpublished until assigned.
 * 2-byte .mp4 placeholders are excluded from galleries.
 */
const PROJECTS = [
  {
    id:'01',
    title:'PDF Magazine',
    category:'EDITORIAL / PUBLISHING',
    role:'Art Direction / Editorial Design',
    year:'2025–2026',
    description:'I developed the art direction and editorial design for PDF Magazine, a publication about music and art, drawing inspiration from the early issues of The Face.',
    cover:'project pdf 1.2.jpg',
    media:['project pdf 1.jpg','project pdf 1.1.jpg','project pdf 1.2.jpg','project pdf 1.3.jpg','project pdf 1.4.jpg','project pdf 1.5.jpg','project pdf 1.6.jpg','project pdf 1.7.jpg','project pdf 1.8.mp4','pdf mag.mp4']
  },
  {
    id:'02',
    title:'Hatice Schmidt',
    category:'BEAUTY / DESIGN',
    role:'Design / Studio Collaboration',
    year:'2025',
    description:'I worked on visual design for beauty brand HATICE SCHMIDT in collaboration with a studio in 2025.',
    cover:'project hatice schmidt 2.3.jpg',
    media:['project hatice.mp4','project hatice 2.2.jpg','project hatice schmidt 2.3.jpg']
  },
  {
    id:'03',
    title:'Ukraine Design Week',
    category:'BRAND IDENTITY / VISUAL COMMUNICATION',
    role:'Art Direction / Visual Identity',
    year:'2024–2026',
    description:'I developed the visual identity and festival communications for Ukraine Design Week across 2024–2026.',
    cover:'project ukraine design 3.2.jpg',
    media:['project ukraine design 3.2.jpg','project ukraine design week 3.4.jpg','project ukraine design 3.3.mp4']
  },
  {
    id:'04',
    title:'Future Systems',
    category:'CREATIVE / PRODUCTION',
    role:'Web Design',
    year:'2025–2026',
    description:'I designed the website for Future Systems, a creative agency supporting underrepresented LGBTQIA+ and BIPOC voices.',
    cover:'future system 1.jpg',
    media:['future system 1.jpg','future system 2.jpg','future system 3.jpg','future system 5.mp4','future system 6.mp4']
  },
  {
    id:'05',
    title:'Upcoming Urban',
    category:'BRANDING / WEB DESIGN',
    role:'Branding / Web Design',
    year:'2027',
    description:'I’m developing the branding and website for Urban. A work in progress for 2027.',
    cover:'urban1.jpg',
    media:['urban1.jpg','urban 2.jpg','urban3.jpg','urban 4.jpg','urban 5.jpg','urban4.jpg']
  }
];

// A deliberately mixed photographic / moving-image archive.
// Edit this list to change the order or include new uploaded files.
// Duplicated source videos and invalid 2-byte uploads are excluded.
const ARCHIVE_REEL_MEDIA = [
  "video1.mp4",
  "another project21.jpg",
  "video6.mp4",
  "video2.mp4",
  "another project 27.jpg",
  "video7.mp4",
  "video8.mp4",
  "another project11.jpg",
  "video4.mp4",
  "video3.mp4",
  "another project 33.jpg"
];

const ARCHIVE_MEDIA = [
  'another project21.jpg',
  'another project11.jpg',
  'another project 27.jpg',
  'video1.mp4',
  'another project18.jpg',
  'another project2.jpg',
  'another project13.jpg',
  'another project 15.jpg',
  'video6.mp4',
  'another project 23.jpg',
  'another project 33.jpg',
  'another project6.jpg',
  'another project 24.jpg',
  'video2.mp4',
  'another project8.jpg',
  'another project25.jpg',
  'another project35.jpg',
  'another project20.jpg',
  'video7.mp4',
  'another project3.jpg',
  'another project14.jpg',
  'another project29.jpg',
  'another project4.jpg',
  'video8.mp4',
  'another project 32.jpg',
  'another project 30.jpg',
  'another project5.jpg',
  'another project 34.jpg',
  'video4.mp4',
  'another project10.jpg',
  'another project16.jpg',
  'another project19.jpg',
  'another project1.jpg',
  'video3.mp4',
  'another project28.jpg',
  'another project31.jpg',
  'another project23.jpg'
];
let archiveObserver = null;

const root = document.getElementById('main-content');
document.getElementById('year').textContent = String(new Date().getFullYear());
const e = v => String(v).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const route = id => '#/project/' + id;
const mediaFile = f => encodeURI(f);
function navigation(active) {
  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.dataset.nav === active) link.setAttribute('aria-current','page');
    else link.removeAttribute('aria-current');
  });
}

function initSiteTools() {
  const clock = document.getElementById('header-clock');
  if (clock) {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Berlin', hour:'2-digit', minute:'2-digit', hour12:false
    });
    const paint = () => { clock.textContent = fmt.format(new Date()); };
    paint();
    window.setInterval(paint, 30000);
  }
  const button = document.getElementById('theme-toggle');
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  let stored = 'light';
  try { stored = localStorage.getItem('stanislav-theme') === 'dark' ? 'dark' : 'light'; } catch (_) {}
  const apply = theme => {
    const dark = theme === 'dark';
    document.documentElement.setAttribute('data-theme',theme);
    if (button) {
      button.setAttribute('aria-pressed',String(dark));
      button.setAttribute('aria-label',dark ? 'Switch to light mode' : 'Switch to dark mode');
      button.setAttribute('title',dark ? 'Light mode' : 'Dark mode');
      const glyph = button.querySelector('span');
      if (glyph) glyph.textContent = dark ? '☀' : '◐';
    }
    if (themeMeta) themeMeta.setAttribute('content',dark ? '#171717' : '#f5f5f1');
  };
  apply(stored);
  if (button) button.addEventListener('click',() => {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(theme);
    try { localStorage.setItem('stanislav-theme',theme); } catch (_) {}
  });
  // Use a custom editorial pointer on desktop only. Native cursor stays on touch
  // devices and for users who prefer reduced motion.
  const fine = window.matchMedia && window.matchMedia('(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)').matches;
  if (!fine) return;
  const cursor = document.createElement('div');
  cursor.className = 'editorial-cursor';
  cursor.setAttribute('aria-hidden','true');
  cursor.innerHTML = '<span class="editorial-cursor-label"></span>';
  document.body.appendChild(cursor);
  document.documentElement.classList.add('has-editorial-cursor');
  const label = cursor.querySelector('.editorial-cursor-label');
  document.addEventListener('pointermove',event => {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    cursor.style.transform = 'translate3d('+event.clientX+'px,'+event.clientY+'px,0) translate(-50%,-50%)';
    cursor.classList.add('is-visible');
    const interactive = event.target.closest('a,button,video');
    if (interactive) {
      label.textContent = interactive.matches('video') ? 'PLAY' :
        interactive.classList.contains('theme-toggle') ? 'SWITCH' :
        interactive.classList.contains('work-link') || interactive.classList.contains('archive-reel-item') ? 'VIEW' : 'OPEN';
      cursor.classList.add('is-active');
    } else {
      cursor.classList.remove('is-active');
      label.textContent = '';
    }
  },{passive:true});
  document.addEventListener('pointerleave',() => cursor.classList.remove('is-visible'));
  window.addEventListener('blur',() => cursor.classList.remove('is-visible'));
}

let berlinClockInterval = null;
function initBerlinClock() {
  const display = root.querySelector('#berlin-clock');
  if (!display) return;
  const formatTime = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Berlin', hour: '2-digit', minute: '2-digit', hour12: false
  });
  const formatZone = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Berlin', timeZoneName: 'short'
  });
  const update = () => {
    const now = new Date();
    const zone = formatZone.formatToParts(now).find(part => part.type === 'timeZoneName');
    display.textContent = formatTime.format(now) + ' (' + (zone ? zone.value : 'Berlin') + ')';
    display.dateTime = now.toISOString();
  };
  update();
  berlinClockInterval = window.setInterval(update, 30000);
  // Weather is a cached forecast from our same-origin Vercel Function.
  // If it is unavailable, we keep the clock without an invented temperature.
  fetch('/api/berlin-weather')
    .then(response => {
      if (!response.ok) throw new Error('Forecast not available');
      return response.json();
    })
    .then(data => {
      const weather = root.querySelector('#berlin-weather');
      const credit = root.querySelector('#berlin-weather-credit');
      if (!weather || !credit || !Number.isFinite(data.temperature)) return;
      weather.textContent = (data.condition || 'Weather') + ' ' + data.temperature + '°';
      weather.hidden = false;
      credit.hidden = false;
    })
    .catch(() => {});
}

function home() {
  document.title = 'Stanislav — Selected Work';
  root.innerHTML = [
    '<section class="work-list" id="work" aria-label="Selected work">',
      PROJECTS.map((p,i) => [
        '<article class="work-row"><a class="work-link" href="', route(p.id), '" aria-label="Open ', e(p.title), '">',
        '<span class="work-index micro">',p.id,'</span>',
        '<span class="work-title',p.title.length > 21 ? ' work-title-long' : '','">',e(p.title),'</span>',
        '<span class="work-label micro">',e(p.category),'</span>',
        '<span class="work-arrow" aria-hidden="true"><svg class="external-arrow-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 19 19 5M8 5h11v11"/></svg></span>',
        '<img class="hover-preview" src="',mediaFile(p.cover),'" alt="" loading="',i<2?'eager':'lazy','">',
        '</a></article>'
      ].join('')).join(''),
      '<article class="work-row archive-index-row">',
        '<a class="work-link archive-index-link" href="#/archive" aria-label="Open visual archive">',
          '<span class="work-index micro">06</span>',
          '<span class="work-title archive-index-title">Archive</span>',
          '<span class="work-label micro" aria-hidden="true"></span>',
          '<span class="work-arrow" aria-hidden="true"><svg class="external-arrow-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 19 19 5M8 5h11v11"/></svg></span>',
        '</a>',
        '<div class="archive-reel-wrap">',
          '<div class="archive-reel" id="archive-reel" role="region" aria-label="Scroll through archive photos and videos" tabindex="0">',
            ARCHIVE_REEL_MEDIA.map((file,i) => {
              const src = mediaFile(file);
              const label = 'Open archive item ' + (i+1);
              if (/\.mp4$/i.test(file)) return '<a class="archive-reel-item" href="#/archive" aria-label="'+label+'"><video class="archive-index-video" src="'+src+'" autoplay muted loop playsinline preload="none" aria-hidden="true"></video></a>';
              return '<a class="archive-reel-item" href="#/archive" aria-label="'+label+'"><img src="'+src+'" loading="lazy" decoding="async" alt=""></a>';
            }).join(''),
          '</div>',
          '<div class="archive-reel-controls">',
            '<button class="archive-reel-prev" type="button" aria-label="Scroll archive images left"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20 12H4M11 5l-7 7 7 7"/></svg></button>',
            '<button class="archive-reel-next" type="button" aria-label="Scroll archive images right"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 12h16M13 5l7 7-7 7"/></svg></button>',
          '</div>',
        '</div>',
      '</article>',
    '</section>',
    '<section class="contact-board" id="contact" aria-label="About, clients and contact">',
      '<div class="contact-board-grid">',
        '<a class="contact-poster" href="mailto:hi.stanislavryabchik@gmail.com" aria-label="Email Stanislav about a project or collaboration">',
          '<span class="contact-poster-text">Got an idea?<br>Let’s make something happen.</span>',
          '<span class="contact-poster-mark" aria-hidden="true">SR</span>',
        '</a>',
        '<div class="contact-column">',
          '<h2 class="contact-pill">Selected clients</h2>',
          '<ul class="contact-client-list">',
            '<li>Broen Studio</li>',
            '<li>Future Systems</li>',
            '<li>Gucci</li>',
            '<li>Hatice Schmidt</li>',
            '<li>PDF Magazine</li>',
            '<li>Rombaut</li>',
            '<li>Ukrainian Design Week</li>',
          '</ul>',
        '</div>',
        '<div class="contact-column contact-column-email">',
          '<div class="contact-channel">',
            '<h2 class="contact-pill">Email</h2>',
            '<a class="contact-email" href="mailto:hi.stanislavryabchik@gmail.com"><span class="email-local">hi.stanislavryabchik@</span><wbr><span class="email-domain">gmail.com</span></a>',
          '</div>',
          '<div class="contact-channel">',
            '<h2 class="contact-pill">Instagram</h2>',
            '<a class="contact-social" href="https://www.instagram.com/stanislav.ryabchik/" target="_blank" rel="noopener noreferrer" aria-label="Open @stanislav.ryabchik on Instagram in a new tab" title="Open Instagram">@stanislav.ryabchik <svg class="external-arrow-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 19 19 5M8 5h11v11"/></svg></a>',
          '</div>',
        '</div>',
        '<div class="contact-column contact-location">',
          '<h2 class="contact-pill">Location</h2>',
          '<p>Based in Berlin.</p>',
          '<div class="berlin-local">',
            '<time class="berlin-clock" id="berlin-clock" aria-label="Current local time in Berlin">--:-- (CET)</time>',
            '<span class="berlin-weather" id="berlin-weather" hidden></span>',
          '</div>',
          '<a class="berlin-weather-credit" id="berlin-weather-credit" href="https://www.met.no/en" target="_blank" rel="noopener noreferrer" hidden>Weather: MET Norway <svg class="external-arrow-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 19 19 5M8 5h11v11"/></svg></a>',
        '</div>',
      '</div>',
      '<div class="contact-story">',
        '<p>Hi, I’m Stanislav Ryabchik, a&nbsp;graphic designer and art director living in&nbsp;Berlin. I&nbsp;make identities, publications, websites, digital experiences and things that move.</p>',
        '<p>My most personal and inspiring project right now is my&nbsp;book, The Little Book That Will Never See the World. I&nbsp;spent three years writing it and built the whole project from scratch — from the editorial design and visual identity to the website and production.</p>',
      '</div>',
    '</section>'
  ].join('');
  navigation('index');
  initBerlinClock();
  initArchiveTeaser();
}
let viewportVideoObserver = null;

// Muted videos play when visible and pause when scrolled away.
// Native player controls stay available on project case studies.
function initViewportAutoplay(selector) {
  const videos = Array.from(root.querySelectorAll(selector));
  if (!videos.length) return;
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = Boolean(navigator.connection && navigator.connection.saveData);
  if (reduced || saveData) return;
  videos.forEach(video => {
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
  });
  if ('IntersectionObserver' in window) {
    viewportVideoObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting && document.visibilityState === 'visible') {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }, {threshold: 0.12, rootMargin: '80px 0px 80px 0px'});
    videos.forEach(video => viewportVideoObserver.observe(video));
  } else {
    videos.forEach(video => video.play().catch(() => {}));
  }
}

function initArchiveTeaser() {
  initViewportAutoplay('.archive-index-video');
  const track = root.querySelector('#archive-reel');
  if (!track) return;
  const previous = root.querySelector('.archive-reel-prev');
  const next = root.querySelector('.archive-reel-next');
  const update = () => {
    previous.disabled = track.scrollLeft < 4;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
  };
  const move = direction => track.scrollBy({
    left: direction * Math.max(track.clientWidth * .75, 220),
    behavior: window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
  });
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('scroll', update, {passive:true});
  root.querySelectorAll('.archive-reel-item img').forEach(img => img.addEventListener('load', update, {once:true}));
  root.querySelectorAll('.archive-reel-item video').forEach(video => video.addEventListener('loadedmetadata', update, {once:true}));
  update();
}
function gallery(p) {
  return p.media.map((file,i) => {
    const number = String(i+1).padStart(2,'0');
    let media;
    if (/\.mp4$/i.test(file)) {
      media = '<video class="case-video" controls autoplay muted loop playsinline preload="none" aria-label="Video '+number+' from '+e(p.title)+'"><source src="'+mediaFile(file)+'" type="video/mp4">Video playback is not supported.</video>';
    } else {
      media = '<img src="'+mediaFile(file)+'" alt="'+e(p.title)+', archive image '+number+'" loading="'+(i===0?'eager':'lazy')+'" decoding="async">';
    }
    return '<figure class="gallery-item'+(/\.mp4$/i.test(file) ? ' gallery-item--video' : '')+'">'+media+'</figure>';
  }).join('');
}
function project(p) {
  const next = PROJECTS[(PROJECTS.indexOf(p)+1)%PROJECTS.length];
  document.title = p.title + ' — Stanislav';
  root.innerHTML = [
    '<article class="case case--',p.id,'">',
      '<div class="case-topline"><a class="back-button" href="#/"><span class="arrow">←</span> BACK TO INDEX</a></div>',
      '<header class="case-head"><h1 class="case-title',p.title.length > 21 ? ' case-title-long' : '','">',e(p.title),'</h1><div class="case-deck">',e(p.description),'</div></header>',
      '<div class="case-meta project-meta">',
        '<div><span class="meta-key">PROJECT</span><span class="meta-value">',e(p.title),'</span></div>',
        '<div><span class="meta-key">DISCIPLINE</span><span class="meta-value">',e(p.category),'</span></div>',
        '<div><span class="meta-key">ROLE / CREDITS</span><span class="meta-value">',e(p.role),'</span></div>',
        '<div><span class="meta-key">YEAR</span><span class="meta-value">',e(p.year),'</span></div>',
      '</div>',
      p.id === '05' ? [
        '<section class="project-process" aria-label="Upcoming Urban project status">',
          '<div class="project-process-head">',
            '<span class="micro">STATUS / 2027</span>',
            '<span class="project-process-live"><span class="project-process-dot" aria-hidden="true"></span>IN DEVELOPMENT</span>',
          '</div>',
          '<div class="project-process-main">',
            '<span class="project-process-title">Still making<br>things.</span>',
            '<div class="project-process-track" aria-hidden="true"><span class="project-process-runner"></span></div>',
          '</div>',
          '<div class="project-process-foot micro">BRANDING / WEB DESIGN — WORK IN PROGRESS</div>',
        '</section>'
      ].join('') : '',
      '<div class="case-gallery">',gallery(p),'</div>',
      '<a href="',route(next.id),'" class="next-project" aria-label="Next project: ',e(next.title),'">',
        '<span class="next-label micro"><span>NEXT PROJECT</span></span>',
        '<h2 class="next-project-title',next.title.length > 16 ? ' next-project-title-long' : '','"><span class="next-project-name">',e(next.title),'</span><span class="next-project-arrow" aria-hidden="true"><svg class="external-arrow-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 19 19 5M8 5h11v11"/></svg></span></h2>',
      '</a>',
    '</article>'
  ].join('');
  navigation(null);
  initViewportAutoplay('.case-video');
}

function archive() {
  document.title = 'Archive — Stanislav';
  root.innerHTML = [
    '<section class="archive-page" aria-label="Visual archive">',
      '<div class="archive-mast">',
        '<h1 class="archive-heading">Archive<span>.</span></h1>',
      '</div>',
      '<div class="archive-grid">',
      ARCHIVE_MEDIA.map((file,i) => {
        const source = mediaFile(file);
        const n = String(i+1).padStart(2,'0');
        if (/\.mp4$/i.test(file)) return [
          '<figure class="archive-item">',
            '<div class="archive-player">',
              '<video class="archive-video" src="',source,'" autoplay muted loop playsinline preload="none" aria-label="Archive film ',n,'"></video>',
              '<div class="archive-controls">',
                '<button type="button" class="archive-play" aria-label="Play archive film ',n,'">PLAY</button>',
                '<button type="button" class="archive-sound" aria-label="Unmute archive film ',n,'">SOUND OFF</button>',
              '</div>',
            '</div>',
          '</figure>'
        ].join('');
        return '<figure class="archive-item"><img src="'+source+'" alt="Archive photograph '+n+'" loading="lazy" decoding="async"></figure>';
      }).join(''),
      '</div>',
    '</section>'
  ].join('');
  navigation('archive');
  initArchiveVideos();
}
function initArchiveVideos() {
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = !!(navigator.connection && navigator.connection.saveData);
  const autoplayAllowed = !reducedMotion && !saveData;
  const videos = Array.from(root.querySelectorAll('.archive-video'));
  videos.forEach(video => {
    video.muted = true;
    const player = video.closest('.archive-player');
    const playButton = player.querySelector('.archive-play');
    const soundButton = player.querySelector('.archive-sound');
    video.addEventListener('play', () => {
      playButton.textContent = 'PAUSE';
      playButton.setAttribute('aria-label','Pause archive video');
    });
    video.addEventListener('pause', () => {
      playButton.textContent = 'PLAY';
      playButton.setAttribute('aria-label','Play archive video');
    });
    playButton.addEventListener('click', () => {
      if (video.paused) {
        delete video.dataset.userPaused;
        video.play().catch(() => {});
      } else {
        video.dataset.userPaused = '1';
        video.pause();
      }
    });
    soundButton.addEventListener('click', () => {
      const wasMuted = video.muted;
      videos.forEach(other => { other.muted = true; });
      root.querySelectorAll('.archive-sound').forEach(button => {
        button.textContent = 'SOUND OFF';
        button.setAttribute('aria-label','Unmute archive video');
      });
      video.muted = !wasMuted;
      if (!video.muted) {
        soundButton.textContent = 'SOUND ON';
        soundButton.setAttribute('aria-label','Mute archive video');
        delete video.dataset.userPaused;
        video.play().catch(() => {});
      }
    });
  });
  if ('IntersectionObserver' in window) {
    archiveObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting && autoplayAllowed && video.dataset.userPaused !== '1') {
          video.play().catch(() => {});
        } else if (!entry.isIntersecting) {
          video.pause();
          video.muted = true;
          const sound = video.closest('.archive-player').querySelector('.archive-sound');
          sound.textContent = 'SOUND OFF';
          sound.setAttribute('aria-label','Unmute archive video');
        }
      });
    }, {threshold:0.25, rootMargin:'40px 0px 40px 0px'});
    videos.forEach(video => archiveObserver.observe(video));
  }
}

function render() {
  if (berlinClockInterval) { clearInterval(berlinClockInterval); berlinClockInterval = null; }
  if (archiveObserver) { archiveObserver.disconnect(); archiveObserver = null; }
  if (viewportVideoObserver) { viewportVideoObserver.disconnect(); viewportVideoObserver = null; }
  root.querySelectorAll('.archive-video, .archive-index-video, .case-video').forEach(video => video.pause());
  const path = decodeURIComponent(location.hash.replace(/^#\/?/, '')).replace(/\/+$/, '');
  const match = path.match(/^project\/(\d{2})$/);
  if (match) {
    const p = PROJECTS.find(p => p.id === match[1]);
    if (p) project(p); else home();
  } else if (path === 'archive') archive();
  else home();
  window.scrollTo({top:0,behavior:'instant'});
}
window.addEventListener('hashchange',render);
initSiteTools();
render();
