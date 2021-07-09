const menubarbtn= document.querySelector('.menubars');
const cancelbar= document.querySelector('.cancel');
const sidemenu= document.querySelector('.sidemenu');

menubarbtn.addEventListener('click',clickonbtm);

cancelbar.addEventListener('click', menucancelbtn);
function clickonbtm(){
    let  value=sidemenu.classList.contains('sidemenubar');
    if(!value){
        sidemenu.classList.add('sidemenubar');
        console.log(value);
    }
}

function menucancelbtn(){
    let  value=sidemenu.classList.contains('sidemenubar');
    if(value){
        sidemenu.classList.remove('sidemenubar');
        console.log(value);
    }

}

