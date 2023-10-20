// Get the root element
var r = document.querySelector(':root');


var point = 0;
// var time = 59; // for testing purposes
var time = 59;
var bin = ["bin1", "bin2", "bin3", "bin4", "bin5", "bin6", "bin7", "bin8", "bin9", "bin10", "bin11", "star", "star"];

document.getElementById('tutorial').style.visibility = 'visible';

function start() {
  setInterval(main, 1000);
  document.getElementById('tutorial').style.visibility = 'hidden';
  document.querySelector('.menu').style.visibility = 'visible';
}

function gameOver(e) {
  clearInterval(e);
}

function main(){
    document.getElementById("time").innerHTML = time > 9 ? time : '0' + time;
    document.getElementById("time").style.color = time > 9 ? "white" : "hsl(2, 91%, 62%)" ;
     
    if (time != 0){
      var item = Math.floor(Math.random() * 14);
      var posx = Math.floor(100 + Math.random() * 900);
      var rotate = Math.floor(Math.random() * 360);

      console.log(bin[item]);

      var node = document.getElementById(bin[item]);
      var clone = node.cloneNode(true);
      clone.style.transform = "translateX(" + posx + "px) rotate(" + rotate + "deg)"; 
      clone.style.visibility = "visible";
      itemDisappear(document.getElementById("generate").appendChild(clone));
      
      time--;
    }
    else{
      document.getElementById("game_over").style.visibility = "visible";
      document.querySelector(".menu").style.visibility = "hidden";
      document.getElementById("score").innerHTML = point;
      removeAllChildNodes(document.getElementById("generate"))
      showCharacter(point);
      gameOver(start);
    }
}

function itemDisappear(el) {
      setTimeout(() => {
          el.animate([
            {opacity: '1'},
            {opacity: '0'},
          ], {
            duration: 2500,
            iterations: 1,
            fill: 'forwards'
          });
          setTimeout(() => {
             el.style.pointerEvents = 'none';
          }, 2000)
      }, 5000)  
}

// show character when end game is over 
function showCharacter(score) {
    if (score > 1500) {
      document.getElementById("content1").style.visibility = "visible";
    }
    else if (score > 1000) {
      document.getElementById("content2").style.visibility = "visible";
    }
    else {
      document.getElementById("content3").style.visibility = "visible";
    }
}

function collect(el){
    var bin = document.querySelector(bin);
    // r.style.setProperty('--posy', '-200px');
    // el.style.visibility = "hidden";
    var top  = el.getBoundingClientRect().top;
    var left = el.getBoundingClientRect().left;
    el.style.top = top + "px";
    el.style.left = (left + 25) + "px";
    el.style.setProperty('animation', 'collect 1s 1');
    point += 100;
    el.style.rotate = "0deg";
    el.backgroundSize = "100px 100px";
    el.backgroundPosition = "center center";    
    el.style.backgroundImage = "url('./asset/correct.png')";
    el.style.pointerEvents = 'none';
    el.innerHTML = "<h4 style='color: #f2f1f1'>+100</h4>";
    document.getElementById("point").innerHTML = point;
    el.animate([
      // key frames
      {  opacity: '1'},
      {  opacity: '1'}
    ], {
      // sync options
      duration: 1000,
      iterations: 1
    });

    setTimeout(function() {
      //your code to be executed after 1 second
      document.getElementById("generate").removeChild(el);
      console.log(point);
    }, 1000);
}

function minus(el){
    var bin = document.querySelector(bin);
    point = point <= 0 ? 0 : point - 100;
    var top  = el.getBoundingClientRect().top;
    var left = el.getBoundingClientRect().left;
    el.style.top = top + "px";
    el.style.left = (left + 25) + "px";
    el.style.setProperty('animation', 'collect 1s 1');
    el.style.rotate = "0deg";
    el.backgroundSize = "100px 100px";
    el.backgroundPosition = "center center";
    el.style.backgroundImage = "url('./asset/wrong.png')";
    el.style.pointerEvents = 'none';
    el.innerHTML = "<h4 style='color: #f2f1f1; transform: translateY(-40px)'>-100</h4>";
    document.getElementById("point").innerHTML = point;
    el.animate([
      // key frames
      {opacity: '1'},
      {opacity: '1'}
    ], {
      // sync options
      duration: 1000,
      iterations: 1
    });
    setTimeout(function() {
      //your code to be executed after 2 second
      document.getElementById("generate").removeChild(el);
      console.log(point);
    }, 1000);
}

function reset(){
  point = 0;
  time = 59;
  document.querySelector(".menu").style.visibility = 'visible';
  document.getElementById("point").innerHTML = point;
  document.getElementById("game_over").style.visibility = "hidden";
  document.getElementById("content1").style.visibility = "hidden";
  document.getElementById("content2").style.visibility = "hidden";
  document.getElementById("content3").style.visibility = "hidden";
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}