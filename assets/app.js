document.body.classList.add('page-ready');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}}),{threshold:.1,rootMargin:'0px 0px -30px'});document.querySelectorAll('.reveal').forEach(e=>io.observe(e));
const nav=document.querySelector('.nav');addEventListener('scroll',()=>nav?.classList.toggle('scrolled',scrollY>18),{passive:true});
const m=document.querySelector('.mobile'),links=document.querySelector('.links');
const closeMobileMenu=()=>{links?.classList.remove('show');document.body.classList.remove('menu-open');m?.setAttribute('aria-expanded','false');if(m)m.textContent='☰';document.querySelector('.nav-services')?.classList.remove('mobile-services-open')};
m?.setAttribute('aria-expanded','false');
m?.addEventListener('click',()=>{const open=!links.classList.contains('show');links.classList.toggle('show',open);document.body.classList.toggle('menu-open',open);m.textContent=open?'×':'☰';m.setAttribute('aria-expanded',String(open));});
const servicesNav=document.querySelector('.nav-services');const servicesTrigger=servicesNav?.querySelector(':scope > a');
servicesTrigger?.addEventListener('click',e=>{if(matchMedia('(max-width:0px)').matches&&links?.classList.contains('show')){e.preventDefault();servicesNav.classList.toggle('mobile-services-open');servicesTrigger.setAttribute('aria-expanded',String(servicesNav.classList.contains('mobile-services-open')));}});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMobileMenu()});
document.querySelectorAll('.links a').forEach(a=>{try{const here=location.pathname.replace(/index\.html$/,'').replace(/\/$/,'');const there=new URL(a.href,location.href).pathname.replace(/index\.html$/,'').replace(/\/$/,'');if(here===there)a.classList.add('active')}catch(e){}});
document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>{if(matchMedia('(max-width:1000px)').matches&&a===servicesTrigger)return;closeMobileMenu()}));
const toggle=document.querySelector('[data-lang-toggle]');if(toggle){toggle.addEventListener('click',()=>localStorage.setItem('fdg-lang',toggle.dataset.langTarget||'en'));}

// V5 locale + navigation polish
const locale=document.documentElement.lang==='es'?'es':'en';localStorage.setItem('fdg-lang',locale);document.querySelectorAll('a[href]').forEach(a=>{if(a.target==='_blank'||a.href.startsWith('mailto:')||a.href.startsWith('tel:'))return;a.addEventListener('click',e=>{const u=new URL(a.href,location.href);if(u.origin===location.origin&&!a.hash){document.body.classList.add('leaving')}})});

// V6 service discovery + subtle pointer depth
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;document.querySelectorAll('.service-card[data-family]').forEach(c=>{c.hidden=f!=='all'&&c.dataset.family!==f;});}));
document.querySelectorAll('.path-card,.feature-shell').forEach(card=>{card.addEventListener('pointermove',e=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const r=card.getBoundingClientRect();card.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');card.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%')});});

// V6.1 deep-linked service needs
(()=>{const hash=location.hash.replace('#','');if(!hash)return;const aliases={cosmetic:'cosmetic',restore:'restore',health:'health'};const f=aliases[hash];if(!f)return;const btn=document.querySelector(`.filter[data-filter="${f}"]`);if(btn){btn.click();setTimeout(()=>document.querySelector('.service-filter')?.scrollIntoView({behavior:'smooth',block:'center'}),120);}})();

// V8 image loader: local files override curated stock; placeholders remain if neither loads.
const stockImages={
  "result-01-before.jpg":"https://images.pexels.com/photos/6528868/pexels-photo-6528868.jpeg?auto=compress&cs=tinysrgb&w=1400",
  "result-01-after.jpg":"https://images.pexels.com/photos/6528850/pexels-photo-6528850.jpeg?auto=compress&cs=tinysrgb&w=1400",
  "result-02-before.jpg":"https://images.pexels.com/photos/7789704/pexels-photo-7789704.jpeg?auto=compress&cs=tinysrgb&w=1400",
  "result-02-after.jpg":"https://images.pexels.com/photos/7298650/pexels-photo-7298650.jpeg?auto=compress&cs=tinysrgb&w=1400",
  "result-03-before.jpg":"https://images.pexels.com/photos/6528850/pexels-photo-6528850.jpeg?auto=compress&cs=tinysrgb&w=1400",
  "result-03-after.jpg":"https://images.pexels.com/photos/7479536/pexels-photo-7479536.jpeg?auto=compress&cs=tinysrgb&w=1400",
  "about-01.jpg":"https://images.pexels.com/photos/5622239/pexels-photo-5622239.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "financing-01.jpg":"https://images.pexels.com/photos/6812577/pexels-photo-6812577.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "home-01.jpg":"https://images.pexels.com/photos/5622233/pexels-photo-5622233.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "home-02.jpg":"https://images.pexels.com/photos/5355703/pexels-photo-5355703.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "home-03.jpg":"https://images.pexels.com/photos/5622269/pexels-photo-5622269.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "home-04.jpg":"https://images.pexels.com/photos/4269369/pexels-photo-4269369.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "service-smile-design-01.jpg":"https://images.pexels.com/photos/4209091/pexels-photo-4209091.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "service-smile-design-02.jpg":"https://images.pexels.com/photos/5622241/pexels-photo-5622241.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "service-invisalign-01.jpg":"https://images.pexels.com/photos/6502336/pexels-photo-6502336.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "service-invisalign-02.jpg":"https://images.pexels.com/photos/4687148/pexels-photo-4687148.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "service-whitening-01.jpg":"https://images.pexels.com/photos/19976592/pexels-photo-19976592.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "service-whitening-02.jpg":"https://images.pexels.com/photos/5355892/pexels-photo-5355892.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "service-veneers-01.jpg":"https://images.pexels.com/photos/5622000/pexels-photo-5622000.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "service-veneers-02.jpg":"https://images.pexels.com/photos/19332231/pexels-photo-19332231.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "service-dental-implants-01.jpg":"https://images.pexels.com/photos/6502305/pexels-photo-6502305.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "service-dental-implants-02.jpg":"https://images.pexels.com/photos/6812500/pexels-photo-6812500.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "service-bridges-crowns-01.jpg":"https://images.pexels.com/photos/6812546/pexels-photo-6812546.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "service-bridges-crowns-02.jpg":"https://images.pexels.com/photos/5355919/pexels-photo-5355919.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "service-dentures-01.jpg":"https://images.pexels.com/photos/8413346/pexels-photo-8413346.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "service-dentures-02.jpg":"https://images.pexels.com/photos/5355926/pexels-photo-5355926.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "service-emergency-01.jpg":"https://images.pexels.com/photos/6809670/pexels-photo-6809670.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "service-emergency-02.jpg":"https://images.pexels.com/photos/5355896/pexels-photo-5355896.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "service-preventive-01.jpg":"https://images.pexels.com/photos/5622270/pexels-photo-5622270.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "service-preventive-02.jpg":"https://images.pexels.com/photos/6528852/pexels-photo-6528852.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "service-periodontics-01.jpg":"https://images.pexels.com/photos/6528786/pexels-photo-6528786.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "service-periodontics-02.jpg":"https://images.pexels.com/photos/4687155/pexels-photo-4687155.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "service-oral-surgery-01.jpg":"https://images.pexels.com/photos/5355718/pexels-photo-5355718.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "service-oral-surgery-02.jpg":"https://images.pexels.com/photos/3946838/pexels-photo-3946838.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "service-endodontics-01.jpg":"https://images.pexels.com/photos/6812569/pexels-photo-6812569.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "service-endodontics-02.jpg":"https://images.pexels.com/photos/6812484/pexels-photo-6812484.jpeg?auto=compress&cs=tinysrgb&w=1800"
};
document.querySelectorAll('[data-image]').forEach(el=>{
  const depth=location.pathname.includes('/es/services/')?'../..':location.pathname.includes('/services/')?'..':location.pathname.includes('/es/')?'..':'.';
  const local=`${depth}/public/images/${el.dataset.image}`;
  const apply=src=>{el.style.backgroundImage=`url("${src}")`;el.classList.add('image-loaded')};
  const img=new Image();
  img.onload=()=>apply(local);
  img.onerror=()=>{const remote=stockImages[el.dataset.image];if(remote){const fallback=new Image();fallback.onload=()=>apply(remote);fallback.src=remote;}};
  img.src=local;
});

// V7 service need storytelling
const needCopy={
  en:{all:['All care, one practice.','Explore our complete range of dental services, or choose a need to narrow the experience.'],cosmetic:['Shape the smile you want.','Explore treatments focused on alignment, brightness, proportion and the overall appearance of your smile.'],restore:['Rebuild comfort and function.','Explore options for missing, damaged or compromised teeth with care centered on everyday function.'],health:['Protect your oral health.','Explore preventive, periodontal, surgical, endodontic and urgent care based on what your smile needs now.']},
  es:{all:['Todo tu cuidado, en un solo lugar.','Explora nuestra gama completa de servicios dentales o elige una necesidad para enfocar tu búsqueda.'],cosmetic:['Diseña la sonrisa que deseas.','Explora tratamientos enfocados en alineación, brillo, proporción y la apariencia general de tu sonrisa.'],restore:['Recupera comodidad y función.','Explora opciones para dientes ausentes, dañados o comprometidos, con atención enfocada en la función diaria.'],health:['Protege tu salud oral.','Explora atención preventiva, periodontal, quirúrgica, endodóntica y de urgencia según lo que tu sonrisa necesite hoy.']}
};
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{const box=document.querySelector('.need-intro');if(!box)return;const lang=document.documentElement.lang==='es'?'es':'en';const [h,p]=needCopy[lang][btn.dataset.filter]||needCopy[lang].all;box.querySelector('h2').textContent=h;box.querySelector('p').textContent=p;}));

// Demo appointment form: validates without pretending to submit to a backend.
document.querySelectorAll('[data-demo-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;let n=form.querySelector('.form-status');if(!n){n=document.createElement('div');n.className='form-status field-full';form.append(n)}n.textContent=document.documentElement.lang==='es'?'Formulario listo. Conecta este formulario al sistema de citas antes de publicar.':'Form is ready. Connect this request form to the practice appointment system before launch.';}));
// V7 accessible before/after comparison
 document.querySelectorAll('.ba-slider').forEach(slider=>{const range=slider.querySelector('.ba-range');range?.addEventListener('input',()=>slider.style.setProperty('--pos',`${range.value}%`));});
