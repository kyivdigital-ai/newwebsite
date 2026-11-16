/**
 * Replace the five placeholder archive groups with your actual projects.
 * The source repository contains numbered media files, not case-study metadata.
 */
const PROJECTS = [
  {id:'01', title:'Archive I', category:'SELECTED VISUALS', role:'TO BE ADDED', year:'—', description:'A selection of images and moving-image work from the archive.', cover:'3.jpg', media:['1.mp4','2.mp4','3.jpg','4.jpg','5.mp4','6.jpg','7.jpg','8.jpg','9.mp4']},
  {id:'02', title:'Archive II', category:'SELECTED VISUALS', role:'TO BE ADDED', year:'—', description:'A selection of images and moving-image work from the archive.', cover:'12.jpg', media:['10.jpg','11.jpg','12.jpg','13.jpg','14.jpg','15.jpg','16.jpg','17.mp4','18.jpg','19.jpg']},
  {id:'03', title:'Archive III', category:'SELECTED VISUALS', role:'TO BE ADDED', year:'—', description:'A selection of images and moving-image work from the archive.', cover:'22.jpg', media:['20.jpg','21.mp4','22.jpg','23.jpg','24.jpg','25.mp4','26.jpg','27.mp4','28.jpg','29.jpg']},
  {id:'04', title:'Archive IV', category:'SELECTED VISUALS', role:'TO BE ADDED', year:'—', description:'A selection of images from the archive.', cover:'33.jpg', media:['30.jpg','31.jpg','32.jpg','33.jpg','34.jpg','35.jpg','36.jpg','37.jpg','38.jpg','39.jpg']},
  {id:'05', title:'Archive V', category:'SELECTED VISUALS', role:'TO BE ADDED', year:'—', description:'A selection of images and moving-image work from the archive.', cover:'43.jpg', media:['40.mp4','41.jpg','42.jpg','43.jpg','44.jpg','45.jpg','46.jpg','47.jpg','48.jpg','49.jpg','50.jpg','51.jpg']}
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
      '<div class="hero-overline micro"><span>(01 — 05) / PORTFOLIO INDEX</span><span class="right">ART DIRECTION<br>EDITORIAL & VISUAL DESIGN</span></div>',
      '<div class="hero-center"><h1>Selected<br><span class="italic">work.</span></h1>',
      '<div class="hero-intro">An independent creative practice working across images, editorial and visual culture.<span class="micro">SCROLL TO EXPLORE ↓</span></div></div>',
    '</section>',
    '<section class="work-list" id="work" aria-label="Selected work">',
      '<div class="work-header micro"><span>INDEX / FIVE SELECTED SECTIONS</span><span>2026 — PRESENT</span></div>',
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
      '<div class="case-topline"><a class="back-button" href="#/"><span class="arrow">←</span> BACK TO INDEX</a><span class="micro">PROJECT ',p.id,' / 05</span></div>',
      '<header class="case-head"><h1 class="case-title">',e(p.title),'</h1><div class="case-deck">',e(p.description),'</div></header>',
      '<div class="case-meta project-meta">',
        '<div><span class="meta-key">PROJECT</span><span class="meta-value">',e(p.title),'</span></div>',
        '<div><span class="meta-key">DISCIPLINE</span><span class="meta-value">',e(p.category),'</span></div>',
        '<div><span class="meta-key">ROLE / CREDITS</span><span class="meta-value">',e(p.role),'</span></div>',
        '<div><span class="meta-key">YEAR</span><span class="meta-value">',e(p.year),'</span></div>',
      '</div><div class="case-gallery">',gallery(p),'</div>',
      '<a href="',route(next.id),'" class="next-project" aria-label="Next project: ',e(next.title),'">',
        '<span class="next-label micro"><span>NEXT PROJECT</span><span>',next.id,' / 05 ↗</span></span>',
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
