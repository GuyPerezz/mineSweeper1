 function printMat(mat, selector) {
  var strHTML = '<table border="1"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell' + i + '-' + j;
      strHTML += '<td class="' + className + '"> ' + cell + ' </td>';
    }
    strHTML += '</tr>';
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function getRandomIntInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


function blowUpNegs(cellI, cellJ, board) {
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= board.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= board[0].length) continue;
      if (i === cellI && j === cellJ) continue;
      if (board[i][j] === LIFE) {
        board[i][j] = '';
        renderCell({ i, j }, '');
      }
    }
  }
}




function countFoodAround(board, pos) {
  var count = 0;
  for (var i = pos.i - 1; i <= pos.i + 1; i++) {
    if (i < 0 || i >= board.length) continue;

    for (var j = pos.j - 1; j <= pos.j + 1; j++) {
      if (j < 0 || j >= board[0].length) continue;
      if (i === pos.i && j === pos.j) continue;

      var cell = board[i][j];
      if (cell === gFoodIcon) count++;
    }
  }
  return count;
}


function blowUpNegs(cellI, cellJ, board) {
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= board.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= board[0].length) continue;
      if (i === cellI && j === cellJ) continue;
      if (board[i][j] === LIFE) {
        board[i][j] = '';
        renderCell({ i, j }, '');
      }
    }
  }
}

function startTimer() {
  gStartTime = Date.now();
  var elTimer = document.querySelector('.timer span');
  gTimerInterval = setInterval(function () {
    var passedSeconds = (Date.now() - gStartTime) / 1000;
    elTimer.innerText = passedSeconds.toFixed(1);
  }, 100);
}