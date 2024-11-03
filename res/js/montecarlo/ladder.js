
const leagueCutoff = [ 0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 999999];
const ladderHeader = ["Rank", "Ladder Score", "Player ID", "MMR", "Win %", "Expected Rank", "Skill", "Deck",];/*"Core 1", "Core 2", "Foundry", "Adv Foundry", "Flex Foundry", "Starforge", "Adv Starforge", "Flex Starforge", ];*/
const ladderDummy = [
  { id: 0, rank: 1000.0, mmr:  500.0, winPct: 50.0, skill:  505.0, core1:  1, core2:  2, fd: 12, afd: 24, ffd: 14, sf: 33, asf: 41, fsf: 35, },
  { id: 1, rank: 1000.0, mmr:  650.0, winPct: 50.0, skill:  599.0, core1:  4, core2:  3, fd: 14, afd: 27, ffd: 19, sf: 34, asf: 44, fsf: 31, },
  { id: 2, rank: 1000.0, mmr:  450.0, winPct: 50.0, skill:  433.0, core1:  6, core2:  2, fd: 13, afd: 24, ffd: 25, sf: 31, asf: 43, fsf: 40, },
  { id: 3, rank: 1000.0, mmr: 1500.0, winPct: 50.0, skill: 1505.0, core1:  3, core2: 11, fd: 17, afd: 25, ffd: 13, sf: 29, asf: 39, fsf: 32, },
  { id: 4, rank: 1000.0, mmr: 1650.0, winPct: 50.0, skill: 1599.0, core1:  9, core2:  8, fd: 15, afd: 28, ffd: 20, sf: 32, asf: 38, fsf: 34, },
  { id: 5, rank: 1000.0, mmr: 2450.0, winPct: 50.0, skill: 2433.0, core1:  6, core2:  7, fd: 21, afd: 26, ffd: 27, sf: 30, asf: 42, fsf: 33, },
];

var leagueSelection = 7;
var ladderSelect = null;
var ladderHighlight = null;
const ladderTable = d3.select('#table-ladder').append('div').attr('class', 'overflow-auto')
  .style('width', '100%')
  .style('height', '215px')
  .append('table')
  .style('width', '100%');
  const notes = d3.select('#table-ladder-notes').append('div');
const summaryTable = d3.select('#table-ladder-summary').append('div').attr('class', 'overflow-auto')
  .style('width', '100%')
  .style('height', '400px')
  .append('table')
  .style('width', '100%');
const summaryGraph = d3.select('#viz-ladder-summary').append('svg')
  .attr("width", '100%')
  .attr("height", '400px');

d3.select('#iron-button').on('click', () => selectLeague(leagueIndex.iron));
d3.select('#bronze-button').on('click', () => selectLeague(leagueIndex.bronze));
d3.select('#silver-button').on('click', () => selectLeague(leagueIndex.silver));
d3.select('#gold-button').on('click', () => selectLeague(leagueIndex.gold));
d3.select('#platinum-button').on('click', () => selectLeague(leagueIndex.platinum));
d3.select('#emerald-button').on('click', () => selectLeague(leagueIndex.emerald));
d3.select('#diamond-button').on('click', () => selectLeague(leagueIndex.diamond));
d3.select('#topace-button').on('click', () => selectLeague(leagueIndex.topace));

function drawLadder()
{
  drawLadderTables(leagueSelection);
  drawLadderGraph();
}

function drawLadderTables(league)
{
  ladderTable.selectAll("*").remove();
  notes.selectAll("*").remove();
  summaryTable.selectAll("*").remove();
  // Create table header
  var topLadder = ladderTable.append('thead').append('tr');
  topLadder.append('th').attr('class', 'table_hr_cornersticky')
    .text("Rank");
  ladderHeader.forEach(function(d, i) {
    if(i != 0)
    {
      topLadder.append('th').attr('class', 'table_hr_sticky')
        .text(d);
    }
  });
  var sortedData = GlobalData.ladderData[leagueSelection].slice().sort((a,b) => d3.descending(a.rank, b.rank));
  // Create table body
  sortedData.forEach(function(d, i) {
    if((leagueCutoff[leagueSelection] <= d.rank) && (d.rank < leagueCutoff[leagueSelection+1]))
    {
      var row = ladderTable.append('tbody').append('tr');
      var newCell = null;
      newCell = row.append('td').attr('class', 'table_cell');
      writeLadderText(newCell, i+1, d.id, 0);
      newCell = row.append('td').attr('class', 'table_cell');
      writeLadderText(newCell, d.rank, d.id, 0);
      newCell = row.append('td').attr('class', 'table_cell').append('text')
        .attr('alt', d.id)
        .text(d.id);
      newCell = row.append('td').attr('class', 'table_cell');
      writeLadderText(newCell, d.mmr, d.id, 0);
      newCell = row.append('td').attr('class', 'table_cell')
        .append('text')
        .attr('alt', d.id)
        .text(d.winPct + '%');
      newCell = row.append('td').attr('class', 'table_cell');
      writeLadderText(newCell, d.expRank, d.id, 0);
      newCell = row.append('td').attr('class', 'table_cell');
      writeLadderText(newCell, d.skill, d.id, 0);
      newCell = row.append('td').attr('class', 'table_cell');
      newCell.append('img')
        .attr('src', botImageLookup[d.core1])
        .attr('alt', d.core1)
        .on('click', () => setLadderSelect(d.core1))
        .on('mouseenter', () => setLadderHighlight(d.core1))
        .on('mouseleave', () => setLadderHighlight(null));
      newCell.append('img')
        .attr('src', botImageLookup[d.core2])
        .attr('alt', d.core2)
        .on('click', () => setLadderSelect(d.core2))
        .on('mouseenter', () => setLadderHighlight(d.core2))
        .on('mouseleave', () => setLadderHighlight(null));
      newCell.append('img')
        .attr('src', botImageLookup[d.fd])
        .attr('alt', d.fd)
        .on('click', () => setLadderSelect(d.fd))
        .on('mouseenter', () => setLadderHighlight(d.fd))
        .on('mouseleave', () => setLadderHighlight(null));
      newCell.append('img')
        .attr('src', botImageLookup[d.afd])
        .attr('alt', d.afd)
        .on('click', () => setLadderSelect(d.afd))
        .on('mouseenter', () => setLadderHighlight(d.afd))
        .on('mouseleave', () => setLadderHighlight(null));
      newCell.append('img')
        .attr('src', botImageLookup[d.ffd])
        .attr('alt', d.ffd)
        .on('click', () => setLadderSelect(d.ffd))
        .on('mouseenter', () => setLadderHighlight(d.ffd))
        .on('mouseleave', () => setLadderHighlight(null));
      newCell.append('img')
        .attr('src', botImageLookup[d.sf])
        .attr('alt', d.sf)
        .on('click', () => setLadderSelect(d.sf))
        .on('mouseenter', () => setLadderHighlight(d.sf))
        .on('mouseleave', () => setLadderHighlight(null));
      newCell.append('img')
        .attr('src', botImageLookup[d.asf])
        .attr('alt', d.asf)
        .on('click', () => setLadderSelect(d.asf))
        .on('mouseenter', () => setLadderHighlight(d.asf))
        .on('mouseleave', () => setLadderHighlight(null));
      newCell.append('img')
        .attr('src', botImageLookup[d.fsf])
        .attr('alt', d.fsf)
        .on('click', () => setLadderSelect(d.fsf))
        .on('mouseenter', () => setLadderHighlight(d.fsf))
        .on('mouseleave', () => setLadderHighlight(null));
    }
  });

  notes.append('span').text(leagueNameLookup[leagueSelection] + " League has " + parseInt(GlobalData.ladderData[leagueSelection].length/GlobalData.ladderSize*100) + "% of players.");

  const ratesHeader = summaryTable.append('thead').append('tr');
  ratesHeader.append('th').attr('class', 'table_hr_sticky')
    .text("Unit");
  ratesHeader.append('th').attr('class', 'table_hr_sticky')
    .text("Pick %");
  sortedPicks = GlobalData.ladderTotals.slice().sort((a,b) => d3.descending(a[league].rate, b[league].rate));
  sortedPicks.forEach(function(d, i) {
    const ratesRow = summaryTable.append('tbody').append('tr');
    var ratesCell = ratesRow.append('td').attr('class', 'table_cell');
    ratesCell.append('img')
      .attr('src', botImageLookup[d[leagueSelection].id])
      .attr('alt', d[leagueSelection].id)
      .on('click', () => setLadderSelect(d[leagueSelection].id))
      .on('mouseenter', () => setLadderHighlight(d[leagueSelection].id))
      .on('mouseleave', () => setLadderHighlight(null));
    ratesCell = ratesRow.append('td').attr('class', 'table_cell').append('text')
      .attr('alt', d[leagueSelection].id)
      .text(parseInt(d[leagueSelection].rate*100) + '%')
      .on('click', () => setLadderSelect(d[leagueSelection].id))
      .on('mouseenter', () => setLadderHighlight(d[leagueSelection].id))
      .on('mouseleave', () => setLadderHighlight(null));
  });
}

function writeLadderText(tableCell, value, id, precision)
{
  tableCell.append('text').attr('alt', id).text(value);
}

function setLadderSelect(id)
{
  if(ladderSelect != id)
  {
    ladderTable.selectAll(`img[alt="${ladderHighlight}"]`).classed('highlighted', false);
    ladderTable.selectAll(`text[alt="${ladderHighlight}"]`).classed('highlighted', false);
    summaryTable.selectAll(`img[alt="${ladderHighlight}"]`).classed('highlighted', false);
    summaryTable.selectAll(`text[alt="${ladderHighlight}"]`).classed('highlighted', false);
    summaryGraph.selectAll(`line[alt="${ladderHighlight}"]`).classed('highlighted', false);

    ladderTable.selectAll(`img[alt="${ladderSelect}"]`).classed('highlighted', false);
    ladderTable.selectAll(`text[alt="${ladderSelect}"]`).classed('highlighted', false);
    summaryTable.selectAll(`img[alt="${ladderSelect}"]`).classed('highlighted', false);
    summaryTable.selectAll(`text[alt="${ladderSelect}"]`).classed('highlighted', false);
    summaryGraph.selectAll(`line[alt="${ladderSelect}"]`).classed('highlighted', false);
    ladderTable.selectAll(`img[alt="${ladderSelect}"]`).classed('selected', false);
    ladderTable.selectAll(`text[alt="${ladderSelect}"]`).classed('selected', false);
    summaryTable.selectAll(`img[alt="${ladderSelect}"]`).classed('selected', false);
    summaryTable.selectAll(`text[alt="${ladderSelect}"]`).classed('selected', false);
    summaryGraph.selectAll(`line[alt="${ladderSelect}"]`).classed('selected', false);
    ladderTable.selectAll(`img[alt="${id}"]`).classed('selected', true);
    ladderTable.selectAll(`text[alt="${id}"]`).classed('selected', true);
    summaryTable.selectAll(`img[alt="${id}"]`).classed('selected', true);
    summaryTable.selectAll(`text[alt="${id}"]`).classed('selected', true);
    summaryGraph.selectAll(`line[alt="${id}"]`).classed('selected', true);

    ladderSelect = id;
  }
}

function setLadderHighlight(id)
{
  if(ladderHighlight != id)
  {
    ladderTable.selectAll(`img[alt="${ladderHighlight}"]`).classed('highlighted', false);
    ladderTable.selectAll(`text[alt="${ladderHighlight}"]`).classed('highlighted', false);
    summaryTable.selectAll(`img[alt="${ladderHighlight}"]`).classed('highlighted', false);
    summaryTable.selectAll(`text[alt="${ladderHighlight}"]`).classed('highlighted', false);
    summaryGraph.selectAll(`line[alt="${ladderHighlight}"]`).classed('highlighted', false);
    ladderTable.selectAll(`img[alt="${id}"]`).classed('highlighted', true);
    ladderTable.selectAll(`text[alt="${id}"]`).classed('highlighted', true);
    summaryTable.selectAll(`img[alt="${id}"]`).classed('highlighted', true);
    summaryTable.selectAll(`text[alt="${id}"]`).classed('highlighted', true);
    summaryGraph.selectAll(`line[alt="${id}"]`).classed('highlighted', true);

    ladderHighlight = id;
  }
}

function selectLeague(league)
{
  if(league != leagueSelection)
  {
    ladderTable.selectAll(`img[alt="${ladderHighlight}"]`).classed('selected', false);
    ladderTable.selectAll(`text[alt="${ladderHighlight}"]`).classed('selected', false);

    leagueSelection = league;

    var oldHighlight = ladderHighlight;
    var oldSelect = ladderSelect;

    setLadderHighlight(null);
    setLadderSelect(null);
    drawLadderTables(leagueSelection);
    drawLadderGraph();
    setLadderHighlight(oldHighlight);
    setLadderSelect(oldSelect);
  }
}

function drawLadderGraph()
{
  summaryGraph.selectAll("*").remove();
  svg = summaryGraph.append('g');

  const minWidth = 40.0;
  const maxWidth = (width * 10/12) - 20;
  const minHeight = 20.0;
  const maxHeight = 400.0 - 20;
  // Add X axis
  const x = d3.scaleLinear()
    .domain([0, 7])
    .range([minWidth, maxWidth]);
  svg.append("g")
    .attr("transform", `translate(0,${maxHeight})`)
    .call(d3.axisBottom(x).tickFormat((d) => leagueNameLookup[d]));
  // Add Y axis
  const y = d3.scaleLinear()
    .domain([0.0, 100.0])
    .range([maxHeight, minHeight]);
  svg.append("g")
    .attr("transform", `translate(${minWidth},0)`)
    .call(d3.axisLeft(y).tickFormat((d) => d+'%'));

  for(var unitIdx = 0; unitIdx < botNameLookup.length; ++unitIdx)
  {
    for(var league = 0; league < leagueCutoff.length-2; ++ league)
    {
      const leagueLine = svg.append('line').attr('class', 'svg_line')
        .classed('soften', true)
        .attr('alt', unitIdx)
        .attr("x1", minWidth + league / (leagueCutoff.length-2) * (maxWidth - minWidth))
        .attr("x2", minWidth + (league + 1) / (leagueCutoff.length-2) * (maxWidth - minWidth))
        .attr("y1", maxHeight - GlobalData.ladderTotals[unitIdx][league].rate   * (maxHeight - minHeight))
        .attr("y2", maxHeight - GlobalData.ladderTotals[unitIdx][league+1].rate * (maxHeight - minHeight))
        .on('click', () => setLadderSelect(unitIdx))
        .on('mouseenter', () => setLadderHighlight(unitIdx))
        .on('mouseleave', () => setLadderHighlight(null));
    }
  }
}