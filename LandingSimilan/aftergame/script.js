document.body.dataset.h = window.innerHeight;
document.addEventListener('scroll', setBodyScrollPosition)
document.addEventListener('scroll', setElementMove)
function setBodyScrollPosition(){
    document.body.dataset.y = window.scrollY;
    console.log(window.scrollY)
}

function setElementMove(){
    
    document.body.dataset.h = window.innerHeight;
    let y = document.body.dataset.y
    let h = document.body.dataset.h
    //7
    let coralfront_7 = document.querySelector('.coralfront_7')
    let coralmid_7 = document.querySelector('.coralmid_7')
    let rockmid_7 = document.querySelector('.rockmid_7')
    let rockback_7 = document.querySelector('.rockback_7')
    let seaweedback_7 = document.querySelector('.seaweedback_7')
    let ct7 = document.querySelector('.ct7')
    let textpage7 = document.querySelector('.textpage7')

    //8
    let cloud1_8 = document.querySelector('.cloud1_8')
    let cloud2_8 = document.querySelector('.cloud2_8')
    let cloud3_8 = document.querySelector('.cloud3_8')
    let rock_8 = document.querySelector('.rock_8')

    if(y > 0){
        ct7.style.setProperty('height', h-y*0.5+'px') 
        textpage7.style.setProperty('opacity', 100-y*0.3 +'%')
        
        cloud1_8.style.setProperty('--ct1', -7+y*0.07 + "%")
        cloud2_8.style.setProperty('--ct2', -22+y*0.05 + "%")
        cloud3_8.style.setProperty('--ct3', -17+y*0.05 + "%")
        console.log(y-(h-y*0.5))
        if ((y-(h-y*0.5)) >= -550){
            rock_8.style.setProperty('bottom', -1+(y-(h-y*0.5))*-0.08 + "%")
        }
        
        
    }
    
    
    else{
        ct7.style.setProperty('height', h+'px')  
        textpage7.style.setProperty('opacity', '1') 
    }
    coralmid_7.style.setProperty('--cm7', y*-0.05 + "%")
    rockmid_7.style.setProperty('--rm7', y*-0.065 + "%")
    rockback_7.style.setProperty('--rb7',18- y*-0.006 + "%")
    seaweedback_7.style.setProperty('--sb7',10+ y*-0.03 + "%")
    // coralfront_7.style.setProperty('--cf7', y*0.05 + "%")
}
setElementMove()