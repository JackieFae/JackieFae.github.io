
// In this section, the user assigns cards (bots) to two decks representing the players.
// The displays aim to quantify the firend and foe relationships between the bots.
// Deck displays show a summary of all bot interactions, while card highlight pop-up
// shows the detailed values for one bot at a time.
// Deck graphs display comparative power of the decks at different tech and army compositions.

////
//// Variables
////

// Global constants
const cDeckSize = 8;

// Deck builder display constants
const labelOffset = 24.0;
const slotHeight = 160;
const slotSubHeight = 20.0;
const slotWidth = 100;
const slotSubWidth = 25.0;
const iconSize = 70;
const cardHeight = 640;
const cardSubHeight = 80.0;
const cardWidth = 400;
const cardSubWidth = 100.0;
const largeIconSize = 280;
const cDeckPlayer = 0;
const cDeckOpponent = 1;

// User selection values.
const deckSelections = [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1 ]; // Array of bot IDs in player and opponent decks.
const botValues = [ {selected: false, ID: 0, bandwidth: 0, resTotal: 0, wts: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ] },
                    {selected: false, ID: 0, bandwidth: 0, resTotal: 0, wts: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ] },
                    {selected: false, ID: 0, bandwidth: 0, resTotal: 0, wts: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ] },
                    {selected: false, ID: 0, bandwidth: 0, resTotal: 0, wts: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ] },
                    {selected: false, ID: 0, bandwidth: 0, resTotal: 0, wts: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ] },
                    {selected: false, ID: 0, bandwidth: 0, resTotal: 0, wts: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ] },
                    {selected: false, ID: 0, bandwidth: 0, resTotal: 0, wts: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ] },
                    {selected: false, ID: 0, bandwidth: 0, resTotal: 0, wts: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ] },
                    {selected: false, ID: 0, bandwidth: 0, resTotal: 0, wts: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ] },
                    {selected: false, ID: 0, bandwidth: 0, resTotal: 0, wts: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ] },
                    {selected: false, ID: 0, bandwidth: 0, resTotal: 0, wts: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ] },
                    {selected: false, ID: 0, bandwidth: 0, resTotal: 0, wts: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ] },
                    {selected: false, ID: 0, bandwidth: 0, resTotal: 0, wts: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ] },
                    {selected: false, ID: 0, bandwidth: 0, resTotal: 0, wts: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ] },
                    {selected: false, ID: 0, bandwidth: 0, resTotal: 0, wts: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ] },
                    {selected: false, ID: 0, bandwidth: 0, resTotal: 0, wts: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ] }, ];

// Deck draw flags
var deckSelectPlyr = false; // true: Selection menu is open for player deck.
var deckSelectOppo = false; // true: Selection menu is open for opponent deck.
var deckSelectedSlot = deckslotIndex.core1; // Slot index being selected for.
var deckTempLastSelection = -1;
var deckSelectedMinTech = techIndex.core;   // Tech index of slot being selected for.
var deckSelectedMaxTech = techIndex.core;   // Next tech index after slot being selected for. 

// Highlight flags.
var cardHighlight = -1;

// Deck comparison values.
const plyrPower = { core: 0, foundry: 0, advFoundry: 0, starforge: 0, advStarforge: 0, general: 0, };
const oppoPower = { core: 0, foundry: 0, advFoundry: 0, starforge: 0, advStarforge: 0, general: 0, };

////
//// User Interface elements
////

// Manage player dimension choice.
var showDeckInstances = true;  // Show unit value as resource per instance.
var showDeckBandwidth = false; // Show unit value as resource per bandwidth.
var showDeckResources = false; // Show unit value as % of resource cost.
d3.select('#instance-button').on('click', () => {
  showDeckInstances = true;
  showDeckBandwidth = false;
  showDeckResources = false;
  drawDecks();
});
d3.select('#bandwidth-button').on('click', () => {
  showDeckInstances = false;
  showDeckBandwidth = true;
  showDeckResources = false;
  drawDecks();
});
d3.select('#norm-button').on('click', () => {
  showDeckInstances = false;
  showDeckBandwidth = false;
  showDeckResources = true;
  drawDecks();
});

////
//// HTML Linkages
////

// Deck builder section divisions.
// Main division
const deckBuilder = d3.select('#div-deckbuilder').append('div').attr('class', 'row row-cols-2')
  .style('height', '765px');
// Major sub divisions
// Card selection division.
const deckColumn = deckBuilder.append('div').attr('class', 'col')
  .style('width', '47.5%');
// Mouse-over highlight division.
const detailColumn = deckBuilder.append('div').attr('class', 'col')
  .style('width', '52.5%');
// Deck/army comparison division. // TODO Does this need to be 2 columns?
const deckCompare = d3.select('#div-deckcompare').append('div').attr('class', 'row row-cols-2')
  .style('height', '750px');

// Player deck selection division.
const deckPlayerSelection = deckColumn.append('div').attr('class', 'overflow-auto')
  .style('width', `${4*slotWidth + margin.left + margin.right}`)
  .style('height', `${2*slotHeight + margin.top + margin.bottom}px`)
  .append('svg')
    .style('width', '95%')
    .style('height', `${2*slotHeight+24.0}px`);
// Opponent deck selection division.
const deckOppoSelection = deckColumn.append('div').attr('class', 'overflow-auto')
  .style('width', `${4*slotWidth + margin.left + margin.right}`)
  .style('height', `${2*slotHeight + margin.top + margin.bottom}px`)
  .append('svg')
    .style('width', '95%')
    .style('height', `${2*slotHeight+24.0}px`);
// Blown-up card detail division.
const deckDetail = detailColumn.append('div').attr('class', 'overflow-auto')
  .style('width', `${cardWidth + margin.left + margin.right}`)
  .style('height', `${cardHeight + margin.top + margin.bottom + 2*labelOffset}px`)
  .append('svg')
    .attr("transform", `translate(${margin.left},${margin.top+labelOffset})`)
    .style('width', `95%`)
    .style('height', `${cardHeight+2*labelOffset}px`);

// Deck info division. TO BE COMPLETED.
const graphColumn = deckCompare.append('div').attr('class', 'col')
  .style('width', '100%');
// TO BE COMPLETED.
const deckGraph = graphColumn.append('div').attr('class', 'overflow-auto')
  .style('width', `${4*slotWidth + margin.left + margin.right}`);
const deckPlyrGraph = deckGraph.append('div').append('svg').style('width', '100%').style('height', `200px`)
const deckCompareGraph = deckGraph.append('div').append('svg').style('width', '100%').style('height', `175px`)
const deckOppoGraph = deckGraph.append('div').append('svg').style('width', '100%').style('height', `200px`)

////
//// Deck Builder Graphics
////

//
// Loader entrypoint to draw all deck builder graphics.
//
function drawBuilder()
{
  drawDecks();
  drawComparisons();
}

//
// Draw deck selections and highlight graphics.
//
function drawDecks()
{
  computeBotValues(deckSelections);

  if(deckSelectPlyr == false)
  {
    drawDeck(deckPlayerSelection, cDeckPlayer);
  }
  else
  {
    drawSelect(deckPlayerSelection, cDeckPlayer, deckSelectedSlot);
  }

  if(deckSelectOppo == false)
  {
    drawDeck(deckOppoSelection, cDeckOpponent);
  }
  else
  {
    drawSelect(deckOppoSelection, cDeckOpponent, deckSelectedSlot);
  }

  drawCardHighlight(deckDetail, cardHighlight);
}

//
// Switch deck draw for the given player from display to selection.
// Record selected slot to determine which bots to present.
//
function startDeckSelect(team, slotIdx)
{
  if(team == cDeckPlayer)
  {
    deckSelectPlyr = true;
    deckSelectOppo = false;
    deckTempLastSelection = deckSelections[slotIdx]
  }
  else if(team == cDeckOpponent)
  {
    deckSelectPlyr = false;
    deckSelectOppo = true;
    deckTempLastSelection = deckSelections[slotIdx+cDeckSize]
  }
  deckSelectedSlot = slotIdx;
  deckSelectedMinTech = deckslotStartTechMap[slotIdx];
  deckSelectedMaxTech = deckslotEndTechMap[slotIdx];

  drawDecks();
}

//
// Switch the deck draw from selection to display.
// Store the selected bot in the open slot.
//
function completeDeckSelect(bot)
{
  if(deckSelectPlyr == true)
  {
    deckSelections[deckSelectedSlot] = bot;
    deckSelectPlyr = false;
  }
  else if(deckSelectOppo == true)
  {
    deckSelections[deckSelectedSlot+cDeckSize] = bot;
    deckSelectOppo = false;
  }
  deckSelectedMaxTech = techIndex.core;
  deckSelectedMinTech = techIndex.core;
  deckTempLastSelection = -1;

  drawDecks();
}

//
// Render bot choices or slot icons for deck cards based on user input. Bots are shown as cards
// with coloured indicators for synergies.
// Clicking any card opens the selection menu to place a bot in that card.
//
//     X X 0 X
//     X 0 X 0
//
function drawDeck(deckSelectionSvg, player)
{
  clearSvg(deckSelectionSvg);
  var deckLabelSvg = deckSelectionSvg.append('g');
  deckLabelSvg.append('text').attr('class', 'svg_text')
      .attr('x', 50)
      .attr('y', 15)
      .style('font-size', '15px')
      .style("text-anchor", "middle")
      .text(player == cDeckPlayer ? "Your Deck:" : "Their Deck:");

  var deckSvg = deckSelectionSvg.append('g')
    .attr("transform", `translate(0,${labelOffset})`);

  // For each card in the deck, draw the selected bot and its covariance symbols.
  for(var slotIdx = 0; slotIdx < cDeckSize; ++slotIdx)
  {
    var x = 0;
    var y = 0;
    var cardIdx = (player * cDeckSize) + slotIdx;
    if(slotIdx == 0 || slotIdx == 1)
    {
      x = 0;
      y = slotIdx;
    }
    else
    {
      x = (slotIdx-2) % 3 + 1;
      y = parseInt((slotIdx-2) / 3);
    }

    drawCard(deckSvg, x, y, slotIdx, deckSelections[cardIdx], player);

    var wtText = deckSvg.append('text').attr('class', 'svg_text')
      .text('0')
      .style('font-size', '15px')
      .style("text-anchor", "middle")
      .attr('x', slotWidth*x + (slotWidth) / 2.0)
      .attr('y', slotHeight*(y + 1) - (slotHeight - iconSize) / 2.0);

    if(deckSelections[cardIdx] != -1)
    {
      var suffix = showDeckResources ? '%' : '';
      var netPower  = computeCardPower(cardIdx, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,]);
      wtText.classed('bright', true)
        .text(parseInt(netPower) + suffix);
    }

    drawStartSelectRect(deckSvg, player, slotIdx, deckSelections[cardIdx], x, y);
  }
}

//
// Render slot icon and list of eligible bots in that slot in a scrollable grid over the deck
// display. Bots are shown as normal cards with coloured indicators for synergies. Repeated bots
// are shown in grey.
// Clicking the slot icon clears the selection for that slot, clicking a bot places
// the clicked bot in the selection.
//
//     0 X X X /\
//     X X X X ||
//     X X X X ||
//     X X     \/
//
function drawSelect(deckSelectionSvg, player, slotIdx)
{
  // Size of selection grid.
  var cols = 4;
  var rows = Math.ceil(parseInt(botTechMap[deckSelectedMaxTech] - botTechMap[deckSelectedMinTech] + 1) / cols);

  // Clear and remake the deck grid.
  clearSvg(deckSelectionSvg);
  var deckLabelSvg = deckSelectionSvg.append('g');
  deckLabelSvg.append('text').attr('class', 'svg_text')
      .attr('x', 50)
      .attr('y', 15)
      .style('font-size', '15px')
      .style("text-anchor", "middle")
      .text(player == cDeckPlayer ? "Your Deck:" : "Their Deck:");

  var deckSvg = deckSelectionSvg.append('g')
    .attr("transform", `translate(0,${labelOffset})`);

  // Draw slot-to-select symbol as indicator.
  drawCard(deckSvg, 0, 0, slotIdx, -1, player, false);
  drawEndSelectRect(deckSvg, player, slotIdx, -1, 0, 0);

  // For each bot that matches the slot-to-select, draw the bot and its covariances.
  for(var botIdx = botTechMap[deckSelectedMinTech]; botIdx < botTechMap[deckSelectedMaxTech]; ++botIdx)
  {
    // Compute bot position in selection grid.
    var x = (botIdx + 1 - botTechMap[deckSelectedMinTech]) % cols;
    var y = parseInt((botIdx + 1 - botTechMap[deckSelectedMinTech]) / cols);

    // Draw bot card slot and image.
    var repeat = false;
    for(i = (deckSelectPlyr ? 0 : cDeckSize); i < (deckSelectPlyr ? cDeckSize : 2*cDeckSize); ++i)
    {
      if(deckSelections[i] == botIdx)
      {
        repeat = (botIdx != deckTempLastSelection);
        break;
      }
    }
    drawCard(deckSvg, x, y, slotIdx, botIdx, player, false, repeat);
    if(!repeat)
    {
      drawEndSelectRect(deckSvg, player, slotIdx, botIdx, x, y);
    }
  }

  return 0.0;
}

//
// Draw a single card for a bot or empty slot, outlined in team colour.
//   ________
//  |  ^   ^ |
//  |   ___  |
//  |  /   \ |
//  |  \___/ |
//  | ^      |
//  |________|
//
function drawCard(deckSvg, x, y, slotIdx, botIdx, playerTeam, coloured = true, repeat = false)
{
  // Draw card outline, repecting player and colour flags.
  deckSvg.append("path").attr("class", "svg_line")
    .classed("selected", (playerTeam == cDeckPlayer) && coloured)
    .classed("highlighted", (playerTeam == cDeckOpponent) && coloured)
    .attr("fill", "none")
    .style('stroke-width', '2.0')
    .attr("d", drawLine([ { x: slotWidth*x,     y: slotHeight*y, },
                          { x: slotWidth*(x+1), y: slotHeight*y, },
                          { x: slotWidth*(x+1), y: slotHeight*(y+1), },
                          { x: slotWidth*x,     y: slotHeight*(y+1), },
                          { x: slotWidth*x,     y: slotHeight*y, },]));

  // Draw card symbol, slot or bot as appropriate.
  var empty = (botIdx == -1);
  var ref = empty ? deckslotImageLookup[slotIdx] : botImageLookup[botIdx];
  var alt = empty ? deckslotNameLookup[slotIdx] : botNameLookup[botIdx];
  deckSvg.append('image').attr('class', 'svg_report_image')
    .classed("dead", empty || repeat)
    .attr('x', slotWidth*x + (slotWidth - iconSize * 0.9) / 2.0)
    .attr('y', slotHeight*y + (slotHeight - iconSize * 0.9) / 2.0 - 10.0)
    .attr('width', iconSize * 0.9)
    .attr('height', iconSize * 0.9)
    .attr('href', ref)
    .attr('alt', alt);

  // Draw references to both decks above and below the card image.
  for(var refIdx = 0 ; refIdx < cDeckSize; ++refIdx)
  {
    var subX = 0;
    var subY = 0;
    if(refIdx == 0 ||  refIdx == 1)
    {
      subX = 0;
      subY = refIdx;
    }
    else
    {
      subX = (refIdx-2) % 3 + 1;
      subY = parseInt((refIdx-2) / 3);
    }

    drawCardReference(deckSvg, x, y, subX, subY, slotIdx, botIdx, refIdx, playerTeam);
    drawCardReference(deckSvg, x, y, subX, subY, slotIdx, botIdx, refIdx + cDeckSize, playerTeam);
  }
}

//
// Draw a single slot reference for a bot or empty slot fill with symbol indicating synergy.
// Orange upward arrow indicates good for player, blue downward arrow indicates bad for player.
// Neutral circle symbol is used for very narrow (anti-)synergies.
// A card's reference to itself is always a muted grey circle.
//
function drawCardReference(deckSvg, x, y, subX, subY, slotIdx, botIdx, refIdx, playerTeam)
{
  var refTeam = (refIdx < cDeckSize) ? cDeckPlayer : cDeckOpponent;
  var offsetY = (refTeam == cDeckPlayer) ? 0.0 : 120.0;

  // Outline slot reference for player deck.
  deckSvg.append("path").attr("class", "svg_line")
    .attr("fill", "none")
    .style('stroke-width', '0.1')
    .attr("d", drawLine([ { x: slotWidth*x + slotSubWidth*subX,                y: offsetY + slotHeight*y + slotSubHeight*subY, },
                          { x: slotWidth*x + slotSubWidth*subX + slotSubWidth, y: offsetY + slotHeight*y + slotSubHeight*subY, },
                          { x: slotWidth*x + slotSubWidth*subX + slotSubWidth, y: offsetY + slotHeight*y + slotSubHeight*subY + slotSubHeight, },
                          { x: slotWidth*x + slotSubWidth*subX,                y: offsetY + slotHeight*y + slotSubHeight*subY + slotSubHeight, },
                          { x: slotWidth*x + slotSubWidth*subX,                y: offsetY + slotHeight*y + slotSubHeight*subY, },]));

  // If the referenced slot is the drawn slot, fill it with the placeholder symbol.
  if((slotIdx + (playerTeam * cDeckSize)) == refIdx)
  {
    deckSvg.append('circle').attr('class', 'svg_shape')
      .attr('cx', slotWidth*x + slotWidth*subX/4.0 + slotWidth/8.0)
      .attr('cy', offsetY + slotHeight*y + slotSubHeight*subY + 0.5*slotSubHeight)
      .style('r', 4.0)
      .style('opacity', 0.3);
  }
  else
  {
    // If both slots are filled, compute the direction of the power change.
    if((botIdx != -1) && (deckSelections[refIdx] != -1))
    {
      var weightOffset = (refTeam == playerTeam) ? 0 : 50;
      var wtRatio = GlobalData.regData[botIdx][deckSelections[refIdx] + weightOffset].Weight / GlobalData.regData[botIdx][botIdx].Weight;
      // If weight change is within tolerance, draw a neutral symbol.
      if (-0.05 <= wtRatio && wtRatio <= 0.05)
      {
        deckSvg.append('circle').attr('class', 'svg_shape')
          .attr('cx', slotWidth*x + slotWidth*subX/4.0 + slotWidth/8.0)
          .attr('cy', offsetY + slotHeight*y + slotSubHeight*subY + 0.5*slotSubHeight)
          .style('r', 4.0)
          .style('opacity', 1.0);
      }
      else // If weight change is out of tolerance, draw an up or down arrow as needed.
      {
        var onTeam = (playerTeam == cDeckPlayer);
        var ref = onTeam ? 'res/images/arrow_up.png' : 'res/images/arrow_down.png';
        if(wtRatio < -0.05)
        {
          onTeam = (playerTeam == cDeckOpponent);
          ref = onTeam ? 'res/images/arrow_down.png' : 'res/images/arrow_up.png';
        }
        deckSvg.append('image').attr('class', 'svg_report_image')
          .classed('teamA', onTeam)
          .classed('teamB', !onTeam)
          .attr('x', slotWidth*x + slotWidth*subX/4.0 + slotWidth/8.0 - 7.5)
          .attr('y', offsetY + slotHeight*y + slotSubHeight*subY + 2.5)
          .attr('width', 15.0)
          .attr('height', 15.0)
          .attr('filter', 'invert(100%)')
          .attr('href', onTeam ? 'res/images/arrow_up.png' : 'res/images/arrow_down.png')
          .attr('alt', 'Increase');
      }
    }
  }
}

//
// Add a transparent rectangle over the card to house mouse interactions to highlight and select.
//
function drawStartSelectRect(deckSvg, team, slotIdx, botIdx, x, y)
{
  deckSvg.append('rect').attr('class', 'svg_background')
    .attr('x', slotWidth*x)
    .attr('y', slotHeight*y)
    .attr('width', slotWidth)
    .attr('height', slotHeight)
    .attr('filter', 'invert(97.27%)')
    .style('opacity', 0.0)
    .on('mouseenter', () => setCardHighlight((team * cDeckSize) + slotIdx), botIdx)
    .on('mouseleave', () => setCardHighlight(-1))
    .on('click', () => startDeckSelect(team, slotIdx));
}

//
// Add a transparent rectangle over the card to house mouse interactions to highlight and select.
//
function drawEndSelectRect(deckSvg, team, slotIdx, botIdx, x, y)
{
  deckSvg.append('rect').attr('class', 'svg_background')
    .attr('x', slotWidth*x)
    .attr('y', slotHeight*y)
    .attr('width', slotWidth)
    .attr('height', slotHeight)
    .attr('filter', 'invert(97.27%)') 
    .style('opacity', 0.0)
    .on('mouseenter', () => setCardHighlight((team * cDeckSize) + slotIdx, botIdx))
    .on('mouseleave', () => setCardHighlight(-1))
    .on('click', () => completeDeckSelect(botIdx));
}

//
// Draw the current highlight card in detail.
//
function setCardHighlight(cardIdx, botIdx = -1)
{
  cardHighlight = cardIdx;
  if(botIdx != -1)
  {
    deckSelections[cardHighlight] = botIdx;
    computeBotValues();
  }
  drawCardHighlight(deckDetail, cardHighlight);
}

//
// Draw a large scale card for the given bot, with detailed values.
//
function drawCardHighlight(detailSvg, cardIdx)
{
  var playerTeam = (cardIdx < cDeckSize) ? cDeckPlayer : cDeckOpponent;
  var slotIdx = playerTeam == cDeckPlayer ? cardIdx : cardIdx - cDeckSize;
  var botIdx = deckSelections[cardIdx];

  // Create highlight outline.
  clearSvg(detailSvg);
  var cardSvg = detailSvg.append('g');
  cardSvg.append("path").attr("class", "svg_line")
    .attr("fill", "none")
    .style('stroke-width', '2.0')
    .attr("d", drawLine([ { x: 0.0,       y: 0.0, },
                          { x: cardWidth, y: 0.0, },
                          { x: cardWidth, y: cardHeight, },
                          { x: 0.0,       y: cardHeight, },
                          { x: 0.0,       y: 0.0, },]));

  if(cardIdx != -1)
  {
    var empty = (deckSelections[cardIdx] == -1);
    var ref = empty ? deckslotImageLookup[slotIdx] : botImageLookup[deckSelections[cardIdx]];
    var alt = empty ? deckslotNameLookup[slotIdx] : botNameLookup[deckSelections[cardIdx]];

    cardSvg.append('image').attr('class', 'svg_report_image')
      .classed("dead", empty)
      .classed("teamA", playerTeam == cDeckPlayer)
      .classed("teamB", playerTeam == cDeckOpponent)
      .attr('x', 2)
      .attr('y', (cardHeight - largeIconSize * 0.9) / 2.0 - 10.0)
      .attr('width', largeIconSize * 0.9)
      .attr('height', largeIconSize * 0.9)
      .attr('href', ref)
      .attr('alt', alt);

    if(deckSelections[cardIdx] != -1)
    {
      var suffix = showDeckResources ? '%' : '';
      var soloTech = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,];
      soloTech[cardIdx] = 1;
      var basePower = computeCardPower(cardIdx, soloTech);
      var netPower  = computeCardPower(cardIdx, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,]);
      var diffPower = netPower - basePower;
      var sign = diffPower < 0 ? '' : '+'
      cardSvg.append('text').attr('class', 'svg_text')
        .classed('bright', true)
        .style('font-size', '40px')
        .style("text-anchor", "middle")
        .attr('x', cardWidth * 3.0 / 4.0 + 20.0)
        .attr('y', (cardHeight - largeIconSize * 0.9) / 2.0 + 100.0)
        .text(parseInt(netPower) + suffix);
      var wtTextSum  = cardSvg.append('text').attr('class', 'svg_text')
        .classed('bright', true)
        .style('font-size', '30px')
        .style("text-anchor", "middle")
        .attr('x', cardWidth * 3.0 / 4.0 + 20.0)
        .attr('y', (cardHeight - largeIconSize * 0.9) / 2.0 + 140.0)
        .text('(' + parseInt(basePower) + sign + parseInt(diffPower) + suffix + ')');
    }

    for(var refIdx = 0 ; refIdx < (2 * cDeckSize); ++refIdx)
    {
      var refTeam = (refIdx < cDeckSize) ? cDeckPlayer : cDeckOpponent;
      var posIdx = (refIdx < cDeckSize) ? refIdx : refIdx - cDeckSize;
      var offsetY = (refTeam == cDeckPlayer) ? 0 : (cardHeight - 2 * cardSubHeight);
      var subX = 0;
      var subY = 0;
      if(posIdx == 0 ||  posIdx == 1)
      {
        subX = 0;
        subY = posIdx;
      }
      else
      {
        subX = (posIdx-2) % 3 + 1;
        subY = parseInt((posIdx-2) / 3);
      }
      cardSvg.append("path").attr("class", "svg_line")
        .classed("selected", refTeam == cDeckPlayer)
        .classed("highlighted", refTeam == cDeckOpponent)
        .attr("fill", "none")
        .style('stroke-width', '0.5')
        .attr("d", drawLine([ { x: cardSubWidth*subX,                y: offsetY + cardSubHeight*subY, },
                              { x: cardSubWidth*subX + cardSubWidth, y: offsetY + cardSubHeight*subY, },
                              { x: cardSubWidth*subX + cardSubWidth, y: offsetY + cardSubHeight*subY + cardSubHeight, },
                              { x: cardSubWidth*subX,                y: offsetY + cardSubHeight*subY + cardSubHeight, },
                              { x: cardSubWidth*subX,                y: offsetY + cardSubHeight*subY, },]));
      if(cardIdx == refIdx)
      {
        cardSvg.append('circle').attr('class', 'svg_shape')
          .attr('cx', cardWidth*subX/4.0 + cardWidth/8.0)
          .attr('cy', offsetY + cardSubHeight*subY + 0.5*cardSubHeight)
          .style('r', 4.0)
          .style('opacity', 0.3);
      }
      else if(botIdx != -1 && deckSelections[refIdx] != -1)
      {
        var suffix = showDeckResources ? '%' : '';
        {
          var ref = botImageLookup[deckSelections[refIdx]];
          var alt = botNameLookup[deckSelections[refIdx]];
          cardSvg.append('image').attr('class', 'svg_report_image')
            .attr('x', cardWidth*subX/4.0 + cardWidth/8.0 - 45.0)
            .attr('y', offsetY + cardSubHeight*subY + 0.5*cardSubHeight - 20.0)
            .attr('width', 40.0)
            .attr('height', 40.0)
            .attr('filter', 'invert(100%)')
            .attr('href', ref)
            .attr('alt', alt);

          var wt = transformBotValue(cardIdx, refIdx);
          var wtRatio = wt / transformBotValue(cardIdx, cardIdx);
          var wtText = cardSvg.append('text').attr('class', 'svg_text').classed('bright', true)
            .style('font-size', '20px')
            .style("text-anchor", "middle")
            .attr('x', cardWidth*subX/4.0 + cardWidth/8.0 + 25.0)
            .attr('y', offsetY + cardSubHeight*subY + 0.5*cardSubHeight + 0.0);

          if(wtRatio > 0.05)
          {
            wtText.append("tspan").attr('class', 'svg_text')
              .classed('selected', playerTeam == cDeckOpponent)
              .classed('highlighted', playerTeam == cDeckPlayer)
              .text('+' + parseInt(wt) + '' + suffix);
          }
          else if(wtRatio < -0.05)
          {
            wtText.classed('bright', true).append("tspan").attr('class', 'svg_text')
              .classed('selected', playerTeam == cDeckPlayer)
              .classed('highlighted', playerTeam == cDeckOpponent)
              .text(parseInt(wt) + suffix);
          }
          else
          {
            wtText.text(parseInt(wt) + suffix);
          }
        }
        {
          var wt = transformBotValue(refIdx, cardIdx);
          var wtRatio = wt / transformBotValue(refIdx, refIdx);
          var wtText = cardSvg.append('text').attr('class', 'svg_text').classed('bright', true)
            .style('font-size', '16px')
            .style("text-anchor", "middle")
            .attr('x', cardWidth*subX/4.0 + cardWidth/8.0 + 25.0)
            .attr('y', offsetY + cardSubHeight*subY + 0.5*cardSubHeight + 20.0);
  
          if(wtRatio > 0.05)
          {
            wtText.append("tspan").attr('class', 'svg_text')
              .classed('selected', playerTeam == cDeckOpponent)
              .classed('highlighted', playerTeam == cDeckPlayer)
              .text('(+' + parseInt(wt) + suffix + ')');
          }
          else if(wtRatio < -0.05)
          {
            wtText.append("tspan").attr('class', 'svg_text')
              .classed('selected', playerTeam == cDeckPlayer)
              .classed('highlighted', playerTeam == cDeckOpponent)
              .text('(' + parseInt(wt) + suffix + ')');
          }
          else
          {
            wtText.text('(' + parseInt(wt) + suffix + ')');
          }
        }
      }
    }
  }

  return;
}

//
// TODO: Flesh this out.
// Draw charts comparing deck power under various conditions, based on user inputs.
//
function drawComparisons()
{
  deckPlyrGraph.selectAll('*').remove();
  deckPlyrGraph.append('g')
    .attr("transform", `translate(${margin.left},${margin.top})`)
  deckCompareGraph.selectAll('*').remove();
  deckCompareGraph.append('g')
    .attr("transform", `translate(${margin.left},${margin.top})`)
  deckOppoGraph.selectAll('*').remove();
  deckOppoGraph.append('g')
    .attr("transform", `translate(${margin.left},${margin.top})`)
  drawPlayerGraphs(deckPlyrGraph);
  drawPlayerGraphs(deckOppoGraph);
}

function drawPlayerGraphs(graph)
{
  var techPower = [];
  var subSelect = [];
  subSelect[techIndex.core]         = [((deckSelections[0] != -1 && GlobalData.bots[deckSelections[0]].Tech == 0) ? 1 : 0), ((deckSelections[1] != -1 && GlobalData.bots[deckSelections[1]].Tech == 0) ? 1 : 0), 0, 0, 0, 0, 0, 0,
                                       ((deckSelections[8] != -1 && GlobalData.bots[deckSelections[8]].Tech == 0) ? 1 : 0), ((deckSelections[9] != -1 && GlobalData.bots[deckSelections[9]].Tech == 0) ? 1 : 0), 0, 0, 0, 0, 0, 0,];
  subSelect[techIndex.foundry]      = [0, 0, 1, 0, ((deckSelections[4]  != -1 && GlobalData.bots[deckSelections[4]].Tech  == 1) ? 1 : 0), 0, 0, 0,
                                       0, 0, 1, 0, ((deckSelections[12] != -1 && GlobalData.bots[deckSelections[12]].Tech == 1) ? 1 : 0), 0, 0, 0];
  subSelect[techIndex.advfoundry]   = [0, 0, 0, 1, ((deckSelections[4]  != -1 && GlobalData.bots[deckSelections[4]].Tech  == 2) ? 1 : 0), 0, 0, 0,
                                       0, 0, 0, 1, ((deckSelections[12] != -1 && GlobalData.bots[deckSelections[12]].Tech == 2) ? 1 : 0), 0, 0, 0];
  subSelect[techIndex.starforge]    = [0, 0, 0, 0, 0, 1, 0, ((deckSelections[7]  != -1 && GlobalData.bots[deckSelections[7]].Tech  == 3) ? 1 : 0),
                                       0, 0, 0, 0, 0, 1, 0, ((deckSelections[15] != -1 && GlobalData.bots[deckSelections[15]].Tech == 3) ? 1 : 0)];
  subSelect[techIndex.advstarforge] = [0, 0, 0, 0, 0, 0, 1, ((deckSelections[7]  != -1 && GlobalData.bots[deckSelections[7]].Tech  == 4) ? 1 : 0),
                                       0, 0, 0, 0, 0, 0, 1, ((deckSelections[15] != -1 && GlobalData.bots[deckSelections[15]].Tech == 4) ? 1 : 0)];
  subSelect[techIndex.any]          = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,];

  for(var t = 0; t < techNameLookup.length; ++t)
  { 
    techPower[t] = computeDeckPower(subSelect[t]);
  }
  var maxTech = Math.max(...techPower.slice(0,5));
  if(maxTech == 0)
    maxTech = 1;

  graph.append("path")
    .attr("class", "svg_line")
    .attr("fill", "none")
    .attr("d", drawLine([ { x: 0,   y: 180, },
                          { x: 480, y: 180, }, ]));
  for(var t = 0; t < techNameLookup.length; ++t)
  {
    if(techPower[t] >= 0.0)
    {
      graph.append('rect').attr('class', 'svg_shape')
        .attr('x', 80.0*t + (80.0 - iconSize) / 2.0)
        .attr('y', 180.0 - techPower[t] / maxTech * 90.0)
        .attr('width', iconSize/2.0)
        .attr('height', techPower[t] / maxTech * 90.0)
        .attr('filter', 'invert(100%)');
    }
    else
    {
      graph.append('rect').attr('class', 'svg_shape')
        .attr('x', 80.0*t + (80.0 - iconSize) / 2.0)
        .attr('y', 180.0)
        .attr('width', iconSize/2.0)
        .attr('height', 180.0 - techPower[t] / maxTech * 90.0)
        .attr('filter', 'invert(100%)');
    }
    graph.append('image').attr('class', 'svg_report_image')
      .attr('x', 80.0*t + (80.0 - iconSize) / 2.0)
      .attr('y', Math.min(180.0 - iconSize/2.0, 180.0 - techPower[t] / maxTech * 90.0 - iconSize/2.0))
      .attr('width', iconSize/2.0)
      .attr('height', iconSize/2.0)
      .attr('filter', 'invert(100%)')
      .attr('href', techImageLookup[t])
      .attr('alt', techImageLookup[t]);
    graph.append('text').attr('class', 'svg_text')
      .text(parseInt(techPower[t]))
      .style('font-size', '30px')
      .attr('x', 80.0*t + (80.0 - iconSize) / 2.0)
      .attr('y', Math.min(180.0 - iconSize/2.0, 180.0 - techPower[t] / maxTech * 90.0 - iconSize/2.0));
  }
}

function computeBotValues()
{
  for(var i = 0; i < (2 * cDeckSize); ++i)
  {    
    if(deckSelections[i] != -1)
    {
      botValues[i].selected = true;
      botValues[i].ID = deckSelections[i];
      botValues[i].bandwidth = GlobalData.bots[deckSelections[i]].Bandwidth;
      botValues[i].resTotal = GlobalData.bots[deckSelections[i]].ResTotal;

      for(var j = 0; j < (2 * cDeckSize); ++j)
      {
        if(deckSelections[j] != -1)
        {
          if((i < cDeckSize && j < cDeckSize) || (cDeckSize <= i && cDeckSize <= j))
          {
            botValues[i].wts[j] = GlobalData.regData[deckSelections[i]][deckSelections[j]].Weight;
          }
          else
          {
            botValues[i].wts[j] = GlobalData.regData[deckSelections[i]][deckSelections[j]+50].Weight;
          }
        }
        else
        {
          botValues[i].wts[j] = 0.0;
        }
      }
    }
    else
    {
      botValues[i].selected = false;
    }
  }

  return botValues;
}

function transformBotValue(cardIdx, refIdx)
{
  if(showDeckInstances)
  {
    return botValues[cardIdx].wts[refIdx];
  }
  else if(showDeckBandwidth)
  {
    return botValues[cardIdx].wts[refIdx] / botValues[refIdx].bandwidth;
  }
  else if(showDeckResources)
  {
    return botValues[cardIdx].wts[refIdx] * 100.0 / botValues[refIdx].resTotal;
  }

  return 0.0;
}

//
// Compute the power value for the bot at the given index, given a uniform distribution of other techs.
//
function computeCardPower(cardIdx, techs)
{
  var baseWt = transformBotValue(cardIdx, cardIdx);
  var modifierWt = 0.0;
  var modifierCount = 0.0;

  if(techs[cardIdx] == 1)
  {
    for(var j = 0; j < (2 * cDeckSize); ++j)
    {
      if((techs[j] == 1) && botValues[j].selected && (cardIdx != j))
      {
        modifierCount++;
        modifierWt += transformBotValue(cardIdx, j);
      }
    }
  }

  if (modifierCount != 0)
  {
    modifierWt /= modifierCount;
  }

  return baseWt + modifierWt;
}

function computeDeckPower(techs)
{
  var totalBots = 0;
  var totalPower = 0.0;
  for(var i = 0; i < cDeckSize; ++i)
  {
    var botPower = computeCardPower(i, techs);
    if(botPower != 0.0)
    {
      totalPower += botPower;
      totalBots++;
    }
  }
  if(totalBots == 0)
  {
    return 0;
  }
  return totalPower / totalBots;
}
