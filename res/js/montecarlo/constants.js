//
// Indexable tables for names and icon file paths to simplify readability.
//

// Bot Index.
const botIndex = {
  crab: 0,
  hunter: 1,
  recall: 2,
  recallhunter: 3,
  scorpion: 4,
  beetle: 5,
  blink: 6,
  blinkhunter: 7,
  gunbot: 8,
  missilebot: 9,
  wasp: 10,
  hornet: 11,
  knight: 12,
  crossbow: 13,
  ballista: 14,
  kingcrab: 15,
  crusader: 16,
  bomber: 17,
  shocker: 18,
  recallshocker: 19,
  mortar: 20,
  swiftshocker: 21,
  heavyhunter: 22,
  destroyer: 23,
  raider: 24,
  turret: 25,
  heavyballista: 26,
  gargantua: 27,
  sniper: 28,
  advblink: 29,
  assaultbot: 30,
  advancedbot: 31,
  behemoth: 32,
  butterfly: 33,
  dragonfly: 34,
  falcon: 35,
  airship: 36,
  advrecall: 37,
  mammoth: 38,
  stinger: 39,
  flakturret: 40,
  bulwark: 41,
  katbus: 42,
  locust: 43,
  kraken: 44,
  predator: 45,
  valkyrie: 46,
  advdestroyer: 47,
  artillery: 48,
};

// Look up unit full name by bot index.
const botNameLookup = [
  "Crab",
  "Hunter",
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
  "Advanced Destroyer",
  "Artillery",
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
  any: 7,
};

// Look up trait full name by trait index.
const traitNameLookup = [
  "GROUND",
  "AIR",
  "SMALL",
  "ANTI-BIG",
  "BIG",
  "SPLASH",
  "ANTI-AIR",
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
];

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
  Radius: 11,
  Speed: 12,
  Damage: 13,
  DmgGrounded: 14,
  DamageFlying: 15,
  DamageSwarming: 16,
  DamagePiercing: 17,
  DamageHulking: 18,
  DamageShattering: 19,
  DamageHunting: 20,
  DamageBonusID0: 21,
  DamageBonus0: 22,
  DamageBonusID1: 23,
  DamageBonus1: 24,
  DamageBonusID2: 25,
  DamageBonus2: 26,
  DamageBonusID3: 27,
  DamageBonus3: 28,
  Duration: 29,
  Windup: 30,
  Recoil: 31,
  WeaponSpeed: 32,
  Range: 33,
  Splash: 34,
  TgtGrounded: 35,
  TgtFlying: 36,
  TgtSwarming: 37,
  TgtPiercing: 38,
  TgtHulking: 39,
  TgtShattering: 40,
  TgtHunting: 41,
  Overclock: 42,
  Blink: 43,
  Recall: 44,
  Setup: 45,
  Detonate: 46,
  Unsetup: 47,
  Destruct: 48,
  Extra: 49,
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
  "Radius",
  "Speed",
  "Damage",
  "DmgGrounded",
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
  "TgtGrounded",
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
  'res/images/stats/' + statNameLookup[11].toLowerCase().replace(/\s+/g,'') + '.png', // Radius
  'res/images/stats/' + statNameLookup[12].toLowerCase().replace(/\s+/g,'') + '.png', // Speed
  'res/images/stats/' + statNameLookup[13].toLowerCase().replace(/\s+/g,'') + '.png', // Damage
  'res/images/stats/' + statNameLookup[14].toLowerCase().replace(/\s+/g,'') + '.png', // Damage vs. Ground
  'res/images/stats/' + statNameLookup[15].toLowerCase().replace(/\s+/g,'') + '.png', // Damage vs Flying
  'res/images/stats/' + statNameLookup[16].toLowerCase().replace(/\s+/g,'') + '.png', // Damage vs. Swarming
  'res/images/stats/' + statNameLookup[17].toLowerCase().replace(/\s+/g,'') + '.png', // Damage vs. Piercing
  'res/images/stats/' + statNameLookup[18].toLowerCase().replace(/\s+/g,'') + '.png', // Damage vs. Hulking
  'res/images/stats/' + statNameLookup[19].toLowerCase().replace(/\s+/g,'') + '.png', // Damage vs. Shattering
  'res/images/stats/' + statNameLookup[20].toLowerCase().replace(/\s+/g,'') + '.png', // Damage vs. Hunting
  'res/images/stats/' + statNameLookup[21].toLowerCase().replace(/\s+/g,'') + '.png', // SPECIAL CASE: RESOLVE BY LOOKING UP BOT IDX Idx 0
  'res/images/stats/' + statNameLookup[22].toLowerCase().replace(/\s+/g,'') + '.png', // SPECIAL CASE: RESOLVE BY LOOKING UP BOT IDX Damage vs. Idx 0
  'res/images/stats/' + statNameLookup[23].toLowerCase().replace(/\s+/g,'') + '.png', // SPECIAL CASE: RESOLVE BY LOOKING UP BOT IDX Idx 1
  'res/images/stats/' + statNameLookup[24].toLowerCase().replace(/\s+/g,'') + '.png', // SPECIAL CASE: RESOLVE BY LOOKING UP BOT IDX Damage vs. Idx 1
  'res/images/stats/' + statNameLookup[25].toLowerCase().replace(/\s+/g,'') + '.png', // SPECIAL CASE: RESOLVE BY LOOKING UP BOT IDX Idx 2
  'res/images/stats/' + statNameLookup[26].toLowerCase().replace(/\s+/g,'') + '.png', // SPECIAL CASE: RESOLVE BY LOOKING UP BOT IDX Damage vs. Idx 2
  'res/images/stats/' + statNameLookup[27].toLowerCase().replace(/\s+/g,'') + '.png', // SPECIAL CASE: RESOLVE BY LOOKING UP BOT IDX Idx 3
  'res/images/stats/' + statNameLookup[28].toLowerCase().replace(/\s+/g,'') + '.png', // SPECIAL CASE: RESOLVE BY LOOKING UP BOT IDX Damage vs. Idx 3
  'res/images/stats/' + statNameLookup[29].toLowerCase().replace(/\s+/g,'') + '.png', // Duration
  'res/images/stats/' + statNameLookup[30].toLowerCase().replace(/\s+/g,'') + '.png', // Windup
  'res/images/stats/' + statNameLookup[31].toLowerCase().replace(/\s+/g,'') + '.png', // Recoil
  'res/images/stats/' + statNameLookup[32].toLowerCase().replace(/\s+/g,'') + '.png', // Weapon Speed
  'res/images/stats/' + statNameLookup[33].toLowerCase().replace(/\s+/g,'') + '.png', // Splash
  'res/images/stats/' + statNameLookup[34].toLowerCase().replace(/\s+/g,'') + '.png', // TgtGround
  'res/images/stats/' + statNameLookup[35].toLowerCase().replace(/\s+/g,'') + '.png', // TgtFlying
  'res/images/stats/' + statNameLookup[36].toLowerCase().replace(/\s+/g,'') + '.png', // TgtSwarming
  'res/images/stats/' + statNameLookup[37].toLowerCase().replace(/\s+/g,'') + '.png', // TgtPiercing
  'res/images/stats/' + statNameLookup[38].toLowerCase().replace(/\s+/g,'') + '.png', // TgtHulking
  'res/images/stats/' + statNameLookup[39].toLowerCase().replace(/\s+/g,'') + '.png', // TgtShattering
  'res/images/stats/' + statNameLookup[41].toLowerCase().replace(/\s+/g,'') + '.png', // TgtHunting
  'res/images/abilities/' + statNameLookup[42].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/abilities/' + statNameLookup[43].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/abilities/' + statNameLookup[44].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/abilities/' + statNameLookup[45].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/abilities/' + statNameLookup[46].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/abilities/' + statNameLookup[47].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/abilities/' + statNameLookup[48].toLowerCase().replace(/\s+/g,'') + '.png',
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


// Ability index.
const abilityIndex = {
  blink: 0,
  detonate: 1,
  destruct: 2,
  overclock: 3,
  recall: 4,
  setup: 5,
  unsetup: 6,
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
