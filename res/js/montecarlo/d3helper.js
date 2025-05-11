
// Sleep utility function.
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Update display style from button press.
function swapStyle(sheetPath) {
  document.getElementById('pagestyle').setAttribute('href', sheetPath);
}

function clearSvg(svg) { svg.selectAll('*').remove(); }

// Create a traditional HTML dropdown select.
function createSelect(dropdown, label, name, width, callback)
{
  dropdown.selectAll('*').remove();

  var dropdownDiv = dropdown.append('div')
    .attr('class', 'd-flex align-items-center');
  dropdownDiv.append('span')
    .attr('id', 'hint-span')
    .attr('class', 'text-muted')
    .text(label);

  var newDropdown = dropdownDiv.append('select')
    .attr('name', name)
    .attr('id', name)
    .attr('class', 'form-select form-select-sm')
    .style('width', `${width}px`)
    .on('change', function (d) { return callback(name); })
    .append('span')
      .attr('id', 'hint-span')
      .attr('class', 'text-muted')
      .text(label);

  return newDropdown;
}

// Create image dropdown select.
function createImageSelect(dropdown, label, name, width, height, imageWidth, imageHeight, callback)
{
  dropdown.selectAll('*').remove();

  var dropdownDiv = dropdown.append('div')
    .attr('class', 'd-flex align-items-center');
  dropdownDiv.append('span')
    .attr('id', 'hint-span')
    .attr('class', 'text-muted')
    .text(label)

  var newDropdown = dropdownDiv.append('div')
    .attr('name', name)
    .attr('id', name)
    .attr('class', 'dropdown');

  var newDropdownButton = newDropdown.append('button')
    .attr('id', `${name}Button`)
    .attr('class', 'dropbtn')
    .on('change', function (d) { return callback(name); });
  newDropdownButton.append('img')
    .attr('src', "res/images/stats/nothing.png")
    .style('width', `${imageWidth}px`)
    .style('height', `${imageHeight}px`);
  newDropdownButton.append('span')
    .text('');

  var newMenu = newDropdown.append('div')
    .attr('id', `${name}Content`)
    .attr('class', 'dropdown-content')
    .style('width', `${width}px`)
    .style('height', `${height}px`);

  return newDropdown;
}

const drawLine = d3.line((d) => x(d.x), (d) => y(d.y));
