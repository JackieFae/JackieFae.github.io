// In this section, the user is able to select a bot and view the breakdown of that bots weight
// presented in the regressions graphics in more detail, broken down by each stat. The stats are
// shown in terms of relative contribution to total weight using a pie chart and in comparison to
// a selected average bot representation using a wireframe chart. Influential values are
// highlighted for comparison in a table between the two and all stats raw values are listed in a
// table below the others.

//
// Variables
//

// Global constants
const cPieRadius = 120;
const cWireMinRadius = 25;
const cWireNormLowRadius = 50;
const cWireNormRadius = 75;
const cWireNormHighRadius = 100;
const cWireMaxRadius = 125;
const cWireOverRadius = 125;
const cWireIconRadius = 110;
const cStatsGraphCutoff = 0.99;
const smallArc = d3.arc()
  .innerRadius(0)
  .outerRadius(cPieRadius);
const largeArc = d3.arc()
  .innerRadius(0)
  .outerRadius(1.1*cPieRadius);
const pie = d3.pie()
  .value(function(d) { return d.absWtPct; })

// Color scale
var colour = ["#a6a6a6", "#ff7b00", "#2191ec", "#000000"]; // TODO: Make this reflect user's global colour selection.

// Stats for selected bot.
var cropStatData = {};
var unsortStatData = {};
var compareTotals = {};

// User selection values.
var statBotSelected = 0; // Crab
var statCompareSelect = 0;
var statHighlight = 2;
var statPieHighlight = -1;
var piePaths = [];
var pieIcons = [];
var wireLinesA = [];
var wireLinesB = [];
var wireIcons = [];

//
// User Interface Elements
//
// Select bot to display.
// Add event listener to the select box
var statSelectButton = d3.select('#statBotButton');
d3.select('#statBotCrab').on('click', () => selectStatBot(d3.select("#statBotCrab").attr('value')));
d3.select('#statBotHunter').on('click', () => selectStatBot(d3.select("#statBotHunter").attr('value')));
d3.select('#statBotGuardianShield').on('click', () => selectStatBot(d3.select("#statBotGuardianShield").attr('value')));
d3.select('#statBotRecall').on('click', () => selectStatBot(d3.select("#statBotRecall").attr('value')));
d3.select('#statBotRecallHunter').on('click', () => selectStatBot(d3.select("#statBotRecallHunter").attr('value')));
d3.select('#statBotScorpion').on('click', () => selectStatBot(d3.select("#statBotScorpion").attr('value')));
d3.select('#statBotBeetle').on('click', () => selectStatBot(d3.select("#statBotBeetle").attr('value')));
d3.select('#statBotBlink').on('click', () => selectStatBot(d3.select("#statBotBlink").attr('value')));
d3.select('#statBotBlinkHunter').on('click', () => selectStatBot(d3.select("#statBotBlinkHunter").attr('value')));
d3.select('#statBotGunbot').on('click', () => selectStatBot(d3.select("#statBotGunbot").attr('value')));
d3.select('#statBotMissilebot').on('click', () => selectStatBot(d3.select("#statBotMissilebot").attr('value')));
d3.select('#statBotWasp').on('click', () => selectStatBot(d3.select("#statBotWasp").attr('value')));
d3.select('#statBotHornet').on('click', () => selectStatBot(d3.select("#statBotHornet").attr('value')));
d3.select('#statBotKnight').on('click', () => selectStatBot(d3.select("#statBotKnight").attr('value')));
d3.select('#statBotCrossbow').on('click', () => selectStatBot(d3.select("#statBotCrossbow").attr('value')));
d3.select('#statBotBallista').on('click', () => selectStatBot(d3.select("#statBotBallista").attr('value')));
d3.select('#statBotKingCrab').on('click', () => selectStatBot(d3.select("#statBotKingCrab").attr('value')));
d3.select('#statBotCrusader').on('click', () => selectStatBot(d3.select("#statBotCrusader").attr('value')));
d3.select('#statBotBomber').on('click', () => selectStatBot(d3.select("#statBotBomber").attr('value')));
d3.select('#statBotShocker').on('click', () => selectStatBot(d3.select("#statBotShocker").attr('value')));
d3.select('#statBotRecallShocker').on('click', () => selectStatBot(d3.select("#statBotRecallShocker").attr('value')));
d3.select('#statBotMortar').on('click', () => selectStatBot(d3.select("#statBotMortar").attr('value')));
d3.select('#statBotSwiftShocker').on('click', () => selectStatBot(d3.select("#statBotSwiftShocker").attr('value')));
d3.select('#statBotHeavyHunter').on('click', () => selectStatBot(d3.select("#statBotHeavyHunter").attr('value')));
d3.select('#statBotDestroyer').on('click', () => selectStatBot(d3.select("#statBotDestroyer").attr('value')));
d3.select('#statBotRaider').on('click', () => selectStatBot(d3.select("#statBotRaider").attr('value')));
d3.select('#statBotTurret').on('click', () => selectStatBot(d3.select("#statBotTurret").attr('value')));
d3.select('#statBotHeavyBallista').on('click', () => selectStatBot(d3.select("#statBotHeavyBallista").attr('value')));
d3.select('#statBotGargantua').on('click', () => selectStatBot(d3.select("#statBotGargantua").attr('value')));
d3.select('#statBotSniper').on('click', () => selectStatBot(d3.select("#statBotSniper").attr('value')));
d3.select('#statBotAdvancedBlink').on('click', () => selectStatBot(d3.select("#statBotAdvancedBlink").attr('value')));
d3.select('#statBotAssaultbot').on('click', () => selectStatBot(d3.select("#statBotAssaultbot").attr('value')));
d3.select('#statBotAdvancedbot').on('click', () => selectStatBot(d3.select("#statBotAdvancedbot").attr('value')));
d3.select('#statBotBehemoth').on('click', () => selectStatBot(d3.select("#statBotBehemoth").attr('value')));
d3.select('#statBotAdvancedMortar').on('click', () => selectStatBot(d3.select("#statBotAdvancedMortar").attr('value')));
d3.select('#statBotBlaster').on('click', () => selectStatBot(d3.select("#statBotBlaster").attr('value')));
d3.select('#statBotButterfly').on('click', () => selectStatBot(d3.select("#statBotButterfly").attr('value')));
d3.select('#statBotDragonfly').on('click', () => selectStatBot(d3.select("#statBotDragonfly").attr('value')));
d3.select('#statBotFalcon').on('click', () => selectStatBot(d3.select("#statBotFalcon").attr('value')));
d3.select('#statBotAirship').on('click', () => selectStatBot(d3.select("#statBotAirship").attr('value')));
d3.select('#statBotAdvancedRecall').on('click', () => selectStatBot(d3.select("#statBotAdvancedRecall").attr('value')));
d3.select('#statBotMammoth').on('click', () => selectStatBot(d3.select("#statBotMammoth").attr('value')));
d3.select('#statBotStinger').on('click', () => selectStatBot(d3.select("#statBotStinger").attr('value')));
d3.select('#statBotFlakTurret').on('click', () => selectStatBot(d3.select("#statBotFlakTurret").attr('value')));
d3.select('#statBotBulwark').on('click', () => selectStatBot(d3.select("#statBotBulwark").attr('value')));
d3.select('#statBotKatbus').on('click', () => selectStatBot(d3.select("#statBotKatbus").attr('value')));
d3.select('#statBotLocust').on('click', () => selectStatBot(d3.select("#statBotLocust").attr('value')));
d3.select('#statBotKraken').on('click', () => selectStatBot(d3.select("#statBotKraken").attr('value')));
d3.select('#statBotPredator').on('click', () => selectStatBot(d3.select("#statBotPredator").attr('value')));
d3.select('#statBotValkyrie').on('click', () => selectStatBot(d3.select("#statBotValkyrie").attr('value')));
d3.select('#statBotArtillery').on('click', () => selectStatBot(d3.select("#statBotArtillery").attr('value')));
d3.select('#statBotAdvancedDestroyer').on('click', () => selectStatBot(d3.select("#statBotAdvancedDestroyer").attr('value')));
d3.select('#statBotShade').on('click', () => selectStatBot(d3.select("#statBotShade").attr('value')));

function selectStatBot(value)
{
  statSelectButton.select('img').attr('src', botImageLookup[value]);
  statSelectButton.select('span').text(botNameLookup[value]);
  statBotSelected = value;
  drawStats();
}

// TODO: Comparison select dropdown.
d3.select("#selectCompareSlug").on("change", function() {
  computeCompareStats();
  drawStats();
});

//
// HTML Linkages
//
const statsDisplay = d3.select('#viz-stats').append('div')
  .style('width', `${width}`)
  .style('height', '650');

const statsGraphs = statsDisplay.append('div').attr('class', 'overflow-auto')
  .style('width', '100%')
  .style('height', '400px');

const statsColumns = statsGraphs.append('div').attr('class', 'row row-cols-3')
//.attr("transform", `translate(${margin.left},${margin.top})`)
  .style('width', '99%')
  .style('height', '400px');

const statsPieChart = statsColumns.append('div').attr('class', 'col')
  .style('width', '350px')
  .append('svg')
    .style('width', '350px')
    .style('height', '350px');

const statsHighlightColumn = statsColumns.append('div').attr('class', 'col')
  .style('width', '225px')
  .style('height', '350px');
const statsHighlightImages = statsHighlightColumn.append('div').append('svg')
  .style('width', '225px')
  .style('height', '160px');
const statsHighlightTable = statsHighlightColumn.append('div')
  .append('table')
    .style('width', '100%');

const statsWireframeChart = statsColumns.append('div').attr('class', 'col')
  .style('width', '350px')
  .append('svg')
    .style('width', '350px')
    .style('height', '350px');

const statsTableView = statsDisplay.append('div').attr('class', 'overflow-auto')
  .style('width', '100%')
  .style('height', '250px');
const statsTable = statsTableView.append('div')
  .append('table')
    .style('width', '100%');

//
// Draw all elements of unit stats graphics.
//
function drawStats()
{
  var res = computeStats(statBotSelected);
  cropStatData = res.cropped;
  unsortStatData = res.unsorted;
  drawPieChart();
  drawWireframeChart();
  drawStatHighlight();
  drawStatTable();
  linkStatCharts();
}

function computeCompareStats()
{
  statCompareSelect = parseInt(d3.select("#selectCompareSlug").property("value"));

  var startIdx = botTechMap[statCompareSelect]
  var compareCount = botTechMap[statCompareSelect+1] - botTechMap[statCompareSelect];
  if(statCompareSelect == botTechMap.length - 1)
  {
    startIdx = 0;
    compareCount = botNameLookup.length;
  }
  var countInv = 1.0 / compareCount;
  var compareBots = [];
  compareTotals = {};

  for(var botIdx = startIdx; botIdx < startIdx + compareCount; ++botIdx)
  {
    var res = computeStats(botIdx);
    compareBots[botIdx] = res.base;
    for(var statIdx = 0; statIdx < compareBots[botIdx].length; ++statIdx)
    {
      var statName = compareBots[botIdx][statIdx].name;
      if(compareTotals[statName] == null)
      {
        compareTotals[statName] = {name: statName, ID: statIdx, weight: 0.0, absScore: 0.0, score: 0.0, absWtPct: 0.0, wtPct: 0.0, value: 0.0};
      }
      compareTotals[statName].value += GlobalData.bots[botIdx][statName] * countInv;
      compareTotals[statName].weight += compareBots[botIdx][statIdx].weight * countInv;
      compareTotals[statName].absScore += compareBots[botIdx][statIdx].absScore * countInv;
      compareTotals[statName].score += compareBots[botIdx][statIdx].score * countInv;
      compareTotals[statName].absWtPct += compareBots[botIdx][statIdx].absWtPct * countInv;
      compareTotals[statName].wtPct += compareBots[botIdx][statIdx].wtPct * countInv;
    }
  }
}

function computeStats(botIdx)
{
  var statCount = 0;
  var results = {base: [], sorted: [], cropped: [], unsorted: []};

  var selectedScore = 0;
  for(const property in GlobalData.regStats[botIdx])
  {
    selectedScore += Math.abs(GlobalData.regStats[botIdx][property] * GlobalData.bots[botIdx][property]);
  };

  for(const property in GlobalData.regStats[botIdx])
  {
    results.base[statCount] = {};
    results.base[statCount].ID = statCount;
    results.base[statCount].weight = GlobalData.regStats[botIdx][property];
    results.base[statCount].absScore = Math.abs(GlobalData.regStats[botIdx][property] * GlobalData.bots[botIdx][property]);
    results.base[statCount].score = GlobalData.regStats[botIdx][property] * GlobalData.bots[botIdx][property];
    results.base[statCount].absWtPct = results.base[statCount].absScore / selectedScore;
    results.base[statCount].wtPct = results.base[statCount].score / selectedScore;
    results.base[statCount].name = property;
    statCount++;
  };

  results.sorted = results.base.slice().sort((a,b) => d3.descending(a.absWtPct, b.absWtPct));
  var pctTotal = 0;
  var smallCutoff = results.sorted.length;
  for(var i = 0; i < results.sorted.length; ++i)
  {
    pctTotal += results.sorted[i].absWtPct;
    if((pctTotal > cStatsGraphCutoff) || (results.sorted[i].absWtPct < 0.01))
    {
      smallCutoff = i+1;
      break;
    }
  }

  results.cropped = results.sorted.slice(0, smallCutoff);
  var cropScore = 0;
  var cropPct = 0;
  for(var i = 0; i < results.sorted.length; ++i)
  {
    if(i < smallCutoff)
    {
      // Do nothing.
    }
    else
    {
      cropScore += results.sorted[i].absScore;
      cropPct += results.sorted[i].absWtPct;
    }
  }

  results.cropped[smallCutoff] = {};
  results.cropped[smallCutoff].ID = statIndex.Extra;
  results.cropped[smallCutoff].weight = 0.0;
  results.cropped[smallCutoff].absScore = cropScore;
  results.cropped[smallCutoff].absWtPct = cropPct;
  results.cropped[smallCutoff].name = "Extra";

  results.unsorted = results.cropped.slice().sort((a,b) => d3.ascending(a.ID, b.ID));

  return results;
}

function linkStatCharts()
{
  for(let i = 0; i < cropStatData.length-1; ++i)
  {
    piePaths[i].on('mouseenter', function(d, j) { setStatHighlight(i, cropStatData[i].ID, true); })
               .on('mouseleave', function() { setStatHighlight(i, -1, false); });
    pieIcons[i].on('mouseenter', function(d, j) { setStatHighlight(i, cropStatData[i].ID, true); })
               .on('mouseleave', function() { setStatHighlight(i, -1, false); });
    wireIcons[i].on('mouseenter', function(d, j) { setStatHighlight(i, cropStatData[i].ID, true); })
                .on('mouseleave', function() { setStatHighlight(i, -1, false); });
    wireLinesA[i].on('mouseenter', function(d, j) { setStatHighlight(i, cropStatData[i].ID, true); })
                 .on('mouseleave', function() { setStatHighlight(i, -1, false); });
    wireLinesB[i].on('mouseenter', function(d, j) { setStatHighlight(i, cropStatData[i].ID, true); })
                 .on('mouseleave', function() { setStatHighlight(i, -1, false); });
  }
}

//
// Draw pie chart of several most impactful values, ranked, enable highlighting by mouse over.
//
function drawPieChart()
{
  clearSvg(statsPieChart);

  piePaths = [];
  pieIcons = [];

  const pieSlices = statsPieChart.append('g')
    .attr('transform', `translate(${cPieRadius+55}, ${cPieRadius+60})`)
    .selectAll(".arc")
      .data(pie(cropStatData))
      .enter()
      .append('g')
        .attr('class', 'svg_arc');

  pieSlices._groups[0].forEach((d,i) => {
    var pieSlice = d3.select(d);

    piePaths[i] = pieSlice.append('path')
      .attr("stroke", '#303030')
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
      .attr('d', smallArc)
      .style('fill', function(d, i) {return (d.data.weight >= 0.0) ? colour[1] : colour[2];});
    pieIcons[i] = pieSlice.append('image').attr('class', 'svg_image')
      .attr('width', 35)
      .attr('height', 35)
      .attr("transform", function(d) { return "translate(" + (2.5*(smallArc.centroid(d)[0])-17.5) + ", " + (2.5*(smallArc.centroid(d)[1])-17.5) + ")"; })
      .attr('href', function(d) { return statImageLookup[d.data.ID] })
      .attr('filter', 'invert(100%)')
      .style('opacity', 0.7)
      .attr('alt', function(d) { return d.data.name });
  });
}

//
// Draw wireframe chart of most impact values, unranked, enable highlighting by mouse over.
//
function drawWireframeChart()
{
  clearSvg(statsWireframeChart);

  wireLinesA = [];
  wireLinesB = [];
  wireIcons = [];

  var wireframe = statsWireframeChart.append('g')
    .attr('transform', `translate(${cPieRadius+55}, ${cPieRadius+60})`);

  var vertexCount = Math.max(2, unsortStatData.length-1);
  var maxVertices = [];
  var normLowVertices = [];
  var normVertices = [];
  var normHighVertices = [];
  var minVertices = [];
  for(var i = 0; i < vertexCount+1; ++i)
  {
    maxVertices[i] = {x: cWireMaxRadius * Math.sin(2*Math.PI * i / vertexCount),   y: -cWireMaxRadius * Math.cos(2*Math.PI * i / vertexCount)};
    normLowVertices[i] = {x: cWireNormLowRadius * Math.sin(2*Math.PI * i / vertexCount), y: -cWireNormLowRadius * Math.cos(2*Math.PI * i / vertexCount)};
    normVertices[i] = {x: cWireNormRadius * Math.sin(2*Math.PI * i / vertexCount), y: -cWireNormRadius * Math.cos(2*Math.PI * i / vertexCount)};
    normHighVertices[i] = {x: cWireNormHighRadius * Math.sin(2*Math.PI * i / vertexCount), y: -cWireNormHighRadius * Math.cos(2*Math.PI * i / vertexCount)};
    minVertices[i] = {x: cWireMinRadius * Math.sin(2*Math.PI * i / vertexCount),   y: -cWireMinRadius * Math.cos(2*Math.PI * i / vertexCount)};

    if(i < vertexCount)
    {
      wireIcons[i] = wireframe.append('image').attr('class', 'svg_image')
        .attr('x', (cWireIconRadius + 35.0) * Math.sin(2*Math.PI * i / vertexCount)-20)
        .attr('y', -(cWireIconRadius + 35.0) * Math.cos(2*Math.PI * i / vertexCount)-20)
        .attr('width', 35)
        .attr('height', 35)
        .attr('filter', 'invert(100%)')
        .style('opacity', 0.7)
        .attr('href', statImageLookup[unsortStatData[i].ID])
        .attr('alt', unsortStatData[i].name);
    }
  }

  var botVertices = [];
  var compareVertices = [];
  var factor = 1.5;
  for(var i = 0; i < vertexCount+1; ++i)
  {
    if(i < unsortStatData.length-1)
    {
      var botScoreScale = cWireNormRadius;
      var compareScoreScale = cWireNormRadius;
      if(unsortStatData[i].wtPct >= 0.0)
      {
        botScoreScale += factor * unsortStatData[i].wtPct * (cWireMaxRadius - cWireNormRadius);
      }
      else
      {
        botScoreScale += factor * unsortStatData[i].wtPct * (cWireNormRadius - cWireMinRadius);
      }

      if(compareTotals[unsortStatData[i].name].wtPct >= 0.0)
      {
        compareScoreScale += factor * compareTotals[unsortStatData[i].name].wtPct * (cWireMaxRadius - cWireNormRadius);
      }
      else
      {
        compareScoreScale += factor * compareTotals[unsortStatData[i].name].wtPct * (cWireNormRadius - cWireMinRadius);
      }
      botVertices[i]     = {x: botScoreScale     * Math.sin(2*Math.PI * i / vertexCount), y: -botScoreScale     * Math.cos(2*Math.PI * i / vertexCount)};
      compareVertices[i] = {x: compareScoreScale * Math.sin(2*Math.PI * i / vertexCount), y: -compareScoreScale * Math.cos(2*Math.PI * i / vertexCount)};
    }
    else if(i == unsortStatData.length-1)
    {
      var botScoreScale = cWireNormRadius;
      var compareScoreScale = cWireNormRadius;
      if(unsortStatData[0].wtPct >= 0.0)
      {
        botScoreScale += factor * unsortStatData[0].wtPct * (cWireMaxRadius - cWireNormRadius);
      }
      else
      {
        botScoreScale += factor * unsortStatData[0].wtPct * (cWireNormRadius - cWireMinRadius);
      }

      if(compareTotals[unsortStatData[0].name].wtPct >= 0.0)
      {
        compareScoreScale += factor * compareTotals[unsortStatData[0].name].wtPct * (cWireMaxRadius - cWireNormRadius);
      }
      else
      {
        compareScoreScale += factor * compareTotals[unsortStatData[0].name].wtPct * (cWireNormRadius - cWireMinRadius);
      }
      botVertices[unsortStatData.length-1]     = {x: 0.0, y: -botScoreScale};
      compareVertices[unsortStatData.length-1] = {x: 0.0, y: -compareScoreScale};
    }
    else
    {
      botVertices[i] = {x: 0.0, y: 0.0 };
      compareVertices[i] = {x: 0.0, y: 0.0};
    }
  }

  wireframe.append("path")
    .attr("class", "svg_line")
    .attr("fill", colour[0])
    .style("stroke-width", "1.0")
    .attr("d", drawLine(minVertices));
  
  wireframe.append("path")
    .attr("class", "svg_line")
    .attr("fill", "none")
    .style("stroke-width", "1.0")
    .style("stroke-dasharray", ("3, 3"))
    .attr("d", drawLine(normLowVertices));

  wireframe.append("path")
    .attr("class", "svg_line")
    .attr("fill", "none")
    .style("stroke-width", "3.0")
    .attr("d", drawLine(normVertices));
    
  wireframe.append("path")
    .attr("class", "svg_line")
    .attr("fill", "none")
    .style("stroke-width", "1.0")
    .style("stroke-dasharray", ("3, 3"))
    .attr("d", drawLine(normHighVertices));

  wireframe.append("path")
    .attr("class", "svg_line")
    .attr("fill", "none")
    .style("stroke-width", "1.0")
    .attr("d", drawLine(maxVertices));

  for(var i = 0; i < vertexCount; ++i)
  {
    var wedgeAVertices = [];
    wedgeAVertices[0] = { x: 0.0, y: 0.0 };
    var wedgeBVertices = [];
    wedgeBVertices[0] = { x: 0.0, y: 0.0 };

    if(i > 0)
    {
      wedgeAVertices[1] = { x: (botVertices[i-1].x + botVertices[i].x) * 0.5, y: (botVertices[i-1].y + botVertices[i].y) * 0.5 };
      wedgeBVertices[1] = botVertices[i];
    }
    else
    {
      wedgeAVertices[1] = { x: (botVertices[vertexCount-1].x + botVertices[i].x) * 0.5, y: (botVertices[vertexCount-1].y + botVertices[i].y) * 0.5 };
      wedgeBVertices[1] = botVertices[i];
    }

    if(i < vertexCount-1)
    {
      wedgeAVertices[2] = botVertices[i];
      wedgeBVertices[2] = { x: (botVertices[i].x + botVertices[i+1].x) * 0.5, y: (botVertices[i].y + botVertices[i+1].y) * 0.5 };
    }
    else
    {
      wedgeAVertices[2] = botVertices[i];
      wedgeBVertices[2] = { x: (botVertices[i].x + botVertices[0].x) * 0.5, y: (botVertices[i].y + botVertices[0].y) * 0.5 };
    }

    wireLinesA[i] = wireframe.append("path")
      .attr("class", "svg_line")
      .classed('selected', true)
      .attr("fill", colour[1])
      .style("stroke-width", "0.1")
      .style('opacity', 0.3)
      .attr('d', drawLine(wedgeAVertices));
    wireLinesB[i] = wireframe.append("path")
      .attr("class", "svg_line")
      .classed('selected', true)
      .attr("fill", colour[1])
      .style("stroke-width", "0.1")
      .style('opacity', 0.3)
      .attr('d', drawLine(wedgeBVertices));
  }

  wireframe.append("path")
    .attr("class", "svg_line")
    .classed('selected', true)
    .attr("fill", "none")
    .style("stroke-width", "2.0")
    .attr("d", drawLine(botVertices));

  wireframe.append("path")
    .attr("class", "svg_line")
    .classed('highlighted', true)
    .attr("fill", 'none')
    .style("stroke-width", "1.0")
    .style('opacity', 0.2)
    .attr("d", drawLine(compareVertices));

  wireframe.append("path")
    .attr("class", "svg_line")
    .classed('highlighted', true)
    .attr("fill", 'none')
    .style("stroke-width", "2.0")
    .attr("d", drawLine(compareVertices));
}

function setStatHighlight(graphIdx, statIdx, enlarge)
{
  if(statPieHighlight != statIdx)
  {
    piePaths[graphIdx].attr('d', enlarge ? largeArc : smallArc)
      .attr('fill', function(d, i) {return enlarge ? ((statIdx == statIndex.Extra) ? colour[3] : (d.data.weight < 0.0 ? colour[2] : colour[1])) : colour[0];})
      .style('opacity', (enlarge ? 1.0 : 0.7));
    pieIcons[graphIdx].style('opacity', (enlarge ? 1.0 : 0.7));
    wireIcons[graphIdx].style('opacity', (enlarge ? 1.0 : 0.7));
    wireLinesA[graphIdx].style('opacity', (enlarge ? 0.6 : 0.3));
    wireLinesB[graphIdx].style('opacity', (enlarge ? 0.6 : 0.3));
    statPieHighlight = statIdx;
    drawStatHighlight();
  }
}

function drawStatHighlight()
{
  clearSvg(statsHighlightImages);
  clearSvg(statsHighlightTable);

  // Draw selected bot
  statsHighlightImages.append('g').append('text').attr('class', 'svg_text')
    .attr('x', 60)
    .attr('y', 30)
    .style('font-size', '30px')
    .style("text-anchor", "middle")
    .text('\u{2211}' + parseInt(GlobalData.regData[statBotSelected][statBotSelected].Weight));
  statsHighlightImages.append('g')
    .append('image').attr('class', 'svg_image')
      .attr('width', 80)
      .attr('height', 110)
      .attr("transform", function(d) { return "translate(20, 30)"; })
      .attr('href', botImageLookup[statBotSelected])
      .attr('filter', 'invert(100%)')
      .attr('alt', botNameLookup[statBotSelected])
  statsHighlightImages.append('g')
    .append('image').attr('class', 'svg_image')
      .attr('width', 80)
      .attr('height', 110)
      .attr("transform", function(d) { return "translate(100, 30)"; })
      .attr('href', statImageLookup[statPieHighlight])
      .attr('filter', 'invert(100%)')
      .attr('alt', statNameLookup[statPieHighlight])

  if(statPieHighlight != -1)
  {
    // Create table header
    var topStat = statsHighlightTable.append('thead').append('tr');
    topStat.append('th').attr('class', 'table_hr_cornersticky')
      .text(statNameLookup[statPieHighlight]);
    topStat.append('th').attr('class', 'table_hr_sticky')
      .text("Bot");
    topStat.append('th').attr('class', 'table_hr_sticky')
      .text("Compare");

    if(statPieHighlight < statIndex.Extra)
    {
      var selectedScore = 0;
      for(const property in GlobalData.regStats[statBotSelected])
      {
        selectedScore += Math.abs(GlobalData.regStats[statBotSelected][property] * GlobalData.bots[statBotSelected][property]);
      };
      var value = GlobalData.bots[statBotSelected][statNameLookup[statPieHighlight]];
      var weight = GlobalData.regStats[statBotSelected][statNameLookup[statPieHighlight]];
      var score = value * weight;
      statsHighlightImages.append('g').append('text').attr('class', 'svg_text')
        .attr('x', 140)
        .attr('y', 30)
        .style('font-size', '30px')
        .style("text-anchor", "middle")
        .text((score >= 0.0 ? "+" : "") + parseInt(score));
      var percent = score / selectedScore;
      var row = statsHighlightTable.append('tbody').append('tr')
        //.on('mouseenter', () => setRegressionInputHighlight(graph, table, d.name))
        //.on('mouseleave', () => setRegressionInputHighlight(graph, table, null))
        //.on('click', () => setRegressionInputSelect(graph, table, d.name));
      var newCell = null;
      newCell = row.append('td').attr('class', 'table_cell').style('width', '20%')
        .append('text')
          .attr('alt', "Measure Value")
          .text('Value');
      newCell = row.append('td').attr('class', 'table_cell').style('width', '40%')
        .append('text')
          .attr('alt', "Value")
          .text(parseInt(100.0*value)/100.0);
      newCell = row.append('td').attr('class', 'table_cell').style('width', '40%')
        .attr('alt', "Compare Value")
        .text(parseInt(100.0*compareTotals[statNameLookup[statPieHighlight]].value)/100.0);

      row = statsHighlightTable.append('tbody').append('tr')
      newCell = row.append('td').attr('class', 'table_cell').style('width', '20%')
        .append('text')
          .attr('alt', "Measure Weight")
          .text('Weight');
      newCell = row.append('td').attr('class', 'table_cell').style('width', '40%')
        .append('text')
          .attr('alt', "Weight")
          .text(parseInt(100.0*weight)/100.0);
      newCell = row.append('td').attr('class', 'table_cell').style('width', '40%')
        .attr('alt', "Compare Value")
        .text(parseInt(100.0*compareTotals[statNameLookup[statPieHighlight]].weight)/100.0);

      row = statsHighlightTable.append('tbody').append('tr')
      newCell = row.append('td').attr('class', 'table_cell').style('width', '20%')
        .append('text')
          .attr('alt', "Measure Score")
          .text('Score');
      newCell = row.append('td').attr('class', 'table_cell').style('width', '40%')
        .append('text')
          .attr('alt', "Score")
          .text(parseInt(100.0*score)/100.0);
      newCell = row.append('td').attr('class', 'table_cell').style('width', '40%')
        .attr('alt', "Compare Value")
        .text(parseInt(100.0*compareTotals[statNameLookup[statPieHighlight]].score)/100.0);

      row = statsHighlightTable.append('tbody').append('tr')
      newCell = row.append('td').attr('class', 'table_cell').style('width', '20%')
        .append('text')
          .attr('alt', "Measure Percent")
          .text('Percent');
      newCell = row.append('td').attr('class', 'table_cell').style('width', '40%')
        .append('text')
          .attr('alt', "Percent")
          .text(parseInt(100.0*percent) + "%");
      newCell = row.append('td').attr('class', 'table_cell').style('width', '40%')
        .attr('alt', "Compare Percent")
        .text(parseInt(100.0*compareTotals[statNameLookup[statPieHighlight]].wtPct) + "%");
    }
  }
}

function drawStatTable()
{
  clearSvg(statsTable);

  // Create table header
  var topStat = statsTable.append('thead').append('tr');
  topStat.append('th').attr('class', 'table_hr_cornersticky')
    .text("Icon");
  topStat.append('th').attr('class', 'table_hr_cornersticky')
    .text("Variable");
  topStat.append('th').attr('class', 'table_hr_sticky')
    .text("Value");
  topStat.append('th').attr('class', 'table_hr_sticky')
    .text("Weight");
  topStat.append('th').attr('class', 'table_hr_sticky')
    .text("Score");
  topStat.append('th').attr('class', 'table_hr_sticky')
    .text("Percent");

  var dim = false;
  for(var tablePass = 0; tablePass < 2; ++tablePass)
  {
    for(var statIdx = 0; statIdx < statCount; ++statIdx)
    {
      var selectedScore = 0;
      for(const property in GlobalData.regStats[statBotSelected])
      {
        selectedScore += Math.abs(GlobalData.regStats[statBotSelected][property] * GlobalData.bots[statBotSelected][property]);
      };
      var baseWeight = GlobalData.regData[statBotSelected][statBotSelected].Weight;
      var value = GlobalData.bots[statBotSelected][statNameLookup[statIdx]];
      var weight = GlobalData.regStats[statBotSelected][statNameLookup[statIdx]];
      var score = weight*value;
      if((!dim && (score != 0.0)) || (dim && (score == 0.0)))
      {
        var row = statsTable.append('tbody').append('tr')
        var newCell = row.append('td').attr('class', 'table_cell').style('width', '15%')
        if(statNameLookup[statIdx].match(/DamageBonusID[0-9]/))
        {
          newCell.append('div').attr('class', 'col')
            .style('width', '10%');
            newCell.append('img')
            .attr('src', statImageLookup[statIndex.Range])
            .attr('alt', statNameLookup[statIdx]);
          if(value == -1)
          {
            newCell.append('img')
              .attr('src', 'res/images/stats/nothing.png')
              .attr('alt', 'Nothing');
          }
          else
          {
            newCell.append('img')
              .attr('src', botImageLookup[value])
              .attr('alt', statNameLookup[statIdx]);
          }
        }
        else if(statNameLookup[statIdx].match(/DamageBonus[0-9]/))
        {
          newCell.append('div').attr('class', 'col')
            .style('width', '10%');
            newCell.append('img')
              .attr('src', statImageLookup[statIndex.Damage])
              .attr('alt', statNameLookup[statIdx]);
          if(GlobalData.bots[statBotSelected][statNameLookup[statIdx-1]] == -1)
          {
            newCell.append('img')
              .attr('src', 'res/images/stats/nothing.png')
              .attr('alt', 'Nothing');
          }
          else
          {
            newCell.append('img')
              .attr('src', botImageLookup[GlobalData.bots[statBotSelected][statNameLookup[statIdx-1]]])
              .attr('alt', statNameLookup[statIdx]);
          }
        }
        else
        {
          newCell.append('div').attr('class', 'col')
            .style('width', '10%')
            .append('img')
              .attr('src', statImageLookup[statIdx])
              .attr('alt', statNameLookup[statIdx]);
        }
        newCell = row.append('td').attr('class', 'table_cell').style('width', '19%')
          .append('text')
            .attr('class', dim ? 'darken' : '')
            .attr('alt', "Measure Value")
            .text(statNameLookup[statIdx]);
        newCell = row.append('td').attr('class', 'table_cell').style('width', '16%')
          .append('text')
            .attr('class', dim ? 'darken' : '')
            .attr('alt', "Value")
            .text(parseInt(100.0*value)/100.0);
        newCell = row.append('td').attr('class', 'table_cell').style('width', '16%')
          .append('text')
            .attr('class', dim ? 'darken' : '')
            .attr('alt', "Weight")
            .text(parseInt(100.0*weight)/100.0);
        newCell = row.append('td').attr('class', 'table_cell').style('width', '16%')
          .append('text')
            .attr('class', dim ? 'darken' : '')
            .attr('alt', "Score")
            .text(parseInt(100.0*score)/100.0);
        newCell = row.append('td').attr('class', 'table_cell').style('width', '16%');
        newCell.append('text')
            .attr('class', dim ? 'darken' : '')
            .attr('alt', "Percent")
            .text(parseInt(100.0*score/baseWeight) + '% (');
        if(score > 0)
        {
          newCell.append('text').attr('class', dim ? 'darken' : '').attr('class', 'secondary').attr('alt', "Percent").text(Math.abs(parseInt(100.0*score/selectedScore)) + '%');
          newCell.append('text').attr('class', dim ? 'darken' : '').attr('alt', "Percent").text(')');
        }
        else if(score == 0.0)
        {
          newCell.append('text').attr('class', dim ? 'darken' : '').attr('alt', "Percent").text(Math.abs(parseInt(100.0*score/selectedScore)) + '%');
          newCell.append('text').attr('class', dim ? 'darken' : '').attr('alt', "Percent").text(')');
        }
        else
        {
          newCell.append('text').attr('class', dim ? 'darken' : '').attr('class', 'tertiary').attr('alt', "Percent").text(Math.abs(parseInt(100.0*score/selectedScore)) + '%');
          newCell.append('text').attr('class', dim ? 'darken' : '').attr('alt', "Percent").text(')');
        }
      }
    }

    dim = true;
  }
}
