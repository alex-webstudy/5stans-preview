// 5-Stans mockup interactions: sticky header, scroll reveals, parallax, hero slider, small form toys.
(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');
  // reveal: elements already on screen show at once, the rest animate as they arrive
  var els = [].slice.call(document.querySelectorAll('.reveal,.stagger'));
  function show(el){ el.classList.add('in'); }
  if (!('IntersectionObserver' in window) || reduce) { els.forEach(show); }
  else {
    var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ show(e.target); io.unobserve(e.target);} }); }, {rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(el){ var r=el.getBoundingClientRect(); if(r.top < innerHeight) show(el); else io.observe(el); });
    setTimeout(function(){ els.forEach(show); }, 6000); // safety net
  }
  // header turns solid after the hero
  var h = document.querySelector('.site-header:not(.solid)');
  if (h) { var on=false; addEventListener('scroll', function(){ var s = scrollY > 520; if(s!==on){ on=s; h.classList.toggle('fixed', s);} }, {passive:true}); }
  // parallax
  var px = [].slice.call(document.querySelectorAll('[data-parallax]'));
  if (px.length && !reduce) addEventListener('scroll', function(){ px.forEach(function(el){ var r=el.parentElement.getBoundingClientRect(); var k=parseFloat(el.dataset.parallax)||.15; el.style.transform='translate3d(0,'+(-r.top*k)+'px,0) scale(1.15)'; }); }, {passive:true});
  // hero slider
  var hero = document.querySelector('[data-slider]');
  if (hero) {
    var slides = hero.querySelectorAll('.slide'), dots = hero.querySelectorAll('.dots button'), i = 0, t;
    function go(n){ slides[i].classList.remove('on'); dots[i].classList.remove('on'); i=(n+slides.length)%slides.length; slides[i].classList.add('on'); dots[i].classList.add('on'); clearTimeout(t); t=setTimeout(function(){go(i+1)}, 7000); }
    hero.querySelector('.prev').onclick=function(){go(i-1)}; hero.querySelector('.next').onclick=function(){go(i+1)};
    dots.forEach(function(d,k){ d.onclick=function(){go(k)}; });
    t=setTimeout(function(){go(1)}, 7000);
  }
  // steppers
  document.querySelectorAll('.stepper').forEach(function(s){ var v=s.querySelector('span'); var b=s.querySelectorAll('button');
    b[0].onclick=function(){ v.textContent=Math.max(0,+v.textContent-1); }; b[1].onclick=function(){ v.textContent=+v.textContent+1; }; });
  // selectable tiles
  document.querySelectorAll('[data-pick]').forEach(function(el){ el.addEventListener('click', function(){ el.classList.toggle('picked'); el.setAttribute('aria-pressed', el.classList.contains('picked')); }); });
  // tabs (faq sidebar)
  document.querySelectorAll('[data-tab]').forEach(function(a){ a.addEventListener('click', function(){ document.querySelectorAll('[data-tab]').forEach(function(x){x.classList.remove('on')}); a.classList.add('on'); }); });
  document.querySelectorAll(".seg,.pills,.scale").forEach(function(g){ g.addEventListener("click", function(e){ var s=e.target.closest("span"); if(!s||s.parentElement!==g) return; g.querySelectorAll(":scope>span").forEach(function(x){x.classList.remove("on")}); s.classList.add("on"); }); });
  // forms never leave the page
  document.querySelectorAll('form').forEach(function(f){ f.addEventListener('submit', function(e){ e.preventDefault(); var ok=f.querySelector('.sent'); if(ok){ ok.hidden=false; } }); });
})();
