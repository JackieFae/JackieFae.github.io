
const cNumBins = 5;
const cBinThresholds = [-10000000000, -0.2, -0.05, 0.05, 0.2, 10000000000];
const cBinWidth = 850/cNumBins;
const cBinHeight = 200;

const correlationGraph = d3.select('#viz-correlation').append('div').attr('class', 'overflow-auto')
  .append('svg')
  .attr('width', '900px')
  .attr("height", 2*cBinHeight + margin.top + margin.bottom);
const correlationTable = d3.select('#table-correlation').append('div').attr('class', 'overflow-auto')
  .style('width', '100%')
  .style('height', '250px')
  .append('table')
    .style('width', '100%');

var botRegData = [];
var correlationBot = 0;
var correlationSelect = null;
var correlationHighlight = null;
var correlationOutputSelect = null;
var correlationOutputHighlight = null;

// Add event listener to the select box
var corrSelectButton = d3.select('#corrBotButton');
d3.select('#corrBotCrab').on('click', () => selectCorrelationBase(d3.select("#corrBotCrab").attr('value')));
d3.select('#corrBotHunter').on('click', () => selectCorrelationBase(d3.select("#corrBotHunter").attr('value')));
d3.select('#corrBotGuardianShield').on('click', () => selectCorrelationBase(d3.select("#corrBotGuardianShield").attr('value')));
d3.select('#corrBotRecall').on('click', () => selectCorrelationBase(d3.select("#corrBotRecall").attr('value')));
d3.select('#corrBotRecallHunter').on('click', () => selectCorrelationBase(d3.select("#corrBotRecallHunter").attr('value')));
d3.select('#corrBotScorpion').on('click', () => selectCorrelationBase(d3.select("#corrBotScorpion").attr('value')));
d3.select('#corrBotBeetle').on('click', () => selectCorrelationBase(d3.select("#corrBotBeetle").attr('value')));
d3.select('#corrBotBlink').on('click', () => selectCorrelationBase(d3.select("#corrBotBlink").attr('value')));
d3.select('#corrBotBlinkHunter').on('click', () => selectCorrelationBase(d3.select("#corrBotBlinkHunter").attr('value')));
d3.select('#corrBotGunbot').on('click', () => selectCorrelationBase(d3.select("#corrBotGunbot").attr('value')));
d3.select('#corrBotMissilebot').on('click', () => selectCorrelationBase(d3.select("#corrBotMissilebot").attr('value')));
d3.select('#corrBotWasp').on('click', () => selectCorrelationBase(d3.select("#corrBotWasp").attr('value')));
d3.select('#corrBotHornet').on('click', () => selectCorrelationBase(d3.select("#corrBotHornet").attr('value')));
d3.select('#corrBotKnight').on('click', () => selectCorrelationBase(d3.select("#corrBotKnight").attr('value')));
d3.select('#corrBotCrossbow').on('click', () => selectCorrelationBase(d3.select("#corrBotCrossbow").attr('value')));
d3.select('#corrBotBallista').on('click', () => selectCorrelationBase(d3.select("#corrBotBallista").attr('value')));
d3.select('#corrBotKingCrab').on('click', () => selectCorrelationBase(d3.select("#corrBotKingCrab").attr('value')));
d3.select('#corrBotCrusader').on('click', () => selectCorrelationBase(d3.select("#corrBotCrusader").attr('value')));
d3.select('#corrBotBomber').on('click', () => selectCorrelationBase(d3.select("#corrBotBomber").attr('value')));
d3.select('#corrBotShocker').on('click', () => selectCorrelationBase(d3.select("#corrBotShocker").attr('value')));
d3.select('#corrBotRecallShocker').on('click', () => selectCorrelationBase(d3.select("#corrBotRecallShocker").attr('value')));
d3.select('#corrBotMortar').on('click', () => selectCorrelationBase(d3.select("#corrBotMortar").attr('value')));
d3.select('#corrBotSwiftShocker').on('click', () => selectCorrelationBase(d3.select("#corrBotSwiftShocker").attr('value')));
d3.select('#corrBotHeavyHunter').on('click', () => selectCorrelationBase(d3.select("#corrBotHeavyHunter").attr('value')));
d3.select('#corrBotDestroyer').on('click', () => selectCorrelationBase(d3.select("#corrBotDestroyer").attr('value')));
d3.select('#corrBotRaider').on('click', () => selectCorrelationBase(d3.select("#corrBotRaider").attr('value')));
d3.select('#corrBotTurret').on('click', () => selectCorrelationBase(d3.select("#corrBotTurret").attr('value')));
d3.select('#corrBotHeavyBallista').on('click', () => selectCorrelationBase(d3.select("#corrBotHeavyBallista").attr('value')));
d3.select('#corrBotGargantua').on('click', () => selectCorrelationBase(d3.select("#corrBotGargantua").attr('value')));
d3.select('#corrBotSniper').on('click', () => selectCorrelationBase(d3.select("#corrBotSniper").attr('value')));
d3.select('#corrBotAdvancedBlink').on('click', () => selectCorrelationBase(d3.select("#corrBotAdvancedBlink").attr('value')));
d3.select('#corrBotAssaultbot').on('click', () => selectCorrelationBase(d3.select("#corrBotAssaultbot").attr('value')));
d3.select('#corrBotAdvancedbot').on('click', () => selectCorrelationBase(d3.select("#corrBotAdvancedbot").attr('value')));
d3.select('#corrBotBehemoth').on('click', () => selectCorrelationBase(d3.select("#corrBotBehemoth").attr('value')));
d3.select('#corrBotAdvancedMortar').on('click', () => selectCorrelationBase(d3.select("#corrBotAdvancedMortar").attr('value')));
d3.select('#corrBotBlaster').on('click', () => selectCorrelationBase(d3.select("#corrBotBlaster").attr('value')));
d3.select('#corrBotButterfly').on('click', () => selectCorrelationBase(d3.select("#corrBotButterfly").attr('value')));
d3.select('#corrBotDragonfly').on('click', () => selectCorrelationBase(d3.select("#corrBotDragonfly").attr('value')));
d3.select('#corrBotFalcon').on('click', () => selectCorrelationBase(d3.select("#corrBotFalcon").attr('value')));
d3.select('#corrBotAirship').on('click', () => selectCorrelationBase(d3.select("#corrBotAirship").attr('value')));
d3.select('#corrBotAdvancedRecall').on('click', () => selectCorrelationBase(d3.select("#corrBotAdvancedRecall").attr('value')));
d3.select('#corrBotMammoth').on('click', () => selectCorrelationBase(d3.select("#corrBotMammoth").attr('value')));
d3.select('#corrBotStinger').on('click', () => selectCorrelationBase(d3.select("#corrBotStinger").attr('value')));
d3.select('#corrBotFlakTurret').on('click', () => selectCorrelationBase(d3.select("#corrBotFlakTurret").attr('value')));
d3.select('#corrBotBulwark').on('click', () => selectCorrelationBase(d3.select("#corrBotBulwark").attr('value')));
d3.select('#corrBotKatbus').on('click', () => selectCorrelationBase(d3.select("#corrBotKatbus").attr('value')));
d3.select('#corrBotLocust').on('click', () => selectCorrelationBase(d3.select("#corrBotLocust").attr('value')));
d3.select('#corrBotKraken').on('click', () => selectCorrelationBase(d3.select("#corrBotKraken").attr('value')));
d3.select('#corrBotPredator').on('click', () => selectCorrelationBase(d3.select("#corrBotPredator").attr('value')));
d3.select('#corrBotValkyrie').on('click', () => selectCorrelationBase(d3.select("#corrBotValkyrie").attr('value')));
d3.select('#corrBotArtillery').on('click', () => selectCorrelationBase(d3.select("#corrBotArtillery").attr('value')));
d3.select('#corrBotAdvancedDestroyer').on('click', () => selectCorrelationBase(d3.select("#corrBotAdvancedDestroyer").attr('value')));
d3.select('#corrBotShade').on('click', () => selectCorrelationBase(d3.select("#corrBotShade").attr('value')));

function selectCorrelationBase(value)
{
  corrSelectButton.select('img').attr('src', botImageLookup[value]);
  corrSelectButton.select('span').text(botNameLookup[value]);
  correlationBot = value;//d3.select("#selectCorSlug").property("value");
  drawCorrelation();
}

function drawCorrelation()
{
  botRegData = GlobalData.regData[correlationBot]

  drawCorrelationTable(correlationGraph, correlationTable, botRegData);
  if(correlationOutputSelect == null)
  {
    setCorrelationOutputSelect(correlationGraph, correlationTable, "WeightRes");
  }
  else
  {
    drawCorrelationGraph(correlationGraph, correlationTable, botRegData);
  }
  setCorrelationInputHighlight(correlationGraph, correlationTable, correlationHighlight);
  setCorrelationInputSelect(correlationGraph, correlationTable, correlationSelect);
}

function drawCorrelationGraph(graph, table, data)
{
  graph.selectAll('*').remove();
  
  const svg = graph.append('g')
    .attr("transform", `translate(${margin.left+25},${margin.top})`);

  const filterFriendData = data.slice(botTechMap[0], botTechMap[5]);
  const sortedFriendData = filterFriendData.slice().sort((a,b) => d3.ascending(a[correlationOutputSelect], b[correlationOutputSelect]));
  const filterFoeData = data.slice(botTechMap[5] + 2/*Skill & Aggression*/ + botTechMap[0], botTechMap[5] + 2/*Skill & Aggression*/ + botTechMap[5]);
  const sortedFoeData = filterFoeData.slice().sort((a,b) => d3.ascending(a[correlationOutputSelect], b[correlationOutputSelect]));

  const graphBot = GlobalData.regData[correlationBot][correlationBot];

  const binnedData = []
  for(var i = 0; i < cNumBins; ++i)
  {
    binnedData[i] = {friend: [], foe: []};
    sortedFriendData.forEach((d, j) => {
      if(d.correlationID != correlationBot)
      {
        var outputRatio = d[correlationOutputSelect] / graphBot[correlationOutputSelect];
        if(correlationOutputSelect == "AdvantagedWins" || correlationOutputSelect == "PickPct")
        {
          var outputRatio = (d[correlationOutputSelect] - graphBot[correlationOutputSelect])/100.0;
        }
        if((cBinThresholds[i] <= outputRatio) && (outputRatio < cBinThresholds[i+1]))
        {
          binnedData[i].friend[binnedData[i].friend.length] = d;
        }
      }
    });
    sortedFoeData.forEach((d, j) => {
      if(d.correlationID != correlationBot + (botCount + 2))
      {
        var outputRatio = d[correlationOutputSelect] / graphBot[correlationOutputSelect];
        if(correlationOutputSelect == "AdvantagedWins" || correlationOutputSelect == "PickPct")
        {
          var outputRatio = (d[correlationOutputSelect] - graphBot[correlationOutputSelect]) / 100.0;
        }
        if((cBinThresholds[i] <= outputRatio) && (outputRatio < cBinThresholds[i+1]))
        {
          binnedData[i].foe[binnedData[i].foe.length] = d;
        }
      }
    });
  }

  // Draw labels for groups.
  svg.append('g').append('text').attr('class', 'svg_text')
    .attr('x', -0.5 * cBinHeight)
    .attr('y', 0)
    .style('font-size', '20px')
    .style("text-anchor", "middle")
    .style('transform', 'rotate(-90deg)')
    .text('Friends');
  svg.append('g').append('text').attr('class', 'svg_text')
    .attr('x', -1.5 * cBinHeight)
    .attr('y', 0)
    .style('font-size', '20px')
    .style("text-anchor", "middle")
    .style('transform', 'rotate(-90deg)')
    .text('Foes');
  // Draw lines for bins.
  svg.append("line").attr('class', 'svg_line')
    .attr("x1", 0)
    .attr("x2", 5*cBinWidth)
    .attr("y1", cBinHeight)
    .attr("y2", cBinHeight);
  for(var i = 1; i < cNumBins; ++i)
  {
    svg.append("line").attr('class', 'svg_line')
      .attr("x1", i*cBinWidth)
      .attr("x2", i*cBinWidth)
      .attr("y1", 0)
      .attr("y2", 2*cBinHeight);
    svg.append('g').append('text').attr('class', 'svg_text')
      .attr('x', i*cBinWidth)
      .attr('y', -4)
      .style('font-size', '20px')
      .style("text-anchor", "middle")
      .text((cBinThresholds[i] >= 0.0 ? "+" : "") + parseInt(cBinThresholds[i] * 100.0) + "%");
  }

  for(var i = 0; i < cNumBins; ++i)
  {
    var friendScale = binnedData[i].friend.length > 16.0 ? Math.ceil(binnedData[i].friend.length / 5.0) : 4.0;
    var friendRows = Math.ceil(binnedData[i].friend.length / friendScale);
    var friendImageScale = 40 * 4.0 / friendScale;
    binnedData[i].friend.forEach((d, j) => {
      var y = Math.floor(j % friendRows)+1;
      var x = Math.floor(j / friendRows);
      var ref = botImageLookup[d.correlationID];
      var name = botNameLookup[d.correlationID];
      svg.append('image').attr('class', 'svg_image')
        .attr('x', x*friendImageScale + i * cBinWidth + 5)
        .attr('y', -y*friendImageScale + cBinHeight)
        .attr('width', friendImageScale)
        .attr('height', friendImageScale)
        .attr('filter', 'invert(100%)')
        .attr('href', ref)
        .attr('alt', name)
        .on('mouseenter', () => setCorrelationInputHighlight(graph, table, name))
        .on('mouseleave', () => setCorrelationInputHighlight(graph, table, null))
        .on('click', () => setCorrelationInputSelect(graph, table, name));
    });

    var foeScale = binnedData[i].foe.length > 16.0 ? Math.ceil(binnedData[i].foe.length / 5.0) : 4.0;
    var foeRows = Math.ceil(binnedData[i].foe.length / foeScale);
    var foeImageScale = 40 * 4.0 / foeScale;
    binnedData[i].foe.forEach((d, j) => {
      var y = Math.floor(j % foeRows);
      var x = Math.floor(j / foeRows);
      var ref = botImageLookup[d.correlationID - (botCount + 2)];
      var name = botNameLookup[d.correlationID - (botCount + 2)];
      svg.append('image').attr('class', 'svg_image')
        .attr('x', x*foeImageScale + i * (cBinWidth) + 5)
        .attr('y', y*foeImageScale + cBinHeight)
        .attr('width', foeImageScale)
        .attr('height', foeImageScale)
        .attr('filter', 'invert(100%)')
        .attr('href', ref)
        .attr('alt', name)
        .on('mouseenter', () => setCorrelationInputHighlight(graph, table, name))
        .on('mouseleave', () => setCorrelationInputHighlight(graph, table, null))
        .on('click', () => setCorrelationInputSelect(graph, table, name));
    });
  }

  if(correlationOutputSelect == "Weight")
  {
    svg.append('text').attr('class', 'svg_text')
      .text("Weight");
  }
  else if(correlationOutputSelect == "WeightRes")
  {
    svg.append('text').attr('class', 'svg_text')
      .text("Weight / Resource");
  }
  else if(correlationOutputSelect == "WeightBW")
  {
    svg.append('text').attr('class', 'svg_text')
      .text("Weight / Bandwidth");
  }
  else if(correlationOutputSelect == "AdvantagedWins")
  {
    svg.append('text').attr('class', 'svg_text')
      .text("Win %");
  }
  else if(correlationOutputSelect == "PickPct")
  {
    svg.append('text').attr('class', 'svg_text')
      .text("Pick %");
  }
}

function drawCorrelationTable(graph, table, data)
{
  table.selectAll("*").remove();

  const filterData = data.slice(botTechMap[0], botTechMap[5]);

  // Create table header
  var topCor = table.append('thead').append('tr');
  topCor.append('th').attr('class', 'table_hr_cornersticky')
    .text("Icon");
  topCor.append('th').attr('class', 'table_hr_sticky')
    .text("Variable");
  topCor.append('th').attr('class', 'table_hr_sticky')
    .text("Weight")
    .attr('alt', "Weight")
    .on('mouseenter', () => setCorrelationOutputHighlight(graph, table, "Weight"))
    .on('mouseleave', () => setCorrelationOutputHighlight(graph, table, null))
    .on('click', () => setCorrelationOutputSelect(graph, table, "Weight"));
  topCor.append('th').attr('class', 'table_hr_sticky')
    .text("Weight / Res (%)")
    .attr('alt', "WeightRes")
    .on('mouseenter', () => setCorrelationOutputHighlight(graph, table, "WeightRes"))
    .on('mouseleave', () => setCorrelationOutputHighlight(graph, table, null))
    .on('click', () => setCorrelationOutputSelect(graph, table, "WeightRes"));
    topCor.append('th').attr('class', 'table_hr_sticky')
      .text("Weight / BW")
      .attr('alt', "WeightBW")
      .on('mouseenter', () => setCorrelationOutputHighlight(graph, table, "WeightBW"))
      .on('mouseleave', () => setCorrelationOutputHighlight(graph, table, null))
      .on('click', () => setCorrelationOutputSelect(graph, table, "WeightBW"));
  topCor.append('th').attr('class', 'table_hr_sticky')
    .text("Win %")
    .attr('alt', "AdvantagedWins")
    .on('mouseenter', () => setCorrelationOutputHighlight(graph, table, "AdvantagedWins"))
    .on('mouseleave', () => setCorrelationOutputHighlight(graph, table, null))
    .on('click', () => setCorrelationOutputSelect(graph, table, "AdvantagedWins"));
  //topCor.append('th').attr('class', 'table_hr_sticky')
  //  .text("% Dis Win")
  //  .attr('alt', "DisadvantagedWins")
  //  .on('mouseenter', () => setCorrelationOutputHighlight(graph, table, "DisadvantagedWins"))
  //  .on('mouseleave', () => setCorrelationOutputHighlight(graph, table, null))
  //  .on('click', () => setCorrelationOutputSelect(graph, table, "DisadvantagedWins"));
  topCor.append('th').attr('class', 'table_hr_sticky')
    .text("Pick %")
    .attr('alt', "PickPct")
    .on('mouseenter', () => setCorrelationOutputHighlight(graph, table, "PickPct"))
    .on('mouseleave', () => setCorrelationOutputHighlight(graph, table, null))
    .on('click', () => setCorrelationOutputSelect(graph, table, "PickPct"));
  // Create table body
  filterData.forEach(function(d, i) {
    const botIdx = d.correlationID;
    if(botIdx != correlationBot)
    {
      var row = table.append('tbody').append('tr')
        .on('mouseenter', () => setCorrelationInputHighlight(graph, table, d.name))
        .on('mouseleave', () => setCorrelationInputHighlight(graph, table, null))
        .on('click', () => setCorrelationInputSelect(graph, table, d.name));
      var cell = row.append('td')
        .attr('class', 'table_cell_sticky').style('width', '10%');
      if(botIdx-1 < botImageLookup.length) {
        var cellRow = cell.append('div').attr('class', 'row row-cols-2')
        cellRow.append('div').attr('class', 'col')
          .style('width', '40%')
          .append('img')
            .attr('src', `res/images/units/${d.name.toLowerCase().replace(/\s+/g,'')}.png`)
            .attr('alt', d.name);
        // TODO: Restore when sub-values are finished. if(d.name != "Skill")
        // TODO: Restore when sub-values are finished. {
        // TODO: Restore when sub-values are finished.   if(correlationExpansion != d.name)
        // TODO: Restore when sub-values are finished.   {
        // TODO: Restore when sub-values are finished.     cellRow.append('div').attr('class', 'col')
        // TODO: Restore when sub-values are finished.       .style('width', '40%')
        // TODO: Restore when sub-values are finished.       .append('text')
        // TODO: Restore when sub-values are finished.         .style('font-size', '40px')
        // TODO: Restore when sub-values are finished.         .text('+')
        // TODO: Restore when sub-values are finished.         .attr('alt', d.name)
        // TODO: Restore when sub-values are finished.         .on('click', () => expandSelection(d.name));
        // TODO: Restore when sub-values are finished.   }
        // TODO: Restore when sub-values are finished.   else
        // TODO: Restore when sub-values are finished.   {
        // TODO: Restore when sub-values are finished.     cellRow.append('div').attr('class', 'col')
        // TODO: Restore when sub-values are finished.       .style('width', '40%')
        // TODO: Restore when sub-values are finished.       .append('text')
        // TODO: Restore when sub-values are finished.         .style('font-size', '40px')
        // TODO: Restore when sub-values are finished.         .text('-')
        // TODO: Restore when sub-values are finished.         .attr('alt', d.name)
        // TODO: Restore when sub-values are finished.         .on('click', () => collapseSelection(d.name));
        // TODO: Restore when sub-values are finished.   }
        // TODO: Restore when sub-values are finished. }
      }
      var newCell = null;
      newCell = row.append('td').attr('class', 'table_cell').style('width', '15%')
        .append('text')
          .attr('alt', d.name)
          .text(d.name);
      newCell = row.append('td').attr('class', 'table_cell').style('width', '14%')
        .attr('alt', "Weight")
        .on('mouseenter', () => setCorrelationOutputHighlight(graph, table, "Weight"))
        .on('mouseleave', () => setCorrelationOutputHighlight(graph, table, null))
        .on('click', () => setCorrelationOutputSelect(graph, table, "Weight"));
      writeTableText(newCell, d.Weight, d.WeightDiff, d.name, 2);
      newCell = row.append('td').attr('class', 'table_cell').style('width', '14%')
        .attr('alt', "WeightRes")
        .on('mouseenter', () => setCorrelationOutputHighlight(graph, table, "WeightRes"))
        .on('mouseleave', () => setCorrelationOutputHighlight(graph, table, null))
        .on('click', () => setCorrelationOutputSelect(graph, table, "WeightRes"));
      writeTablePercent(newCell, d.WeightRes, d.WeightResDiff, d.name, 0);
      newCell = row.append('td').attr('class', 'table_cell').style('width', '14%')
        .attr('alt', "WeightBW")
        .on('mouseenter', () => setCorrelationOutputHighlight(graph, table, "WeightBW"))
        .on('mouseleave', () => setCorrelationOutputHighlight(graph, table, null))
        .on('click', () => setCorrelationOutputSelect(graph, table, "WeightBW"));
      writeTableText(newCell, d.WeightBW, d.WeightBWDiff, d.name, 0);
      newCell = row.append('td').attr('class', 'table_cell').style('width', '14%')
        .attr('alt', "AdvantagedWins")
        .on('mouseenter', () => setCorrelationOutputHighlight(graph, table, "AdvantagedWins"))
        .on('mouseleave', () => setCorrelationOutputHighlight(graph, table, null))
        .on('click', () => setCorrelationOutputSelect(graph, table, "AdvantagedWins"));
      writeTablePercent(newCell, d.AdvantagedWins, d.AdvantagedWinsDiff, d.name, 0);
      //newCell = row.append('td').attr('class', 'table_cell').style('width', '14%')
      //  .attr('alt', "DisadvantagedWins")
      //  .on('mouseenter', () => setCorrelationOutputHighlight(graph, table, "DisadvantagedWins"))
      //  .on('mouseleave', () => setCorrelationOutputHighlight(graph, table, null))
      //  .on('click', () => setCorrelationOutputSelect(graph, table, "DisadvantagedWins"));
      //writeTablePercent(newCell, d.DisadvantagedWins, d.DisadvantagedWinsDiff, d.name, 0);
      newCell = row.append('td').attr('class', 'table_cell').style('width', '14%')
        .attr('alt', "PickPct")
        .on('mouseenter', () => setCorrelationOutputHighlight(graph, table, "PickPct"))
        .on('mouseleave', () => setCorrelationOutputHighlight(graph, table, null))
        .on('click', () => setCorrelationOutputSelect(graph, table, "PickPct"));
      writeTablePercent(newCell, d.PickPct, d.PickPctDiff, d.name, 0);
      //if(correlationExpansion == d.name)
      //{
      //  for(var i = 0; i < 0; ++i)
      //  {
      //    var data = data[botIdx + i]
      //    var row = table.append('tbody').append('tr')
      //      .on('mouseenter', () => setCorrelationInputHighlight(graph, table, data.name))
      //      .on('mouseleave', () => setCorrelationInputHighlight(graph, table, null))
      //      .on('click', () => setCorrelationInputSelect(graph, table, data.name));
      //    var cell = row.append('td')
      //      .attr('class', 'table_cell_sticky').style('width', '10%');
      //    var cellRow = cell.append('div').attr('class', 'row row-cols-2')
      //    cellRow.append('div').attr('class', 'col')
      //      .style('width', '40%')
      //      .append('img')
      //        .attr('x', 10)
      //        .attr('src', statImageLookup[i])
      //        .attr('alt', statNameLookup[i]);
      //    cellRow.append('div').attr('class', 'col')
      //      .style('width', '40%')
      //      .append('text')
      //        .style('font-size', '40px')
      //        .text('');
      //    var newCell = null;
      //    newCell = row.append('td').attr('class', 'table_cell').style('width', '20%')
      //      .append('text')
      //      .attr('alt', statNameLookup[i])
      //      .text(statNameLookup[i]);
      //    newCell = row.append('td').attr('class', 'table_cell').style('width', '14%');
      //    writeTableText(newCell, data.Weight, data.WeightDiff, statNameLookup[i], 2);
      //    newCell = row.append('td').attr('class', 'table_cell').style('width', '14%');
      //    writeTablePercent(newCell, data.WeightRes, data.WeightResDiff, statNameLookup[i], 0);
      //    newCell = row.append('td').attr('class', 'table_cell').style('width', '14%');
      //    writeTablePercent(newCell, data.AdvantagedWins, data.AdvantagedWinsDiff, statNameLookup[i], 0);
      //    newCell = row.append('td').attr('class', 'table_cell').style('width', '14%');
      //    writeTablePercent(newCell, data.DisadvantagedWins, data.DisadvantagedWinsDiff, statNameLookup[i], 0);
      //    newCell = row.append('td').attr('class', 'table_cell').style('width', '14%');
      //    writeTablePercent(newCell, data.PickPct, data.PickPctDiff, statNameLookup[i], 0);
      //  };
      //}
    }
  });
}

function setCorrelationInputSelect(graph, table, name)
{
  if(correlationSelect != name)
  {
    graph.selectAll(`rect[alt="${correlationHighlight}"]`).classed('highlighted', false);
    graph.selectAll(`image[alt="${correlationHighlight}"]`).classed('highlighted', false);
    graph.selectAll(`rect[alt="${correlationSelect}"]`).classed('selected', false);
    graph.selectAll(`image[alt="${correlationSelect}"]`).classed('selected', false);
    graph.selectAll(`rect[alt="${name}"]`).classed('selected', true);
    graph.selectAll(`image[alt="${name}"]`).classed('selected', true);

    table.selectAll(`img[alt="${correlationSelect}"]`).classed('highlighted', false);
    table.selectAll(`text[alt="${correlationSelect}"]`).classed('highlighted', false);
    table.selectAll(`img[alt="${correlationSelect}"]`).classed('selected', false);
    table.selectAll(`text[alt="${correlationSelect}"]`).classed('selected', false);
    table.selectAll(`img[alt="${name}"]`).classed('selected', true);
    table.selectAll(`text[alt="${name}"]`).classed('selected', true);

    correlationSelect = name;
  }
}

function setCorrelationInputHighlight(graph, table, name)
{
  if(correlationHighlight != name && correlationSelect != name)
  {
    graph.selectAll(`img[alt="${correlationHighlight}"]`).classed('highlighted', false);
    graph.selectAll(`rect[alt="${correlationHighlight}"]`).classed('highlighted', false);
    graph.selectAll(`image[alt="${correlationHighlight}"]`).classed('highlighted', false);
    graph.selectAll(`img[alt="${name}"]`).classed('highlighted', true);
    graph.selectAll(`rect[alt="${name}"]`).classed('highlighted', true);
    graph.selectAll(`image[alt="${name}"]`).classed('highlighted', true);

    table.selectAll(`img[alt="${correlationHighlight}"]`).classed('highlighted', false);
    table.selectAll(`text[alt="${correlationHighlight}"]`).classed('highlighted', false);
    table.selectAll(`img[alt="${name}"]`).classed('highlighted', true);
    table.selectAll(`text[alt="${name}"]`).classed('highlighted', true);

    correlationHighlight = name;
  }
}

function setCorrelationOutputSelect(graph, table, name)
{
  if(correlationOutputSelect != name)
  {
    table.selectAll(`th[alt="${correlationOutputHighlight}"]`).style('font-style','');
    table.selectAll(`td[alt="${correlationOutputHighlight}"]`).style('font-style','');
    table.selectAll(`th[alt="${correlationOutputSelect}"]`).style('font-weight', '100');
    table.selectAll(`td[alt="${correlationOutputSelect}"]`).style('font-weight', '100');
    table.selectAll(`th[alt="${name}"]`).style('font-weight', '600');
    table.selectAll(`td[alt="${name}"]`).style('font-weight', '600');

    correlationOutputSelect = name;

    drawCorrelationGraph(graph, table, botRegData);
  }
}

function setCorrelationOutputHighlight(graph, table, name)
{
  if(correlationOutputHighlight != name && correlationOutputSelect != name)
  {
    table.selectAll(`th[alt="${correlationOutputHighlight}"]`).style('font-style','');
    table.selectAll(`td[alt="${correlationOutputHighlight}"]`).style('font-style','');
    table.selectAll(`th[alt="${name}"]`).style('font-style','italic');
    table.selectAll(`td[alt="${name}"]`).style('font-style','italic');

    correlationOutputHighlight = name;
  }
}
