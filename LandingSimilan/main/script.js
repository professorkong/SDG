const fishs = [
  {
    fishid: 1,
    fish_pic: "../asset/fish/pic/fish_pic01.png",
    fish_data: "../asset/fish/data/fish_data1.png",
  },
  {
    fishid: 2,
    fish_pic: "../asset/fish/pic/fish_pic02.png",
    fish_data: "../asset/fish/data/fish_data2.png",
  },
  {
    fishid: 3,
    fish_pic: "../asset/fish/pic/fish_pic03.png",
    fish_data: "../asset/fish/data/fish_data3.png",
  },
  {
    fishid: 4,
    fish_pic: "../asset/fish/pic/fish_pic04.png",
    fish_data: "../asset/fish/data/fish_data4.png",
  },
  {
    fishid: 5,
    fish_pic: "../asset/fish/pic/fish_pic05.png",
    fish_data: "../asset/fish/data/fish_data5.png",
  },
  {
    fishid: 6,
    fish_pic: "../asset/fish/pic/fish_pic06.png",
    fish_data: "../asset/fish/data/fish_data6.png",
  },
  {
    fishid: 7,
    fish_pic: "../asset/fish/pic/fish_pic07.png",
    fish_data: "../asset/fish/data/fish_data7.png",
  },
];

// show buble fish
const bubbles = document.querySelectorAll(".fish");
let text = "";
let count = 0;
for (let fish of fishs) {
  text = `<img src="${fish.fish_pic}"><div class="moreinfo"><img src="../asset/abc/moreinfo.png"></div>`;
  bubbles[count].innerHTML = text;
  count++;
}

// auto slide loop
// https://www.youtube.com/watch?v=tZmpC93zkio

let delay = 2000;
let fishWidth = 500; // ระยะการเลื่อน
let fishWidthGap = 600; //ระยะการเลื่อน + ให้ปลาริมโดนกินขอบนิดนึง
let autoScroll = setInterval(scroll2, delay);
const fishgal = document.querySelector(".fish-gallery");

let numfishPlus = 0;
let numfishDown = 6;
let availableOffset = fishgal.scrollWidth - fishgal.clientWidth;

function chackAddFish() {
  //ดึงหน้ามาต่อท้าย ถ้าเหลือน้้อยกว่า 1000px
  if (fishgal.scrollLeft > fishgal.clientWidth - 1000) {
    elementToCut = bubbles[numfishPlus % 6];
    numfishPlus++;
    $(fishgal).append($(elementToCut).clone());
  }
}

function scroll2() {
  fishgal.scrollLeft =
    Math.floor(fishgal.scrollLeft / fishWidth) * fishWidth + fishWidthGap;
  chackAddFish();
}

// ipad แต่จิ้มลากก็คือการ scroll ไม่ต้องเก็บค่า mouse นู่นนี่เหมือนคอม
fishgal.addEventListener("touchend", (e) => touchEnd(e));
fishgal.addEventListener("touchstart", (e) => touchStart(e));

let xStart, xEnd, yStart, yEnd;
let dif = 0;
function touchStart(e) {
  // เก็บตำแหน่ง toustart & end ถ้าเป็นจุดเดียวกันค่อยโชว์ปลา
  // https://stackoverflow.com/questions/41993176/determine-touch-position-on-tablets-with-javascript/61732450#61732450
  var evt = typeof e.originalEvent === "undefined" ? e : e.originalEvent;
  var touch = evt.touches[0] || evt.changedTouches[0];
  xStart = touch.pageX;
}
function touchEnd(e) {
  // เก็บตำแหน่ง toustart & end ถ้าเป็นจุดเดียวกันค่อยโชว์ปลา
  var evt = typeof e.originalEvent === "undefined" ? e : e.originalEvent;
  var touch = evt.touches[0] || evt.changedTouches[0];
  xEnd = touch.pageX;
  dif = Math.abs(xStart - xEnd);

  chackAddFish();
}

// show data card
let nowFishNumber; //ไว้ใช้ตอนกดเปลี่ยน

function showFishData(el) {
  // ถ้าจิ้มแล้วเคลื่อนเกิน 100px ไม่ต้องโชว์
  if (dif > 100) return;

  clearInterval(autoScroll); //หยุดลูป

  let data = el.dataset;
  nowFishNumber = data.fishid; //เก็บให้ฟังชั่นเปลี่ยนหน้า
  let body = document.querySelector("body");
  let pagecard = document.querySelector(".fish-card");
  let card = document.querySelector(".data-card");
  let html = `<img src="${fishs[data.fishid - 1].fish_data}">`;

  body.style.overflow = "hidden";
  pagecard.style.visibility = "visible";
  pagecard.style.opacity = "1";
  card.innerHTML = html;
}

// click card to close
function closeFishData(el) {
  let body = document.querySelector("body");
  let pagecard = document.querySelector(".fish-card");

  body.style.overflow = "none";
  pagecard.style.visibility = "hidden";
  pagecard.style.opacity = "0";

  autoScroll = setInterval(scroll2, delay);
}

// next card
let leftArrow = document.querySelector(".arrow.left");

function nextFishCard() {
  nextFishNumber = nowFishNumber * 1 + 1;
  if (nextFishNumber == 8) {
    nextFishNumber = 1;
  }
  console.log({ nowFishNumber, nextFishNumber });
  let card = document.querySelector(".data-card");
  let html = `<img src="${fishs[nextFishNumber - 1].fish_data}">`;
  card.innerHTML = html;
  nowFishNumber = nextFishNumber;



  //ขยับด้านหลัง
  nowleft = fishgal.scrollLeft;
  fishgal.scrollLeft = nowleft - (nowleft % fishWidth) + fishWidthGap;
  chackAddFish();

  //กลับมาแสดงลูกศร
  if (fishgal.scrollLeft > 0) {
    leftArrow.style.opacity = 1;
  }
}

// prev card
function prevFishCard() {
  //ปกติ
  prevFishNumber = nowFishNumber * 1 - 1;
  if (prevFishNumber == 0) {
    prevFishNumber = 7;
  }
  let card = document.querySelector(".data-card");
  let html = `<img src="${fishs[prevFishNumber - 1].fish_data}">`;
  card.innerHTML = html;
  nowFishNumber = prevFishNumber;

  //ขยับด้านหลัง
  nowleft = fishgal.scrollLeft;
  fishgal.scrollLeft = nowleft - (nowleft % fishWidth) - fishWidthGap / 2;

  chackAddFish();

  //แผ่นแรกไม่ให้กดซ้าย
  if (fishgal.scrollLeft == 0) {
    leftArrow.style.opacity = 0;
    return;
  }
}

function scrollY(pageid) {
  body = document.querySelector("body");
  page = document.querySelector(pageid);
  pageStat = page.getBoundingClientRect();
  let pos = body.style.top;
  if (pos.includes("px")) {
    pos = parseInt(pos);
  } // แปลงเป็น int
  scrollToTop = parseInt((pageStat.bottom - 834) * -1 + pos); // + ต่อจาก top เดิม

  //call class
  let text2 = document.querySelector('.textpage2')
  let text3 = document.querySelector('.textpage3')
  let text4 = document.querySelector('.textpage4')
  let text5 = document.querySelector('.textpage5')
  let text6 = document.querySelector('.textpage6')
  let text1top = 100;
  let text1 = document.querySelector(".t1");
  let coral2 = document.querySelectorAll(".c2");

  let seaweed1_2 = document.querySelector('.seaweedleft_2')
  let seaweed2_2 = document.querySelector('.seaweedright1_2')
  let seaweed2_3 = document.querySelector('.seaweedright2_2')
  let island2 = document.querySelector('.island_2')
  let islandwave2 = document.querySelector('.islandwave_2')
  let seaweedback2 = document.querySelector('.seaweedback_2')
  

  let sceneback3 = document.querySelector('.sceneback_3')
  let shark3 = document.querySelector('.shark_3')
  let scenemid3 = document.querySelector('.scenemid_3')
  let scenefront3 = document.querySelector('.scenefront_3')
  let cfront13 = document.querySelector('.coralfront1_3')
  let cfront23 = document.querySelector('.coralfront2_3')
  let cmid = document.querySelector('.coralmid_3')

  let island4 = document.querySelector('.island_4')
  let islandwave4 = document.querySelector('.wave_4')
  let rock4 = document.querySelector('.rock_4')
  let fg = document.querySelector('.fish-gallery')

  let rock5 = document.querySelector('.rock_5')
  let fc1 = document.querySelector('.fc1')
  let fc2 = document.querySelector('.fc2')
  let fc3 = document.querySelector('.fc3')

  let sp1 = document.querySelector('.sp1')
  let sp2 = document.querySelector('.sp2')
  let sp3 = document.querySelector('.sp3')

  let rockback6 = document.querySelector('.rockback_6')
  let rockmid6 = document.querySelector('.rockmid_6')
  let cfront6 = document.querySelector('.coralfront_6')
  let trash1 = document.querySelector('.trash1_6')
  let trash2 = document.querySelector('.trash2_6')
  let trash3 = document.querySelector('.trash3_6')
  
  // frame animation
  let id = setInterval(frame, 0.1);
  function frame() {
    if (pos == scrollToTop || pos == scrollToTop - 1 || pos == scrollToTop - 2 ) {
      clearInterval(id);
    }
    else {
      pos -= 3;
      body.style.top = pos + "px";
      console.log(pos)
      if (pos >= -1094) {
        text1top += pos * -0.003;
        text1.style.setProperty('opacity',1+pos*0.003)
        text1.style.setProperty('filter','blur(4px)')
      }
      //1
      text1.style.top = text1top + 'px'
      
      //2
      if (pos <= -600) {
        seaweed1_2.style.setProperty('top', '33%')
        seaweed2_2.style.setProperty('top', '18%')
        seaweed2_3.style.setProperty('top', '26%')
        island2.style.setProperty('bottom', '0')
        islandwave2.style.setProperty('bottom', '0')
        seaweedback2.style.setProperty('top', '15%')
        text2.style.setProperty('opacity', '1')
        for (let h of coral2) {
          h.style.setProperty('bottom', '-1%')
          // h.style.setProperty('--cb', '6px')
        }
      }
      if(pos <= -500){
        for (let h of coral2) {
          h.style.setProperty('--cb', 6+pos*0.005+'px')
        }
        seaweedback2.style.setProperty('--cb', 5+pos*0.004+'px')
        seaweed1_2.style.setProperty('--cb',5+pos*0.004+'px')
        seaweed2_2.style.setProperty('--cb', 6+pos*0.004+'px')
        seaweed2_3.style.setProperty('--cb', 4+pos*0.004+'px')
      }
      if(pos <= -1100){
        text2.style.setProperty('filter','blur(20px)')
      }

      //3
      if(pos <= -1200){
        sceneback3.style.setProperty('bottom', '15%')
        scenemid3.style.setProperty('bottom', '0%')
        scenefront3.style.setProperty('bottom', '0%')
        text3.style.setProperty('margin-top', '15%')
        text3.style.setProperty('opacity', '1')
        shark3.style.setProperty('right','-4%')
        shark3.style.setProperty('top','10%')
        
      }
      if(pos <= -1700){
        // console.log(1)
        if( pos >= -2000){
          cfront13.style.setProperty('--cbb', 10+pos*0.005+'px')
          cfront23.style.setProperty('--cbb', 10+pos*0.005+'px')
          cmid.style.setProperty('--cbb', 2+pos*0.005+'px')
        }
        
      }

      //4
      if(pos <= -1980){
        
        text3.style.setProperty('filter','blur(20px)')
        fg.style.setProperty('filter', 'blur(50px)')
      }
      if(pos <= -2300){
        rock4.style.setProperty('bottom', '-50%')
        islandwave4.style.setProperty('bottom', '0%')
        
      }
      if( pos <= -2600){
        fg.style.setProperty('filter', 'blur(0px)')
        
      }
      if(pos <= -2763){
        
      }

      if (pos <= -2800){
        // fg.style.setProperty('filter', 'blur(20px)')
        text4.style.setProperty('filter','blur(20px)')
      }
       //5
       if(pos <= -3750){
        rock5.style.setProperty('top', '-10%')
       }
       if(pos <= -3600){
        fc1.style.setProperty('bottom', '18%')
        fc2.style.setProperty('bottom', '18%')
        fc3.style.setProperty('bottom', '18%')
        // sp1.style.setProperty('left', '14.5%')
        // sp3.style.setProperty('left', '64%')
       }

       //6
       if (pos <= -3900){
        text5.style.setProperty('filter','blur(20px)')
       }
       if (pos <= -4000){
        trash1.style.setProperty('top', '50%')
        trash2.style.setProperty('top', '43%')
        trash3.style.setProperty('top', '60%')
        // fc1.style.setProperty('bottom', '30%')
        // fc2.style.setProperty('bottom', '30%')
        // fc3.style.setProperty('bottom', '30%')
        
       }

       if (pos <= -4200){
        rockback6.style.setProperty('bottom', '18%')
        rockmid6.style.setProperty('bottom', '0%')
        cfront6.style.setProperty('bottom', '-3%')
        
       }

      //  if (pos <= -4600){
      //   trash1.style.setProperty('top', '50%')
      //   trash2.style.setProperty('top', '43%')
      //   trash3.style.setProperty('top', '60%')
      //  }
       

    }
  }
}

// flip card page 5
function flipCard(el) {
  el.dataset.open *= -1
}


// function setContent(){
//   let point = document.querySelector('.head').getBoundingClientRect().top;
//   // console.log(point);
// }
// setContent()
