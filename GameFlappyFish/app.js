
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

function rock5(p_t, p_b){
  let xs1 = 0
  let ys1 = 0

  let xs2 = 52
  let ys2 = 308

  let xs3 = 256
  let ys3 = 487

  let ob_top = document.querySelectorAll('.rock5');

  for (let t of ob_top){
    let t_l = parseInt(t.getBoundingClientRect().left);
    let t_r = parseInt(t.getBoundingClientRect().right);
    let t_b = parseInt(t.getBoundingClientRect().bottom);
    let t_t = parseInt(t.getBoundingClientRect().top);

    let x1 = t_l + xs1;
    let y1 = (ys1+t_t) * 0.6;

    let x2 = t_l + xs2;
    let y2 = (ys2+t_t) * 0.6;

    let x3 = t_l + xs3;
    let y3 = (ys3+t_t) * 0.6;

    let m1 = (y2-y1) / (x2-x1);
    let line1 = m1*(p_r-x1) + y1 - p_t;

    let m2 = (y3-y2) / (x3-x2);
    let line2 = m2*(p_r-x2) + y2 - p_t;


    if (line1 >= 0 && p_t <= y2 && p_l <= t_r && p_t >= y1 && p_t <= t_b && p_r >= t_l){
      console.log("yes")
      console.log("line1", line1)
      console.log("p_t", p_t)
      console.log("y2", y2)
      player.style.setProperty('--cor', 'red');
    }

    if (line2 >= 0 && p_t <= y3 && p_l <= t_r && p_t >= y2 && p_t <= t_b && p_r >= t_l){
      console.log("yes")
      console.log("line2", line2)
      console.log("p_t", p_t)
      console.log("y3", y3)
      player.style.setProperty('--cor', 'red');
    }
  }

}

function rock(p_t){

  let ob_top = document.querySelectorAll('.rock');

  for (let t of ob_top){
    let t_l = parseInt(t.getBoundingClientRect().left);
    let t_r = parseInt(t.getBoundingClientRect().right);
    let t_b = parseInt(t.getBoundingClientRect().bottom);
    if (p_r >= t_l && p_l <= t_r && p_t <= t_b){
        console.log("top")
        player.style.setProperty('--cor', 'red');
    }
  }

}

function coral(p_b){
  
  let ob_bottom = document.querySelectorAll('.coral');

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


function game(){
  let p_t = parseInt(player.getBoundingClientRect().top)
  // console.log(p_t)
  let p_b = parseInt(player.getBoundingClientRect().bottom)
  // console.log(p_b)
  //collision check

  rock5(p_t, p_b)
  // rock(p_t)
  coral(p_b)
}
