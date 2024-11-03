//
// Manage loading for all model data.
// Baseline data are bulk loaded on page load/refresh.
// Specific data are loaded through calls from other modules.
//

const loaded = {
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
  loadBasicCounts();
  loadBasicRegression();
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
    loadSpecificData(); // Attempt to load specifics.
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
      var botidx = 0;
      GlobalData.resultDataBase[i] = {};
      GlobalData.resultDataBase[i].idx = +d.Index;
      GlobalData.resultDataBase[i].res = +d.Result;
      GlobalData.resultDataBase[i].vars = [];
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Crab;
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Hunter;
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Recall;
      GlobalData.resultDataBase[i].vars[botidx++] = +d["Recall Hunter"];
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Scorpion;
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Beetle;
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Blink;
      GlobalData.resultDataBase[i].vars[botidx++] = +d["Blink Hunter"];
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Gunbot;
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Missilebot;
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Wasp;
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Hornet;
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Knight;
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Crossbow;
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Ballista;
      GlobalData.resultDataBase[i].vars[botidx++] = +d["King Crab"];
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Crusader;
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Bomber;
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Shocker;
      GlobalData.resultDataBase[i].vars[botidx++] = +d["Recall Shocker"];
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Mortar;
      GlobalData.resultDataBase[i].vars[botidx++] = +d["Swift Shocker"];
      GlobalData.resultDataBase[i].vars[botidx++] = +d["Heavy Hunter"];
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Destroyer;
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Raider;
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Turret;
      GlobalData.resultDataBase[i].vars[botidx++] = +d["Heavy Ballista"];
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Predator;
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Sniper;
      GlobalData.resultDataBase[i].vars[botidx++] = +d["Advanced Blink"];
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Assaultbot;
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Behemoth;
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Gargantua;
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Butterfly;
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Dragonfly;
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Falcon;
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Airship;
      GlobalData.resultDataBase[i].vars[botidx++] = +d["Advanced Recall"];
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Mammoth;
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Stinger;
      GlobalData.resultDataBase[i].vars[botidx++] = +d["Flak Turret"];
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Bulwark;
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Katbus;
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Locust;
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Kraken;
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Valkyrie;
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Artillery;
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Advancedbot;
      GlobalData.resultDataBase[i].vars[botidx++] = +d["Advanced Destroyer"];
      GlobalData.resultDataBase[i].vars[botidx++] = +d.Skill;
    });

    loaded.basicResult = true;
    loadSpecificData(); // Attempt to load specifics.
  }).catch((error) => {
    console.log(error);
  });
}

function loadBasicRegression()
{
  Promise.all([
    d3.csv(pathRoot + 'linreg_all.csv'),
  ]).then(([regDataBase]) => {
    GlobalData.regDataBase = [];
    GlobalData.interceptBase = regDataBase[0].NormalizedMarginalValue;
    regDataBase.forEach(function(d, i) {
      if(i != 0)
      {
        GlobalData.regDataBase[i-1] = {};
        GlobalData.regDataBase[i-1].name = d.Name;
        GlobalData.regDataBase[i-1].value = +d.MarginalValue;
        GlobalData.regDataBase[i-1].normValue = parseInt(+d.NormalizedMarginalValue * 100);
        GlobalData.regDataBase[i-1].pctAdv = parseInt(+d.AdvantagedIterations);
        GlobalData.regDataBase[i-1].winAdv = parseInt(+d.AdvantagedWins);
        GlobalData.regDataBase[i-1].pctDis = parseInt(+d.DisadvantagedIterations);
        GlobalData.regDataBase[i-1].winDis = parseInt(+d.DisadvantagedWins);
        GlobalData.regDataBase[i-1].pctNtrl = parseInt(+d.NeutralIterations);
        GlobalData.regDataBase[i-1].winNtrl = parseInt(+d.NeutralWins);
        GlobalData.regDataBase[i-1].pickPct = 100 - parseInt(+d.NeutralIterations);
      }
    });

    loaded.basicRegression = true;
    loadSpecificData(); // Attempt to load specifics.
  }).catch((error) => {
    console.log(error);
  });
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
      drawRegression(); // regression.js
      drawResults(resultSelection); // results.js
    }
  }).catch((error) => {
    console.log(error);
  });

  Promise.all([
    d3.csv(pathRoot + 'linreg' + path + '.csv'),
  ]).then(([regData]) => {
    GlobalData.regData = [];
    GlobalData.intercept = regData[0].NormalizedMarginalValue;
    GlobalData.varCount = 2;
    var idx = 0
    regData.forEach(function(d, i) {
      if((i != 0) && ((i-1) % GlobalData.varCount == 0))
      {
        GlobalData.regData[idx] = {};
        GlobalData.regData[idx].name = d.Name;
        GlobalData.regData[idx].MarginalValue = +d.MarginalValue;
        GlobalData.regData[idx].NormalizedMarginalValue = parseInt(+d.NormalizedMarginalValue * 100);
        GlobalData.regData[idx].AdvantagedIterations = parseInt(+d.AdvantagedIterations);
        GlobalData.regData[idx].AdvantagedWins = parseInt(+d.AdvantagedWins);
        GlobalData.regData[idx].DisadvantagedIterations = parseInt(+d.DisadvantagedIterations);
        GlobalData.regData[idx].DisadvantagedWins = parseInt(+d.DisadvantagedWins);
        GlobalData.regData[idx].NeutralIterations = parseInt(+d.NeutralIterations);
        GlobalData.regData[idx].NeutralWins = parseInt(+d.NeutralWins);
        GlobalData.regData[idx].NeutralIterations = 100 - parseInt(+d.NeutralIterations);
        GlobalData.regData[idx].MarginalValueDiff = +d.MarginalValue - GlobalData.regDataBase[i-1].value;
        GlobalData.regData[idx].NormalizedMarginalValueDiff = parseInt(+d.NormalizedMarginalValue * 100) - GlobalData.regDataBase[i-1].normValue;
        GlobalData.regData[idx].AdvantagedIterationsDiff = parseInt(+d.AdvantagedIterations) - GlobalData.regDataBase[i-1].pctAdv;
        GlobalData.regData[idx].AdvantagedWinsDiff = parseInt(+d.AdvantagedWins) - GlobalData.regDataBase[i-1].winAdv;
        GlobalData.regData[idx].DisadvantagedIterationsDiff = parseInt(+d.DisadvantagedIterations) - GlobalData.regDataBase[i-1].pctDis;
        GlobalData.regData[idx].DisadvantagedWinsDiff = parseInt(+d.DisadvantagedWins) - GlobalData.regDataBase[i-1].winDis;
        GlobalData.regData[idx].NeutralIterationsDiff = parseInt(+d.NeutralIterations) - GlobalData.regDataBase[i-1].pctNtrl;
        GlobalData.regData[idx].NeutralWinsDiff = parseInt(+d.NeutralWins) - GlobalData.regDataBase[i-1].winNtrl;
        GlobalData.regData[idx].PickPct = 100 - parseInt(+d.NeutralIterations);
        GlobalData.regData[idx].PickPctDiff = 100 - parseInt(+d.NeutralIterations) - GlobalData.regDataBase[i-1].pickPct;
        idx++;
      }
    });

    loaded.regression = true;
    if(loaded.count && loaded.results && loaded.regression)
    {
      drawRegression(); // regression.js
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
      drawRegression(); // regression.js
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

      for(var unitIdx = 0; unitIdx < botNameLookup.length; ++unitIdx)
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
          GlobalData.ladderTotals[unitIdx][i].rate /= GlobalData.ladderData[i].length;
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
    GlobalData.reportSummary = [];
    repsumData.forEach(function(d, i) {
      GlobalData.reportSummary[i] = {};
      GlobalData.reportSummary[i].width = +d.Width;
      GlobalData.reportSummary[i].height = +d.Height;
      GlobalData.reportSummary[i].duration = +d.Duration;
      GlobalData.reportSummary[i].timeStep = +d.TimeStep;
      GlobalData.reportSummary[i].unitCount = +d.UnitCount;
    });

    Promise.all([
      d3.csv(pathRoot + 'report_' + reportIdx + '.csv'),
    ]).then(([reportData]) => {
      GlobalData.reportData = [];
      var snapIdx = 0;
      reportData.forEach(function(d, i) {
        var unitIdx = i % GlobalData.reportSummary[0].unitCount
        if(unitIdx == 0)
        {
          GlobalData.reportData[snapIdx] = [];
          snapIdx++;
        }
        GlobalData.reportData[snapIdx-1][unitIdx] = {}
        GlobalData.reportData[snapIdx-1][unitIdx].id = +d.ID;
        GlobalData.reportData[snapIdx-1][unitIdx].teamIdx = +d.TeamIdx;
        GlobalData.reportData[snapIdx-1][unitIdx].botIdx = +d.BotIdx;
        GlobalData.reportData[snapIdx-1][unitIdx].posX = +d.PosX;
        GlobalData.reportData[snapIdx-1][unitIdx].posY = +d.PosY;
        GlobalData.reportData[snapIdx-1][unitIdx].action = d.Action;
        GlobalData.reportData[snapIdx-1][unitIdx].actX = +d.ActX;
        GlobalData.reportData[snapIdx-1][unitIdx].actY = +d.ActY;
      });

      Promise.all([
        d3.csv(pathRoot + 'repscr_' + reportIdx + '.csv'),
      ]).then(([repscrData]) => {
        repscrData.forEach(function(d, i) {
          GlobalData.reportData[i].net = +d.Net;
          GlobalData.reportData[i].p1Score = +d.P1Score;
          GlobalData.reportData[i].p2Score = +d.P2Score;
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
