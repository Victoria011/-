var player = true; // 黑true 白false
var gameOver = false;
var blacki, blackj, whitei, whitej; // 悔棋坐标
var tds = document.getElementsByTagName('td');

// 落子
var step = function() {
  if (gameOver || (this.style.background.indexOf('.png') >= 0)) {
    return;
  }
  // if () { // 已有棋子 - 不能下
  //   return;
  // }
  if(player){
    this.style.background = 'url(img/black.png) no-repeat';
  }else{
    this.style.background = 'url(img/white.png) no-repeat';
  }
  this.style.backgroundSize = '28px 28px';
  ifWin.call(this, player); // 判断胜负
  player = !player;
  if(player){
    document.getElementById('currPlayer').src="img/black.png";
  }else{
    document.getElementById('currPlayer').src="img/white.png";
  }
}

var ifWin = function(player) {
  var color;
  if(player){
    blacki = this.parentElement.rowIndex;
    blackj = this.cellIndex;
    color = 'black';
  }else{
    whitei = this.parentElement.rowIndex;
    whitej = this.cellIndex;
    color = 'white';
  }
  // 当前落子处
  var curr = {
    x: this.cellIndex,
    y: this.parentElement.rowIndex,
    color: color
  };
  var line = ['', '', '', '']; // 横，竖，\，/

  for (var i = 0, tmp = {}; i < 225; i++) {
    // 取当前循环到的这颗棋的坐标
    tmp = {
      x: tds[i].cellIndex,
      y: tds[i].parentElement.rowIndex,
      color: '0'
    };

    // 取当前循环到的这颗棋的颜色，分别 b,w,0（空）来表示
    if (tds[i].style.background.indexOf('black') >= 0) {
      tmp.color = 'b';
    } else if (tds[i].style.background.indexOf('white') >= 0) {
      tmp.color = 'w';
    }

    if (curr.y == tmp.y) {
      line[0] += tmp.color; // 在一个横线上
    }
    if (curr.x == tmp.x) {
      line[1] += tmp.color; // 在一个竖线上
    }
    if ((curr.x + curr.y) == (tmp.x + tmp.y)) {
      line[2] += tmp.color; // 在左斜线上
    }
    if ((curr.x - tmp.x) == (curr.y - tmp.y)) {
      line[3] += tmp.color; // 在右斜线上
    }
  }
  // 判断 4 种赢法上，是否有连续 4 个 w, 或 4 个 b
  color = color == 'black' ? 'bbbbb' : 'wwwww'; //赢家的颜色

  for (var i = 0; i < 4; i++) {
    if (line[i].indexOf(color) >= 0) {
      if(color == 'bbbbb'){
        alert('黑方赢了!');
      }else{
        alert('白方赢了!');
      }
      gameOver = true;
      break;
    }
  }
}
window.onload = function() {
  document.getElementsByTagName('table')[0].onclick = function(e) {
    step.call(e.srcElement);
  };
}

// 悔棋
function undoFunction(){
  if(gameOver){
    alert('该局已经结束，请重新开始。');
    return;
  }
  gameOver = false;
  for (var i = 0; i < 225; i++) {
    if(player){
      if(i == (blacki) * 15 + blackj){
        tds[i].style.background = '';
      }
    }else{
      if(i == (whitei) * 15 + whitej){
        tds[i].style.background = '';
      }
    }
  }

}
