
let poy = 0;
let player = document.querySelector('.player');



//disble long touch

window.oncontextmenu = function(event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
};


document.addEventListener('touchmove', function (e) {
  e.preventDefault();
});

document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
});

document.addEventListener('gesturechange', function (e) {
  e.preventDefault();
});

document.addEventListener('gestureend', function (e) {
  e.preventDefault();
});


function swim(){
  if (isover == 0){
    player.style.setProperty('--poy', 0 + '%');
  }
}

function down(){
  if (isover == 0){
    player.style.setProperty('--poy', 70 + '%');
  }
}



setInterval(game, 1);

i = 0;
let count = 0;
let point = 0
let time = 60;
let ishit = 0;
let fatic = 0;
let map = 1;
let isover = 0;


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
    if (p_r >= t_l && p_l <= t_r && p_t <= t_b && ishit == 0 && isover == 0){
      // console.log(t)
      // t.style.setProperty('--co', 'red');
      // player.style.setProperty('--cor', 'red');
      ishit = 1;
      knockback()
    }
  }
  
}

function coral(p_b){
  
  let ob_bottom = document.querySelectorAll('.boxC');

  for (let b of ob_bottom){
    let b_l = parseInt(b.getBoundingClientRect().left);
    let b_r = parseInt(b.getBoundingClientRect().right);
    let b_t = parseInt(b.getBoundingClientRect().top);
    if (p_r >= b_l && p_l <= b_r && p_b >= b_t && ishit == 0 && isover == 0){
        console.log(b)
        // b.style.setProperty('--co', 'red');
        // player.style.setProperty('--cor', 'red');
        ishit = 1;
        knockback()
    }
  }
}
let op = 1;

function knockback(){
  let flex = document.querySelector(".flex");
  // let speed = '-1%';
  if (point > 0){
    point -= 100;
    document.getElementById("point").innerHTML = point;
    let ps = document.querySelector('.show2');
    let ps2 = document.querySelector('.show1');
    ps.style.setProperty('--s2', 1);
    ps2.style.setProperty('--s1', 0);
    ps.style.setProperty('--ps2', '100%');

    let tim1 = 2000

    setTimeout(function(){
      ps.style.setProperty('--s2', 0);
      ps.style.setProperty('--ps2', '200%');
    }, tim1)

    setTimeout(function(){
      ps.style.setProperty('--ps2', '0%');
    }, tim1 + 500)
  }

  if (fatic == 0 && parseInt(count) >= 6){
    count = 4.8;
    flex.style.setProperty('--count', count)
    fatic = 1;
  }
  else if (fatic == 0 && parseInt(count) >= 3){
    count = 2.4;
    flex.style.setProperty('--count', count)
    fatic = 1;
  }
  console.log("c = ",count)
  // flex.style.setProperty('--speed', speed)
  temp = setInterval(kapib, 200)
  setTimeout(res, 3000)
}

function res(){
  clearInterval(temp)
  ishit = 0;
  let flex = document.querySelector(".flex");
  // let speed = "calc(-10000px * var(--count))";
  // flex.style.setProperty('--speed', speed);
  op = 1;
  player.style.setProperty('--op', op)

  if (fatic == 1){
      count += 1.2;
      flex.style.setProperty('--count', count)
      fatic = 0;
  }

}


function kapib(){
  op *= -1;
  player.style.setProperty('--op', op)
}


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
      map += 1;
      flex.style.setProperty('--count', count)
      console.log("Check");
      console.log(count);
    }
  }
}

function pass(){
  let box = document.querySelectorAll(".po");
  
  for (let i of box){
    let i_r = parseInt(i.getBoundingClientRect().right);
    if (i_r <= p_l && i.dataset.pass == 0){
      console.log("Pass");
      i.dataset.pass = 1;
      point += 100;
      document.getElementById("point").innerHTML = point;
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
  console.log(count)
}

function gameOver(e) {
  clearInterval(e);
  isover = 1;
  count = 0;
  player.style.setProperty('--poy', 70 + '%');
  let flex = document.querySelector(".flex");
  flex.style.setProperty('--count', 0)
  flex.style.setProperty('--speed', "0")
  flex.style.setProperty('--dif', '100000s')

}

// show character when end game is over 
function showCharacter(score) {
  if (score > 3000) {
    document.getElementById("content1").style.visibility = "visible";
  }
  else if (score > 1500) {
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
  flex.style.setProperty('--dif', 'none')
  flex.style.setProperty('--count', 0)
  flex.style.setProperty('--speed', "calc(-10000px * var(--count))")

  let box = document.querySelectorAll(".po");
  for (let i of box){
    i.dataset.pass = 0;
  }

  let box2 = document.querySelectorAll(".background");
  for (let i of box2){
    i.dataset.check = 0;
  }



  setTimeout(function(){
    time = 60;
    isover = 0;
    flex.style.setProperty('--count', 1.2)
    flex.style.setProperty('--dif', '40s')
  }, 1000)


}