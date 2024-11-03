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
  Mortar: 20,
  swiftshocker: 21,
  heavyhunter: 22,
  destroyer: 23,
  raider: 24,
  turret: 25,
  heavyballista: 26,
  predator: 27,
  sniper: 28,
  advblink: 29,
  assaultbot: 30,
  behemoth: 31,
  gargantua: 32,
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
  valkyrie: 45,
  artillery: 46,
  advancedbot: 47,
  advdestroyer: 48,
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
  "Predator",
  "Sniper",
  "Advanced Blink",
  "Assaultbot",
  "Behemoth",
  "Gargantua",
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
  "Valkyrie",
  "Artillery",
  "Advancedbot",
  "Advanced Destroyer",
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
  
// Tech Tier Index.
const techIndex = {
  core: 0,
  foundry: 1,
  advfoundry: 2,
  starforge: 3,
  advstarforge: 4,
};

// Bot -> Tech Tier Map
// Lookup range of bot indexes by tech
const botTechMap = [
  botIndex.crab,
  botIndex.ballista,
  botIndex.heavyballista,
  botIndex.butterfly,
  botIndex.bulwark,
]

// Look up tech path full name by tech index.
const techNameLookup = [
  'Core',
  'Foundry',
  'Advanced Foundry',
  'Starforge',
  'Advanced Starforge',
];

// Look up tech path icon by tech index.
const techImageLookup = [
  'res/images/techtiers/' + techNameLookup[ 0].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/techtiers/' + techNameLookup[ 1].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/techtiers/' + techNameLookup[ 2].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/techtiers/' + techNameLookup[ 3].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/techtiers/' + techNameLookup[ 4].toLowerCase().replace(/\s+/g,'') + '.png',
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

const statIndex = {
  hp: 0,
  radius: 1,
  movespeed: 2,
  damage: 3,
  vsflying: 4,
  vsswarming: 5,
  vspiercing: 6,
  vshulking: 7,
  vsshattering: 8,
  duration: 9,
  windup: 10,
  recoil: 11,
  range: 12,
  weaponspeed: 13,
  splashradius: 14,
  targetflying: 15,
  targetswarming: 16,
  targetpiercing: 17,
  targethulking: 18,
  targetshattering: 19,
};

// Look up unit statistic full name by stat index.
const statNameLookup = [
  "Value",
  "Matter",
  "Energy",
  "Bandwidth",
  //"Time",
  "Health",
  "Radius",
  "Movement Speed",
  "Damage",
  "Bonus vs. Flying",
  "Bonus vs. Swarming",
  "Bonus vs. Piercing",
  "Bonus vs. Hulking",
  "Bonus vs. Shattering",
  "Duration",
  "Wind up",
  "Recoil",
  "Range",
  "Weapon Speed",
  "Splash Radius",
  "Targets Flying",
  "Targets Swarming",
  "Targets Piercing",
  "Targets Hulking",
  "Targets Shattering",
];

// Look up unit statistic icon by stat index.
const statImageLookup = [
  '', // Use botImageLookup
  resourceImageLookup[ 0],
  resourceImageLookup[ 1],
  resourceImageLookup[ 2],
  //
  'res/images/stats/' + statNameLookup[ 4].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/stats/' + statNameLookup[ 5].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/stats/' + 'speed' + '.png',
  'res/images/stats/' + statNameLookup[ 7].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/traits/' + 'air' + '.png',
  'res/images/traits/' + 'small' + '.png',
  'res/images/traits/' + 'antibig' + '.png',
  'res/images/traits/' + 'big' + '.png',
  'res/images/traits/' + 'splash' + '.png',
  'res/images/stats/' + statNameLookup[13].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/stats/' + statNameLookup[14].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/stats/' + statNameLookup[15].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/stats/' + statNameLookup[16].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/stats/' + statNameLookup[17].toLowerCase().replace(/\s+/g,'') + '.png',
  'res/images/stats/' + 'splash' + '.png',
  'res/images/traits/' + 'air' + '.png',
  'res/images/traits/' + 'small' + '.png',
  'res/images/traits/' + 'antibig' + '.png',
  'res/images/traits/' + 'big' + '.png',
  'res/images/traits/' + 'splash' + '.png',
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