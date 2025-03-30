
const regressionOverflow = d3.select('#viz-regression').append('div').attr('class', 'overflow-auto');
const regressionGraph = regressionOverflow.append('svg')
  .attr("height", 40 + height + margin.top + margin.bottom);
const regressionTable = d3.select('#table-regression').append('div').attr('class', 'overflow-auto')
  .style('width', '100%')
  .style('height', '250px')
  .append('table')
    .style('width', '100%');

var regGraphWidth = width;
var allBotRegData = [];
var regressionHighlight = null;
var regressionSelect = null;
var regressionOutputHighlight = null;
var regressionOutputSelect = null;
var techFilter = techIndex.core;
var traitFilter = traitIndex.any;
var manuFilter = manuIndex.any;

d3.select("#scoreTechSlug").on("change", function() {
  selectTechFilter();
});
d3.select("#scoreTraitSlug").on("change", function() {
  selectTraitFilter();
});
d3.select("#scoreManuSlug").on("change", function() {
  selectManuFilter();
});

var techButton = d3.select('#regFilterTechButton');
d3.select('#regFilterTechSlugAll').on('click', () => selectTechFilter(techIndex.any));
d3.select('#regFilterTechSlugCore').on('click', () => selectTechFilter(techIndex.core));
d3.select('#regFilterTechSlugFoundry').on('click', () => selectTechFilter(techIndex.foundry));
d3.select('#regFilterTechSlugAdvFoundry').on('click', () => selectTechFilter(techIndex.advfoundry));
d3.select('#regFilterTechSlugStarforge').on('click', () => selectTechFilter(techIndex.starforge));
d3.select('#regFilterTechSlugAdvStarforge').on('click', () => selectTechFilter(techIndex.advstarforge));

var traitButton = d3.select('#regFilterTraitButton');
d3.select('#regFilterTraitSlugAll').on('click', () => selectTraitFilter(traitIndex.any));
d3.select('#regFilterTraitSlugSwarming').on('click', () => selectTraitFilter(traitIndex.swarming));
d3.select('#regFilterTraitSlugPiercing').on('click', () => selectTraitFilter(traitIndex.piercing));
d3.select('#regFilterTraitSlugHulking').on('click', () => selectTraitFilter(traitIndex.hulking));
d3.select('#regFilterTraitSlugShattering').on('click', () => selectTraitFilter(traitIndex.shattering));
d3.select('#regFilterTraitSlugFlying').on('click', () => selectTraitFilter(traitIndex.flying));
d3.select('#regFilterTraitSlugHunting').on('click', () => selectTraitFilter(traitIndex.hunting));

var manuButton = d3.select('#regFilterManuButton');
d3.select('#regFilterManuSlugAll').on('click', () => selectManuFilter(manuIndex.any));
d3.select('#regFilterManuSlugNP').on('click', () => selectManuFilter(manuIndex.northperformance));
d3.select('#regFilterManuSlugFHC').on('click', () => selectManuFilter(manuIndex.farhorizoncollective));
d3.select('#regFilterManuSlugGoV').on('click', () => selectManuFilter(manuIndex.ghostsofvenus));
d3.select('#regFilterManuSlugSen').on('click', () => selectManuFilter(manuIndex.senkaishulimited));
d3.select('#regFilterManuSlugInS').on('click', () => selectManuFilter(manuIndex.irongandsons));
d3.select('#regFilterManuSlugCCS').on('click', () => selectManuFilter(manuIndex.coronacentralsystems));
d3.select('#regFilterManuSlugHUA').on('click', () => selectManuFilter(manuIndex.heavyunionalliance));

function selectTechFilter(value) {
  techFilter = value;
  techButton.select('img').attr('src', techImageLookup[techFilter]);
  techButton.select('span').text(techNameLookup[techFilter]);
  drawRegression();
}
function selectTraitFilter(value) {
  traitFilter = value;
  traitButton.select('img').attr('src', traitImageLookup[traitFilter]);
  traitButton.select('span').text(traitNameLookup[traitFilter]);
  drawRegression();
}
function selectManuFilter(value) {
  manuFilter = value;
  manuButton.select('img').attr('src', manuImageLookup[manuFilter]);
  manuButton.select('span').text(manuNameLookup[manuFilter]);
  drawRegression();
}

function drawRegression()
{
  GlobalData.regData.forEach(function(d, i) {
    allBotRegData[i] = d[i];
  });

  drawRegressionTable(regressionGraph, regressionTable, allBotRegData);
  if(regressionOutputSelect == null)
  {
    setRegressionOutputSelect(regressionGraph, regressionTable, "WeightRes");
  }
  else
  {
    drawRegressionGraph(regressionGraph, regressionTable, allBotRegData);
  }
  setRegressionInputHighlight(regressionGraph, regressionTable, regressionHighlight);
  setRegressionInputSelect(regressionGraph, regressionTable, regressionSelect);
}

function filterRegressionSelection(data)
{
  var filterData = data;
  if(techFilter != techIndex.any)
  {
    filterData = filterData.filter((d, i) => GlobalData.bots[d.ID].Tech == techFilter);
  }
  if(traitFilter != traitIndex.any)
  {
    filterData = filterData.filter((d, i) => (  (GlobalData.bots[d.ID].Swarming && (traitFilter == traitIndex.swarming))
                                             || (GlobalData.bots[d.ID].Piercing && (traitFilter == traitIndex.piercing))
                                             || (GlobalData.bots[d.ID].Hulking && (traitFilter == traitIndex.hulking))
                                             || (GlobalData.bots[d.ID].Shattering && (traitFilter == traitIndex.shattering))
                                             || (GlobalData.bots[d.ID].Flying && (traitFilter == traitIndex.flying))
                                             || (GlobalData.bots[d.ID].Hunting && (traitFilter == traitIndex.hunting))));
  }
  if(manuFilter != manuIndex.any)
  {
    filterData = filterData.filter((d, i) => GlobalData.bots[d.ID].Manu == manuFilter);
  }

  return filterData;
}

function drawRegressionGraph(graph, table, data)
{
  graph.selectAll('*').remove();

  var filterData = filterRegressionSelection(data);
  if(filterData.length == 0)
  {
    regressionGraph.append('g').append('text').attr('class', 'svg_text')
      .attr('x', width / 3.5)
      .attr('y', height / 2.0)
      .text('No regression was possible for the selected combination of filters.');
    return;
  }
  const sortedData = filterData.slice().sort((a,b) => d3.ascending(a[regressionOutputSelect], b[regressionOutputSelect]));

  regGraphWidth = Math.max(filterData.length * 35 + margin.left + margin.right, width);
  graph.attr("width", regGraphWidth + 35);
  const svg = graph.append('g')
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const yExtents = d3.extent(sortedData, d => d[regressionOutputSelect]);
  const minYExtent = Math.min(0.0, yExtents[0]);
  const maxYExtent = Math.max(0.0, yExtents[1]);
  const minHeight = 0.0;
  const maxHeight = height;
  const centerH = (maxHeight - minHeight) * Math.max(0, (maxYExtent)) / (maxYExtent - minYExtent);

  const numRegVars = sortedData.length;
  const rectSpacing = 1;
  const rectWidth = Math.min(60.0, (regGraphWidth / numRegVars) - rectSpacing);
  var zeroPos = 0;
  sortedData.forEach((d, i) => {
    if(d[regressionOutputSelect] < 0.0)
    {
      zeroPos = i + 1;
    }
  });
  const centerW = regGraphWidth * Math.max(0, (zeroPos)) / numRegVars;

  var lineCount = 0;
  sortedData.forEach(function(d, i) {
    const plotVal = d[regressionOutputSelect];
    const lowerBoundValue = Math.min(-plotVal, 0);
    const upperBoundValue = Math.max(-plotVal, 0) - lowerBoundValue;
    svg.append('rect').attr('class', 'svg_background')
      .attr('x', lineCount * (rectWidth + rectSpacing))
      .attr('y', 40.0 + 0.0)
      .attr('width', rectWidth)
      .attr('height', height)
      .attr('filter', 'invert(97.27%)')
      .on('mouseenter', () => setRegressionInputHighlight(graph, table, d.name))
      .on('mouseleave', () => setRegressionInputHighlight(graph, table, null))
      .on('click', () => setRegressionInputSelect(graph, table, d.name));
    svg.append('rect').attr('class', 'svg_shape')
      .attr('x', lineCount * (rectWidth + rectSpacing))
      .attr('y', 40.0 + centerH + lowerBoundValue / maxYExtent * centerH)
      .attr('width', rectWidth)
      .attr('height', upperBoundValue / maxYExtent * centerH)
      .attr('alt', d.name)
      .on('mouseenter', () => setRegressionInputHighlight(graph, table, d.name))
      .on('mouseleave', () => setRegressionInputHighlight(graph, table, null))
      .on('click', () => setRegressionInputSelect(graph, table, d.name));
    if((d.name != "Intercept") && (d.name != "Skill"))
    {
      if((techFilter == techIndex.any) || ((0 <= i) && (i < botTechMap[techFilter+1] - botTechMap[techFilter])))
      {
        var offset = 0;
        if(Math.sign(plotVal) > 0)
        {
          offset = -rectWidth + (-plotVal / maxYExtent) * centerH;
        }
        else
        {
          offset = (-plotVal / maxYExtent) * centerH;
        }
        svg.append('image').attr('class', 'svg_image')
          .attr('x', lineCount * (rectWidth + rectSpacing))
          .attr('y', 40.0 + centerH + offset)
          .attr('width', rectWidth)
          .attr('height', rectWidth)
          .attr('filter', 'invert(100%)')
          .attr('href', `res/images/units/${d.name.toLowerCase().replace(/\s+/g,'')}.png`)
          .attr('alt', d.name)
          .on('mouseenter', () => setRegressionInputHighlight(graph, table, d.name))
          .on('mouseleave', () => setRegressionInputHighlight(graph, table, null))
          .on('click', () => setRegressionInputSelect(graph, table, d.name));
        lineCount++;
      }
    }
  });

  // Add X axis
  const x = d3.scaleLinear()
    .domain([1, numRegVars])
    .range([0, regGraphWidth]);
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

  var temp = regressionSelect;
  setRegressionInputSelect(graph, table, null);
  setRegressionInputSelect(graph, table, temp);
}

function drawRegressionTable(graph, table, data)
{
  table.selectAll("*").remove();
  
  var filterData = filterRegressionSelection(data);
  if(filterData.length == 0)
  {
    regressionGraph.append('g').append('text').attr('class', 'svg_text')
      .attr('x', width / 3.5)
      .attr('y', height / 2.0)
      .text('No bots match the selected combination of filters.');
    return;
  }

  // Create table header
  var topReg = table.append('thead').append('tr');
  topReg.append('th').attr('class', 'table_hr_cornersticky')
    .text("Icon");
  topReg.append('th').attr('class', 'table_hr_sticky')
    .text("Variable");
  topReg.append('th').attr('class', 'table_hr_sticky')
    .text("Avg Score")
    .attr('alt', "AvgScore")
    .on('mouseenter', () => setRegressionOutputHighlight(graph, table, "AvgScore"))
    .on('mouseleave', () => setRegressionOutputHighlight(graph, table, null))
    .on('click', () => setRegressionOutputSelect(graph, table, "AvgScore"));
  topReg.append('th').attr('class', 'table_hr_sticky')
    .text("Weight")
    .attr('alt', "Weight")
    .on('mouseenter', () => setRegressionOutputHighlight(graph, table, "Weight"))
    .on('mouseleave', () => setRegressionOutputHighlight(graph, table, null))
    .on('click', () => setRegressionOutputSelect(graph, table, "Weight"));
  topReg.append('th').attr('class', 'table_hr_sticky')
    .text("Weight / Res (%)")
    .attr('alt', "WeightRes")
    .on('mouseenter', () => setRegressionOutputHighlight(graph, table, "WeightRes"))
    .on('mouseleave', () => setRegressionOutputHighlight(graph, table, null))
    .on('click', () => setRegressionOutputSelect(graph, table, "WeightRes"));
  topReg.append('th').attr('class', 'table_hr_sticky')
    .text("Weight / BW")
    .attr('alt', "WeightBW")
    .on('mouseenter', () => setRegressionOutputHighlight(graph, table, "WeightBW"))
    .on('mouseleave', () => setRegressionOutputHighlight(graph, table, null))
    .on('click', () => setRegressionOutputSelect(graph, table, "WeightBW"));
  topReg.append('th').attr('class', 'table_hr_sticky')
    .text("Win %")
    .attr('alt', "AdvantagedWins")
    .on('mouseenter', () => setRegressionOutputHighlight(graph, table, "AdvantagedWins"))
    .on('mouseleave', () => setRegressionOutputHighlight(graph, table, null))
    .on('click', () => setRegressionOutputSelect(graph, table, "AdvantagedWins"));
  topReg.append('th').attr('class', 'table_hr_sticky')
    .text("Pick %")
    .attr('alt', "PickPct")
    .on('mouseenter', () => setRegressionOutputHighlight(graph, table, "PickPct"))
    .on('mouseleave', () => setRegressionOutputHighlight(graph, table, null))
    .on('click', () => setRegressionOutputSelect(graph, table, "PickPct"));
  // Create table body
  filterData.forEach(function(d, i) {
    const botIdx = d.ID;
    if(botIdx == parseInt(botIdx))
    {
      var row = table.append('tbody').append('tr')
        .on('mouseenter', () => setRegressionInputHighlight(graph, table, d.name))
        .on('mouseleave', () => setRegressionInputHighlight(graph, table, null))
        .on('click', () => setRegressionInputSelect(graph, table, d.name));
      var cell = row.append('td')
        .attr('class', 'table_cell_sticky').style('width', '5%');
      if(botIdx-1 < botImageLookup.length) {
        var cellRow = cell.append('div').attr('class', 'row row-cols-2')
        cellRow.append('div').attr('class', 'col')
          .style('width', '40%')
          .append('img')
            .attr('src', `res/images/units/${d.name.toLowerCase().replace(/\s+/g,'')}.png`)
            .attr('alt', d.name);
      }
      var newCell = null;
      newCell = row.append('td').attr('class', 'table_cell').style('width', '12%')
        .append('text')
          .attr('alt', d.name)
          .text(d.name);
      newCell = row.append('td').attr('class', 'table_cell').style('width', '10%')
        .attr('alt', "AvgScore")
        .on('mouseenter', () => setRegressionOutputHighlight(graph, table, "AvgScore"))
        .on('mouseleave', () => setRegressionOutputHighlight(graph, table, null))
        .on('click', () => setRegressionOutputSelect(graph, table, "AvgScore"));
      writeTableText(newCell, d.AvgScore, d.AvgScoreDiff, d.name, 2);
      newCell = row.append('td').attr('class', 'table_cell').style('width', '10%')
        .attr('alt', "Weight")
        .on('mouseenter', () => setRegressionOutputHighlight(graph, table, "Weight"))
        .on('mouseleave', () => setRegressionOutputHighlight(graph, table, null))
        .on('click', () => setRegressionOutputSelect(graph, table, "Weight"));
      writeTableText(newCell, d.Weight, d.WeightDiff, d.name, 2);
      newCell = row.append('td').attr('class', 'table_cell').style('width', '10%')
        .attr('alt', "WeightRes")
        .on('mouseenter', () => setRegressionOutputHighlight(graph, table, "WeightRes"))
        .on('mouseleave', () => setRegressionOutputHighlight(graph, table, null))
        .on('click', () => setRegressionOutputSelect(graph, table, "WeightRes"));
      writeTablePercent(newCell, d.WeightRes, d.WeightResDiff, d.name, 0);
      newCell = row.append('td').attr('class', 'table_cell').style('width', '10%')
        .attr('alt', "WeightBW")
        .on('mouseenter', () => setRegressionOutputHighlight(graph, table, "WeightBW"))
        .on('mouseleave', () => setRegressionOutputHighlight(graph, table, null))
        .on('click', () => setRegressionOutputSelect(graph, table, "WeightBW"));
      writeTableText(newCell, d.WeightBW, d.WeightBWDiff, d.name, 2);
      newCell = row.append('td').attr('class', 'table_cell').style('width', '10%')
        .attr('alt', "AdvantagedWins")
        .on('mouseenter', () => setRegressionOutputHighlight(graph, table, "AdvantagedWins"))
        .on('mouseleave', () => setRegressionOutputHighlight(graph, table, null))
        .on('click', () => setRegressionOutputSelect(graph, table, "AdvantagedWins"));
      writeTablePercent(newCell, d.AdvantagedWins, d.AdvantagedWinsDiff, d.name, 0);
      newCell = row.append('td').attr('class', 'table_cell').style('width', '10%')
        .attr('alt', "PickPct")
        .on('mouseenter', () => setRegressionOutputHighlight(graph, table, "PickPct"))
        .on('mouseleave', () => setRegressionOutputHighlight(graph, table, null))
        .on('click', () => setRegressionOutputSelect(graph, table, "PickPct"));
      writeTablePercent(newCell, d.PickPct, d.PickPctDiff, d.name, 0);
    }
  });
}

function setRegressionInputSelect(graph, table, name)
{
  if(regressionSelect != name)
  {
    graph.selectAll(`rect[alt="${regressionHighlight}"]`).classed('highlighted', false);
    graph.selectAll(`image[alt="${regressionHighlight}"]`).classed('highlighted', false);
    graph.select(`rect[alt="${regressionSelect}"]`).classed('selected', false);
    graph.select(`image[alt="${regressionSelect}"]`).classed('selected', false);
    graph.select(`rect[alt="${name}"]`).classed('selected', true);
    graph.select(`image[alt="${name}"]`).classed('selected', true);

    table.selectAll(`img[alt="${regressionSelect}"]`).classed('highlighted', false);
    table.selectAll(`text[alt="${regressionSelect}"]`).classed('highlighted', false);
    table.select(`img[alt="${regressionSelect}"]`).classed('selected', false);
    table.selectAll(`text[alt="${regressionSelect}"]`).classed('selected', false);
    table.select(`img[alt="${name}"]`).classed('selected', true);
    table.selectAll(`text[alt="${name}"]`).classed('selected', true);

    regressionSelect = name;

    if(graph.selectAll(`rect[alt="${name}"]`).size() > 0)
    {
      var scrollLeft = regressionOverflow._groups[0][0].scrollLeft;
      var scrollRight = regressionOverflow._groups[0][0].scrollLeft + width;
      var rectLeft = parseFloat(graph.select(`rect[alt="${name}"]`).attr('x'));
      var rectRight = rectLeft + parseFloat(graph.select(`rect[alt="${name}"]`).attr('width'));
      var limitLeft = rectLeft > scrollLeft ? scrollLeft : rectLeft;
      var limitRight = rectRight > scrollRight ? rectRight : scrollRight;

      if(limitLeft < scrollLeft)
        regressionOverflow._groups[0][0].scrollLeft = limitLeft;
      else if(limitRight > scrollRight)
        regressionOverflow._groups[0][0].scrollLeft = limitRight - width;
    }
  }
}

function setRegressionInputHighlight(graph, table, name)
{
  if(regressionHighlight != name && regressionSelect != name)
  {
    graph.selectAll(`img[alt="${regressionHighlight}"]`).classed('highlighted', false);
    graph.selectAll(`rect[alt="${regressionHighlight}"]`).classed('highlighted', false);
    graph.selectAll(`image[alt="${regressionHighlight}"]`).classed('highlighted', false);
    graph.selectAll(`img[alt="${name}"]`).classed('highlighted', true);
    graph.selectAll(`rect[alt="${name}"]`).classed('highlighted', true);
    graph.selectAll(`image[alt="${name}"]`).classed('highlighted', true);

    table.selectAll(`img[alt="${regressionHighlight}"]`).classed('highlighted', false);
    table.selectAll(`text[alt="${regressionHighlight}"]`).classed('highlighted', false);
    table.selectAll(`img[alt="${name}"]`).classed('highlighted', true);
    table.selectAll(`text[alt="${name}"]`).classed('highlighted', true);

    regressionHighlight = name;
  }
}

function setRegressionOutputSelect(graph, table, name)
{
  if(regressionOutputSelect != name)
  {
    table.selectAll(`th[alt="${regressionOutputHighlight}"]`).style('font-style','');
    table.selectAll(`td[alt="${regressionOutputHighlight}"]`).style('font-style','');
    table.selectAll(`th[alt="${regressionOutputSelect}"]`).style('font-weight', '100');
    table.selectAll(`td[alt="${regressionOutputSelect}"]`).style('font-weight', '100');
    table.selectAll(`th[alt="${name}"]`).style('font-weight', '600');
    table.selectAll(`td[alt="${name}"]`).style('font-weight', '600');

    regressionOutputSelect = name;

    drawRegressionGraph(graph, table, allBotRegData);
  }
}

function setRegressionOutputHighlight(graph, table, name)
{
  if(regressionOutputHighlight != name && regressionOutputSelect != name)
  {
    table.selectAll(`th[alt="${regressionOutputHighlight}"]`).style('font-style','');
    table.selectAll(`td[alt="${regressionOutputHighlight}"]`).style('font-style','');
    table.selectAll(`th[alt="${name}"]`).style('font-style','italic');
    table.selectAll(`td[alt="${name}"]`).style('font-style','italic');

    regressionOutputHighlight = name;
  }
}

function writeTableText(tableCell, value, valueDiff, id, precision)
{
  if(valueDiff == 0)
  {
    tableCell.append('text').attr('alt', id).text(value);
  }
  else if(valueDiff < 0)
  {
    tableCell.append('text').attr('alt', id).text(value + ' (');
    tableCell.append('text').attr('class', 'tertiary').attr('alt', id).text('- ' + parseInt(Math.abs(valueDiff)*Math.pow(10, precision))/Math.pow(10, precision));
    tableCell.append('text').attr('alt', id).text(')');
  }
  else
  {
    tableCell.append('text').attr('alt', id).text(value + ' (');
    tableCell.append('text').attr('class', 'secondary').attr('alt', id).text('+ ' + parseInt(valueDiff*Math.pow(10, precision))/Math.pow(10, precision));
    tableCell.append('text').attr('alt', id).text(')');
  }
}

function writeTablePercent(tableCell, value, valueDiff, id, precision)
{
  if(valueDiff == 0)
  {
    tableCell.append('text').attr('alt', id).text(value + '%');
  }
  else if(valueDiff < 0)
  {
    tableCell.append('text').attr('alt', id).text(value + '% (');
    tableCell.append('text').attr('class', 'tertiary').attr('alt', id).text('- ' + parseInt(Math.abs(valueDiff)*Math.pow(10, precision))/Math.pow(10, precision) + '%');
    tableCell.append('text').attr('alt', id).text(')');
  }
  else
  {
    tableCell.append('text').attr('alt', id).text(value + '% (');
    tableCell.append('text').attr('class', 'secondary').attr('alt', id).text('+ ' + parseInt(valueDiff*Math.pow(10, precision))/Math.pow(10, precision) + '%');
    tableCell.append('text').attr('alt', id).text(')');
  }
}
