/**
 * Lawson at Dusk — startup animation.
 *
 * Injected into the initial HTML by index.js, before the Harness app mounts.
 * The photograph is served by the host half; this file is plain browser JS,
 * has no imports, and waits for no network beyond that same-origin image.
 */
;(function () {
  'use strict'

  if (typeof document === 'undefined') return
  if (window.__LAWSON_BOOT__) return

  var ROOT_ID = 'lfs-boot-root'
  var STYLE_ID = 'lfs-boot-style'
  var RUNNING = null
  var CANCELLED = false
  var REDUCED = false
  try {
    REDUCED = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  } catch (error) {
    REDUCED = false
  }

  var CSS = `
#${ROOT_ID}{
  --lfs-cream:#f3eee3;
  --lfs-muted:#b3c0c7;
  --lfs-dim:#7f939c;
  --lfs-peach:#e6a07a;
  --lfs-blue:#567b9c;
  --lfs-mono:ui-monospace,"SFMono-Regular","Cascadia Code","Roboto Mono",Consolas,monospace;
  --lfs-serif:"Iowan Old Style","Palatino Linotype","Book Antiqua","Songti SC","STSong","Noto Serif SC","Source Han Serif SC","Noto Serif CJK SC","SimSun",Georgia,serif;
  --lfs-sans:"Segoe UI Variable Display","Segoe UI",Inter,"PingFang SC","Microsoft YaHei",Arial,sans-serif;
  position:fixed;inset:0;z-index:2147483200;overflow:hidden;
  background:#07121a;color:var(--lfs-cream);
  font-family:var(--lfs-sans);-webkit-font-smoothing:antialiased;text-rendering:geometricPrecision;
  font-variant-numeric:tabular-nums;cursor:default;user-select:none;
  opacity:1;transform:scale(1);
  transition:opacity 1s ease,filter 1.05s ease,transform 1.15s cubic-bezier(.76,0,.24,1);
}
#${ROOT_ID} *{box-sizing:border-box;margin:0;padding:0;}
#${ROOT_ID}::before{
  content:"";position:absolute;inset:0;z-index:20;pointer-events:none;
  background:
    linear-gradient(116deg,rgba(255,255,255,.045),transparent 32%,rgba(255,226,199,.035) 60%,transparent 80%),
    linear-gradient(180deg,rgba(2,10,16,.10),transparent 20%,transparent 72%,rgba(1,8,13,.28));
  mix-blend-mode:screen;
}
#${ROOT_ID}.is-out{opacity:0;filter:blur(5px);transform:scale(1.012);pointer-events:none;}

.lfs-scene{position:absolute;inset:0;overflow:hidden;isolation:isolate;background:
  radial-gradient(48% 42% at 53% 26%,rgba(236,178,146,.35),transparent 70%),
  linear-gradient(180deg,#243d57 0%,#7a8295 48%,#d3a38d 70%,#111c28 100%);}
.lfs-camera{
  position:absolute;inset:-3%;
  animation:lfs-camera 48s ease-in-out infinite alternate;
}
.lfs-photo{
  position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 52%;
  opacity:0;filter:blur(9px) brightness(.86) saturate(1.02);
  transition:opacity 1.8s ease,filter 2.5s cubic-bezier(.16,1,.3,1);
}
#${ROOT_ID}.is-s1 .lfs-photo{opacity:1;filter:blur(0) brightness(1) saturate(1.02);}
.lfs-fallback{
  position:absolute;inset:0;
  background:
    radial-gradient(40% 30% at 52% 24%,rgba(255,190,157,.42),transparent 68%),
    linear-gradient(180deg,#2b4a67 0%,#8b8fa0 48%,#e6b293 67%,#17232e 100%);
}
.lfs-storeglow{
  position:absolute;left:4%;right:4%;top:54%;height:28%;pointer-events:none;
  background:
    radial-gradient(44% 72% at 50% 48%,rgba(255,218,168,.36),rgba(255,207,154,.08) 49%,transparent 76%),
    radial-gradient(18% 44% at 82% 58%,rgba(255,214,172,.18),transparent 75%);
  filter:blur(11px);mix-blend-mode:screen;opacity:.84;
  animation:lfs-storelight 7.5s ease-in-out infinite alternate;
}
.lfs-skyglow{
  position:absolute;inset:-10%;pointer-events:none;mix-blend-mode:screen;
  background:
    radial-gradient(42% 38% at 56% 22%,rgba(255,205,175,.18),transparent 72%),
    radial-gradient(50% 42% at 10% 6%,rgba(94,137,171,.13),transparent 70%);
  animation:lfs-skydrift 30s ease-in-out infinite alternate;
}
.lfs-mist{
  position:absolute;left:-15%;width:132%;height:10vh;border-radius:50%;pointer-events:none;
  background:linear-gradient(90deg,rgba(224,231,235,0),rgba(232,236,239,.34) 17%,rgba(244,241,236,.48) 50%,rgba(226,232,236,.28) 79%,rgba(224,231,235,0));
  filter:blur(20px);mix-blend-mode:screen;
}
.lfs-mist.m1{top:39%;opacity:.48;animation:lfs-mist 75s linear infinite;}
.lfs-mist.m2{top:47%;opacity:.4;animation:lfs-mist 57s linear infinite reverse;}
.lfs-mist.m3{top:59%;height:8vh;opacity:.25;animation:lfs-mist 102s linear infinite;}
.lfs-dust{
  position:absolute;inset:0;pointer-events:none;opacity:.28;
  background-image:
    radial-gradient(circle,rgba(255,241,211,.8) 0 1px,transparent 1.8px),
    radial-gradient(circle,rgba(255,228,193,.55) 0 1px,transparent 1.6px);
  background-size:300px 240px,360px 280px;
  background-position:0 0,140px 100px;
  -webkit-mask-image:linear-gradient(180deg,rgba(0,0,0,.08),#000 23%,#000 67%,transparent 92%);
  mask-image:linear-gradient(180deg,rgba(0,0,0,.08),#000 23%,#000 67%,transparent 92%);
  animation:lfs-dust 36s linear infinite;
}
.lfs-grade{
  position:absolute;inset:0;pointer-events:none;
  background:
    linear-gradient(90deg,rgba(3,14,23,.34),transparent 38%,transparent 72%,rgba(3,14,23,.12)),
    linear-gradient(180deg,rgba(3,14,23,.22),transparent 22%,transparent 60%,rgba(2,11,18,.50));
}
.lfs-grain{
  position:absolute;inset:0;pointer-events:none;opacity:.055;
  background-image:radial-gradient(rgba(2,12,18,.9) .55px,transparent .8px);
  background-size:3px 3px;mix-blend-mode:multiply;
}
.lfs-vignette{
  position:absolute;inset:0;pointer-events:none;
  background:
    radial-gradient(126% 106% at 50% 44%,transparent 46%,rgba(1,9,14,.40) 100%),
    linear-gradient(180deg,rgba(1,9,14,.12),transparent 20%,transparent 74%,rgba(1,8,12,.30));
}

.lfs-top{
  position:absolute;left:4.6vw;right:4.6vw;top:4.5vh;z-index:5;
  display:flex;align-items:center;justify-content:space-between;gap:24px;
  font-family:var(--lfs-mono);font-size:9.5px;letter-spacing:.24em;text-transform:uppercase;
  color:rgba(224,233,236,.78);opacity:0;transform:translateY(-8px);
  transition:opacity .9s ease .1s,transform 1s cubic-bezier(.16,1,.3,1) .1s;
}
.lfs-brand{display:flex;align-items:center;gap:11px;color:var(--lfs-cream);font-weight:600;}
.lfs-mark{
  width:14px;height:14px;border-radius:50%;flex:0 0 auto;
  background:radial-gradient(circle at 38% 32%,#fff5e2 0 17%,#ecb58e 44%,#9f6b53 100%);
  box-shadow:0 0 0 1px rgba(255,242,226,.4),0 0 16px rgba(233,170,132,.55);
}
.lfs-topmeta{display:flex;align-items:center;gap:18px;white-space:nowrap;}
.lfs-topmeta .sep{width:34px;height:1px;background:rgba(207,224,229,.28);}
.lfs-topmeta .time{color:var(--lfs-cream);letter-spacing:.12em;}

.lfs-plaque{
  position:absolute;left:5vw;bottom:12.5vh;width:min(44vw,640px);z-index:4;
  padding:clamp(24px,3.2vh,38px) clamp(25px,3.4vw,44px) clamp(22px,3vh,34px);
  border:1px solid rgba(224,238,241,.18);border-radius:24px;
  background:linear-gradient(132deg,rgba(4,17,27,.72),rgba(7,23,34,.46) 58%,rgba(18,37,49,.25));
  box-shadow:
    0 34px 100px rgba(0,7,12,.48),
    inset 0 1px 0 rgba(246,255,252,.12),
    inset 0 -1px 0 rgba(246,255,252,.03);
  -webkit-backdrop-filter:blur(25px) saturate(118%);
  backdrop-filter:blur(25px) saturate(118%);
  opacity:0;transform:translateY(26px);
  transition:opacity 1.2s ease,transform 1.55s cubic-bezier(.16,1,.3,1);
  overflow:hidden;
}
.lfs-plaque::before{
  content:"";position:absolute;left:16px;top:16px;width:34px;height:34px;
  border-left:1px solid rgba(230,160,122,.72);border-top:1px solid rgba(230,160,122,.72);
  pointer-events:none;opacity:.8;
}
.lfs-plaque::after{
  content:"";position:absolute;right:16px;bottom:16px;width:34px;height:34px;
  border-right:1px solid rgba(230,160,122,.5);border-bottom:1px solid rgba(230,160,122,.5);
  pointer-events:none;opacity:.7;
}
.lfs-sheen{
  position:absolute;left:-45%;top:-30%;width:42%;height:160%;
  background:linear-gradient(98deg,rgba(255,255,255,0),rgba(255,245,226,.16),rgba(255,255,255,0));
  transform:rotate(12deg) translateX(-80%);pointer-events:none;opacity:0;
}
.lfs-stripe{
  height:3px;width:92px;border-radius:2px;margin-bottom:14px;opacity:.9;
  background:linear-gradient(90deg,#2f6cb5 0 33%,#edf2f1 33% 67%,#2f6cb5 67% 100%);
  box-shadow:0 0 12px color-mix(in srgb,var(--lfs-peach) 24%,transparent);
}
.lfs-kicker{
  position:relative;display:flex;align-items:center;gap:12px;
  font-family:var(--lfs-mono);font-size:9px;letter-spacing:.28em;text-transform:uppercase;
  color:var(--lfs-muted);white-space:nowrap;
}
.lfs-kicker i{display:block;width:0;height:1px;background:var(--lfs-peach);transition:width 1s cubic-bezier(.16,1,.3,1) .35s;}
.lfs-kicker b{font-weight:500;color:var(--lfs-peach);letter-spacing:.18em;}
.lfs-title{
  position:relative;margin-top:clamp(16px,2.5vh,27px);
  font-family:var(--lfs-serif);font-weight:500;font-size:clamp(52px,7.2vw,104px);
  line-height:1.05;letter-spacing:.09em;color:var(--lfs-cream);white-space:nowrap;
}
.lfs-line{display:block;overflow:hidden;padding-bottom:.08em;}
.lfs-line > span{display:block;transform:translateY(112%);transition:transform 1.3s cubic-bezier(.16,1,.3,1);}
.lfs-title .dot{
  display:inline-block;width:.22em;height:.22em;margin-left:.12em;border-radius:50%;
  background:var(--lfs-peach);vertical-align:.14em;box-shadow:0 0 16px rgba(230,160,122,.55);
}
.lfs-en{
  position:relative;margin-top:clamp(12px,1.8vh,20px);
  font-family:var(--lfs-mono);font-size:clamp(8.5px,.82vw,10.5px);letter-spacing:.32em;
  text-transform:uppercase;color:var(--lfs-peach);
}
.lfs-rule{
  position:relative;height:1px;margin-top:clamp(17px,2.4vh,26px);
  background:linear-gradient(90deg,rgba(226,240,236,.28),rgba(226,240,236,.04));
  transform:scaleX(0);transform-origin:0 50%;
  transition:transform 1.15s cubic-bezier(.16,1,.3,1) .4s;
}
.lfs-rule::before{content:"";position:absolute;left:0;top:0;width:40px;height:1px;background:var(--lfs-peach);}
.lfs-note{
  position:relative;margin-top:clamp(13px,1.9vh,20px);
  font-size:clamp(12px,1vw,14px);line-height:1.9;letter-spacing:.035em;
  color:rgba(220,232,233,.82);
}
.lfs-note em{font-style:normal;color:var(--lfs-cream);}
.lfs-note .en{
  display:block;margin-top:6px;font-family:var(--lfs-mono);font-size:9px;line-height:1.8;
  letter-spacing:.15em;text-transform:uppercase;color:rgba(166,188,194,.72);
}
.lfs-stamp{
  position:relative;margin-top:clamp(11px,1.6vh,16px);
  font-family:var(--lfs-mono);font-size:8px;line-height:1.7;letter-spacing:.18em;
  text-align:right;text-transform:uppercase;color:rgba(162,184,190,.56);
}

.lfs-foot{
  position:absolute;left:4.6vw;right:4.6vw;bottom:4.2vh;z-index:5;
  display:flex;align-items:flex-end;justify-content:space-between;gap:30px;
  opacity:0;transform:translateY(10px);
  transition:opacity .9s ease .15s,transform 1.1s cubic-bezier(.16,1,.3,1) .15s;
}
.lfs-progress{width:min(32vw,360px);}
.lfs-progresshead{
  display:flex;align-items:baseline;justify-content:space-between;gap:20px;margin-bottom:9px;
  font-family:var(--lfs-mono);font-size:9px;letter-spacing:.22em;text-transform:uppercase;
  color:rgba(166,188,194,.84);
}
.lfs-progresshead .pct{display:flex;align-items:baseline;gap:3px;color:var(--lfs-cream);font-size:22px;letter-spacing:.02em;}
.lfs-progresshead .pct i{font-style:normal;font-size:9px;color:var(--lfs-muted);}
.lfs-track{position:relative;height:1px;background:rgba(197,219,224,.18);overflow:visible;}
.lfs-track > i{
  position:absolute;left:0;top:0;bottom:0;width:0;
  background:linear-gradient(90deg,rgba(230,160,122,.4),var(--lfs-peach));
  box-shadow:0 0 10px rgba(230,160,122,.45);
}
.lfs-track::after{
  content:"";position:absolute;inset:0;opacity:.35;
  background-image:repeating-linear-gradient(90deg,rgba(197,219,224,.42) 0 1px,transparent 1px 12.5%);
}
.lfs-marker{
  position:absolute;left:0;top:-3px;width:7px;height:7px;border-radius:50%;
  background:var(--lfs-cream);box-shadow:0 0 0 3px rgba(230,160,122,.25),0 0 12px rgba(255,239,218,.5);
  transform:translateX(-50%);
}
.lfs-ticks{
  height:5px;margin-top:8px;opacity:.4;
  background-image:repeating-linear-gradient(90deg,rgba(197,219,224,.42) 0 1px,transparent 1px 16px);
}
.lfs-skip{
  appearance:none;border:1px solid rgba(220,238,241,.24);
  background:rgba(5,20,29,.36);
  -webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);
  color:rgba(214,229,231,.78);border-radius:999px;padding:8px 15px;
  font-family:var(--lfs-mono);font-size:9px;letter-spacing:.16em;text-transform:uppercase;
  cursor:pointer;white-space:nowrap;
  transition:background .2s ease,color .2s ease,border-color .2s ease;
}
.lfs-skip span{color:rgba(166,188,194,.6);margin-left:3px;}
.lfs-skip:hover{background:rgba(255,244,228,.12);border-color:rgba(255,236,216,.44);color:var(--lfs-cream);}
.lfs-skip:focus-visible{outline:2px solid var(--lfs-peach);outline-offset:3px;}
.lfs-wash{
  position:absolute;inset:0;pointer-events:none;opacity:0;
  background:linear-gradient(180deg,rgba(4,16,24,.06),rgba(229,237,233,.08) 56%,rgba(241,224,204,.16));
  transition:opacity .55s ease;
}
.lfs-sr{
  position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;
  clip:rect(0,0,0,0);white-space:nowrap;border:0;
}

#${ROOT_ID}.is-s1 .lfs-top,
#${ROOT_ID}.is-s1 .lfs-foot{opacity:1;transform:translateY(0);}
#${ROOT_ID}.is-s2 .lfs-plaque{opacity:1;transform:translateY(0);}
#${ROOT_ID}.is-s2 .lfs-kicker i{width:46px;}
#${ROOT_ID}.is-s2 .lfs-line > span{transform:translateY(0);}
#${ROOT_ID}.is-s2 .lfs-rule{transform:scaleX(1);}
#${ROOT_ID}.is-s3 .lfs-sheen{
  opacity:1;transform:rotate(12deg) translateX(340%);
  transition:transform 1.4s cubic-bezier(.4,0,.2,1),opacity .2s ease;
}
#${ROOT_ID}.is-s3 .lfs-note{color:rgba(231,241,235,.9);}

#${ROOT_ID}.is-out .lfs-plaque{opacity:0;transform:translateY(22px);transition:opacity .5s ease,transform .8s cubic-bezier(.76,0,.24,1);}
#${ROOT_ID}.is-out .lfs-top,
#${ROOT_ID}.is-out .lfs-foot{opacity:0;transform:translateY(-8px);transition:opacity .35s ease,transform .45s ease;}
#${ROOT_ID}.is-out .lfs-wash{opacity:1;}

@keyframes lfs-camera{
  from{transform:scale(1.035) translate3d(0,0,0);}
  to{transform:scale(1.085) translate3d(-.8%,-.5%,0);}
}
@keyframes lfs-storelight{
  from{opacity:.72;}
  to{opacity:1;}
}
@keyframes lfs-skydrift{
  from{transform:translate3d(-1%,0,0);opacity:.7;}
  to{transform:translate3d(1.2%,-.4%,0);opacity:1;}
}
@keyframes lfs-mist{
  from{transform:translate3d(-5vw,0,0) scaleX(.96);}
  to{transform:translate3d(7vw,-.4vh,0) scaleX(1.06);}
}
@keyframes lfs-dust{
  from{background-position:0 0,140px 100px;}
  to{background-position:170px -230px,-120px -150px;}
}
@media (max-width: 860px){
  .lfs-plaque{left:6vw;right:6vw;bottom:13vh;width:auto;padding:24px 24px 22px;border-radius:20px;}
  .lfs-title{font-size:clamp(38px,12.2vw,80px);letter-spacing:.06em;}
  .lfs-kicker{font-size:8px;letter-spacing:.17em;white-space:normal;}
  .lfs-en{font-size:8px;letter-spacing:.2em;}
  .lfs-top{left:5vw;right:5vw;font-size:8px;letter-spacing:.16em;}
  .lfs-topmeta .sep,.lfs-topmeta .place{display:none;}
  .lfs-foot{left:5vw;right:5vw;bottom:3.4vh;flex-direction:column;align-items:stretch;gap:18px;}
  .lfs-progress{width:100%;}
  .lfs-skip{align-self:flex-end;}
}
@media (max-height: 660px){
  .lfs-plaque{padding-top:20px;padding-bottom:20px;bottom:14vh;}
  .lfs-title{font-size:clamp(38px,6.2vw,68px);margin-top:11px;}
  .lfs-note .en{display:none;}
  .lfs-rule{margin-top:11px;}
  .lfs-note{margin-top:9px;line-height:1.65;}
}
@media (prefers-reduced-motion: reduce){
  #${ROOT_ID},#${ROOT_ID} *{animation:none !important;transition-duration:1ms !important;}
}
`

  var HTML = `
<div class="lfs-scene" aria-hidden="true">
  <div class="lfs-fallback"></div>
  <div class="lfs-camera">
    <img class="lfs-photo" data-lfs-photo src="/lawson-fuji-skin/bg.jpg" alt="">
    <div class="lfs-storeglow"></div>
    <div class="lfs-skyglow"></div>
  </div>
  <div class="lfs-mist m1"></div>
  <div class="lfs-mist m2"></div>
  <div class="lfs-mist m3"></div>
  <div class="lfs-dust"></div>
  <div class="lfs-grade"></div>
  <div class="lfs-grain"></div>
  <div class="lfs-vignette"></div>
</div>

<div class="lfs-top">
  <div class="lfs-brand"><span class="lfs-mark"></span><span>DEEPSEEK HARNESS</span></div>
  <div class="lfs-topmeta">
    <span class="place">FUJI / JAPAN · 18:40</span>
    <span class="sep"></span>
    <span class="time" data-lfs-time>--:--</span>
  </div>
</div>

<section class="lfs-plaque">
  <div class="lfs-sheen"></div>
  <div class="lfs-stripe"></div>
  <div class="lfs-kicker"><i></i><span><b>A LAWSON AT DUSK</b> &nbsp;/&nbsp; 18:40</span></div>
  <h1 class="lfs-title"><span class="lfs-line"><span>富士山下<span class="dot"></span></span></span></h1>
  <p class="lfs-en">THE MOUNTAIN, THE STORE, THE LAST LIGHT</p>
  <div class="lfs-rule"></div>
  <p class="lfs-note">黄昏把山、店和空着的停车位都染成了同一种颜色。<em>这一刻，连风都很轻。</em>
    <span class="en">Even an empty parking lot can hold the last light.</span>
  </p>
  <p class="lfs-stamp">FUJIKAWAGUCHIKO · 35.5°N<br>THE LAST LIGHT / 01</p>
</section>

<div class="lfs-foot">
  <div class="lfs-progress">
    <div class="lfs-progresshead">
      <span data-lfs-status>DEVELOPING THE LIGHT</span>
      <span class="pct"><b data-lfs-pct>00</b><i>%</i></span>
    </div>
    <div class="lfs-track" role="progressbar" aria-label="DeepSeek Harness 正在启动" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
      <i data-lfs-fill></i>
      <span class="lfs-marker" data-lfs-marker></span>
    </div>
    <div class="lfs-ticks"></div>
  </div>
  <button class="lfs-skip" type="button" data-lfs-skip>跳过 <span>/ SKIP</span></button>
</div>

<div class="lfs-wash"></div>
<div class="lfs-sr" role="status" aria-live="polite" data-lfs-live>DeepSeek Harness 正在启动，富士山黄昏主题加载中。</div>
`

  var TIMERS = []
  var FRAMES = []
  var DONE = false

  function later(fn, delay) {
    var id = window.setTimeout(fn, delay)
    TIMERS.push(id)
    return id
  }

  function frame(fn) {
    var id = window.requestAnimationFrame(fn)
    FRAMES.push(id)
    return id
  }

  function clearAll() {
    for (var i = 0; i < TIMERS.length; i += 1) window.clearTimeout(TIMERS[i])
    for (var j = 0; j < FRAMES.length; j += 1) window.cancelAnimationFrame(FRAMES[j])
    TIMERS.length = 0
    FRAMES.length = 0
  }

  function updateClock(host) {
    if (DONE) return
    var nodes = host.querySelectorAll('[data-lfs-time]')
    var now = new Date()
    var text = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0')
    for (var i = 0; i < nodes.length; i += 1) nodes[i].textContent = text
    later(function () { updateClock(host) }, 20000)
  }

  function startProgress(host) {
    var fill = host.querySelector('[data-lfs-fill]')
    var marker = host.querySelector('[data-lfs-marker]')
    var pct = host.querySelector('[data-lfs-pct]')
    var track = host.querySelector('[role="progressbar"]')
    var status = host.querySelector('[data-lfs-status]')
    var live = host.querySelector('[data-lfs-live]')

    if (REDUCED) {
      if (fill) fill.style.width = '100%'
      if (marker) marker.style.left = '100%'
      if (pct) pct.textContent = '100'
      if (track) track.setAttribute('aria-valuenow', '100')
      if (status) status.textContent = 'READY'
      if (live) live.textContent = '富士山黄昏主题已就绪。'
      return
    }

    var started = 0
    var stages = [
      { at: 0, text: 'DEVELOPING THE LIGHT' },
      { at: 820, text: 'SETTING THE GLASS' },
      { at: 1660, text: 'LETTING THE DUSK IN' },
      { at: 2460, text: 'HANDING OVER' },
    ]

    function ease(t) {
      return 1 - Math.pow(1 - t, 3)
    }

    function tick(now) {
      if (DONE) return
      if (started === 0) started = now
      var linear = Math.min(1, (now - started) / 2900)
      var value = Math.round(ease(linear) * 100)
      if (fill) fill.style.width = value + '%'
      if (marker) marker.style.left = value + '%'
      if (pct) pct.textContent = value < 10 ? '0' + value : String(value)
      if (track) track.setAttribute('aria-valuenow', String(value))
      for (var i = stages.length - 1; i >= 0; i -= 1) {
        if (now - started >= stages[i].at) {
          if (status && status.textContent !== stages[i].text && linear < 0.995) status.textContent = stages[i].text
          break
        }
      }
      if (linear < 1) frame(tick)
      else if (status) status.textContent = 'READY'
    }

    frame(tick)
  }

  function attachSkip(host, finish) {
    function onKey(event) {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      if (event.key === 'Tab') return
      finish('skip')
    }
    function onPointer(event) {
      if (event.target && event.target.closest && event.target.closest('[data-lfs-skip]')) return
      finish('skip')
    }
    function onSkip(event) {
      if (event) event.preventDefault()
      finish('skip')
    }
    window.addEventListener('keydown', onKey, true)
    window.addEventListener('pointerdown', onPointer, true)
    window.addEventListener('wheel', onPointer, { capture: true, passive: true })
    window.addEventListener('touchstart', onPointer, { capture: true, passive: true })
    var button = host.querySelector('[data-lfs-skip]')
    if (button) button.addEventListener('click', onSkip)
    return function () {
      window.removeEventListener('keydown', onKey, true)
      window.removeEventListener('pointerdown', onPointer, true)
      window.removeEventListener('wheel', onPointer, true)
      window.removeEventListener('touchstart', onPointer, true)
      if (button) button.removeEventListener('click', onSkip)
    }
  }

  function mount() {
    if (CANCELLED) return
    if (document.getElementById(ROOT_ID)) return
    if (!document.body) return

    var style = document.getElementById(STYLE_ID)
    if (!style) {
      style = document.createElement('style')
      style.id = STYLE_ID
      style.textContent = CSS
      ;(document.head || document.documentElement).appendChild(style)
    }

    var host = document.createElement('div')
    host.id = ROOT_ID
    host.setAttribute('role', 'dialog')
    host.setAttribute('aria-modal', 'true')
    host.setAttribute('aria-label', '富士山下 · DeepSeek Harness 启动动画')
    host.innerHTML = HTML

    try {
      var saved = JSON.parse(window.localStorage.getItem('lawson-fuji-skin:settings:v1') || 'null')
      if (saved && typeof saved.accent === 'string' && /^#[0-9a-f]{6}$/i.test(saved.accent)) {
        var rgb = [
          parseInt(saved.accent.slice(1, 3), 16),
          parseInt(saved.accent.slice(3, 5), 16),
          parseInt(saved.accent.slice(5, 7), 16),
        ]
        var lifted = rgb.map(function (value) {
          return Math.round(value + (255 - value) * 0.26)
        })
        host.style.setProperty('--lfs-peach', '#' + lifted.map(function (value) {
          return value.toString(16).padStart(2, '0')
        }).join(''))
      }
    } catch (error) {
      /* use the default dusk accent */
    }

    var photo = host.querySelector('[data-lfs-photo]')
    if (photo) {
      photo.addEventListener('error', function () {
        photo.style.display = 'none'
      })
    }

    var previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.body.appendChild(host)

    updateClock(host)
    startProgress(host)

    var detach = attachSkip(host, finish)
    var finished = false

    function finish(reason) {
      if (finished) return
      finished = true
      DONE = true
      clearAll()
      detach()
      try { document.body.style.overflow = previousOverflow } catch (error) { /* detached body */ }
      host.classList.add('is-out')
      host.setAttribute('data-lfs-exit', reason || 'done')
      later(function () {
        if (host.parentNode) host.parentNode.removeChild(host)
        if (style.parentNode) style.parentNode.removeChild(style)
        if (RUNNING && RUNNING.host === host) RUNNING = null
      }, REDUCED ? 60 : 1050)
    }

    RUNNING = { host: host, finish: finish }

    later(function () { host.classList.add('is-s1') }, REDUCED ? 0 : 90)
    later(function () { host.classList.add('is-s2') }, REDUCED ? 20 : 430)
    later(function () {
      if (DONE) return
      host.classList.add('is-s3')
      var live = host.querySelector('[data-lfs-live]')
      if (live) live.textContent = '黄昏的光正在落进便利店。'
    }, REDUCED ? 40 : 1850)
    later(function () { finish('done') }, REDUCED ? 1200 : 3400)
  }

  function destroy() {
    CANCELLED = true
    if (RUNNING && typeof RUNNING.finish === 'function') {
      RUNNING.finish('destroy')
      return
    }
    var host = document.getElementById(ROOT_ID)
    if (host && host.parentNode) host.parentNode.removeChild(host)
    var style = document.getElementById(STYLE_ID)
    if (style && style.parentNode) style.parentNode.removeChild(style)
    try { document.body.style.overflow = '' } catch (error) { /* no body yet */ }
  }

  function replay() {
    if (RUNNING && typeof RUNNING.finish === 'function') RUNNING.finish('destroy')
    var oldHost = document.getElementById(ROOT_ID)
    if (oldHost && oldHost.parentNode) oldHost.parentNode.removeChild(oldHost)
    var oldStyle = document.getElementById(STYLE_ID)
    if (oldStyle && oldStyle.parentNode) oldStyle.parentNode.removeChild(oldStyle)
    RUNNING = null
    CANCELLED = false
    DONE = false
    mount()
  }

  window.__LAWSON_BOOT__ = { mount: mount, replay: replay, destroy: destroy }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true })
  } else {
    mount()
  }
})()
