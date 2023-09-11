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

console.log("asdasfas")

var point = 0;
var time = 60;
var bin = ["bin1", "bin2", "bin3", "bin4", "bin5", "bin6", "bin7", "bin8", "bin9", "bin10", "bin11", "bin12"];

setInterval(main, 1000);

function main(){
    console.log("main___gogogo");
    time--;
    document.getElementById("time").innerHTML = '00:' + time;

    var item = Math.floor(Math.random() * 12);
    var posx = Math.floor(Math.random() * 1200);

    console.log(bin[item]);

    var node = document.getElementById(bin[item]);
    var clone = node.cloneNode(true);
    clone.style.translate = posx + "px " + "-200px";
    clone.style.visibility = "visible";
    document.getElementById("display").appendChild(clone);

}

function start() {

}

function collect(el){
    var bin = document.querySelector(bin);
    r.style.setProperty('--posy', '-1000px');
    point += 100;
    // el.style.visibility = "hidden";
    document.getElementById("display").removeChild(el);
    document.getElementById("point").innerHTML = point;
    console.log(point);

}

