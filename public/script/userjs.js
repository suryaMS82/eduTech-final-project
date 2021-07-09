const userbtn= document.querySelector('.userprof');
const cancelbtn= document.querySelector('.cancel');
const sidemenubtn= document.querySelector('.sidemenu-user');
userbtn.addEventListener('click',clickonbtm);

cancelbtn.addEventListener('click', menucancelbtn);
function clickonbtm(){
    let  value=sidemenubtn.classList.contains('sidemenubar');
    if(!value){
        sidemenubtn.classList.add('sidemenubtn');
        console.log(value);
    }
}

function menucancelbtn(){
    let  value=sidemenubtn.classList.contains('sidemenubtn');
    if(value){
        sidemenubtn.classList.remove('sidemenubtn');
        console.log(value);
    }

}


const videobtn= document.querySelectorAll('.videos');

const squarebtn= document.querySelector('.square');


videobtn.forEach((btn)=> {
    btn.addEventListener('click',suarebtnclick);

    function  suarebtnclick(){
        var value = squarebtn.classList.contains('squarebtn');
        console.log(value);
        if(!value){
            squarebtn.classList.add('squarebtn');

        }
        
    }
})


