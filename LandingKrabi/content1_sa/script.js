function delayScroll(next){
    $('html, body').animate({
        scrollTop: $('#'+next).offset().top
      }, 1000);
}

function scroll(next){
    console.log('inScroll')
    document.getElementById(next).scrollIntoView({behavior: "smooth"});
}