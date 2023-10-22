
let poy = 0;
let player = document.querySelector('.player');


//disble long touch

window.oncontextmenu = function(event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
};

function swim(){
  player.style.setProperty('--poy', 0 + '%');
}

function down(){
  player.style.setProperty('--poy', 70 + '%');
}



setInterval(game, 1);

i = 0;

let p_l = parseInt(player.getBoundingClientRect().left)
console.log(p_l)
let p_r = parseInt(player.getBoundingClientRect().right)
console.log(p_r)

function rock(p_t){

  let ob_top = document.querySelectorAll('.boxR');
  
  for (let t of ob_top){
    let t_l = parseInt(t.getBoundingClientRect().left);
    let t_r = parseInt(t.getBoundingClientRect().right);
    let t_b = parseInt(t.getBoundingClientRect().bottom);
    if (p_r >= t_l && p_l <= t_r && p_t <= t_b){
      // console.log(t)
      t.style.setProperty('--co', 'red');
      // player.style.setProperty('--cor', 'red');
    }
  }
  
}

function coral(p_b){
  
  let ob_bottom = document.querySelectorAll('.boxC');

  for (let b of ob_bottom){
    let b_l = parseInt(b.getBoundingClientRect().left);
    let b_r = parseInt(b.getBoundingClientRect().right);
    let b_t = parseInt(b.getBoundingClientRect().top);
    if (p_r >= b_l && p_l <= b_r && p_b >= b_t){
        // console.log(b)
        b.style.setProperty('--co', 'red');
        // player.style.setProperty('--cor', 'red');
    }
  }
}

let count = 0;

function check(){
  let box = document.querySelectorAll(".background");
  for (let i of box){
    let i_r = parseInt(i.getBoundingClientRect().right);
    if (i_r <= p_l && i.dataset.check == 0){
      let node = document.getElementById("level_2");
      let clone = node.cloneNode(true);
      clone.dataset.check = 0;
      document.querySelector(".loop").appendChild(clone)
      i.dataset.check = 1;
      let flex = document.querySelector(".flex");
      count += 1.2;
      flex.style.setProperty('--count', count)
      console.log("Check");
    }
  }
}

function pass(){
  let box = document.querySelectorAll(".box");
  for (let i of box){
    let i_r = parseInt(i.getBoundingClientRect().right);
    if (i_r <= p_l && i.dataset.pass == 0){
      console.log("Pass");
      i.dataset.pass = 1;
    }

  }
}



function game(){
  let p_t = parseInt(player.getBoundingClientRect().top)
  // console.log(p_t)
  let p_b = parseInt(player.getBoundingClientRect().bottom)
  // console.log(p_b)
  //collision check

  // rock5(p_t, p_b)
  rock(p_t)
  coral(p_b)
  pass()
  check()
}


let point = 0
let time = 60;

document.getElementById('tutorial').style.visibility = 'visible';

function main(){
  document.getElementById("time").innerHTML = time > 9 ? time : '0' + time;
  document.getElementById("time").style.color = time > 9 ? "white" : "hsl(2, 91%, 62%)" ;

  if (time != 0){
    time--;
  }
  else{
    document.getElementById("game_over").style.visibility = "visible";
    document.querySelector(".menu").style.visibility = "hidden";
    document.getElementById("score").innerHTML = point;
    showCharacter(point);
    gameOver(start);
  }

}

function start() {
  setInterval(main, 1000);
  document.getElementById('tutorial').style.visibility = 'hidden';
  document.querySelector('.menu').style.visibility = 'visible';

  let flex = document.querySelector(".flex");
  flex.style.setProperty('--count', 1.2)
}

function gameOver(e) {
  clearInterval(e);
  let flex = document.querySelector(".flex");
  flex.style.setProperty('--count', 1.2)
  flex.style.setProperty('--dif', '0s')
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

function reset(){
  point = 0;
  time = 60;
  document.querySelector(".menu").style.visibility = 'visible';
  document.getElementById("point").innerHTML = point;
  document.getElementById("game_over").style.visibility = "hidden";
  document.getElementById("content1").style.visibility = "hidden";
  document.getElementById("content2").style.visibility = "hidden";
  document.getElementById("content3").style.visibility = "hidden";
  let flex = document.querySelector(".flex");
  flex.style.setProperty('--count', 1.2)
  flex.style.setProperty('--dif', '40s')
}