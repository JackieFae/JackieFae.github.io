
const graphWidth = 740.0;
const graphHeight = 740.0;
const simSize = 200.0;
const repWidth = 1700.0;
const repHeight = 1700.0;
const boundary = 0.0;
const repIconLarge = { width: 2.0 * repWidth / simSize, height: 2.0 * repHeight / simSize };
const repIconSmall = 50;
const cMaxNumReports = 125;

var reportIdx = 1;
var reportTimeStep = 0;

const reportDisplay = d3.select('#viz-report').append('div')
  .style('height', '1050px');

const reportSuper = reportDisplay.append('div').attr('class', 'row row-cols-3');
const reportLeftBuffer = reportSuper.append('div').attr('class', 'col')
  .style('width', '10%')
  .append('div');
const reportGraph = reportSuper.append('div').attr('class', 'col')
  .style('width', '80%')
  .append('div');
const reportRightBuffer = reportSuper.append('div').attr('class', 'col')
  .style('width', '10%')
  .append('div');
const reportGraphOverflow = reportGraph.append('div').attr('class', 'overflow-auto')
  .style('width', `${graphWidth}px`)
  .style('height', `${graphHeight}px`);  
const reportGraphBots = reportGraphOverflow.append('svg')
    .attr("width", repWidth)
    .attr("height", repHeight);

const reportDetail = reportDisplay.append('div')
  .style('height', '300px');
const reportDetail2 = reportDetail.append('div').attr('class', 'row row-cols-2')
  .style('width', '175px')
  .style('height', '25px');
const reportSelect = reportDetail2.append('div').attr('class', 'col')
  .style('width', '50%')
  .append('input').attr('type', "number")
  .on("change", function(d){
    reportTimeStep = 0;
    reportIdx = Math.min(cMaxNumReports, this.value);
    reportGraphOverflow._groups[0][0].scrollLeft = 0.29 * repWidth;
    reportGraphOverflow._groups[0][0].scrollTop = 0.29 * repHeight;
    loadReports(reportIdx - 1);
  });
const reportSelectDenom = reportDetail2.append('div').attr('class', 'col')
  .style('width', '50%');
const reportScore = reportDetail.append('div')
  .style('height', '40px');
const reportDecks = reportDetail.append('div')
  .style('height', `${200.0}px`);

const reportControl = reportGraph.append('div').attr('class', 'row row-cols-3');

const reportSlider = reportControl.append('div').attr('class', 'col')
  .style('width', '80%')
  .append('input').attr('class', 'slider')
  .attr('type', 'range')
  .on("change", function(d){
    reportTimeStep = parseInt(this.value);
    drawReport();
  });

const reportTime = reportControl.append('div').attr('class', 'col')
  .style('width', '10%')
  .append('input').attr('type', "number")
  .on("change", function(d){
    reportTimeStep = parseInt(this.value);
    drawReport();
  });
const reportTimeDenom = reportControl.append('div').attr('class', 'col')
  .style('width', '10%');

function x(d) {
  return d;
}
function y(d) {
  return d;
}

const repBorderTable = [ { x: 0.0, y: 0.0 }, { x: repWidth, y: 0.0 }, { x: repWidth, y: repHeight }, { x: 0.0, y: repHeight }, { x: 0.0, y: 0.0}, ];

/* Supported actions, ordered by draw priority:
  die == x
  detonate == d
  overclock == o
  blink == b
  recall == r
  setup == s
  attack == a
  move == m
*/
var firstDraw = true;
function drawReport()
{
  reportGraphBots.selectAll("*").remove();
  //reportSlider.selectAll("*").remove();
  //reportTime.selectAll("*").remove();
  reportTimeDenom.selectAll("*").remove();
  reportSelectDenom.selectAll("*").remove();
  
  if(firstDraw)
  {
    reportGraphOverflow._groups[0][0].scrollLeft = 0.29 * repWidth;
    reportGraphOverflow._groups[0][0].scrollTop = 0.29 * repHeight;
    firstDraw = false;
  }

  // Draw battlefield boundaries.
  reportGraphBots.append("path")
    .attr("class", "svg_line")
    .attr("fill", "none")
    .attr("d", drawLine(repBorderTable));
  for(var i = 1; i <= 9; ++i)
  {
    reportGraphBots.append("path")
      .attr("class", "svg_line")
      .classed('soften', true)
      .attr("fill", "none")
      .attr("d", drawLine([ { x: repBorderTable[0].x + (i * repWidth / 10.0), y: repBorderTable[0].y },
                            { x: repBorderTable[0].x + (i * repWidth / 10.0), y: repBorderTable[2].y }, ]));
    reportGraphBots.append("path")
      .attr("class", "svg_line")
      .classed('soften', true)
      .attr("fill", "none")
      .attr("d", drawLine([ { x: repBorderTable[0].x, y: repBorderTable[0].y + (i * repHeight / 10.0) },
                            { x: repBorderTable[1].x, y: repBorderTable[0].y + (i * repHeight / 10.0) }, ]));
  }

  var fieldWidth = repWidth - 2.0 * boundary;
  var fieldHeight = repHeight - 2.0 * boundary;

  // Draw dead bots first, without borders.
  for(var unitIdx = 0; unitIdx < GlobalData.reportSummary[0].unitCount; ++unitIdx)
  {
    var act = GlobalData.reportData[reportTimeStep][unitIdx].action;
    var rad = GlobalData.bots[GlobalData.reportData[reportTimeStep][unitIdx].botIdx].Radius;
    if(rad == 0.0)
    {
      rad = 1.0;
    }
    var topLeftX = boundary + GlobalData.reportData[reportTimeStep][unitIdx].posX * fieldWidth  / GlobalData.reportSummary[0].width - 0.5 * repIconLarge.width;
    var topLeftY = boundary + GlobalData.reportData[reportTimeStep][unitIdx].posY * fieldHeight / GlobalData.reportSummary[0].height - 0.5 * repIconLarge.height;
    var iamgePath = botImageLookup[GlobalData.reportData[reportTimeStep][unitIdx].botIdx];
    if(act == 'x')
    {
      reportGraphBots.append('image').attr('class', 'svg_report_image')
        .classed('teamA', true)
        .classed('dead', true)
        .attr('x', topLeftX)
        .attr('y', repHeight - (topLeftY + repIconLarge.height * rad))
        .attr('width', (repIconLarge.width * rad) + 'px')
        .attr('height', (repIconLarge.height * rad) + 'px')
        .attr('href', iamgePath);
    }
  }

  // Draw living bots, make lines faded.
  for(var unitIdx = 0; unitIdx < GlobalData.reportSummary[0].unitCount; ++unitIdx)
  {
    var act = GlobalData.reportData[reportTimeStep][unitIdx].action;
    if(act != 'x')
    {
      var rad = GlobalData.bots[GlobalData.reportData[reportTimeStep][unitIdx].botIdx].Radius;
      if(rad == 0.0)
      {
        rad = 1.0;
      }
      var topLeftX = boundary + GlobalData.reportData[reportTimeStep][unitIdx].posX * fieldWidth  / GlobalData.reportSummary[0].width  - 0.5 * repIconLarge.width;
      var topLeftY = boundary + GlobalData.reportData[reportTimeStep][unitIdx].posY * fieldHeight / GlobalData.reportSummary[0].height - 0.5 * repIconLarge.height;
      reportGraphBots.append("path")
        .attr("class", "svg_line")
        .attr("fill", "none")
        .style("stroke-width", "0.5")
        .attr("d", drawLine([ { x: topLeftX,                                   y: repHeight - (topLeftY + rad * repIconLarge.height * 0.50), },
                              { x: topLeftX + rad * repIconLarge.width * 0.25, y: repHeight - (topLeftY + rad * repIconLarge.height * 0.13), },
                              { x: topLeftX + rad * repIconLarge.width * 0.75, y: repHeight - (topLeftY + rad * repIconLarge.height * 0.13), },
                              { x: topLeftX + rad * repIconLarge.width,        y: repHeight - (topLeftY + rad * repIconLarge.height * 0.50), },
                              { x: topLeftX + rad * repIconLarge.width * 0.75, y: repHeight - (topLeftY + rad * repIconLarge.height * 0.87), },
                              { x: topLeftX + rad * repIconLarge.width * 0.25, y: repHeight - (topLeftY + rad * repIconLarge.height * 0.87), },
                              { x: topLeftX,                                   y: repHeight - (topLeftY + rad * repIconLarge.height * 0.50), }, ]));

      var className = 'teamA';
      if(GlobalData.reportData[reportTimeStep][unitIdx].teamIdx == 2)
      {
        var className = 'teamB';
      }
      var data = [ { x: boundary + GlobalData.reportData[reportTimeStep][unitIdx].posX * fieldWidth  / GlobalData.reportSummary[0].width  + 1,
                     y: repHeight - (boundary + GlobalData.reportData[reportTimeStep][unitIdx].posY * fieldHeight / GlobalData.reportSummary[0].height + 1) },
                   { x: boundary + GlobalData.reportData[reportTimeStep][unitIdx].actX * fieldWidth  / GlobalData.reportSummary[0].width  + 1,
                     y: repHeight - (boundary + GlobalData.reportData[reportTimeStep][unitIdx].actY * fieldHeight / GlobalData.reportSummary[0].height + 1) } ];

      if((act == 'm')  // Move
      || (act == 'b')  // Blink
      || (act == 'r')  // Recall
      || (act == 's')  // Setup
      || (act == 'u')  // Unsetup
      || (act == 'q')  // Destruct
      || (act == 'g')) // GuardianShield
      {
        reportGraphBots.append("path").attr('class', 'svg_report_line')
          .classed(className, true)
          .attr("d", drawLine(data));
      }
      else if((act == 'a')
      || (act == 'o')  // Overclock
      || (act == 'd')) // Detonate
      {
        reportGraphBots.append("path").attr('class', 'svg_report_line')
          .classed(className, true)
          .attr("d", drawLine(data))
          .attr('stroke-dasharray', '5,5');
        reportGraphBots.append("circle").attr('class', 'svg_report_shape')
          .classed(className, true)
          .attr('cx', data[1].x)
          .attr('cy', data[1].y)
          .attr('r', GlobalData.bots[GlobalData.reportData[reportTimeStep][unitIdx].botIdx].Splash * repIconLarge.width / 2.0);
      }

      var imagePath = botImageLookup[GlobalData.reportData[reportTimeStep][unitIdx].botIdx];
      reportGraphBots.append('image').attr('class', 'svg_report_image')
        .classed(className, true)
        .attr('x', topLeftX)
        .attr('y', repHeight - (topLeftY + (repIconLarge.height * rad)))
        .attr('width', (repIconLarge.width * rad) + 'px')
        .attr('height', (repIconLarge.height * rad) + 'px')
        .attr('href', imagePath);

      var abilityScale = 1.5;
      if(act == 'b') // Blink
      {
        reportGraphBots.append('image').attr('class', 'svg_report_image')
          .attr('x', data[1].x - 0.5 * abilityScale * repIconLarge.width)
          .attr('y', data[1].y - 0.5 * abilityScale * repIconLarge.height)
          .attr('width',  (abilityScale * repIconLarge.width)  + 'px')
          .attr('height', (abilityScale * repIconLarge.height) + 'px')
          .attr('href', abilityImageLookup[abilityIndex.blink]);
      }
      else if(act == 'd') // Detonate
      {
        reportGraphBots.append('image').attr('class', 'svg_report_image')
          .attr('x', data[1].x - 0.5 * abilityScale * repIconLarge.width)
          .attr('y', data[1].y - 0.5 * abilityScale * repIconLarge.height)
          .attr('width',  (abilityScale * repIconLarge.width) + 'px')
          .attr('height', (abilityScale * repIconLarge.height) + 'px')
          .attr('href', abilityImageLookup[abilityIndex.detonate]);
      }
      else if(act == 'q') // Destruct
      {
        reportGraphBots.append('image').attr('class', 'svg_report_image')
          .attr('x', data[0].x - 0.5 * abilityScale * repIconLarge.width)
          .attr('y', data[0].y - 0.5 * abilityScale * repIconLarge.height)
          .attr('width',  (abilityScale * repIconLarge.width)  + 'px')
          .attr('height', (abilityScale * repIconLarge.height) + 'px')
          .attr('href', abilityImageLookup[abilityIndex.destruct]);
      }
      else if(act == 'o') // Overclock
      {
        reportGraphBots.append('image').attr('class', 'svg_report_image')
          .attr('x', (data[1].x - data[0].x) * 0.1 + data[0].x - 0.5 * abilityScale * repIconLarge.width)
          .attr('y', (data[1].y - data[0].y) * 0.1 + data[0].y - 0.5 * abilityScale * repIconLarge.height)
          .attr('width',  (abilityScale * repIconLarge.width)  + 'px')
          .attr('height', (abilityScale * repIconLarge.height) + 'px')
          .attr('href', abilityImageLookup[abilityIndex.overclock]);
      }
      else if(act == 'r') // Recall
      {
        reportGraphBots.append('image').attr('class', 'svg_report_image')
          .attr('x', data[0].x - 0.5 * abilityScale * repIconLarge.width)
          .attr('y', data[0].y - 0.5 * abilityScale * repIconLarge.height)
          .attr('width',  (abilityScale * repIconLarge.width)  + 'px')
          .attr('height', (abilityScale * repIconLarge.height) + 'px')
          .attr('href', abilityImageLookup[abilityIndex.recall]);
      }
      else if(act == 'n') // RecallTeleport
      {
        reportGraphBots.append('image').attr('class', 'svg_report_image')
          .attr('x', data[1].x - 0.5 * abilityScale * repIconLarge.width)
          .attr('y', data[1].y - 0.5 * abilityScale * repIconLarge.height)
          .attr('width',  (abilityScale * repIconLarge.width)  + 'px')
          .attr('height', (abilityScale * repIconLarge.height) + 'px')
          .attr('href', abilityImageLookup[abilityIndex.recall]);
      }
      else if(act == 's') // Setup
      {
        reportGraphBots.append('image').attr('class', 'svg_report_image')
          .attr('x', data[1].x - 0.5 * abilityScale * repIconLarge.width)
          .attr('y', data[1].y - 0.5 * abilityScale * repIconLarge.height)
          .attr('width',  (abilityScale * repIconLarge.width)  + 'px')
          .attr('height', (abilityScale * repIconLarge.height) + 'px')
          .attr('href', abilityImageLookup[abilityIndex.setup]);
      }
      else if(act == 'u') // Unsetup
      {
        reportGraphBots.append('image').attr('class', 'svg_report_image')
          .attr('x', data[1].x - 0.5 * abilityScale * repIconLarge.width)
          .attr('y', data[1].y - 0.5 * abilityScale * repIconLarge.height)
          .attr('width',  (abilityScale * repIconLarge.width)  + 'px')
          .attr('height', (abilityScale * repIconLarge.height) + 'px')
          .attr('href', abilityImageLookup[abilityIndex.unsetup]);
      }
      else if(act == 'g') // Guardian Shield
      {
        reportGraphBots.append('image').attr('class', 'svg_report_image')
          .attr('x', data[1].x - 0.5 * abilityScale * repIconLarge.width)
          .attr('y', data[1].y - 0.5 * abilityScale * repIconLarge.height)
          .attr('width',  (abilityScale * repIconLarge.width)  + 'px')
          .attr('height', (abilityScale * repIconLarge.height) + 'px')
          .attr('href', abilityImageLookup[abilityIndex.guardianshield]);
      }
    }
  }

  reportSlider
    .attr('min', 0)
    .attr('max', GlobalData.reportSummary[0].duration);
  reportSlider._groups[0][0].value = `${reportTimeStep}`;
  reportSlider._groups[0][0].valueAsNumber = reportTimeStep;

  reportTime
    .attr('min', 0)
    .attr('max', GlobalData.reportSummary[0].duration)
    .attr('value', reportTimeStep);
  reportTime._groups[0][0].value = `${reportTimeStep}`;
  reportTime._groups[0][0].valueAsNumber = reportTimeStep;
  reportTimeDenom.text(" / " + (GlobalData.reportSummary[0].duration) + "s");

  reportSelect
    .attr('min', 1)
    .attr('max', cMaxNumReports)
    .attr('value', reportIdx);
  reportSelectDenom.text(" / " + cMaxNumReports);

  drawReportScores();
  drawReportDecks();
}

//
//
//
function drawReportScores()
{
  reportScore.selectAll("*").remove();

  // Draw army counts/value
  var p1Res = 0.0;
  var p2Res = 0.0;
  for(var i = 0; i < GlobalData.reportSummary[0].unitCount; ++i)
  {
    if(GlobalData.reportData[reportTimeStep][i].teamIdx == 1)
    {
      if(GlobalData.reportData[reportTimeStep][i].action != "x")
      {
        p1Res += GlobalData.bots[GlobalData.reportData[reportTimeStep][i].botIdx].ResTotal;
      }
    }
    else
    {
      if(GlobalData.reportData[reportTimeStep][i].action != "x")
      {
        p2Res += GlobalData.bots[GlobalData.reportData[reportTimeStep][i].botIdx].ResTotal;
      }
    }
  }
  var scoreStep = Math.min(reportTimeStep+1, GlobalData.reportSummary[0].duration);
  var p1Score = Math.max(0.0, GlobalData.reportData[scoreStep].p1Score - p1Res); // TODO: Note that this cannot represent sim-specific values for res cost.
  var p2Score = Math.max(0.0, GlobalData.reportData[scoreStep].p2Score - p2Res);
  var scoreTotal = p1Res + p1Score + p2Res + p2Score;
  var svg = reportScore.append('svg').style('width', '866px').style('height', '41px')
    .append('g')
    .attr("transform", 'translate(65,1)');
  svg.append('rect').attr('class', 'svg_shape_dark')
    .classed('selected', true)
    .attr('x', 0)
    .attr('y', 5)
    .attr('width', `${p1Res / scoreTotal * 100}%`)
    .attr('height', 40)
  svg.append('rect').attr('class', 'svg_shape_secondary')
    .attr('x', p1Res / scoreTotal * 800)
    .attr('y', 5)
    .attr('width', `${p1Score / scoreTotal * 100}%`)
    .attr('height', 40)
  svg.append('rect').attr('class', 'svg_shape_tertiary')
    .attr('x', (p1Res + p1Score) / scoreTotal * 800)
    .attr('y', 5)
    .attr('width', `${p2Score / scoreTotal * 100}%`)
    .attr('height', 40);
  svg.append('rect').attr('class', 'svg_shape_dark')
    .classed('highlighted', true)
    .attr('x', (p1Res + p1Score + p2Score) / scoreTotal * 800)
    .attr('y', 5)
    .attr('width', `${p2Res / scoreTotal * 100}%`)
    .attr('height', 40);
  svg.append("path")
    .attr("class", "svg_line")
    .attr("fill", "none")
    .attr("d", drawLine([ { x: 0,   y: 5, },
                          { x: 800, y: 5, },
                          { x: 800, y: 40, },
                          { x: 0,   y: 40, },
                          { x: 0,   y: 5, },]));
}

//
//
//
function drawReportDecks()
{
  reportDecks.selectAll("*").remove();
  
  var botMap = [[], []];

  for(var i = 0; i < botCount; ++i)
  {
    botMap[0][i] = -1;
    botMap[1][i] = -1;
  }

  var unitList = [[], []];
  var unitAlive = [[], []];
  var unitTotal = [[], []];
  for(var i = 0; i < deckslotNameLookup.length; ++i)
  {
    unitList[0][i] = -1;
    unitList[1][i] = -1;
    unitAlive[0][i] = 0;
    unitAlive[1][i] = 0;
    unitTotal[0][i] = 0;
    unitTotal[1][i] = 0;
  }

  for(var i = 0; i < GlobalData.reportSummary[0].unitCount; ++i)
  {
    var unitIdx = GlobalData.reportData[reportTimeStep][i].botIdx;
    var team = GlobalData.reportData[reportTimeStep][i].teamIdx - 1;

    if(botMap[team][unitIdx] == -1)
    {
      if(botTechMap[techIndex.core] <= unitIdx && unitIdx < botTechMap[techIndex.foundry])
      {
        var core1Assigned = false;
        for(var j = 0; j < botCount; ++j)
        {
          if(botMap[team][j] == deckslotIndex.core1)
          {
            core1Assigned = true;
            break;
          }
        }
        if(!core1Assigned)
        {
          botMap[team][unitIdx] = deckslotIndex.core1;
        }
        else
        {
          botMap[team][unitIdx] = deckslotIndex.core2;
        }
      }
      else if(botTechMap[techIndex.foundry] <= unitIdx && unitIdx < botTechMap[techIndex.advfoundry])
      {
        var foundryAssigned = false;
        for(var j = 0; j < botCount; ++j)
        {
          if(botMap[team][j] == deckslotIndex.foundry)
          {
            foundryAssigned = true;
            break;
          }
        }
        if(!foundryAssigned)
        {
          botMap[team][unitIdx] = deckslotIndex.foundry;
        }
        else
        {
          botMap[team][unitIdx] = deckslotIndex.wildfoundry;
        }
      }
      else if(botTechMap[techIndex.advfoundry] <= unitIdx && unitIdx < botTechMap[techIndex.starforge])
      {
        var advfoundryAssigned = false;
        for(var j = 0; j < botCount; ++j)
        {
          if(botMap[team][j] == deckslotIndex.advfoundry)
          {
            advfoundryAssigned = true;
            break;
          }
        }
        if(!advfoundryAssigned)
        {
          botMap[team][unitIdx] = deckslotIndex.advfoundry;
        }
        else
        {
          botMap[team][unitIdx] = deckslotIndex.wildfoundry;
        }
      }
      else if(botTechMap[techIndex.starforge] <= unitIdx && unitIdx < botTechMap[techIndex.advstarforge])
      {
        var starforgeAssigned = false;
        for(var j = 0; j < botCount; ++j)
        {
          if(botMap[team][j] == deckslotIndex.starforge)
          {
            starforgeAssigned = true;
            break;
          }
        }
        if(!starforgeAssigned)
        {
          botMap[team][unitIdx] = deckslotIndex.starforge;
        }
        else
        {
          botMap[team][unitIdx] = deckslotIndex.wildstarforge;
        }
      }
      else if(botTechMap[techIndex.advstarforge] <= unitIdx)
      {
        var advstarforgeAssigned = false;
        for(var j = 0; j < botCount; ++j)
        {
          if(botMap[team][j] == deckslotIndex.advstarforge)
          {
            advstarforgeAssigned = true;
            break;
          }
        }
        if(!advstarforgeAssigned)
        {
          botMap[team][unitIdx] = deckslotIndex.advstarforge;
        }
        else
        {
          botMap[team][unitIdx] = deckslotIndex.wildstarforge;
        }
      }
    }

    if(GlobalData.reportData[reportTimeStep][i].action != "x")
    {
      unitAlive[team][botMap[team][unitIdx]]++;
    }
    unitTotal[team][botMap[team][unitIdx]]++;
    unitList[team][botMap[team][unitIdx]] = unitIdx;
  }

  var reportDeckDisplay = reportDecks.append('svg')
    .style('width', '100%')
    .style('height', '100%')
    .attr("transform", 'translate(60,10)');
  drawReportDeck(reportDeckDisplay, unitList[0], unitAlive[0], unitTotal[0], 0);
  drawReportDeck(reportDeckDisplay, unitList[1], unitAlive[1], unitTotal[1], 1);
}

function drawReportDeck(deck, unitList, unitAlive, unitTotal, teamIdx)
{
  var slotIdx = 0;
  const teamClassText = teamIdx == 0 ? 'svg_text_secondary' : 'svg_text_tertiary';
  const teamClassShapeRes = teamIdx == 0 ? 'selected' : 'highlighted';
  const teamClassShapeScore = teamIdx == 0 ? 'svg_shape_secondary' : 'svg_shape_tertiary';
  unitList.forEach((d, i) =>{
    var xBase = 0;
    var yBase = 0;
    if(slotIdx <= 1)
    {
      xBase = (4 * teamIdx + 0) * (repIconSmall + 50 + 4);
      yBase = 100.0 * Math.floor(slotIdx / 1);
    }
    else
    {
      xBase = (4 * teamIdx + 1 + (slotIdx - 2) % 3) * (repIconSmall + 50 + 4);
      yBase = 100.0 * Math.floor((slotIdx - 2) / 3);
    }

    if(d == -1)
    {
      deck.append('image').attr('class', 'svg_report_image')
        .attr('x', xBase)
        .attr('y', yBase)
        .attr('width', repIconSmall)
        .attr('height', repIconSmall)
        .attr('filter', 'invert(100%)')
        .attr('href', deckslotImageLookup[i])
        .attr('alt', deckslotNameLookup[i]);
    }
    else
    {
      deck.append('image').attr('class', 'svg_report_image')
        .classed('teamA', teamIdx == 0)
        .classed('teamB', teamIdx == 1)
        .attr('x', xBase)
        .attr('y', yBase)
        .attr('width', repIconSmall)
        .attr('height', repIconSmall)
        .attr('filter', 'invert(100%)')
        .attr('href', botImageLookup[d])
        .attr('alt', botNameLookup[d])
        .classed('dead', (unitAlive[i] == 0));
      deck.append('text').attr('class', teamClassText)
        .attr('text-anchor', 'left')
        .attr('x', xBase + 50)
        .attr('y', yBase + 32)
        .attr('font-size', '30px')
        .text(unitAlive[i]);// + " / " + d);
    }

    if(unitTotal[i] > 0)
    {
      var scoreStep = Math.min(reportTimeStep+1, GlobalData.reportSummary[0].duration);
      var botCost = GlobalData.bots[d].ResTotal;
      var botResValue = unitAlive[i] * botCost;
      var botScore = Math.max(0.0, GlobalData.reportData[scoreStep].p1BotScores[d] - botResValue);
      if(teamIdx == 1)
      {
        botScore = Math.max(0.0, GlobalData.reportData[scoreStep].p2BotScores[d] - botResValue);
      }
      var botMaxScore = Math.max(unitTotal[i] * botCost, botScore);
      var resScoreRatio = botResValue / Math.max(1.0, (unitTotal[i] * botCost + botMaxScore));
      var dmgScoreRatio = botScore / Math.max(1.0, (unitTotal[i] * botCost + botMaxScore));
      deck.append('rect').attr('class', 'svg_shape_dark')
        .classed(teamClassShapeRes, true)
        .attr('x', xBase)
        .attr('y', yBase + 62)
        .attr('width', `${resScoreRatio * 80}px`)
        .attr('height', 15);
      deck.append('rect').attr('class', teamClassShapeScore)
        .attr('x', xBase + resScoreRatio * 80)
        .attr('y', yBase + 62)
        .attr('width', `${dmgScoreRatio * 80}px`)
        .attr('height', 15);
      deck.append("path").attr("class", "svg_line")
        .attr("fill", "none")
        .attr("d", drawLine([ { x: 0  + xBase,  y: yBase + 62, },
                              { x: 80 + xBase,  y: yBase + 62, },
                              { x: 80 + xBase,  y: yBase + 77, },
                              { x: 0  + xBase,  y: yBase + 77, },
                              { x: 0  + xBase,  y: yBase + 62, },]));
      deck.append("line").attr('class', 'svg_line')
        .attr("x1", xBase + (unitTotal[i] * botCost) / Math.max(1.0, (unitTotal[i] * botCost + botMaxScore)) * 80)
        .attr("x2", xBase + (unitTotal[i] * botCost) / Math.max(1.0, (unitTotal[i] * botCost + botMaxScore)) * 80)
        .attr("y1", yBase + 62-10)
        .attr("y2", yBase + 77+10);
      deck.append("line").attr('class', 'svg_line')
        .attr("x1", xBase + resScoreRatio * 80)
        .attr("x2", xBase + resScoreRatio * 80)
        .attr("y1", yBase + 62)
        .attr("y2", yBase + 77);
    }

    slotIdx++;
  });
}