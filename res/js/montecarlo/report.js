
var graphWidth = 740.0;
var graphHeight = 740.0;
var repWidth = 1480.0;
var repHeight = 1480.0;
var boundary = 0.0;
var repIconSmall = { width: 15, height: 15 };
var repIconLarge = { width: 20, height: 20 };
var repIconSmallPx = { width: '15px', height: '15px' };
var repIconLargePx = { width: '18px', height: '18px' };

var reportIdx = 1;
var reportTimeStep = 0;

const reportDisplay = d3.select('#viz-report').append('div').attr('class', 'row row-cols-2')
  .style('height', '800px');

const reportGraph = reportDisplay.append('div').attr('class', 'col')
  .style('width', '80%')
  .append('div').attr('class', 'col');
const reportGraphOverflow = reportGraph.append('div').attr('class', 'overflow-auto')
  .style('width', `${graphWidth}px`)
  .style('height', `${graphHeight}px`);  
const reportGraphBots = reportGraphOverflow.append('svg')
    .attr("width", repWidth)
    .attr("height", repHeight);

const reportDetail = reportDisplay.append('div').attr('class', 'col')
  .style('width', '20%')
  .style('height', '100%');
const reportDetail2 = reportDetail.append('div').attr('class', 'row row-cols-2')
  .style('height', '25px');
const reportSelect = reportDetail2.append('div').attr('class', 'col')
  .style('width', '50%')
  .append('input').attr('type', "number")
  .on("change", function(d){
    reportTimeStep = 0;
    reportIdx = this.value;
    reportGraphOverflow._groups[0][0].scrollLeft = graphWidth / 2.0;
    reportGraphOverflow._groups[0][0].scrollTop = graphHeight / 2.0;
    loadReports(reportIdx - 1);
  });
const reportSelectDenom = reportDetail2.append('div').attr('class', 'col')
  .style('width', '50%');
const reportScore = reportDetail.append('div')
  .style('height', '50px');
const reportDecks = reportDetail.append('div')
  .style('height', `${graphHeight-100.0}px`);

const reportControl = reportGraph.append('div').attr('class', 'row row-cols-3');

const reportSlider = reportControl.append('div').attr('class', 'col')
  .style('width', '80%')
  .append('input').attr('class', 'slider')
  .attr('type', 'range')
  .on("change", function(d){
    reportTimeStep = this.value;
    drawReport();
  });

const reportTime = reportControl.append('div').attr('class', 'col')
  .style('width', '10%')
  .append('input').attr('type', "number")
  .on("change", function(d){
    reportTimeStep = this.value;
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
const carteLine = d3.line((d) => x(d.x), (d) => y(d.y));

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
  reportScore.selectAll("*").remove();
  reportDecks.selectAll("*").remove();
  
  if(firstDraw)
  {
    reportGraphOverflow._groups[0][0].scrollLeft = graphWidth / 2.0;
    reportGraphOverflow._groups[0][0].scrollTop = graphHeight / 2.0;
    firstDraw = false;
  }

  // Draw battlefield boundaries.
  reportGraphBots.append("path")
    .attr("class", "svg_line")
    .attr("fill", "none")
    .attr("d", carteLine(repBorderTable));
  for(var i = 1; i <= 9; ++i)
  {
    reportGraphBots.append("path")
      .attr("class", "svg_line")
      .classed('soften', true)
      .attr("fill", "none")
      .attr("d", carteLine([ { x: repBorderTable[0].x + (i * repWidth / 10.0), y: repBorderTable[0].y },
                             { x: repBorderTable[0].x + (i * repWidth / 10.0), y: repBorderTable[2].y }, ]));
    reportGraphBots.append("path")
      .attr("class", "svg_line")
      .classed('soften', true)
      .attr("fill", "none")
      .attr("d", carteLine([ { x: repBorderTable[0].x, y: repBorderTable[0].y + (i * repHeight / 10.0) },
                             { x: repBorderTable[1].x, y: repBorderTable[0].y + (i * repHeight / 10.0) }, ]));
  }

  var fieldWidth = repWidth - 2.0 * boundary;
  var fieldHeight = repHeight - 2.0 * boundary;

  // Draw dead bots first, without borders.
  for(var unitIdx = 0; unitIdx < GlobalData.reportSummary[0].unitCount; ++unitIdx)
  {
    var topLeftX = boundary + GlobalData.reportData[reportTimeStep][unitIdx].posX * fieldWidth  / GlobalData.reportSummary[0].width - 0.5 * repIconLarge.width;
    var topLeftY = boundary + GlobalData.reportData[reportTimeStep][unitIdx].posY * fieldHeight / GlobalData.reportSummary[0].height - 0.5 * repIconLarge.height;
    var iamgePath = botImageLookup[GlobalData.reportData[reportTimeStep][unitIdx].botIdx];
    if(GlobalData.reportData[reportTimeStep][unitIdx].action == "x")
    {
      reportGraphBots.append('image').attr('class', 'svg_report_image')
        .classed('teamA', true)
        .classed('dead', true)
        .attr('x', topLeftX)
        .attr('y', topLeftY)
        .attr('width', repIconLargePx.width)
        .attr('height', repIconLargePx.height)
        .attr('href', iamgePath);
    }
  }

  // Draw living bots, make lines faded.
  for(var unitIdx = 0; unitIdx < GlobalData.reportSummary[0].unitCount; ++unitIdx)
  {
    if(GlobalData.reportData[reportTimeStep][unitIdx].action != "x")
    {
      var topLeftX = boundary + GlobalData.reportData[reportTimeStep][unitIdx].posX * fieldWidth  / GlobalData.reportSummary[0].width  - 0.5 * repIconLarge.width;
      var topLeftY = boundary + GlobalData.reportData[reportTimeStep][unitIdx].posY * fieldHeight / GlobalData.reportSummary[0].height - 0.5 * repIconLarge.height;
      reportGraphBots.append("path")
        .attr("class", "svg_line")
        .attr("fill", "none")
        .attr("d", carteLine([ { x: topLeftX,                             y: topLeftY + repIconLarge.height * 0.50, },
                               { x: topLeftX + repIconLarge.width * 0.25, y: topLeftY + repIconLarge.height * 0.13, },
                               { x: topLeftX + repIconLarge.width * 0.75, y: topLeftY + repIconLarge.height * 0.13, },
                               { x: topLeftX + repIconLarge.width,        y: topLeftY + repIconLarge.height * 0.50, },
                               { x: topLeftX + repIconLarge.width * 0.75, y: topLeftY + repIconLarge.height * 0.87, },
                               { x: topLeftX + repIconLarge.width * 0.25, y: topLeftY + repIconLarge.height * 0.87, },
                               { x: topLeftX,                             y: topLeftY + repIconLarge.height * 0.50, }, ]));

      var className = 'teamA';
      if(GlobalData.reportData[reportTimeStep][unitIdx].teamIdx == 2)
      {
        var className = 'teamB';
      }
      var data = [ { x: boundary + GlobalData.reportData[reportTimeStep][unitIdx].posX * fieldWidth  / GlobalData.reportSummary[0].width  + 1,
                     y: boundary + GlobalData.reportData[reportTimeStep][unitIdx].posY * fieldHeight / GlobalData.reportSummary[0].height + 1 },
                   { x: boundary + GlobalData.reportData[reportTimeStep][unitIdx].actX * fieldWidth  / GlobalData.reportSummary[0].width  + 1,
                     y: boundary + GlobalData.reportData[reportTimeStep][unitIdx].actY * fieldHeight / GlobalData.reportSummary[0].height + 1 } ];
      if(GlobalData.reportData[reportTimeStep][unitIdx].action == 'm')
      {
        reportGraphBots.append("path").attr('class', 'svg_report_line')
          .classed(className, true)
          .attr("d", carteLine(data));
      }
      else if(GlobalData.reportData[reportTimeStep][unitIdx].action == 'a')
      {
        reportGraphBots.append("path").attr('class', 'svg_report_line')
          .classed(className, true)
          .attr("d", carteLine(data))
          .attr('stroke-dasharray', '5,5');
      }

      var imagePath = botImageLookup[GlobalData.reportData[reportTimeStep][unitIdx].botIdx];
      reportGraphBots.append('image').attr('class', 'svg_report_image')
        .classed(className, true)
        .attr('x', topLeftX)
        .attr('y', topLeftY)
        .attr('width', repIconLargePx.width)
        .attr('height', repIconLargePx.height)
        .attr('href', imagePath);
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
  reportTimeDenom.text(" / " + (GlobalData.reportSummary[0].duration));

  reportSelect
    .attr('min', 1)
    .attr('max', 1000)
    .attr('value', reportIdx);
  reportSelectDenom.text(" / " + 1000);

  // Draw army counts/value
  p1Score = GlobalData.reportData[0].p1Score - (GlobalData.reportData[reportTimeStep].p2Score - GlobalData.reportData[0].p2Score)
  p2Score = GlobalData.reportData[0].p2Score - (GlobalData.reportData[reportTimeStep].p1Score - GlobalData.reportData[0].p1Score)
  var svg = reportScore.append('svg').style('height', '100%');
  svg.append('rect').attr('class', 'svg_shape_secondary')
    .attr('x', 0)
    .attr('y', 5)
    .attr('width', 170 * p1Score / (p1Score + p2Score))
    .attr('height', 40)
  svg.append('rect').attr('class', 'svg_shape_tertiary')
    .attr('x', 170 * p1Score / (p1Score + p2Score))
    .attr('y', 5)
    .attr('width', 170 * p2Score / (p1Score + p2Score))
    .attr('height', 40);
  svg.append("path")
    .attr("class", "svg_line")
    .attr("fill", "none")
    .attr("d", carteLine([ { x: 0,   y: 5, },
                           { x: 170, y: 5, },
                           { x: 170, y: 45, },
                           { x: 0,   y: 45, },
                           { x: 0,   y: 5, },]));

  var botMapA = [];
  var botMapB = [];
  for(var i = 0; i < botNameLookup.length; ++i)
  {
    botMapA[i] = -1;
    botMapB[i] = -1;
  }
  var unitIdxA = []
  var unitIdxB = []
  var unitAliveA = [];
  var unitAliveB = [];
  var unitTotalA = [];
  var unitTotalB = [];
  for(var i = 0; i < deckslotNameLookup.length; ++i)
  {
    unitIdxA[i] = -1;
    unitAliveA[i] = 0;
    unitTotalA[i] = 0;
    unitIdxB[i] = -1;
    unitAliveB[i] = 0;
    unitTotalB[i] = 0;
  }
  for(var i = 0; i < GlobalData.reportSummary[0].unitCount; ++i)
  {
    var unitIdx = GlobalData.reportData[reportTimeStep][i].botIdx;
    if(GlobalData.reportData[reportTimeStep][i].teamIdx == 1)
    {
      if(botMapA[unitIdx] == -1)
      {
        if(botTechMap[techIndex.core] <= unitIdx && unitIdx < botTechMap[techIndex.foundry])
        {
          var core1Assigned = false;
          for(var j = 0; j < botNameLookup.length; ++j)
          {
            if(botMapA[j] == deckslotIndex.core1)
            {
              core1Assigned = true;
              break;
            }
          }
          if(!core1Assigned)
          {
            botMapA[unitIdx] = deckslotIndex.core1;
          }
          else
          {
            botMapA[unitIdx] = deckslotIndex.core2;
          }
        }
        else if(botTechMap[techIndex.foundry] <= unitIdx && unitIdx < botTechMap[techIndex.advfoundry])
        {
          var foundryAssigned = false;
          for(var j = 0; j < botNameLookup.length; ++j)
          {
            if(botMapA[j] == deckslotIndex.foundry)
            {
              foundryAssigned = true;
              break;
            }
          }
          if(!foundryAssigned)
          {
            botMapA[unitIdx] = deckslotIndex.foundry;
          }
          else
          {
            botMapA[unitIdx] = deckslotIndex.wildfoundry;
          }
        }
        else if(botTechMap[techIndex.advfoundry] <= unitIdx && unitIdx < botTechMap[techIndex.starforge])
        {
          var advfoundryAssigned = false;
          for(var j = 0; j < botNameLookup.length; ++j)
          {
            if(botMapA[j] == deckslotIndex.advfoundry)
            {
              advfoundryAssigned = true;
              break;
            }
          }
          if(!advfoundryAssigned)
          {
            botMapA[unitIdx] = deckslotIndex.advfoundry;
          }
          else
          {
            botMapA[unitIdx] = deckslotIndex.wildfoundry;
          }
        }
        else if(botTechMap[techIndex.starforge] <= unitIdx && unitIdx < botTechMap[techIndex.advstarforge])
        {
          var starforgeAssigned = false;
          for(var j = 0; j < botNameLookup.length; ++j)
          {
            if(botMapA[j] == deckslotIndex.starforge)
            {
              starforgeAssigned = true;
              break;
            }
          }
          if(!starforgeAssigned)
          {
            botMapA[unitIdx] = deckslotIndex.starforge;
          }
          else
          {
            botMapA[unitIdx] = deckslotIndex.wildstarforge;
          }
        }
        else if(botTechMap[techIndex.advstarforge] <= unitIdx)
        {
          var advstarforgeAssigned = false;
          for(var j = 0; j < botNameLookup.length; ++j)
          {
            if(botMapA[j] == deckslotIndex.advstarforge)
            {
              advstarforgeAssigned = true;
              break;
            }
          }
          if(!advstarforgeAssigned)
          {
            botMapA[unitIdx] = deckslotIndex.advstarforge;
          }
          else
          {
            botMapA[unitIdx] = deckslotIndex.wildstarforge;
          }
        }
      }

      if(GlobalData.reportData[reportTimeStep][i].action != "x")
      {
        unitAliveA[botMapA[unitIdx]]++;
      }
      unitTotalA[botMapA[unitIdx]]++;
      unitIdxA[botMapA[unitIdx]] = unitIdx;
    }
    else
    {
      if(botMapB[unitIdx] == -1)
      {
        if(botTechMap[techIndex.core] <= unitIdx && unitIdx < botTechMap[techIndex.foundry])
        {
          var core1Assigned = false;
          for(var j = 0; j < botNameLookup.length; ++j)
          {
            if(botMapB[j] == deckslotIndex.core1)
            {
              core1Assigned = true;
              break;
            }
          }
          if(!core1Assigned)
          {
            botMapB[unitIdx] = deckslotIndex.core1;
          }
          else
          {
            botMapB[unitIdx] = deckslotIndex.core2;
          }
        }
        else if(botTechMap[techIndex.foundry] <= unitIdx && unitIdx < botTechMap[techIndex.advfoundry])
        {
          var foundryAssigned = false;
          for(var j = 0; j < botNameLookup.length; ++j)
          {
            if(botMapB[j] == deckslotIndex.foundry)
            {
              foundryAssigned = true;
              break;
            }
          }
          if(!foundryAssigned)
          {
            botMapB[unitIdx] = deckslotIndex.foundry;
          }
          else
          {
            botMapB[unitIdx] = deckslotIndex.wildfoundry;
          }
        }
        else if(botTechMap[techIndex.advfoundry] <= unitIdx && unitIdx < botTechMap[techIndex.starforge])
        {
          var advfoundryAssigned = false;
          for(var j = 0; j < botNameLookup.length; ++j)
          {
            if(botMapB[j] == deckslotIndex.advfoundry)
            {
              advfoundryAssigned = true;
              break;
            }
          }
          if(!advfoundryAssigned)
          {
            botMapB[unitIdx] = deckslotIndex.advfoundry;
          }
          else
          {
            botMapB[unitIdx] = deckslotIndex.wildfoundry;
          }
        }
        else if(botTechMap[techIndex.starforge] <= unitIdx && unitIdx < botTechMap[techIndex.advstarforge])
        {
          var starforgeAssigned = false;
          for(var j = 0; j < botNameLookup.length; ++j)
          {
            if(botMapB[j] == deckslotIndex.starforge)
            {
              starforgeAssigned = true;
              break;
            }
          }
          if(!starforgeAssigned)
          {
            botMapB[unitIdx] = deckslotIndex.starforge;
          }
          else
          {
            botMapB[unitIdx] = deckslotIndex.wildstarforge;
          }
        }
        else if(botTechMap[techIndex.advstarforge] <= unitIdx)
        {
          var advstarforgeAssigned = false;
          for(var j = 0; j < botNameLookup.length; ++j)
          {
            if(botMapB[j] == deckslotIndex.advstarforge)
            {
              advstarforgeAssigned = true;
              break;
            }
          }
          if(!advstarforgeAssigned)
          {
            botMapB[unitIdx] = deckslotIndex.advstarforge;
          }
          else
          {
            botMapB[unitIdx] = deckslotIndex.wildstarforge;
          }
        }
      }

      if(GlobalData.reportData[reportTimeStep][i].action != "x")
      {
        unitAliveB[botMapB[unitIdx]]++;
      }
      unitIdxB[botMapB[unitIdx]] = unitIdx;
      unitTotalB[botMapB[unitIdx]]++;
    }
  }

  var slotIdx = 0;
  var reportDeckA = reportDecks.append('svg')
    .style('width', '50%')
    .style('height', '100%');
  var reportDeckB = reportDecks.append('svg')
    .style('width', '50%')
    .style('height', '100%');

  unitIdxA.forEach((d, i) =>{
    if(d == -1)
    {
      reportDeckA.append('image').attr('class', 'svg_report_image')
        .attr('x', 0)
        .attr('y', slotIdx * (35 + 4))
        .attr('width', 35)
        .attr('height', 35)
        .attr('filter', 'invert(100%)')
        .attr('href', deckslotImageLookup[i])
        .attr('alt', deckslotNameLookup[i]);
    }
    else
    {
      reportDeckA.append('image').attr('class', 'svg_report_image')
        .attr('x', 0)
        .attr('y', slotIdx * (35 + 4))
        .attr('width', 35)
        .attr('height', 35)
        .attr('filter', 'invert(100%)')
        .attr('href', botImageLookup[d])
        .attr('alt', botNameLookup[d])
        .classed('teamA', true)
        .classed('dead', (unitAliveA[i] == 0));
      reportDeckA.append('text').attr('class', 'svg_text_secondary')
        .attr('text-anchor', 'end')
        .attr('x', 83)
        .attr('y', slotIdx * (35 + 4) + 28)
        .attr('font-size', '30px')
        .text(unitAliveA[i]);// + " / " + d);
    }
    slotIdx++;
  });
  var slotIdx = 0;
  unitIdxB.forEach((d, i) =>{
    if(d == -1)
    {
      reportDeckB.append('image').attr('class', 'svg_report_image')
        .attr('x', 50)
        .attr('y', slotIdx * (35 + 4))
        .attr('width', 35)
        .attr('height', 35)
        .attr('filter', 'invert(100%)')
        .attr('href', deckslotImageLookup[i])
        .attr('alt', deckslotNameLookup[i]);
    }
    else
    {
      reportDeckB.append('image').attr('class', 'svg_report_image')
        .attr('x', 50)
        .attr('y', slotIdx * (35 + 4))
        .attr('width', 35)
        .attr('height', 35)
        .attr('filter', 'invert(100%)')
        .attr('href', botImageLookup[d])
        .attr('alt', botNameLookup[d])
        .classed('teamB', true)
        .classed('dead', (unitAliveB[i] == 0));
      reportDeckB.append('text').attr('class', 'svg_text_tertiary')
        .attr('text-anchor', 'start')
        .attr('x', 2)
        .attr('y', slotIdx * (35 + 4) + 28)
        .attr('font-size', '30px')
        .text(unitAliveB[i]);// + " / " + d);
    }
    slotIdx++;
  });
}
