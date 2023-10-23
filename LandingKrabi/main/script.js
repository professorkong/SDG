function scrollY(pageid){
    body = document.querySelector("body")
    page = document.querySelector(pageid)
    pageStat = page.getBoundingClientRect();
    
    let pos = body.style.top;
    if(pos.includes("px")){pos = parseInt(pos)} // แปลงเป็น int
    scrollToTop = parseInt((pageStat.bottom - 834) * -1 + pos) // + ต่อจาก top เดิม
  
    // หินงอกหินย้อยหน้า 5
    let p5 = document.querySelector(".p5");
    p5top = -470 // to -210
    // console.log(p5top)

    // frame animation
    let id = setInterval(frame, 0.1);
    function frame() {
      if (
        pos == scrollToTop ||
        pos == scrollToTop - 1 ||
        pos == scrollToTop - 2
      ) {
        clearInterval(id);
      } else {
        pos -= 3; 
        body.style.top = pos + 'px';
        console.log(pos)

        if(pageid == '#page5' && pos <= -3350){
          p5top += 2
          p5.style.top = p5top + 'px'
        }
        if(pageid == '#page6'){
          let sand = document.querySelector('.sand')
          let frontback = document.querySelector('.back_coral_3')
          let back_coral_2 = document.querySelector('.back_coral_2')
          let back_coral_1 = document.querySelector('.back_coral_1')
          let back_kelp_3 = document.querySelector('.back_kelp_3')
          let back_kelp_2 = document.querySelector('.back_kelp_2')
          let back_kelp_1 = document.querySelector('.back_kelp_1')
          if (pos < -100){
            sand.style.setProperty('bottom', 0+'px')
            back_coral_3.style.setProperty('bottom', 425+'px')
            back_coral_2.style.setProperty('bottom', 100+'px')
            back_coral_1.style.setProperty('bottom', 350+'px')
            back_kelp_3.style.setProperty('bottom', 100+'px')
            back_kelp_2.style.setProperty('bottom', 100+'px')
            back_kelp_1.style.setProperty('bottom', 150+'px')
          }
          
        }
        if(pageid == '.scene-8'){
          let frontback = document.querySelector('.frontback')
          frontback.style.setProperty('bottom', 0+'px')
          let boulder = document.querySelector('.boulder')
          boulder.style.setProperty('bottom', 0+'px')
        }
      }
    }

    
  }

  const fishs = [
    {
      fishid: 1,
      fish_pic: "../asset/fish/pic/fish_pic1.png",
      fish_data: "../asset/fish/data/fish_data1.png",
    },
    {
      fishid: 2,
      fish_pic: "../asset/fish/pic/fish_pic2.png",
      fish_data: "../asset/fish/data/fish_data2.png",
    },
    {
      fishid: 3,
      fish_pic: "../asset/fish/pic/fish_pic3.png",
      fish_data: "../asset/fish/data/fish_data3.png",
    },
    {
      fishid: 4,
      fish_pic: "../asset/fish/pic/fish_pic4.png",
      fish_data: "../asset/fish/data/fish_data4.png",
    },
    {
      fishid: 5,
      fish_pic: "../asset/fish/pic/fish_pic5.png",
      fish_data: "../asset/fish/data/fish_data5.png",
    },
    {
      fishid: 6,
      fish_pic: "../asset/fish/pic/fish_pic6.png",
      fish_data: "../asset/fish/data/fish_data6.png",
    },
    {
      fishid: 7,
      fish_pic: "../asset/fish/pic/fish_pic7.png",
      fish_data: "../asset/fish/data/fish_data7.png",
    },
    {
      fishid: 8,
      fish_pic: "../asset/fish/pic/fish_pic8.png",
      fish_data: "../asset/fish/data/fish_data8.png",
    },
    {
      fishid: 9,
      fish_pic: "../asset/fish/pic/fish_pic9.png",
      fish_data: "../asset/fish/data/fish_data9.png",
    },
    {
      fishid: 10,
      fish_pic: "../asset/fish/pic/fish_pic10.png",
      fish_data: "../asset/fish/data/fish_data10.png",
    },
    {
      fishid: 11,
      fish_pic: "../asset/fish/pic/fish_pic11.png",
      fish_data: "../asset/fish/data/fish_data11.png",
    },
    {
      fishid: 12,
      fish_pic: "../asset/fish/pic/fish_pic12.png",
      fish_data: "../asset/fish/data/fish_data12.png",
    },
    {
      fishid: 13,
      fish_pic: "../asset/fish/pic/fish_pic13.png",
      fish_data: "../asset/fish/data/fish_data13.png",
    },
  ];

  // show buble fish
  const bubbles = document.querySelectorAll(".fish");
  let text = "";
  let count = 0;
  for (let fish of fishs) {
    text = `<img src="${fish.fish_pic}"><div class="moreinfo"><img src="../asset/moreinfo.png"></div>`;
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
  let numfishDown = 12;
  let availableOffset = fishgal.scrollWidth - fishgal.clientWidth;

  function chackAddFish() {
    //ดึงหน้ามาต่อท้าย ถ้าเหลือน้้อยกว่า 1000px
    if (fishgal.scrollLeft > fishgal.clientWidth - 1000) {
      elementToCut = bubbles[numfishPlus % 13];
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
    if (nextFishNumber == 14) {
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
      prevFishNumber = 13;
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

  function scaleCenterBubble() {
    var elem = document.elementFromPoint(
      $(window).width() / 2,
      $(window).height() / 2
    );
    var centerElem = $(elem);
    // centerElem.style.width = "scale(1.1)";
    // console.log(centerElem)
  }

  function page4to5() {
    clearInterval(autoScroll); //หยุดลูป
    let action = document
      .getElementById("page5")
      .scrollIntoView({ block: "end" });
    let between = document.querySelector(".p5");
    between.style.top = "-60%";
  }