'use script';
document.addEventListener('contextmenu',event =>event.preventDefault());
debugger;
var gTimerInterval;
var gSelectedElCell;
var gMine = '🧨';
var gBoard;
var gLevel = {
  size: 4,
  mine: 2,
};
var gGame = {
  isON: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
};
var gCell = {
  minesAroundcount: 0,
  isShown: true,
  isMine: false,
  isMarked: false,
};

function initGame() {
  gBoard = buildBoard(gLevel.size);

  renderBoard(gBoard, '.board');
}
debugger
function cellClicked(elcell) {
  if(elcell.isMine){
     checkGameOver();
  }
startTimer();
  gCell.minesAroundcount = 0;
  var parts = elcell.id.split('-');
  var coord = { i: +parts[1], j: +parts[2] };
  
  console.log(coord);
  var negs = setMinesNegsCount(gBoard, coord.i, coord.j);
  console.log('negsAround:', negs);
  cellNegsCount(elcell, negs);

  return coord;

}
function buildBoard(size) {
  var board = [];
  for (var i = 0; i < size; i++) {
    board.push([]);
    for (var j = 0; j < size; j++) {
      var Cell = {
        minesAroundcount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
      };
      board[i][j] = Cell;
    }
  }

  
  board[1][2].isMine = true;
  board[2][1].isMine = true;

  return board;
}

function renderBoard(board, selector) {
  var strHTML = '<table border="1"><tbody>';
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < board[0].length; j++) {
      var currCell = board[i][j];
      var tdId = `cell-${i}-${j}`;
      var className = gCell;
      strHTML += `<td id="${tdId}" class="hoverCell" onclick="cellClicked(this)" class=${className}"> ${
        currCell.isShown && currCell.isMine ? gMine : ''
      }  </td>`;
    }
    strHTML += '</tr>';
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

function setMinesNegsCount(board, cellI, cellJ) {
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= board.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= board[0].length) continue;
      if (i === cellI && j === cellJ) continue;
      if (board[i][j].isMine) {
        gCell.minesAroundcount++;
      }
    }
  }

  return gCell.minesAroundcount;
}

//debugger;


function cellNegsCount(cellClicked, negsCount) {
  cellClicked.classList.add('selected');
  
  if(negsCount ===0){
    cellClicked.innerText = ''
  } else {cellClicked.innerText = negsCount}


}

function checkGameOver() {
  alert('DEAD!');
}




