//
// Manage loading for all model data.
// Baseline data are bulk loaded on page load/refresh.
// Specific data are loaded through calls from other modules.
//

const loaded = {
  abilityTemps: false,    // Load of ability data used in the last simulation.
  botTemps: false,        // Load of unit data used in the last simulation.
  basicCount: false,      // Load of full Monte Carlo iteration count complete.
  basicRegression: false, // Load of full Monte Carlo model analysis complete.
  basicResults: false,    // Load of example results from full Monte Carlo complete.
  count: false,           // Load of user-filtered subset iteration count complete.
  regression: false,      // Load of user-filtered regression analysis complete.
  results: false,         // Load of user-selected bot results complete.
  ladder: false,          // Load of simulated ladder results complete.
  report: false,          // Load of selected battle report complete.
}

// Load basic page data.
loadBasicData();

function loadBasicData()
{
  loadAbilityData();
  loadBotData();
  loadBasicCounts();
  loadBasicResults();
}

function loadSpecificData()
{
  if(loaded.basicCount && loaded.basicRegression && loaded.basicResult)
  {
    loadData('');
    loadLadder();
    loadReports(0);
  }
}

function loadAbilityData()
{
  Promise.all([
    d3.csv(pathRoot + 'tmpabi_all.csv'),
  ]).then(([abilityData]) => {
    GlobalData.abilities = [];
    abilityData.forEach(function(d, i) {
      GlobalData.abilities[i] = {};
      GlobalData.abilities[i].ID = +d.ID;
      GlobalData.abilities[i].Name = d.Name;
      GlobalData.abilities[i].Windup = +d.Windup;
      GlobalData.abilities[i].Cooldown = +d.Cooldown;
      GlobalData.abilities[i].Range = +d.Range;
      GlobalData.abilities[i].Duration = +d.Duration;
      GlobalData.abilities[i].ChargeCount = +d.ChargeCount;
      GlobalData.abilities[i].Value0 = +d.Value0;
      GlobalData.abilities[i].Value1 = +d.Value1;
      GlobalData.abilities[i].Value2 = +d.Value2;
      GlobalData.abilities[i].Value3 = +d.Value3;
    });

    //console.log(GlobalData.abilities);
    loaded.abilityTemps = true;
    loadBasicRegression();
  }).catch((error) => {
    console.log(error);
  });
}

function loadBotData()
{
  Promise.all([
    d3.csv(pathRoot + 'tmpbot_all.csv'),
  ]).then(([botData]) => {
    GlobalData.bots = [];
    botData.forEach(function(d, i) {
      GlobalData.bots[i] = {};
      GlobalData.bots[i].ID = +d.ID;
      GlobalData.bots[i].Name = d.Name;
      GlobalData.bots[i].Manu = +d.Manu;
      GlobalData.bots[i].Tech = +d.Tech;
      GlobalData.bots[i].Matter = +d.Matter;
      GlobalData.bots[i].Energy = +d.Energy;
      GlobalData.bots[i].ResTotal = +d.Matter + 2.5 * +d.Energy;
      GlobalData.bots[i].Bandwidth = +d.Bandwidth;
      GlobalData.bots[i].Time = +d.Time;
      GlobalData.bots[i].Health = +d.Health;
      GlobalData.bots[i].Walking = +d.Walking;
      GlobalData.bots[i].Flying = +d.Flying;
      GlobalData.bots[i].Swarming = +d.Swarming;
      GlobalData.bots[i].Piercing = +d.Piercing;
      GlobalData.bots[i].Hulking = +d.Hulking;
      GlobalData.bots[i].Shattering = +d.Shattering;
      GlobalData.bots[i].Hunting = +d.Hunting;
      GlobalData.bots[i].Passive = +d.Passive;
      GlobalData.bots[i].Radius = +d.Radius;
      GlobalData.bots[i].Speed = +d.Speed;
      GlobalData.bots[i].Damage = +d.Damage;
      GlobalData.bots[i].DamageWalking = +d.DamageWalking;
      GlobalData.bots[i].DamageFlying = +d.DamageFlying;
      GlobalData.bots[i].DamageSwarming = +d.DamageSwarming;
      GlobalData.bots[i].DamagePiercing = +d.DamagePiercing;
      GlobalData.bots[i].DamageHulking = +d.DamageHulking;
      GlobalData.bots[i].DamageShattering = +d.DamageShattering;
      GlobalData.bots[i].DamageHunting = +d.DamageHunting;
      GlobalData.bots[i].DamagePassive = +d.DamagePassive;
      GlobalData.bots[i].DamageTier1 = +d.DamageTier1;
      GlobalData.bots[i].DamageTier2 = +d.DamageTier2;
      GlobalData.bots[i].DamageTier3 = +d.DamageTier3;
      GlobalData.bots[i].DamageFoundry = +d.DamageFoundry;
      GlobalData.bots[i].DamageStarforge = +d.DamageStarforge;
      GlobalData.bots[i].DamageBonusID0 = +d.DamageBonusID0;
      GlobalData.bots[i].DamageBonus0 = +d.DamageBonus0;
      GlobalData.bots[i].DamageBonusID1 = +d.DamageBonusID1;
      GlobalData.bots[i].DamageBonus1 = +d.DamageBonus1;
      GlobalData.bots[i].DamageBonusID2 = +d.DamageBonusID2;
      GlobalData.bots[i].DamageBonus2 = +d.DamageBonus2;
      GlobalData.bots[i].DamageBonusID3 = +d.DamageBonusID3;
      GlobalData.bots[i].DamageBonus3 = +d.DamageBonus3;
      GlobalData.bots[i].Duration = +d.Duration;
      GlobalData.bots[i].Windup = +d.Windup;
      GlobalData.bots[i].Recoil = +d.Recoil;
      GlobalData.bots[i].WeaponSpeed = +d.WeaponSpeed;
      GlobalData.bots[i].Range = +d.Range;
      GlobalData.bots[i].Splash = +d.Splash;
      GlobalData.bots[i].TgtWalking = +d.TgtWalking;
      GlobalData.bots[i].TgtFlying = +d.TgtFlying;
      GlobalData.bots[i].TgtSwarming = +d.TgtSwarming;
      GlobalData.bots[i].TgtPiercing = +d.TgtPiercing;
      GlobalData.bots[i].TgtHulking = +d.TgtHulking;
      GlobalData.bots[i].TgtShattering = +d.TgtShattering;
      GlobalData.bots[i].TgtHunting = +d.TgtHunting;
      GlobalData.bots[i].TgtPassive = +d.TgtPassive;
      GlobalData.bots[i].TgtTier1 = +d.TgtTier1;
      GlobalData.bots[i].TgtTier2 = +d.TgtTier2;
      GlobalData.bots[i].TgtTier3 = +d.TgtTier3;
      GlobalData.bots[i].TgtFoundry = +d.TgtFoundry;
      GlobalData.bots[i].TgtStarforge = +d.TgtStarforge;
      GlobalData.bots[i].Overclock = +d.Overclock;
      GlobalData.bots[i].Blink = +d.Blink;
      GlobalData.bots[i].Recall = +d.Recall;
      GlobalData.bots[i].Setup = +d.Setup;
      GlobalData.bots[i].Detonate = +d.Detonate;
      GlobalData.bots[i].Unsetup = +d.Unsetup;
      GlobalData.bots[i].Destruct = +d.Destruct;
      GlobalData.bots[i]["Guardian Shield"] = +d["Guardian Shield"];
    });

    //console.log(GlobalData.bots);
    loaded.botTemps = true;
    loadBasicRegression();
  }).catch((error) => {
    console.log(error);
  });
}

function loadBasicCounts()
{
  Promise.all([
    d3.csv(pathRoot + 'count_all.csv'),
  ]).then(([countData]) => {
    countData.forEach(function(d, i) {
      if(i == 0)
      {
        GlobalData.countBase = +d.Count;
      }
    });

    loaded.basicCount = true;
    loadBasicRegression(); // Attempt to load specifics.
  }).catch((error) => {
    console.log(error);
  });
}

function loadBasicResults()
{
  Promise.all([
    d3.csv(pathRoot + 'result_all.csv'),
  ]).then(([resData]) => {
    GlobalData.resultDataBase = [];
    resData.forEach(function(d, i) {
      var scoreIdx = 0;
      var botIdx = 0;
      GlobalData.resultDataBase[i] = {};
      GlobalData.resultDataBase[i].idx = +d.Index;
      GlobalData.resultDataBase[i].totalScore = +d.TotalScore;
      GlobalData.resultDataBase[i].scores = [];
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.CrabScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.HunterScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d["Guardian ShieldScore"];
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.RecallScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d["Recall HunterScore"];
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.ScorpionScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.BeetleScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.BlinkScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d["Blink HunterScore"];
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.GunbotScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.MissilebotScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.WaspScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.HornetScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.KnightScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.CrossbowScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.BallistaScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d["King CrabScore"];
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.CrusaderScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.BomberScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.ShockerScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d["Recall ShockerScore"];
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.MortarScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d["Swift ShockerScore"];
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d["Heavy HunterScore"];
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.DestroyerScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.RaiderScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.TurretScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d["Heavy BallistaScore"];
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.GargantuaScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.SniperScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d["Advanced BlinkScore"];
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.AssaultbotScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.AdvancedbotScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.BehemothScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d["Advanced MortarScore"];
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.BlasterScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.ButterflyScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.DragonflyScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.FalconScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.AirshipScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d["Advanced RecallScore"];
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.MammothScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.StingerScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d["Flak TurretScore"];
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.BulwarkScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.KatbusScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.LocustScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.KrakenScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.PredatorScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.ValkyrieScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.ArtilleryScore;
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d["Advanced DestroyerScore"];
      GlobalData.resultDataBase[i].scores[scoreIdx++] = +d.ShadeScore;
      GlobalData.resultDataBase[i].vars = [];
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Crab;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Hunter;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d["Guardian Shield"];
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Recall;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d["Recall Hunter"];
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Scorpion;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Beetle;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Blink;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d["Blink Hunter"];
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Gunbot;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Missilebot;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Wasp;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Hornet;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Knight;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Crossbow;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Ballista;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d["King Crab"];
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Crusader;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Bomber;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Shocker;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d["Recall Shocker"];
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Mortar;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d["Swift Shocker"];
      GlobalData.resultDataBase[i].vars[botIdx++] = +d["Heavy Hunter"];
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Destroyer;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Raider;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Turret;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d["Heavy Ballista"];
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Gargantua;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Sniper;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d["Advanced Blink"];
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Assaultbot;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Advancedbot;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Behemoth;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d["Advanced Mortar"];
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Blaster;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Butterfly;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Dragonfly;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Falcon;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Airship;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d["Advanced Recall"];
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Mammoth;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Stinger;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d["Flak Turret"];
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Bulwark;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Katbus;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Locust;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Kraken;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Predator;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Valkyrie;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Artillery;
      GlobalData.resultDataBase[i].vars[botIdx++] = +d["Advanced Destroyer"];
      GlobalData.resultDataBase[i].vars[botIdx++] = +d.Shade;
      //GlobalData.resultDataBase[i].vars[botidx++] = +d.Skill;
    });

    loaded.basicResult = true;
    loadBasicRegression(); // Attempt to load specifics.
  }).catch((error) => {
    console.log(error);
  });
}

function loadBasicRegression()
{
  if(loaded.abilityTemps && loaded.basicCount && loaded.botTemps && loaded.basicResult)
  {
    Promise.all([
      d3.csv(pathRoot + 'linreg_all.csv'),
    ]).then(([regDataBase]) => {
      GlobalData.regDataBase = [];
      var varCount = 2 * (botCount + 2);
      regDataBase.forEach(function(d, i) {
        var botIdx = parseInt(i / varCount);
        var valueIdx = i % varCount;
        if(GlobalData.regDataBase[botIdx] == null)
        {
          GlobalData.regDataBase[botIdx] = [];
        }
        GlobalData.regDataBase[botIdx][valueIdx] = {};
        GlobalData.regDataBase[botIdx][valueIdx].ID = botIdx;
        GlobalData.regDataBase[botIdx][valueIdx].name = d.Name;
        GlobalData.regDataBase[botIdx][valueIdx].Score = +d.Score;
        GlobalData.regDataBase[botIdx][valueIdx].Stddev = +d.StdDev;
        GlobalData.regDataBase[botIdx][valueIdx].AvgScore = +d.AvgScore;
        GlobalData.regDataBase[botIdx][valueIdx].AvgStddev = +d.AvgStdDev;
        GlobalData.regDataBase[botIdx][valueIdx].Weight = +d.Weight;
        GlobalData.regDataBase[botIdx][valueIdx].WeightRes = parseInt(+d.Weight / Math.max(1.0, GlobalData.bots[botIdx].ResTotal) * 100);
        GlobalData.regDataBase[botIdx][valueIdx].WeightBW = parseInt(+d.Weight / Math.max(1.0, GlobalData.bots[botIdx].Bandwidth));
        GlobalData.regDataBase[botIdx][valueIdx].AdvantagedIterations = parseInt(+d.AdvantagedIterations);
        GlobalData.regDataBase[botIdx][valueIdx].AdvantagedWins = parseInt(+d.AdvantagedWins);
        GlobalData.regDataBase[botIdx][valueIdx].DisadvantagedIterations = parseInt(+d.DisadvantagedIterations);
        GlobalData.regDataBase[botIdx][valueIdx].DisadvantagedWins = parseInt(+d.DisadvantagedWins);
        GlobalData.regDataBase[botIdx][valueIdx].NeutralIterations = parseInt(+d.NeutralIterations);
        GlobalData.regDataBase[botIdx][valueIdx].NeutralWins = parseInt(+d.NeutralWins);
        GlobalData.regDataBase[botIdx][valueIdx].PickPct = 100 - parseInt(+d.NeutralIterations);
        GlobalData.regDataBase[botIdx][valueIdx].ScoreDiff = 0;
        GlobalData.regDataBase[botIdx][valueIdx].StddevDiff = 0;
        GlobalData.regDataBase[botIdx][valueIdx].AvgScoreDiff = 0;
        GlobalData.regDataBase[botIdx][valueIdx].AvgStddevDiff = 0;
        GlobalData.regDataBase[botIdx][valueIdx].WeightDiff = 0;
        GlobalData.regDataBase[botIdx][valueIdx].WeightResDiff = 0;
        GlobalData.regDataBase[botIdx][valueIdx].WeightBWDiff = 0;
        GlobalData.regDataBase[botIdx][valueIdx].AdvantagedIterationsDiff = 0;
        GlobalData.regDataBase[botIdx][valueIdx].AdvantagedWinsDiff = 0;
        GlobalData.regDataBase[botIdx][valueIdx].DisadvantagedIterationsDiff = 0;
        GlobalData.regDataBase[botIdx][valueIdx].DisadvantagedWinsDiff = 0;
        GlobalData.regDataBase[botIdx][valueIdx].NeutralIterationsDiff = 0;
        GlobalData.regDataBase[botIdx][valueIdx].NeutralWinsDiff = 0;
        GlobalData.regDataBase[botIdx][valueIdx].PickPctDiff = 0;
      });

      loaded.basicRegression = true;
      loadSpecificData(); // Attempt to load specifics.
    }).catch((error) => {
      console.log(error);
    });
  }
}

//
// Temp stats data
//
GlobalData.regStats = [];
for(var botIdx = 0; botIdx < botCount; ++botIdx)
{
  GlobalData.regStats[botIdx] = {};
  //GlobalData.regStats[botIdx].ID = botIdx;
  //GlobalData.regStats[botIdx].Name = 0;
  //GlobalData.regStats[botIdx].Manu = 0;
  //GlobalData.regStats[botIdx].Tech = 0;
  GlobalData.regStats[botIdx].Matter = 0.0;
  GlobalData.regStats[botIdx].Energy = 0.0;
  //GlobalData.regStats[botIdx].ResTotal = 0.0;
  GlobalData.regStats[botIdx].Bandwidth = 0.0;
  //GlobalData.regStats[botIdx].Time = 0.0;
  GlobalData.regStats[botIdx].Health = 0.0;
  GlobalData.regStats[botIdx].Walking = 0.0;
  GlobalData.regStats[botIdx].Flying = 0.0;
  GlobalData.regStats[botIdx].Swarming = 0.0;
  GlobalData.regStats[botIdx].Piercing = 0.0;
  GlobalData.regStats[botIdx].Hulking = 0.0;
  GlobalData.regStats[botIdx].Shattering = 0.0;
  GlobalData.regStats[botIdx].Hunting = 0.0;
  GlobalData.regStats[botIdx].Passive = 0.0;
  GlobalData.regStats[botIdx].Radius = 0.0;
  GlobalData.regStats[botIdx].Speed = 0.0;
  GlobalData.regStats[botIdx].Damage = 0.0;
  GlobalData.regStats[botIdx].DamageWalking = 0.0;
  GlobalData.regStats[botIdx].DamageFlying = 0.0;
  GlobalData.regStats[botIdx].DamageSwarming = 0.0;
  GlobalData.regStats[botIdx].DamagePiercing = 0.0;
  GlobalData.regStats[botIdx].DamageHulking = 0.0;
  GlobalData.regStats[botIdx].DamageShattering = 0.0;
  GlobalData.regStats[botIdx].DamageHunting = 0.0;
  //GlobalData.regStats[botIdx].DamagePassive = 0.0;
  //GlobalData.regStats[botIdx].DamageTier1 = 0.0;
  //GlobalData.regStats[botIdx].DamageTier2 = 0.0;
  //GlobalData.regStats[botIdx].DamageTier3 = 0.0;
  //GlobalData.regStats[botIdx].DamageFoundry = 0.0;
  //GlobalData.regStats[botIdx].DamageStarforge = 0.0;
  GlobalData.regStats[botIdx].DamageBonusID0 = 0.0;
  GlobalData.regStats[botIdx].DamageBonus0 = 0.0;
  GlobalData.regStats[botIdx].DamageBonusID1 = 0.0;
  GlobalData.regStats[botIdx].DamageBonus1 = 0.0;
  GlobalData.regStats[botIdx].DamageBonusID2 = 0.0;
  GlobalData.regStats[botIdx].DamageBonus2 = 0.0;
  GlobalData.regStats[botIdx].DamageBonusID3 = 0.0;
  GlobalData.regStats[botIdx].DamageBonus3 = 0.0;
  GlobalData.regStats[botIdx].Duration = 0.0;
  GlobalData.regStats[botIdx].Windup = 0.0;
  GlobalData.regStats[botIdx].Recoil = 0.0;
  GlobalData.regStats[botIdx].WeaponSpeed = 0.0;
  GlobalData.regStats[botIdx].Range = 0.0;
  GlobalData.regStats[botIdx].Splash = 0.0;
  GlobalData.regStats[botIdx].TgtWalking = 0.0;
  GlobalData.regStats[botIdx].TgtFlying = 0.0;
  GlobalData.regStats[botIdx].TgtSwarming = 0.0;
  GlobalData.regStats[botIdx].TgtPiercing = 0.0;
  GlobalData.regStats[botIdx].TgtHulking = 0.0;
  GlobalData.regStats[botIdx].TgtShattering = 0.0;
  GlobalData.regStats[botIdx].TgtHunting = 0.0;
  //GlobalData.regStats[botIdx].TgtPassive = 0.0;
  //GlobalData.regStats[botIdx].TgtTier1 = 0.0;
  //GlobalData.regStats[botIdx].TgtTier2 = 0.0;
  //GlobalData.regStats[botIdx].TgtTier3 = 0.0;
  //GlobalData.regStats[botIdx].TgtFoundry = 0.0;
  //GlobalData.regStats[botIdx].TgtStarforge = 0.0;
  GlobalData.regStats[botIdx].Overclock = 0.0;
  GlobalData.regStats[botIdx].Blink = 0.0;
  GlobalData.regStats[botIdx].Recall = 0.0;
  GlobalData.regStats[botIdx].Setup = 0.0;
  GlobalData.regStats[botIdx].Detonate = 0.0;
  GlobalData.regStats[botIdx].Unsetup = 0.0;
  GlobalData.regStats[botIdx].Destruct = 0.0;
  GlobalData.regStats[botIdx]["Guardian Shield"] = 0.0;
}

function loadData(i)
{
  loaded.count = false;
  loaded.regression = false;
  loaded.results = false;
  var path = '';
  if(i == '')
  {
    path = '_all';
  }
  else
  {
    path = i;
  }

  Promise.all([
    d3.csv(pathRoot + 'count' + path + '.csv'),
  ]).then(([countData]) => {
    GlobalData.count = 0;
    countData.forEach(function(d, i) {
      if(i == 0)
      {
        GlobalData.count = +d.Count;
      }
    });

    loaded.count = true;
    if(loaded.count && loaded.results && loaded.regression)
    {
      drawBuilder(); // deck.js
      drawRegression(); // regression.js
      computeCompareStats();
      drawStats(); // stats.js
      drawCorrelation(); // correlation.js
      drawResults(resultSelection); // results.js
    }
  }).catch((error) => {
    console.log(error);
  });

  Promise.all([
    d3.csv(pathRoot + 'linreg_combo.csv'),
  ]).then(([regData]) => {
    GlobalData.regData = [];
    //GlobalData.regStats = [];
    var numStats = 9; // TODO: Make equal to stat count
    var varCount = 2 * (botCount + 2) + numStats;
    regData.forEach(function(d, i) {
      var botIdx = parseInt(i / varCount);
      var valueIdx = i % varCount;

      // Map weights in bot at botIdx from other bots and skill/aggression.
      if((valueIdx < botIdx) || (botIdx + numStats < valueIdx))
      {
        if(GlobalData.regData[botIdx] == null)
        {
          GlobalData.regData[botIdx] = [];
        }
        var mapValueIdx = valueIdx;
        if(botIdx + numStats < mapValueIdx)
        {
          mapValueIdx -= numStats;
        }
        GlobalData.regData[botIdx][mapValueIdx] = {};
        GlobalData.regData[botIdx][mapValueIdx].ID = botIdx;
        GlobalData.regData[botIdx][mapValueIdx].correlationID = mapValueIdx;
        GlobalData.regData[botIdx][mapValueIdx].name = d.Name;
        GlobalData.regData[botIdx][mapValueIdx].Score = +d.Score;
        GlobalData.regData[botIdx][mapValueIdx].Stddev = +d.StdDev;
        GlobalData.regData[botIdx][mapValueIdx].AvgScore = +d.AvgScore;
        GlobalData.regData[botIdx][mapValueIdx].AvgStddev = +d.AvgStdDev;
        GlobalData.regData[botIdx][mapValueIdx].Weight = +d.Weight;
        GlobalData.regData[botIdx][mapValueIdx].WeightRes = parseInt(+d.Weight / Math.max(1.0, GlobalData.bots[botIdx].ResTotal) * 100);
        GlobalData.regData[botIdx][mapValueIdx].WeightBW = parseInt(+d.Weight / Math.max(1.0, GlobalData.bots[botIdx].Bandwidth));
        GlobalData.regData[botIdx][mapValueIdx].AdvantagedIterations = parseInt(+d.AdvantagedIterations);
        GlobalData.regData[botIdx][mapValueIdx].AdvantagedWins = parseInt(+d.AdvantagedWins);
        GlobalData.regData[botIdx][mapValueIdx].DisadvantagedIterations = parseInt(+d.DisadvantagedIterations);
        GlobalData.regData[botIdx][mapValueIdx].DisadvantagedWins = parseInt(+d.DisadvantagedWins);
        GlobalData.regData[botIdx][mapValueIdx].NeutralIterations = parseInt(+d.NeutralIterations);
        GlobalData.regData[botIdx][mapValueIdx].NeutralWins = parseInt(+d.NeutralWins);
        GlobalData.regData[botIdx][mapValueIdx].PickPct = (botIdx == mapValueIdx) ? GlobalData.regDataBase[botIdx][botIdx].PickPct : 100 - parseInt(+d.DisadvantagedIterations + +d.NeutralIterations);
        GlobalData.regData[botIdx][mapValueIdx].ScoreDiff = +d.Score - GlobalData.regDataBase[botIdx][botIdx].Score;
        GlobalData.regData[botIdx][mapValueIdx].StddevDiff = +d.StdDev - GlobalData.regDataBase[botIdx][botIdx].Stddev;
        GlobalData.regData[botIdx][mapValueIdx].AvgScoreDiff = +d.AvgScore - GlobalData.regDataBase[botIdx][botIdx].AvgScore;
        GlobalData.regData[botIdx][mapValueIdx].AvgStddevDiff = +d.AvgStdDev - GlobalData.regDataBase[botIdx][botIdx].AvgStddev;
        GlobalData.regData[botIdx][mapValueIdx].WeightDiff = 0;
        GlobalData.regData[botIdx][mapValueIdx].WeightResDiff = 0;
        GlobalData.regData[botIdx][mapValueIdx].WeightBWDiff = 0;
        GlobalData.regData[botIdx][mapValueIdx].AdvantagedIterationsDiff = parseInt(+d.AdvantagedIterations) - GlobalData.regDataBase[botIdx][botIdx].AdvantagedIterations;
        GlobalData.regData[botIdx][mapValueIdx].AdvantagedWinsDiff = parseInt(+d.AdvantagedWins) - GlobalData.regDataBase[botIdx][botIdx].AdvantagedWins;
        GlobalData.regData[botIdx][mapValueIdx].DisadvantagedIterationsDiff = parseInt(+d.DisadvantagedIterations) - GlobalData.regDataBase[botIdx][botIdx].DisadvantagedIterations;
        GlobalData.regData[botIdx][mapValueIdx].DisadvantagedWinsDiff = parseInt(+d.DisadvantagedWins) - GlobalData.regDataBase[botIdx][botIdx].DisadvantagedWins;
        GlobalData.regData[botIdx][mapValueIdx].NeutralIterationsDiff = parseInt(+d.NeutralIterations) - GlobalData.regDataBase[botIdx][botIdx].NeutralIterations;
        GlobalData.regData[botIdx][mapValueIdx].NeutralWinsDiff = parseInt(+d.NeutralWins) - GlobalData.regDataBase[botIdx][botIdx].NeutralWins;
        GlobalData.regData[botIdx][mapValueIdx].PickPctDiff = GlobalData.regData[botIdx][mapValueIdx].PickPct - GlobalData.regDataBase[botIdx][botIdx].PickPct;
      }
      else // Map stat weights in bot at botIdx
      {
        // Copy common values from base regData.
        if(GlobalData.regData[botIdx] == null)
        {
          GlobalData.regData[botIdx] = [];
        }
        if(GlobalData.regData[botIdx][botIdx] == null)
        {
          GlobalData.regData[botIdx][botIdx] = {};
          GlobalData.regData[botIdx][botIdx].ID = botIdx;
          GlobalData.regData[botIdx][botIdx].correlationID = valueIdx;
          GlobalData.regData[botIdx][botIdx].name = botNameLookup[botIdx];
          GlobalData.regData[botIdx][botIdx].Score = +d.Score;
          GlobalData.regData[botIdx][botIdx].Stddev = +d.StdDev;
          GlobalData.regData[botIdx][botIdx].AvgScore = +d.AvgScore;
          GlobalData.regData[botIdx][botIdx].AvgStddev = +d.AvgStdDev;
          GlobalData.regData[botIdx][botIdx].Weight = 0.0;
          GlobalData.regData[botIdx][botIdx].WeightRes = 0.0;
          GlobalData.regData[botIdx][botIdx].WeightBW = 0.0;
          GlobalData.regData[botIdx][botIdx].AdvantagedIterations = GlobalData.regDataBase[botIdx][botIdx].AdvantagedIterations;
          GlobalData.regData[botIdx][botIdx].AdvantagedWins = GlobalData.regDataBase[botIdx][botIdx].AdvantagedWins;
          GlobalData.regData[botIdx][botIdx].DisadvantagedIterations = GlobalData.regDataBase[botIdx][botIdx].DisadvantagedIterations;
          GlobalData.regData[botIdx][botIdx].DisadvantagedWins = GlobalData.regDataBase[botIdx][botIdx].DisadvantagedWins;
          GlobalData.regData[botIdx][botIdx].NeutralIterations = GlobalData.regDataBase[botIdx][botIdx].NeutralIterations;
          GlobalData.regData[botIdx][botIdx].NeutralWins = GlobalData.regDataBase[botIdx][botIdx].NeutralWins;
          GlobalData.regData[botIdx][botIdx].PickPct = GlobalData.regDataBase[botIdx][botIdx].PickPct;
          GlobalData.regData[botIdx][botIdx].ScoreDiff = +d.Score - GlobalData.regDataBase[botIdx][botIdx].Score;
          GlobalData.regData[botIdx][botIdx].StddevDiff = +d.StdDev - GlobalData.regDataBase[botIdx][botIdx].Stddev;
          GlobalData.regData[botIdx][botIdx].AvgScoreDiff = +d.AvgScore - GlobalData.regDataBase[botIdx][botIdx].AvgScore;
          GlobalData.regData[botIdx][botIdx].AvgStddevDiff = +d.AvgStdDev - GlobalData.regDataBase[botIdx][botIdx].AvgStddev;
          GlobalData.regData[botIdx][botIdx].WeightDiff = 0;
          GlobalData.regData[botIdx][botIdx].WeightResDiff = 0;
          GlobalData.regData[botIdx][botIdx].WeightBWDiff = 0;
          GlobalData.regData[botIdx][botIdx].AdvantagedIterationsDiff = 0;
          GlobalData.regData[botIdx][botIdx].AdvantagedWinsDiff = 0;
          GlobalData.regData[botIdx][botIdx].DisadvantagedIterationsDiff = 0;
          GlobalData.regData[botIdx][botIdx].DisadvantagedWinsDiff = 0;
          GlobalData.regData[botIdx][botIdx].NeutralIterationsDiff = 0;
          GlobalData.regData[botIdx][botIdx].NeutralWinsDiff = 0;
          GlobalData.regData[botIdx][botIdx].PickPctDiff = 0;
        }

        // Load specific stat data.
        if(GlobalData.regStats[botIdx] == null)
        {
          GlobalData.regStats[botIdx] = {};
        }
        GlobalData.regStats[botIdx][d.Name] = +d.Weight;
        // TODO: Load other specific stats values for stats table?

        // Compose total weight as the sum of stats.
        GlobalData.regData[botIdx][botIdx].Weight += +d.Weight * GlobalData.bots[botIdx][d.Name];
        GlobalData.regData[botIdx][botIdx].WeightRes += +d.Weight * GlobalData.bots[botIdx][d.Name] / Math.max(1.0, GlobalData.bots[botIdx].ResTotal) * 100.0;
        GlobalData.regData[botIdx][botIdx].WeightBW += +d.Weight * GlobalData.bots[botIdx][d.Name] / Math.max(1.0, GlobalData.bots[botIdx].Bandwidth);
      }
    });

    GlobalData.comparisons = {};
    GlobalData.comparisons.tech = [];
    GlobalData.comparisons.slot = [];
    GlobalData.comparisons.trait = [];
    GlobalData.comparisons.manu = [];
    var copyProps = { Weight: 0, WeightRes: 0, WeightBW: 0 };

    for(var techIdx = techIndex.core; techIdx < techCount; ++techIdx)
    {
      var compareCount = 0;
      GlobalData.comparisons.tech[techIdx] = {};
      GlobalData.comparisons.tech[techIdx].corrIn = [];
      GlobalData.comparisons.tech[techIdx].ID = techIdx;
      GlobalData.comparisons.tech[techIdx].name = techNameLookup[techIdx];

      for(var botIdx = 0; botIdx < botCount; ++botIdx)
      {
        if(GlobalData.bots[botIdx].Tech == techIdx)
        {
          compareCount++;

          // Get sum of bot values.
          for(const property in GlobalData.regData[botIdx][botIdx])
          {
            if(property != "name" && property != "ID" && property != "correlationID")
            {
              if(!GlobalData.comparisons.tech[techIdx][property])
              {
                GlobalData.comparisons.tech[techIdx][property] = 0;
              }
              GlobalData.comparisons.tech[techIdx][property] += GlobalData.regData[botIdx][botIdx][property];
            }
          }

          // Get sum of bot corrIn
          for(var corrIdx = 0; corrIdx < 2 * (botCount + 2); ++corrIdx)
          {
            GlobalData.comparisons.tech[techIdx].corrIn[corrIdx] = {};
            for(const property in copyProps)
            {
              if(property != "name" && property != "ID" && property != "correlationID")
              {
                if(!GlobalData.comparisons.tech[techIdx].corrIn[corrIdx][property])
                {
                  GlobalData.comparisons.tech[techIdx].corrIn[corrIdx][property] = 0;
                }
                GlobalData.comparisons.tech[techIdx].corrIn[corrIdx][property] += GlobalData.regData[botIdx][corrIdx][property];
              }
            }
          }
        }
      }

      // Compute the averages.
      var countInv = 1.0 / compareCount;
      for(const property in GlobalData.comparisons.tech[techIdx])
      {
        if(property != "name" && property != "ID" && property != "corrIn" && property != "corrOutFriend" && property != "corrOutFoe")
        {
          GlobalData.comparisons.tech[techIdx][property] *= countInv;
        }
      }
      for(var corrIdx = 0; corrIdx < 2 * (botCount + 2); ++corrIdx)
      {
        for(const property in copyProps)
        {
          GlobalData.comparisons.tech[techIdx].corrIn[corrIdx][property] *= countInv;
        }
      }

      compareCount = 0;
      GlobalData.comparisons.tech[techIdx].corrOutFriend = [];
      GlobalData.comparisons.tech[techIdx].corrOutFoe = [];

      // Get sum of corrIn to other bots.
      for(var corrIdx = 0; corrIdx < botCount; ++corrIdx)
      {
        if(!GlobalData.comparisons.tech[techIdx].corrOutFriend[corrIdx])
        {
          GlobalData.comparisons.tech[techIdx].corrOutFriend[corrIdx] = {};
        }
        if(!GlobalData.comparisons.tech[techIdx].corrOutFoe[corrIdx])
        {
          GlobalData.comparisons.tech[techIdx].corrOutFoe[corrIdx] = {};
        }

        for(var botIdx = 0; botIdx < botCount; ++botIdx)
        {
          if(GlobalData.bots[botIdx].Tech == techIdx && (botIdx != corrIdx))
          {
            compareCount++;
            for(const property in copyProps)
            {
              if(property != "name" && property != "ID" && property != "correlationID")
              {
                if(!GlobalData.comparisons.tech[techIdx].corrOutFriend[corrIdx][property])
                {
                  GlobalData.comparisons.tech[techIdx].corrOutFriend[corrIdx][property] = 0;
                }
                GlobalData.comparisons.tech[techIdx].corrOutFriend[corrIdx][property] += GlobalData.regData[corrIdx][botIdx][property];

                if(!GlobalData.comparisons.tech[techIdx].corrOutFoe[corrIdx][property])
                {
                  GlobalData.comparisons.tech[techIdx].corrOutFoe[corrIdx][property] = 0;
                }
                GlobalData.comparisons.tech[techIdx].corrOutFoe[corrIdx][property] += GlobalData.regData[corrIdx][botIdx + botCount + 2][property];
              }
            }
          }
        }

        countInv = 1.0 / compareCount;
        for(const property in copyProps)
        {
          GlobalData.comparisons.tech[techIdx].corrOutFriend[corrIdx][property] *= countInv;
          GlobalData.comparisons.tech[techIdx].corrOutFoe[corrIdx][property] *= countInv;
        }
      }
    }

    for(var slotIdx = deckslotIndex.core1; slotIdx < deckslotCount; ++slotIdx)
    {
      GlobalData.comparisons.slot[slotIdx] = {};
      compare = GlobalData.comparisons.slot[slotIdx];
      compare.ID = slotIdx;
      compare.name = deckslotNameLookup[slotIdx];
      compare.corrIn = [];
      compare.corrOutFriend = [];
      compare.corrOutFoe = [];
      for(var corrIdx = 0; corrIdx < 2 * (botCount + 2); ++corrIdx)
      {
        compare.corrIn[corrIdx] = {};
      }
      for(var corrIdx = 0; corrIdx < botCount; ++corrIdx)
      {
        compare.corrOutFriend[corrIdx] = {};
        compare.corrOutFoe[corrIdx] = {};
      }

      var slotMultipier = (slotIdx == deckslotIndex.wildfoundry || slotIdx == deckslotIndex.wildstarforge) ? 0.5 : 1.0;
      for(var techIdx = techIndex.core; techIdx < techIndex.any; ++techIdx)
      {
        if(deckslotStartTechMap[slotIdx] <= techIdx && techIdx < deckslotEndTechMap[slotIdx])
        {
          var tech = GlobalData.comparisons.tech[techIdx];
          for(const property in tech)
          {
            if(property != "ID" && property != "name" &&
               property != "corrIn" && property != "corrInSelf" &&
               property != "corrOutFriend" && property != "corrOutFoe" && property != "corrOutSelf")
            {
              if(!compare[property])
              {
                compare[property] = 0.0;
              }
              compare[property] += tech[property] * slotMultipier;
            }
          }

          for(var corrIdx = 0; corrIdx < 2 * (botCount + 2); ++corrIdx)
          {
            for(const property in tech.corrIn[corrIdx])
            {
              if(!compare.corrIn[corrIdx][property])
              {
                compare.corrIn[corrIdx][property] = 0.0;
              }
              compare.corrIn[corrIdx][property] += tech.corrIn[corrIdx][property];
            }
          }

          for(var corrIdx = 0; corrIdx < botCount; ++corrIdx)
          {
            for(const property in tech.corrOutFriend[corrIdx])
            {
              if(!compare.corrOutFriend[corrIdx][property])
              {
                compare.corrOutFriend[corrIdx][property] = 0.0;
              }
              compare.corrOutFriend[corrIdx][property] += tech.corrOutFriend[corrIdx][property];
            }

            for(const property in tech.corrOutFoe[corrIdx])
            {
              if(!compare.corrOutFoe[corrIdx][property])
              {
                compare.corrOutFoe[corrIdx][property] = 0.0;
              }
              compare.corrOutFoe[corrIdx][property] += tech.corrOutFoe[corrIdx][property];
            }
          }
        }
      }
    }

    for(var slotIdx = deckslotIndex.core1; slotIdx < deckslotCount; ++slotIdx)
    {
      compare = GlobalData.comparisons.slot[slotIdx];
      compare.corrInSelfFriend = [];
      compare.corrInSelfFoe = [];
      compare.corrOutSelfFriend = [];
      compare.corrOutSelfFoe = [];

      for(var otherSlotIdx = deckslotIndex.core1; otherSlotIdx < deckslotCount; ++otherSlotIdx)
      {
        if(!compare.corrInSelfFriend[otherSlotIdx])
        {
          compare.corrInSelfFriend[otherSlotIdx] = {};
          compare.corrInSelfFoe[otherSlotIdx] = {};
          compare.corrOutSelfFriend[otherSlotIdx] = {};
          compare.corrOutSelfFoe[otherSlotIdx] = {};
        }

        var other = GlobalData.comparisons.slot[otherSlotIdx];
        var compareCount = 0;
        for(var corrIdx = 0; corrIdx < botCount; ++ corrIdx)
        {
          var tech = GlobalData.bots[corrIdx].Tech;
          if(deckslotStartTechMap[otherSlotIdx] <= tech && tech < deckslotEndTechMap[otherSlotIdx])
          {
            compareCount++;
            for(const property in other.corrOutFriend[corrIdx])
            {
              if(!compare.corrInSelfFriend[otherSlotIdx][property])
              {
                compare.corrInSelfFriend[otherSlotIdx][property] = 0.0;
              }
              if(!compare.corrInSelfFoe[otherSlotIdx][property])
              {
                compare.corrInSelfFoe[otherSlotIdx][property] = 0.0;
              }
              if(!compare.corrOutSelfFriend[otherSlotIdx][property])
              {
                compare.corrOutSelfFriend[otherSlotIdx][property] = 0.0;
              }
              if(!compare.corrOutSelfFoe[otherSlotIdx][property])
              {
                compare.corrOutSelfFoe[otherSlotIdx][property] = 0.0;
              }
              compare.corrInSelfFriend[otherSlotIdx][property]  += other.corrOutFoe[corrIdx][property];
              compare.corrInSelfFoe[otherSlotIdx][property]     += other.corrOutFriend[corrIdx][property];
              compare.corrOutSelfFriend[otherSlotIdx][property] += other.corrIn[corrIdx][property];
              compare.corrOutSelfFoe[otherSlotIdx][property]    += other.corrIn[corrIdx + (botCount + 2)][property];
            }
          }
        }

        for(const property in compare.corrInSelfFriend[otherSlotIdx])
        {
          compare.corrInSelfFriend[otherSlotIdx][property] /= compareCount;
          compare.corrInSelfFoe[otherSlotIdx][property] /= compareCount;
          compare.corrOutSelfFriend[otherSlotIdx][property] /= compareCount;
          compare.corrOutSelfFoe[otherSlotIdx][property] /= compareCount;
        }
      }
    }

    for(var traitIdx = traitIndex.ground; traitIdx < traitCount; ++traitIdx)
    {
      var compareCount = 0;
      GlobalData.comparisons.trait[traitIdx] = {};
      GlobalData.comparisons.trait[traitIdx].corrIn = [];
      GlobalData.comparisons.trait[traitIdx].ID = traitIdx;
      GlobalData.comparisons.trait[traitIdx].name = traitNameLookup[traitIdx];

      for(var botIdx = 0; botIdx < botCount; ++botIdx)
      {
        if(GlobalData.bots[botIdx][internalTraitNameLookup[traitIdx]])
        {
          compareCount++;

          // Get sum of bot values.
          for(const property in GlobalData.regData[botIdx][botIdx])
          {
            if(property != "name" && property != "ID" && property != "correlationID")
            {
              if(!GlobalData.comparisons.trait[traitIdx][property])
              {
                GlobalData.comparisons.trait[traitIdx][property] = 0;
              }
              GlobalData.comparisons.trait[traitIdx][property] += GlobalData.regData[botIdx][botIdx][property];
            }
          }

          // Get sum of bot corrIn
          for(var corrIdx = 0; corrIdx < 2 * (botCount + 2); ++corrIdx)
          {
            GlobalData.comparisons.trait[traitIdx].corrIn[corrIdx] = {};
            for(const property in copyProps)
            {
              if(property != "name" && property != "ID" && property != "correlationID")
              {
                if(!GlobalData.comparisons.trait[traitIdx].corrIn[corrIdx][property])
                {
                  GlobalData.comparisons.trait[traitIdx].corrIn[corrIdx][property] = 0;
                }
                GlobalData.comparisons.trait[traitIdx].corrIn[corrIdx][property] += GlobalData.regData[botIdx][corrIdx][property];
              }
            }
          }
        }
      }

      // Compute the averages.
      var countInv = 1.0 / compareCount;
      for(const property in GlobalData.comparisons.trait[traitIdx])
      {
        if(property != "name" && property != "ID" && property != "corrIn" && property != "corrOutFriend" && property != "corrOutFoe")
        {
          GlobalData.comparisons.trait[traitIdx][property] *= countInv;
        }
      }
      for(var corrIdx = 0; corrIdx < 2 * (botCount + 2); ++corrIdx)
      {
        for(const property in copyProps)
        {
          GlobalData.comparisons.trait[traitIdx].corrIn[corrIdx][property] *= countInv;
        }
      }

      compareCount = 0;
      GlobalData.comparisons.trait[traitIdx].corrOutFriend = [];
      GlobalData.comparisons.trait[traitIdx].corrOutFoe = [];

      // Get sum of corrIn to other bots.
      for(var corrIdx = 0; corrIdx < botCount; ++corrIdx)
      {
        if(!GlobalData.comparisons.trait[traitIdx].corrOutFriend[corrIdx])
        {
          GlobalData.comparisons.trait[traitIdx].corrOutFriend[corrIdx] = {};
        }
        if(!GlobalData.comparisons.trait[traitIdx].corrOutFoe[corrIdx])
        {
          GlobalData.comparisons.trait[traitIdx].corrOutFoe[corrIdx] = {};
        }

        for(var botIdx = 0; botIdx < botCount; ++botIdx)
        {
          if(GlobalData.bots[botIdx][internalTraitNameLookup[traitIdx]] && (botIdx != corrIdx))
          {
            compareCount++;
            for(const property in copyProps)
            {
              if(property != "name" && property != "ID" && property != "correlationID")
              {
                if(!GlobalData.comparisons.trait[traitIdx].corrOutFriend[corrIdx][property])
                {
                  GlobalData.comparisons.trait[traitIdx].corrOutFriend[corrIdx][property] = 0;
                }
                GlobalData.comparisons.trait[traitIdx].corrOutFriend[corrIdx][property] += GlobalData.regData[corrIdx][botIdx][property];

                if(!GlobalData.comparisons.trait[traitIdx].corrOutFoe[corrIdx][property])
                {
                  GlobalData.comparisons.trait[traitIdx].corrOutFoe[corrIdx][property] = 0;
                }
                GlobalData.comparisons.trait[traitIdx].corrOutFoe[corrIdx][property] += GlobalData.regData[corrIdx][botIdx + botCount + 2][property];
              }
            }
          }
        }

        countInv = 1.0 / compareCount;
        for(const property in copyProps)
        {
          GlobalData.comparisons.trait[traitIdx].corrOutFriend[corrIdx][property] *= countInv;
          GlobalData.comparisons.trait[traitIdx].corrOutFoe[corrIdx][property] *= countInv;
        }
      }
    }

    for(var manuIdx = manuIndex.northperformance; manuIdx < manuCount; ++manuIdx)
    {
      var compareCount = 0;
      GlobalData.comparisons.manu[manuIdx] = {};
      GlobalData.comparisons.manu[manuIdx].corrIn = [];
      GlobalData.comparisons.manu[manuIdx].ID = manuIdx;
      GlobalData.comparisons.manu[manuIdx].name = manuNameLookup[manuIdx];

      for(var botIdx = 0; botIdx < botCount; ++botIdx)
      {
        if(GlobalData.bots[botIdx].Manu == manuIdx)
        {
          compareCount++;

          // Get sum of bot values.
          for(const property in GlobalData.regData[botIdx][botIdx])
          {
            if(property != "name" && property != "ID" && property != "correlationID")
            {
              if(!GlobalData.comparisons.manu[manuIdx][property])
              {
                GlobalData.comparisons.manu[manuIdx][property] = 0;
              }
              GlobalData.comparisons.manu[manuIdx][property] += GlobalData.regData[botIdx][botIdx][property];
            }
          }

          // Get sum of bot corrIn
          for(var corrIdx = 0; corrIdx < 2 * (botCount + 2); ++corrIdx)
          {
            GlobalData.comparisons.manu[manuIdx].corrIn[corrIdx] = {};
            for(const property in copyProps)
            {
              if(property != "name" && property != "ID" && property != "correlationID")
              {
                if(!GlobalData.comparisons.manu[manuIdx].corrIn[corrIdx][property])
                {
                  GlobalData.comparisons.manu[manuIdx].corrIn[corrIdx][property] = 0;
                }
                GlobalData.comparisons.manu[manuIdx].corrIn[corrIdx][property] += GlobalData.regData[botIdx][corrIdx][property];
              }
            }
          }
        }
      }

      // Compute the averages.
      var countInv = 1.0 / compareCount;
      for(const property in GlobalData.comparisons.manu[manuIdx])
      {
        if(property != "name" && property != "ID" && property != "corrIn" && property != "corrOutFriend" && property != "corrOutFoe")
        {
          GlobalData.comparisons.manu[manuIdx][property] *= countInv;
        }
      }
      for(var corrIdx = 0; corrIdx < 2 * (botCount + 2); ++corrIdx)
      {
        for(const property in copyProps)
        {
          GlobalData.comparisons.manu[manuIdx].corrIn[corrIdx][property] *= countInv;
        }
      }

      compareCount = 0;
      GlobalData.comparisons.manu[manuIdx].corrOutFriend = [];
      GlobalData.comparisons.manu[manuIdx].corrOutFoe = [];

      // Get sum of corrIn to other bots.
      for(var corrIdx = 0; corrIdx < botCount; ++corrIdx)
      {
        if(!GlobalData.comparisons.manu[manuIdx].corrOutFriend[corrIdx])
        {
          GlobalData.comparisons.manu[manuIdx].corrOutFriend[corrIdx] = {};
        }
        if(!GlobalData.comparisons.manu[manuIdx].corrOutFoe[corrIdx])
        {
          GlobalData.comparisons.manu[manuIdx].corrOutFoe[corrIdx] = {};
        }

        for(var botIdx = 0; botIdx < botCount; ++botIdx)
        {
          if(GlobalData.bots[botIdx].Manu == manuIdx && (botIdx != corrIdx))
          {
            compareCount++;
            for(const property in copyProps)
            {
              if(property != "name" && property != "ID" && property != "correlationID")
              {
                if(!GlobalData.comparisons.manu[manuIdx].corrOutFriend[corrIdx][property])
                {
                  GlobalData.comparisons.manu[manuIdx].corrOutFriend[corrIdx][property] = 0;
                }
                GlobalData.comparisons.manu[manuIdx].corrOutFriend[corrIdx][property] += GlobalData.regData[corrIdx][botIdx][property];

                if(!GlobalData.comparisons.manu[manuIdx].corrOutFoe[corrIdx][property])
                {
                  GlobalData.comparisons.manu[manuIdx].corrOutFoe[corrIdx][property] = 0;
                }
                GlobalData.comparisons.manu[manuIdx].corrOutFoe[corrIdx][property] += GlobalData.regData[corrIdx][botIdx + botCount + 2][property];
              }
            }
          }
        }

        countInv = 1.0 / compareCount;
        for(const property in copyProps)
        {
          GlobalData.comparisons.manu[manuIdx].corrOutFriend[corrIdx][property] *= countInv;
          GlobalData.comparisons.manu[manuIdx].corrOutFoe[corrIdx][property] *= countInv;
        }
      }
    }

    console.log(GlobalData);
    loaded.regression = true;
    if(loaded.count && loaded.results && loaded.regression)
    {
      drawBuilder(); // deck.js
      drawRegression(); // regression.js
      computeCompareStats();
      drawStats(); // stats.js
      drawCorrelation(); // correlation.js
      drawResults(resultSelection); // results.js
    }
  }).catch((error) => {
    console.log(error);
    regressionGraph.selectAll('*').remove();
    regressionTable.selectAll('*').remove();
    regressionGraph.append('g').append('text').attr('class', 'svg_text')
      .attr('x', width / 3.5)
      .attr('y', height / 2.0)
      .text('No regression was possible for the selected combination of filters.');
  });

  Promise.all([
    d3.csv(pathRoot + 'resultidx' + path + '.csv'),
  ]).then(([idxData]) => {
    GlobalData.resultIdx = [];
    idxData.forEach(function(d, i) {
      GlobalData.resultIdx[i] = {};
      GlobalData.resultIdx[i].idx = +d.Index;
    });

    loaded.results = true;
    if(loaded.count && loaded.results && loaded.regression)
    {
      drawBuilder(); // deck.js
      drawRegression(); // regression.js
      computeCompareStats();
      drawStats(); // stats.js
      drawCorrelation(); // correlation.js
      drawResults(resultSelection); // results.js
    }
  }).catch((error) => {
    console.log(error);
    resultGraph.selectAll('*').remove();
    resultGraph.append('g').append('text').attr('class', 'svg_text')
      .attr('x', width / 3.5)
      .attr('y', height / 2.0)
      .text('No regression was possible for the selected combination of filters.');
  });
}

function loadLadder()
{
  loaded.ladder = false;

  Promise.all([
    d3.csv(pathRoot + 'ladder_all.csv'),
  ]).then(([ladData]) => {
    GlobalData.ladderData = [];
    GlobalData.ladderTotals = [];
    GlobalData.ladderSize = 0;
    for(var league = 0; league < leagueCutoff.length - 1; ++league)
    {
      GlobalData.ladderData[league] = [];
      ladData.forEach(function(d, i) {
        if((leagueCutoff[league] <= d.Rank) && (d.Rank < leagueCutoff[league+1]))
        {
          var newPlayer = {};
          newPlayer.id = d.ID;
          newPlayer.rank = +d.Rank;
          newPlayer.mmr = +d.MMR;
          newPlayer.winPct = +d.WinRate;
          newPlayer.expRank = +d.ExpectedRank;
          newPlayer.skill = +d.Skill;
          newPlayer.core1 = d.Core1;
          newPlayer.core2 = d.Core2;
          newPlayer.fd = d.Foundry;
          newPlayer.afd = d.AdvFoundry;
          newPlayer.ffd = d.FlexFoundry;
          newPlayer.sf = d.Starforge;
          newPlayer.asf = d.AdvStarforge;
          newPlayer.fsf = d.FlexStarforge;
          GlobalData.ladderData[league][GlobalData.ladderData[league].length] = newPlayer;
        }
      });

      for(var unitIdx = 0; unitIdx < botCount; ++unitIdx)
      {
        GlobalData.ladderTotals[unitIdx] = [];
        GlobalData.ladderData.forEach(function(d, i) {
          GlobalData.ladderTotals[unitIdx][i] = [];
          GlobalData.ladderTotals[unitIdx][i].rate = 0.0;
          GlobalData.ladderTotals[unitIdx][i].id = unitIdx;
          d.forEach(function(d, j) {
            GlobalData.ladderTotals[unitIdx][i].rate += (d.core1 == unitIdx ? 1 : 0);
            GlobalData.ladderTotals[unitIdx][i].rate += (d.core2 == unitIdx ? 1 : 0);
            GlobalData.ladderTotals[unitIdx][i].rate += (d.fd == unitIdx ? 1 : 0);
            GlobalData.ladderTotals[unitIdx][i].rate += (d.afd == unitIdx ? 1 : 0);
            GlobalData.ladderTotals[unitIdx][i].rate += (d.ffd == unitIdx ? 1 : 0);
            GlobalData.ladderTotals[unitIdx][i].rate += (d.sf == unitIdx ? 1 : 0);
            GlobalData.ladderTotals[unitIdx][i].rate += (d.asf == unitIdx ? 1 : 0);
            GlobalData.ladderTotals[unitIdx][i].rate += (d.fsf == unitIdx ? 1 : 0);
          });
          if(GlobalData.ladderData[i].length != 0)
          {
            GlobalData.ladderTotals[unitIdx][i].rate /= GlobalData.ladderData[i].length;
          }
        });
      }

      GlobalData.ladderSize += GlobalData.ladderData[league].length;
    }

    loaded.ladder = true;
    drawLadder();
  }).catch((error) => {
    console.log(error);
  });
}

function loadReports(reportIdx)
{
  loaded.report = false;

  Promise.all([
    d3.csv(pathRoot + 'repsum_' + reportIdx + '.csv'),
  ]).then(([repsumData]) => {
    GlobalData.reportSummary = {};
    repsumData.forEach(function(d, i) {
      GlobalData.reportSummary.width = +d.Width;
      GlobalData.reportSummary.height = +d.Height;
      GlobalData.reportSummary.spaceStep = +d.SpaceStep;
      GlobalData.reportSummary.duration = +d.Duration;
      GlobalData.reportSummary.timeStep = +d.TimeStep;
      GlobalData.reportSummary.unitCount = +d.UnitCount;
    });

    Promise.all([
      d3.csv(pathRoot + 'report_' + reportIdx + '.csv'),
    ]).then(([reportData]) => {
      GlobalData.reportData = [];
      var snapIdx = 0;
      reportData.forEach(function(d, i) {
        var unitIdx = i % GlobalData.reportSummary.unitCount
        if(unitIdx == 0)
        {
          GlobalData.reportData[snapIdx] = [];
          snapIdx++;
        }
        GlobalData.reportData[snapIdx-1][unitIdx] = {}
        GlobalData.reportData[snapIdx-1][unitIdx].id = +d.ID;
        GlobalData.reportData[snapIdx-1][unitIdx].teamIdx = +d.TeamIdx;
        GlobalData.reportData[snapIdx-1][unitIdx].botIdx = +d.BotIdx;
        GlobalData.reportData[snapIdx-1][unitIdx].posX = +d.PosX * GlobalData.reportSummary.spaceStep;
        GlobalData.reportData[snapIdx-1][unitIdx].posY = +d.PosY * GlobalData.reportSummary.spaceStep;
        GlobalData.reportData[snapIdx-1][unitIdx].action = d.Action;
        GlobalData.reportData[snapIdx-1][unitIdx].actX = +d.ActX * GlobalData.reportSummary.spaceStep;
        GlobalData.reportData[snapIdx-1][unitIdx].actY = +d.ActY * GlobalData.reportSummary.spaceStep;
      });

      Promise.all([
        d3.csv(pathRoot + 'repscr_' + reportIdx + '.csv'),
      ]).then(([repscrData]) => {
        repscrData.forEach(function(d, i) {
          GlobalData.reportData[i].net = +d.Net;
          GlobalData.reportData[i].p1Score = +d.P1Score;
          GlobalData.reportData[i].p2Score = +d.P2Score;
          GlobalData.reportData[i].p1BotScores = [];
          GlobalData.reportData[i].p2BotScores = [];
          for(var j = 0; j < botCount; ++j)
          {
            GlobalData.reportData[i].p1BotScores[j] = +d["P1"+botNameLookup[j]+"Score"];
            GlobalData.reportData[i].p2BotScores[j] = +d["P2"+botNameLookup[j]+"Score"];
          }
        });

        loaded.report = true;
        drawReport();
      }).catch((error) => {
        console.log(error);
      });
    }).catch((error) => {
      console.log(error);
    });
  }).catch((error) => {
    console.log(error);
  });
}
