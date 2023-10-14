
let poy = 0;
let player = document.querySelector('.player');


//disble long touch

window.oncontextmenu = function(event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
};

let ob_top = document.querySelectorAll('.ob_top');
let ob_bottom = document.querySelectorAll('.ob_bottom');


setInterval(game, 1);

i = 0;

let p_l = parseInt(player.getBoundingClientRect().left)
console.log(p_l)
let p_r = parseInt(player.getBoundingClientRect().right)
console.log(p_r)

function game(){
  let p_t = parseInt(player.getBoundingClientRect().top)
  // console.log(p_t)
  let p_b = parseInt(player.getBoundingClientRect().bottom)
  // console.log(p_b)

  //collision check
  for (let t of ob_top){
    let t_l = parseInt(t.getBoundingClientRect().left);
    let t_r = parseInt(t.getBoundingClientRect().right);
    let t_b = parseInt(t.getBoundingClientRect().bottom);
    if (p_r >= t_l && p_l <= t_r && p_t <= t_b){
        console.log("top")
        player.style.setProperty('--cor', 'red');
    }
  }

  for (let b of ob_bottom){
    let b_l = parseInt(b.getBoundingClientRect().left);
    let b_r = parseInt(b.getBoundingClientRect().right);
    let b_t = parseInt(b.getBoundingClientRect().top);
    if (p_r >= b_l && p_l <= b_r && p_b >= b_t){
        console.log("bottom")
        player.style.setProperty('--cor', 'red');
    }
  }
}

function swim(){
  player.style.setProperty('--poy', 0 + '%');
}

function down(){
  player.style.setProperty('--poy', 70 + '%');
}