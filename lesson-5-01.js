var strChars = 'ABCDEFGH'; //буквенные подписи клеток

var $form = document.getElementById('form');

//добавляем главный блок-контейнер
var $div_chessboard = document.createElement("div");
$div_chessboard.classList.add('chessboard');
$form.appendChild($div_chessboard);

//формируем верхний ряд блоков подписей клеток
//добавляем пустой верхний левый блок
var $div_chessboard__cell_empty = document.createElement("div");
$div_chessboard__cell_empty.classList.add('chessboard__cell_empty');
$div_chessboard.appendChild($div_chessboard__cell_empty);

//добавляем блоки верхнего ряда буквенных подписей
for (var i = 0; i < strChars.length; i++) {
    var $div_chessboard__cell_border_top = document.createElement('div');
    $div_chessboard__cell_border_top.textContent = strChars[i];
    $div_chessboard__cell_border_top.classList.add('chessboard__cell_border-top');
    $div_chessboard.appendChild($div_chessboard__cell_border_top);
}

//добавляем пустой верхний правый блок
var $div_chessboard__cell_empty = document.createElement("div");
$div_chessboard__cell_empty.classList.add('chessboard__cell_empty');
$div_chessboard.appendChild($div_chessboard__cell_empty);

//верхний ряд блоков сформирован

//добавляем блоки клеток поля доски
var isWightFist = true;
for (var i = 0; i < 32; i++) {
    if (i % 4 === 0 && i !== 0)
        isWightFist = !isWightFist;

    if (isWightFist) {
        var $div_chessboard__cell_wight = document.createElement('div');
        $div_chessboard__cell_wight.classList.add('chessboard__cell_wight');
        $div_chessboard.appendChild($div_chessboard__cell_wight);
        var $div_chessboard__cell_black = document.createElement('div');
        $div_chessboard__cell_black.classList.add('chessboard__cell_black');
        $div_chessboard.appendChild($div_chessboard__cell_black);
    } else {
        var $div_chessboard__cell_black = document.createElement('div');
        $div_chessboard__cell_black.classList.add('chessboard__cell_black');
        $div_chessboard.appendChild($div_chessboard__cell_black);
        var $div_chessboard__cell_wight = document.createElement('div');
        $div_chessboard__cell_wight.classList.add('chessboard__cell_wight');
        $div_chessboard.appendChild($div_chessboard__cell_wight);
    }
}
//добавляем цифровые подписи клеток слева и справа
var insPosition = 9;
for (var i = 0; i < 8; i++) {
    insPosition += 1;
    var $div_chessboard__cell_border_left = document.createElement('div');
    $div_chessboard__cell_border_left.classList.add('chessboard__cell_border-left');
    $div_chessboard__cell_border_left.textContent = 8 - i;
    $div_chessboard.insertBefore($div_chessboard__cell_border_left, $div_chessboard.children[insPosition]);

    var $div_chessboard__cell_border_right = document.createElement('div');
    $div_chessboard__cell_border_right.classList.add('chessboard__cell_border-right');
    $div_chessboard__cell_border_right.textContent = 8 - i;
    insPosition += 9;
    $div_chessboard.insertBefore($div_chessboard__cell_border_right, $div_chessboard.children[insPosition]);
}
//формируем нижний ряд блоков подписей клеток по аналогии с верхним
var $div_chessboard__cell_empty = document.createElement("div");
$div_chessboard__cell_empty.classList.add('chessboard__cell_empty');
$div_chessboard.appendChild($div_chessboard__cell_empty);

for (var i = 0; i < strChars.length; i++) {
    var $div_chessboard__cell_border_bottom = document.createElement('div');
    $div_chessboard__cell_border_bottom.textContent = strChars[i];
    $div_chessboard__cell_border_bottom.classList.add('chessboard__cell_border-bottom');
    $div_chessboard.appendChild($div_chessboard__cell_border_bottom);
}

var $div_chessboard__cell_empty = document.createElement("div");
$div_chessboard__cell_empty.classList.add('chessboard__cell_empty');
$div_chessboard.appendChild($div_chessboard__cell_empty);

//нижний ряд блоков сформирован

//конец формирования шахматной доски

//добавим обработчик для анимации
var form = document.querySelector('form');
form.onmouseenter = function(event) {
    $div_chessboard.classList.add('chessboard_on_hover');
    console.log(event.target.tagName);
};



