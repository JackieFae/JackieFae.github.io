//
// Indexable tables for names and icon file paths to simplify readability.
//

// Bot Index.
const botIndex = {
  crab: 0,
  hunter: 1,
  guardianshield: 2,
  recall: 3,
  recallhunter: 4,
  scorpion: 5,
  beetle: 6,
  blink: 7,
  blinkhunter: 8,
  gunbot: 9,
  missilebot: 10,
  wasp: 11,
  hornet: 12,
  knight: 13,
  crossbow: 14,
  ballista: 15,
  kingcrab: 16,
  crusader: 17,
  bomber: 18,
  shocker: 19,
  recallshocker: 20,
  mortar: 21,
  swiftshocker: 22,
  heavyhunter: 23,
  destroyer: 24,
  raider: 25,
  turret: 26,
  heavyballista: 27,
  gargantua: 28,
  sniper: 29,
  advblink: 30,
  assaultbot: 31,
  advancedbot: 32,
  behemoth: 33,
  advancedmortar: 34,
  blaster: 35,
  butterfly: 36,
  dragonfly: 37,
  falcon: 38,
  airship: 39,
  advrecall: 40,
  mammoth: 41,
  stinger: 42,
  flakturret: 43,
  bulwark: 44,
  katbus: 45,
  locust: 46,
  kraken: 47,
  predator: 48,
  valkyrie: 49,
  artillery: 50,
  advdestroyer: 51,
  shade: 52,
};

// Look up unit full name by bot index.
const botNameLookup = [
  "Crab",
  "Hunter",
  "Guardian Shield",
  "Recall",
  "Recall Hunter",
  "Scorpion",
  "Beetle",
  "Blink",
  "Blink Hunter",
  "Gunbot",
  "Missilebot",
  "Wasp",
  "Hornet",
  "Knight",
  "Crossbow",
  "Ballista",
  "King Crab",
  "Crusader",
  "Bomber",
  "Shocker",
  "Recall Shocker",
  "Mortar",
  "Swift Shocker",
  "Heavy Hunter",
  "Destroyer",
  "Raider",
  "Turret",
  "Heavy Ballista",
  "Gargantua",
  "Sniper",
  "Advanced Blink",
  "Assaultbot",
  "Advancedbot",
  "Behemoth",
  "Advanced Mortar",
  "Blaster",
  "Butterfly",
  "Dragonfly",
  "Falcon",
  "Airship",
  "Advanced Recall",
  "Mammoth",
  "Stinger",
  "Flak Turret",
  "Bulwark",
  "Katbus",
  "Locust",
  "Kraken",
  "Predator",
  "Valkyrie",
  "Artillery",
  "Advanced Destroyer",
  "Shade",
];

// Look up unit icon by bot index.
const botImageLookup = [
  'res/images/units/' + botNameLookup[ 0].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[ 1].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[ 2].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[ 3].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[ 4].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[ 5].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[ 6].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[ 7].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[ 8].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[ 9].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[10].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[11].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[12].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[13].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[14].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[15].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[16].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[17].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[18].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[19].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[20].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[21].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[22].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[23].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[24].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[25].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[26].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[27].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[28].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[29].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[30].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[31].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[32].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[33].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[34].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[35].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[36].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[37].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[38].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[39].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[40].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[41].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[42].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[43].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[44].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[45].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[46].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[47].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[48].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[49].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[50].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[51].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/units/' + botNameLookup[52].toLowerCase().replace(/\s+/g,'') + '.png',
];

const botCount = botNameLookup.length;
  
// Tech Tier Index.
const techIndex = {
  core: 0,
  foundry: 1,
  advfoundry: 2,
  starforge: 3,
  advstarforge: 4,
  any: 5,
};

// Bot -> Tech Tier Map
// Lookup range of bot indexes by tech
const botTechMap = [
  botIndex.crab,
  botIndex.ballista,
  botIndex.heavyballista,
  botIndex.butterfly,
  botIndex.bulwark,
  botNameLookup.length,
]

// Look up tech path full name by tech index.
const techNameLookup = [
  'Core',
  'Foundry',
  'Advanced Foundry',
  'Starforge',
  'Advanced Starforge',
  'Any',
];

// Look up tech path icon by tech index.
const techImageLookup = [
  'res/images/techtiers/' + techNameLookup[ 0].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/techtiers/' + techNameLookup[ 1].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/techtiers/' + techNameLookup[ 2].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/techtiers/' + techNameLookup[ 3].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/techtiers/' + techNameLookup[ 4].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/techtiers/' + techNameLookup[ 5].toLowerCase().replace(/\s+/g,'') + '.png',
  ,
];

const techCount = techIndex.any;

// Resource Index.
const resourceIndex = {
  matter: 0,
  energy: 1,
  bandwidth: 2,
  //time: 3,
};

// Look up resource name by resource index.
const resourceNameLookup = [
  "Matter",
  "Energy",
  "Bandwidth",
  //"Time", // DNE, always zero in BA.
];

// Look up resource icon by resource index.
const resourceImageLookup = [
  'res/images/resources/' + resourceNameLookup[ 0].toLowerCase().replace(/\s+/g,'') + '.svg',
  'res/images/resources/' + resourceNameLookup[ 1].toLowerCase().replace(/\s+/g,'') + '.svg',
  'res/images/resources/' + resourceNameLookup[ 2].toLowerCase().replace(/\s+/g,'') + '.svg',
  //'res/images/resources/' + resourceNameLookup[ 3].toLowerCase().replace(/\s+/g,'') + '.svg', // DNE, always zero in BA.
];

// Trait Index
const traitIndex = {
  ground: 0,
  flying: 1,
  swarming: 2,
  piercing: 3,
  hulking: 4,
  shattering: 5,
  hunting: 6,
  passive: 7,
  any: 8,
};

// Look up trait full name by trait index.
const internalTraitNameLookup = [
  "Walking",
  "Flying",
  "Swarming",
  "Piercing",
  "Hulking",
  "Shattering",
  "Hunting",
  "Passive",
  "Any",
];

// Look up trait full name by trait index.
const traitNameLookup = [
  "GROUND",
  "AIR",
  "SMALL",
  "ANTI-BIG",
  "BIG",
  "SPLASH",
  "ANTI-AIR",
  "PASSIVE",
  "Any",
];

// Look up trait icon by trait index.
const traitImageLookup = [
  'res/images/traits/' + traitNameLookup[ 0].toLowerCase().replace(/\s+/g,'').replace(/-+/g,'') + '.png',
  'res/images/traits/' + traitNameLookup[ 1].toLowerCase().replace(/\s+/g,'').replace(/-+/g,'') + '.png',
  'res/images/traits/' + traitNameLookup[ 2].toLowerCase().replace(/\s+/g,'').replace(/-+/g,'') + '.png',
  'res/images/traits/' + traitNameLookup[ 3].toLowerCase().replace(/\s+/g,'').replace(/-+/g,'') + '.png',
  'res/images/traits/' + traitNameLookup[ 4].toLowerCase().replace(/\s+/g,'').replace(/-+/g,'') + '.png',
  'res/images/traits/' + traitNameLookup[ 5].toLowerCase().replace(/\s+/g,'').replace(/-+/g,'') + '.png',
  'res/images/traits/' + traitNameLookup[ 6].toLowerCase().replace(/\s+/g,'').replace(/-+/g,'') + '.png',
  'res/images/traits/' + traitNameLookup[ 7].toLowerCase().replace(/\s+/g,'').replace(/-+/g,'') + '.png',
  'res/images/traits/' + traitNameLookup[ 8].toLowerCase().replace(/\s+/g,'').replace(/-+/g,'') + '.png',
];

const traitCount = traitIndex.any;

const statIndex = {
//ID: ,
//name: ,
//manu: ,
//tech: ,
  Matter: 0,
  Energy: 1,
//resTotal: ,
  Bandwidth: 2,
//time: ,
  Health: 3,
  Walking: 4,
  Flying: 5,
  Swarming: 6,
  Piercing: 7,
  Hulking: 8,
  Shattering: 9,
  Hunting: 10,
  Passive: 11,
  Radius: 12,
  Speed: 13,
  Damage: 14,
  DamageWalking: 15,
  DamageFlying: 16,
  DamageSwarming: 17,
  DamagePiercing: 18,
  DamageHulking: 19,
  DamageShattering: 20,
  DamageHunting: 21,
  DamageBonusID0: 22,
  DamageBonus0: 23,
  DamageBonusID1: 24,
  DamageBonus1: 25,
  DamageBonusID2: 26,
  DamageBonus2: 27,
  DamageBonusID3: 28,
  DamageBonus3: 29,
  Duration: 30,
  Windup: 31,
  Recoil: 32,
  WeaponSpeed: 33,
  Range: 34,
  Splash: 35,
  TgtWalking: 36,
  TgtFlying: 37,
  TgtSwarming: 38,
  TgtPiercing: 39,
  TgtHulking: 40,
  TgtShattering: 41,
  TgtHunting: 42,
  Overclock: 43,
  Blink: 44,
  Recall: 45,
  Setup: 46,
  Detonate: 47,
  Unsetup: 48,
  Destruct: 49,
  "Guardian Shield": 50,
  Extra: 51,
};

const statCount = statIndex.Extra;

// Look up unit statistic full name by stat index.
const statNameLookup = [
//"ID",
//"Name",
//"Manu",
//"Tech",
  "Matter",
  "Energy",
//"ResTotal",
  "Bandwidth",
//"Time",
  "Health",
  "Walking",
  "Flying",
  "Swarming",
  "Piercing",
  "Hulking",
  "Shattering",
  "Hunting",
  "Passive",
  "Radius",
  "Speed",
  "Damage",
  "DamageWalking",
  "DamageFlying",
  "DamageSwarming",
  "DamagePiercing",
  "DamageHulking",
  "DamageShattering",
  "DamageHunting",
  "DamageBonusID0",
  "DamageBonus0",
  "DamageBonusID1",
  "DamageBonus1",
  "DamageBonusID2",
  "DamageBonus2",
  "DamageBonusID3",
  "DamageBonus3",
  "Duration",
  "Windup",
  "Recoil",
  "WeaponSpeed",
  "Range",
  "Splash",
  "TgtWalking",
  "TgtFlying",
  "TgtSwarming",
  "TgtPiercing",
  "TgtHulking",
  "TgtShattering",
  "TgtHunting",
  "Overclock",
  "Blink",
  "Recall",
  "Setup",
  "Detonate",
  "Unsetup",
  "Destruct",
  "Guardian Shield",
  "Extra",
];

// Look up unit statistic icon by stat index.
const statImageLookup = [
  'res/images/resources/' + resourceNameLookup[ 0].toLowerCase().replace(/\s+/g,'') + '.svg',
  'res/images/resources/' + resourceNameLookup[ 1].toLowerCase().replace(/\s+/g,'') + '.svg',
  'res/images/resources/' + resourceNameLookup[ 2].toLowerCase().replace(/\s+/g,'') + '.svg',
  'res/images/stats/' + statNameLookup[ 3].toLowerCase().replace(/\s+/g,'') + '.png', // Health
  'res/images/traits/' + traitNameLookup[ 0].toLowerCase().replace(/\s+/g,'').replace(/-+/g,'') + '.png',
  'res/images/traits/' + traitNameLookup[ 1].toLowerCase().replace(/\s+/g,'').replace(/-+/g,'') + '.png',
  'res/images/traits/' + traitNameLookup[ 2].toLowerCase().replace(/\s+/g,'').replace(/-+/g,'') + '.png',
  'res/images/traits/' + traitNameLookup[ 3].toLowerCase().replace(/\s+/g,'').replace(/-+/g,'') + '.png',
  'res/images/traits/' + traitNameLookup[ 4].toLowerCase().replace(/\s+/g,'').replace(/-+/g,'') + '.png',
  'res/images/traits/' + traitNameLookup[ 5].toLowerCase().replace(/\s+/g,'').replace(/-+/g,'') + '.png',
  'res/images/traits/' + traitNameLookup[ 6].toLowerCase().replace(/\s+/g,'').replace(/-+/g,'') + '.png',
  'res/images/techtiers/core.png',
  'res/images/stats/' + statNameLookup[12].toLowerCase().replace(/\s+/g,'') + '.png', // Radius
  'res/images/stats/' + statNameLookup[13].toLowerCase().replace(/\s+/g,'') + '.png', // Speed
  'res/images/stats/' + statNameLookup[14].toLowerCase().replace(/\s+/g,'') + '.png', // Damage
  'res/images/stats/dmgvs' + traitNameLookup[ 0].toLowerCase().replace(/\s+/g,'').replace(/-+/g,'') + '.png', // Damage vs. Walking
  'res/images/stats/dmgvs' + traitNameLookup[ 1].toLowerCase().replace(/\s+/g,'').replace(/-+/g,'') + '.png', // Damage vs Flying
  'res/images/stats/dmgvs' + traitNameLookup[ 2].toLowerCase().replace(/\s+/g,'').replace(/-+/g,'') + '.png', // Damage vs. Swarming
  'res/images/stats/dmgvs' + traitNameLookup[ 3].toLowerCase().replace(/\s+/g,'').replace(/-+/g,'') + '.png', // Damage vs. Piercing
  'res/images/stats/dmgvs' + traitNameLookup[ 4].toLowerCase().replace(/\s+/g,'').replace(/-+/g,'') + '.png', // Damage vs. Hulking
  'res/images/stats/dmgvs' + traitNameLookup[ 5].toLowerCase().replace(/\s+/g,'').replace(/-+/g,'') + '.png', // Damage vs. Shattering
  'res/images/stats/dmgvs' + traitNameLookup[ 6].toLowerCase().replace(/\s+/g,'').replace(/-+/g,'') + '.png', // Damage vs. Hunting
  'res/images/stats/' + statNameLookup[22].toLowerCase().replace(/\s+/g,'') + '.png', // SPECIAL CASE: RESOLVE BY LOOKING UP BOT IDX Idx 0
  'res/images/stats/' + statNameLookup[23].toLowerCase().replace(/\s+/g,'') + '.png', // SPECIAL CASE: RESOLVE BY LOOKING UP BOT IDX Damage vs. Idx 0
  'res/images/stats/' + statNameLookup[24].toLowerCase().replace(/\s+/g,'') + '.png', // SPECIAL CASE: RESOLVE BY LOOKING UP BOT IDX Idx 1
  'res/images/stats/' + statNameLookup[25].toLowerCase().replace(/\s+/g,'') + '.png', // SPECIAL CASE: RESOLVE BY LOOKING UP BOT IDX Damage vs. Idx 1
  'res/images/stats/' + statNameLookup[26].toLowerCase().replace(/\s+/g,'') + '.png', // SPECIAL CASE: RESOLVE BY LOOKING UP BOT IDX Idx 2
  'res/images/stats/' + statNameLookup[27].toLowerCase().replace(/\s+/g,'') + '.png', // SPECIAL CASE: RESOLVE BY LOOKING UP BOT IDX Damage vs. Idx 2
  'res/images/stats/' + statNameLookup[28].toLowerCase().replace(/\s+/g,'') + '.png', // SPECIAL CASE: RESOLVE BY LOOKING UP BOT IDX Idx 3
  'res/images/stats/' + statNameLookup[29].toLowerCase().replace(/\s+/g,'') + '.png', // SPECIAL CASE: RESOLVE BY LOOKING UP BOT IDX Damage vs. Idx 3
  'res/images/stats/' + statNameLookup[30].toLowerCase().replace(/\s+/g,'') + '.png', // Duration
  'res/images/stats/' + statNameLookup[31].toLowerCase().replace(/\s+/g,'') + '.png', // Windup
  'res/images/stats/' + statNameLookup[32].toLowerCase().replace(/\s+/g,'') + '.png', // Recoil
  'res/images/stats/' + statNameLookup[33].toLowerCase().replace(/\s+/g,'') + '.png', // Weapon Speed
  'res/images/stats/' + statNameLookup[34].toLowerCase().replace(/\s+/g,'') + '.png', // Range
  'res/images/stats/' + statNameLookup[35].toLowerCase().replace(/\s+/g,'') + '.png', // Splash
  'res/images/stats/tgt' + traitNameLookup[ 0].toLowerCase().replace(/\s+/g,'').replace(/-+/g,'') + '.png', // TgtWalking
  'res/images/stats/tgt' + traitNameLookup[ 1].toLowerCase().replace(/\s+/g,'').replace(/-+/g,'') + '.png', // TgtFlying
  'res/images/stats/tgt' + traitNameLookup[ 2].toLowerCase().replace(/\s+/g,'').replace(/-+/g,'') + '.png', // TgtSwarming
  'res/images/stats/tgt' + traitNameLookup[ 3].toLowerCase().replace(/\s+/g,'').replace(/-+/g,'') + '.png', // TgtPiercing
  'res/images/stats/tgt' + traitNameLookup[ 4].toLowerCase().replace(/\s+/g,'').replace(/-+/g,'') + '.png', // TgtHulking
  'res/images/stats/tgt' + traitNameLookup[ 5].toLowerCase().replace(/\s+/g,'').replace(/-+/g,'') + '.png', // TgtShattering
  'res/images/stats/tgt' + traitNameLookup[ 6].toLowerCase().replace(/\s+/g,'').replace(/-+/g,'') + '.png', // TgtHunting
  'res/images/abilities/' + statNameLookup[43].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/abilities/' + statNameLookup[44].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/abilities/' + statNameLookup[45].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/abilities/' + statNameLookup[46].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/abilities/' + statNameLookup[47].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/abilities/' + statNameLookup[48].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/abilities/' + statNameLookup[49].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/abilities/' + statNameLookup[50].toLowerCase().replace(/\s+/g,'') + '.png',
  '', // Extra, dummy image?
];

// League Index
const leagueIndex = {
  iron: 0,
  bronze: 1,
  silver: 2,
  gold: 3,
  platinum: 4,
  emerald: 5,
  diamond: 6,
  topace: 7,
  infinity: 8,
};

// League full name lookup by league index.
const leagueNameLookup = [
  "Iron",
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Emerald",
  "Diamond",
  "Top Ace",
  "Infinity", // Extra final league boundary.
];

// League icon lookup by league index.
const leagueImageLookup = [
  'res/images/leagues/' + leagueNameLookup[ 0].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/leagues/' + leagueNameLookup[ 1].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/leagues/' + leagueNameLookup[ 2].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/leagues/' + leagueNameLookup[ 3].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/leagues/' + leagueNameLookup[ 4].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/leagues/' + leagueNameLookup[ 5].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/leagues/' + leagueNameLookup[ 6].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/leagues/' + leagueNameLookup[ 7].toLowerCase().replace(/\s+/g,'') + '.png',
];

// Slot index.
const deckslotIndex = {
  core1: 0,
  core2: 1,
  foundry: 2,
  advfoundry: 3,
  wildfoundry: 4,
  starforge: 5,
  advstarforge: 6,
  wildstarforge: 7,
};

// Lookup slot name by slot index.
const deckslotNameLookup = [
  'Core',
  'Core',
  'Foundry',
  'Advanced Foundry',
  'Wild Foundry',
  'Starforge',
  'Advanced Starforge',
  'Wild Starforge',
];

// Lookup slot image by slot index.
const deckslotImageLookup = [
  techImageLookup[techIndex.core],
  techImageLookup[techIndex.core],
  techImageLookup[techIndex.foundry],
  techImageLookup[techIndex.advfoundry],
  'res/images/techtiers/' + deckslotNameLookup[deckslotIndex.wildfoundry].toLowerCase().replace(/\s+/g,'') + '.png',
  techImageLookup[techIndex.starforge],
  techImageLookup[techIndex.advstarforge],
  'res/images/techtiers/' + deckslotNameLookup[deckslotIndex.wildstarforge].toLowerCase().replace(/\s+/g,'') + '.png',
];

const deckslotStartTechMap = [
  techIndex.core, //core1
  techIndex.core, //core2
  techIndex.foundry, //foundry
  techIndex.advfoundry, //advfoundry
  techIndex.foundry, //wildfoundry
  techIndex.starforge, //starforge
  techIndex.advstarforge, //advstarforge
  techIndex.starforge, //wildstarforge
];

const deckslotEndTechMap = [
  techIndex.foundry, //core1
  techIndex.foundry, //core2
  techIndex.advfoundry, //foundry
  techIndex.starforge, //advfoundry
  techIndex.starforge, //wildfoundry
  techIndex.advstarforge, //starforge
  techIndex.any, //advstarforge
  techIndex.any, //wildstarforge
];

const deckslotCount = deckslotNameLookup.length;

// Ability index.
const abilityIndex = {
  blink: 0,
  detonate: 1,
  destruct: 2,
  overclock: 3,
  recall: 4,
  setup: 5,
  unsetup: 6,
  guardianshield: 7,
};

// Lookup ability name by slot index.
const abilityNameLookup = [
  'Blink',
  'Detonate',
  'Destruct',
  'Overclock',
  'Recall',
  'Setup',
  'Unsetup',
  'Guardian Shield',
];

// Lookup ability image by slot index.
const abilityImageLookup = [
  'res/images/abilities/' + abilityNameLookup[abilityIndex.blink].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/abilities/' + abilityNameLookup[abilityIndex.detonate].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/abilities/' + abilityNameLookup[abilityIndex.destruct].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/abilities/' + abilityNameLookup[abilityIndex.overclock].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/abilities/' + abilityNameLookup[abilityIndex.recall].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/abilities/' + abilityNameLookup[abilityIndex.setup].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/abilities/' + abilityNameLookup[abilityIndex.unsetup].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/abilities/' + abilityNameLookup[abilityIndex.guardianshield].toLowerCase().replace(/\s+/g,'') + '.png',
];

const manuIndex = {
  northperformance: 0,
  farhorizoncollective: 1,
  ghostsofvenus: 2,
  senkaishulimited: 3,
  irongandsons: 4,
  coronacentralsystems: 5,
  heavyunionalliance: 6,
  any: 7,
};


// Lookup manufacturer name by slot index.
const manuNameLookup = [
  'North Performance',
  'Far Horizon Collective',
  'Ghosts of Venus',
  'Senkaishu Limited',
  'Iron and Sons',
  'Corona Central Systems',
  'Heavy Union Alliance',
  'Any',
];

// Lookup manufacturer image by slot index.
const manuImageLookup = [
  'res/images/manufacturers/' + manuNameLookup[manuIndex.northperformance].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/manufacturers/' + manuNameLookup[manuIndex.farhorizoncollective].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/manufacturers/' + manuNameLookup[manuIndex.ghostsofvenus].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/manufacturers/' + manuNameLookup[manuIndex.senkaishulimited].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/manufacturers/' + manuNameLookup[manuIndex.irongandsons].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/manufacturers/' + manuNameLookup[manuIndex.coronacentralsystems].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/manufacturers/' + manuNameLookup[manuIndex.heavyunionalliance].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/manufacturers/' + manuNameLookup[manuIndex.any].toLowerCase().replace(/\s+/g,'') + '.png',
];

const manuCount = manuIndex.any;
