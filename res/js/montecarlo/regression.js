
const regressionGraph = d3.select('#viz-regression').append('svg')
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);

const regHeader = ["Variable", "Value", "Norm Value", /*"% Advantage", */"% Adv Win", /*"% Disadvantage", */"% Dis Win", /*"% Neutral", "% Neutral Win", */"Pick Rate (%)" ];
const regressionTable = d3.select('#table-regression').append('div').attr('class', 'overflow-auto')
  .style('width', '100%')
  .style('height', '250px')
  .append('table')
    .style('width', '100%');

var regressionSelect = null;
var regressionHighlight = null;
var regressionExpansion = null;
var regressionOutputHighlight = null;
var regressionOutputSelect = null;
var vsBotFilter = '';
var vsTraitFilter = '';
var vsTechFilter = '';
var vsManuFilter = '';
var stanceFilter = '';
var vsSkillFilter = '';

d3.select("#vsBotSlug").on("change", function() {
  selectBotFilter();
});
d3.select("#vsTraitSlug").on("change", function() {
  selectTraitFilter();
});
d3.select("#vsTechSlug").on("change", function() {
  selectTechFilter();
});
d3.select("#vsManuSlug").on("change", function() {
  selectManuFilter();
});
d3.select("#stanceSlug").on("change", function() {
  selectStanceFilter();
});
d3.select("#vsSkillSlug").on("change", function() {
  selectSkillFilter();
});

function selectBotFilter() {
  vsBotFilter = d3.select("#vsBotSlug").property("value");
  loadData(vsBotFilter + vsTraitFilter + vsTechFilter + vsManuFilter + stanceFilter + vsSkillFilter);
}
function selectTraitFilter() {
  vsTraitFilter = d3.select("#vsTraitSlug").property("value");
  loadData(vsBotFilter + vsTraitFilter + vsTechFilter + vsManuFilter + stanceFilter + vsSkillFilter);
}
function selectTechFilter() {
  vsTechFilter = d3.select("#vsTechSlug").property("value");
  loadData(vsBotFilter + vsTraitFilter + vsTechFilter + vsManuFilter + stanceFilter + vsSkillFilter);
}
function selectManuFilter() {
  vsManuFilter = d3.select("#vsManuSlug").property("value");
  loadData(vsBotFilter + vsTraitFilter + vsTechFilter + vsManuFilter + stanceFilter + vsSkillFilter);
}
function selectStanceFilter() {
  stanceFilter = d3.select("#stanceSlug").property("value");
  loadData(vsBotFilter + vsTraitFilter + vsTechFilter + vsManuFilter + stanceFilter + vsSkillFilter);
}
function selectSkillFilter() {
  vsSkillFilter = d3.select("#vsSkillSlug").property("value");
  loadData(vsBotFilter + vsTraitFilter + vsTechFilter + vsManuFilter + stanceFilter + vsSkillFilter);
}

function drawRegression()
{
  drawRegressionGraph();
  drawRegressionTable();
  setRegressionInputHighlight(regressionHighlight);
  setRegressionInputSelect(regressionSelect);
}

function drawRegressionGraph()
{
  regressionGraph.selectAll('*').remove();
  const svg = regressionGraph.append('g')
    .attr("transform", `translate(${margin.left},${margin.top})`);

  if(regressionOutputSelect == null)
  {
    regressionOutputSelect = "NormalizedMarginalValue";
  }

  const sortedData = GlobalData.regData.slice().sort((a,b) => d3.ascending(a[regressionOutputSelect], b[regressionOutputSelect]));

  const yExtents = d3.extent(sortedData, d => d[regressionOutputSelect]);
  const minYExtent = Math.min(0.0, yExtents[0]);
  const maxYExtent = Math.max(0.0, yExtents[1]);
  const minHeight = 0.0;
  const maxHeight = height;
  const centerH = (maxHeight - minHeight) * Math.max(0, (maxYExtent)) / (maxYExtent - minYExtent);

  const numRegVars = /*(*/sortedData.length;// - 1) / GlobalData.varCount + 1;
  const rectSpacing = 1;
  const rectWidth = (width / numRegVars) - rectSpacing;
  var zeroPos = 0;
  sortedData.forEach((d, i) => {
    if(d[regressionOutputSelect] < 0.0)
    {
      zeroPos = i + 1;
    }
  });
  const centerW = width * Math.max(0, (zeroPos)) / numRegVars;

  var lineCount = 0;
  sortedData.forEach(function(d, i) {
    const plotVal = d[regressionOutputSelect];
    const plotDiff = d[regressionOutputSelect+"Diff"];
    const lowerBoundValue = Math.min(-plotVal, 0);
    const upperBoundValue = Math.max(-plotVal, 0) - lowerBoundValue;
    const lowerBoundDiff = Math.min(-plotVal, -plotVal + plotDiff);
    const upperBoundDiff = Math.abs(plotDiff);
    svg.append('rect').attr('class', 'svg_background')
      .attr('x', lineCount * (rectWidth + rectSpacing))
      .attr('y', 0.0)
      .attr('width', rectWidth)
      .attr('height', height)
      .attr('filter', 'invert(97.27%)')
      .on('mouseenter', () => setRegressionInputHighlight(d.name))
      .on('mouseleave', () => setRegressionInputHighlight(null))
      .on('click', () => setRegressionInputSelect(d.name))
    svg.append('rect').attr('class', 'svg_shape')
      .attr('x', lineCount * (rectWidth + rectSpacing))
      .attr('y', centerH + lowerBoundValue / maxYExtent * centerH)
      .attr('width', rectWidth)
      .attr('height', upperBoundValue / maxYExtent * centerH)
      .attr('alt', d.name)
      .on('mouseenter', () => setRegressionInputHighlight(d.name))
      .on('mouseleave', () => setRegressionInputHighlight(null))
      .on('click', () => setRegressionInputSelect(d.name));
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
        .attr('y', centerH + lowerBoundDiff / maxYExtent * centerH)
        .attr('width', rectWidth)
        .attr('height', upperBoundDiff / maxYExtent * centerH)
        .attr('alt', d.name)
        .on('mouseenter', () => setRegressionInputHighlight(d.name))
        .on('mouseleave', () => setRegressionInputHighlight(null))
        .on('click', () => setRegressionInputSelect(d.name));
    }
    if((d.name != "Intercept") && (d.name != "Skill"))
    {
      if(plotVal != 0)
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
          .attr('y', centerH + offset)
          .attr('width', rectWidth)
          .attr('height', rectWidth)
          .attr('filter', 'invert(100%)')
          .attr('href', `res/images/units/${d.name.toLowerCase().replace(/\s+/g,'')}.png`)
          .attr('alt', d.name)
          .on('mouseenter', () => setRegressionInputHighlight(d.name))
          .on('mouseleave', () => setRegressionInputHighlight(null))
          .on('click', () => setRegressionInputSelect(d.name));
      }
    }
    if(plotVal != 0)
    {
      lineCount++;
    }
  });

  // Add X axis
  const x = d3.scaleLinear()
    .domain([0, numRegVars])
    .range([0, width]);
  svg.append("g")
    .attr("transform", `translate(0,${centerH})`)
    .call(
      d3.axisBottom(x).tickValues(x.domain()));

  // Add Y axis
  const y = d3.scaleLinear()
  .domain(minYExtent, maxYExtent)
  .range([height, 0]);
  svg.append("g")
    .attr("transform", `translate(${centerW},0)`)
    .call(
      d3.axisRight(y)
        .tickValues(y.domain()).tickFormat((d) => d + '%') // Custom format to convert decimal to percentage
    );

  svg.append('text').attr('class', 'svg_text')
    .text(GlobalData.count + " / " + GlobalData.countBase + " iterations");

  var temp = regressionSelect;
  setRegressionInputSelect(null);
  setRegressionInputSelect(temp);
}

function drawRegressionTable()
{
  regressionTable.selectAll("*").remove();
  // Create table header
  var topReg = regressionTable.append('thead').append('tr');
  topReg.append('th').attr('class', 'table_hr_cornersticky')
    .text("Icon");
  topReg.append('th').attr('class', 'table_hr_sticky')
    .text("Variable");
  topReg.append('th').attr('class', 'table_hr_sticky')
    .text("Value")
    .attr('alt', "MarginalValue")
    .on('mouseenter', () => setRegressionOutputHighlight("MarginalValue"))
    .on('mouseleave', () => setRegressionOutputHighlight(null))
    .on('click', () => setRegressionOutputSelect("MarginalValue"));
  topReg.append('th').attr('class', 'table_hr_sticky')
    .text("Norm Value")
    .attr('alt', "NormalizedMarginalValue")
    .on('mouseenter', () => setRegressionOutputHighlight("NormalizedMarginalValue"))
    .on('mouseleave', () => setRegressionOutputHighlight(null))
    .on('click', () => setRegressionOutputSelect("NormalizedMarginalValue"));
  topReg.append('th').attr('class', 'table_hr_sticky')
    .text("% Adv Win")
    .attr('alt', "AdvantagedWins")
    .on('mouseenter', () => setRegressionOutputHighlight("AdvantagedWins"))
    .on('mouseleave', () => setRegressionOutputHighlight(null))
    .on('click', () => setRegressionOutputSelect("AdvantagedWins"));
  topReg.append('th').attr('class', 'table_hr_sticky')
    .text("% Dis Win")
    .attr('alt', "DisadvantagedWins")
    .on('mouseenter', () => setRegressionOutputHighlight("DisadvantagedWins"))
    .on('mouseleave', () => setRegressionOutputHighlight(null))
    .on('click', () => setRegressionOutputSelect("DisadvantagedWins"));
  topReg.append('th').attr('class', 'table_hr_sticky')
    .text("% Pick Rate")
    .attr('alt', "PickPct")
    .on('mouseenter', () => setRegressionOutputHighlight("PickPct"))
    .on('mouseleave', () => setRegressionOutputHighlight(null))
    .on('click', () => setRegressionOutputSelect("PickPct"));
  // Create table body
  GlobalData.regData.forEach(function(d, i) {
    const botIdx = i;// / GlobalData.varCount + 1;
    if(botIdx == parseInt(botIdx))
    {
      var row = regressionTable.append('tbody').append('tr')
        .on('mouseenter', () => setRegressionInputHighlight(d.name))
        .on('mouseleave', () => setRegressionInputHighlight(null))
        .on('click', () => setRegressionInputSelect(d.name));
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
        // TODO: Restore when sub-values are finished.   if(regressionExpansion != d.name)
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
      newCell = row.append('td').attr('class', 'table_cell').style('width', '20%')
        .append('text')
          .attr('alt', d.name)
          .text(d.name);
      newCell = row.append('td').attr('class', 'table_cell').style('width', '14%')
        .attr('alt', "MarginalValue")
        .on('mouseenter', () => setRegressionOutputHighlight("MarginalValue"))
        .on('mouseleave', () => setRegressionOutputHighlight(null))
        .on('click', () => setRegressionOutputSelect("MarginalValue"));
      writeTableText(newCell, d.MarginalValue, d.MarginalValueDiff, d.name, 2);
      newCell = row.append('td').attr('class', 'table_cell').style('width', '14%')
        .attr('alt', "NormalizedMarginalValue")
        .on('mouseenter', () => setRegressionOutputHighlight("NormalizedMarginalValue"))
        .on('mouseleave', () => setRegressionOutputHighlight(null))
        .on('click', () => setRegressionOutputSelect("NormalizedMarginalValue"));
      writeTablePercent(newCell, d.NormalizedMarginalValue, d.NormalizedMarginalValueDiff, d.name, 0);
      newCell = row.append('td').attr('class', 'table_cell').style('width', '14%')
        .attr('alt', "AdvantagedWins")
        .on('mouseenter', () => setRegressionOutputHighlight("AdvantagedWins"))
        .on('mouseleave', () => setRegressionOutputHighlight(null))
        .on('click', () => setRegressionOutputSelect("AdvantagedWins"));
      writeTablePercent(newCell, d.AdvantagedWins, d.AdvantagedWinsDiff, d.name, 0);
      newCell = row.append('td').attr('class', 'table_cell').style('width', '14%')
        .attr('alt', "DisadvantagedWins")
        .on('mouseenter', () => setRegressionOutputHighlight("DisadvantagedWins"))
        .on('mouseleave', () => setRegressionOutputHighlight(null))
        .on('click', () => setRegressionOutputSelect("DisadvantagedWins"));
      writeTablePercent(newCell, d.DisadvantagedWins, d.DisadvantagedWinsDiff, d.name, 0);
      newCell = row.append('td').attr('class', 'table_cell').style('width', '14%')
        .attr('alt', "PickPct")
        .on('mouseenter', () => setRegressionOutputHighlight("PickPct"))
        .on('mouseleave', () => setRegressionOutputHighlight(null))
        .on('click', () => setRegressionOutputSelect("PickPct"));
      writeTablePercent(newCell, d.PickPct, d.PickPctDiff, d.name, 0);
      if(regressionExpansion == d.name)
      {
        for(var i = 0; i < GlobalData.varCount; ++i)
        {
          var data = GlobalData.regData[botIdx + i]
          var row = regressionTable.append('tbody').append('tr')
            .on('mouseenter', () => setRegressionInputHighlight(data.name))
            .on('mouseleave', () => setRegressionInputHighlight(null))
            .on('click', () => setRegressionInputSelect(data.name));
          var cell = row.append('td')
            .attr('class', 'table_cell_sticky').style('width', '10%');
          var cellRow = cell.append('div').attr('class', 'row row-cols-2')
          cellRow.append('div').attr('class', 'col')
            .style('width', '40%')
            .append('img')
              .attr('x', 10)
              .attr('src', statImageLookup[i])
              .attr('alt', statNameLookup[i]);
          cellRow.append('div').attr('class', 'col')
            .style('width', '40%')
            .append('text')
              .style('font-size', '40px')
              .text('');
          var newCell = null;
          newCell = row.append('td').attr('class', 'table_cell').style('width', '20%')
            .append('text')
            .attr('alt', statNameLookup[i])
            .text(statNameLookup[i]);
          newCell = row.append('td').attr('class', 'table_cell').style('width', '14%');
          writeTableText(newCell, data.MarginalValue, data.MarginalValueDiff, statNameLookup[i], 2);
          newCell = row.append('td').attr('class', 'table_cell').style('width', '14%');
          writeTablePercent(newCell, data.NormalizedMarginalValue, data.NormalizedMarginalValueDiff, statNameLookup[i], 0);
          newCell = row.append('td').attr('class', 'table_cell').style('width', '14%');
          writeTablePercent(newCell, data.AdvantagedWins, data.AdvantagedWinsDiff, statNameLookup[i], 0);
          newCell = row.append('td').attr('class', 'table_cell').style('width', '14%');
          writeTablePercent(newCell, data.DisadvantagedWins, data.DisadvantagedWinsDiff, statNameLookup[i], 0);
          newCell = row.append('td').attr('class', 'table_cell').style('width', '14%');
          writeTablePercent(newCell, data.PickPct, data.PickPctDiff, statNameLookup[i], 0);
        };
      }
    }
  });
}

function setRegressionInputSelect(name)
{
  if(regressionSelect != name)
  {
    regressionGraph.selectAll(`rect[alt="${regressionHighlight}"]`).classed('highlighted', false);
    regressionGraph.selectAll(`image[alt="${regressionHighlight}"]`).classed('highlighted', false);
    regressionGraph.select(`rect[alt="${regressionSelect}"]`).classed('selected', false);
    regressionGraph.select(`image[alt="${regressionSelect}"]`).classed('selected', false);
    regressionGraph.select(`rect[alt="${name}"]`).classed('selected', true);
    regressionGraph.select(`image[alt="${name}"]`).classed('selected', true);

    regressionTable.selectAll(`img[alt="${regressionSelect}"]`).classed('highlighted', false);
    regressionTable.selectAll(`text[alt="${regressionSelect}"]`).classed('highlighted', false);
    regressionTable.select(`img[alt="${regressionSelect}"]`).classed('selected', false);
    regressionTable.selectAll(`text[alt="${regressionSelect}"]`).classed('selected', false);
    regressionTable.select(`img[alt="${name}"]`).classed('selected', true);
    regressionTable.selectAll(`text[alt="${name}"]`).classed('selected', true);

    regressionSelect = name;
  }
}

function setRegressionInputHighlight(name)
{
  if(regressionHighlight != name && regressionSelect != name)
  {
    regressionGraph.selectAll(`img[alt="${regressionHighlight}"]`).classed('highlighted', false);
    regressionGraph.selectAll(`rect[alt="${regressionHighlight}"]`).classed('highlighted', false);
    regressionGraph.selectAll(`image[alt="${regressionHighlight}"]`).classed('highlighted', false);
    regressionGraph.selectAll(`img[alt="${name}"]`).classed('highlighted', true);
    regressionGraph.selectAll(`rect[alt="${name}"]`).classed('highlighted', true);
    regressionGraph.selectAll(`image[alt="${name}"]`).classed('highlighted', true);

    regressionTable.selectAll(`img[alt="${regressionHighlight}"]`).classed('highlighted', false);
    regressionTable.selectAll(`text[alt="${regressionHighlight}"]`).classed('highlighted', false);
    regressionTable.selectAll(`img[alt="${name}"]`).classed('highlighted', true);
    regressionTable.selectAll(`text[alt="${name}"]`).classed('highlighted', true);

    regressionHighlight = name;
  }
}

function setRegressionOutputSelect(name)
{
  if(regressionOutputSelect != name)
  {
    regressionTable.selectAll(`th[alt="${regressionOutputHighlight}"]`).style('font-style','');
    regressionTable.selectAll(`td[alt="${regressionOutputHighlight}"]`).style('font-style','');
    regressionTable.selectAll(`th[alt="${regressionOutputSelect}"]`).style('font-weight', '100');
    regressionTable.selectAll(`td[alt="${regressionOutputSelect}"]`).style('font-weight', '100');
    regressionTable.selectAll(`th[alt="${name}"]`).style('font-weight', '600');
    regressionTable.selectAll(`td[alt="${name}"]`).style('font-weight', '600');

    regressionOutputSelect = name;

    drawRegressionGraph();
  }
}

function setRegressionOutputHighlight(name)
{
  if(regressionOutputHighlight != name && regressionOutputSelect != name)
  {
    regressionTable.selectAll(`th[alt="${regressionOutputHighlight}"]`).style('font-style','');
    regressionTable.selectAll(`td[alt="${regressionOutputHighlight}"]`).style('font-style','');
    regressionTable.selectAll(`th[alt="${name}"]`).style('font-style','italic');
    regressionTable.selectAll(`td[alt="${name}"]`).style('font-style','italic');

    regressionOutputHighlight = name;
  }
}

function expandSelection(name)
{
  if(regressionExpansion != name)
  {
    regressionExpansion = name;
    drawRegressionTable();
  }
}

function collapseSelection(name)
{
  regressionExpansion = null;
  drawRegressionTable();
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
