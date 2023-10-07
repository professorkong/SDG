function scrollY(pageid){
    body = document.querySelector("body")
    page = document.querySelector(pageid)
    pageStat = page.getBoundingClientRect();
    
    let pos = body.style.top;
    if(pos.includes("px")){pos = parseInt(pos)} // แปลงเป็น int
    scrollToTop = parseInt((pageStat.bottom - 834) * -1 + pos) // + ต่อจาก top เดิม
  
    // frame animation
    let id = setInterval(frame, 0.1);
    console.log({pos, scrollToTop})
    function frame() {
      if (pos == scrollToTop || pos == scrollToTop-1) {
        console.log(body.style.top)
        clearInterval(id);
      } else {
        pos -= 2; 
        body.style.top = pos + 'px';
        
      }
    }
  }