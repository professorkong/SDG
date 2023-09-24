
function delayScroll(next){
    $('html, body').animate({
        scrollTop: $('#'+next).offset().top
      }, 1000);

    //   แค่ delay ทำหน่วงไงว้า
}