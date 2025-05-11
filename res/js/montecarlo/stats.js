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
var statCompareGroup = compIndex.any; // Any
var statCompareSelect = 0; // Any
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
var statSelectButton = null;
var statGroupButton = null;
var statComparisonButton = null;

function selectStatBot(value)
{
  statBotSelected = value;
  drawStats();
}

function selectComparisonGroup(value)
{
  statCompareGroup = value;
  statCompareSelect = 0;
  computeCompareStats();
  drawStats();
}

function selectTechComparison(value)
{
  statCompareSelect = value;
  computeCompareStats();
  drawStats();
}

//
// HTML Linkages
//
const statsSelection = d3.select('#viz-stats-selection').append('div')//.attr('class', 'row row-cols-3');
const statsSelectBot = statsSelection.append('div')//.attr('class', 'col').style('width', '20%');
const statsCompareGroup = statsSelection.append('div')//.attr('class', 'col').style('width', '30%');
const statsCompareIdx = statsSelection.append('div')//.attr('class', 'col').style('width', '50%');
  
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
  drawBotDropdown('selectBotSlug2', selectStatBot);
  drawGroupDropdown('selectCompareSlug2', selectComparisonGroup);
  drawComparisonDropdown('selectCompareSlug3', selectTechComparison);
  var res = computeStats(statBotSelected);
  cropStatData = res.cropped;
  unsortStatData = res.unsorted;
  updateColours();
  drawPieChart();
  drawWireframeChart();
  drawStatHighlight();
  drawStatTable();
  linkStatCharts();

  // Update buttons
  statSelectButton.select('img').attr('src', botImageLookup[statBotSelected]);
  statSelectButton.select('span').text(botNameLookup[statBotSelected]);
  statGroupButton.select('img').attr('src', compImageLookup[statCompareGroup]);
  statGroupButton.select('span').text(compNameLookup[statCompareGroup]);
  if(statCompareGroup == compIndex.tech)
  {
    statComparisonButton.select('img').attr('src', techImageLookup[statCompareSelect]);
    statComparisonButton.select('span').text(techNameLookup[statCompareSelect]);
  }
  else if(statCompareGroup == compIndex.slot)
  {
    statComparisonButton.select('img').attr('src', deckslotImageLookup[statCompareSelect]);
    statComparisonButton.select('span').text(deckslotNameLookup[statCompareSelect]);
  }
  else if(statCompareGroup == compIndex.trait)
  {
    statComparisonButton.select('img').attr('src', traitImageLookup[statCompareSelect]);
    statComparisonButton.select('span').text(traitNameLookup[statCompareSelect]);
  }
  else if(statCompareGroup == compIndex.ability)
  {
    statComparisonButton.select('img').attr('src', abilityImageLookup[statCompareSelect]);
    statComparisonButton.select('span').text(abilityNameLookup[statCompareSelect]);
  }
  else if(statCompareGroup == compIndex.manu)
  {
    statComparisonButton.select('img').attr('src', manuImageLookup[statCompareSelect]);
    statComparisonButton.select('span').text(manuNameLookup[statCompareSelect]);
  }
  else if(statCompareGroup == compIndex.any)
  {
    statComparisonButton.select('img').attr('src', "res/images/stats/nothing.png");
    statComparisonButton.select('span').text('');
  }
}

function drawBotDropdown(name, callback)
{
  var selectBot = createImageSelect(statsSelectBot, "Select Bot:", name, 210, 300, 25, 25, callback);
  statSelectButton = selectBot.selectAll(`#${name}Button`);
  var selectBotContent = selectBot.selectAll(`#${name}Content`);
  
  for(let botIdx = 0; botIdx < botCount; ++botIdx)
  {
    let element = selectBotContent.append('div')
      .attr('id', `${name + botNameLookup[botIdx]}`)
      .attr('value', botIdx);
    element.append('img')
      .attr('src', botImageLookup[botIdx])
      .style('width', '25px')
      .style('height', '25px')
    element.append('text')
      .text(`${botNameLookup[botIdx]}`);
    element.on('click', () => callback(botIdx))
  }
}

function drawGroupDropdown(name, callback)
{
  var selectGroup = createImageSelect(statsCompareGroup, "Select Comparison:", name, 150, 300, 25, 25, callback);
  statGroupButton = selectGroup.selectAll(`#${name}Button`);
  var selectGroupContent = selectGroup.selectAll(`#${name}Content`);

  for(let compIdx = 0; compIdx < compCount; ++compIdx)
  {
    let element = selectGroupContent.append('div')
      .attr('id', `${name + compNameLookup[compIdx]}`)
      .attr('value', compIdx);
    element.append('img')
      .attr('src', compImageLookup[compIdx])
      .style('width', '25px')
      .style('height', '25px')
    element.append('text')
      .text(`${compNameLookup[compIdx]}`);
    element.on('click', () => callback(compIdx))
  }
}

function drawComparisonDropdown(name, callback)
{
  if(statCompareGroup == compIndex.any)
  {
    var selectComparison = createImageSelect(statsCompareIdx, "Select Option:", name, 150, 0, 25, 25, callback);
    statComparisonButton = selectComparison.selectAll(`#${name}Button`);
  }
  else
  {
    var selectComparison = createImageSelect(statsCompareIdx, "Select Option:", name, 150, 300, 25, 25, callback);
    statComparisonButton = selectComparison.selectAll(`#${name}Button`);
    var selectComparisonContent = selectComparison.selectAll(`#${name}Content`);

    if(statCompareGroup == compIndex.tech)
    {
      for(let techIdx = 0; techIdx < techCount; ++techIdx)
      {
        let element = selectComparisonContent.append('div')
          .attr('id', `${name + techNameLookup[techIdx]}`)
          .attr('value', techIdx);
        element.append('img')
          .attr('src', techImageLookup[techIdx])
          .style('width', '25px')
          .style('height', '25px');
        element.append('text')
          .text(`${techNameLookup[techIdx]}`);
        element.on('click', () => callback(techIdx))
      }
    }
    else if(statCompareGroup == compIndex.slot)
    {
      for(let slotIdx = 0; slotIdx < deckslotCount; ++slotIdx)
      {
        let element = selectComparisonContent.append('div')
          .attr('id', `${name + deckslotNameLookup[slotIdx]}`)
          .attr('value', slotIdx);
        element.append('img')
          .attr('src', deckslotImageLookup[slotIdx])
          .style('width', '25px')
          .style('height', '25px');
        element.append('text')
          .text(`${deckslotNameLookup[slotIdx]}`);
        element.on('click', () => callback(slotIdx))
      }
    }
    else if(statCompareGroup == compIndex.trait)
    {
      for(let traitIdx = 0; traitIdx < traitCount; ++traitIdx)
      {
        let element = selectComparisonContent.append('div')
          .attr('id', `${name + traitNameLookup[traitIdx]}`)
          .attr('value', traitIdx);
        element.append('img')
          .attr('src', traitImageLookup[traitIdx])
          .style('width', '25px')
          .style('height', '25px');
        element.append('text')
          .text(`${traitNameLookup[traitIdx]}`);
        element.on('click', () => callback(traitIdx))
      }
    }
    else if(statCompareGroup == compIndex.ability)
    {
      for(let abilIdx = 0; abilIdx < abilityCount; ++abilIdx)
      {
        if(abilIdx != abilityIndex.unsetup)
        {
          let element = selectComparisonContent.append('div')
            .attr('id', `${name + abilityNameLookup[abilIdx]}`)
            .attr('value', abilIdx);
          element.append('img')
            .attr('src', abilityImageLookup[abilIdx])
            .style('width', '25px')
            .style('height', '25px');
          element.append('text')
            .text(`${abilityNameLookup[abilIdx]}`);
          element.on('click', () => callback(abilIdx))
        }
      }
    }
    else if(statCompareGroup == compIndex.manu)
    {
      for(let manuIdx = 0; manuIdx < manuCount; ++manuIdx)
      {
        let element = selectComparisonContent.append('div')
          .attr('id', `${name + manuNameLookup[manuIdx]}`)
          .attr('value', manuIdx);
        element.append('img')
          .attr('src', manuImageLookup[manuIdx])
          .style('width', '100px')
          .style('height', '25px');
        element.on('click', () => callback(manuIdx))
      }
    }
  }
}

function updateColours()
{
  for(var ruleIdx in document.styleSheets[1].cssRules)
  {
    var ruleList = document.styleSheets[1].cssRules[ruleIdx];
    if(ruleList.selectorText == ".pieColour0")
    {
      colour[0] = ruleList.style.color;
    }
    else if(ruleList.selectorText == ".pieColour1")
    {
      colour[1] = ruleList.style.color;
    }
    else if(ruleList.selectorText == ".pieColour2")
    {
      colour[2] = ruleList.style.color;
    }
    else if(ruleList.selectorText == ".pieColour3")
    {
      colour[3] = ruleList.style.color;
    }
  }
}

function computeCompareStats()
{
  var filterCompare = GlobalData.bots;

  if(statCompareGroup == compIndex.tech)
  {
    filterCompare = GlobalData.bots.filter((d, i) => (d.Tech == statCompareSelect));
  }
  else if(statCompareGroup == compIndex.slot)
  {
    filterCompare = GlobalData.bots.filter((d, i) => (  (deckslotStartTechMap[statCompareSelect] <= d.Tech)
                                                     && (d.Tech < deckslotEndTechMap[statCompareSelect])));
  }
  else if(statCompareGroup == compIndex.trait)
  {
    filterCompare = GlobalData.bots.filter((d, i) => (  (d.Swarming && (statCompareSelect == traitIndex.swarming))
                                                     || (d.Piercing && (statCompareSelect == traitIndex.piercing))
                                                     || (d.Hulking && (statCompareSelect == traitIndex.hulking))
                                                     || (d.Shattering && (statCompareSelect == traitIndex.shattering))
                                                     || (d.Walking && (statCompareSelect == traitIndex.ground))
                                                     || (d.Flying && (statCompareSelect == traitIndex.flying))
                                                     || (d.Hunting && (statCompareSelect == traitIndex.hunting))
                                                     || (d.Passive && (statCompareSelect == traitIndex.passive))));
  }
  else if(statCompareGroup == compIndex.ability)
  {
    filterCompare = GlobalData.bots.filter((d, i) => (  (d.Overclock && (statCompareSelect == abilityIndex.overclock))
                                                     || (d.Blink && (statCompareSelect == abilityIndex.blink))
                                                     || (d.Recall && (statCompareSelect == abilityIndex.recall))
                                                     || (d.Setup && (statCompareSelect == abilityIndex.setup))
                                                     || (d.Detonate && (statCompareSelect == abilityIndex.detonate))
                                                     || (d.Destruct && (statCompareSelect == abilityIndex.destruct))
                                                     || (d["Guardian Shield"] && (statCompareSelect == abilityIndex.guardianshield))));
  }
  else if(statCompareGroup == compIndex.manu)
  {
    filterCompare = GlobalData.bots.filter((d, i) => (d.Manu == statCompareSelect));
  }
  else
  {
    //
  }

  var compareCount = filterCompare.length;
  var countInv = 1.0 / compareCount;
  var compareBots = [];
  compareTotals = {};

  for(var botIdx = 0; botIdx < compareCount; ++botIdx)
  {
    var res = computeStats(filterCompare[botIdx].ID);
    compareBots[botIdx] = res.base;
    for(var statIdx = 0; statIdx < compareBots[botIdx].length; ++statIdx)
    {
      var statName = compareBots[botIdx][statIdx].name;
      if(compareTotals[statName] == null)
      {
        compareTotals[statName] = {name: statName, ID: statIdx, weight: 0.0, absScore: 0.0, score: 0.0, absWtPct: 0.0, wtPct: 0.0, value: 0.0};
      }
      compareTotals[statName].value += filterCompare[botIdx][statName] * countInv;
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
  let unsortIdx = [];
  let sortIdx = [];
  for(let i = 0; i < cropStatData.length-1; ++i)
  {
    for(var j = 0; j < cropStatData.length-1; ++j)
    {
      if(cropStatData[i].ID == unsortStatData[j].ID)
      {
        unsortIdx[i] = j;
        sortIdx[j] = i;
      }
    }
  }

  for(let i = 0; i < cropStatData.length-1; ++i)
  {
    piePaths[i].on('mouseenter', function(d, j) { setStatHighlight(i, unsortIdx[i], cropStatData[i].ID, true); })
               .on('mouseleave', function() { setStatHighlight(i, unsortIdx[i], -1, false); });
    pieIcons[i].on('mouseenter', function(d, j) { setStatHighlight(i, unsortIdx[i], cropStatData[i].ID, true); })
               .on('mouseleave', function() { setStatHighlight(i, unsortIdx[i], -1, false); });
    wireIcons[i].on('mouseenter', function(d, j) { setStatHighlight(sortIdx[i], i, unsortStatData[i].ID, true); })
                .on('mouseleave', function() { setStatHighlight(sortIdx[i], i, -1, false); });
    wireLinesA[i].on('mouseenter', function(d, j) { setStatHighlight(sortIdx[i], i, unsortStatData[i].ID, true); })
                 .on('mouseleave', function() { setStatHighlight(sortIdx[i], i, -1, false); });
    wireLinesB[i].on('mouseenter', function(d, j) { setStatHighlight(sortIdx[i], i, unsortStatData[i].ID, true); })
                 .on('mouseleave', function() { setStatHighlight(sortIdx[i], i, -1, false); });
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
  var factor = 2.5;
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

function setStatHighlight(pieIdx, wireIdx, statIdx, enlarge)
{
  if(statPieHighlight != statIdx)
  {
    piePaths[pieIdx].attr('d', enlarge ? largeArc : smallArc)
      .attr('fill', function(d, i) {return enlarge ? ((statIdx == statIndex.Extra) ? colour[3] : (d.data.weight < 0.0 ? colour[2] : colour[1])) : colour[0];})
      .style('opacity', (enlarge ? 1.0 : 0.7));
    pieIcons[pieIdx].style('opacity', (enlarge ? 1.0 : 0.7));
    wireIcons[wireIdx].style('opacity', (enlarge ? 1.0 : 0.7));
    wireLinesA[wireIdx].style('opacity', (enlarge ? 0.6 : 0.3));
    wireLinesB[wireIdx].style('opacity', (enlarge ? 0.6 : 0.3));
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
    .text('\u{2211}' + parseInt(GlobalData.regData[statBotSelected].correlations[statBotSelected].Weight));
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
      var baseWeight = GlobalData.regData[statBotSelected].correlations[statBotSelected].Weight;
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
