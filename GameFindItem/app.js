// Get the root element
var r = document.querySelector(':root');

// Create a function for getting a variable value
function myFunction_get() {
  // Get the styles (properties and values) for the root
  var rs = getComputedStyle(r);
  // Alert the value of the --blue variable
  alert("The value of --blue is: " + rs.getPropertyValue('--blue'));
}

// Create a function for setting a variable value
function myFunction_set() {
  // Set the value of variable --blue to another value (in this case "lightblue")
  r.style.setProperty('--blue', 'lightblue');
}


var point = 0;
// var time = 60;
var time = 15;
var topScore = 0;
var bin = ["bin1", "bin2", "bin3", "bin4", "bin5", "bin6", "bin7", "bin8", "bin9", "bin10", "bin11", "bin12"];

document.getElementById('tutorial').style.visibility = 'visible';

function start() {
  setInterval(main, 1000);
  // document.getElementById('tutorial').style.visibility = 'hidden';

}

function gameOver(e) {
  clearInterval(e);
}

function main(){
    console.log("main___gogogo");
    document.getElementById("time").innerHTML = time > 9 ? '00:' + time : '00:0' + time;
     
    if (time != 0){
      var item = Math.floor(Math.random() * 12);
      var posx = Math.floor(100 + Math.random() * 1800);

      console.log(bin[item]);

      var node = document.getElementById(bin[item]);
      var clone = node.cloneNode(true);
      clone.style.translate = posx + "px " + "+300px";
      clone.style.visibility = "visible";
      document.getElementById("generate").appendChild(clone);
      time--;
    }
    else{
      document.getElementById("game_over").style.visibility = "visible";
      topScore = calTopScore(topScore, point)
      console.log(topScore);
      document.getElementById("top-hit").innerHTML = topScore;
      removeAllChildNodes(document.getElementById("generate"))
      gameOver(start);
    }
}

function calTopScore(oldScore, newScore) {
    return newScore > oldScore ? newScore : oldScore;
}

function collect(el){
    var bin = document.querySelector(bin);
    r.style.setProperty('--posy', '-1000px');
    point += 100;
    // el.style.visibility = "hidden";
    document.getElementById("generate").removeChild(el);
    document.getElementById("point").innerHTML = point;
    console.log(point);

}

function reset(){
  point = 0;
// time = 60;
  time = 15;
  document.getElementById("point").innerHTML = point;
  document.getElementById("game_over").style.visibility = "hidden";
  start = start();
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}