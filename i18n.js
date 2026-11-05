/* Offline display translations. Simulation data, commands and saved matches stay unchanged. */
(() => {
  'use strict';
  const dictionary = new Map();
  function add(lines) {
    for (const line of lines.trim().split('\n')) {
      const split = line.indexOf('|');
      if (split > 0) dictionary.set(line.slice(0, split), line.slice(split + 1));
    }
  }
  add(`
钢铁前线 · 移动版|TACTICAL REAL-TIME STRATEGY
IRON FRONTLINE · 原创即时战略|IRON FRONTLINE · Real-time strategy
钢铁前线|Iron Frontline
开始游戏|Start Game
多人游戏|Multiplayer
单人游戏|Single Player
游戏指南（新手必看）|How to Play
游戏指南|Field Manual
联机对战（最多 4 人）|Multiplayer (up to 4 players)
联机对战|Multiplayer
创建房间|Create Room
加入游戏|Join Game
你的名字|Your Name
房间代码|Room Code
输入名字|Enter your name
6 位房间码|6-character code
需要联网 · 最多 4 人对战|Internet required · Up to 4 players
游戏设置|Game Setup
选择国家|Choose Faction
你的国家|Your Faction
随机国家|Random Faction
随机分配国家|Randomize Factions
电脑对手|AI Opponents
电脑难度|AI Difficulty
地图大小|Map Size
天气/昼夜|Weather / Day Cycle
天气与昼夜|Weather / Day Cycle
单机对战 · 确认后选择国家|Single player · Confirm to choose factions
联机房间 · 房主修改后同步|Online room · Host controls settings
标准|Standard
快速|Fast
简单|Easy
普通|Normal
困难|Hard
大陆|Mainland
内海|Inland Sea
三国|Three Fronts
开启|On
已关闭|Closed
关闭 (Esc)|Close (Esc)
关闭|Close
作战暂停|Paused
继续作战|Resume
重新开始|Main Menu
再来一局|Play Again
回到总部|Return to HQ
战场交流|Battle Chat
操作指南|Controls
显示指南|Show Manual
建筑维修|Building Repairs
暂无受损建筑|No damaged buildings
维修中 · 点击停止|Repairing · Tap to stop
点击维修|Tap to repair
一键修复|Repair All
维修持续消耗资金，资金不足时等待|Repairs cost credits over time; paused when funds run out
点按生产 · 长按取消一项|Tap to queue · Hold to cancel one
收起生产菜单|Close production
移动视野摇杆|Camera joystick
请横屏作战|Rotate to landscape
横放手机继续作战，已自动暂停|Rotate your phone to continue. Game paused.
集结点|Rally
信号类型：|Ping type: 
点击地图或小地图发送信号|Tap the battlefield or minimap to send a ping
信号 · |Ping · 
就绪 · 放置|Ready · Place
停止维修|Stop Repairs
全部下车|Unload All
撤出步兵|Evacuate
设为主建筑|Set Primary
已设为主建筑|is now the primary producer
攻击移动|Attack Move
停止|Stop
维修|Repair
建造|Build
军事|Military
建筑|Buildings
防御|Defense
步兵|Infantry
载具|Vehicles
空军|Air Force
海军|Navy
研究|Research
详情|Details
取消|Cancel
出售|Sell
菜单|Menu
设置|Setup
返回|Back
确认|Confirm
创建|Create
加入|Join
发送|Send
聊天|Chat
暂停|Pause
资金|Credits
时间|Time
目标|Objective
胜 利|VICTORY
战 败|DEFEAT
胜利|Victory
战斗结束|Battle over
你取得了胜利！|You are victorious!
获得了胜利|has won
电脑|AI
玩家名|Player name
玩家|Player
指挥官|Commander
随机|Random
位置|Slot
（你）|(you)
的国家| faction
已研究|Researched
研究中|Researching
正在研究中|Research in progress
已经研究过了|Already researched
正在建造中|Construction in progress
正在建造其他建筑|Another building is under construction
无法建造|Cannot build
人口满|Population full
未解锁|Locked
就绪|Ready
排队|Queued
需要：|Requires: 
前置：|Requires: 
专属：|Exclusive: 
技能：|Ability: 
国家技能|Faction Ability
发射导弹|Launch Missile
导弹井|Missile Silo
导弹就绪|Missile ready
拦截弹就绪|Interceptor ready
装填中|Reloading
生命|HP
载货|Cargo
电力|Power
使用|Used
产出|Generated
彩色条：发电量|Bar: power generated
竖线：用电需求|Line: power required
用电需求：|Power required: 
提供人口 +|Population +
人口|Pop
速度|Speed
射程|Range
弹药|Ammo
充能|Charge
装填|Reload
载员|Passengers
进驻|Garrison
经验|XP
视野|Sight
伤害|Damage
射速|Fire Rate
护甲|Armor
武器|Weapon
等级|Level
军衔|Rank
冷却|Cooldown
定位|Role
单位|Units
通用|Shared
最多建造|Build limit: 
研究时间|Research time
在研究所研究|Research at a Military Lab
在兵营研究，研究期间暂停步兵生产|Research at Barracks; infantry production pauses
已暂停（空格继续）|Paused (Space to resume)
已暂停|Paused
导弹打击目标|Missile target
看这里|Look Here
进攻这里|Attack Here
来这里防守|Defend Here
撤退！|Retreat!
好的|OK
谢谢|Thanks
输入消息|Enter message
输入文字，Enter 发送，Esc 关闭|Type a message; Enter to send, Esc to close
信号|Ping
被摧毁|destroyed
晋升为|promoted to
已占领|captured
已修复|repaired
已出售|sold
警告：|Warning: 
老兵|Veteran
精英|Elite
中立|Neutral
村庄守军|Village Militia
作战时间|Battle time
难度|Difficulty
胜者：|Winner: 
总收入|Total Income
击杀|Kills
损失|Losses
参战：|Combatants: 
北岭联邦|Northland Federation
赤砂共和国|Red Sand Republic
金穗联合体|Golden Grain Union
灰鹰自治区|Grey Hawk Territory
钢铁洪流|Steel Tide
机动游击|Mobile Warfare
经济与阵地|Economy & Fortifications
精锐与空中|Elite Air Power
北岭|Northland
赤砂|Red Sand
金穗|Golden Grain
灰鹰|Grey Hawk
寒带|Tundra
沙漠|Desert
东方|Eastern
山地|Highlands
坦克装甲厚、火力猛，但速度慢|Heavy armor and firepower, but slow tanks
征召兵便宜量大，喷火兵专烧碉堡|Cheap conscripts; flamethrowers clear garrisons
建筑生命 +20%，燃煤电厂产电 +20%|Building HP +20%; coal power output +20%
单位快而便宜、装甲薄|Fast and affordable units with light armor
狙击手和反坦克导弹组静止时伪装|Snipers and AT teams camouflage while stationary
建筑便宜 15%、建得快，生命 -18%|Buildings cost 15% less and build faster; HP -18%
矿石收入 +5%|Ore income +5%
防御建筑便宜 15%、生命 +8%|Defenses cost 15% less; HP +8%
步兵进驻伤害更高，火炮射程最远|Stronger garrisons and long-range artillery
单位贵但精准、射程远|Costly, accurate units with long range
直升机坪和机场便宜 20%|Helipads and airfields cost 20% less
有侦察无人机和电子战车|Recon drones and electronic warfare vehicles
工程师|Engineer
采矿车|Harvester
征召兵|Conscript
火箭筒兵|Bazooka Trooper
喷火兵|Flamethrower
履带装甲侦察车|Tracked Scout
履带装甲运兵车|Tracked APC
“冻原”重型坦克|Tundra Heavy Tank
四联装自行高炮|Quad AA Vehicle
152 毫米自行榴弹炮|152mm Howitzer
“堡垒”重坦|Bastion Heavy Tank
重型武装直升机|Heavy Gunship
截击机|Interceptor
装甲攻击机|Armored Attack Jet
远程重型轰炸机|Heavy Bomber
巡逻艇|Patrol Boat
驱逐舰|Destroyer
攻击潜艇|Attack Submarine
导弹巡洋舰|Missile Cruiser
民兵|Militia
反坦克导弹组|AT Missile Team
狙击手|Sniper
武装皮卡|Armed Pickup
突击摩托兵|Assault Motorcycle
轮式运兵车|Wheeled APC
轻型坦克|Light Tank
车载防空导弹|Mobile SAM
“沙暴”火箭炮|Sandstorm Rockets
战术导弹车|Tactical Missile Truck
轻型武装直升机|Light Gunship
老式截击机|Legacy Interceptor
火箭攻击机|Rocket Attack Jet
中型轰炸机|Medium Bomber
快速导弹艇|Fast Missile Boat
护卫舰|Frigate
小型潜艇|Coastal Submarine
步枪兵|Rifleman
反坦克兵|AT Trooper
迫击炮组|Mortar Team
8×8 轮式装甲车|8x8 Armored Car
履带步兵战车|Tracked IFV
主战坦克|Main Battle Tank
弹炮合一防空车|Hybrid AA Vehicle
自行加榴炮|Gun Howitzer
两栖突击车|Amphibious Assault Vehicle
武装直升机|Gunship
攻击机|Attack Jet
巡航导弹载机|Cruise Missile Carrier
导弹驱逐舰|Missile Destroyer
潜艇|Submarine
空降兵|Paratrooper
标枪导弹兵|Javelin Trooper
特种侦察兵|Recon Commando
侦察车|Scout Car
侦察无人机|Recon Drone
装甲救护运兵车|Medical APC
中型坦克|Medium Tank
远程防空导弹车|Long-range SAM
精确制导炮|Guided Artillery
电子战车|EW Vehicle
“雷枭”攻击直升机|Thunder Owl Gunship
多用途战斗机|Multirole Fighter
精确攻击机|Precision Attack Jet
轰炸机|Bomber
防空护卫舰|AA Frigate
总部|HQ
发电站|Power Plant
精炼厂|Refinery
兵营|Barracks
战车工厂|Vehicle Factory
雷达站|Radar Station
直升机坪|Helipad
军事研究所|Military Lab
科技中心|Tech Center
战略导弹井|Strategic Silo
机枪塔|MG Turret
反装甲炮塔|AT Turret
防空炮|AA Gun
步兵碉堡|Infantry Bunker
反导系统|Missile Defense
“长城”要塞炮|Great Wall Cannon
副部|Forward HQ
装甲维修站|Repair Depot
自动采矿平台|Mining Platform
伪装网阵地|Camouflage Net
空降步兵营|Airborne Barracks
民房|House
村公所|Village Hall
油井|Oil Derrick
采矿场|Quarry
船厂|Shipyard
机场|Airfield
防弹衣|Body Armor
穿甲弹|AP Rounds
战地急救|Combat Medicine
复合装甲|Composite Armor
火控系统|Fire Control
自动化精炼|Automated Refining
热成像|Thermal Imaging
主动防护系统|Active Protection
野战维修|Field Repairs
精确制导|Precision Guidance
电子对抗|Electronic Countermeasures
指挥要塞|Command Fortress
燃煤电厂|Coal Power Plant
矿石处理厂|Ore Processor
征兵站|Barracks
重型战车厂|Heavy Factory
重机枪堡|HMG Bunker
100 毫米反坦克炮|100mm AT Gun
57 毫米高炮|57mm AA Gun
混凝土碉堡|Concrete Bunker
工兵|Sapper
重型采矿车|Heavy Harvester
前线指挥部|Frontline HQ
柴油发电站|Diesel Generator
矿石集散站|Ore Depot
民兵营地|Militia Camp
车辆改装厂|Vehicle Workshop
沙袋机枪阵地|Sandbag MG Nest
反坦克导弹阵地|AT Missile Site
双管高射炮|Twin AA Gun
隐蔽碉堡|Concealed Bunker
技工|Technician
轻型采矿车|Light Harvester
总指挥部|Central HQ
水力发电站|Hydro Power Plant
练兵场|Training Ground
战车总厂|Vehicle Works
防空导弹阵地|SAM Site
山地指挥所|Highland HQ
燃气轮机电站|Gas Turbine Plant
训练营|Training Camp
装甲车间|Armor Workshop
导弹塔|Missile Turret
防空导弹塔|SAM Turret
战斗工兵|Combat Engineer
战地抢修|Emergency Repairs
火箭炮覆盖|Rocket Barrage
紧急拨款|Emergency Grant
伞兵空投|Paratroop Drop
战车厂|Factory
飞机场|Airfield
草地|Grass
土地|Dirt
岩石|Rock
林地|Forest
沼泽|Swamp
沙地|Sand
公路|Road
浅滩|Ford
村庄|Village
小地图|Minimap
地图|Map
节奏|Pace
轻甲|Light Armor
重甲|Heavy Armor
舰船|Ships
空中|Air
机枪|Machine Gun
机关炮|Autocannon
高射炮|AA Cannon
鱼雷|Torpedo
火焰|Flame
狙击|Sniper
防空|Anti-Air
火炮|Artillery
小艇|Boat
巡洋舰|Cruiser
直升机|Helicopter
上车|Embark
下车|Disembark
伪装|Camouflage
隐蔽|Concealment
伏击|Ambush
部署|Deploy
两栖|Amphibious
其他|Other
二级|Tier 2
一级|Tier 1
地形|Terrain
地表|Surface
说明|Description
昼夜|Day Cycle
天气|Weather
效果|Effect
海战|Naval Combat
要点|Tips
飞机|Aircraft
镜头|Camera
中键|Middle Mouse
滚轮|Mouse Wheel
左键|Left Click
右键|Right Click
空格|Space
方向键|Arrow Keys
缩放|Zoom
数字|Number
回基地|Return to Base
编队|Control Group
失守|lost
雷达离线|Radar Offline
建造雷达站以启用小地图|Build a radar station for radar coverage
收入|Income
/秒|/s
蓝|Blue
红|Red
黄|Yellow
青|Cyan
大|Large
小|Small
水|Water
桥|Bridge
雨|Rain
雾|Fog
晴|Clear
格| tiles
座| buildings
秒|s
人）| players)
个单位| units
方）| sides)
（停机）|(Parked)
（就绪）|(Ready)
（村庄守军）|(Village militia)
（中立）|(Neutral)
已选择|Selected
输入房间码|Enter room code
加载中|Loading
正在加载|Loading
初始化|Initializing
准备中|Preparing
小镇|Town
宝石矿|Gems
无效|Invalid
信号和聊天只在联机时可用|Pings and chat are only available online
联机时只有房主可以暂停|Only the host can pause an online game
至少需要 2 方：等朋友加入，或把位置设为电脑|At least 2 sides required. Add a friend or an AI.
至少需要 2 方：等朋友加入，或把空位切换为电脑|At least 2 sides required. Add a friend or an AI.
三国鼎立需要正好 3 方：关闭多余位置，或补一个电脑|Three Fronts requires exactly 3 sides. Adjust the slots.
三国鼎立需要正好 3 方：把多余的位置关闭，或补一个电脑|Three Fronts requires exactly 3 sides. Adjust the slots.
三国鼎立固定 3 方：你和 2 个电脑，三家位置完全对称|Three Fronts: you and 2 AIs on a symmetric map
你的国家：随机（开局时揭晓）|Your faction: random (revealed at game start)
多个电脑之间也会互相攻击，最后存活的一方获胜|All sides are enemies. The last surviving side wins.
你是房主：整场战斗在你的设备上运行，请保持游戏在前台|You are the host. Keep the game in the foreground.
选好国家后等待房主开始；可以和别人选同一个国家|Choose a faction and wait for the host to start.
点位置上的“玩家 / 电脑 / 关闭”调整参战方|Set each slot to Player, AI, or Closed
暂无|None
关闭位置|Close Slot
等待玩家|Waiting for player
等待房主|Waiting for host
房间码|Room code
版本|Version
已断开连接，由电脑接管|disconnected; AI has taken over
正在连接|Connecting
连接失败|Connection failed
连接超时|Connection timed out
房间不存在|Room not found
房间已满|Room is full
正在创建房间|Creating room
已连接|Connected
需要联网|Internet required
关闭游戏|Exit Game
返回主菜单|Main Menu
继续|Continue
显示|Show
隐藏|Hide
天亮了|Dawn has arrived
起雾了|Fog is rolling in
雨停了|The rain has stopped
雾散了|The fog has cleared
下雨了|It is raining
天黑了|Night has fallen
护送采矿车|Escort harvesters
需要支援！|Need support!
准备进攻！|Ready to attack!
正在建造|Building
训练中|Training
暂停中|Paused
训练|Train
队列|Queue
完成|Complete
已完成|Complete
经济|Economy
战斗|Combat
新手入门|Getting Started
国家特性|Factions
单位一览|Unit Reference
建筑一览|Building Reference
操作|Controls
联机|Online
控制|Controls
总计|Total
主建筑|Primary
正在生成|Generating
推荐开局顺序|Recommended Opening
提供|Provides
需求|Required
保护|Protection
充值|Charge
回放|Replay
天气关闭|Weather Off
供电不足|Low Power
电力不足|Low Power
资金不足|Insufficient credits
已被摧毁|Destroyed
取消一项|Cancel One
全部|All
未建造|Not built
没有|No
已就绪|Ready
准备|Ready
离线|Offline
在线|Online
自动|Auto
选中|Selected
出兵|Production
已加入|Joined
已退出|Left
观战|Spectate
观战中|Spectating
房主|Host
加入中|Joining
胜|Win
败|Loss
正常|Normal
低|Low
高|High
中|Medium
和| and 
共|Total 
你|You
按|Press 
造|Build 
开|On
：|: 
，|, 
；|; 
。|.
（| (
）|) 
「|“
」|”
、|, 
！|!
？|?
　| · 
`);

  let language = 'zh';
  try { language = localStorage.getItem('ironLanguage') === 'en' ? 'en' : 'zh'; } catch {}
  let pattern;
  const records = new WeakMap();
  const attributes = ['title', 'aria-label', 'placeholder', 'alt'];
  const ignored = 'script,style,textarea,[data-no-translate],#chatLog';
  function translate(text) {
    if (language !== 'en' || !/[\u3400-\u9fff]/.test(text)) return text;
    if (dictionary.has(text.trim())) return text.replace(text.trim(), dictionary.get(text.trim()));
    if (!pattern) pattern = new RegExp([...dictionary.keys()].sort((a,b) => b.length - a.length).map(key => key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g');
    // A single replacement pass never recursively translates English output.
    return text.replace(pattern, key => dictionary.get(key));
  }
  function localizedValue(owner, key, current, write) {
    let record = records.get(owner);
    if (!record) records.set(owner, record = new Map());
    let previous = record.get(key);
    const source = previous && current === previous.output ? previous.source : current;
    const output = translate(source);
    record.set(key, {source, output});
    if (output !== current) write(output);
  }
  function visit(root) {
    if (root.nodeType === Node.TEXT_NODE) {
      if (!root.parentElement?.closest(ignored)) localizedValue(root, 'text', root.data, v => { root.data = v; });
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE || root.matches(ignored)) return;
    for (const attribute of attributes) {
      if (root.hasAttribute(attribute)) localizedValue(root, attribute, root.getAttribute(attribute), v => root.setAttribute(attribute, v));
    }
    for (const child of root.childNodes) visit(child);
  }
  const observer = new MutationObserver(changes => {
    observer.disconnect();
    for (const change of changes) {
      if (change.type === 'childList') for (const node of change.addedNodes) visit(node);
      else visit(change.target);
    }
    observe();
  });
  function observe() { observer.observe(document.body, {subtree:true, childList:true, characterData:true, attributes:true, attributeFilter:attributes}); }
  function setLanguage(next) {
    language = next === 'en' ? 'en' : 'zh';
    try { localStorage.setItem('ironLanguage', language); } catch {}
    document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';
    document.documentElement.classList.toggle('english-ui', language === 'en');
    document.title = language === 'en' ? 'Iron Frontline' : '钢铁前线';
    observer.disconnect(); visit(document.body); observe();
    for (const button of document.querySelectorAll('.language-toggle')) button.textContent = language === 'en' ? '中文' : 'English';
    document.dispatchEvent(new Event('languagechange'));
  }
  window.ironI18n = {t:translate, get language() {return language;}, setLanguage,
    add(lines) { add(lines); pattern = null; }};
  for (const id of ['mainMenu', 'pauseMenu']) {
    const target = document.getElementById(id);
    const button = document.createElement('button');
    button.className = 'language-toggle tbtn'; button.type = 'button'; button.dataset.noTranslate = '';
    button.setAttribute('aria-label', 'Language / 语言');
    button.onclick = () => setLanguage(language === 'en' ? 'zh' : 'en');
    target.append(button);
  }
  setLanguage(language);
})();
