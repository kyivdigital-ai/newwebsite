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
    role:'—',
    year:'—',
    description:'Selected images from the PDF Magazine project.',
    cover:'project pdf 1.2.jpg',
    media:['project pdf 1.jpg','project pdf 1.1.jpg','project pdf 1.2.jpg','project pdf 1.3.jpg']
  },
  {
    id:'02',
    title:'Hatice Schmidt',
    category:'VISUAL PROJECT',
    role:'—',
    year:'—',
    description:'Selected visual work for Hatice Schmidt.',
    cover:'project hatice schmidt 2.3.jpg',
    media:['project hatice 2.1.mp4','project hatice 2.2.jpg','project hatice schmidt 2.3.jpg']
  },
  {
    id:'03',
    title:'Ukraine Design Week',
    category:'DESIGN PROJECT',
    role:'—',
    year:'—',
    description:'Selected visual work for Ukraine Design Week.',
    cover:'project ukraine design 3.2.jpg',
    media:['project ukraine design 3.2.jpg']
  }
];
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
function home() {
  document.title = 'Stanislav — Selected Work';
  root.innerHTML = [
    '<section class="hero" aria-label="Introduction">',
      '<div class="hero-overline micro"><span>(01 — 03) / PORTFOLIO INDEX</span><span class="right">ART DIRECTION<br>EDITORIAL & VISUAL DESIGN</span></div>',
      '<div class="hero-center"><h1>Selected<br><span class="italic">work.</span></h1>',
      '<div class="hero-intro">An independent creative practice working across images, editorial and visual culture.<span class="micro">SCROLL TO EXPLORE ↓</span></div></div>',
    '</section>',
    '<section class="work-list" id="work" aria-label="Selected work">',
      '<div class="work-header micro"><span>INDEX / SELECTED PROJECTS</span><span>SELECTED WORK</span></div>',
      PROJECTS.map((p,i) => [
        '<article class="work-row"><a class="work-link" href="', route(p.id), '" aria-label="Open ', e(p.title), '">',
        '<span class="work-index micro">',p.id,'</span>',
        '<span class="work-title">',e(p.title),'</span>',
        '<span class="work-label micro">',e(p.category),'</span>',
        '<span class="work-arrow" aria-hidden="true">↗</span>',
        '<img class="hover-preview" src="',mediaFile(p.cover),'" alt="" loading="',i<2?'eager':'lazy','">',
        '</a></article>'
      ].join('')).join(''),
    '</section>',
    '<section class="about-strip" aria-label="About and contact">',
      '<div><span class="eyebrow">ABOUT / THE PRACTICE</span><h2>A personal<br><i>point of view.</i></h2></div>',
      '<div class="about-content"><p>Stanislav is a Berlin-based creative working with art direction, graphic design, imagery and independent publishing.</p><a class="micro" href="#/about">MORE ABOUT THE PRACTICE ↗</a></div>',
    '</section>'
  ].join('');
  navigation('index');
}
function gallery(p) {
  return p.media.map((file,i) => {
    const shape = (i===0 || i%5===0) ? '' : ((i%5===1 || i%5===2) ? 'half' : (i%5===3 ? 'left' : 'right'));
    const number = String(i+1).padStart(2,'0');
    let media;
    if (/\.mp4$/i.test(file)) {
      media = '<video controls muted playsinline preload="none" aria-label="Video '+number+' from '+e(p.title)+'"><source src="'+mediaFile(file)+'" type="video/mp4">Video playback is not supported.</video>';
    } else {
      media = '<img src="'+mediaFile(file)+'" alt="'+e(p.title)+', archive image '+number+'" loading="'+(i===0?'eager':'lazy')+'" decoding="async">';
    }
    return '<figure class="gallery-item '+shape+'">'+media+'<figcaption class="image-caption"><span>'+e(p.title.toUpperCase())+' / '+number+'</span><span>'+String(p.media.length).padStart(2,'0')+' IMAGES / FILMS</span></figcaption></figure>';
  }).join('');
}
function project(p) {
  const next = PROJECTS[(PROJECTS.indexOf(p)+1)%PROJECTS.length];
  document.title = p.title + ' — Stanislav';
  root.innerHTML = [
    '<article class="case">',
      '<div class="case-topline"><a class="back-button" href="#/"><span class="arrow">←</span> BACK TO INDEX</a><span class="micro">PROJECT ',p.id,' / '+String(PROJECTS.length).padStart(2,'0')+'</span></div>',
      '<header class="case-head"><h1 class="case-title">',e(p.title),'</h1><div class="case-deck">',e(p.description),'</div></header>',
      '<div class="case-meta project-meta">',
        '<div><span class="meta-key">PROJECT</span><span class="meta-value">',e(p.title),'</span></div>',
        '<div><span class="meta-key">DISCIPLINE</span><span class="meta-value">',e(p.category),'</span></div>',
        '<div><span class="meta-key">ROLE / CREDITS</span><span class="meta-value">',e(p.role),'</span></div>',
        '<div><span class="meta-key">YEAR</span><span class="meta-value">',e(p.year),'</span></div>',
      '</div><div class="case-gallery">',gallery(p),'</div>',
      '<a href="',route(next.id),'" class="next-project" aria-label="Next project: ',e(next.title),'">',
        '<span class="next-label micro"><span>NEXT PROJECT</span><span>',next.id,' / '+String(PROJECTS.length).padStart(2,'0')+' ↗</span></span>',
        '<h2><span>',e(next.title),' ↗</span></h2>',
      '</a>',
    '</article>'
  ].join('');
  navigation(null);
}
function about() {
  document.title = 'About — Stanislav';
  root.innerHTML = [
    '<section class="about-page"><span class="micro">STANISLAV / INDEPENDENT CREATIVE PRACTICE</span>',
    '<h1>About<em>.</em></h1><div class="about-columns">',
    '<div class="micro">BASED IN BERLIN<br>WORKING INTERNATIONALLY</div>',
    '<div class="about-copy">',
      '<p>I’m Stanislav, a creative working across art direction, graphic design, editorial projects and independent publishing.</p>',
      '<p>I am interested in creating distinctive visual worlds through images, typography and storytelling.</p>',
      '<div class="about-links micro">',
      '<a class="text-link" href="https://www.instagram.com/stnislavski/" target="_blank" rel="noopener noreferrer">INSTAGRAM ↗</a>',
      '<a class="text-link" href="#/">VIEW SELECTED WORK ↗</a>',
      '</div></div></div></section>'
  ].join('');
  navigation('about');
}
function render() {
  const path = decodeURIComponent(location.hash.replace(/^#\/?/, '')).replace(/\/+$/, '');
  const match = path.match(/^project\/(\d{2})$/);
  if (match) {
    const p = PROJECTS.find(p => p.id === match[1]);
    if (p) project(p); else home();
  } else if (path === 'about') about();
  else home();
  window.scrollTo({top:0,behavior:'instant'});
}
window.addEventListener('hashchange',render);
render();
