// In this section, the user is able to select a bot and view the breakdown of that bots weight
// presented in the regressions graphics in more detail, broken down by each stat. The stats are
// shown in terms of relative contribution to total weight using a pie chart and in comparison to
// a selected average bot representation using a wireframe chart. Influential values are
// highlighted for comparison in a table between the two and all stats raw values are listed in a
// table below the others.

//
// Temp stats data
//
//GlobalData.regStats = [];
//for(var botIdx = 0; botIdx < 49; ++botIdx)
//{
//  GlobalData.regStats[botIdx] = {};
//  //GlobalData.regStats[botIdx].ID = botIdx;
//  //GlobalData.regStats[botIdx].Name = 0;
//  //GlobalData.regStats[botIdx].Manu = 0;
//  //GlobalData.regStats[botIdx].Tech = 0;
//  GlobalData.regStats[botIdx].Matter = 0.5;
//  GlobalData.regStats[botIdx].Energy = 2.5;
//  //GlobalData.regStats[botIdx].ResTotal = 0.0;
//  GlobalData.regStats[botIdx].Bandwidth = 3.0;
//  //GlobalData.regStats[botIdx].Time = 0.0001;
//  GlobalData.regStats[botIdx].Health = 0.04;
//  GlobalData.regStats[botIdx].Walking = 0.1;
//  GlobalData.regStats[botIdx].Flying = 0.1;
//  GlobalData.regStats[botIdx].Swarming = 0.1;
//  GlobalData.regStats[botIdx].Piercing = 0.1;
//  GlobalData.regStats[botIdx].Hulking = 0.1;
//  GlobalData.regStats[botIdx].Shattering = 0.1;
//  GlobalData.regStats[botIdx].Hunting = 0.1;
//  GlobalData.regStats[botIdx].Radius = 0.5;
//  GlobalData.regStats[botIdx].Speed = 5.0;
//  GlobalData.regStats[botIdx].Damage = 0.25;
//  GlobalData.regStats[botIdx].DmgGrounded = 0.1;
//  GlobalData.regStats[botIdx].DamageFlying = 0.1;
//  GlobalData.regStats[botIdx].DamageSwarming = 0.1;
//  GlobalData.regStats[botIdx].DamagePiercing = 0.1;
//  GlobalData.regStats[botIdx].DamageHulking = 0.1;
//  GlobalData.regStats[botIdx].DamageShattering = 0.1;
//  GlobalData.regStats[botIdx].DamageHunting = 0.1;
//  GlobalData.regStats[botIdx].DamageBonusID0 = 0.001;
//  GlobalData.regStats[botIdx].DamageBonus0 = 0.01;
//  GlobalData.regStats[botIdx].DamageBonusID1 = 0.001;
//  GlobalData.regStats[botIdx].DamageBonus1 = 0.01;
//  GlobalData.regStats[botIdx].DamageBonusID2 = 0.001;
//  GlobalData.regStats[botIdx].DamageBonus2 = 0.01;
//  GlobalData.regStats[botIdx].DamageBonusID3 = 0.001;
//  GlobalData.regStats[botIdx].DamageBonus3 = 0.01;
//  GlobalData.regStats[botIdx].Duration = 0.01;
//  GlobalData.regStats[botIdx].Windup = 0.2;
//  GlobalData.regStats[botIdx].Recoil = 0.2;
//  GlobalData.regStats[botIdx].WeaponSpeed = 0.01;
//  GlobalData.regStats[botIdx].Range = 7.0;
//  GlobalData.regStats[botIdx].Splash = 0.1;
//  GlobalData.regStats[botIdx].TgtGrounded = 0.5;
//  GlobalData.regStats[botIdx].TgtFlying = 0.1;
//  GlobalData.regStats[botIdx].TgtSwarming = 0.01;
//  GlobalData.regStats[botIdx].TgtPiercing = 0.01;
//  GlobalData.regStats[botIdx].TgtHulking = 0.01;
//  GlobalData.regStats[botIdx].TgtShattering = 0.01;
//  GlobalData.regStats[botIdx].TgtHunting = 0.01;
//  GlobalData.regStats[botIdx].Overclock = 0.1;
//  GlobalData.regStats[botIdx].Blink = 0.1;
//  GlobalData.regStats[botIdx].Recall = 0.1;
//  GlobalData.regStats[botIdx].Setup = 0.1;
//  GlobalData.regStats[botIdx].Detonate = 0.1;
//  GlobalData.regStats[botIdx].Unsetup = 0.1;
//  GlobalData.regStats[botIdx].Destruct = 0.1;
//}

//
// Variables
//

// Global constants
const cPieRadius = 120;
const cWireMinRadius = 25;
const cWireNormLowRadius = 65;
const cWireNormRadius = 75;
const cWireNormHighRadius = 85;
const cWireMaxRadius = 100;
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
  .value(function(d) { return d.wtPct; })

// Color scale
var colour = ["#a6a6a6", "#ff7b00", "#000000"]; // TODO: Make this reflect user's global colour selection.

// Stats for selected bot.
var sortStatData = {};
var cropStatData = {};
var unsortStatData = {};
var selectedScore = 0;
var compareBot = {};

// User selection values.
var statBotSelected = 0; // Crab
var statCompareSelect = 0;
var statHighlight = 2;
var statPieHighlight = 0;

//
// User Interface Elements
//
// Select bot to display.
// Add event listener to the select box
d3.select("#selectStatSlug").on("change", function() {
  selectStatBot();
});

function selectStatBot()
{
  statBotSelected = d3.select("#selectStatSlug").property("value");
  drawStats();
}

// TODO: Comparison select dropdown.
d3.select("#selectCompareSlug").on("change", function() {
  computeCompareStats();
});

function computeCompareStats()
{
  statCompareSelect = parseInt(d3.select("#selectCompareSlug").property("value"));

  var dummyConst = 1.0/statCount;
  var comparedBots = botTechMap[statCompareSelect+1] - botTechMap[statCompareSelect];
  if(statCompareSelect == botTechMap.length - 1)
  {
    comparedBots = botNameLookup.length;
  }

  var scoreTotal = 0.0;
  for(var i = botTechMap[statCompareSelect]; i < botTechMap[statCompareSelect+1]; ++i)
  {
    scoreTotal += GlobalData.regData[i][i].Score;
  }
  scoreTotal /= comparedBots;
  var scoreAvg = scoreTotal * dummyConst;

  for(const property in GlobalData.regStats[statBotSelected])
  {
    if(compareBot[property] == null)
    {
      compareBot[property] = {};
      compareBot[property].value = 0.0;
      compareBot[property].score = scoreAvg;
      compareBot[property].weight = 0.0;
      compareBot[property].wtPct = dummyConst;
    }

    for(var botIdx = 0; botIdx < comparedBots; ++botIdx)
    {
      if(GlobalData.bots[botIdx][property] != 0.0)
      {
        compareBot[property].value += GlobalData.bots[botIdx][property];
      }
    }

    compareBot[property].value /= comparedBots;
    compareBot[property].weight = scoreAvg / compareBot[property].value;
  }
}

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
  .style('height', '120px');
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
  computeStats();
  drawPieChart();
  drawWireframeChart();
  drawStatHighlight();
  drawStatTable();
}

function computeStats()
{
  var statCount = 0;
  var unsortedStatData = [];

  selectedScore = 1;
  for(const property in GlobalData.regStats[statBotSelected])
  {
    selectedScore += GlobalData.regStats[statBotSelected][property] * GlobalData.bots[statBotSelected][property];
  };

  for(const property in GlobalData.regStats[statBotSelected])
  {
    unsortedStatData[statCount] = {};
    unsortedStatData[statCount].ID = statCount;
    unsortedStatData[statCount].weight = GlobalData.regStats[statBotSelected][property];
    unsortedStatData[statCount].score = GlobalData.regStats[statBotSelected][property] * GlobalData.bots[statBotSelected][property];
    unsortedStatData[statCount].wtPct = unsortedStatData[statCount].score / selectedScore;
    unsortedStatData[statCount].name = property;
    statCount++;
  };

  sortStatData = unsortedStatData.slice().sort((a,b) => d3.descending(a.wtPct, b.wtPct));

  var pctTotal = 0;
  var smallCutoff = 0;
  console.log(pctTotal);
  for(var i = 0; i < sortStatData.length; ++i)
  {
    pctTotal += sortStatData[i].wtPct;
    console.log(pctTotal);
    if(pctTotal > cStatsGraphCutoff)
    {
      smallCutoff = i+1;
      break;
    }
  }

  cropStatData = sortStatData.slice(0, smallCutoff);
  var cropScore = 0;
  var cropPct = 0;
  for(var i = 0; i < sortStatData.length; ++i)
  {
    if(i < smallCutoff)
    {
      // Do nothing.
    }
    else
    {
      cropScore += sortStatData[i].score;
      cropPct += sortStatData[i].wtPct;
    }
  }

  cropStatData[smallCutoff] = {};
  cropStatData[smallCutoff].ID = statIndex.Extra;
  cropStatData[smallCutoff].weight = 0.0;
  cropStatData[smallCutoff].score = cropScore;
  cropStatData[smallCutoff].wtPct = cropPct;
  cropStatData[smallCutoff].name = "Extra";

  unsortStatData = cropStatData.slice().sort((a,b) => d3.ascending(a.ID, b.ID));
}

//
// Draw pie chart of several most impactful values, ranked, enable highlighting by mouse over.
//
function drawPieChart()
{
  clearSvg(statsPieChart);

  const pieSlice = statsPieChart.append('g')
    .attr('transform', `translate(${cPieRadius+55}, ${cPieRadius+60})`)
    .selectAll(".arc")
      .data(pie(cropStatData))
      .enter()
      .append('g')
        .attr('class', 'svg_arc');
  pieSlice.append('path')
    .attr('fill', colour[0])
    .attr("stroke", '#303030')
    .style("stroke-width", "2px")
    .style("opacity", 1.0)
    .attr('d', smallArc)
    .on('mouseenter', function(d, i) { setStatHighlight(this, i.data.ID, true); })
    .on('mouseleave', function() { setStatHighlight(this, -1, false); });
  pieSlice.append('g')
    .append('image').attr('class', 'svg_image')
      .attr('width', 35)
      .attr('height', 35)
      .attr("transform", function(d) { return "translate(" + (2.5*(smallArc.centroid(d)[0])-17.5) + ", " + (2.5*(smallArc.centroid(d)[1])-17.5) + ")"; })
      .attr('href', function(d) { return statImageLookup[d.data.ID] })
      .attr('filter', 'invert(100%)')
      .attr('alt', function(d) { return d.data.name });
}

//
// Draw wireframe chart of most impact values, unranked, enable highlighting by mouse over.
//
function drawWireframeChart()
{
  clearSvg(statsWireframeChart);

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
      wireframe.append('image').attr('class', 'svg_image')
        .attr('x', (cWireIconRadius + 35.0) * Math.sin(2*Math.PI * i / vertexCount)-20)
        .attr('y', -(cWireIconRadius + 35.0) * Math.cos(2*Math.PI * i / vertexCount)-20)
        .attr('width', 35)
        .attr('height', 35)
        .attr('filter', 'invert(100%)')
        .attr('href', statImageLookup[unsortStatData[i].ID])
        .attr('alt', unsortStatData[i].name);
    }
  }

  var botVertices = [];
  for(var i = 0; i < vertexCount+1; ++i)
  {
    if(i < unsortStatData.length-1)
    {
      var diff = unsortStatData[i].wtPct - compareBot[unsortStatData[i].name].wtPct;
      var factor = 0.1;
      if(diff < 0.0)
      {
        factor = 0.6;
      }
      var ratio = 0.5 + 0.5 * Math.tanh(factor * diff / compareBot[unsortStatData[i].name].wtPct)
      var botScoreScale = cWireMinRadius + ratio * (cWireOverRadius - cWireMinRadius);
      botVertices[i] = {x: botScoreScale * Math.sin(2*Math.PI * i / vertexCount), y: -botScoreScale * Math.cos(2*Math.PI * i / vertexCount)};
    }
    else if(i == unsortStatData.length-1)
    {
      var diff = unsortStatData[0].wtPct - compareBot[unsortStatData[0].name].wtPct;
      var factor = 0.1;
      if(diff < 0.0)
      {
        factor = 0.5;
      }
      var ratio = 0.5 + 0.5 * Math.tanh(factor * diff / compareBot[unsortStatData[0].name].wtPct)
      var botScoreScale = cWireMinRadius + ratio * (cWireOverRadius - cWireMinRadius);
      botVertices[i] = {x: 0.0, y: -botScoreScale};
    }
    else
    {
      botVertices[i] = {x: 0.0, y: 0.0 };
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
    .style("stroke-width", "1.0")
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

  wireframe.append("path")
    .attr("class", "svg_line")
    .classed('selected', true)
    .attr("fill", '#ff7b00')
    .style("stroke-width", "3.0")
    .style('opacity', 0.2)
    .attr("d", drawLine(botVertices));
  wireframe.append("path")
    .attr("class", "svg_line")
    .classed('selected', true)
    .attr("fill", "none")
    .style("stroke-width", "3.0")
    .attr("d", drawLine(botVertices));
}

function setStatHighlight(obj, statIdx, enlarge)
{
  if(statPieHighlight != statIdx)
  {
    d3.select(obj).attr('d', enlarge ? largeArc : smallArc).attr('fill', enlarge ? ((statIdx == statIndex.Extra) ? colour[2] : colour[1]) : colour[0] ); 
    statPieHighlight = statIdx;
    drawStatHighlight();
  }
}

function drawStatHighlight()
{
  clearSvg(statsHighlightImages);
  clearSvg(statsHighlightTable);

  // Draw selected bot
  statsHighlightImages.append('g')
    .append('image').attr('class', 'svg_image')
      .attr('width', 80)
      .attr('height', 80)
      .attr("transform", function(d) { return "translate(20, 30)"; })
      .attr('href', botImageLookup[statBotSelected])
      .attr('filter', 'invert(100%)')
      .attr('alt', botNameLookup[statBotSelected])
  statsHighlightImages.append('g')
    .append('image').attr('class', 'svg_image')
      .attr('width', 80)
      .attr('height', 80)
      .attr("transform", function(d) { return "translate(100, 30)"; })
      .attr('href', statImageLookup[statPieHighlight])
      .attr('filter', 'invert(100%)')
      .attr('alt', statNameLookup[statPieHighlight])

  if(statPieHighlight != -1)
  {
    // Create table header
    var topStat = statsHighlightTable.append('thead').append('tr');
    topStat.append('th').attr('class', 'table_hr_cornersticky')
      .text("");
    topStat.append('th').attr('class', 'table_hr_sticky')
      .text("Bot");
    topStat.append('th').attr('class', 'table_hr_sticky')
      .text("Compare");

    if(statPieHighlight < statIndex.Extra)
    {
      var value = GlobalData.bots[statBotSelected][statNameLookup[statPieHighlight]];
      var weight = GlobalData.regStats[statBotSelected][statNameLookup[statPieHighlight]];
      var score = value * weight;
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
        .text(parseInt(100.0*compareBot[statNameLookup[statPieHighlight]].value)/100.0);

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
        .text(parseInt(100.0*compareBot[statNameLookup[statPieHighlight]].weight)/100.0);

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
        .text(parseInt(100.0*compareBot[statNameLookup[statPieHighlight]].score)/100.0);

      row = statsHighlightTable.append('tbody').append('tr')
      newCell = row.append('td').attr('class', 'table_cell').style('width', '20%')
        .append('text')
          .attr('alt', "Measure Percent")
          .text('Percent');
      newCell = row.append('td').attr('class', 'table_cell').style('width', '40%')
        .append('text')
          .attr('alt', "Percent")
          .text(parseInt(100.0*percent)/100.0);
      newCell = row.append('td').attr('class', 'table_cell').style('width', '40%')
        .attr('alt', "Compare Percent")
        .text(parseInt(100.0*compareBot[statNameLookup[statPieHighlight]].wtPct)/100.0);
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

  var selectedScore = 0.0;
  for(const property in GlobalData.regStats[statBotSelected])
  {
    selectedScore += GlobalData.regStats[statBotSelected][property] * GlobalData.bots[statBotSelected][property];
  };

  for(var statIdx = 0; statIdx < statCount; ++statIdx)
  {
    var row = statsTable.append('tbody').append('tr')
    var newCell = row.append('td').attr('class', 'table_cell').style('width', '10%')
    var cellRow = newCell.append('div').attr('class', 'row row-cols-2')
      cellRow.append('div').attr('class', 'col')
        .style('width', '10%')
        .append('img')
          .attr('src', statImageLookup[statIdx])
          .attr('alt', statNameLookup[statIdx]);
      //.append('text')
      //  .attr('alt', "Symbol")
      //  .text(statImageLookup[statIdx]);
    newCell = row.append('td').attr('class', 'table_cell').style('width', '20%')
      .append('text')
        .attr('alt', "Measure Value")
        .text(statNameLookup[statIdx]);
    var value = GlobalData.bots[statBotSelected][statNameLookup[statIdx]];
    var weight = GlobalData.regStats[statBotSelected][statNameLookup[statIdx]];
    var score = weight*value;
    newCell = row.append('td').attr('class', 'table_cell').style('width', '17%')
      .append('text')
        .attr('alt', "Value")
        .text(parseInt(100.0*value)/100.0);
    newCell = row.append('td').attr('class', 'table_cell').style('width', '17%')
      .append('text')
        .attr('alt', "Weight")
        .text(parseInt(100.0*weight)/100.0);
    newCell = row.append('td').attr('class', 'table_cell').style('width', '17%')
      .append('text')
        .attr('alt', "Score")
        .text(parseInt(100.0*score)/100.0);
    newCell = row.append('td').attr('class', 'table_cell').style('width', '17%')
      .append('text')
        .attr('alt', "Percent")
        .text(parseInt(100.0*score/selectedScore)/100.0);
  }
}
