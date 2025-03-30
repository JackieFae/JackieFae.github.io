

function clearSvg(svg) { svg.selectAll('*').remove(); }
const drawLine = d3.line((d) => x(d.x), (d) => y(d.y));
