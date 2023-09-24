
let poy = 0;
let player = document.querySelector('.player');


//disble long touch

// window.oncontextmenu = function(event) {
//   event.preventDefault();
//   event.stopPropagation();
//   return false;
// };

let ob_top = document.querySelectorAll('.ob_top');
let ob_button = document.querySelectorAll('.ob_button');


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


  for (let t of ob_top){
    let t_l = parseInt(t.getBoundingClientRect().left);
    let t_r = parseInt(t.getBoundingClientRect().right);
    let t_b = parseInt(t.getBoundingClientRect().bottom);
    // console.log(t_l);
    // console.log(t_r);
    // console.log(t_b);

    if (p_r >= t_l && p_l <= t_r){
      // console.log("check1")
      if (p_t <= t_b){
        // console.log("check2")
        player.style.setProperty('--cor', 'red');
      }
    }

  }
  // let info_ob = ob.getBoundingClientRect().x;
  // console.log(info_ob);

  // let info_p = player.getBoundingClientRect().y;
  // console.log(info_p)
}

function swim(){
  player.style.setProperty('--poy', 0 + '%');
}

function down(){
  player.style.setProperty('--poy', 70 + '%');
}