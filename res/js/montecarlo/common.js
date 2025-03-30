//
// Define common constants for placement and sizing.
// Load and condition model data for use in various SVGs.
//

// Common boundary values.
const margin = { top: 25, right: 30, bottom: 35, left: 20 };
const width = 960 - margin.left - margin.right;
const height = 350 - margin.top - margin.bottom;

// Update display style from button press.
function swapStyle(sheetPath) {
  document.getElementById('pagestyle').setAttribute('href', sheetPath);
}

// Root data path
const pathRoot = 'res/data/montecarlo/';

// Common global data struct for all loaded values.
const GlobalData = {
  //count: 0,
  //countBase: 0,
  //regData: [],
  //regDataBot: [][],
  //regDataBase: [],
  //regDataBaseBot: [][],
  //resultDataBase: [],
  //resultIdx: [],
};
