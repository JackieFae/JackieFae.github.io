//
// Draw plot of results for a selected plot.
//

var unitSupply = [
/*CORE*/          2, 2, 2, 2, 1, 2,
                  2, 2, 1, 2, 1, 2,
                  4, 4,
/*FOUNDRY*/       5, 5, 5, 2, 5, 5,
                  5, 5, 5, 5, 5, 4/*Stand in*/,
/*ADV_FOUNDRY*/   10, 5, 5, 2, 1, 5,
                  10,
/*STARFORGE*/     5, 5, 5, 5, 2, 5,
                  5, 8/*Stand in*/,
/*ADV_STARFORGE*/ 10, 10, 2, 80, 5, 5,
                  1, 5,
/*Other*/         100, 100, 100, 100, 1.0/75.0,
];

var unitCost = [
/*CORE*/          100.0, 137.5, 100.0, 137.5, 50.0, 137.5,
                  100.0, 137.5, 50.0, 137.5,  25.0,  137.5,
                  200.0, 350.0,
/*FOUNDRY*/       437.5, 437.5, 437.5, 175.0, 437.5, 437.5,
                  437.5, 437.5, 437.5, 437.5, 437.5, 225.0,
/*ADV_FOUNDRY*/   875.0, 437.5, 437.5, 175.0, 50.0, 250.0,
                  875.0,
/*STARFORGE*/     437.5, 437.5, 437.5, 437.5, 175.0, 437.5,
                  437.5, 450.0,
/*ADV_STARFORGE*/ 875.0, 875.0, 175.0, 10500.0, 437.5, 437.5,
                  50.0, 437.5,
/*Other*/         1400.0, 1400.0, 1400.0, 1400.0, 0.0,
];

var resultSelection = botIndex.crab;
var showResultsAll = true;

const resultGraph = d3.select('#viz-results').append('div').attr('class', 'overflow-auto').append('svg')
  .attr("width", width-12 + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);

// Add event listener to the select box
d3.select("#selectBotSlug").on("change", function() {
  selectUnit();
});

function selectUnit() {
  drawResults(d3.select("#selectBotSlug").property("value"));
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

  var counts = [parseInt(-200.0 / unitSupply[resultSelection]), parseInt(200.0 / unitSupply[resultSelection])];
  var maxResult = d3.extent(GlobalData.resultDataBase, d => d.res)[1];
  var centerH = parseInt(height / 2.0);
  var centerW = parseInt(width / 2.0);

  if(showResultsAll)
  {
    GlobalData.resultIdx.forEach((d, i) => {
      var data = GlobalData.resultDataBase[d.idx];
      if(data.vars[resultSelection] != 0 )
      {
        svg.append('g')
          .append('circle').attr('class', 'svg_transparent')
          .attr('cx', 1.0 * centerW + data.vars[resultSelection] / (counts[1] - counts[0]) * width)
          .attr('cy', centerH + -data.res / maxResult * centerH)
          .style('r', 2.5)
          .style('opacity', 0.25)
          .style('fill', 'white');
      }
    });
  }
  else
  {
    var midInt = parseInt(200.0 / unitSupply[resultSelection]);
    var resultBars = [];
    resultBars[midInt] = { count: 1, value: 0.0, stddev: 0.0, };
    GlobalData.resultIdx.forEach((d, i) => {
      var data = GlobalData.resultDataBase[d.idx];
      var posInt = data.vars[resultSelection] + midInt;
      if(!resultBars[posInt])
      {
        resultBars[posInt] = { count: 0, value: 0.0, stddev: 0.0, };
      }
      resultBars[posInt].count++;
      resultBars[posInt].value += data.res;
    });

    resultBars.forEach((d,i) => {
      d.value /= d.count;
    });

    GlobalData.resultIdx.forEach((d, i) => {
      var data = GlobalData.resultDataBase[d.idx];
      var posInt = data.vars[resultSelection] + midInt;
      if(resultBars[posInt].count != 1)
      {
        resultBars[posInt].stddev += (data.res - resultBars[posInt].value) * (data.res - resultBars[posInt].value);
      }
      else
      {
        resultBars[posInt].stddev = resultBars[posInt].value * resultBars[posInt].value;
      }
    });

    resultBars.forEach((d,i) => {
      d.stddev /= d.count;
      d.stddev = Math.sqrt(d.stddev);
    });

    resultBars.forEach((d, i) => {
      if(d.value != 0 && d.count > 1)
      {
        svg.append('g')
          .append('circle').attr('class', 'svg_transparent')
          .attr('cx', 1.0 * centerW + (i + counts[0]) / (counts[1] - counts[0]) * width)
          .attr('cy', centerH + -d.value / maxResult * centerH)
          .style('r', 2.5)
          .style('opacity', 0.6)
          .style('fill', 'white');
        svg.append('line').attr('class', 'svg_line')
          .attr("x1", 1.0 * centerW + (i + counts[0]) / (counts[1] - counts[0]) * width)
          .attr("x2", 1.0 * centerW + (i + counts[0]) / (counts[1] - counts[0]) * width)
          .attr("y1", centerH + -d.value / maxResult * centerH + d.stddev / maxResult * centerH)
          .attr("y2", centerH + -d.value / maxResult * centerH - d.stddev / maxResult * centerH)
          .style('opacity', 0.6)
          .style('fill', 'white');
      }
    });
  }

  // Add X axis
  const x = d3.scaleLinear()
  .domain(counts)
  .range([0, width]);
  svg.append("g")
    .attr("transform", `translate(0,${centerH})`)
    .call(d3.axisBottom(x).tickFormat((d) => d));
  // Add Y axis
  const y = d3.scaleLinear()
  .domain(d3.extent(GlobalData.resultDataBase, d => d.res))
  .range([height, 0]);
  svg.append("g")
    .attr("transform", `translate(${centerW},0)`)
    .call(d3.axisRight(y).tickFormat((d) => d));

  svg.append("line").attr('class', 'svg_line_selected')
    .attr("x1", centerW + counts[0] / (counts[1] - counts[0]) * width)
    .attr("x2", centerW + counts[1] / (counts[1] - counts[0]) * width)
    .attr("y1", centerH + (-GlobalData.intercept - (GlobalData.regData[resultSelection].NormalizedMarginalValue/100.0 * unitCost[resultSelection]) * counts[0]) / maxResult * centerH)
    .attr("y2", centerH + (-GlobalData.intercept - (GlobalData.regData[resultSelection].NormalizedMarginalValue/100.0 * unitCost[resultSelection]) * counts[1]) / maxResult * centerH);

  svg.append("line").attr('class', 'svg_line_highlighted')
    .attr("x1", centerW + counts[0] / (counts[1] - counts[0]) * width)
    .attr("x2", centerW + counts[1] / (counts[1] - counts[0]) * width)
    .attr("y1", centerH + (-GlobalData.intercept - GlobalData.regData[resultSelection].MarginalValue * counts[0]) / maxResult * centerH)
    .attr("y2", centerH + (-GlobalData.intercept - GlobalData.regData[resultSelection].MarginalValue * counts[1]) / maxResult * centerH);

  svg.append('text').attr('class', 'svg_text')
    .text("Showing " + GlobalData.resultIdx.length + "/" + GlobalData.count + " sample iterations");
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
