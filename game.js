(function(){
  "use strict";

  const buildings = [
    {id:'ident',  name:'Wump Identity',   icon:'🪪', base:15,          wps:0.1,
     flavor:'Identity experts make sure your wumps are yours and yours alone.'},
    {id:'box',    name:'Wump Boxing',     icon:'📦', base:100,         wps:1,
     flavor:'Boxes impermeable to solid wumps and wump gas alike. Plug those holes!'},
    {id:'digital',name:'Digital Wumps',   icon:'💾', base:1100,        wps:8,
     flavor:'Wumps adapted to the ever-changing digital landscape.'},
    {id:'www',    name:'World Wide Wumps', icon:'🌍', base:12000,       wps:47,
     flavor:'Peak wumpness from Antarctica to Zanzibar.'},
    {id:'zaxis',  name:'Wump Z-Axis™',     icon:'🧊', base:130000,      wps:260,
     flavor:'Your wumps, now in a glorious third dimension. Standard on any tier.'},
    {id:'frump',  name:'Frump Converter',  icon:'⚗️', base:1400000,     wps:1400,
     flavor:'Refines your raw frumps into premium-grade wumps.'},
    {id:'stance', name:'Wumpstance',       icon:'🖥️', base:20000000,    wps:7800,
     flavor:'Spin up a fresh wumpstance on demand.'},
    {id:'empire', name:'Wumpmaster',       icon:'👑', base:330000000,   wps:44000,
     flavor:'Experienced wumpmaster? Expand your wumping empire.'},
    {id:'grumble',name:'Grumble Brumbler', icon:'🌀', base:5100000000,  wps:260000,
     flavor:'Brumbles grumbles at full industrial scale.'},
    {id:'reserve',name:'Wumprcent Reserve',icon:'🏦', base:75000000000, wps:1600000,
     flavor:'Join the wumprcent. Own the wump supply itself.'},
    {id:'amp',    name:'Wumpness Amplifier',icon:'🔊', base:1.1e12, wps:1e7,
     flavor:'Broadcasts pure wumpness on every known frequency.'},
    {id:'hype',   name:"Frank's Hype Machine",icon:'📣', base:1.5e13, wps:6.5e7,
     flavor:'Frank Printzlestintz manufactures demand from thin air.'},
    {id:'hole',   name:'Wumphole',          icon:'🕳️', base:2.1e14, wps:4.3e8,
     flavor:'A wormhole siphoning wumps from parallel timelines.'},
    {id:'ai',     name:'Artificial Wumpelligence',icon:'🤖', base:3e15, wps:2.9e9,
     flavor:'An intelligence that has learned to wump itself.'},
    {id:'great',  name:'The Great Wump',    icon:'🌌', base:4e16, wps:2.1e10,
     flavor:'A cosmic wump that dreams smaller wumps into being.'},
  ];

  const upgrades = [
    {id:'u1',icon:'🔪',cost:500,      name:'Sharper Wumps',
     desc:'Manual wumps are twice as pointy. <b>+100% click power.</b>', apply:s=>s.clickMult*=2},
    {id:'u2',icon:'💨',cost:6000,     name:'Wump Gas Recapture',
     desc:'Reclaim escaping wump gas on every click. <b>+100% click power.</b>', apply:s=>s.clickMult*=2},
    {id:'u3',icon:'🧙',cost:60000,    name:'Wumpr Wizards',
     desc:'The wizards oversee all wumping. <b>+50% to every generator.</b>', apply:s=>s.genMult*=1.5},
    {id:'u4',icon:'👆',cost:400000,   name:'Wumpmaster Touch',
     desc:'Clicks also earn 1% of your wumps/sec. <b>Huge click boost.</b>', apply:s=>s.clickWpsShare=0.01},
    {id:'u5',icon:'📐',cost:9000000,  name:'Z-Axis Standard',
     desc:'Wump Z-Axis™ ships on every tier. <b>+50% to every generator.</b>', apply:s=>s.genMult*=1.5},
    {id:'u6',icon:'🎩',cost:120000000,name:'The Wumprcent',
     desc:'You are the wump economy now. <b>All wump production ×2.</b>', apply:s=>{s.genMult*=2;s.clickMult*=2}},
    {id:'testimonials',icon:'💬',cost:1200000000,name:'What Clients Are Saying',
     desc:'Five-star reviews roll in from every wumpr client. <b>+50% to every generator.</b>', apply:s=>s.genMult*=1.5},

    {id:'d_box',icon:'📦',cost:14000,name:'Reinforced Wump Boxes',
     desc:'Nothing leaks. <b>Wump Boxing produces ×2.</b>', unlock:()=>state.owned.box>=12,
     apply:s=>s.buildMult.box=(s.buildMult.box||1)*2},
    {id:'d_digital',icon:'💠',cost:900000,name:'Recursive Digital Wumps',
     desc:'Wumps that spawn wumps. <b>Digital Wumps produce ×2.</b>', unlock:()=>state.owned.digital>=12,
     apply:s=>s.buildMult.digital=(s.buildMult.digital||1)*2},
    {id:'d_www',icon:'🛰️',cost:9000000,name:'Orbital Wump Relay',
     desc:'Wumps beamed worldwide. <b>World Wide Wumps produce ×2.</b>', unlock:()=>state.owned.www>=12,
     apply:s=>s.buildMult.www=(s.buildMult.www||1)*2},
    {id:'frumps',icon:'♾️',cost:40000000,name:'Frumps All The Way Down',
     desc:'Frumps beget frumps. <b>Frump Converter and everything cheaper ×2.</b>', unlock:()=>state.owned.frump>=1,
     apply:s=>['ident','box','digital','www','zaxis','frump'].forEach(id=>s.buildMult[id]=(s.buildMult[id]||1)*2)},
    {id:'cert',icon:'🎓',cost:250000000,name:'Wumpmaster Certification',
     desc:'Accredited wumping. <b>Click power +1% per generator you own.</b>'},
    {id:'overwump',icon:'⚡',cost:600000000,name:'Overwump Drive',
     desc:'While the orbit is maxed out and sparking, <b>all production ×2.</b>'},
    {id:'d_stance',icon:'🎛️',cost:900000000,name:'Wumpstance Cluster',
     desc:'Horizontal wump scaling. <b>Wumpstance produces ×2.</b>', unlock:()=>state.owned.stance>=10,
     apply:s=>s.buildMult.stance=(s.buildMult.stance||1)*2},
    {id:'interest',icon:'💰',cost:2500000000,name:"Kimberly's Compound Interest",
     desc:'The CFO puts your bank to work. <b>Banked wumps grow +0.1%/sec.</b>'},
    {id:'d_empire',icon:'🏰',cost:15000000000,name:'Wumpmaster Franchise',
     desc:'License the Wumpmaster brand across every territory. <b>Wumpmaster produces ×2.</b>', unlock:()=>state.owned.empire>=12,
     apply:s=>s.buildMult.empire=(s.buildMult.empire||1)*2},
    {id:'d_grumble',icon:'🌪️',cost:250000000000,name:'Grumble Containment Field',
     desc:'Nothing brumbles outside the blast radius. <b>Grumble Brumbler produces ×2.</b>', unlock:()=>state.owned.grumble>=12,
     apply:s=>s.buildMult.grumble=(s.buildMult.grumble||1)*2},
    {id:'d_reserve',icon:'💹',cost:3500000000000,name:'Wumprcent Central Bank',
     desc:'Print more wumps, responsibly. <b>Wumprcent Reserve produces ×2.</b>', unlock:()=>state.owned.reserve>=12,
     apply:s=>s.buildMult.reserve=(s.buildMult.reserve||1)*2},
    {id:'d_amp',icon:'📡',cost:5e13,name:'Resonant Amplification',
     desc:'Tune every amplifier to the same frequency. <b>Wumpness Amplifier produces ×2.</b>', unlock:()=>state.owned.amp>=12,
     apply:s=>s.buildMult.amp=(s.buildMult.amp||1)*2},
    {id:'d_hype',icon:'🎺',cost:7e14,name:"Frank's Second Hype Machine",
     desc:"Frank Printzlestintz doubles down on demand. <b>Frank's Hype Machine produces ×2.</b>", unlock:()=>state.owned.hype>=12,
     apply:s=>s.buildMult.hype=(s.buildMult.hype||1)*2},
    {id:'multiwump',icon:'✨',cost:5e15,name:'The Great Multiwump',
     desc:'Wumping ascends to a higher plane. <b>All wump production ×3.</b>', unlock:()=>state.owned.great>=1,
     apply:s=>s.genMult*=3},
    {id:'d_hole',icon:'🌠',cost:9.5e15,name:'Wormhole Stabilizer',
     desc:'Keeps the wumphole from collapsing on itself. <b>Wumphole produces ×2.</b>', unlock:()=>state.owned.hole>=12,
     apply:s=>s.buildMult.hole=(s.buildMult.hole||1)*2},
    {id:'d_ai',icon:'🧠',cost:1.4e17,name:'Wumpelligence Overclock',
     desc:'Teach the AI to wump twice as hard. <b>Artificial Wumpelligence produces ×2.</b>', unlock:()=>state.owned.ai>=12,
     apply:s=>s.buildMult.ai=(s.buildMult.ai||1)*2},
    {id:'saltcure',icon:'🧂',cost:4000000000,name:'Cured Wolf Salt',
     desc:"Frenzy streak bonus compounds the base multiplier (×1.1 per streak) instead of adding to it."},
  ];

  const state = {wumps:0,total:0,clicks:0,frenzies:0,longestWolfStreak:0,owned:{},bought:{},buildMult:{},clickMult:1,genMult:1,clickWpsShare:0};
  buildings.forEach(b=>state.owned[b.id]=0);
  const SAVE_KEY='wump_clicker_save_v2';
  const isTouch=window.matchMedia('(hover: none)').matches;
  const FRENZY_MIN=5, FRENZY_MAX=15, FRENZY_MS=15000, FRENZY_STREAK_STEP=0.1; let frenzyUntil=0; let curFrenzyMult=FRENZY_MIN; let curFrenzyStreakBonus=0; let wolfSaltStreak=0; let ringAtMax=false;

  const SUF=['','K','M','B','T','Qa','Qi','Sx','Sp','Oc','No','Dc','UDc','DDc','TDc','QaDc','QiDc','SxDc','SpDc','OcDc','NoDc','Vg'];
  function fmt(n){
    if(n<1000) return (n>=100||Number.isInteger(n))?Math.floor(n).toString():n.toFixed(n<10?1:0);
    const tier=Math.floor(Math.log10(n)/3);
    if(tier<SUF.length){
      const scaled=n/Math.pow(1000,tier);
      return scaled.toFixed(scaled<10?2:scaled<100?1:0)+SUF[tier];
    }
    return n.toExponential(2).replace('e+','e');
  }
  const costOf=b=>Math.floor(b.base*Math.pow(1.15,state.owned[b.id]));
  const wpsOf =b=>b.wps*state.owned[b.id]*state.genMult*(state.buildMult[b.id]||1);
  const baseWps=()=>buildings.reduce((s,b)=>s+wpsOf(b),0);
  const totalAssets=()=>buildings.reduce((s,b)=>s+state.owned[b.id],0);
  const frenzyMult=()=>{
    if(performance.now()>=frenzyUntil) return 1;
    return state.bought.saltcure?curFrenzyMult*(1+curFrenzyStreakBonus):curFrenzyMult+curFrenzyStreakBonus;
  };
  const overwumpOn=()=>!!state.bought.overwump&&ringAtMax;
  const runtimeMult=()=>frenzyMult()*(overwumpOn()?2:1);
  const certMult=()=>state.bought.cert?1+0.01*totalAssets():1;
  const totalWps=()=>baseWps()*runtimeMult();
  const clickValue=()=>(state.clickMult*certMult()+baseWps()*state.clickWpsShare)*runtimeMult();
  const $=id=>document.getElementById(id);

  function buildShop(){
    const bEl=$('buildings');
    buildings.forEach(b=>{
      const btn=document.createElement('button');
      btn.className='svc'; btn.id='b_'+b.id;
      btn.innerHTML=
        '<span class="svc-ic">'+b.icon+'</span>'+
        '<span><span class="svc-name">'+b.name+'</span>'+
        '<span class="svc-desc">'+b.flavor+'</span>'+
        '<span class="svc-yield" id="y_'+b.id+'"></span></span>'+
        '<span class="svc-right"><span class="svc-cost" id="c_'+b.id+'">'+
          '<span class="coin"></span><span id="cn_'+b.id+'"></span></span>'+
        '<span class="svc-owned" id="o_'+b.id+'">0</span></span>';
      btn.addEventListener('click',()=>buy(b));
      bEl.appendChild(btn);
    });
    const uEl=$('upgrades');
    upgrades.forEach(u=>{
      const btn=document.createElement('button');
      btn.className='tool'; btn.id='u_'+u.id;
      btn.innerHTML='<span class="t-ic">'+u.icon+'</span><span class="t-owned" aria-hidden="true">✓</span>'+
        (u.id==='interest'?'<span class="t-rate" id="rate_'+u.id+'"></span>':'')+
        '<span class="tip"><b>'+u.name+'</b><br>'+u.desc+
        '<span class="c">Cost: '+fmt(u.cost)+' wumps</span></span>';
      btn.addEventListener('click',()=>onToolClick(u,btn));
      btn.addEventListener('mouseenter',()=>positionTip(btn));
      btn.addEventListener('focus',()=>positionTip(btn));
      uEl.appendChild(btn);
    });
  }

  // Mobile: first tap reveals the tooltip, second tap buys. Desktop: click buys, hover shows tip.
  function closeTips(){ document.querySelectorAll('.tool.tip-open').forEach(t=>t.classList.remove('tip-open')); }
  function positionTip(btn){
    const tip=btn.querySelector('.tip'); if(!tip) return;
    tip.style.transform='translateX(-50%)';
    const r=tip.getBoundingClientRect(), m=8; let shift=0;
    if(r.left<m) shift=m-r.left;
    else if(r.right>window.innerWidth-m) shift=(window.innerWidth-m)-r.right;
    if(shift) tip.style.transform='translateX(calc(-50% + '+shift.toFixed(1)+'px))';
  }
  function onToolClick(u,btn){
    if(isTouch && !btn.classList.contains('tip-open')){
      closeTips(); positionTip(btn); btn.classList.add('tip-open'); return;
    }
    btn.classList.remove('tip-open');
    buyUpgrade(u);
  }
  document.addEventListener('click',e=>{ if(!e.target.closest('.tool')) closeTips(); });

  function buy(b){ const c=costOf(b); if(state.wumps<c)return;
    state.wumps-=c; state.owned[b.id]++; render(); save(); }
  function buyUpgrade(u){ if(state.bought[u.id]||state.wumps<u.cost)return;
    if(u.unlock&&!u.unlock())return;
    state.wumps-=u.cost; state.bought[u.id]=true; if(u.apply) u.apply(state); render(); save(); }

  function render(){
    $('navBal').textContent=fmt(state.wumps);
    $('navWps').textContent=fmt(totalWps());
    $('count').textContent=fmt(state.wumps);
    $('wps').textContent=fmt(totalWps());
    $('pc').textContent=fmt(clickValue());
    $('cProcessed').textContent=fmt(state.total);
    $('cSatisfied').textContent=fmt(Math.floor(state.total/80)+state.clicks);
    $('cHours').textContent=fmt(totalWps());
    $('cGrumbles').textContent=fmt(totalAssets());
    buildings.forEach(b=>{
      const c=costOf(b),aff=state.wumps>=c;
      $('cn_'+b.id).textContent=fmt(c);
      $('c_'+b.id).className='svc-cost'+(aff?'':' cant');
      $('o_'+b.id).textContent=state.owned[b.id];
      $('y_'+b.id).textContent=state.owned[b.id]>0
        ? 'producing '+fmt(wpsOf(b))+'/sec' : '+'+fmt(b.wps*state.genMult*(state.buildMult[b.id]||1))+'/sec each';
      const btn=$('b_'+b.id); btn.disabled=!aff; btn.classList.toggle('affordable',aff);
    });
    upgrades.forEach(u=>{
      const btn=$('u_'+u.id),owned=!!state.bought[u.id],aff=state.wumps>=u.cost;
      const hidden=u.unlock&&!owned&&!u.unlock();
      btn.style.display=hidden?'none':'';
      btn.classList.toggle('owned',owned);
      btn.classList.toggle('affordable',!owned&&aff);
      btn.classList.toggle('cant',!owned&&!aff);
      btn.title=owned?u.name+' — owned':u.name;
      const costEl=btn.querySelector('.tip .c');
      if(costEl) costEl.textContent=owned?(u.id==='interest'?'Earning: +'+fmt(state.wumps*0.001)+'/s':'✓ Owned'):'Cost: '+fmt(u.cost)+' wumps';
      if(owned||aff) btn.classList.remove('tip-open');
    });
    updateInterestRate();
  }
  function updateInterestRate(){
    if(!state.bought.interest) return;
    const rate=state.wumps*0.001;
    const badge=$('rate_interest'); if(badge) badge.textContent='+'+fmt(rate)+'/s';
    const tipC=document.querySelector('#u_interest .tip .c'); if(tipC) tipC.textContent='Earning: +'+fmt(rate)+'/s';
  }

  const wumpBtn=$('wump'),floaters=$('floaters');

  // orbiting-text speed: idle spin that accelerates on click, then eases back down
  const ring=document.querySelector('.wump-ring');
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const R_BASE=14, R_MAX=960, R_BOOST=80, R_GRACE=450, R_DECAY=2.4;
  let ringAngle=0, ringVel=R_BASE, lastBoost=-1e9;

  const sparksEl=document.getElementById('sparks');
  let lastSpark=0;
  function emitSpark(){
    if(!sparksEl) return;
    const w=sparksEl.clientWidth||280, h=sparksEl.clientHeight||w;
    const cx=w/2, cy=h/2, r=w*0.36;
    const a=Math.random()*Math.PI*2, dist=w*0.16+Math.random()*w*0.14;
    const s=document.createElement('div'); s.className='spark';
    s.style.left=(cx+Math.cos(a)*r)+'px'; s.style.top=(cy+Math.sin(a)*r)+'px';
    s.style.setProperty('--tx',(Math.cos(a)*dist).toFixed(1)+'px');
    s.style.setProperty('--ty',(Math.sin(a)*dist).toFixed(1)+'px');
    const sz=(5+Math.random()*4).toFixed(1); s.style.width=sz+'px'; s.style.height=sz+'px';
    sparksEl.appendChild(s); setTimeout(()=>s.remove(),600);
  }
  function doClick(e){
    const gain=clickValue();
    state.wumps+=gain; state.total+=gain; state.clicks++;
    ringVel=Math.min(R_MAX, ringVel+R_BOOST); lastBoost=performance.now();
    wumpBtn.classList.add('pop'); setTimeout(()=>wumpBtn.classList.remove('pop'),80);
    const r=wumpBtn.getBoundingClientRect();
    let x=100,y=100; if(e&&e.clientX){x=e.clientX-r.left;y=e.clientY-r.top;}
    const f=document.createElement('div'); f.className='float'; f.textContent='+'+fmt(gain)+' wumps';
    f.style.left=x+'px'; f.style.top=y+'px'; floaters.appendChild(f);
    setTimeout(()=>f.remove(),1000); render();
  }
  wumpBtn.addEventListener('click',doClick);

  // "Build your wumpire" scrolls to the generators, offset for the sticky nav
  const scrollLink=document.querySelector('.scroll-down');
  if(scrollLink){
    scrollLink.addEventListener('click',e=>{
      e.preventDefault();
      const target=document.getElementById('tools');
      if(!target) return;
      const nav=document.querySelector('nav');
      const navH=nav?nav.offsetHeight:0;
      const y=target.getBoundingClientRect().top+window.pageYOffset-navH-8;
      window.scrollTo({top:y, behavior:reduceMotion?'auto':'smooth'});
    });
  }

  // mobile hamburger menu
  const hamburgerBtn=$('hamburgerBtn'), navLinks=$('navLinks');
  if(hamburgerBtn&&navLinks){
    const closeMenu=()=>{ navLinks.classList.remove('open'); hamburgerBtn.setAttribute('aria-expanded','false'); };
    hamburgerBtn.addEventListener('click',()=>{
      const open=navLinks.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded',open?'true':'false');
    });
    navLinks.addEventListener('click',e=>{ if(e.target.closest('a, button')) closeMenu(); });
    document.addEventListener('click',e=>{
      if(!navLinks.classList.contains('open')) return;
      if(!e.target.closest('#navLinks')&&!e.target.closest('#hamburgerBtn')) closeMenu();
    });
    window.addEventListener('resize',()=>{ if(window.innerWidth>640) closeMenu(); });
  }

  // ---- Wolf Salt bonus: bounces across the screen; click it for a Wump Frenzy ----
  const WOLF_SRC="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6CAYAAACI7Fo9AAAAGmVYSWZNTQAqAAAACAABARIAAwAAAAEAAQAAAAAAABPAdecAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAVFaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49J++7vycgaWQ9J1c1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCc/Pgo8eDp4bXBtZXRhIHhtbG5zOng9J2Fkb2JlOm5zOm1ldGEvJz4KPHJkZjpSREYgeG1sbnM6cmRmPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjJz4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOkF0dHJpYj0naHR0cDovL25zLmF0dHJpYnV0aW9uLmNvbS9hZHMvMS4wLyc+CiAgPEF0dHJpYjpBZHM+CiAgIDxyZGY6U2VxPgogICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSdSZXNvdXJjZSc+CiAgICAgPEF0dHJpYjpDcmVhdGVkPjIwMjYtMDctMDI8L0F0dHJpYjpDcmVhdGVkPgogICAgIDxBdHRyaWI6RGF0YT57JnF1b3Q7ZG9jJnF1b3Q7OiZxdW90O0RBSE9Fa2hHUG1FJnF1b3Q7LCZxdW90O3VzZXImcXVvdDs6JnF1b3Q7VUFFcXpnVEtUZ0EmcXVvdDssJnF1b3Q7YnJhbmQmcXVvdDs6JnF1b3Q7QkFFcXpvOTRIWWMmcXVvdDt9PC9BdHRyaWI6RGF0YT4KICAgICA8QXR0cmliOkV4dElkPjY4ZThiMTY2LTE0NzMtNGI4Ny1hMTBmLTFkMzMyMGMyMmFkMDwvQXR0cmliOkV4dElkPgogICAgIDxBdHRyaWI6RmJJZD41MjUyNjU5MTQxNzk1ODA8L0F0dHJpYjpGYklkPgogICAgIDxBdHRyaWI6VG91Y2hUeXBlPjI8L0F0dHJpYjpUb3VjaFR5cGU+CiAgICA8L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvQXR0cmliOkFkcz4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1s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";
  const banner=document.getElementById('frenzyBanner');
  let wolf=null, wolfRAF=null, wolfTimer=null;

  function startFrenzy(){
    curFrenzyMult=Math.floor(FRENZY_MIN+Math.random()*(FRENZY_MAX-FRENZY_MIN+1));
    wolfSaltStreak++;
    if(wolfSaltStreak>state.longestWolfStreak) state.longestWolfStreak=wolfSaltStreak;
    curFrenzyStreakBonus=Math.round(wolfSaltStreak*FRENZY_STREAK_STEP*10)/10;
    frenzyUntil=performance.now()+FRENZY_MS; state.frenzies++; save();
  }
  function removeWolf(){
    if(wolfRAF){cancelAnimationFrame(wolfRAF); wolfRAF=null;}
    if(wolfTimer){clearTimeout(wolfTimer); wolfTimer=null;}
    if(wolf){ const w=wolf; wolf=null; w.style.opacity='0'; setTimeout(()=>w.remove(),320); }
  }
  function spawnWolf(){
    if(wolf) return;
    const size=Math.min(90, Math.max(58, window.innerWidth*0.13));
    wolf=document.createElement('div'); wolf.id='wolfSalt';
    wolf.style.cssText='width:'+size+'px;height:'+size+'px;opacity:0';
    wolf.innerHTML='<span class="tag">Wolf Salt!</span><img src="'+WOLF_SRC+'" alt="Wolf Salt">';
    wolf.addEventListener('pointerdown',()=>{ startFrenzy(); removeWolf(); });
    document.body.appendChild(wolf);
    requestAnimationFrame(()=>{ if(wolf) wolf.style.opacity='1'; });

    if(reduceMotion){
      const W=window.innerWidth,H=window.innerHeight;
      const x=Math.random()*(W-size-40)+20, y=Math.random()*(H-size-220)+140;
      wolf.style.transform='translate('+x+'px,'+y+'px)';
      wolfTimer=setTimeout(()=>{ wolfSaltStreak=0; removeWolf(); },6500); return;
    }
    let x=Math.random()*(window.innerWidth-size), y=Math.random()*(window.innerHeight-size);
    const spd=280, ang=Math.random()*Math.PI*2;
    let vx=Math.cos(ang)*spd, vy=Math.sin(ang)*spd;
    const born=performance.now(); let lastT=born; const LIFE=11000;
    (function step(now){
      if(!wolf) return;
      const W=window.innerWidth, H=window.innerHeight, dt=Math.min(0.05,(now-lastT)/1000); lastT=now;
      x+=vx*dt; y+=vy*dt;
      if(x<=0){x=0;vx=Math.abs(vx);} else if(x>=W-size){x=W-size;vx=-Math.abs(vx);}
      if(y<=0){y=0;vy=Math.abs(vy);} else if(y>=H-size){y=H-size;vy=-Math.abs(vy);}
      wolf.style.transform='translate('+x+'px,'+y+'px)';
      if(now-born>LIFE){ wolfSaltStreak=0; removeWolf(); return; }
      wolfRAF=requestAnimationFrame(step);
    })(born);
  }
  function scheduleWolf(){
    setTimeout(()=>{ spawnWolf(); scheduleWolf(); }, 120000+Math.random()*180000);
  }
  scheduleWolf();

  // ---- Flex: copyable emoji scoreboard ----
  const RANKS=[
    [0,'Frump Intern','🌱'],[1e3,'Wump Trainee','🐣'],[1e4,'Wump Apprentice','🔧'],
    [1e5,'Wump Technician','⚙️'],[1e6,'Wumpsmith','🔨'],[1e7,'Senior Wumpsmith','🛠️'],
    [1e8,'Wumpmaster','👑'],[1e10,'Wump Baron','🎩'],[1e12,'Wumpire','🧛'],
    [1e15,'Wump Overlord','🌌'],[1e18,'The Wumprcent','💎']
  ];
  function rankOf(t){ let r=RANKS[0]; for(const x of RANKS) if(t>=x[0]) r=x; return r; }
  function buildScoreText(){
    const r=rankOf(state.total);
    const hi=[...buildings].reverse().find(b=>state.owned[b.id]>0);
    const f=state.frenzies;
    const lines=[
      '🐺 WUMP STATUS 🐺',
      r[2]+' Rank: '+r[1],
      '💰 '+fmt(state.total)+' lifetime wumps',
      '⚡ '+fmt(baseWps())+'/sec · 🏭 '+fmt(totalAssets())+' generators',
      '🔥 '+f+' Wolf Salt frenz'+(f===1?'y':'ies')+' caught',
      '🧂 Longest Wolf Salt streak: '+state.longestWolfStreak
    ];
    if(hi) lines.push('🏆 Top tier: '+hi.name+' '+hi.icon);
    lines.push('— build your wumpire · build.wumpr.com');
    return lines.join('\n');
  }
  function copyText(txt){
    if(navigator.clipboard&&navigator.clipboard.writeText) return navigator.clipboard.writeText(txt);
    return new Promise((res,rej)=>{
      const ta=document.createElement('textarea'); ta.value=txt;
      ta.style.cssText='position:fixed;opacity:0'; document.body.appendChild(ta); ta.select();
      try{ document.execCommand('copy'); res(); }catch(e){ rej(e); } ta.remove();
    });
  }
  const flexModal=$('flexModal'), flexText=$('flexText'), flexCopy=$('flexCopy');
  $('flexBtn').addEventListener('click',()=>{
    flexText.textContent=buildScoreText(); flexCopy.textContent='Copy to clipboard'; flexModal.hidden=false;
  });
  $('flexClose').addEventListener('click',()=>{ flexModal.hidden=true; });
  flexModal.addEventListener('click',e=>{ if(e.target===flexModal) flexModal.hidden=true; });
  flexCopy.addEventListener('click',()=>{
    copyText(flexText.textContent)
      .then(()=>{ flexCopy.textContent='Copied! ✓'; })
      .catch(()=>{ flexCopy.textContent='Select text & press Ctrl+C'; });
  });

  // ---- Save/Load modal ----
  const saveModal=$('saveModal'), tabExport=$('tabExport'), tabImport=$('tabImport'),
    exportPane=$('exportPane'), importPane=$('importPane'), exportText=$('exportText'),
    exportCopy=$('exportCopy'), importText=$('importText'), importBtn=$('importBtn'), importMsg=$('importMsg');
  function showExportTab(){
    tabExport.classList.add('active'); tabImport.classList.remove('active');
    exportPane.hidden=false; importPane.hidden=true;
    exportText.value=encodeSaveCode(); exportCopy.textContent='Copy to clipboard';
  }
  function showImportTab(){
    tabImport.classList.add('active'); tabExport.classList.remove('active');
    importPane.hidden=false; exportPane.hidden=true;
    importMsg.textContent=''; importMsg.className='save-msg';
  }
  $('saveBtn').addEventListener('click',()=>{ showExportTab(); saveModal.hidden=false; });
  $('saveClose').addEventListener('click',()=>{ saveModal.hidden=true; });
  saveModal.addEventListener('click',e=>{ if(e.target===saveModal) saveModal.hidden=true; });
  tabExport.addEventListener('click',showExportTab);
  tabImport.addEventListener('click',showImportTab);
  exportCopy.addEventListener('click',()=>{
    copyText(exportText.value)
      .then(()=>{ exportCopy.textContent='Copied! ✓'; })
      .catch(()=>{ exportCopy.textContent='Select text & press Ctrl+C'; });
  });
  importBtn.addEventListener('click',()=>{
    try{
      const d=decodeSaveCode(importText.value);
      hydrateState(d); render(); save();
      importMsg.textContent='Save loaded! ✓'; importMsg.className='save-msg ok';
      importText.value='';
    }catch(e){
      importMsg.textContent=e.message||'Could not read that save code.'; importMsg.className='save-msg err';
    }
  });

  // ---- Reset game ----
  const resetModal=$('resetModal'), resetBtn=$('resetBtn'), resetClose=$('resetClose'),
    resetCancel=$('resetCancel'), resetConfirm=$('resetConfirm');
  resetBtn.addEventListener('click',()=>{ resetModal.hidden=false; });
  resetClose.addEventListener('click',()=>{ resetModal.hidden=true; });
  resetCancel.addEventListener('click',()=>{ resetModal.hidden=true; });
  resetModal.addEventListener('click',e=>{ if(e.target===resetModal) resetModal.hidden=true; });
  resetConfirm.addEventListener('click',()=>{
    hydrateState({});
    try{ localStorage.removeItem(SAVE_KEY); }catch(e){}
    location.reload();
  });

  let last=performance.now();
  function loop(now){
    const dt=(now-last)/1000; last=now;
    const inc=totalWps()*dt;
    if(inc>0){state.wumps+=inc; state.total+=inc;}
    if(state.bought.interest){ const g=state.wumps*0.001*dt; state.wumps+=g; state.total+=g; }
    updateInterestRate();
    $('navBal').textContent=fmt(state.wumps);
    $('count').textContent=fmt(state.wumps);
    $('cProcessed').textContent=fmt(state.total);
    $('navWps').textContent=fmt(totalWps());
    $('wps').textContent=fmt(totalWps());
    $('cHours').textContent=fmt(totalWps());
    buildings.forEach(b=>{ const aff=state.wumps>=costOf(b),btn=$('b_'+b.id);
      if(btn.disabled===aff){btn.disabled=!aff; btn.classList.toggle('affordable',aff);
        $('c_'+b.id).className='svc-cost'+(aff?'':' cant');} });
    upgrades.forEach(u=>{ if(state.bought[u.id])return; const aff=state.wumps>=u.cost,btn=$('u_'+u.id);
      if(btn.classList.contains('affordable')!==aff){
        btn.classList.toggle('affordable',aff); btn.classList.toggle('cant',!aff); } });
    if(ring&&!reduceMotion){
      if(now-lastBoost>R_GRACE){
        ringVel=R_BASE+(ringVel-R_BASE)*Math.exp(-R_DECAY*dt);
        if(ringVel<R_BASE+0.05) ringVel=R_BASE;
      }
      ringAngle=(ringAngle+ringVel*dt)%360;
      ring.style.transform='rotate('+ringAngle+'deg)';
      ringAtMax=ringVel>=R_MAX-1;
      wumpBtn.classList.toggle('charged',ringAtMax);
      if(ringAtMax && now-lastSpark>30){
        lastSpark=now; emitSpark(); if(Math.random()<0.6) emitSpark();
      }
    } else ringAtMax=false;
    if(banner){
      if(performance.now()<frenzyUntil){
        const streakTxt=curFrenzyStreakBonus>0?(state.bought.saltcure?' ×'+(1+curFrenzyStreakBonus).toFixed(1)+' streak':' +'+curFrenzyStreakBonus.toFixed(1)+'x streak'):'';
        banner.textContent='🐺 WUMP FRENZY ×'+curFrenzyMult+streakTxt+' · '+Math.ceil((frenzyUntil-performance.now())/1000)+'s';
        banner.classList.add('on');
      } else banner.classList.remove('on');
    }
    requestAnimationFrame(loop);
  }

  function snapshotState(){
    return {v:1,wumps:state.wumps,total:state.total,clicks:state.clicks,frenzies:state.frenzies,
      longestWolfStreak:state.longestWolfStreak,
      owned:state.owned,bought:state.bought,buildMult:state.buildMult,clickMult:state.clickMult,
      genMult:state.genMult,clickWpsShare:state.clickWpsShare};
  }
  function hydrateState(d){
    Object.assign(state,{wumps:d.wumps||0,total:d.total||0,clicks:d.clicks||0,frenzies:d.frenzies||0,
      longestWolfStreak:d.longestWolfStreak||0,
      clickMult:d.clickMult||1,genMult:d.genMult||1,clickWpsShare:d.clickWpsShare||0});
    buildings.forEach(b=>state.owned[b.id]=(d.owned&&d.owned[b.id])||0);
    state.bought=(d.bought&&typeof d.bought==='object')?d.bought:{};
    state.buildMult=(d.buildMult&&typeof d.buildMult==='object')?d.buildMult:{};
  }
  function save(){
    try{ localStorage.setItem(SAVE_KEY,JSON.stringify(snapshotState())); }catch(e){} }
  function load(){
    try{
      const raw=localStorage.getItem(SAVE_KEY);
      if(raw) hydrateState(JSON.parse(raw));
    }catch(e){}
  }

  // ---- Save codes: obfuscated, portable export/import string ----
  const CODE_PREFIX='WUMP1';
  const CODE_KEY='wumpr-save-code-key-2024';
  function xorStr(str,key){
    let out='';
    for(let i=0;i<str.length;i++) out+=String.fromCharCode(str.charCodeAt(i)^key.charCodeAt(i%key.length));
    return out;
  }
  function hashStr(str){
    let h=0;
    for(let i=0;i<str.length;i++) h=(h*31+str.charCodeAt(i))>>>0;
    return h.toString(36);
  }
  function encodeSaveCode(){
    const payload=JSON.stringify(snapshotState());
    const b64=btoa(xorStr(payload,CODE_KEY));
    return CODE_PREFIX+'.'+hashStr(payload)+'.'+b64;
  }
  function decodeSaveCode(code){
    const parts=String(code).replace(/\s+/g,'').split('.');
    if(parts.length!==3||parts[0]!==CODE_PREFIX) throw new Error("That doesn't look like a wump save code.");
    const [,checksum,b64]=parts;
    let payload;
    try{ payload=xorStr(atob(b64),CODE_KEY); }catch(e){ throw new Error('Save code is corrupted.'); }
    if(hashStr(payload)!==checksum) throw new Error('Save code is corrupted.');
    let d;
    try{ d=JSON.parse(payload); }catch(e){ throw new Error('Save code is corrupted.'); }
    return d;
  }

  buildShop();
  load(); render(); requestAnimationFrame(loop);
  setInterval(save,10000);
  window.addEventListener('beforeunload',save);
})();
