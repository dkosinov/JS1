var SIZE = {
  WIDTH: 20,
  HEIGHT: 20,
};

var SNAKE_SPEED = 300;

var $gameField;
var $gameTable;
var snakeCoordX;
var snakeCoordY;
var interval;
var direction = 'top';
var snake = [];
var score = 0;
var foodDelay = SIZE.WIDTH + SIZE.HEIGHT;//Math.floor(Math.random() * SIZE.WIDTH);;
var loosed = false;
var blocks = [];
var foodUnit;

function prepareGameField() {
  $gameTable = document.createElement('table');
  $gameTable.classList.add('game-table');
  
  for(var i = 0; i < SIZE.HEIGHT; i++) {
    var $row = document.createElement('tr');

    for(var j = 0; j < SIZE.WIDTH; j++) {
      var $cell = document.createElement('td');
      $cell.classList.add('game-table-cell');

      $row.appendChild($cell);
    }

    $gameTable.appendChild($row);
  }

  $gameField.appendChild($gameTable);

}

function respawn() {
  snakeCoordX = Math.floor(SIZE.WIDTH / 2);
  snakeCoordY = Math.floor(SIZE.HEIGHT / 2);

  var $snakeHead = $gameTable.children[snakeCoordY].children[snakeCoordX];
  $snakeHead.classList.add('snake-unit');

  var $snakeTail = $gameTable.children[snakeCoordY + 1].children[snakeCoordX];
  $snakeTail.classList.add('snake-unit');

  snake.push($snakeTail);
  snake.push($snakeHead);

  var foodDelay = SIZE.WIDTH + SIZE.HEIGHT;//Math.floor(Math.random() * SIZE.WIDTH);;
  document.querySelector('#delay').textContent = foodDelay;
  var loosed = false;

}

function addBlock() {
  while (true) {
    var blockCoordX = Math.floor(Math.random() * SIZE.WIDTH);
    var blockCoordY = Math.floor(Math.random() * SIZE.HEIGHT);
    var $blockUnit = $gameTable.children[blockCoordY].children[blockCoordX];
    if (!isSnakeUnit($blockUnit) && !isBlockUnit($blockUnit) && !isFoodUnit($blockUnit)) {
      $blockUnit.classList.add('block-unit');
      blocks.push($blockUnit);
      return;
    }
  }
}

function checkBounds() {
  //return snakeCoordX >= 0 && snakeCoordX < SIZE.WIDTH && snakeCoordY >= 0 && snakeCoordY < SIZE.HEIGHT;
  if (snakeCoordX >= 0 && snakeCoordX < SIZE.WIDTH && snakeCoordY >= 0 && snakeCoordY < SIZE.HEIGHT) {
    return true;
  } else {
      if (snakeCoordX < 0) {
        snakeCoordX = SIZE.WIDTH-1;
        //direction = 'right';
      } else if (snakeCoordX == SIZE.WIDTH) {
        snakeCoordX = 0;
        //direction = 'left';
      } else if (snakeCoordY < 0) {
        snakeCoordY = SIZE.HEIGHT-1;
        //direction = 'bottom';
      } else if (snakeCoordY == SIZE.HEIGHT) {
        snakeCoordY = 0;
        //direction = 'top';
      }
  }

}

function gameOver() {
  loosed = true;
  alert('You loose');
  clearInterval(interval);
}

function move() {
  switch(direction) {
    case 'top':
      snakeCoordY--;
      break;
    case 'bottom':
      snakeCoordY++;
      break;
    case 'left':
      snakeCoordX--;
      break;
    case 'right':
      snakeCoordX++;
      break;
  }
  checkBounds();

  // if(!inBounds()) {
  //   //gameOver();
  //   return;
  // }


  var $newUnit = $gameTable.children[snakeCoordY].children[snakeCoordX];

  //checkBlockUnit($newUnit); //проиграл если столкнулся с припятствием

  if(!loosed && !isSnakeUnit($newUnit) && !isBlockUnit($newUnit)) {
    $newUnit.classList.add('snake-unit');
    snake.push($newUnit);

    if(!getFood($newUnit)) {
      var $snakeRemoved = snake.shift();
      $snakeRemoved.classList.remove('snake-unit');
    } else addBlock();


    //управляем жизнью еды
    if (foodDelay === 0) {
      //respawnFood(); //если не успеваем съесть убераем еду и добавляем в новом месте
      gameOver();//проигрываем если не успеваем съесть еду
    } else {
      foodDelay--;
      document.querySelector('#delay').textContent = foodDelay;
    }

  } else {
    gameOver();
  }
}

// function respawnFood() {
//   var $foodUnit = document.querySelector('.food-unit');
//   $foodUnit.classList.remove('food-unit');
//   createFood();
//   foodDelay = SIZE.WIDTH + SIZE.HEIGHT;
//   document.querySelector('#delay').textContent = foodDelay;
// }

function getFood(unit) {
  if(unit.classList.contains('food-unit')) {
    unit.classList.remove('food-unit');
    score++;
    document.querySelector('#score').textContent = score;
    SNAKE_SPEED = 300 - score * 15;
    clearInterval(interval);
    interval = setInterval(move, SNAKE_SPEED);
    createFood();
    return true;
  } else {
    return false;
  }
}

function createFood() {
  while(true) {
    var foodX = Math.floor(Math.random() * SIZE.WIDTH);
    var foodY = Math.floor(Math.random() * SIZE.HEIGHT);

    var $foodCell = $gameTable.children[foodY].children[foodX];


    if(!snake.includes($foodCell)) {
      $foodCell.classList.add('food-unit');
      foodUnit = $foodCell;
      foodDelay = SIZE.WIDTH + SIZE.HEIGHT;
      document.querySelector('#delay').textContent = foodDelay;
      break;
    }
  }
}
function isFoodUnit(unit) {
  return unit === foodUnit;
}
function isSnakeUnit(unit) {
  return snake.includes(unit);
}

function isBlockUnit(unit) {
  return blocks.includes(unit);
}

// function checkBlockUnit(unit) {
//   if (blocks.includes(unit)) {
//     gameOver();
//   }
// }

function handleStartClick(event) {
  if (!loosed) {
    respawn();
    interval = setInterval(move, SNAKE_SPEED);
    createFood();  }
}

function handleRenewClick(event) {
  window.location.reload();
}

function handleDirectionChange(event) {
  switch(event.code) {
    case 'ArrowLeft':
      if(direction !== 'right') direction = 'left';
      break;
    case 'ArrowUp':
      if(direction !== 'bottom') direction = 'top';
      break;
    case 'ArrowRight':
      if(direction !== 'left') direction = 'right';
      break;
    case 'ArrowDown':
      if(direction !== 'top') direction = 'bottom';
      break;
  }
}

function init() {
  $gameField = document.querySelector('#snake-field');

  prepareGameField();

  document.querySelector('#snake-start').addEventListener('click', handleStartClick);
  document.querySelector('#snake-renew').addEventListener('click', handleRenewClick);

  window.addEventListener('keydown', handleDirectionChange);
}

window.addEventListener('load', init);