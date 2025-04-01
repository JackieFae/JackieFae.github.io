
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
d3.select("#selectCorSlug").on("change", function() {
  selectCorrelationBase();
});

function selectCorrelationBase() {
  correlationBot = d3.select("#selectCorSlug").property("value");
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
  const filterFoeData = data.slice(botTechMap[5] + 1/*Skill*/ + botTechMap[0], botTechMap[5] + 1/*Skill*/ + botTechMap[5]);
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
      if(d.correlationID != correlationBot + 50)
      {
        var outputRatio = d[correlationOutputSelect] / graphBot[correlationOutputSelect];
        if(correlationOutputSelect == "AdvantagedWins" || correlationOutputSelect == "PickPct")
        {
          var outputRatio = (d[correlationOutputSelect] - graphBot[correlationOutputSelect])/100.0;
        }
        if((cBinThresholds[i] <= outputRatio) && (outputRatio < cBinThresholds[i+1]))
        {
          binnedData[i].foe[binnedData[i].foe.length] = d;
        }
      }
    });
  }

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
      var ref = botImageLookup[d.correlationID - 50];
      var name = botNameLookup[d.correlationID - 50];
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
}

function drawCorrelationGraph2(graph, table, data)
{
  graph.selectAll('*').remove();

  const graphWidth = botCount * 35 + margin.left + margin.right;
  graph.attr("width", graphWidth + 35);
  const svg = graph.append('g')
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const filterData = data.slice(botTechMap[0], botTechMap[5]);
  const sortedData = filterData.slice().sort((a,b) => d3.ascending(a[correlationOutputSelect], b[correlationOutputSelect]));

  const yExtents = d3.extent(sortedData, d => d[correlationOutputSelect]);
  const minYExtent = Math.min(0.0, yExtents[0]);
  const maxYExtent = Math.max(0.0, yExtents[1]);
  const minHeight = 0.0;
  const maxHeight = height;
  const centerH = (maxHeight - minHeight) * Math.max(0, (maxYExtent)) / (maxYExtent - minYExtent);

  const numRegVars = sortedData.length - 1;
  const rectSpacing = 1;
  const rectWidth = (graphWidth / numRegVars) - rectSpacing;
  var zeroPos = 0;
  sortedData.forEach((d, i) => {
    if(d[correlationOutputSelect] < 0.0)
    {
      zeroPos = i + 1;
    }
  });
  const centerW = graphWidth * Math.max(0, (zeroPos)) / numRegVars;

  var lineCount = 0;
  sortedData.forEach(function(d, i) {
    const botIdx = d.correlationID;
    if(botIdx != correlationBot)
    {
      const plotVal = d[correlationOutputSelect];
      const plotDiff = d[correlationOutputSelect+"Diff"];
      const lowerBoundValue = Math.min(-plotVal, 0);
      const upperBoundValue = Math.max(-plotVal, 0) - lowerBoundValue;
      const lowerBoundDiff = Math.min(-plotVal, -plotVal + plotDiff);
      const upperBoundDiff = Math.abs(plotDiff);
      svg.append('rect').attr('class', 'svg_background')
        .attr('x', lineCount * (rectWidth + rectSpacing))
        .attr('y', 40.0 + 0.0)
        .attr('width', rectWidth)
        .attr('height', height)
        .attr('filter', 'invert(97.27%)')
        .on('mouseenter', () => setCorrelationInputHighlight(graph, table, d.name))
        .on('mouseleave', () => setCorrelationInputHighlight(graph, table, null))
        .on('click', () => setCorrelationInputSelect(graph, table, d.name))
      svg.append('rect').attr('class', 'svg_shape')
        .attr('x', lineCount * (rectWidth + rectSpacing))
        .attr('y', 40.0 + centerH + lowerBoundValue / maxYExtent * centerH)
        .attr('width', rectWidth)
        .attr('height', upperBoundValue / maxYExtent * centerH)
        .attr('alt', d.name)
        .on('mouseenter', () => setCorrelationInputHighlight(graph, table, d.name))
        .on('mouseleave', () => setCorrelationInputHighlight(graph, table, null))
        .on('click', () => setCorrelationInputSelect(graph, table, d.name));
      rectType = '';
      if(plotDiff < 0)
      {
        rectType = 'svg_shape_tertiary';
      }
      else if(plotDiff > 0)
      {
        rectType = 'svg_shape_secondary';
      }
      if(plotDiff != 0)
      {
        svg.append('rect').attr('class', rectType)
          .attr('x', lineCount * (rectWidth + rectSpacing))
          .attr('y', 40.0 + centerH + lowerBoundDiff / maxYExtent * centerH)
          .attr('width', rectWidth)
          .attr('height', upperBoundDiff / maxYExtent * centerH)
          .attr('alt', d.name)
          .on('mouseenter', () => setCorrelationInputHighlight(graph, table, d.name))
          .on('mouseleave', () => setCorrelationInputHighlight(graph, table, null))
          .on('click', () => setCorrelationInputSelect(graph, table, d.name));
      }
      if((d.name != "Intercept") && (d.name != "Skill"))
      {
        var offset = 0;
        if(Math.sign(plotVal) > 0)
        {
          offset = -rectWidth + (Math.min(-plotVal, -plotVal + plotDiff) / maxYExtent) * centerH;
        }
        else
        {
          offset = ((-plotVal + Math.max(plotDiff, 0)) / maxYExtent) * centerH;
        }
        svg.append('image').attr('class', 'svg_image')
          .attr('x', lineCount * (rectWidth + rectSpacing))
          .attr('y', 40.0 + centerH + offset)
          .attr('width', rectWidth)
          .attr('height', rectWidth)
          .attr('filter', 'invert(100%)')
          .attr('href', `res/images/units/${d.name.toLowerCase().replace(/\s+/g,'')}.png`)
          .attr('alt', d.name)
          .on('mouseenter', () => setCorrelationInputHighlight(graph, table, d.name))
          .on('mouseleave', () => setCorrelationInputHighlight(graph, table, null))
          .on('click', () => setCorrelationInputSelect(graph, table, d.name));
      }
      lineCount++;
    }
  });

  // Add X axis
  const x = d3.scaleLinear()
    .domain([1, numRegVars])
    .range([0, graphWidth]);
  svg.append("g")
    .attr("transform", `translate(0,${40.0 + centerH})`)
    .call(
      d3.axisBottom(x).tickValues(x.domain()));

  // Add Y axis
  const y = d3.scaleLinear()
  .domain(minYExtent, maxYExtent)
  .range([height, 0]);
  svg.append("g")
    .attr("transform", `translate(${centerW},${40.0})`)
    .call(
      d3.axisRight(y)
        .tickValues(y.domain()).tickFormat((d) => d + '%') // Custom format to convert decimal to percentage
    );

  svg.append('text').attr('class', 'svg_text')
    .text(GlobalData.count + " / " + GlobalData.countBase + " iterations");

  var temp = correlationSelect;
  setCorrelationInputSelect(graph, table, null);
  setCorrelationInputSelect(graph, table, temp);
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
    graph.select(`rect[alt="${correlationSelect}"]`).classed('selected', false);
    graph.select(`image[alt="${correlationSelect}"]`).classed('selected', false);
    graph.select(`rect[alt="${name}"]`).classed('selected', true);
    graph.select(`image[alt="${name}"]`).classed('selected', true);

    table.selectAll(`img[alt="${correlationSelect}"]`).classed('highlighted', false);
    table.selectAll(`text[alt="${correlationSelect}"]`).classed('highlighted', false);
    table.select(`img[alt="${correlationSelect}"]`).classed('selected', false);
    table.selectAll(`text[alt="${correlationSelect}"]`).classed('selected', false);
    table.select(`img[alt="${name}"]`).classed('selected', true);
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
