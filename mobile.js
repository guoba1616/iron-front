// Phone UI follows the selected building. Gestures reuse desktop/network commands.
export function setupMobile(api) {
  const $ = id => document.getElementById(id), body = document.body;
  const layout = matchMedia('(hover: none) and (pointer: coarse), (max-width: 900px)');
  const portrait = matchMedia('(orientation: portrait)');
  // Keep typing and caret movement, without native long-press selection/copy menus.
  document.addEventListener('contextmenu', e => { if (window.ironUseMobileUI()) e.preventDefault(); });
  document.addEventListener('selectionchange', () => {
    if (!window.ironUseMobileUI()) return;
    const input = document.activeElement;
    if (input?.matches('input, textarea') && input.selectionStart !== null && input.selectionStart !== input.selectionEnd) input.setSelectionRange(input.selectionEnd, input.selectionEnd);
  });
  const scrollTimers = new WeakMap();
  document.addEventListener('scroll', e => {
    const el = e.target;
    if (!window.ironUseMobileUI() || !(el instanceof HTMLElement)) return;
    el.classList.add('is-scrolling'); clearTimeout(scrollTimers.get(el));
    scrollTimers.set(el, setTimeout(() => el.classList.remove('is-scrolling'), 700));
  }, true);
  const sidebar = $('sidebar');
  const header = document.createElement('div');
  header.id = 'mobilePanelHeader';
  header.innerHTML = '<div><strong id="mobilePanelTitle"></strong><small>点按生产 · 长按取消一项</small></div><button id="mobilePanelClose" aria-label="收起生产菜单">×</button>';
  sidebar.prepend(header);
  const actions = document.createElement('div'); actions.id = 'mobilePanelActions'; sidebar.append(actions);
  const extras = document.createElement('div'); extras.id = 'mobilePanelExtras'; actions.append(extras);
  const rally = document.createElement('button'); rally.id = 'mobileRally'; rally.textContent = '集结点';
  rally.onclick = () => api.setMode('rally'); actions.append(rally);
  const signal = document.createElement('button'); signal.id = 'mobileSignal'; signal.textContent = '信号'; signal.hidden = true;
  let signalHold = null, signalHeld = false;
  signal.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse' || !api.signalAvailable?.()) return;
    signalHeld = false;
    signalHold = setTimeout(() => {
      signalHold = null; signalHeld = true;
      const name = api.cycleSignalKind();
      signal.textContent = '信号 · ' + name;
      api.notify('信号类型：' + name);
    }, 550);
  });
  for (const type of ['pointerup', 'pointercancel', 'pointerleave', 'lostpointercapture']) signal.addEventListener(type, () => { clearTimeout(signalHold); signalHold = null; });
  signal.onclick = () => {
    if (signalHeld) { signalHeld = false; return; }
    if (api.getMode() === 'signal') { api.setMode(null); return; }
    api.setMode('signal');
    signal.textContent = '信号 · ' + api.signalLabel();
    api.notify('点击地图或小地图发送信号');
  };
  const cancel = document.createElement('button'); cancel.id = 'mobileCancel'; cancel.textContent = '取消'; cancel.hidden = true;
  cancel.onclick = () => { reset(); api.cancel(); closeProduction(); };
  const ready = document.createElement('button'); ready.id = 'mobileReady'; ready.hidden = true;
  ready.onclick = () => { const item = api.readyBuilding(); if (item) api.onBuildClick(item.type, { button: 0 }); };
  const hold = document.createElement('div'); hold.id = 'mobileHold'; hold.hidden = true;
  const rotate = document.createElement('div'); rotate.id = 'mobileRotate';
  rotate.innerHTML = '<span>↻</span><strong>请横屏作战</strong><p>横放手机继续作战，已自动暂停</p>';
  body.append(signal, cancel, ready, hold, rotate);
  const joystick = document.createElement('div'); joystick.id = 'mobileJoystick';
  joystick.setAttribute('aria-label', '移动视野摇杆');
  joystick.innerHTML = '<span class="stick-knob"></span>';
  joystick.hidden = true; body.append(joystick);
  const knob = joystick.firstElementChild;
  let stickPointer = null;
  function resetStick() {
    const id = stickPointer; stickPointer = null;
    api.cameraStick.x = api.cameraStick.z = 0;
    knob.style.transform = ''; joystick.classList.remove('engaged'); joystick.style.transform = '';
    if (id !== null && joystick.hasPointerCapture(id)) joystick.releasePointerCapture(id);
  }
  function moveStick(e) {
    const r = joystick.getBoundingClientRect(), radius = r.width * .3;
    const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
    const distance = Math.hypot(x, y), scale = Math.min(1, radius / (distance || 1));
    knob.style.transform = 'translate(' + x * scale + 'px,' + y * scale + 'px)';
    const strength = Math.max(0, (Math.min(distance / radius, 1) - .12) / .88);
    api.cameraStick.x = x / (distance || 1) * strength;
    api.cameraStick.z = y / (distance || 1) * strength;
  }
  function startStick(e, floating = false) {
    if (stickPointer !== null || !api.active() || joystick.hidden || body.classList.contains('production-open')) return false;
    if (floating) {
      const r = joystick.getBoundingClientRect();
      joystick.style.transform = 'translate(' + (e.clientX - r.left - r.width / 2) + 'px,' + (e.clientY - r.top - r.height / 2) + 'px)';
    }
    e.preventDefault(); e.stopPropagation(); api.Sound.init();
    stickPointer = e.pointerId; joystick.setPointerCapture(e.pointerId);
    joystick.classList.add('engaged'); moveStick(e); return true;
  }
  joystick.addEventListener('pointerdown', e => {
    e.preventDefault(); e.stopPropagation();
    startStick(e);
  });
  joystick.addEventListener('pointermove', e => {
    if (e.pointerId !== stickPointer) return;
    e.preventDefault(); e.stopPropagation();
    if (!api.active()) resetStick(); else moveStick(e);
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) joystick.addEventListener(type, e => {
    if (e.pointerId === stickPointer) { e.preventDefault(); e.stopPropagation(); resetStick(); }
  });
  joystick.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); });
  function syncStick() {
    joystick.hidden = !window.ironUseMobileUI() || !api.active() || portrait.matches;
    if (joystick.hidden) resetStick();
    const entries = $('mobileBattleTools'); if (entries) entries.hidden = !window.ironUseMobileUI() || !api.active() || portrait.matches;
  }
  for (const id of ['menu', 'pauseMenu', 'guide', 'endScreen', 'itemDetails']) {
    const screen = $(id);
    if (screen) new MutationObserver(syncStick).observe(screen, { attributes: true, attributeFilter: ['class', 'open'] });
  }
  document.addEventListener('mobilelayoutchange', syncStick);
  portrait.addEventListener('change', syncStick);
  const help = document.createElement('div'); help.className = 'mobileHelp';
  help.innerHTML = '<b>固定横屏 · 双手操作</b><br>右侧「建造」建建筑，「军事」生产部队，「维修」管理受损建筑。<br>左下角摇杆、双指拖动或点按小地图移动视野；单指拖动框选，双指捏合缩放；「全军」「屏内」一键选兵，「基地」回到总部。<br>点己方单位选中，再点地面移动、点敌人攻击；双击选同类。步兵点运兵车或碉堡可进驻，工程师点目标可占领、维修。';
  $('mainMenu').append(help);
  const pause = $('pauseMenu').querySelector('.panel');
  const menuTools = document.createElement('div'); menuTools.id = 'mobileMenuTools';
  menuTools.innerHTML = '<button id="mobileHome">回到总部</button><button id="mobileGuide">操作指南</button><button id="mobileChat">战场交流</button>';
  pause.append(menuTools, help.cloneNode(true));
  $('mobileHome').onclick = () => { api.home(); $('btnResume').click(); };
  $('mobileGuide').onclick = () => $('btnHelp').click();
  $('mobileChat').onclick = () => { $('btnResume').click(); $('btnChat').click(); };
  const speeds = document.createElement('div'); speeds.id = 'touchSpeeds'; speeds.className = 'mobileHelp';
  speeds.innerHTML = '游戏速度 <button data-speed="1">1x</button> <button data-speed="2">2x</button> <button data-speed="3">3x</button>';
  pause.append(speeds);
  speeds.onclick = e => { const b = e.target.closest('button'); if (b) document.querySelector(`#speedBtns [data-speed="${b.dataset.speed}"]`).click(); };
  const speedBtn = document.createElement('button'); speedBtn.id = 'mobileSpeed'; speedBtn.className = 'tbtn'; speedBtn.textContent = '1x';
  speedBtn.setAttribute('aria-label', '切换游戏速度');
  $('topbar').insertBefore(speedBtn, $('btnPause'));
  function syncSpeed() {
    const all = [...document.querySelectorAll('#speedBtns button')];
    const active = all.find(b => b.classList.contains('active'));
    const speed = active?.dataset.speed || String(window.DBG?.G.speed || 1);
    speedBtn.textContent = speed + 'x';
    speedBtn.disabled = !!all[0]?.disabled;
    speeds.querySelectorAll('button').forEach(b => b.classList.toggle('active', b.dataset.speed === speed));
  }
  speedBtn.onclick = () => {
    const all = [...document.querySelectorAll('#speedBtns button')];
    if (!all.length || all[0].disabled) return;
    const i = all.findIndex(b => b.classList.contains('active'));
    all[(i + 1) % all.length].click();
  };
  new MutationObserver(syncSpeed).observe($('speedBtns'), { subtree: true, attributes: true, attributeFilter: ['class', 'disabled'] });
  syncSpeed();
  const categories = {
    hq: ['building', 'defense'], subhq: ['building', 'defense'], barracks: ['infantry'], airBarracks: ['infantry'],
    factory: ['vehicle'], helipad: ['air'], airfield: ['air'], shipyard: ['naval'], lab: ['research'], silo: [],
  };
  let catalog = null, catalogTab = null;
  const tools = document.createElement('nav'); tools.id = 'mobileBattleTools'; tools.hidden = true;
  for (const [kind, label] of [['repair', '维修'], ['build', '建造'], ['military', '军事']]) {
    const b = document.createElement('button'); b.id = 'mobileTool-' + kind; b.type = 'button'; b.setAttribute('aria-label', label);
    b.textContent = label;
    b.onclick = () => openCatalog(kind); tools.append(b);
  }
  body.append(tools);
  // 快捷选兵：手机上框选费劲，给常用的几种选法各一个按钮。
  const quick = document.createElement('nav'); quick.id = 'mobileQuick'; quick.hidden = true;
  for (const [kind, label] of [['army', '全军'], ['screen', '屏内'], ['home', '基地']]) {
    const b = document.createElement('button'); b.type = 'button'; b.dataset.kind = kind; b.textContent = label; quick.append(b);
  }
  quick.onclick = e => {
    const b = e.target.closest('button'); if (!b || !api.active()) return;
    if (b.dataset.kind === 'army') { if (!api.selectArmy()) api.notify('没有可用的作战部队'); }
    else if (b.dataset.kind === 'screen') { const r = api.gameEl.getBoundingClientRect(); api.boxSelect(0, 0, r.width, r.height, false); }
    else api.home();
    updateReady();
  };
  body.append(quick);
  const catalogTabs = document.createElement('div'); catalogTabs.id = 'mobileCatalogTabs'; catalogTabs.hidden = true;
  header.after(catalogTabs);
  const repairs = document.createElement('div'); repairs.id = 'mobileRepairList'; repairs.hidden = true; sidebar.append(repairs);
  const repairAll = document.createElement('button'); repairAll.id = 'mobileRepairAll'; repairAll.textContent = '一键修复'; repairAll.hidden = true;
  repairAll.onclick = () => { api.repairAll(); renderRepairs(); }; catalogTabs.after(repairAll);
  function renderRepairs() {
    const list = api.damagedBuildings();
    repairAll.disabled = !list.some(b => !b.repairing);
    const key = list.map(b => b.id).join(',');
    if (repairs.dataset.ids !== key) { repairs.replaceChildren(); repairs.dataset.ids = key; }
    if (!list.length) { repairs.textContent = '暂无受损建筑'; return; }
    for (const b of list) {
      let row = repairs.querySelector('[data-building="' + b.id + '"]');
      if (!row) {
        row = document.createElement('button'); row.className = 'repair-card'; row.dataset.building = b.id;
        const img = document.createElement('img'); img.src = b.icon; img.alt = '';
        const name = document.createElement('strong'); name.textContent = b.name;
        row.append(img, name, document.createElement('span'), document.createElement('span'));
        row.onclick = () => { const current = api.damagedBuildings().find(item => item.id === b.id); if (current) api.repairBuilding(b.id, !current.repairing); renderRepairs(); }; repairs.append(row);
      }
      row.children[2].textContent = Math.ceil(b.hp) + ' / ' + b.maxHp;
      row.children[3].textContent = b.repairing ? '维修中 · 点击停止' : '点击维修';
    }
  }
  const catalogGrid = $('buildGrid');
  function fitCatalog() {
    if (!catalog || catalog === 'repair' || !window.ironUseMobileUI()) return;
    const count = catalogGrid.children.length;
    const rect = catalogGrid.getBoundingClientRect();
    if (!count || !rect.width || !rect.height) return;
    const minHeight = window.ironI18n?.language === 'en' ? 96 : 116;
    const rows = Math.max(1, Math.min(Math.ceil(count / 4), Math.floor(rect.height / minHeight)));
    const cols = Math.ceil(count / rows);
    catalogGrid.style.setProperty('--catalog-cols', cols);
    catalogGrid.style.setProperty('--catalog-rows', rows);
  }
  new ResizeObserver(fitCatalog).observe(catalogGrid);
  document.addEventListener('languagechange', fitCatalog);
  new MutationObserver(fitCatalog).observe(catalogGrid, { childList: true });
  function chooseCatalogTab(tab, producer) {
    catalogTab = tab; api.productionFor(producer ? { type: producer } : null, tab);
    catalogTabs.querySelectorAll('button').forEach(b => b.classList.toggle('active', b.dataset.key === tab + ':' + (producer || '')));
  }
  function openCatalog(kind) {
    if (!api.active()) return;
    reset(); resetStick(); api.cancel(); catalog = kind;
    body.classList.add('production-open', 'catalog-open'); body.classList.toggle('repair-open', kind === 'repair');
    $('mobilePanelTitle').textContent = kind === 'build' ? '建造' : kind === 'military' ? '军事' : '建筑维修';
    header.querySelector('small').textContent = kind === 'repair' ? '维修持续消耗资金，资金不足时等待' : '点按生产 · 长按取消一项';
    $('tabs').hidden = true; actions.hidden = true; $('buildGrid').hidden = kind === 'repair';
    catalogTabs.hidden = kind === 'repair'; repairs.hidden = repairAll.hidden = kind !== 'repair'; catalogTabs.replaceChildren();
    if (kind === 'repair') renderRepairs();
    else {
      const tabs = kind === 'build' ? [['建筑', 'building'], ['防御', 'defense']] :
        [['征兵站', 'infantry'], ['战车厂', 'vehicle'], ['直升机坪', 'air', 'helipad'], ['飞机场', 'air', 'airfield'], ['海军', 'naval'], ['研究', 'research']];
      for (const [label, tab, producer] of tabs) {
        const b = document.createElement('button'); b.textContent = label; b.dataset.key = tab + ':' + (producer || '');
        b.onclick = () => chooseCatalogTab(tab, producer); catalogTabs.append(b);
      }
      chooseCatalogTab(tabs[0][1], tabs[0][2]);
    }
    updateReady();
  }
  function closeProduction() {
    catalog = catalogTab = null;
    body.classList.remove('production-open', 'catalog-open', 'repair-open');
    catalogTabs.hidden = repairs.hidden = repairAll.hidden = true; actions.hidden = false;
  }
  function updateReady() {
    syncStick();
    tools.hidden = quick.hidden = !window.ironUseMobileUI() || !api.active() || portrait.matches;
    if (catalog === 'repair') renderRepairs();
    const item = api.readyBuilding();
    ready.hidden = !item || api.isPlacing() || !!api.getMode() || body.classList.contains('production-open');
    if (item) ready.textContent = item.def.name + '就绪 · 放置';
    body.classList.toggle('radar-online', !!api.minimapOnline());
    const online = !!api.signalAvailable?.();
    signal.hidden = !online;
    if (online) signal.textContent = '信号 · ' + api.signalLabel();
    pauseForPortrait();
  }
  // 竖屏只显示遮罩会让单机对局在后台继续跑，进入竖屏时按一次暂停；联机与后台策略保持一致，不暂停。
  function pauseForPortrait() {
    if (!portrait.matches || !api.active()) return;
    const D = window.DBG;
    if (!D || D.Net.mode !== 'off' || D.G.state !== 'playing' || D.G.paused) return;
    $('btnPause').click();
  }
  portrait.addEventListener('change', pauseForPortrait);
  function updateCommandUI() {
    const busy = !!api.getMode() || api.isPlacing(); cancel.hidden = !busy;
    body.classList.toggle('command-mode', busy);
    if (busy) closeProduction();
    updateReady();
  }
  function selectionChanged() {
    if (!window.ironUseMobileUI()) return;
    if (catalog) return;
    const list = api.getSelection();
    const entity = list.length === 1 && api.isOwn(list[0]) && list[0].kind === 'b' ? list[0] : null;
    const producer = entity && categories[entity.type] ? entity : null;
    body.classList.toggle('producer-selected', !!producer);
    $('selPanel').querySelectorAll('.cmds button').forEach(b => { b.textContent = b.textContent.replace(/ \([XQ]\)/g, ''); });
    if (list.length === 1 && api.isOwn(list[0])) {
      let commands = $('selPanel').querySelector('.cmds');
      if (!commands) { commands = document.createElement('div'); commands.className = 'cmds'; $('selPanel').append(commands); }
      if (!commands.querySelector('.selection-info')) {
        const info = document.createElement('button'); info.className = 'selection-info'; info.textContent = '详情';
        let pressed = false;
        info.onpointerdown = () => { pressed = true; };
        info.onpointercancel = () => { pressed = false; };
        info.onclick = e => { if (e.sourceCapabilities?.firesTouchEvents && !pressed) return; pressed = false; api.showDetails(list[0].type); }; commands.append(info);
      }
    }
    actions.querySelector('.cmds')?.remove();
    if (producer) {
      header.querySelector('small').textContent = '点按生产 · 长按取消一项';
      $('mobilePanelTitle').textContent = producer.def.name;
      const tabs = categories[producer.type];
      document.querySelectorAll('#tabs button').forEach(b => { b.hidden = !tabs.includes(b.dataset.tab); });
      $('tabs').hidden = tabs.length < 2; $('buildGrid').hidden = !tabs.length;
      rally.hidden = !api.canRally(producer);
      const commands = $('selPanel').querySelector('.cmds');
      if (commands) actions.append(commands);
      $('btnAbility').hidden = !['hq', 'subhq'].includes(producer.type); $('btnSuper').hidden = producer.type !== 'silo';
      api.productionFor(producer, tabs[0]);
      body.classList.add('production-open');
    } else closeProduction();
    updateReady();
  }
  $('mobilePanelClose').onclick = () => { closeProduction(); api.setSelection([]); updateReady(); };
  window.ironMobileBack = () => {
    if (window.ironDetailsBack?.()) return true;
    if (api.getMode() || api.isPlacing()) { cancel.click(); return true; }
    if (body.classList.contains('production-open')) { $('mobilePanelClose').click(); return true; }
    if (api.getSelection().length) { api.setSelection([]); return true; }
    return false;
  };
  document.addEventListener('gameselectionchange', selectionChanged);
  document.addEventListener('commandmodechange', updateCommandUI);
  document.addEventListener('mobilehudchange', updateReady);
  const pauseOpen = () => !$('pauseMenu').classList.contains('hidden');
  function syncMobileChat() { $('mobileChat').hidden = !api.chatAvailable(); }
  new MutationObserver(() => {
    if (pauseOpen()) { reset(); closeProduction(); syncMobileChat(); }
    else { selectionChanged(); updateReady(); }
  }).observe($('pauseMenu'), { attributes: true, attributeFilter: ['class'] });
  function applyLayout() {
    const mobile = window.ironUseMobileUI();
    body.classList.toggle('mobile-ui', mobile);
    if (!mobile) closeProduction();
    if (mobile) {
      body.append($('minimapWrap')); extras.append($('btnAbility'), $('btnSuper'));
      header.insertBefore($('tabs'), $('mobilePanelClose'));
      if (api.getSelection().length) selectionChanged();
    }
    else {
      sidebar.prepend($('minimapWrap')); $('sideBtns').append($('btnSuper')); $('sideBtns').after($('btnAbility'));
      sidebar.insertBefore($('tabs'), $('buildGrid'));
      $('btnSuper').hidden = $('btnAbility').hidden = $('tabs').hidden = $('buildGrid').hidden = false;
      document.querySelectorAll('#tabs button').forEach(b => { b.hidden = false; }); api.productionFor(null);
      actions.querySelector('.cmds')?.remove(); api.refreshSelection();
    }
    $('btnPause').textContent = mobile ? '菜单' : '暂停 (Esc)'; requestAnimationFrame(api.resize);
    $('chatInput').placeholder = mobile ? '输入消息' : '输入文字，Enter 发送，Esc 关闭';
    document.dispatchEvent(new Event('mobilelayoutchange'));
  }
  layout.addEventListener('change', applyLayout); applyLayout();
  new ResizeObserver(() => api.resize()).observe(api.gameEl);
  const pointers = new Map();
  let pinch = null, multiple = false, selecting = false, holdTimer = null;
  function position(e) {
    const r = api.gameEl.getBoundingClientRect(); api.mouse.x = e.clientX - r.left; api.mouse.y = e.clientY - r.top;
    api.mouse.inGame = api.mouse.x >= 0 && api.mouse.y >= 0 && api.mouse.x < r.width && api.mouse.y < r.height; api.mouse.inWindow = false;
  }
  function cancelHold() { clearTimeout(holdTimer); holdTimer = null; hold.hidden = true; }
  function reset() {
    cancelHold(); pointers.clear(); pinch = null; multiple = selecting = false;
    api.mouse.down = api.mouse.drag = api.mouse.mid = api.mouse.inGame = false;
  }
  function pinchState() { const [a, b] = [...pointers.values()]; return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, d: Math.hypot(a.x - b.x, a.y - b.y) }; }
  api.gameEl.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse' || !api.active()) return;
    // Only a small margin around the resting stick belongs to camera movement.
    const stickRect = joystick.getBoundingClientRect(), margin = 32;
    if (stickPointer === null && pointers.size === 0 && !joystick.hidden && !api.isPlacing() && !api.getMode() &&
        e.clientX >= stickRect.left - margin && e.clientX <= stickRect.right + margin &&
        e.clientY >= stickRect.top - margin && e.clientY <= stickRect.bottom + margin && startStick(e, true)) return;
    e.preventDefault(); api.Sound.init(); position(e); closeProduction(); updateReady(); api.gameEl.setPointerCapture(e.pointerId);
    const p = { x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, moved: false, slop: false }; pointers.set(e.pointerId, p);
    if (pointers.size >= 2) { cancelHold(); multiple = true; api.mouse.down = api.mouse.drag = selecting = false; pinch = pinchState(); }
  });
  api.gameEl.addEventListener('pointermove', e => {
    const p = pointers.get(e.pointerId); if (!p) return;
    e.preventDefault(); position(e); const dx = e.clientX - p.x, dy = e.clientY - p.y; p.x = e.clientX; p.y = e.clientY;
    const dist = Math.hypot(e.clientX - p.sx, e.clientY - p.sy);
    if (dist > 9) p.moved = true;
    if (dist > 14) p.slop = true;
    if (p.slop && !selecting) cancelHold();
    if (pointers.size >= 2) {
      const next = pinchState();
      if (pinch && pinch.d > 0 && next.d > 0) {
        api.cam.h = Math.max(20, Math.min(85, api.cam.h * pinch.d / next.d));
        // 双指同时平移视野：按当前高度把屏幕像素折算成地图距离。
        const k = api.cam.h * 1.6 / Math.max(1, api.gameEl.clientHeight);
        api.cam.x -= (next.x - pinch.x) * k; api.cam.z -= (next.y - pinch.y) * k * 1.3;
      }
      pinch = next;
    } else if (!multiple && selecting) api.mouse.drag = p.moved;
    else if (!multiple && p.moved && !api.isPlacing() && !api.getMode()) {
      selecting = true; api.mouse.down = api.mouse.drag = true;
      const r = api.gameEl.getBoundingClientRect(); api.mouse.sx = p.sx - r.left; api.mouse.sy = p.sy - r.top;
    }
  });
  api.gameEl.addEventListener('pointerup', e => {
    const p = pointers.get(e.pointerId); if (!p) return;
    e.preventDefault(); position(e); cancelHold();
    if (api.active() && api.mouse.inGame && !multiple) {
      if (selecting) { if (p.moved) api.boxSelect(api.mouse.sx, api.mouse.sy, api.mouse.x, api.mouse.y, false); else api.setSelection([]); }
      else if (!p.moved) {
        const t = api.pickAt(api.mouse.x, api.mouse.y);
        if (api.getMode() === 'rally') { api.contextCommand(api.mouse.x, api.mouse.y); api.setMode(null); }
        else if (!api.getMode() && !api.isPlacing() && api.canCommand() && (!api.isOwn(t) || api.friendlyCommand(t))) api.contextCommand(api.mouse.x, api.mouse.y);
        else { const click = { button: 0, clientX: e.clientX, clientY: e.clientY, shiftKey: false, altKey: false }; api.gamePointerDown(click); api.gamePointerUp(click); }
      }
    }
    pointers.delete(e.pointerId); api.mouse.down = api.mouse.drag = selecting = false; if (!pointers.size) reset();
  });
  api.gameEl.addEventListener('pointercancel', reset);
  api.gameEl.addEventListener('lostpointercapture', e => { if (pointers.has(e.pointerId)) reset(); });
  window.addEventListener('blur', () => { reset(); resetStick(); });
  document.addEventListener('visibilitychange', () => {
    reset(); resetStick(); if (document.hidden && window.DBG?.Net.mode === 'off' && api.active() && !window.DBG.G.paused) $('btnPause').click();
  });
  let buildTouch = null;
  $('buildGrid').addEventListener('pointerdown', e => {
    const item = e.target.closest('.bitem'); if (e.pointerType === 'mouse' || !item || e.target.closest('.item-info')) return;
    buildTouch = { item, id: e.pointerId, x: e.clientX, y: e.clientY, at: performance.now() };
  });
  $('buildGrid').addEventListener('pointermove', e => { if (buildTouch && Math.hypot(e.clientX - buildTouch.x, e.clientY - buildTouch.y) > 9) buildTouch = null; });
  $('buildGrid').addEventListener('pointercancel', () => { buildTouch = null; });
  $('buildGrid').addEventListener('pointerup', e => {
    const p = buildTouch; buildTouch = null; if (!p || p.id !== e.pointerId || !p.item.contains(e.target)) return;
    const accepted = api.onBuildClick(p.item.dataset.type, { button: performance.now() - p.at >= 550 ? 2 : 0, shiftKey: false });
    if (accepted) { if (catalog !== 'military' || api.isPlacing()) closeProduction(); updateReady(); }
  });
  for (const type of ['mousedown', 'mouseup', 'click']) $('buildGrid').addEventListener(type, e => {
    if (type === 'click' && e.target.closest('.item-info')) return;
    if (e.sourceCapabilities?.firesTouchEvents) { e.preventDefault(); e.stopImmediatePropagation(); }
  }, true);
  const map = $('minimap'); let mapPointer = null;
  map.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse' || !api.active()) return;
    e.preventDefault(); map.setPointerCapture(e.pointerId); if (!api.minimapOnline()) return; closeProduction();
    if (api.getMode() === 'signal') api.signalMap(api.minimapWorld(e));
    else if (api.getMode() === 'rally') { api.mapCommand(api.minimapWorld(e)); api.setMode(null); }
    else { mapPointer = e.pointerId; const w = api.minimapWorld(e); api.centerOn(w.x, w.z); }

  });

  map.addEventListener('pointermove', e => {
    if (e.pointerId !== mapPointer || !api.active()) return;
    e.preventDefault(); const w = api.minimapWorld(e); api.centerOn(w.x, w.z);
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) map.addEventListener(type, () => { mapPointer = null; });
}
