// Preloader
const pre=document.getElementById('preloader'),preBar=document.getElementById('preBar'),preText=document.getElementById('preText');
const preSteps=['loading universe_','warming nebula_','calibrating stars_','deploying intelligence_'];let pv=0;
const preIv=setInterval(()=>{pv+=Math.random()*28+10;if(pv>=100){pv=100;clearInterval(preIv);setTimeout(()=>{pre.style.opacity='0';pre.style.visibility='hidden';setTimeout(()=>pre.remove(),650)},380)}preBar.style.width=pv+'%';preText.textContent=preSteps[Math.min(preSteps.length-1,Math.floor(pv/26))]},140);

// Stars + shooting stars
const c=document.getElementById('stars'),x=c.getContext('2d');let W,H,stars=[],shoots=[];
function size(){W=c.width=innerWidth;H=c.height=innerHeight;stars=Array.from({length:180},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.6+.3,s:Math.random()*.35+.06,o:Math.random()*.6+.2}))}
size();addEventListener('resize',size);
setInterval(()=>{if(shoots.length<2&&Math.random()>.55)shoots.push({x:Math.random()*W*.7+W*.15,y:Math.random()*H*.25,vx:6+Math.random()*4,vy:2.5+Math.random()*2,life:1})},1400);
(function loop(){x.clearRect(0,0,W,H);stars.forEach(s=>{s.y+=s.s;if(s.y>H)s.y=0;s.o+=Math.random()*.04-.02;s.o=Math.max(.15,Math.min(.85,s.o));x.globalAlpha=s.o;x.fillStyle='#fff';x.beginPath();x.arc(s.x,s.y,s.r,0,7);x.fill()});
shoots=shoots.filter(s=>s.life>0);shoots.forEach(s=>{s.x+=s.vx;s.y+=s.vy;s.life-=.018;const g=x.createLinearGradient(s.x,s.y,s.x-s.vx*9,s.y-s.vy*9);g.addColorStop(0,'rgba(255,255,255,'+(.9*s.life)+')');g.addColorStop(1,'rgba(255,255,255,0)');x.globalAlpha=1;x.strokeStyle=g;x.lineWidth=2;x.beginPath();x.moveTo(s.x,s.y);x.lineTo(s.x-s.vx*9,s.y-s.vy*9);x.stroke()});x.globalAlpha=1;requestAnimationFrame(loop)})();

// Typed
const roles=['AI/ML Developer','Generative AI Builder','Intelligent Systems Designer','Computer Vision Explorer'];
const typedEl=document.getElementById('typed');let ri=0,ci=0,del=false;
(function type(){const word=roles[ri];typedEl.textContent=word.slice(0,ci);if(!del){ci++;if(ci>word.length){del=true;return setTimeout(type,1800)}}else{ci--;if(ci===0){del=false;ri=(ri+1)%roles.length}}setTimeout(type,del?38:70)})();

// Marquee
const items=['PYTHON','TENSORFLOW','LLMS','LANGCHAIN','RAG','OPENCV','CNN','REACT','NASA SPACE APPS','GEN AI'];
document.getElementById('marquee').innerHTML=[...items,...items].map(t=>`<span>✦ ${t}</span>`).join('');

// Reveal + bars + counters
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');e.target.querySelectorAll('.bar i').forEach(b=>b.style.width=b.style.getPropertyValue('--w'));
e.target.querySelectorAll('[data-count]').forEach(el=>{const n=+el.dataset.count,dec=n%1!==0;let v=0;const step=dec?n/34:n/30;const iv=setInterval(()=>{v+=step;if(v>=n){v=n;clearInterval(iv)}el.textContent=dec?v.toFixed(1):Math.ceil(v)},40)});io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Cursor + trail + magnetic
const cursor=document.getElementById('cursor');
const trail=document.getElementById('trail');
addEventListener('mousemove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';
  if(reduceMotion)return;const d=document.createElement('div');d.className='trail-dot';d.style.left=e.clientX+'px';d.style.top=e.clientY+'px';trail.appendChild(d);requestAnimationFrame(()=>{d.style.transform='translate(-50%,-50%) scale(0)';d.style.opacity='0'});setTimeout(()=>d.remove(),380)});
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('a,button').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('grow'));el.addEventListener('mouseleave',()=>cursor.classList.remove('grow'))});
document.querySelectorAll('.magnetic').forEach(el=>{el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.18}px)`});el.addEventListener('mouseleave',()=>el.style.transform='')});

// Tilt + spotlight
document.querySelectorAll('[data-tilt]').forEach(card=>{card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect();const px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;card.style.setProperty('--mx',px*100+'%');card.style.setProperty('--my',py*100+'%');card.style.transform=`perspective(900px) rotateY(${(px-.5)*10}deg) rotateX(${(.5-py)*10}deg) translateY(-4px)`});card.addEventListener('mouseleave',()=>card.style.transform='')});
const tiltCard=document.getElementById('tiltCard');
if(tiltCard){tiltCard.addEventListener('mousemove',e=>{const r=tiltCard.getBoundingClientRect();tiltCard.style.transform=`perspective(800px) rotateY(${((e.clientX-r.left)/r.width-.5)*14}deg) rotateX(${(.5-(e.clientY-r.top)/r.height)*14}deg)`});tiltCard.addEventListener('mouseleave',()=>tiltCard.style.transform='')}

// Split headline + staggered entrances
const h1=document.querySelector('.hero-title');
if(h1&&!reduceMotion){h1.innerHTML=h1.innerHTML.split('<br>').map(line=>'<span class="h-line">'+line+'</span>').join('<br>');h1.querySelectorAll('.h-line').forEach((l,i)=>{l.style.display='inline';l.style.animation='riseIn .9s cubic-bezier(.2,.9,.2,1) '+(i*0.13)+'s both'})}
const stg=document.querySelectorAll('.beyond-grid .card,.testi-grid blockquote,.gal-item,.tl-item');
const io2=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const idx=[...e.target.parentElement.children].indexOf(e.target);e.target.style.transitionDelay=(idx*0.09)+'s';e.target.classList.add('in');io2.unobserve(e.target)}}),{threshold:.15});
stg.forEach(el=>{if(!el.classList.contains('reveal'))el.classList.add('reveal');io2.observe(el)});

// Clock + status + parallax + lightbox + glitch
function tick(){const t=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});const cl=document.getElementById('clock');if(cl)cl.textContent=t+' IST';const st=document.getElementById('statusTime');if(st)st.textContent=t}
tick();setInterval(tick,30000);
document.querySelectorAll('.li-card h3,.project h3').forEach(h=>h.classList.add('glitch-hover'));
document.querySelectorAll('.btn.primary').forEach(b=>b.classList.add('glow-btn'));
const parallaxEls=document.querySelectorAll('.li-media img,.spot-media img,.journey-img img,.avatar-wrap img');
function parallax(){const y=scrollY;parallaxEls.forEach(img=>{const r=img.parentElement.getBoundingClientRect();const off=(r.top+r.bottom)/2-innerHeight/2;img.style.transform='translateY('+(off*-0.015)+'px) scale(1.03)'});requestAnimationFrame(parallax)}
if(!reduceMotion)requestAnimationFrame(parallax);
// Professional lightbox gallery
const galleryImgs=[...document.querySelectorAll('.li-media img,.spot-media img,.journey-img img,.avatar-wrap img,.gal-item img')].filter(i=>!i.parentElement.classList.contains('empty'));
const lb=document.getElementById('lightbox'),lbImg=document.getElementById('lbImg'),lbCap=document.getElementById('lbCap'),lbCount=document.getElementById('lbCount');
let lbIdx=0;
function openLb(idx){lbIdx=(idx+galleryImgs.length)%galleryImgs.length;const img=galleryImgs[lbIdx];lbImg.src=img.src;lbImg.classList.remove('zoomed');lbCap.textContent=img.closest('.gal-item')?.dataset.cap||img.alt||'';lbCount.textContent=(lbIdx+1)+' / '+galleryImgs.length;lb.classList.add('open');document.body.style.overflow='hidden'}
function closeLb(){lb.classList.remove('open');document.body.style.overflow=''}
galleryImgs.forEach((img,i)=>{const holder=img.closest('.gal-item')||img;holder.style.cursor='zoom-in';holder.addEventListener('click',()=>openLb(i))});
document.getElementById('lbClose').addEventListener('click',closeLb);
document.getElementById('lbPrev').addEventListener('click',e=>{e.stopPropagation();openLb(lbIdx-1)});
document.getElementById('lbNext').addEventListener('click',e=>{e.stopPropagation();openLb(lbIdx+1)});
lbImg.addEventListener('click',e=>{e.stopPropagation();lbImg.classList.toggle('zoomed')});
lb.addEventListener('click',e=>{if(!e.target.closest('.lb-nav')&&e.target!==lbImg)closeLb()});
addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')closeLb();if(e.key==='ArrowLeft')openLb(lbIdx-1);if(e.key==='ArrowRight')openLb(lbIdx+1)});

// Nav + progress + theme
document.getElementById('burger').onclick=()=>document.getElementById('navLinks').classList.toggle('open');
addEventListener('scroll',()=>{const h=document.documentElement;document.getElementById('progress').style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%'});
const themeSelect=document.getElementById('themeSelect');
function setTheme(t){document.documentElement.dataset.theme=t;localStorage.setItem('jw-theme',t);if(themeSelect)themeSelect.value=t}
themeSelect.addEventListener('change',e=>setTheme(e.target.value));
setTheme(localStorage.getItem('jw-theme')||'nebula');

// Resume button state
(function(){const btn=document.getElementById('resumeBtn'),note=document.getElementById('resumeNote');if(!btn)return;fetch('assets/joel-resume.pdf',{method:'HEAD'}).then(r=>{if(r.ok){btn.style.opacity='1';note.textContent='PDF found — click to download.'}else{btn.style.opacity='.55';btn.setAttribute('aria-disabled','true')}}).catch(()=>{btn.style.opacity='.55'})})();

// LinkedIn filter
document.querySelectorAll('.li-filter').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.li-filter').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.filter;
    document.querySelectorAll('[data-cat]').forEach(card=>{
      const show=f==='all'||card.dataset.cat===f;
      card.classList.toggle('hide',!show);
      if(show){card.classList.add('in')}
    });
  });
});

// View counter ---------------------------------------------------------------
// The counter SVG is embedded (hidden). Its <title> holds the number, which we
// read and then paint in the site's own typography.
(function(){
  var numEl = document.getElementById('viewsNum');
  var frame = document.getElementById('viewsFrame');
  if(!numEl || !frame) return;

  function paint(val){
    var txt = Number(val).toLocaleString();
    if(numEl.textContent === txt) return;
    numEl.textContent = txt;
    numEl.classList.remove('bump');
    void numEl.offsetWidth;
    numEl.classList.add('bump');
  }

  function read(){
    try{
      var doc = frame.contentDocument || (frame.contentWindow && frame.contentWindow.document);
      if(!doc) return false;

      // 1) the <title> carries "hits: 47"
      var titleEl = doc.querySelector('title');
      if(titleEl){
        var m = titleEl.textContent.match(/([\d,]+)/);
        if(m){ paint(m[1].replace(/,/g,'')); return true; }
      }
      // 2) any <text> node that is digits only
      var nodes = doc.querySelectorAll('text');
      for(var i=0;i<nodes.length;i++){
        var v = (nodes[i].textContent || '').trim();
        if(/^[\d,]+$/.test(v)){ paint(v.replace(/,/g,'')); return true; }
      }
    }catch(e){}
    return false;
  }

  var tries = 0;
  var iv = setInterval(function(){
    tries++;
    if(read() || tries > 20) clearInterval(iv);
  }, 250);

  frame.addEventListener('load', function(){ setTimeout(read, 80); });
})();
