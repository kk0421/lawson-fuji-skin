window.__ModuleLoader__.load({
  id: 'lawson-fuji-skin',
  factory(require) {
    'use strict'

    var React = require('react')
    var h = React.createElement
    var STYLE_ID = 'lf-theme-style'
    var SCENE_ID = 'lf-theme-scene'
    var THEME_ATTR = 'data-lf-theme'
    var STORAGE_KEY = 'lawson-fuji-skin:settings:v1'

    var DEFAULTS = {
      brightness: 1,
      glass: 0.66,
      sidebar: 0.28,
      frost: 18,
      blur: 0,
      mist: 0.45,
      grain: 0.05,
      zoom: 1.04,
      saturation: 1.04,
      depth: 1,
      parallax: 0.65,
      viewX: 0,
      viewY: 8,
      autoOrbit: true,
      accent: '#b15b3e',
      tint: '#e0a27e',
      tintStrength: 0.10,
      material: 'fluted',
      materialStrength: 0.28,
      textureScale: 1,
      sheen: 0.12,
      edge: 'chrome',
      leakColor: '#ffd0a8',
      leakStrength: 0.10,
      vignette: 1,
      ambientOn: true,
      quoteOn: true,
      quoteAuto: true,
      envOn: true,
      quoteCategory: 'emotion',
      location: Object.assign({}, DEFAULT_LOCATION),
      motion: true,
    }

    var PRESETS = {
      dusk: { brightness: 1, glass: 0.66, sidebar: 0.28, frost: 18, blur: 0, mist: 0.45, grain: 0.05, zoom: 1.04, saturation: 1.04, accent: '#b15b3e', tint: '#e0a27e', tintStrength: 0.10, motion: true },
      night: { brightness: 0.72, glass: 0.78, sidebar: 0.42, frost: 26, blur: 2.5, mist: 0.28, grain: 0.07, zoom: 1.08, saturation: 0.92, accent: '#e6a17f', tint: '#728eae', tintStrength: 0.16, motion: true },
      mist: { brightness: 1.08, glass: 0.74, sidebar: 0.34, frost: 28, blur: 5, mist: 0.82, grain: 0.035, zoom: 1.12, saturation: 0.97, accent: '#5f8c86', tint: '#a9c7c0', tintStrength: 0.14, motion: true },
      film: { brightness: 0.96, glass: 0.70, sidebar: 0.30, frost: 22, blur: 1, mist: 0.35, grain: 0.08, zoom: 1.06, saturation: 0.88, accent: '#9a6a48', tint: '#d7b28d', tintStrength: 0.18, motion: true },
    }

    var ACCENTS = [
      { name: '桃', color: '#b15b3e' },
      { name: '盐', color: '#3f7f88' },
      { name: '苔', color: '#5d7a55' },
      { name: '紫', color: '#7d6a86' },
      { name: '金', color: '#9a7a4f' },
    ]

    var MATERIALS = [
      { id: 'mist', name: '冷雾', en: 'COLD MIST', edge: 'soft', leak: '#ffd0a8' },
      { id: 'fluted', name: '长虹', en: 'FLUTED', edge: 'chrome', leak: '#ffd9b0' },
      { id: 'smoked', name: '烟熏', en: 'SMOKED', edge: 'soft', leak: '#ffb681' },
      { id: 'frost', name: '磨砂', en: 'FROSTED', edge: 'soft', leak: '#d8ecf0' },
      { id: 'iridescent', name: '虹彩', en: 'IRIDESCENT', edge: 'chrome', leak: '#cbb6ff' },
      { id: 'metal', name: '拉丝', en: 'BRUSHED', edge: 'chrome', leak: '#9fd3df' },
      { id: 'paper', name: '纸感', en: 'PAPER', edge: 'bevel', leak: '#e6c79b' },
      { id: 'film', name: '胶片', en: 'FILM', edge: 'soft', leak: '#ffbe8c' },
      { id: 'rain', name: '雨幕', en: 'RAIN', edge: 'neon', leak: '#8fd4e8' },
    ]

    var EDGES = [
      ['soft', '柔和'],
      ['chrome', '金属'],
      ['neon', '霓虹'],
      ['bevel', '斜边'],
    ]

    function isMaterial(value) {
      return MATERIALS.some(function (item) { return item.id === value })
    }

    function isEdge(value) {
      return EDGES.some(function (item) { return item[0] === value })
    }

    var CORE_QUOTES = {
      emotion: [
        { text: '黄昏把山、店和空着的停车位都染成了同一种颜色。' },
        { text: '有些海不必抵达，光落下来的时候，就已经见过。' },
        { text: '风从便利店门口经过，带走了很轻的一天。' },
        { text: '我们都在等一场不会迟到的晚霞。' },
        { text: '把没说完的话，交给黄昏。' },
        { text: '不是所有告别都需要回声。' },
        { text: '远处的山不说话，但它一直在。' },
        { text: '有些路一个人走，才会看见光落在哪里。' },
        { text: '生活偶尔失约，黄昏从不。' },
        { text: '愿你在很普通的一天，遇见很好的光。' },
        { text: '夜色落下来之前，先替自己留一盏灯。' },
        { text: '想念不是回头，是看见相似的晚霞时停了一秒。' },
      ],
      motivation: [
        { text: '先把今天走完，再谈远方。' },
        { text: '慢一点没关系，方向对就好。' },
        { text: '你不是没有进步，你只是还在路上。' },
        { text: '把热爱做成日常，日子就会有回声。' },
        { text: '允许自己休息，但别替自己放弃。' },
        { text: '每一次认真，都会在未来某天结账。' },
        { text: '别急着证明自己，先安静地变强。' },
        { text: '看不清远方的时候，就把脚下这一步走稳。' },
        { text: '你不是在等风，你是在长出自己的帆。' },
        { text: '把小事做好，时间会替你说话。' },
        { text: '今天多走的一小步，是明天少说的一句遗憾。' },
        { text: '不必发光的每一天，也是在为发光蓄电。' },
      ],
      football: [
        { text: '足球是圆的。', source: '塞普·赫贝格尔' },
        { text: '足球无关生死，足球高于生死。', source: '比尔·香克利' },
        { text: '终场哨响之前，一切皆有可能。' },
        { text: '最好的球队，也会输给一个不肯停下的下午。' },
        { text: '不是每一脚射门都会进，但每一脚都算数。' },
        { text: '球场很大，跑动的人总会遇到空当。' },
        { text: '输球不是终点，站着不动才是。' },
        { text: '足球最迷人的地方，是它从来不按剧本走。' },
        { text: '你追不上的球，下一脚再追。' },
        { text: '十一人一条心，草皮也会让路。' },
        { text: '把遗憾留在上一场，把脚步带进下一场。' },
        { text: '有些人看比分，有些人看奔跑。' },
      ],
    }

    var EMOTION_FIRST = [
      '黄昏落在便利店的玻璃上', '晚风从空停车场穿过去', '远处的山只剩一个轮廓',
      '街灯亮起的时候', '天边的云慢慢烧成粉色', '最后一班车开走以后',
      '店里的暖光落在人行道上', '雨停在玻璃窗外面', '富士山被云遮住一半',
      '夜色从海平面升起来', '路口的红灯亮了很久', '风吹动门口的塑料帘',
      '停车场空得像一个句号', '玻璃上有一层薄薄的雾', '广播里放着很旧的歌',
      '山顶的雪还没有化', '便利店的门开了一次', '有人撑着伞从远处走过',
      '天光暗下来的那几分钟', '月亮从云的背面出来', '海风带着一点咸味',
      '城市的声音慢慢退远',
    ]

    var EMOTION_SECOND = [
      '我忽然没那么想赶路了', '觉得今天也没有那么糟', '想起一个很久没见的人',
      '把没说完的话留给了风', '才明白有些告别没有声音', '决定再等一会儿',
      '忽然想给谁发一条消息', '发现一个人也可以很好', '觉得光比语言更诚实',
      '想把这一刻存起来', '不再追问没有答案的事', '允许自己慢一点',
      '知道明天还会照常到来', '忽然原谅了今天的自己', '想起远方也有一盏灯',
      '觉得心里安静了下来', '开始期待一个普通的早晨', '相信错过也有它的意义',
      '觉得风替我说了很多', '想把遗憾留在今天', '不再害怕短暂的空白',
      '明白有些光只属于黄昏',
    ]

    var MOTIVATION_FIRST = [
      '先把眼前这一步走稳', '允许自己慢一点', '把今天该做的事做完',
      '有一个不完美的开始', '在没人看见的时候继续', '把想做的事拆小一点',
      '今天只比昨天多走一步', '累了就休息一下再出发', '把注意力放回自己身上',
      '认真对待手边的小事', '不再等一个完美的时机', '把失败当成一次反馈',
      '给自己一点耐心', '在低处把根扎深', '把热爱留一点给明天',
      '先完成，再完美', '允许计划偶尔被打乱', '把时间花在值得的地方',
      '每天进步一点点', '先照顾好今天的情绪', '把眼光放远一点',
      '相信积累的力量',
    ]

    var MOTIVATION_SECOND = [
      '你会走到自己想去的地方', '时间会替你把答案带来', '远方会慢慢变得清晰',
      '你会感谢现在没有放弃的自己', '每一步都算数', '光会在坚持里出现',
      '你会遇见更好的可能', '今天也会成为你的底气', '慢一点也终会到达',
      '未来会记住你的认真', '你会拥有自己的节奏', '生活会给你回声',
      '你比想象中更有力量', '那些努力不会白费', '你正在成为更好的自己',
      '明天的你会更从容', '你会带着光继续走', '所有坚持都有意义',
      '你终会穿过这段路', '时间会给出答案', '你会离想要的生活更近一点',
      '每一步都通向新的风景',
    ]

    var FOOTBALL_FIRST = [
      '终场哨响之前', '比分落后的时候', '球传到脚下的时候',
      '错过一次机会之后', '被对手压着打的时候', '站在点球点前',
      '比赛进入补时', '连续几次传球失误以后', '替补席站起来热身的时候',
      '防线被撕开的那一刻', '一脚射门打在门柱上', '全场安静下来的时候',
      '队友把球交给你', '体能快到极限的时候', '领先一球的时候',
      '开场哨响的那一刻', '雨落在草皮上', '看台上唱起歌的时候',
      '一次漂亮的抢断之后', '对手开始拖延时间', '球在禁区里弹来弹去',
      '最后一脚任意球',
    ]

    var FOOTBALL_SECOND = [
      '一切都还没有结束', '更要把下一脚踢好', '别让犹豫替你出脚',
      '真正的比赛才刚刚开始', '抬头看看队友的位置', '把球交给更合适的人',
      '相信下一脚会更好', '先把防守站稳', '别急着一个人解决',
      '每一次跑动都有意义', '继续要球，继续向前', '把注意力放回下一次触球',
      '草皮会记住你的脚步', '比赛不会辜负认真的人', '保持耐心，等待空当',
      '足球是圆的，什么都会发生', '输赢之外，还有奔跑', '把遗憾留在上一场',
      '再累也要回防', '下一分钟永远值得期待', '真正的强者敢于要球',
      '哨声没响，就别停下',
    ]

    function buildQuotePool(core, firsts, seconds, seed) {
      var seen = new Set(core.map(function (item) { return item.text }))
      var combos = []
      for (var i = 0; i < firsts.length; i += 1) {
        for (var j = 0; j < seconds.length; j += 1) {
          var text = firsts[i] + '，' + seconds[j] + '。'
          if (seen.has(text)) continue
          combos.push({ text: text })
        }
      }
      var state = seed >>> 0
      function random() {
        state = (state * 1664525 + 1013904223) >>> 0
        return state / 4294967296
      }
      for (var k = combos.length - 1; k > 0; k -= 1) {
        var swap = Math.floor(random() * (k + 1))
        var temp = combos[k]
        combos[k] = combos[swap]
        combos[swap] = temp
      }
      return core.concat(combos.slice(0, 400))
    }

    var QUOTES = {
      emotion: buildQuotePool(CORE_QUOTES.emotion, EMOTION_FIRST, EMOTION_SECOND, 20261021),
      motivation: buildQuotePool(CORE_QUOTES.motivation, MOTIVATION_FIRST, MOTIVATION_SECOND, 20261022),
      football: buildQuotePool(CORE_QUOTES.football, FOOTBALL_FIRST, FOOTBALL_SECOND, 20261023),
    }

    var ALL_QUOTES = QUOTES.emotion.concat(QUOTES.motivation, QUOTES.football)
    var QUOTE_COUNTS = {
      emotion: QUOTES.emotion.length,
      motivation: QUOTES.motivation.length,
      football: QUOTES.football.length,
      mixed: ALL_QUOTES.length,
    }

    var QUOTE_TYPES = [
      ['emotion', '情感'],
      ['motivation', '励志'],
      ['football', '足球'],
      ['mixed', '混合'],
    ]

    var DEFAULT_LOCATION = {
      name: '富士河口湖',
      admin1: '山梨县',
      country: '日本',
      latitude: 35.497,
      longitude: 138.755,
      timezone: 'Asia/Tokyo',
    }

    var QUICK_LOCATIONS = [
      DEFAULT_LOCATION,
      { name: '威海', admin1: '山东', country: '中国', latitude: 37.513, longitude: 122.120, timezone: 'Asia/Shanghai' },
      { name: '东京', admin1: '东京都', country: '日本', latitude: 35.676, longitude: 139.650, timezone: 'Asia/Tokyo' },
      { name: '伦敦', admin1: '英格兰', country: '英国', latitude: 51.507, longitude: -0.128, timezone: 'Europe/London' },
      { name: '纽约', admin1: '纽约州', country: '美国', latitude: 40.713, longitude: -74.006, timezone: 'America/New_York' },
      { name: '巴黎', admin1: '法兰西岛', country: '法国', latitude: 48.857, longitude: 2.352, timezone: 'Europe/Paris' },
    ]

    var WEEKDAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

    var WEATHER_TEXT = {
      0: '晴', 1: '大致晴', 2: '多云', 3: '阴', 45: '雾', 48: '冻雾',
      51: '毛毛雨', 53: '毛毛雨', 55: '毛毛雨', 56: '冻雨', 57: '冻雨',
      61: '小雨', 63: '中雨', 65: '大雨', 66: '冻雨', 67: '冻雨',
      71: '小雪', 73: '中雪', 75: '大雪', 77: '雪粒',
      80: '阵雨', 81: '阵雨', 82: '强阵雨', 85: '阵雪', 86: '强阵雪',
      95: '雷雨', 96: '雷雨冰雹', 99: '雷雨冰雹',
    }

    var THEME_CSS = `
html[${THEME_ATTR}]{
  --lf-glass:.66;
  --lf-glass-1:.70;
  --lf-glass-2:.76;
  --lf-glass-3:.82;
  --lf-sidebar:.30;
  --lf-veil:.43;
  --lf-glass-d:.58;
  --lf-glass-d1:.62;
  --lf-glass-d2:.68;
  --lf-glass-d3:.74;
  --lf-sidebar-d:.26;
  --lf-frost:18px;
  --lf-bright:1;
  --lf-photo-blur:0px;
  --lf-mist:.45;
  --lf-grain:.05;
  --lf-zoom:1.04;
  --lf-sat:1.04;
  --lf-accent:#b15b3e;
  --lf-accent-dark:#d49e89;
  --lf-accent-ink:#fff8ef;
  --lf-accent-dark-ink:#10242c;
  --lf-tint:#e0a27e;
  --lf-tint-strength:.10;
}
html[${THEME_ATTR}] body{
  background:transparent !important;
  background-image:none !important;
  --dsw-alias-bg-base:rgba(248,250,252,var(--lf-glass)) !important;
  --dsw-alias-bg-layer-1:rgba(250,252,253,var(--lf-glass-1)) !important;
  --dsw-alias-bg-layer-2:rgba(247,250,252,var(--lf-glass-2)) !important;
  --dsw-alias-bg-layer-3:rgba(246,249,251,var(--lf-glass-3)) !important;
  --dsw-alias-bg-module-platform:rgba(248,251,252,var(--lf-glass-1)) !important;
  --dsw-alias-bg-multi-select:rgba(243,248,250,var(--lf-glass-2)) !important;
  --dsw-alias-bg-overlay:rgba(248,251,252,.97) !important;
  --dsw-mask-blur:blur(18px) saturate(118%) !important;
  --dsw-alias-border-l1:rgba(255,255,255,.55) !important;
  --dsw-alias-border-l2:rgba(20,58,75,.24) !important;
  --dsw-alias-border-l3:rgba(20,58,75,.14) !important;
  --dsw-alias-border-l4:rgba(20,58,75,.08) !important;
  --dsw-alias-brand-primary:var(--lf-accent) !important;
  --dsw-alias-button-info-fill:var(--lf-accent) !important;
  --dsw-alias-button-info-hover:color-mix(in srgb,var(--lf-accent) 84%,#000) !important;
  --dsw-alias-state-business-primary:var(--lf-accent) !important;
  --dsw-specific-input-major:rgba(249,252,253,var(--lf-glass-1)) !important;
  --dsw-alias-label-caption:#6d8790 !important;
  --dsw-alias-interactive-bg-hover:color-mix(in srgb,var(--lf-accent) 10%,transparent) !important;
  --dsw-alias-interactive-bg-hover-solid:color-mix(in srgb,var(--lf-accent) 15%,transparent) !important;
  --dsw-alias-label-primary:#142c3a !important;
  --dsw-alias-label-secondary:#40606e !important;
  --dsw-alias-label-tertiary:#6d8792 !important;
  --dsw-alias-state-error-primary:#b34a3f !important;
  --dsw-alias-state-idle-primary:#7b949d !important;
  --dsw-alias-state-success-primary:#2c7a66 !important;
  --dsw-alias-state-warn-primary:#9a691b !important;
  --dsw-specific-sidebar-fill:rgba(245,249,251,var(--lf-sidebar)) !important;
  --dsw-specific-selector:rgba(244,248,250,var(--lf-glass-1)) !important;
}
html[${THEME_ATTR}] body[data-ds-dark-theme]{
  --dsw-alias-bg-base:rgba(5,18,27,var(--lf-glass-d)) !important;
  --dsw-alias-bg-layer-1:rgba(7,24,34,var(--lf-glass-d1)) !important;
  --dsw-alias-bg-layer-2:rgba(9,30,42,var(--lf-glass-d2)) !important;
  --dsw-alias-bg-layer-3:rgba(11,36,49,var(--lf-glass-d3)) !important;
  --dsw-alias-bg-module-platform:rgba(8,27,38,var(--lf-glass-d1)) !important;
  --dsw-alias-bg-multi-select:rgba(12,38,51,var(--lf-glass-d2)) !important;
  --dsw-alias-bg-overlay:rgba(6,21,30,.97) !important;
  --dsw-alias-border-l1:rgba(201,235,241,.14) !important;
  --dsw-alias-border-l2:rgba(196,232,237,.22) !important;
  --dsw-alias-border-l3:rgba(196,232,237,.12) !important;
  --dsw-alias-border-l4:rgba(196,232,237,.07) !important;
  --dsw-alias-brand-primary:var(--lf-accent-dark) !important;
  --dsw-alias-button-info-fill:var(--lf-accent) !important;
  --dsw-alias-button-info-hover:color-mix(in srgb,var(--lf-accent) 80%,#000) !important;
  --dsw-alias-state-business-primary:var(--lf-accent-dark) !important;
  --dsw-specific-input-major:rgba(7,24,34,var(--lf-glass-d1)) !important;
  --dsw-alias-label-caption:#87a1a7 !important;
  --dsw-alias-interactive-bg-hover:color-mix(in srgb,var(--lf-accent) 14%,transparent) !important;
  --dsw-alias-interactive-bg-hover-solid:color-mix(in srgb,var(--lf-accent) 19%,transparent) !important;
  --dsw-alias-label-primary:#edf5f7 !important;
  --dsw-alias-label-secondary:#a9c3cb !important;
  --dsw-alias-label-tertiary:#819fa9 !important;
  --dsw-alias-state-error-primary:#ff9d89 !important;
  --dsw-alias-state-idle-primary:#76919a !important;
  --dsw-alias-state-success-primary:#7bd6b8 !important;
  --dsw-alias-state-warn-primary:#e8bb77 !important;
  --dsw-specific-sidebar-fill:rgba(5,20,29,var(--lf-sidebar-d)) !important;
  --dsw-specific-selector:rgba(9,30,42,var(--lf-glass-d2)) !important;
}
html[${THEME_ATTR}] body #root{background:transparent !important;}
/* Global coverage: outer frames and the empty parts of every column show the
   photo instead of a solid shell fill. Cards, menus and the composer keep
   their own glass tokens. */
html[${THEME_ATTR}] body #root > div{background:transparent !important;}
html[${THEME_ATTR}] body :is(
  .pI_x6G_frame,
  .pI_x6G_centerCol,
  .pI_x6G_rightbarCol,
  .pI_x6G_bottomRow,
  .dshDesktopFrame,
  .dshDesktopConversationSurface,
  .dshDesktopDetailsSurface,
  .dshDesktopMacCaptionRow,
  .dshDesktopWindowsCaptionRow,
  [class*="centerCol"],
  [class*="rightbarCol"],
  [class*="bottomRow"]
){
  background:transparent !important;
}
html[${THEME_ATTR}] body :is(.pI_x6G_sidebarCol,.dshDesktopSidebarSurface,[class*="sidebarCol"]){
  background:rgba(245,249,251,var(--lf-sidebar)) !important;
  -webkit-backdrop-filter:blur(var(--lf-frost)) saturate(122%);
  backdrop-filter:blur(var(--lf-frost)) saturate(122%);
}
html[${THEME_ATTR}] body[data-ds-dark-theme] :is(.pI_x6G_sidebarCol,.dshDesktopSidebarSurface,[class*="sidebarCol"]){
  background:rgba(5,20,29,var(--lf-sidebar-d)) !important;
}
html[${THEME_ATTR}] body ::selection{background:color-mix(in srgb,var(--lf-accent) 32%,transparent);color:#142c3a;}
html[${THEME_ATTR}] body *{scrollbar-color:rgba(44,96,112,.38) transparent;scrollbar-width:thin;}
html[${THEME_ATTR}] body :is(.dshDesktopSidebarSurface,[class*="sidebarCol"],[data-rightbar-col],[class*="rightbarCol"]){
  -webkit-backdrop-filter:blur(var(--lf-frost)) saturate(122%);
  backdrop-filter:blur(var(--lf-frost)) saturate(122%);
}
html[${THEME_ATTR}] body :is([role="dialog"],[role="alertdialog"],[role="menu"],[role="listbox"]):not(#lfs-boot-root){
  -webkit-backdrop-filter:blur(calc(var(--lf-frost) + 7px)) saturate(128%);
  backdrop-filter:blur(calc(var(--lf-frost) + 7px)) saturate(128%);
}
html[${THEME_ATTR}] body :is([data-shortcut-modal="settings"],[role="dialog"],[role="alertdialog"]):not(#lfs-boot-root){
  background-color:rgba(248,251,252,.95) !important;
  box-shadow:0 30px 90px rgba(10,42,56,.20),inset 0 1px 0 rgba(255,255,255,.8) !important;
}
html[${THEME_ATTR}] body[data-ds-dark-theme] :is([data-shortcut-modal="settings"],[role="dialog"],[role="alertdialog"]):not(#lfs-boot-root){
  background-color:rgba(6,21,30,.96) !important;
  box-shadow:0 30px 90px rgba(0,12,18,.52),inset 0 1px 0 rgba(213,244,246,.09) !important;
}
/* Desktop shell flattening: the photo remains one continuous surface. */
html[${THEME_ATTR}] body:is([data-dsh-desktop-mode="advanced"],[data-dsh-desktop-mode="extended"]) .dshDesktopFrame{
  background:transparent !important;
}
html[${THEME_ATTR}] body:is([data-dsh-desktop-mode="advanced"],[data-dsh-desktop-mode="extended"]) .dshDesktopSidebarSurface{
  --dsw-specific-sidebar-fill:transparent !important;
}
html[${THEME_ATTR}] body:is([data-dsh-desktop-mode="advanced"],[data-dsh-desktop-mode="extended"]) :is(
  .dshDesktopConversationSurface,
  .dshDesktopDetailsSurface,
  .dshDesktopMacCaptionRow,
  .dshDesktopWindowsCaptionRow,
  .dshDesktopConversationSurface > *,
  .dshDesktopConversationSurface [data-phase="hero"],
  .dshDesktopConversationSurface [data-phase="active"],
  .dshDesktopConversationSurface [data-phase="settling"],
  .dshDesktopDetailsSurface > *
){
  background:transparent !important;
}
html[${THEME_ATTR}]:is([data-platform="darwin"],[data-windows-titlebar]) body #root div:has(> [data-shell-overlay]){
  background:transparent !important;
}
html[${THEME_ATTR}]:is([data-platform="darwin"],[data-windows-titlebar]) body #root div:has(> [data-shell-overlay]) > :is(:first-child,:nth-child(2),[data-rightbar-col]),
html[${THEME_ATTR}]:is([data-platform="darwin"],[data-windows-titlebar]) body #root div:has(> [data-shell-overlay]) > :nth-child(2) [data-phase],
html[${THEME_ATTR}]:is([data-platform="darwin"],[data-windows-titlebar]) body #root [data-rightbar-col] [data-dockkit-host="dock"] > [data-dockkit-content]{
  background:transparent !important;
}
html[${THEME_ATTR}][data-windows-titlebar] body #root div:has(> [data-shell-overlay])::before{
  background:transparent !important;
}
html[${THEME_ATTR}][data-windows-titlebar] body .pI_x6G_frame::before{
  background:transparent !important;
}
/* This tab may still hold an older local skin until its next reload. */
html[${THEME_ATTR}] :is(#ssb-theme-scene,#bws-theme-scene){display:none !important;}
html[${THEME_ATTR}] :is(.ssb-replay,.bws-replay){display:none !important;}

/* Composer glass. [data-composer-card] is the host's stable composer card. */
html[${THEME_ATTR}] body [data-composer-card]{
  background:
    radial-gradient(120% 160% at 100% 0%,color-mix(in srgb,var(--lf-accent) 9%,transparent),transparent 55%),
    linear-gradient(145deg,rgba(251,253,253,var(--lf-glass-1)),rgba(240,247,249,var(--lf-glass-2))) !important;
  border:1px solid color-mix(in srgb,var(--lf-accent) 14%,rgba(255,255,255,.55)) !important;
  box-shadow:
    0 20px 55px rgba(4,24,34,.18),
    inset 0 1px 0 rgba(255,255,255,.78),
    inset 0 -1px 0 rgba(255,255,255,.14) !important;
  -webkit-backdrop-filter:blur(calc(var(--lf-frost) + 4px)) saturate(128%);
  backdrop-filter:blur(calc(var(--lf-frost) + 4px)) saturate(128%);
  transition:background .25s ease,border-color .25s ease,box-shadow .25s ease;
}
html[${THEME_ATTR}] body[data-ds-dark-theme] [data-composer-card]{
  background:
    radial-gradient(120% 160% at 100% 0%,color-mix(in srgb,var(--lf-accent) 14%,transparent),transparent 55%),
    linear-gradient(145deg,rgba(9,27,38,var(--lf-glass-d1)),rgba(5,18,27,var(--lf-glass-d2))) !important;
  border-color:rgba(206,240,243,.16) !important;
  box-shadow:
    0 20px 55px rgba(0,8,12,.48),
    inset 0 1px 0 rgba(224,249,250,.12),
    inset 0 -1px 0 rgba(224,249,250,.04) !important;
}
html[${THEME_ATTR}] body [data-composer-card] [contenteditable="true"]{
  caret-color:var(--lf-accent) !important;
}
html[${THEME_ATTR}] body [data-composer-card] :is(button,[role="button"]):focus-visible{
  outline-color:var(--lf-accent) !important;
}

#${SCENE_ID}{
  position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none;
  background:
    radial-gradient(46% 40% at 55% 24%,rgba(236,178,146,.38),transparent 70%),
    linear-gradient(180deg,#1d344d 0%,#8a8296 50%,#d3a38d 68%,#111c28 100%);
  isolation:isolate;
  -webkit-user-select:none;user-select:none;
}
#${SCENE_ID} *{box-sizing:border-box;}
.lf-model-stage{position:absolute;inset:0;pointer-events:none;}
.lf-model-canvas{
  display:block;width:100%;height:100%;
  filter:brightness(var(--lf-bright,1)) saturate(var(--lf-sat,1.04)) blur(var(--lf-photo-blur,0px));
  transition:filter .25s ease;
}
.lf-world{
  position:absolute;inset:-12%;transform-style:preserve-3d;
  transform:rotateX(var(--lf-rx,0deg)) rotateY(var(--lf-ry,0deg));
  transition:transform .38s cubic-bezier(.2,.8,.25,1);
  will-change:transform;
}
.lf-drift{
  position:absolute;inset:0;transform-style:preserve-3d;
  animation:lf-float3d 22s ease-in-out infinite alternate;
  will-change:transform;
}
#${SCENE_ID}[data-lf-auto="off"] .lf-drift{animation-play-state:paused;}
html.lf-camera-dragging .lf-world{transition:none;}
.lf-layer{position:absolute;inset:0;transform-style:preserve-3d;pointer-events:none;}
.lf-layer-cloud{transform:translateZ(calc(var(--lf-depth,1) * 44px));}
.lf-layer-mist{transform:translateZ(calc(var(--lf-depth,1) * 32px));}
.lf-camera{
  position:absolute;inset:-3%;transform-style:preserve-3d;
  animation:lf-kenburns 58s ease-in-out infinite alternate;
}
.lf-cloud{
  position:absolute;height:12vh;border-radius:50%;pointer-events:none;
  background:radial-gradient(ellipse at 50% 50%,rgba(255,233,223,.16),rgba(226,235,238,.05) 50%,transparent 72%);
  filter:brightness(var(--lf-bright,1)) saturate(var(--lf-sat,1.04)) blur(18px);mix-blend-mode:screen;
}
.lf-cloud.c1{left:-24%;top:12%;width:58%;opacity:.32;animation:lf-cloud 96s linear infinite;}
.lf-cloud.c2{right:-20%;top:25%;width:48%;opacity:.22;animation:lf-cloud 128s linear infinite reverse;}
.lf-photo{
  position:absolute;inset:0;
  background:#172738 url('/lawson-fuji-skin/bg.jpg') center 52%/cover no-repeat;
  transform:scale(var(--lf-zoom,1.04));
  filter:brightness(var(--lf-bright,1)) saturate(var(--lf-sat,1.04)) blur(var(--lf-photo-blur,0px));
  transition:transform .45s ease,filter .25s ease;
}
/* The same photo is re-used as soft depth slices. They line up exactly at rest
   and separate in depth when the camera moves. */
.lf-slice{
  position:absolute;inset:0;pointer-events:none;
  background:#172738 url('/lawson-fuji-skin/bg.jpg') center 52%/cover no-repeat;
  filter:brightness(var(--lf-bright,1)) saturate(var(--lf-sat,1.04)) blur(var(--lf-photo-blur,0px));
  transition:transform .45s ease,filter .25s ease;
  will-change:transform;
}
.lf-slice-mountain{
  transform:translateZ(calc(-80px * var(--lf-depth,1))) scale(var(--lf-slice-mountain-scale,1.07619));
  clip-path:inset(0 0 36% 0);
  -webkit-mask-image:linear-gradient(180deg,#000 0 84%,transparent 100%);
  mask-image:linear-gradient(180deg,#000 0 84%,transparent 100%);
}
.lf-slice-store{
  transform:translateZ(calc(40px * var(--lf-depth,1))) scale(var(--lf-slice-store-scale,.96190));
  clip-path:inset(54% 0 8% 0);
  -webkit-mask-image:linear-gradient(180deg,transparent 0,#000 8%,#000 94%,transparent 100%);
  mask-image:linear-gradient(180deg,transparent 0,#000 8%,#000 94%,transparent 100%);
}
.lf-slice-foreground{
  transform:translateZ(calc(80px * var(--lf-depth,1))) scale(var(--lf-slice-foreground-scale,.92381));
  clip-path:inset(85% 0 0 0);
  -webkit-mask-image:linear-gradient(180deg,transparent 0,#000 22%);
  mask-image:linear-gradient(180deg,transparent 0,#000 22%);
}
.lf-skyglow{
  position:absolute;inset:-10%;pointer-events:none;mix-blend-mode:screen;
  background:
    radial-gradient(44% 38% at 57% 22%,rgba(255,202,169,.22),transparent 72%),
    radial-gradient(54% 46% at 12% 8%,rgba(93,134,168,.16),transparent 70%);
  filter:brightness(var(--lf-bright,1)) saturate(var(--lf-sat,1.04));
  animation:lf-skydrift 32s ease-in-out infinite alternate;
}
.lf-storeglow{
  position:absolute;left:5%;right:5%;top:53%;height:29%;pointer-events:none;
  background:
    radial-gradient(42% 72% at 50% 48%,rgba(255,218,168,.33),rgba(255,207,154,.08) 52%,transparent 76%),
    radial-gradient(18% 44% at 82% 58%,rgba(255,214,172,.18),transparent 75%);
  filter:brightness(var(--lf-bright,1)) saturate(var(--lf-sat,1.04)) blur(10px);mix-blend-mode:screen;
  animation:lf-storelight 8s ease-in-out infinite alternate;
}
.lf-mist{
  position:absolute;left:-16%;width:132%;height:11vh;border-radius:50%;pointer-events:none;
  background:linear-gradient(90deg,rgba(223,230,235,0),rgba(230,235,239,.32) 18%,rgba(244,241,237,.48) 50%,rgba(226,232,236,.26) 78%,rgba(223,230,235,0));
  filter:brightness(var(--lf-bright,1)) saturate(var(--lf-sat,1.04)) blur(19px);mix-blend-mode:screen;
}
.lf-mist.m1{top:37%;opacity:calc(var(--lf-mist) * .78);animation:lf-mistdrift 82s linear infinite;}
.lf-mist.m2{top:43%;opacity:calc(var(--lf-mist) * .92);animation:lf-mistdrift 61s linear infinite reverse;}
.lf-mist.m3{top:61%;height:9vh;opacity:calc(var(--lf-mist) * .48);animation:lf-mistdrift 104s linear infinite;}
.lf-dust{
  position:absolute;inset:0;pointer-events:none;opacity:.34;
  filter:brightness(var(--lf-bright,1)) saturate(var(--lf-sat,1.04));
  background-image:
    radial-gradient(circle,rgba(255,240,208,.82) 0 1px,transparent 1.8px),
    radial-gradient(circle,rgba(255,227,192,.58) 0 1px,transparent 1.6px),
    radial-gradient(circle,rgba(218,232,238,.45) 0 1px,transparent 1.5px);
  background-size:280px 220px,340px 260px,210px 180px;
  background-position:0 0,120px 80px,60px 140px;
  -webkit-mask-image:linear-gradient(180deg,rgba(0,0,0,.08),#000 22%,#000 64%,transparent 92%);
  mask-image:linear-gradient(180deg,rgba(0,0,0,.08),#000 22%,#000 64%,transparent 92%);
  animation:lf-dust 38s linear infinite;
}
.lf-grade{
  position:absolute;inset:0;pointer-events:none;
  background:
    linear-gradient(90deg,rgba(4,16,27,.30),transparent 34%,transparent 68%,rgba(4,16,27,.12)),
    linear-gradient(180deg,rgba(4,17,29,.22),transparent 23%,transparent 57%,rgba(4,13,22,.56));
}
.lf-veil{
  position:absolute;inset:0;pointer-events:none;
  background:rgba(238,246,248,var(--lf-veil,.36));
  -webkit-backdrop-filter:blur(calc(var(--lf-frost) * .42)) saturate(115%);
  backdrop-filter:blur(calc(var(--lf-frost) * .42)) saturate(115%);
}
.lf-veil::after{
  content:"";position:absolute;inset:0;
  background:
    linear-gradient(90deg,rgba(236,245,248,.12),transparent 14%,transparent 86%,rgba(236,245,248,.09)),
    linear-gradient(180deg,rgba(236,245,248,.10),transparent 22%,transparent 74%,rgba(236,245,248,.12));
}
body[data-ds-dark-theme] .lf-veil{background:rgba(4,17,25,var(--lf-veil,.43));}
body[data-ds-dark-theme] .lf-veil::after{
  background:
    linear-gradient(90deg,rgba(3,14,22,.16),transparent 14%,transparent 86%,rgba(3,14,22,.12)),
    linear-gradient(180deg,rgba(3,14,22,.12),transparent 22%,transparent 74%,rgba(3,14,22,.16));
}
.lf-tint{
  position:absolute;inset:0;pointer-events:none;
  background:var(--lf-tint,#e0a27e);opacity:var(--lf-tint-strength,.1);
  mix-blend-mode:soft-light;transition:background .3s ease,opacity .3s ease;
}
.lf-finish{
  position:absolute;inset:0;pointer-events:none;
  background-color:var(--lf-material-tint,transparent);
  background-image:
    linear-gradient(135deg,rgba(255,255,255,var(--lf-sheen,.12)),transparent 38%),
    var(--lf-material-pattern,none);
  background-size:auto,var(--lf-material-size,auto);
  opacity:var(--lf-tex-strength,.18);
  mix-blend-mode:soft-light;
}
.lf-leak{
  position:absolute;inset:0;pointer-events:none;
  background:
    radial-gradient(52% 42% at 82% 16%,var(--lf-leak,#ffd0a8),transparent 72%),
    radial-gradient(40% 34% at 10% 64%,var(--lf-leak,#ffd0a8),transparent 75%);
  opacity:var(--lf-leak-strength,.1);
  mix-blend-mode:screen;
}
.lf-grain{
  position:absolute;inset:0;pointer-events:none;opacity:var(--lf-grain,.05);
  background-image:radial-gradient(rgba(2,14,22,.9) .55px,transparent .8px);
  background-size:3px 3px;mix-blend-mode:multiply;
}
.lf-vignette{
  position:absolute;inset:0;pointer-events:none;opacity:var(--lf-vignette-strength,1);
  background:
    radial-gradient(126% 104% at 50% 44%,transparent 46%,rgba(2,12,18,.34) 100%),
    linear-gradient(180deg,rgba(2,12,18,.12),transparent 18%,transparent 76%,rgba(2,11,16,.24));
}

/* Material finishes: the photo and the glass surfaces share the same language. */
html[data-lf-material="mist"]{
  --lf-material-pattern:radial-gradient(130% 90% at 18% 0%,rgba(255,255,255,.22),transparent 56%);
  --lf-material-size:auto;
  --lf-material-tint:rgba(226,242,246,.04);
}
html[data-lf-material="fluted"]{
  --lf-material-pattern:repeating-linear-gradient(90deg,rgba(255,255,255,.18) 0 1px,rgba(255,255,255,0) 1px calc(9px * var(--lf-tex-scale)),rgba(8,28,38,.045) calc(9px * var(--lf-tex-scale)) calc(11px * var(--lf-tex-scale)));
  --lf-material-size:auto;
  --lf-material-tint:rgba(222,240,244,.035);
}
html[data-lf-material="smoked"]{
  --lf-material-pattern:linear-gradient(135deg,rgba(5,16,23,.34),rgba(255,177,134,.07) 58%,rgba(5,16,23,.22));
  --lf-material-size:auto;
  --lf-material-tint:rgba(6,20,28,.12);
}
html[data-lf-material="frost"]{
  --lf-material-pattern:radial-gradient(circle at 30% 30%,rgba(255,255,255,.22) 0 .7px,transparent 1.4px);
  --lf-material-size:calc(4px * var(--lf-tex-scale)) calc(4px * var(--lf-tex-scale));
  --lf-material-tint:rgba(235,247,250,.06);
}
html[data-lf-material="iridescent"]{
  --lf-material-pattern:conic-gradient(from 215deg at 58% 32%,rgba(255,178,158,.20),rgba(150,214,228,.18),rgba(209,181,242,.20),rgba(255,226,166,.16),rgba(255,178,158,.20));
  --lf-material-size:220% 220%;
  --lf-material-tint:rgba(196,188,236,.035);
}
html[data-lf-material="metal"]{
  --lf-material-pattern:repeating-linear-gradient(96deg,rgba(255,255,255,.18) 0 1px,rgba(255,255,255,.015) 1px calc(3px * var(--lf-tex-scale)),rgba(0,0,0,.045) calc(3px * var(--lf-tex-scale)) calc(4px * var(--lf-tex-scale)));
  --lf-material-size:auto;
  --lf-material-tint:rgba(140,170,180,.05);
}
html[data-lf-material="paper"]{
  --lf-material-pattern:radial-gradient(circle at 26% 24%,rgba(120,88,48,.12) 0 .8px,transparent 1.7px);
  --lf-material-size:calc(6px * var(--lf-tex-scale)) calc(6px * var(--lf-tex-scale));
  --lf-material-tint:rgba(196,165,116,.06);
}
html[data-lf-material="film"]{
  --lf-material-pattern:radial-gradient(circle,rgba(255,214,170,.20) .6px,transparent 1.2px);
  --lf-material-size:calc(3px * var(--lf-tex-scale)) calc(3px * var(--lf-tex-scale));
  --lf-material-tint:rgba(120,70,40,.05);
}
html[data-lf-material="rain"]{
  --lf-material-pattern:repeating-linear-gradient(105deg,transparent 0 calc(14px * var(--lf-tex-scale)),rgba(228,246,250,.16) calc(14px * var(--lf-tex-scale)) calc(15px * var(--lf-tex-scale)));
  --lf-material-size:auto;
  --lf-material-tint:rgba(130,180,194,.045);
}

html[data-lf-theme] body [data-composer-card],
html[data-lf-theme] .lf-ambient{position:relative;isolation:isolate;}
html[data-lf-theme] .lf-panel{isolation:isolate;}
html[data-lf-theme] body [data-composer-card]::before,
html[data-lf-theme] .lf-panel::before,
html[data-lf-theme] .lf-ambient::before{
  content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;
  background-color:var(--lf-material-tint,transparent);
  background-image:
    linear-gradient(135deg,rgba(255,255,255,var(--lf-sheen,.12)),transparent 40%),
    var(--lf-material-pattern,none);
  background-size:auto,var(--lf-material-size,auto);
  opacity:calc(var(--lf-tex-strength,.18) * .7);
  mix-blend-mode:soft-light;
  z-index:0;
}

html[data-lf-edge="chrome"] body [data-composer-card],
html[data-lf-edge="chrome"] .lf-panel,
html[data-lf-edge="chrome"] .lf-ambient{
  border-color:rgba(255,255,255,.82) !important;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.95),
    inset 0 -1px 0 rgba(0,0,0,.22),
    0 18px 52px rgba(4,24,34,.20) !important;
}
html[data-lf-edge="neon"] body [data-composer-card],
html[data-lf-edge="neon"] .lf-panel,
html[data-lf-edge="neon"] .lf-ambient{
  border-color:color-mix(in srgb,var(--lf-accent) 72%,transparent) !important;
  box-shadow:
    0 0 0 1px color-mix(in srgb,var(--lf-accent) 30%,transparent),
    0 0 26px color-mix(in srgb,var(--lf-accent) 24%,transparent),
    inset 0 0 18px color-mix(in srgb,var(--lf-accent) 13%,transparent) !important;
}
html[data-lf-edge="bevel"] body [data-composer-card],
html[data-lf-edge="bevel"] .lf-panel,
html[data-lf-edge="bevel"] .lf-ambient{
  border:3px double color-mix(in srgb,var(--lf-accent) 32%,rgba(255,255,255,.72)) !important;
  box-shadow:
    inset 1px 1px 0 rgba(255,255,255,.65),
    inset -1px -1px 0 rgba(0,0,0,.18),
    0 18px 50px rgba(4,24,34,.18) !important;
}
#${SCENE_ID}[data-lf-motion="off"] *{animation-play-state:paused !important;}
#${SCENE_ID}[data-lf-paused] *{animation-play-state:paused !important;}
html[${THEME_ATTR}] body:has(#lfs-boot-root) #${SCENE_ID} *{animation-play-state:paused !important;}

/* Sidebar trigger */
.lf-trigger{
  appearance:none;display:inline-flex;align-items:center;justify-content:center;
  flex:0 0 auto;width:30px;height:30px;padding:0;border:1px solid transparent;border-radius:10px;
  background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;
  transition:background .18s ease,color .18s ease,border-color .18s ease,box-shadow .18s ease,transform .1s ease;
}
.lf-trigger:hover{
  color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-bg-layer-1);
  border-color:var(--dsw-alias-border-l1);box-shadow:inset 0 1px 0 rgba(255,255,255,.5);
}
.lf-trigger:active{transform:scale(.94);}
.lf-trigger:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px;}
.lf-trigger svg{display:block;width:19px;height:19px;}

/* Atmosphere panel */
.lf-scrim{
  position:fixed;inset:0;z-index:6400;pointer-events:auto;
  background:var(--dsw-alias-bg-mask-2,rgba(0,0,0,.10));
}
.lf-panel{
  position:fixed;top:68px;right:24px;z-index:6401;width:min(338px,calc(100vw - 24px));
  max-height:calc(100vh - 96px);overflow:auto;pointer-events:auto;
  padding:17px 17px 15px;border:1px solid var(--dsw-alias-border-l1);border-radius:18px;
  background:var(--dsw-alias-bg-overlay);
  color:var(--dsw-alias-label-primary);
  box-shadow:0 24px 70px rgba(4,27,39,.25),inset 0 1px 0 rgba(255,255,255,.55);
  -webkit-backdrop-filter:blur(24px) saturate(120%);backdrop-filter:blur(24px) saturate(120%);
  font-family:var(--dsw-font-family,inherit);
  scrollbar-width:thin;
}
.lf-panel *{box-sizing:border-box;}
.lf-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;}
.lf-eyebrow{
  font-family:ui-monospace,"SFMono-Regular","Cascadia Code",Consolas,monospace;
  font-size:8px;letter-spacing:.22em;text-transform:uppercase;color:var(--dsw-alias-label-tertiary);
}
.lf-title{margin:4px 0 0;font-size:21px;line-height:1.15;font-weight:600;letter-spacing:.01em;}
.lf-title span{color:var(--dsw-alias-brand-primary);font-weight:400;font-size:13px;margin-left:6px;letter-spacing:.06em;}
.lf-stripe{
  height:3px;margin-top:11px;border-radius:999px;opacity:.9;
  background:linear-gradient(90deg,#2f6cb5 0 33%,#edf2f1 33% 67%,#2f6cb5 67% 100%);
  box-shadow:0 0 12px color-mix(in srgb,var(--lf-accent) 24%,transparent);
}
.lf-close{
  appearance:none;width:26px;height:26px;border:1px solid transparent;border-radius:8px;
  background:transparent;color:var(--dsw-alias-label-secondary);font-size:19px;line-height:1;cursor:pointer;
}
.lf-close:hover{background:var(--dsw-alias-bg-layer-1);border-color:var(--dsw-alias-border-l1);color:var(--dsw-alias-label-primary);}
.lf-close:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px;}
.lf-tabs{
  display:flex;gap:3px;margin:12px 0 6px;padding:3px;border-radius:9px;
  background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l3);
}
.lf-tab{
  appearance:none;flex:1;border:0;border-radius:6px;background:transparent;
  color:var(--dsw-alias-label-secondary);padding:5px 2px;font-size:10px;cursor:pointer;
  transition:background .15s,color .15s;
}
.lf-tab[data-active="true"]{background:var(--dsw-alias-bg-overlay);color:var(--dsw-alias-brand-primary);box-shadow:0 1px 3px rgba(4,27,39,.08);}
.lf-tab:hover{color:var(--dsw-alias-brand-primary);}
.lf-tab:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px;}
.lf-tabcontent{min-height:120px;}
.lf-section{
  margin:8px 0 5px;font-family:ui-monospace,Consolas,monospace;font-size:7.5px;
  letter-spacing:.18em;text-transform:uppercase;color:var(--dsw-alias-label-tertiary);
}
.lf-swatches{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin:0 0 8px;}
.lf-swatch{
  appearance:none;position:relative;height:27px;border-radius:8px;border:1px solid var(--dsw-alias-border-l2);
  cursor:pointer;padding:0;transition:transform .15s,border-color .15s,box-shadow .15s;
}
.lf-swatch:hover{transform:translateY(-1px);}
.lf-swatch[data-active="true"]{border-color:var(--dsw-alias-brand-primary);box-shadow:0 0 0 2px var(--dsw-alias-bg-overlay),0 0 0 3px var(--dsw-alias-brand-primary);}
.lf-swatch:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px;}
.lf-colorrow{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:9px 0 7px;border-top:1px solid var(--dsw-alias-border-l3);}
.lf-color{
  appearance:none;-webkit-appearance:none;width:42px;height:25px;padding:2px;border-radius:7px;
  border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);cursor:pointer;
}
.lf-color::-webkit-color-swatch-wrapper{padding:0;}
.lf-color::-webkit-color-swatch{border:0;border-radius:4px;}
.lf-color::-moz-color-swatch{border:0;border-radius:4px;}
.lf-color:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px;}
.lf-presets{display:flex;gap:6px;margin:10px 0 2px;flex-wrap:wrap;}
.lf-preset{
  appearance:none;border:1px solid var(--dsw-alias-border-l2);border-radius:999px;
  background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);
  padding:5px 10px;font-size:10px;cursor:pointer;transition:background .15s,color .15s,border-color .15s;
}
.lf-preset:hover{color:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);}
.lf-preset[data-active="true"]{color:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-bg-layer-2);}
.lf-preset:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px;}
.lf-materials{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:6px 0 4px;}
.lf-material{
  appearance:none;border:1px solid var(--dsw-alias-border-l2);border-radius:9px;
  background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);
  padding:5px;cursor:pointer;text-align:left;font-family:inherit;
  transition:border-color .15s,color .15s,background .15s;
}
.lf-material:hover{border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-label-primary);}
.lf-material[data-active="true"]{border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-bg-layer-2);}
.lf-material:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px;}
.lf-material i{
  display:block;height:24px;border-radius:6px;margin-bottom:4px;border:1px solid rgba(255,255,255,.25);
  background:linear-gradient(135deg,rgba(255,255,255,.42),rgba(198,220,228,.12));
}
.lf-material span{display:block;font-size:9px;line-height:1.2;}
.lf-material small{display:block;font-family:ui-monospace,Consolas,monospace;font-size:6.5px;letter-spacing:.08em;color:var(--dsw-alias-label-tertiary);margin-top:1px;}
.lf-material[data-material="fluted"] i{background:repeating-linear-gradient(90deg,rgba(255,255,255,.55) 0 1px,rgba(255,255,255,.08) 1px 4px,rgba(10,40,52,.10) 4px 5px);}
.lf-material[data-material="smoked"] i{background:linear-gradient(135deg,rgba(8,24,32,.85),rgba(152,112,100,.48));}
.lf-material[data-material="frost"] i{background:radial-gradient(circle,rgba(255,255,255,.80) .7px,transparent 1.4px),rgba(228,240,242,.35);background-size:4px 4px;}
.lf-material[data-material="iridescent"] i{background:conic-gradient(from 210deg,rgba(255,170,160,.7),rgba(147,214,228,.65),rgba(210,180,240,.7),rgba(255,224,160,.6),rgba(255,170,160,.7));}
.lf-material[data-material="metal"] i{background:repeating-linear-gradient(96deg,rgba(255,255,255,.75) 0 1px,rgba(255,255,255,.05) 1px 3px,rgba(0,0,0,.10) 3px 4px),rgba(160,184,190,.42);}
.lf-material[data-material="paper"] i{background:radial-gradient(circle,rgba(130,95,52,.28) .7px,transparent 1.6px),rgba(228,209,178,.60);background-size:5px 5px;}
.lf-material[data-material="film"] i{background:radial-gradient(circle,rgba(255,214,170,.55) .6px,transparent 1.2px),rgba(166,112,84,.45);background-size:3px 3px;}
.lf-material[data-material="rain"] i{background:repeating-linear-gradient(105deg,transparent 0 7px,rgba(228,246,250,.60) 7px 8px),rgba(100,142,154,.42);}
.lf-edges{display:flex;gap:6px;flex-wrap:wrap;margin:6px 0 4px;}
.lf-edgechip{
  appearance:none;border:1px solid var(--dsw-alias-border-l2);border-radius:7px;
  background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);
  padding:5px 9px;font-size:9px;cursor:pointer;
}
.lf-edgechip:hover,.lf-edgechip[data-active="true"]{color:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);}
.lf-edgechip:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px;}
.lf-row{display:block;padding:10px 0 2px;border-top:1px solid var(--dsw-alias-border-l3);margin-top:7px;}
.lf-row:first-of-type{border-top:0;}
.lf-rowhead{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin-bottom:7px;}
.lf-label{font-size:11px;letter-spacing:.02em;color:var(--dsw-alias-label-primary);}
.lf-label small{display:block;margin-top:2px;font-family:ui-monospace,Consolas,monospace;font-size:7.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--dsw-alias-label-tertiary);}
.lf-value{font-family:ui-monospace,Consolas,monospace;font-size:10px;color:var(--dsw-alias-brand-primary);font-variant-numeric:tabular-nums;}
.lf-range{
  -webkit-appearance:none;appearance:none;display:block;width:100%;height:16px;margin:0 0 4px;
  padding:0;background:transparent;cursor:pointer;
}
.lf-range::-webkit-slider-runnable-track{height:3px;border-radius:2px;background:var(--dsw-alias-border-l2);}
.lf-range::-webkit-slider-thumb{
  -webkit-appearance:none;appearance:none;width:14px;height:14px;margin-top:-5.5px;border:2px solid var(--dsw-alias-bg-overlay);
  border-radius:50%;background:var(--dsw-alias-brand-primary);box-shadow:0 0 0 1px var(--dsw-alias-brand-primary);
}
.lf-range::-moz-range-track{height:3px;border-radius:2px;background:var(--dsw-alias-border-l2);}
.lf-range::-moz-range-thumb{width:11px;height:11px;border:2px solid var(--dsw-alias-bg-overlay);border-radius:50%;background:var(--dsw-alias-brand-primary);}
.lf-range:focus-visible{outline:none;}
.lf-range:focus-visible::-webkit-slider-thumb{box-shadow:0 0 0 3px color-mix(in srgb,var(--dsw-alias-brand-primary) 30%,transparent);}
.lf-motionrow{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 0 3px;border-top:1px solid var(--dsw-alias-border-l3);margin-top:7px;}
.lf-switch{
  appearance:none;position:relative;width:38px;height:21px;border-radius:999px;border:1px solid var(--dsw-alias-border-l2);
  background:var(--dsw-alias-bg-layer-2);cursor:pointer;padding:0;transition:background .18s,border-color .18s;
}
.lf-switch i{position:absolute;left:3px;top:3px;width:13px;height:13px;border-radius:50%;background:var(--dsw-alias-label-tertiary);transition:transform .18s,background .18s;}
.lf-switch[aria-checked="true"]{background:color-mix(in srgb,var(--dsw-alias-brand-primary) 30%,var(--dsw-alias-bg-layer-2));border-color:var(--dsw-alias-brand-primary);}
.lf-switch[aria-checked="true"] i{transform:translateX(16px);background:var(--dsw-alias-brand-primary);}
.lf-switch:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px;}
.lf-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:12px;padding-top:11px;border-top:1px solid var(--dsw-alias-border-l3);}
.lf-actions{display:flex;gap:6px;flex-wrap:wrap;}
.lf-action{
  appearance:none;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;
  background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);
  padding:6px 9px;font-size:10px;cursor:pointer;transition:background .15s,color .15s,border-color .15s;
}
.lf-action:hover{color:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-bg-layer-2);}
.lf-action.primary{color:var(--lf-accent-ink,#fff8ef);background:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);}
.lf-action.primary:hover{color:var(--lf-accent-ink,#fff8ef);filter:brightness(1.06);}
body[data-ds-dark-theme] .lf-action.primary{color:var(--lf-accent-dark-ink,#10242c);}
body[data-ds-dark-theme] .lf-action.primary:hover{color:var(--lf-accent-dark-ink,#10242c);}
.lf-action:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px;}
.lf-note{margin-top:9px;font-family:ui-monospace,Consolas,monospace;font-size:7.5px;line-height:1.6;letter-spacing:.1em;text-transform:uppercase;color:var(--dsw-alias-label-tertiary);}
.lf-togglerow{
  display:flex;align-items:center;justify-content:space-between;gap:12px;
  padding:10px 0 3px;border-top:1px solid var(--dsw-alias-border-l3);margin-top:6px;
}
.lf-quote-preview{
  display:flex;align-items:flex-start;gap:8px;margin:10px 0 8px;padding:10px 12px;
  border:1px solid var(--dsw-alias-border-l3);border-radius:10px;
  background:linear-gradient(120deg,var(--dsw-alias-bg-layer-1),var(--dsw-alias-bg-layer-2));
}
.lf-quote-preview-mark{font-family:Georgia,"Songti SC",serif;font-size:26px;line-height:.9;color:var(--dsw-alias-brand-primary);opacity:.7;}
.lf-quote-preview-body{min-width:0;}
.lf-quote-preview-text{font-size:11.5px;line-height:1.65;color:var(--dsw-alias-label-primary);}
.lf-quote-preview-src{margin-top:4px;font-family:ui-monospace,Consolas,monospace;font-size:8px;letter-spacing:.08em;color:var(--dsw-alias-label-tertiary);}
.lf-quote-actions{display:flex;justify-content:flex-end;gap:6px;margin-bottom:2px;}
.lf-stereo-actions{display:flex;justify-content:flex-end;gap:6px;margin:8px 0 2px;}
.lf-stereo-hint{margin-top:9px;font-size:9px;line-height:1.7;color:var(--dsw-alias-label-tertiary);}
.lf-location-current{display:flex;align-items:baseline;gap:7px;margin:4px 0 8px;padding:7px 9px;border-radius:8px;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l3);}
.lf-location-current b{font-size:11px;font-weight:600;color:var(--dsw-alias-label-primary);}
.lf-location-current span{font-family:ui-monospace,Consolas,monospace;font-size:8px;color:var(--dsw-alias-label-tertiary);}
.lf-searchrow{display:flex;gap:6px;align-items:center;}
.lf-input{
  flex:1;min-width:0;height:28px;padding:0 9px;border-radius:7px;
  border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);
  color:var(--dsw-alias-label-primary);font-family:inherit;font-size:11px;outline:none;
}
.lf-input::placeholder{color:var(--dsw-alias-label-tertiary);}
.lf-input:focus{border-color:var(--dsw-alias-brand-primary);box-shadow:0 0 0 2px color-mix(in srgb,var(--dsw-alias-brand-primary) 22%,transparent);}
.lf-geo-note{margin-top:6px;font-size:9px;line-height:1.6;color:var(--dsw-alias-label-tertiary);}
.lf-geo-results{display:flex;flex-direction:column;gap:2px;margin-top:6px;max-height:138px;overflow:auto;}
.lf-geo-result{
  appearance:none;display:flex;align-items:baseline;justify-content:space-between;gap:8px;
  width:100%;padding:6px 8px;border:0;border-radius:6px;background:transparent;
  color:var(--dsw-alias-label-primary);text-align:left;cursor:pointer;font-family:inherit;
}
.lf-geo-result:hover{background:var(--dsw-alias-bg-layer-1);}
.lf-geo-result b{font-size:10.5px;font-weight:600;}
.lf-geo-result span{font-family:ui-monospace,Consolas,monospace;font-size:7.5px;color:var(--dsw-alias-label-tertiary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.lf-quickplaces{display:flex;flex-wrap:wrap;gap:5px;margin-top:7px;}
.lf-place-chip{
  appearance:none;border:1px solid var(--dsw-alias-border-l2);border-radius:999px;
  background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);
  padding:4px 8px;font-size:9px;cursor:pointer;
}
.lf-place-chip:hover{color:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);}
.lf-place-chip:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px;}
.lf-action:disabled{opacity:.45;cursor:wait;}

/* Ambient quote/time/weather bar in the composer dock. */
.lf-ambient{
  display:flex;align-items:center;gap:18px;width:100%;min-width:0;min-height:54px;
  padding:9px 14px;border-radius:17px;
  border:1px solid color-mix(in srgb,var(--lf-accent) 10%,var(--dsw-alias-border-l1));
  background:
    radial-gradient(80% 160% at 100% 0%,color-mix(in srgb,var(--lf-accent) 8%,transparent),transparent 55%),
    linear-gradient(120deg,var(--dsw-alias-bg-layer-1),var(--dsw-alias-bg-layer-2));
  box-shadow:0 10px 30px rgba(4,24,32,.12),inset 0 1px 0 rgba(255,255,255,.55);
  -webkit-backdrop-filter:blur(20px) saturate(126%);backdrop-filter:blur(20px) saturate(126%);
  color:var(--dsw-alias-label-primary);
}
.lf-quote{
  appearance:none;display:flex;align-items:center;gap:9px;min-width:0;flex:1;
  border:0;background:transparent;color:inherit;text-align:left;cursor:pointer;
  padding:4px 6px;border-radius:9px;font-family:inherit;
}
.lf-quote:hover{background:var(--dsw-alias-bg-layer-2);}
.lf-quote:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px;}
.lf-quote-mark{font-family:Georgia,"Songti SC",serif;font-size:24px;line-height:1;color:var(--dsw-alias-brand-primary);opacity:.75;flex:none;}
.lf-quote-text{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:14px;line-height:1.5;letter-spacing:.01em;color:var(--dsw-alias-label-primary);}
.lf-quote-source{font-family:ui-monospace,Consolas,monospace;font-size:9.5px;letter-spacing:.04em;color:var(--dsw-alias-label-tertiary);white-space:nowrap;flex:none;}
.lf-quote-refresh{font-size:13px;color:var(--dsw-alias-label-tertiary);opacity:.45;flex:none;transition:opacity .15s,color .15s,transform .15s;}
.lf-quote:hover .lf-quote-refresh{opacity:1;color:var(--dsw-alias-brand-primary);transform:rotate(-35deg);}
.lf-env{
  display:grid;grid-template-columns:62px 1px minmax(0,1fr);align-items:center;gap:10px;
  flex:0 0 228px;width:228px;min-width:228px;
  padding:5px 11px;border-radius:12px;
  border:1px solid var(--dsw-alias-border-l3);
  background:color-mix(in srgb,var(--dsw-alias-bg-layer-1) 74%,transparent);
  color:var(--dsw-alias-label-secondary);
}
.lf-env-clock{display:flex;flex-direction:column;justify-content:center;min-width:0;line-height:1;}
.lf-env-time{font-family:ui-monospace,"SFMono-Regular",Consolas,monospace;font-size:16.5px;font-weight:600;line-height:20px;color:var(--dsw-alias-label-primary);font-variant-numeric:tabular-nums;letter-spacing:0;}
.lf-env-date{font-family:var(--dsw-font-family);font-size:8.5px;line-height:12px;color:var(--dsw-alias-label-tertiary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.lf-env-sep{width:1px;height:30px;background:var(--dsw-alias-border-l2);align-self:center;}
.lf-env-placewrap{display:flex;flex-direction:column;justify-content:center;gap:0;min-width:0;line-height:1;}
.lf-env-place{overflow:hidden;text-overflow:ellipsis;font-family:var(--dsw-font-family);font-size:11px;line-height:14px;font-weight:600;color:var(--dsw-alias-label-primary);white-space:nowrap;}
.lf-env-weather{font-family:ui-monospace,Consolas,monospace;font-size:11.5px;line-height:15px;color:var(--dsw-alias-brand-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.lf-env-weather[data-state="loading"]{color:var(--dsw-alias-label-tertiary);}
.lf-env-weather[data-state="error"]{color:var(--dsw-alias-label-tertiary);}
@media (max-width: 900px){
  .lf-quote-source{display:none;}
  .lf-env{flex-basis:204px;width:204px;min-width:204px;grid-template-columns:56px 1px minmax(0,1fr);gap:8px;padding:5px 9px;}
  .lf-env-time{font-size:15.5px;}
  .lf-env-place{font-size:10px;}
  .lf-env-weather{font-size:10.5px;}
}
@media (max-width: 700px){
  .lf-ambient{flex-direction:column;align-items:stretch;gap:7px;padding:9px 11px;}
  .lf-env{flex-basis:auto;width:min(100%,228px);min-width:0;align-self:flex-end;}
  .lf-quote-text{white-space:normal;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;}
}

@keyframes lf-kenburns{
  from{transform:scale(1.02) translate3d(0,0,0);}
  to{transform:scale(1.075) translate3d(-1.1%,-.6%,0);}
}
@keyframes lf-float3d{
  from{transform:rotateX(-.32deg) rotateY(-.62deg);}
  to{transform:rotateX(.32deg) rotateY(.62deg);}
}
@keyframes lf-skydrift{
  from{transform:translate3d(-1%,0,0);opacity:.72;}
  to{transform:translate3d(1.2%,-.4%,0);opacity:1;}
}
@keyframes lf-storelight{
  from{opacity:.72;}
  to{opacity:1;}
}
@keyframes lf-cloud{
  from{transform:translate3d(-8vw,0,0) scale(1);}
  to{transform:translate3d(14vw,-.5vh,0) scale(1.05);}
}
@keyframes lf-mistdrift{
  from{transform:translate3d(-5vw,0,0) scaleX(.96);}
  to{transform:translate3d(7vw,-.4vh,0) scaleX(1.06);}
}
@keyframes lf-dust{
  from{background-position:0 0,120px 80px,60px 140px;}
  to{background-position:160px -220px,-120px -140px,180px -90px;}
}
@media (max-width: 700px){
  .lf-panel{top:58px;left:12px;right:12px;width:auto;max-height:calc(100vh - 78px);}
}
@media (prefers-reduced-transparency: reduce){
  .lf-veil{-webkit-backdrop-filter:none !important;backdrop-filter:none !important;background:rgba(238,246,248,.80);}
  body[data-ds-dark-theme] .lf-veil{background:rgba(4,17,25,.82);}
}
@media (prefers-reduced-motion: reduce){
  #${SCENE_ID},#${SCENE_ID} *{animation:none !important;transition-duration:1ms !important;}
}
`

    var SCENE_HTML = `
<div class="lf-camera">
  <div class="lf-photo"></div>
  <div class="lf-skyglow"></div>
  <div class="lf-storeglow"></div>
</div>
<div class="lf-cloud c1"></div>
<div class="lf-cloud c2"></div>
<div class="lf-mist m1"></div>
<div class="lf-mist m2"></div>
<div class="lf-mist m3"></div>
<div class="lf-dust"></div>
<div class="lf-finish"></div>
<div class="lf-grade"></div>
<div class="lf-veil"></div>
<div class="lf-tint"></div>
<div class="lf-leak"></div>
<div class="lf-grain"></div>
<div class="lf-vignette"></div>
`

    function clamp(value, min, max, fallback) {
      var number = Number(value)
      return Number.isFinite(number) ? Math.min(max, Math.max(min, number)) : fallback
    }

    function isHex(value) {
      return typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value)
    }

    function normalizeHex(value, fallback) {
      return isHex(value) ? value.toLowerCase() : fallback
    }

    function hexToRgb(hex) {
      return [
        parseInt(hex.slice(1, 3), 16),
        parseInt(hex.slice(3, 5), 16),
        parseInt(hex.slice(5, 7), 16),
      ]
    }

    function rgbToHex(rgb) {
      return '#' + rgb.map(function (value) {
        return Math.round(Math.min(255, Math.max(0, value))).toString(16).padStart(2, '0')
      }).join('')
    }

    function mixHex(hex, target, amount) {
      var from = hexToRgb(hex)
      var to = hexToRgb(target)
      return rgbToHex(from.map(function (value, index) {
        return value + (to[index] - value) * amount
      }))
    }

    function relativeLuminance(hex) {
      var channels = hexToRgb(hex).map(function (value) {
        var channel = value / 255
        return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4)
      })
      return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
    }

    function contrastInk(hex) {
      var luminance = relativeLuminance(hex)
      var onWhite = 1.05 / (luminance + 0.05)
      var onDark = (luminance + 0.05) / (relativeLuminance('#10242c') + 0.05)
      return onWhite >= onDark ? '#fff8ef' : '#10242c'
    }

    function normalizeLocation(raw) {
      if (!raw || typeof raw !== 'object') return Object.assign({}, DEFAULT_LOCATION)
      var latitude = Number(raw.latitude)
      var longitude = Number(raw.longitude)
      if (!Number.isFinite(latitude) || !Number.isFinite(longitude)
        || latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        return Object.assign({}, DEFAULT_LOCATION)
      }
      return {
        name: String(raw.name || '未命名地点').slice(0, 60),
        admin1: String(raw.admin1 || '').slice(0, 60),
        country: String(raw.country || '').slice(0, 60),
        latitude: Math.round(latitude * 10000) / 10000,
        longitude: Math.round(longitude * 10000) / 10000,
        timezone: String(raw.timezone || '').slice(0, 60),
      }
    }

    function isQuoteCategory(value) {
      return value === 'emotion' || value === 'motivation' || value === 'football' || value === 'mixed'
    }

    function normalize(raw) {
      var value = raw && typeof raw === 'object' ? raw : {}
      return {
        brightness: clamp(value.brightness, 0.65, 1.30, DEFAULTS.brightness),
        glass: clamp(value.glass, 0.35, 0.92, DEFAULTS.glass),
        sidebar: clamp(value.sidebar, 0, 0.80, DEFAULTS.sidebar),
        frost: clamp(value.frost, 0, 30, DEFAULTS.frost),
        blur: clamp(value.blur, 0, 10, DEFAULTS.blur),
        mist: clamp(value.mist, 0, 1, DEFAULTS.mist),
        grain: clamp(value.grain, 0, 0.12, DEFAULTS.grain),
        zoom: clamp(value.zoom, 1, 1.30, DEFAULTS.zoom),
        saturation: clamp(value.saturation, 0.70, 1.35, DEFAULTS.saturation),
        depth: clamp(value.depth, 0.75, 1.2, DEFAULTS.depth),
        parallax: clamp(value.parallax, 0, 1, DEFAULTS.parallax),
        viewX: clamp(value.viewX, -35, 35, DEFAULTS.viewX),
        viewY: Number(value.viewY) === 0 ? DEFAULTS.viewY : clamp(value.viewY, 2, 22, DEFAULTS.viewY),
        autoOrbit: value.autoOrbit !== false,
        accent: normalizeHex(value.accent, DEFAULTS.accent),
        tint: normalizeHex(value.tint, DEFAULTS.tint),
        tintStrength: clamp(value.tintStrength, 0, 0.45, DEFAULTS.tintStrength),
        material: isMaterial(value.material) ? value.material : DEFAULTS.material,
        materialStrength: clamp(value.materialStrength, 0, 0.60, DEFAULTS.materialStrength),
        textureScale: clamp(value.textureScale, 0.5, 2.5, DEFAULTS.textureScale),
        sheen: clamp(value.sheen, 0, 0.40, DEFAULTS.sheen),
        edge: isEdge(value.edge) ? value.edge : DEFAULTS.edge,
        leakColor: normalizeHex(value.leakColor, DEFAULTS.leakColor),
        leakStrength: clamp(value.leakStrength, 0, 0.40, DEFAULTS.leakStrength),
        vignette: clamp(value.vignette, 0, 1.5, DEFAULTS.vignette),
        ambientOn: value.ambientOn !== false,
        quoteOn: value.quoteOn !== false,
        quoteAuto: value.quoteAuto !== false,
        envOn: value.envOn !== false,
        quoteCategory: isQuoteCategory(value.quoteCategory) ? value.quoteCategory : DEFAULTS.quoteCategory,
        location: normalizeLocation(value.location),
        motion: value.motion !== false,
      }
    }

    function loadSettings() {
      try {
        return normalize(JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null'))
      } catch (error) {
        return normalize(null)
      }
    }

    var settings = loadSettings()
    var panelOpen = false
    var activePreset = null
    var listeners = new Set()
    var quoteCursor = Math.floor(Math.random() * 997)
    var modelRenderer = null

    function quoteFor(category, cursor) {
      var list = category === 'mixed'
        ? ALL_QUOTES
        : (QUOTES[category] || QUOTES.emotion)
      if (!list.length) return { text: '' }
      var index = ((cursor % list.length) + list.length) % list.length
      return list[index]
    }

    var saveTimer = 0

    function saveSettings() {
      if (saveTimer) {
        window.clearTimeout(saveTimer)
        saveTimer = 0
      }
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
      } catch (error) {
        /* Private/locked storage keeps the live values for this page. */
      }
    }

    function scheduleSave() {
      if (saveTimer) window.clearTimeout(saveTimer)
      saveTimer = window.setTimeout(saveSettings, 120)
    }

    function round(value) {
      return Math.round(value * 1000) / 1000
    }

    var camera = {
      x: 0,
      y: 0,
      dragging: false,
      startX: 0,
      startY: 0,
      baseX: 0,
      baseY: 0,
      dragX: 0,
      dragY: 0,
    }
    var cameraFrame = 0

    function applyCamera() {
      var baseX = camera.dragging ? camera.dragX : settings.viewX
      var baseY = camera.dragging ? camera.dragY : settings.viewY
      var pointerX = camera.x * settings.parallax * 3.2
      var pointerY = camera.y * settings.parallax * 2.5
      var rx = Math.max(-4, Math.min(4, baseY + pointerY))
      var ry = Math.max(-6, Math.min(6, baseX + pointerX))
      document.documentElement.style.setProperty('--lf-rx', round(rx) + 'deg')
      document.documentElement.style.setProperty('--lf-ry', round(ry) + 'deg')
    }

    function scheduleCamera() {
      if (cameraFrame) return
      cameraFrame = window.requestAnimationFrame(function () {
        cameraFrame = 0
        applyCamera()
      })
    }

    function bindCamera() {
      function onMove(event) {
        camera.x = (event.clientX / Math.max(1, window.innerWidth)) * 2 - 1
        camera.y = (event.clientY / Math.max(1, window.innerHeight)) * 2 - 1
        if (camera.dragging) {
          camera.dragX = Math.max(-35, Math.min(35, camera.baseX + (event.clientX - camera.startX) * 0.12))
          camera.dragY = Math.max(2, Math.min(22, camera.baseY - (event.clientY - camera.startY) * 0.055))
        }
        scheduleCamera()
      }

      function onDown(event) {
        if (!event.altKey || event.button !== 0) return
        var target = event.target
        if (target && target.closest && target.closest('button, a, input, textarea, select, [contenteditable="true"], [role="button"]')) return
        camera.dragging = true
        camera.startX = event.clientX
        camera.startY = event.clientY
        camera.baseX = settings.viewX
        camera.baseY = settings.viewY
        camera.dragX = settings.viewX
        camera.dragY = settings.viewY
        document.documentElement.classList.add('lf-camera-dragging')
        event.preventDefault()
      }

      function onUp() {
        if (!camera.dragging) return
        camera.dragging = false
        document.documentElement.classList.remove('lf-camera-dragging')
        store.update({ viewX: camera.dragX, viewY: camera.dragY })
      }

      function onBlur() {
        camera.x = 0
        camera.y = 0
        if (camera.dragging) onUp()
        scheduleCamera()
      }

      function onDouble(event) {
        if (!event.altKey) return
        event.preventDefault()
        store.update({ viewX: 0, viewY: 8 })
      }

      function onLeave() {
        camera.x = 0
        camera.y = 0
        if (camera.dragging) onUp()
        scheduleCamera()
      }

      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerdown', onDown, true)
      window.addEventListener('pointerup', onUp, true)
      window.addEventListener('pointercancel', onUp, true)
      window.addEventListener('blur', onBlur)
      window.addEventListener('dblclick', onDouble, true)
      document.documentElement.addEventListener('pointerleave', onLeave)

      return function () {
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerdown', onDown, true)
        window.removeEventListener('pointerup', onUp, true)
        window.removeEventListener('pointercancel', onUp, true)
        window.removeEventListener('blur', onBlur)
        window.removeEventListener('dblclick', onDouble, true)
        document.documentElement.removeEventListener('pointerleave', onLeave)
        document.documentElement.classList.remove('lf-camera-dragging')
        if (cameraFrame) {
          window.cancelAnimationFrame(cameraFrame)
          cameraFrame = 0
        }
      }
    }

    function applySettings() {
      var root = document.documentElement
      var glass = settings.glass
      var dark = Math.max(0.28, glass - 0.08)
      var sidebar = settings.sidebar
      var veil = Math.max(0.15, Math.min(0.58, glass * 0.65))
      var accentDark = mixHex(settings.accent, '#ffffff', 0.32)
      var accentInk = contrastInk(settings.accent)
      var accentDarkInk = contrastInk(accentDark)
      root.style.setProperty('--lf-glass', String(round(glass)))
      root.style.setProperty('--lf-glass-1', String(round(Math.min(0.985, glass + 0.04))))
      root.style.setProperty('--lf-glass-2', String(round(Math.min(0.99, glass + 0.10))))
      root.style.setProperty('--lf-glass-3', String(round(Math.min(0.995, glass + 0.16))))
      root.style.setProperty('--lf-sidebar', String(round(sidebar)))
      root.style.setProperty('--lf-veil', String(round(veil)))
      root.style.setProperty('--lf-glass-d', String(round(dark)))
      root.style.setProperty('--lf-glass-d1', String(round(Math.min(0.99, dark + 0.04))))
      root.style.setProperty('--lf-glass-d2', String(round(Math.min(0.995, dark + 0.10))))
      root.style.setProperty('--lf-glass-d3', String(round(Math.min(0.998, dark + 0.16))))
      root.style.setProperty('--lf-sidebar-d', String(round(Math.max(0.06, sidebar - 0.03))))
      root.style.setProperty('--lf-frost', settings.frost + 'px')
      root.style.setProperty('--lf-bright', String(round(settings.brightness)))
      root.style.setProperty('--lf-photo-blur', settings.blur + 'px')
      root.style.setProperty('--lf-mist', String(round(settings.mist)))
      root.style.setProperty('--lf-grain', String(round(settings.grain)))
      root.style.setProperty('--lf-zoom', String(round(settings.zoom)))
      root.style.setProperty('--lf-sat', String(round(settings.saturation)))
      root.style.setProperty('--lf-accent', settings.accent)
      root.style.setProperty('--lf-accent-dark', accentDark)
      root.style.setProperty('--lf-accent-ink', accentInk)
      root.style.setProperty('--lf-accent-dark-ink', accentDarkInk)
      root.style.setProperty('--lf-tint', settings.tint)
      root.style.setProperty('--lf-tint-strength', String(round(settings.tintStrength)))
      root.style.setProperty('--lf-tex-strength', String(round(settings.materialStrength)))
      root.style.setProperty('--lf-tex-scale', String(round(settings.textureScale)))
      root.style.setProperty('--lf-sheen', String(round(settings.sheen)))
      root.style.setProperty('--lf-leak', settings.leakColor)
      root.style.setProperty('--lf-leak-strength', String(round(settings.leakStrength)))
      root.style.setProperty('--lf-vignette-strength', String(round(settings.vignette)))
      root.setAttribute('data-lf-material', settings.material)
      root.setAttribute('data-lf-edge', settings.edge)
      root.style.setProperty('--lf-depth', String(round(settings.depth)))
      var perspective = 1050
      root.style.setProperty('--lf-slice-back-scale',
        String(round(settings.zoom * (perspective + 160 * settings.depth) / perspective)))
      root.style.setProperty('--lf-slice-mountain-scale',
        String(round(settings.zoom * (perspective + 80 * settings.depth) / perspective)))
      root.style.setProperty('--lf-slice-store-scale',
        String(round(settings.zoom * (perspective - 40 * settings.depth) / perspective)))
      root.style.setProperty('--lf-slice-foreground-scale',
        String(round(settings.zoom * (perspective - 80 * settings.depth) / perspective)))
      var scene = document.getElementById(SCENE_ID)
      if (scene) {
        scene.setAttribute('data-lf-motion', settings.motion ? 'on' : 'off')
        scene.setAttribute('data-lf-auto', settings.autoOrbit ? 'on' : 'off')
      }
      applyCamera()
    }

    function snapshot() {
      return {
        settings: Object.assign({}, settings),
        open: panelOpen,
        preset: activePreset,
        quoteCursor: quoteCursor,
      }
    }

    function emit() {
      listeners.forEach(function (listener) {
        try { listener() } catch (error) { /* one listener must not break the rest */ }
      })
    }

    var VISUAL_KEYS = ['brightness', 'glass', 'sidebar', 'frost', 'blur', 'mist', 'grain', 'zoom', 'saturation', 'accent', 'tint', 'tintStrength', 'motion']

    function update(patch, preservePreset) {
      var previousCategory = settings.quoteCategory
      settings = normalize(Object.assign({}, settings, patch))
      if (!preservePreset && VISUAL_KEYS.some(function (key) {
        return Object.prototype.hasOwnProperty.call(patch, key)
      })) {
        activePreset = null
      }
      if (Object.prototype.hasOwnProperty.call(patch, 'quoteCategory')
        && settings.quoteCategory !== previousCategory) {
        quoteCursor = 0
      }
      applySettings()
      scheduleSave()
      emit()
    }

    function setOpen(next) {
      var value = !!next
      if (panelOpen === value) return
      panelOpen = value
      emit()
      if (!value) {
        window.setTimeout(function () {
          var trigger = document.querySelector('[data-lf-trigger]')
          if (trigger instanceof HTMLElement) trigger.focus()
        }, 20)
      }
    }

    var store = {
      snapshot: snapshot,
      subscribe: function (listener) {
        listeners.add(listener)
        return function () { listeners.delete(listener) }
      },
      toggle: function () { setOpen(!panelOpen) },
      close: function () { setOpen(false) },
      update: update,
      refreshQuote: function () {
        quoteCursor += 1
        emit()
      },
      reset: function () {
        activePreset = 'dusk'
        quoteCursor = 0
        update(Object.assign({}, DEFAULTS), true)
      },
      preset: function (name) {
        var preset = PRESETS[name]
        if (!preset) return
        activePreset = name
        update(Object.assign({}, preset), true)
      },
    }

    applySettings()

    function useStore() {
      var state = React.useState(store.snapshot())
      var value = state[0]
      var setValue = state[1]
      React.useEffect(function () {
        return store.subscribe(function () { setValue(store.snapshot()) })
      }, [])
      return value
    }

    function formatValue(control, value) {
      if (control.kind === 'px') return (Math.round(value * 10) / 10) + 'px'
      if (control.kind === 'deg') return value.toFixed(1) + '°'
      return Math.round(value * 100) + '%'
    }

    function weatherLabel(code) {
      return WEATHER_TEXT[code] || '天气'
    }

    function formatClock(date) {
      return String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0')
    }

    function formatDate(date) {
      return (date.getMonth() + 1) + '月' + date.getDate() + '日 ' + WEEKDAYS[date.getDay()]
    }

    function AmbientBar() {
      var state = useStore()
      var clockState = React.useState(function () { return new Date() })
      var now = clockState[0]
      var setNow = clockState[1]
      var weatherState = React.useState({ state: 'idle', key: '' })
      var weather = weatherState[0]
      var setWeather = weatherState[1]
      var settings = state.settings
      var location = settings.location

      React.useEffect(function () {
        if (!settings.ambientOn || (!settings.quoteOn && !settings.envOn)) return undefined
        setNow(new Date())
        var timer = window.setInterval(function () { setNow(new Date()) }, 1000)
        return function () { window.clearInterval(timer) }
      }, [settings.ambientOn, settings.quoteOn, settings.envOn])

      React.useEffect(function () {
        if (!settings.ambientOn || !settings.quoteOn || !settings.quoteAuto) return undefined
        var timer = window.setInterval(function () {
          store.refreshQuote()
        }, 120000)
        return function () { window.clearInterval(timer) }
      }, [settings.ambientOn, settings.quoteOn, settings.quoteAuto])

      React.useEffect(function () {
        if (!settings.ambientOn || !settings.envOn) return undefined
        var key = location.latitude.toFixed(4) + ',' + location.longitude.toFixed(4)
        var cancelled = false
        var controller = new AbortController()
        setWeather(function (previous) {
          return previous.key === key && previous.state === 'ready'
            ? previous
            : { state: 'loading', key: key }
        })

        function load() {
          fetch('/lawson-fuji-skin/weather?lat=' + encodeURIComponent(location.latitude)
            + '&lon=' + encodeURIComponent(location.longitude), { signal: controller.signal })
            .then(function (response) {
              if (!response.ok) throw new Error('weather ' + response.status)
              return response.json()
            })
            .then(function (data) {
              if (cancelled) return
              if (!Number.isFinite(Number(data.temperature))) throw new Error('weather missing')
              setWeather({
                state: 'ready',
                key: key,
                temperature: Number(data.temperature),
                code: Number(data.code),
              })
            })
            .catch(function (error) {
              if (cancelled || (error && error.name === 'AbortError')) return
              setWeather({ state: 'error', key: key })
            })
        }

        load()
        var timer = window.setInterval(load, 10 * 60 * 1000)
        return function () {
          cancelled = true
          controller.abort()
          window.clearInterval(timer)
        }
      }, [settings.ambientOn, settings.envOn, location.latitude, location.longitude])

      if (!settings.ambientOn) return null
      if (!settings.quoteOn && !settings.envOn) return null

      var quote = quoteFor(settings.quoteCategory, state.quoteCursor)
      var weatherText = '--°'
      if (weather.state === 'ready') {
        weatherText = Math.round(weather.temperature) + '° ' + weatherLabel(weather.code)
      } else if (weather.state === 'loading') {
        weatherText = '天气…'
      } else if (weather.state === 'error') {
        weatherText = '天气离线'
      }
      var fullPlace = [location.name, location.admin1, location.country]
        .filter(Boolean).join(' · ')

      return h('div', {
        className: 'lf-ambient',
        role: 'group',
        'aria-label': '氛围语句、时间与天气',
      },
        settings.quoteOn ? h('button', {
          type: 'button',
          className: 'lf-quote',
          title: '点击换一句 · ' + quote.text,
          'aria-label': '点击换一句：' + quote.text,
          onClick: store.refreshQuote,
        },
          h('span', { className: 'lf-quote-mark', 'aria-hidden': 'true' }, '\u201c'),
          h('span', { className: 'lf-quote-text' }, quote.text),
          quote.source ? h('span', { className: 'lf-quote-source' }, '— ' + quote.source) : null,
          h('span', { className: 'lf-quote-refresh', 'aria-hidden': 'true' }, '\u21bb'),
        ) : null,
        settings.envOn ? h('div', { className: 'lf-env' },
          h('div', { className: 'lf-env-clock' },
            h('span', { className: 'lf-env-time', title: '系统时间' }, formatClock(now)),
            h('span', { className: 'lf-env-date' }, formatDate(now)),
          ),
          h('span', { className: 'lf-env-sep', 'aria-hidden': 'true' }),
          h('div', { className: 'lf-env-placewrap' },
            h('span', { className: 'lf-env-place', title: fullPlace }, location.name),
            h('span', {
              className: 'lf-env-weather',
              'data-state': weather.state,
              title: '所选地点天气 · Open-Meteo',
            }, weatherText),
          ),
        ) : null,
      )
    }

    var SCENE_CONTROLS = [
      { key: 'brightness', label: '背景亮度', en: 'SCENE LIGHT', min: 0.65, max: 1.30, step: 0.01, kind: 'pct' },
      { key: 'saturation', label: '饱和度', en: 'SATURATION', min: 0.70, max: 1.35, step: 0.01, kind: 'pct' },
      { key: 'mist', label: '雾气', en: 'MIST', min: 0, max: 1, step: 0.01, kind: 'pct' },
      { key: 'grain', label: '颗粒', en: 'GRAIN', min: 0, max: 0.12, step: 0.005, kind: 'pct' },
      { key: 'zoom', label: '构图缩放', en: 'FRAME', min: 1, max: 1.30, step: 0.01, kind: 'pct' },
    ]

    var GLASS_CONTROLS = [
      { key: 'glass', label: '玻璃不透明度', en: 'GLASS', min: 0.35, max: 0.92, step: 0.01, kind: 'pct' },
      { key: 'sidebar', label: '侧栏覆盖', en: 'SIDEBAR', min: 0, max: 0.80, step: 0.01, kind: 'pct' },
      { key: 'frost', label: '玻璃磨砂', en: 'FROST', min: 0, max: 30, step: 1, kind: 'px' },
      { key: 'blur', label: '后景柔焦', en: 'SOFT FOCUS', min: 0, max: 10, step: 0.5, kind: 'px' },
    ]

    var TINT_CONTROL = { key: 'tintStrength', label: '色调强度', en: 'TINT', min: 0, max: 0.45, step: 0.01, kind: 'pct' }

    var MATERIAL_CONTROLS = [
      { key: 'materialStrength', label: '材质强度', en: 'MATERIAL', min: 0, max: 0.60, step: 0.01, kind: 'pct' },
      { key: 'textureScale', label: '纹理尺度', en: 'TEXTURE SCALE', min: 0.5, max: 2.5, step: 0.05, kind: 'pct' },
      { key: 'sheen', label: '表面高光', en: 'SHEEN', min: 0, max: 0.40, step: 0.01, kind: 'pct' },
    ]

    var LEAK_CONTROL = { key: 'leakStrength', label: '漏光强度', en: 'LIGHT LEAK', min: 0, max: 0.40, step: 0.01, kind: 'pct' }
    var VIGNETTE_CONTROL = { key: 'vignette', label: '暗角', en: 'VIGNETTE', min: 0, max: 1.5, step: 0.05, kind: 'pct' }

    function RangeRow(control, value) {
      return h('label', { className: 'lf-row', key: control.key },
        h('span', { className: 'lf-rowhead' },
          h('span', { className: 'lf-label' }, control.label, h('small', null, control.en)),
          h('span', { className: 'lf-value' }, formatValue(control, value)),
        ),
        h('input', {
          className: 'lf-range',
          type: 'range',
          min: control.min,
          max: control.max,
          step: control.step,
          value: value,
          'aria-label': control.label + ' / ' + control.en,
          onChange: function (event) {
            var patch = {}
            patch[control.key] = Number(event.target.value)
            store.update(patch)
          },
        }),
      )
    }

    function ToggleRow(label, en, value, onChange) {
      return h('div', { className: 'lf-togglerow' },
        h('span', { className: 'lf-label' }, label, h('small', null, en)),
        h('button', {
          type: 'button',
          className: 'lf-switch',
          role: 'switch',
          'aria-checked': value ? 'true' : 'false',
          'aria-label': label + ' / ' + en,
          onClick: function () { onChange(!value) },
        }, h('i')),
      )
    }

    function closeButton() {
      return h('button', {
        type: 'button',
        className: 'lf-close',
        'aria-label': '关闭氛围设置 / Close atmosphere settings',
        onClick: store.close,
      }, '\u00d7')
    }

    function Panel() {
      var state = useStore()
      var tabState = React.useState('scene')
      var tab = tabState[0]
      var setTab = tabState[1]
      var queryState = React.useState('')
      var query = queryState[0]
      var setQuery = queryState[1]
      var geoState = React.useState({ busy: false, results: [], error: '' })
      var geo = geoState[0]
      var setGeo = geoState[1]
      var ref = React.useRef(null)
      var activePreset = state.preset

      function searchLocation() {
        var term = query.trim()
        if (!term || geo.busy) return
        setGeo({ busy: true, results: [], error: '' })
        fetch('/lawson-fuji-skin/geo?q=' + encodeURIComponent(term))
          .then(function (response) {
            if (!response.ok) throw new Error('geo ' + response.status)
            return response.json()
          })
          .then(function (data) {
            var results = Array.isArray(data.results) ? data.results : []
            setGeo({
              busy: false,
              results: results,
              error: results.length ? '' : '没有找到这个地点，换一种写法试试。',
            })
          })
          .catch(function () {
            setGeo({ busy: false, results: [], error: '地点搜索失败，请检查网络后重试。' })
          })
      }

      function chooseLocation(item) {
        store.update({ location: item })
        setQuery('')
        setGeo({ busy: false, results: [], error: '' })
      }

      React.useEffect(function () {
        if (!state.open) return undefined
        var timer = window.setTimeout(function () {
          var close = ref.current && ref.current.querySelector('.lf-close')
          if (close) close.focus()
        }, 30)
        function onKey(event) {
          if (event.key === 'Escape') {
            event.preventDefault()
            store.close()
            return
          }
          if (event.key !== 'Tab' || !ref.current) return
          var focusable = Array.prototype.filter.call(
            ref.current.querySelectorAll('button, input'),
            function (node) { return !node.disabled },
          )
          if (focusable.length === 0) return
          var first = focusable[0]
          var last = focusable[focusable.length - 1]
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault()
            last.focus()
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault()
            first.focus()
          }
        }
        document.addEventListener('keydown', onKey, true)
        return function () {
          window.clearTimeout(timer)
          document.removeEventListener('keydown', onKey, true)
        }
      }, [state.open])

      if (!state.open) return null

      var accent = state.settings.accent
      var content

      if (tab === 'material') {
        content = h('div', { className: 'lf-tabcontent' },
          h('div', { className: 'lf-section' }, '材质 / MATERIAL'),
          h('div', { className: 'lf-materials' },
            MATERIALS.map(function (item) {
              return h('button', {
                type: 'button',
                key: item.id,
                className: 'lf-material',
                'data-material': item.id,
                'data-active': state.settings.material === item.id ? 'true' : 'false',
                'aria-pressed': state.settings.material === item.id ? 'true' : 'false',
                onClick: function () {
                  store.update({ material: item.id, edge: item.edge, leakColor: item.leak })
                },
              },
                h('i', { 'aria-hidden': 'true' }),
                h('span', null, item.name),
                h('small', null, item.en),
              )
            }),
          ),
          MATERIAL_CONTROLS.map(function (control) {
            return RangeRow(control, state.settings[control.key])
          }),
          h('div', { className: 'lf-section' }, '玻璃 / GLASS'),
          GLASS_CONTROLS.map(function (control) {
            return RangeRow(control, state.settings[control.key])
          }),
          h('div', { className: 'lf-section' }, '边缘 / EDGE'),
          h('div', { className: 'lf-edges' },
            EDGES.map(function (item) {
              return h('button', {
                type: 'button',
                key: item[0],
                className: 'lf-edgechip',
                'data-active': state.settings.edge === item[0] ? 'true' : 'false',
                'aria-pressed': state.settings.edge === item[0] ? 'true' : 'false',
                onClick: function () { store.update({ edge: item[0] }) },
              }, item[1])
            }),
          ),
          h('div', { className: 'lf-note' }, '材质同时作用于背景与玻璃表面；边缘可单独换。'),
        )
      } else if (tab === 'effects') {
        content = h('div', { className: 'lf-tabcontent' },
          h('div', { className: 'lf-section' }, '漏光 / LIGHT LEAK'),
          h('label', { className: 'lf-colorrow' },
            h('span', { className: 'lf-label' }, '漏光颜色', h('small', null, 'LEAK COLOR')),
            h('input', {
              className: 'lf-color',
              type: 'color',
              value: state.settings.leakColor,
              'aria-label': '漏光颜色 / Leak color',
              onChange: function (event) { store.update({ leakColor: event.target.value }) },
            }),
          ),
          RangeRow(LEAK_CONTROL, state.settings.leakStrength),
          h('div', { className: 'lf-section' }, '暗角 / VIGNETTE'),
          RangeRow(VIGNETTE_CONTROL, state.settings.vignette),
          h('div', { className: 'lf-note' }, '漏光给画面加一层屏幕光；暗角控制边缘压暗。'),
        )
      } else if (tab === 'color') {
        content = h('div', { className: 'lf-tabcontent' },
          h('div', { className: 'lf-section' }, '主色 / ACCENT'),
          h('div', { className: 'lf-swatches' },
            ACCENTS.map(function (item) {
              return h('button', {
                type: 'button',
                key: item.color,
                className: 'lf-swatch',
                style: { background: item.color },
                'data-active': accent === item.color ? 'true' : 'false',
                'aria-pressed': accent === item.color ? 'true' : 'false',
                title: '主色 · ' + item.name,
                'aria-label': '主色 · ' + item.name,
                onClick: function () { store.update({ accent: item.color }) },
              })
            }),
          ),
          h('label', { className: 'lf-colorrow' },
            h('span', { className: 'lf-label' }, '自定义主色', h('small', null, 'CUSTOM ACCENT')),
            h('input', {
              className: 'lf-color',
              type: 'color',
              value: accent,
              'aria-label': '自定义主色 / Custom accent',
              onChange: function (event) { store.update({ accent: event.target.value }) },
            }),
          ),
          h('div', { className: 'lf-section' }, '整体色调 / TINT'),
          h('label', { className: 'lf-colorrow' },
            h('span', { className: 'lf-label' }, '色调颜色', h('small', null, 'TINT COLOR')),
            h('input', {
              className: 'lf-color',
              type: 'color',
              value: state.settings.tint,
              'aria-label': '整体色调颜色 / Tint color',
              onChange: function (event) { store.update({ tint: event.target.value }) },
            }),
          ),
          RangeRow(TINT_CONTROL, state.settings.tintStrength),
        )
      } else if (tab === 'quotes') {
        var preview = quoteFor(state.settings.quoteCategory, state.quoteCursor)
        var place = state.settings.location
        var placeDetail = [place.admin1, place.country].filter(Boolean).join(' · ')
        content = h('div', { className: 'lf-tabcontent' },
          ToggleRow('显示环境条', 'AMBIENT', state.settings.ambientOn, function (value) {
            store.update({ ambientOn: value })
          }),
          ToggleRow('显示语句', 'QUOTE', state.settings.quoteOn, function (value) {
            store.update({ quoteOn: value })
          }),
          ToggleRow('每 2 分钟自动换句', 'AUTO · 2 MIN', state.settings.quoteAuto, function (value) {
            store.update({ quoteAuto: value })
          }),
          ToggleRow('显示时间与天气', 'CLOCK & WEATHER', state.settings.envOn, function (value) {
            store.update({ envOn: value })
          }),
          h('div', { className: 'lf-section' }, '语句类型 / QUOTE TYPE'),
          h('div', { className: 'lf-presets lf-quotetypes' },
            QUOTE_TYPES.map(function (item) {
              return h('button', {
                type: 'button',
                key: item[0],
                className: 'lf-preset',
                'data-active': state.settings.quoteCategory === item[0] ? 'true' : 'false',
                'aria-pressed': state.settings.quoteCategory === item[0] ? 'true' : 'false',
                onClick: function () { store.update({ quoteCategory: item[0] }) },
              }, item[1])
            }),
          ),
          h('div', { className: 'lf-note' },
            '情感 ' + QUOTE_COUNTS.emotion + ' 条 · 励志 ' + QUOTE_COUNTS.motivation
            + ' 条 · 足球 ' + QUOTE_COUNTS.football + ' 条 · 混合 ' + QUOTE_COUNTS.mixed + ' 条',
          ),
          h('div', { className: 'lf-quote-preview' },
            h('span', { className: 'lf-quote-preview-mark', 'aria-hidden': 'true' }, '\u201c'),
            h('div', { className: 'lf-quote-preview-body' },
              h('div', { className: 'lf-quote-preview-text' }, preview.text),
              preview.source ? h('div', { className: 'lf-quote-preview-src' }, '— ' + preview.source) : null,
            ),
          ),
          h('div', { className: 'lf-quote-actions' },
            h('button', { type: 'button', className: 'lf-action', onClick: store.refreshQuote }, '换一句'),
          ),
          h('div', { className: 'lf-section' }, '地点 / LOCATION'),
          h('div', { className: 'lf-location-current' },
            h('b', null, place.name),
            h('span', null, placeDetail),
          ),
          h('div', { className: 'lf-searchrow' },
            h('input', {
              className: 'lf-input',
              type: 'text',
              value: query,
              placeholder: '搜索城市，如 伦敦 / London',
              'aria-label': '搜索地点',
              onChange: function (event) {
                setQuery(event.target.value)
                if (geo.error) setGeo({ busy: false, results: [], error: '' })
              },
              onKeyDown: function (event) {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  searchLocation()
                }
              },
            }),
            h('button', {
              type: 'button',
              className: 'lf-action',
              disabled: geo.busy,
              onClick: searchLocation,
            }, geo.busy ? '搜索中…' : '搜索'),
          ),
          geo.error ? h('div', { className: 'lf-geo-note' }, geo.error) : null,
          geo.results.length ? h('div', { className: 'lf-geo-results' },
            geo.results.map(function (item, index) {
              return h('button', {
                type: 'button',
                className: 'lf-geo-result',
                key: (item.latitude + ',' + item.longitude + ',' + index),
                onClick: function () { chooseLocation(item) },
              },
                h('b', null, item.name || '未命名'),
                h('span', null, [item.admin1, item.country].filter(Boolean).join(' · ')),
              )
            }),
          ) : null,
          h('div', { className: 'lf-quickplaces' },
            QUICK_LOCATIONS.map(function (item) {
              return h('button', {
                type: 'button',
                key: item.name,
                className: 'lf-place-chip',
                onClick: function () { chooseLocation(item) },
              }, item.name)
            }),
          ),
          h('div', { className: 'lf-note' }, '时间跟随系统；天气来自所选地点，需要联网。'),
        )
      } else {
        content = h('div', { className: 'lf-tabcontent' },
          SCENE_CONTROLS.map(function (control) {
            return RangeRow(control, state.settings[control.key])
          }),
          h('div', { className: 'lf-motionrow' },
            h('span', { className: 'lf-label' }, '动态氛围', h('small', null, 'MOTION')),
            h('button', {
              type: 'button',
              className: 'lf-switch',
              role: 'switch',
              'aria-checked': state.settings.motion ? 'true' : 'false',
              'aria-label': '动态氛围 / Motion',
              onClick: function () { store.update({ motion: !state.settings.motion }) },
            }, h('i')),
          ),
        )
      }

      return h(React.Fragment, null,
        h('div', { className: 'lf-scrim', 'aria-hidden': 'true', onClick: store.close }),
        h('section', {
          className: 'lf-panel',
          id: 'lf-atmosphere-panel',
          role: 'dialog',
          'aria-modal': 'false',
          'aria-labelledby': 'lf-atmosphere-title',
          ref: ref,
        },
          h('div', { className: 'lf-head' },
            h('div', null,
              h('div', { className: 'lf-eyebrow' }, 'FUJI / 18:40 · ATMOSPHERE'),
              h('h2', { className: 'lf-title', id: 'lf-atmosphere-title' }, '富士山下', h('span', null, '黄昏便利店')),
            ),
            closeButton(),
          ),
          h('div', { className: 'lf-stripe', 'aria-hidden': 'true' }),
          h('div', { className: 'lf-presets' },
            [['dusk', '黄昏'], ['night', '夜色'], ['mist', '雾晨'], ['film', '胶片']].map(function (item) {
              return h('button', {
                type: 'button',
                key: item[0],
                className: 'lf-preset',
                'data-active': activePreset === item[0] ? 'true' : 'false',
                'aria-pressed': activePreset === item[0] ? 'true' : 'false',
                onClick: function () { store.preset(item[0]) },
              }, item[1])
            }),
          ),
          h('div', { className: 'lf-tabs', role: 'tablist', 'aria-label': '氛围设置分类' },
            [['scene', '画面'], ['material', '材质'], ['effects', '光效'], ['color', '配色'], ['quotes', '语句']].map(function (item) {
              return h('button', {
                type: 'button',
                key: item[0],
                className: 'lf-tab',
                role: 'tab',
                'aria-selected': tab === item[0] ? 'true' : 'false',
                'data-active': tab === item[0] ? 'true' : 'false',
                onClick: function () { setTab(item[0]) },
              }, item[1])
            }),
          ),
          content,
          h('div', { className: 'lf-foot' },
            h('div', { className: 'lf-actions' },
              h('button', {
                type: 'button',
                className: 'lf-action primary',
                onClick: function () {
                  saveSettings()
                  store.close()
                  var api = window.__LAWSON_BOOT__
                  if (api && typeof api.replay === 'function') api.replay()
                  else window.location.reload()
                },
              }, '重播开场'),
              h('button', { type: 'button', className: 'lf-action', onClick: store.reset }, '恢复默认'),
            ),
            h('div', { className: 'lf-note', style: { textAlign: 'right' } }, '即时生效', h('br'), '自动保存'),
          ),
          h('div', { className: 'lf-note' }, '配色与玻璃实时生效；侧栏覆盖 0% 时左栏完全透出壁纸。'),
        ),
      )
    }

    function Trigger() {
      var state = useStore()
      return h('button', {
        type: 'button',
        className: 'lf-trigger',
        'data-lf-trigger': '',
        title: '氛围设置 / Atmosphere',
        'aria-label': '氛围设置 / Atmosphere',
        'aria-expanded': state.open ? 'true' : 'false',
        'aria-controls': 'lf-atmosphere-panel',
        onClick: store.toggle,
      },
      h('svg', { viewBox: '0 0 20 20', fill: 'none', 'aria-hidden': 'true' },
        h('circle', { cx: '14.7', cy: '5.1', r: '2.5', fill: 'currentColor', opacity: '.85' }),
        h('path', { d: 'M14.7 2.6v-1M14.7 9.6V8.6M12.2 5.1H11.2M18.2 5.1H17.2', stroke: 'currentColor', strokeWidth: '.9', strokeLinecap: 'round', opacity: '.55' }),
        h('path', { d: 'M2.5 11.2h15M2.5 15.4h15', stroke: 'currentColor', strokeWidth: '1.1', strokeLinecap: 'round', opacity: '.52' }),
        h('circle', { cx: '7.2', cy: '11.2', r: '1.5', fill: 'currentColor' }),
        h('circle', { cx: '13.1', cy: '15.4', r: '1.5', fill: 'currentColor' }),
      ))
    }

    function makeStoreTexture() {
      var canvas = document.createElement('canvas')
      canvas.width = 1024
      canvas.height = 320
      var g = canvas.getContext('2d')
      var base = g.createLinearGradient(0, 0, 0, 320)
      base.addColorStop(0, '#f2f6f7')
      base.addColorStop(0.55, '#e3ebee')
      base.addColorStop(1, '#c9d6db')
      g.fillStyle = base
      g.fillRect(0, 0, 1024, 320)

      g.fillStyle = '#f8fbfc'
      g.fillRect(0, 0, 1024, 20)
      g.fillStyle = '#1c49ad'
      g.fillRect(0, 20, 1024, 52)
      g.fillStyle = '#ef5a72'
      g.fillRect(0, 72, 1024, 4)

      var glass = g.createLinearGradient(0, 80, 0, 296)
      glass.addColorStop(0, 'rgba(255,231,182,.98)')
      glass.addColorStop(0.52, 'rgba(247,198,143,.94)')
      glass.addColorStop(1, 'rgba(194,137,103,.96)')
      g.fillStyle = glass
      g.fillRect(12, 82, 1000, 214)

      g.fillStyle = 'rgba(255,248,223,.35)'
      g.fillRect(24, 92, 976, 190)

      var shelf = ['#a9704c', '#8d5f43', '#b47b52']
      for (var row = 0; row < 3; row += 1) {
        g.fillStyle = shelf[row]
        g.fillRect(26, 152 + row * 43, 972, 9)
      }

      var goods = ['#f1d37b', '#d96a5a', '#6fa9b8', '#e8e1c8', '#abc87c', '#b485a9']
      for (var i = 0; i < 42; i += 1) {
        var gx = 32 + (i * 73) % 950
        var gy = 126 + (i * 37) % 150
        g.fillStyle = goods[i % goods.length]
        g.globalAlpha = 0.8
        g.fillRect(gx, gy, 18, 20)
      }
      g.globalAlpha = 1

      for (var mx = 16; mx < 1000; mx += 82) {
        g.fillStyle = 'rgba(236,244,245,.78)'
        g.fillRect(mx, 82, 5, 214)
      }

      g.fillStyle = 'rgba(255,226,176,.22)'
      g.fillRect(430, 82, 164, 214)
      g.strokeStyle = 'rgba(218,230,232,.9)'
      g.lineWidth = 5
      g.strokeRect(430, 82, 164, 214)
      g.fillStyle = 'rgba(255,248,229,.75)'
      g.fillRect(438, 90, 148, 10)

      var posters = [
        [132, 104, 54, 44, '#d95c58', '#fff2dd'],
        [790, 108, 48, 58, '#f0d36e', '#7b4c2c'],
        [884, 110, 46, 54, '#4d77ba', '#f4ead8'],
      ]
      posters.forEach(function (poster) {
        g.fillStyle = poster[4]
        g.fillRect(poster[0], poster[1], poster[2], poster[3])
        g.fillStyle = poster[5]
        g.fillRect(poster[0] + 6, poster[1] + 7, poster[2] - 12, 7)
        g.fillRect(poster[0] + 6, poster[1] + 20, poster[2] - 18, 4)
      })

      g.fillStyle = '#b22a3e'
      g.fillRect(966, 92, 34, 76)
      g.fillStyle = '#fff'
      g.font = '700 11px Arial'
      g.textAlign = 'center'
      g.fillText('ATM', 983, 114)

      g.fillStyle = '#ffffff'
      g.font = '700 43px Arial, sans-serif'
      g.textAlign = 'center'
      g.textBaseline = 'middle'
      g.fillText('LAWSON', 512, 47)

      g.fillStyle = '#dce4e6'
      g.fillRect(0, 296, 1024, 24)
      return canvas
    }

    function createModelRenderer(canvas) {
      var ctx = canvas.getContext('2d')
      if (!ctx) {
        return {
          canvas: canvas,
          start: function () {},
          stop: function () {},
          destroy: function () {},
        }
      }
      var texture = makeStoreTexture()
      var W = 0
      var H = 0
      var DPR = 1
      var frame = 0
      var running = false
      var last = 0
      var time = 0
      var reduceMotion = window.matchMedia
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false
      var stars = []
      for (var si = 0; si < 46; si += 1) {
        stars.push({
          x: Math.random(),
          y: Math.random() * 0.47,
          r: 0.4 + Math.random() * 1.1,
          p: Math.random() * Math.PI * 2,
        })
      }

      function rad(degrees) {
        return degrees * Math.PI / 180
      }

      function sub(a, b) {
        return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z }
      }

      function dot(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z
      }

      function cross(a, b) {
        return {
          x: a.y * b.z - a.z * b.y,
          y: a.z * b.x - a.x * b.z,
          z: a.x * b.y - a.y * b.x,
        }
      }

      function unit(v) {
        var length = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z) || 1
        return { x: v.x / length, y: v.y / length, z: v.z / length }
      }

      function resize() {
        DPR = Math.min(2, window.devicePixelRatio || 1)
        W = Math.max(1, window.innerWidth)
        H = Math.max(1, window.innerHeight)
        canvas.width = Math.round(W * DPR)
        canvas.height = Math.round(H * DPR)
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
        ctx.imageSmoothingEnabled = true
      }

      function cameraRig() {
        var yawDeg = (camera.dragging ? camera.dragX : settings.viewX)
          + (settings.motion && settings.autoOrbit ? Math.sin(time * 0.24) * 10 : 0)
          + camera.x * settings.parallax * 5
        var pitchDeg = (camera.dragging ? camera.dragY : settings.viewY)
          - camera.y * settings.parallax * 2.4
        var yaw = rad(clamp(yawDeg, -45, 45, 0))
        var pitch = rad(clamp(pitchDeg, 2, 26, 8))
        var aspect = W / Math.max(1, H)
        var distance = 18 / Math.max(0.72, settings.depth)
          * Math.max(1, Math.sqrt(1.6 / Math.max(0.4, aspect)))
        var target = { x: 0, y: 2.05, z: 0 }
        var eye = {
          x: target.x + distance * Math.cos(pitch) * Math.sin(yaw),
          y: target.y + distance * Math.sin(pitch),
          z: target.z + distance * Math.cos(pitch) * Math.cos(yaw),
        }
        var forward = unit(sub(target, eye))
        var right = unit(cross(forward, { x: 0, y: 1, z: 0 }))
        var up = cross(right, forward)
        var focal = (H / 2) / Math.tan(rad(24)) * settings.zoom
        return { eye: eye, forward: forward, right: right, up: up, focal: focal }
      }

      function project(point, cam) {
        var rel = { x: point.x - cam.eye.x, y: point.y - cam.eye.y, z: point.z - cam.eye.z }
        var z = dot(rel, cam.forward)
        if (z < 0.4) return null
        return {
          x: W * 0.5 + dot(rel, cam.right) * cam.focal / z,
          y: H * 0.52 - dot(rel, cam.up) * cam.focal / z,
          z: z,
        }
      }

      function projectPath(points, cam) {
        var output = []
        for (var i = 0; i < points.length; i += 1) {
          var p = project(points[i], cam)
          if (!p) return null
          output.push(p)
        }
        return output
      }

      function paint(points, cam, fill) {
        var projected = projectPath(points, cam)
        if (!projected) return null
        ctx.beginPath()
        ctx.moveTo(projected[0].x, projected[0].y)
        for (var i = 1; i < projected.length; i += 1) ctx.lineTo(projected[i].x, projected[i].y)
        ctx.closePath()
        ctx.fillStyle = fill
        ctx.fill()
        return projected
      }

      function line3(a, b, cam, stroke, width) {
        var pa = project(a, cam)
        var pb = project(b, cam)
        if (!pa || !pb) return
        ctx.save()
        ctx.strokeStyle = stroke
        ctx.lineWidth = width
        ctx.beginPath()
        ctx.moveTo(pa.x, pa.y)
        ctx.lineTo(pb.x, pb.y)
        ctx.stroke()
        ctx.restore()
      }

      function drawCloud(cx, cy, width, height, alpha) {
        ctx.save()
        ctx.translate(cx, cy)
        ctx.scale(1, height / width)
        var cloud = ctx.createRadialGradient(0, 0, 0, 0, 0, width)
        cloud.addColorStop(0, 'rgba(255,227,213,' + alpha + ')')
        cloud.addColorStop(0.55, 'rgba(241,203,192,' + alpha * 0.55 + ')')
        cloud.addColorStop(1, 'rgba(220,190,190,0)')
        ctx.fillStyle = cloud
        ctx.beginPath()
        ctx.arc(0, 0, width, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      function drawSky() {
        var sky = ctx.createLinearGradient(0, 0, 0, H)
        sky.addColorStop(0, '#101f39')
        sky.addColorStop(0.24, '#273d61')
        sky.addColorStop(0.45, '#5c6384')
        sky.addColorStop(0.61, '#a7838c')
        sky.addColorStop(0.72, '#e1aa90')
        sky.addColorStop(0.82, '#8d737b')
        sky.addColorStop(1, '#111b26')
        ctx.fillStyle = sky
        ctx.fillRect(0, 0, W, H)

        var sun = ctx.createRadialGradient(W * 0.69, H * 0.56, 0, W * 0.69, H * 0.56, H * 0.32)
        sun.addColorStop(0, 'rgba(255,221,176,.22)')
        sun.addColorStop(0.45, 'rgba(255,190,151,.10)')
        sun.addColorStop(1, 'rgba(255,190,151,0)')
        ctx.fillStyle = sun
        ctx.fillRect(0, 0, W, H)

        drawCloud(W * 0.22 + Math.sin(time * 0.02) * 14, H * 0.27, W * 0.20, H * 0.075, 0.15)
        drawCloud(W * 0.55 + Math.sin(time * 0.016 + 1.2) * 20, H * 0.19, W * 0.25, H * 0.06, 0.12)
        drawCloud(W * 0.82 + Math.sin(time * 0.012 + 2.4) * 16, H * 0.36, W * 0.16, H * 0.05, 0.10)

        stars.forEach(function (star) {
          var twinkle = 0.22 + 0.16 * Math.sin(time * 1.4 + star.p)
          ctx.fillStyle = 'rgba(232,241,247,' + Math.max(0.05, twinkle) + ')'
          ctx.beginPath()
          ctx.arc(star.x * W, star.y * H, star.r, 0, Math.PI * 2)
          ctx.fill()
        })
      }

      function drawMountain(cam) {
        var cx = 0
        var cz = -31
        var radius = 13
        var apex = { x: cx, y: 8.3, z: cz }
        var base = []
        var segments = 20
        for (var i = 0; i < segments; i += 1) {
          var angle = i / segments * Math.PI * 2
          base.push({
            x: cx + Math.cos(angle) * radius,
            y: -0.15,
            z: cz + Math.sin(angle) * radius * 0.62,
          })
        }
        for (var j = 0; j < segments; j += 1) {
          paint([apex, base[j], base[(j + 1) % segments]], cam, j % 2 ? '#6a5d72' : '#78677b')
        }

        var snowApex = { x: cx, y: 8.3, z: cz }
        var snowRing = []
        var snowRadius = 5.25
        for (var k = 0; k < segments; k += 1) {
          var snowAngle = k / segments * Math.PI * 2
          snowRing.push({
            x: cx + Math.cos(snowAngle) * snowRadius,
            y: 5.15,
            z: cz + Math.sin(snowAngle) * snowRadius * 0.62,
          })
        }
        for (var m = 0; m < segments; m += 1) {
          paint([snowApex, snowRing[m], snowRing[(m + 1) % segments]], cam, m % 2 ? '#dfd0d5' : '#ecdfe1')
        }
      }

      function drawGround(cam) {
        var corners = [
          { x: -50, y: 0, z: -24 },
          { x: 50, y: 0, z: -24 },
          { x: 50, y: 0, z: 9 },
          { x: -50, y: 0, z: 9 },
        ]
        var projected = projectPath(corners, cam)
        if (!projected) return
        var minY = Math.min.apply(null, projected.map(function (p) { return p.y }))
        var maxY = Math.max.apply(null, projected.map(function (p) { return p.y }))
        var ground = ctx.createLinearGradient(0, minY, 0, maxY)
        ground.addColorStop(0, '#26343d')
        ground.addColorStop(0.45, '#1b2933')
        ground.addColorStop(1, '#101a21')
        ctx.beginPath()
        ctx.moveTo(projected[0].x, projected[0].y)
        for (var i = 1; i < projected.length; i += 1) ctx.lineTo(projected[i].x, projected[i].y)
        ctx.closePath()
        ctx.fillStyle = ground
        ctx.fill()

        if (maxY < H) {
          var apron = ctx.createLinearGradient(0, maxY, 0, H)
          apron.addColorStop(0, '#101a21')
          apron.addColorStop(1, '#0a1218')
          ctx.fillStyle = apron
          ctx.fillRect(0, maxY - 2, W, H - maxY + 2)
        }

        ctx.save()
        ctx.strokeStyle = 'rgba(224,238,242,.16)'
        ctx.lineWidth = 1.5
        for (var x = -12; x <= 12; x += 4) {
          var a = project({ x: x, y: 0.01, z: 2.8 }, cam)
          var b = project({ x: x, y: 0.01, z: 7.7 }, cam)
          if (!a || !b) continue
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
        for (var c = 0; c < 6; c += 1) {
          var ca = project({ x: -5.5 + c * 2.2, y: 0.01, z: 1.8 }, cam)
          var cb = project({ x: -5.5 + c * 2.2, y: 0.01, z: 3.2 }, cam)
          if (!ca || !cb) continue
          ctx.beginPath()
          ctx.moveTo(ca.x, ca.y)
          ctx.lineTo(cb.x, cb.y)
          ctx.stroke()
        }
        ctx.restore()
      }

      function drawStoreFront(cam) {
        var tl = project({ x: -6.5, y: 3.6, z: 1.22 }, cam)
        var tr = project({ x: 6.5, y: 3.6, z: 1.22 }, cam)
        var bl = project({ x: -6.5, y: 0, z: 1.22 }, cam)
        var br = project({ x: 6.5, y: 0, z: 1.22 }, cam)
        if (!tl || !tr || !bl || !br) return
        ctx.beginPath()
        ctx.moveTo(tl.x, tl.y)
        ctx.lineTo(tr.x, tr.y)
        ctx.lineTo(br.x, br.y)
        ctx.lineTo(bl.x, bl.y)
        ctx.closePath()
        ctx.fillStyle = '#dce5e8'
        ctx.fill()
        ctx.save()
        ctx.clip()
        var a = (tr.x - tl.x) / texture.width
        var b = (tr.y - tl.y) / texture.width
        var c = (bl.x - tl.x) / texture.height
        var d = (bl.y - tl.y) / texture.height
        ctx.setTransform(a * DPR, b * DPR, c * DPR, d * DPR, tl.x * DPR, tl.y * DPR)
        ctx.drawImage(texture, 0, 0)
        ctx.restore()
      }

      function drawStore(cam) {
        var x0 = -6.5
        var x1 = 6.5
        var y0 = 0
        var y1 = 3.6
        var z0 = -1.2
        var z1 = 1.2

        paint([
          { x: x0, y: y0, z: z0 }, { x: x1, y: y0, z: z0 },
          { x: x1, y: y1, z: z0 }, { x: x0, y: y1, z: z0 },
        ], cam, '#a8b5bb')
        paint([
          { x: x0, y: y0, z: z0 }, { x: x0, y: y0, z: z1 },
          { x: x0, y: y1, z: z1 }, { x: x0, y: y1, z: z0 },
        ], cam, '#cbd6da')
        paint([
          { x: x1, y: y0, z: z0 }, { x: x1, y: y0, z: z1 },
          { x: x1, y: y1, z: z1 }, { x: x1, y: y1, z: z0 },
        ], cam, '#b9c6cc')
        ;[x0, x1].forEach(function (sideX) {
          paint([
            { x: sideX, y: 2.72, z: z0 }, { x: sideX, y: 2.72, z: z1 },
            { x: sideX, y: 3.18, z: z1 }, { x: sideX, y: 3.18, z: z0 },
          ], cam, '#1c49ad')
          paint([
            { x: sideX, y: 0.35, z: 0.25 }, { x: sideX, y: 0.35, z: z1 },
            { x: sideX, y: 2.35, z: z1 }, { x: sideX, y: 2.35, z: 0.25 },
          ], cam, 'rgba(235,178,126,.62)')
        })
        paint([
          { x: x0, y: y1, z: z0 }, { x: x1, y: y1, z: z0 },
          { x: x1, y: y1, z: z1 }, { x: x0, y: y1, z: z1 },
        ], cam, '#d5dfe2')

        paint([
          { x: x0, y: 2.72, z: z1 + 0.01 }, { x: x1, y: 2.72, z: z1 + 0.01 },
          { x: x1, y: 3.18, z: z1 + 0.01 }, { x: x0, y: 3.18, z: z1 + 0.01 },
        ], cam, '#1c49ad')

        drawStoreFront(cam)

        paint([
          { x: -7, y: 3.5, z: 1.2 }, { x: 7, y: 3.5, z: 1.2 },
          { x: 7, y: 3.5, z: 2.9 }, { x: -7, y: 3.5, z: 2.9 },
        ], cam, '#eef3f4')
        paint([
          { x: -7, y: 3.32, z: 2.9 }, { x: 7, y: 3.32, z: 2.9 },
          { x: 7, y: 3.5, z: 2.9 }, { x: -7, y: 3.5, z: 2.9 },
        ], cam, '#f9fbfb')
        paint([
          { x: -7, y: 3.3, z: 1.2 }, { x: 7, y: 3.3, z: 1.2 },
          { x: 7, y: 3.3, z: 2.9 }, { x: -7, y: 3.3, z: 2.9 },
        ], cam, '#6d7a80')

        paint([
          { x: 2.2, y: 3.6, z: -0.9 }, { x: 4.2, y: 3.6, z: -0.9 },
          { x: 4.2, y: 4.0, z: -0.9 }, { x: 2.2, y: 4.0, z: -0.9 },
        ], cam, '#9fadb2')
        paint([
          { x: 2.2, y: 4.0, z: -0.9 }, { x: 4.2, y: 4.0, z: -0.9 },
          { x: 4.2, y: 4.0, z: -0.2 }, { x: 2.2, y: 4.0, z: -0.2 },
        ], cam, '#d6e0e3')
      }

      function drawStoreGlow(cam) {
        var p = project({ x: 0, y: 1.25, z: 1.8 }, cam)
        if (!p) return
        var radius = Math.min(W, H) * 0.42
        var glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius)
        glow.addColorStop(0, 'rgba(255,210,158,.24)')
        glow.addColorStop(0.45, 'rgba(255,193,132,.10)')
        glow.addColorStop(1, 'rgba(255,193,132,0)')
        ctx.save()
        ctx.globalCompositeOperation = 'screen'
        ctx.fillStyle = glow
        ctx.fillRect(0, 0, W, H)
        ctx.restore()
      }

      function drawProps(cam) {
        var bollards = [-7.8, -6.4]
        bollards.forEach(function (bx) {
          var front = [
            { x: bx - 0.1, y: 0, z: 3.2 }, { x: bx + 0.1, y: 0, z: 3.2 },
            { x: bx + 0.1, y: 0.95, z: 3.2 }, { x: bx - 0.1, y: 0.95, z: 3.2 },
          ]
          paint(front, cam, '#c79a3e')
          paint([
            { x: bx - 0.1, y: 0.95, z: 3.2 }, { x: bx + 0.1, y: 0.95, z: 3.2 },
            { x: bx + 0.1, y: 0.95, z: 2.9 }, { x: bx - 0.1, y: 0.95, z: 2.9 },
          ], cam, '#e5bd69')
        })

        line3({ x: 8.6, y: 0, z: 3.4 }, { x: 8.6, y: 4.8, z: 3.4 }, cam, '#9daeb4', 3)
        paint([
          { x: 8.35, y: 4.8, z: 3.4 }, { x: 8.85, y: 4.8, z: 3.4 },
          { x: 8.85, y: 5.05, z: 3.4 }, { x: 8.35, y: 5.05, z: 3.4 },
        ], cam, '#d8e2e5')
        var lamp = project({ x: 8.6, y: 5.05, z: 3.4 }, cam)
        if (lamp) {
          var halo = ctx.createRadialGradient(lamp.x, lamp.y, 0, lamp.x, lamp.y, Math.min(W, H) * 0.16)
          halo.addColorStop(0, 'rgba(255,224,178,.30)')
          halo.addColorStop(1, 'rgba(255,224,178,0)')
          ctx.save()
          ctx.globalCompositeOperation = 'screen'
          ctx.fillStyle = halo
          ctx.fillRect(0, 0, W, H)
          ctx.restore()
        }
      }

      function drawAtmosphere() {
        ctx.save()
        ctx.globalCompositeOperation = 'screen'
        var mist = ctx.createLinearGradient(0, H * 0.38, 0, H * 0.78)
        var alpha = 0.05 + settings.mist * 0.12
        mist.addColorStop(0, 'rgba(232,211,205,0)')
        mist.addColorStop(0.45, 'rgba(232,211,205,' + alpha + ')')
        mist.addColorStop(1, 'rgba(210,225,232,0)')
        ctx.fillStyle = mist
        ctx.fillRect(0, H * 0.38, W, H * 0.4)
        ctx.restore()

        ctx.save()
        ctx.globalAlpha = 0.22
        ctx.fillStyle = '#f7e6d5'
        for (var i = 0; i < stars.length; i += 1) {
          var star = stars[i]
          var x = (star.x * W + time * (4 + star.r * 5)) % W
          var y = H * 0.52 + star.y * H * 0.6
          ctx.beginPath()
          ctx.arc(x, y, star.r * 0.9, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      }

      function render() {
        var cam = cameraRig()
        ctx.clearRect(0, 0, W, H)
        drawSky()
        drawMountain(cam)
        drawGround(cam)
        drawStore(cam)
        drawStoreGlow(cam)
        drawProps(cam)
        drawAtmosphere()
      }

      function loop(now) {
        if (!running) return
        if (!document.hidden) {
          var dt = Math.min(0.05, Math.max(0, (now - last) / 1000))
          last = now
          if (settings.motion && settings.autoOrbit && !reduceMotion) time += dt
          render()
        }
        frame = window.requestAnimationFrame(loop)
      }

      function start() {
        if (running) return
        running = true
        window.addEventListener('resize', resize)
        resize()
        last = window.performance.now()
        frame = window.requestAnimationFrame(loop)
      }

      function stop() {
        if (!running) return
        running = false
        window.removeEventListener('resize', resize)
        if (frame) window.cancelAnimationFrame(frame)
        frame = 0
      }

      return {
        canvas: canvas,
        start: start,
        stop: stop,
        destroy: stop,
      }
    }

    function makeScene() {
      var scene = document.createElement('div')
      scene.id = SCENE_ID
      scene.setAttribute('aria-hidden', 'true')
      scene.innerHTML = SCENE_HTML
      return scene
    }

    return {
      name: 'lawson-fuji-skin-client',
      inject: ['slots'],
      apply(ctx) {
        ctx.slots.inject('conversation.input.dock', function () {
          return ctx.slots.register({
            name: 'conversation.input.dock',
            id: 'lf-ambient-bar',
            order: 10,
            label: '氛围语句',
          }, AmbientBar)
        })

        ctx.slots.inject('sidebar.footer.action', function () {
          return ctx.slots.register({
            name: 'sidebar.footer.action',
            id: 'lf-atmosphere',
            order: 5,
            label: '氛围设置',
          }, Trigger)
        })

        ctx.slots.inject('shell.overlay', function () {
          return ctx.slots.register({
            name: 'shell.overlay',
            id: 'lf-atmosphere-panel',
            order: 40,
          }, Panel)
        })

        ctx.effect(function () {
          var disposed = false
          var onReady = null

          function mount() {
            if (disposed || !document.body) return
            document.documentElement.setAttribute(THEME_ATTR, '')
            // Retire older local skins still mounted in this tab until reload.
            document.documentElement.removeAttribute('data-ssb-theme')
            document.documentElement.removeAttribute('data-bws-theme')

            var style = document.getElementById(STYLE_ID)
            if (!style) {
              style = document.createElement('style')
              style.id = STYLE_ID
              style.textContent = THEME_CSS
              ;(document.head || document.documentElement).appendChild(style)
            } else {
              style.textContent = THEME_CSS
            }

            var sceneNode = document.getElementById(SCENE_ID)
            if (!sceneNode || !sceneNode.querySelector('.lf-photo') || !sceneNode.querySelector('.lf-finish')) {
              if (sceneNode && sceneNode.parentNode) sceneNode.parentNode.removeChild(sceneNode)
              document.body.insertBefore(makeScene(), document.body.firstChild)
            }

            applySettings()
            document.addEventListener('visibilitychange', onVisibility)
            window.addEventListener('pagehide', saveSettings)
            onVisibility()
            onReady = null
          }

          function onVisibility() {
            var scene = document.getElementById(SCENE_ID)
            if (!scene) return
            if (document.hidden) scene.setAttribute('data-lf-paused', '')
            else scene.removeAttribute('data-lf-paused')
          }

          function unmount() {
            disposed = true
            if (modelRenderer) {
              modelRenderer.destroy()
              modelRenderer = null
            }
            document.removeEventListener('visibilitychange', onVisibility)
            window.removeEventListener('pagehide', saveSettings)
            if (onReady !== null) document.removeEventListener('DOMContentLoaded', onReady)
            saveSettings()
            document.documentElement.removeAttribute(THEME_ATTR)
            document.documentElement.removeAttribute('data-lf-material')
            document.documentElement.removeAttribute('data-lf-edge')
            var style = document.getElementById(STYLE_ID)
            if (style && style.parentNode) style.parentNode.removeChild(style)
            var scene = document.getElementById(SCENE_ID)
            if (scene && scene.parentNode) scene.parentNode.removeChild(scene)
            if (window.__LAWSON_BOOT__ && typeof window.__LAWSON_BOOT__.destroy === 'function') {
              window.__LAWSON_BOOT__.destroy()
            }
          }

          if (document.body) {
            mount()
          } else {
            onReady = mount
            document.addEventListener('DOMContentLoaded', onReady, { once: true })
          }

          return unmount
        }, 'lawson-fuji-skin: atmosphere surface')
      },
    }
  },
})
