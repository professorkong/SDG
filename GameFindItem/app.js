// Get the root element
var r = document.querySelector(':root');


var point = 0;
// var time = 59; // for testing purposes
var time = 2;
var bin = ["bin1", "bin2", "bin3", "bin4", "star", "star","bin5", "bin6", "bin7", "bin8", "bin9", "bin10", "bin11", "star", "star"];

document.getElementById('tutorial').style.visibility = 'visible';

function start() {
  setInterval(main, 1000);
  document.getElementById('tutorial').style.visibility = 'hidden';

}

function gameOver(e) {
  clearInterval(e);
}

function main(){ 
    document.getElementById("time").innerHTML = time > 9 ? time : '0' + time;
     
    if (time != 0){
      var item = Math.floor(Math.random() * 18);
      var posx = Math.floor(100 + Math.random() * 900);
      var rotate = Math.floor(Math.random() * 360);

      console.log(bin[item]);

      var node = document.getElementById(bin[item]);
      var clone = node.cloneNode(true);
      clone.style.translate = posx + "px " + "-100px";
      clone.style.rotate = rotate + "deg";
      clone.style.visibility = "visible";
      document.getElementById("generate").appendChild(clone);
      time--;
    }
    else{
      document.getElementById("game_over").style.visibility = "visible";
      document.getElementById("score").innerHTML = point;
      removeAllChildNodes(document.getElementById("generate"))
      gameOver(start);
    }
}


function collect(el){
    var bin = document.querySelector(bin);
    r.style.setProperty('--posy', '-200px');
    // el.style.visibility = "hidden";
    point += 100;
    document.getElementById("generate").removeChild(el);
    document.getElementById("point").innerHTML = point;
    console.log(point);
}

function minus(el){
    var bin = document.querySelector(bin);
    point -= 100;
    document.getElementById("generate").removeChild(el);
    document.getElementById("point").innerHTML = point;
    console.log(point);
}

function reset(){
  point = 0;
  time = 59;
  document.getElementById("point").innerHTML = point;
  document.getElementById("game_over").style.visibility = "hidden";
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}