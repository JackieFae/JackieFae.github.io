//
// Draw plot of results for a selected plot.
//
var resultSelection = botIndex.crab;
var showResultsAll = false;

const resultGraph = d3.select('#viz-results').append('div').attr('class', 'overflow-auto').append('svg')
  .attr("width", width-12 + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);

// Add event listener to the select box
var resultSelectButton = d3.select('#scoreBotButton');
d3.select('#scoreBotCrab').on('click', () => selectUnit(d3.select("#scoreBotCrab").attr('value')));
d3.select('#scoreBotHunter').on('click', () => selectUnit(d3.select("#scoreBotHunter").attr('value')));
d3.select('#scoreBotGuardianShield').on('click', () => selectUnit(d3.select("#scoreBotGuardianShield").attr('value')));
d3.select('#scoreBotRecall').on('click', () => selectUnit(d3.select("#scoreBotRecall").attr('value')));
d3.select('#scoreBotRecallHunter').on('click', () => selectUnit(d3.select("#scoreBotRecallHunter").attr('value')));
d3.select('#scoreBotScorpion').on('click', () => selectUnit(d3.select("#scoreBotScorpion").attr('value')));
d3.select('#scoreBotBeetle').on('click', () => selectUnit(d3.select("#scoreBotBeetle").attr('value')));
d3.select('#scoreBotBlink').on('click', () => selectUnit(d3.select("#scoreBotBlink").attr('value')));
d3.select('#scoreBotBlinkHunter').on('click', () => selectUnit(d3.select("#scoreBotBlinkHunter").attr('value')));
d3.select('#scoreBotGunbot').on('click', () => selectUnit(d3.select("#scoreBotGunbot").attr('value')));
d3.select('#scoreBotMissilebot').on('click', () => selectUnit(d3.select("#scoreBotMissilebot").attr('value')));
d3.select('#scoreBotWasp').on('click', () => selectUnit(d3.select("#scoreBotWasp").attr('value')));
d3.select('#scoreBotHornet').on('click', () => selectUnit(d3.select("#scoreBotHornet").attr('value')));
d3.select('#scoreBotKnight').on('click', () => selectUnit(d3.select("#scoreBotKnight").attr('value')));
d3.select('#scoreBotCrossbow').on('click', () => selectUnit(d3.select("#scoreBotCrossbow").attr('value')));
d3.select('#scoreBotBallista').on('click', () => selectUnit(d3.select("#scoreBotBallista").attr('value')));
d3.select('#scoreBotKingCrab').on('click', () => selectUnit(d3.select("#scoreBotKingCrab").attr('value')));
d3.select('#scoreBotCrusader').on('click', () => selectUnit(d3.select("#scoreBotCrusader").attr('value')));
d3.select('#scoreBotBomber').on('click', () => selectUnit(d3.select("#scoreBotBomber").attr('value')));
d3.select('#scoreBotShocker').on('click', () => selectUnit(d3.select("#scoreBotShocker").attr('value')));
d3.select('#scoreBotRecallShocker').on('click', () => selectUnit(d3.select("#scoreBotRecallShocker").attr('value')));
d3.select('#scoreBotMortar').on('click', () => selectUnit(d3.select("#scoreBotMortar").attr('value')));
d3.select('#scoreBotSwiftShocker').on('click', () => selectUnit(d3.select("#scoreBotSwiftShocker").attr('value')));
d3.select('#scoreBotHeavyHunter').on('click', () => selectUnit(d3.select("#scoreBotHeavyHunter").attr('value')));
d3.select('#scoreBotDestroyer').on('click', () => selectUnit(d3.select("#scoreBotDestroyer").attr('value')));
d3.select('#scoreBotRaider').on('click', () => selectUnit(d3.select("#scoreBotRaider").attr('value')));
d3.select('#scoreBotTurret').on('click', () => selectUnit(d3.select("#scoreBotTurret").attr('value')));
d3.select('#scoreBotHeavyBallista').on('click', () => selectUnit(d3.select("#scoreBotHeavyBallista").attr('value')));
d3.select('#scoreBotGargantua').on('click', () => selectUnit(d3.select("#scoreBotGargantua").attr('value')));
d3.select('#scoreBotSniper').on('click', () => selectUnit(d3.select("#scoreBotSniper").attr('value')));
d3.select('#scoreBotAdvancedBlink').on('click', () => selectUnit(d3.select("#scoreBotAdvancedBlink").attr('value')));
d3.select('#scoreBotAssaultbot').on('click', () => selectUnit(d3.select("#scoreBotAssaultbot").attr('value')));
d3.select('#scoreBotAdvancedbot').on('click', () => selectUnit(d3.select("#scoreBotAdvancedbot").attr('value')));
d3.select('#scoreBotBehemoth').on('click', () => selectUnit(d3.select("#scoreBotBehemoth").attr('value')));
d3.select('#scoreBotAdvancedMortar').on('click', () => selectUnit(d3.select("#scoreBotAdvancedMortar").attr('value')));
d3.select('#scoreBotBlaster').on('click', () => selectUnit(d3.select("#scoreBotBlaster").attr('value')));
d3.select('#scoreBotButterfly').on('click', () => selectUnit(d3.select("#scoreBotButterfly").attr('value')));
d3.select('#scoreBotDragonfly').on('click', () => selectUnit(d3.select("#scoreBotDragonfly").attr('value')));
d3.select('#scoreBotFalcon').on('click', () => selectUnit(d3.select("#scoreBotFalcon").attr('value')));
d3.select('#scoreBotAirship').on('click', () => selectUnit(d3.select("#scoreBotAirship").attr('value')));
d3.select('#scoreBotAdvancedRecall').on('click', () => selectUnit(d3.select("#scoreBotAdvancedRecall").attr('value')));
d3.select('#scoreBotMammoth').on('click', () => selectUnit(d3.select("#scoreBotMammoth").attr('value')));
d3.select('#scoreBotStinger').on('click', () => selectUnit(d3.select("#scoreBotStinger").attr('value')));
d3.select('#scoreBotFlakTurret').on('click', () => selectUnit(d3.select("#scoreBotFlakTurret").attr('value')));
d3.select('#scoreBotBulwark').on('click', () => selectUnit(d3.select("#scoreBotBulwark").attr('value')));
d3.select('#scoreBotKatbus').on('click', () => selectUnit(d3.select("#scoreBotKatbus").attr('value')));
d3.select('#scoreBotLocust').on('click', () => selectUnit(d3.select("#scoreBotLocust").attr('value')));
d3.select('#scoreBotKraken').on('click', () => selectUnit(d3.select("#scoreBotKraken").attr('value')));
d3.select('#scoreBotPredator').on('click', () => selectUnit(d3.select("#scoreBotPredator").attr('value')));
d3.select('#scoreBotValkyrie').on('click', () => selectUnit(d3.select("#scoreBotValkyrie").attr('value')));
d3.select('#scoreBotArtillery').on('click', () => selectUnit(d3.select("#scoreBotArtillery").attr('value')));
d3.select('#scoreBotAdvancedDestroyer').on('click', () => selectUnit(d3.select("#scoreBotAdvancedDestroyer").attr('value')));
d3.select('#scoreBotShade').on('click', () => selectUnit(d3.select("#scoreBotShade").attr('value')));

function selectUnit(value) {
  resultSelectButton.select('img').attr('src', botImageLookup[value]);
  resultSelectButton.select('span').text(botNameLookup[value]);
  drawResults(value);
}

d3.select('#points-button').on('click', () => {
  showResultsAll = true;
  drawResults(resultSelection);
});
d3.select('#means-button').on('click', () => {
  showResultsAll = false;
  drawResults(resultSelection);
});

function drawResults(newSelection)
{
  resultGraph.selectAll('*').remove();
  const svg = resultGraph.append('g')
    .attr("transform", `translate(${margin.left},${margin.top})`);

  resultSelection = newSelection;
  filterResults = GlobalData.resultDataBase.filter((d, i) => d.vars[resultSelection] != 0);
  filterResults = filterResults.slice().sort((a,b) => d3.ascending(a.scores[resultSelection], b.scores[resultSelection]));

  var bwCost = Math.max(1.0, GlobalData.bots[resultSelection].Bandwidth);
  var resCost = Math.max(1.0, GlobalData.bots[resultSelection].ResTotal);
  var counts = [0, parseInt(200.0 / bwCost)];
  if(GlobalData.bots[resultSelection].Passive)
  {
    counts = [0, 2];
  }
  var maxResult = d3.extent(filterResults, d => d.scores[resultSelection])[1];
  var originY = height;
  var originX = 0;

  if(showResultsAll)
  {
    filterResults.forEach((d, i) => {
      if(d.scores[resultSelection] > (resCost * d.vars[resultSelection]))
      {
        svg.append('g')
          .append('circle').attr('class', 'svg_shape_secondary')
          .attr('cx', 1.0 * originX + d.vars[resultSelection] / (counts[1] - counts[0]) * width)
          .attr('cy', originY + -d.scores[resultSelection] / maxResult * originY)
          .style('r', 3.0)
          .style('opacity', 0.3);
      }
      else
      {
        svg.append('g')
          .append('circle').attr('class', 'svg_shape_tertiary')
          .attr('cx', 1.0 * originX + d.vars[resultSelection] / (counts[1] - counts[0]) * width)
          .attr('cy', originY + -d.scores[resultSelection] / maxResult * originY)
          .style('r', 3.0)
          .style('opacity', 0.3);
      }
    });
  }
  else
  {
    var resultBars = [];
    resultBars[0] = { count: 0, bin: [], mean: 0.0, stddev: 0.0, firstQuartile: 0.0, thirdQuartile: 0.0 };

    filterResults.forEach((d, i) => {
      var posInt = d.vars[resultSelection];
      if(!resultBars[posInt])
      {
        resultBars[posInt] = { count: 0, bin: [], mean: 0.0, stddev: 0.0, firstQuartile: 0.0, thirdQuartile: 0.0, };
      }
      resultBars[posInt].count++;
      resultBars[posInt].bin[resultBars[posInt].bin.length] = d.scores[resultSelection];
      resultBars[posInt].mean += d.scores[resultSelection];
    });

    resultBars.forEach((d,i) => {
      if(i != 0)
      {
        d.mean /= d.count;
        d.firstQuartile = d.bin[Math.floor(d.count / 4.0)];
        d.thirdQuartile = d.bin[Math.floor(d.count * 3.0 / 4.0)];
      }
    });

    filterResults.forEach((d, i) => {
      var posInt = d.vars[resultSelection];
      if(resultBars[posInt].count != 1)
      {
        resultBars[posInt].stddev += (d.scores[resultSelection] - resultBars[posInt].mean) * (d.scores[resultSelection] - resultBars[posInt].mean);
      }
      else
      {
        resultBars[posInt].stddev = resultBars[posInt].mean * resultBars[posInt].mean;
      }
    });

    resultBars.forEach((d,i) => {
      if(i != 0)
      {
        d.stddev /= d.count;
        d.stddev = Math.sqrt(d.stddev);
      }
    });

    resultBars.forEach((d, i) => {
      if(d.mean != 0 && d.count > 1)
      {
        if(d.mean > (resCost * i))
        {
          svg.append('g')
            .append('circle').attr('class', 'svg_shape_secondary')
            .attr('cx', originX + (i + counts[0]) / (counts[1] - counts[0]) * width)
            .attr('cy', originY + -d.mean / maxResult * originY)
            .style('r', 2.5);
        }
        else
        {
          svg.append('g')
            .append('circle').attr('class', 'svg_shape_tertiary')
            .attr('cx', originX + (i + counts[0]) / (counts[1] - counts[0]) * width)
            .attr('cy', originY + -d.mean / maxResult * originY)
            .style('r', 2.5);
        }
        svg.append('line').attr('class', 'svg_line')
          .attr("x1", originX + (i + counts[0]) / (counts[1] - counts[0]) * width)
          .attr("x2", originX + (i + counts[0]) / (counts[1] - counts[0]) * width)
          .attr("y1", originY + -d.thirdQuartile / maxResult * originY)
          .attr("y2", originY + -d.firstQuartile / maxResult * originY)
          .style('opacity', 0.25)
          .style('fill', 'white');
      }
    });
  }

  // Add X axis
  const x = d3.scaleLinear()
    .domain(counts)
    .range([0, width]);
  svg.append("g")
    .attr("transform", `translate(0,${originY})`)
    .call(d3.axisBottom(x).tickFormat((d) => d));
  // Add Y axis
  const y = d3.scaleLinear()
    .domain(d3.extent(filterResults, d => d.scores[resultSelection]))
    .range([height, 0]);
  svg.append("g")
    .attr("transform", `translate(${originX},0)`)
    .call(d3.axisRight(y).tickFormat((d) => d));

  if(GlobalData.regDataBase[resultSelection].correlations[resultSelection].Weight > resCost)
  {
    svg.append("line").attr('class', 'svg_line_selected')
      .attr("x1", originX + counts[0] / (counts[1] - counts[0]) * width)
      .attr("x2", originX + counts[1] / (counts[1] - counts[0]) * width)
      .attr("y1", originY + (-GlobalData.regDataBase[resultSelection].correlations[resultSelection].Weight * counts[0]) / maxResult * originY)
      .attr("y2", originY + (-GlobalData.regDataBase[resultSelection].correlations[resultSelection].Weight * counts[1]) / maxResult * originY);
  }
  else
  {
    svg.append("line").attr('class', 'svg_line_highlighted')
      .attr("x1", originX + counts[0] / (counts[1] - counts[0]) * width)
      .attr("x2", originX + counts[1] / (counts[1] - counts[0]) * width)
      .attr("y1", originY + (-GlobalData.regDataBase[resultSelection].correlations[resultSelection].Weight * counts[0]) / maxResult * originY)
      .attr("y2", originY + (-GlobalData.regDataBase[resultSelection].correlations[resultSelection].Weight * counts[1]) / maxResult * originY);
  }

  svg.append("line").attr('class', 'svg_line')
    .attr("x1", originX + counts[0] / (counts[1] - counts[0]) * width)
    .attr("x2", originX + counts[1] / (counts[1] - counts[0]) * width)
    .attr("y1", originY + (-resCost * counts[0]) / maxResult * originY)
    .attr("y2", originY + (-resCost * counts[1]) / maxResult * originY);

  svg.append('text').attr('class', 'svg_text')
    .attr('y', -10)
    .text("Showing " + (parseInt(GlobalData.resultIdx.length / GlobalData.count * 1000.0)/10.0) + "% of all iterations");
/*
  var zoom = d3.zoom()
    .on('zoom', handleZoom);

  resultGraph.call(zoom);
*/
};
/*
function handleZoom(e) {
  d3.select('resultGraph g')
    .attr('transform', e.transform);
}
*/
