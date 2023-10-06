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
console.log(bubbles);
let text = "";
let count = 0;
for (let fish of fishs) {
  text = `<img src="${fish.fish_pic}"><div class="moreinfo"><img src="../asset/abc/moreinfo.png"></div>`;
  console.log(text);
  bubbles[count].innerHTML = text;
  count++;
}