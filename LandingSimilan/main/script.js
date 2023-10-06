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
    }
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
      let fishWidth = 500 // ระยะการเลื่อน
      let fishWidthGap = 600 //ระยะการเลื่อน + ให้ปลาริมโดนกินขอบนิดนึง
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
        fishgal.scrollLeft = Math.floor(fishgal.scrollLeft / fishWidth) * fishWidth + fishWidthGap;
        chackAddFish();
      }

      // ipad แต่จิ้มลากก็คือการ scroll ไม่ต้องเก็บค่า mouse นู่นนี่เหมือนคอม
      fishgal.addEventListener("touchend", (e) => touchEnd(e));
      fishgal.addEventListener("touchstart", (e) => touchStart(e));

      let xStart, xEnd, yStart, yEnd;
      let dif = 0;
      function touchStart(e) {
        scaleCenterBubble();
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
      let leftArrow = document.querySelector(".arrow.right");

      function nextFishCard() {
        if (fishgal.scrollLeft > 0) {
          leftArrow.style.opacity = 1;
        }

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
      }

      // prev card
      function prevFishCard() {
        //แผ่นแรกไม่ให้กดซ้าย
        if (fishgal.scrollLeft == 0) {
          leftArrow.style.opacity = 0;
          return;
        }

        //ปกติ
        prevFishNumber = nowFishNumber * 1 - 1;
        if (prevFishNumber == 0) {
          prevFishNumber = 7;
        }
        console.log({ nowFishNumber, prevFishNumber });
        let card = document.querySelector(".data-card");
        let html = `<img src="${fishs[prevFishNumber - 1].fish_data}">`;
        card.innerHTML = html;
        nowFishNumber = prevFishNumber;

        //ขยับด้านหลัง
        nowleft = fishgal.scrollLeft;
        fishgal.scrollLeft = nowleft - (nowleft % fishWidth) - (fishWidthGap / 2);

        chackAddFish();
      }

function scrollY(pageid){
  body = document.querySelector("body")
  page = document.querySelector(pageid)
  pageStat = page.getBoundingClientRect();
  
  let pos = body.style.top;
  if(pos.includes("px")){pos = parseInt(pos)} // แปลงเป็น int
  scrollToBottom = (pageStat.bottom - 834) * -1 + pos // + ต่อจาก top เดิม

  // frame animation
  let id = setInterval(frame, 0.1);
  function frame() {
    if (pos == scrollToBottom || pos == scrollToBottom-1) {
      console.log(body.style.top)
      clearInterval(id);
    } else {
      pos -= 2; 
      body.style.top = pos + 'px';
      
    }
  }
}