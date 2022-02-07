const checkbox = document.querySelector('.checkbox');
const section = document.querySelector('section')
const frontCard = document.querySelector('.front')
const backCard = document.querySelector('.back')

console.log(checkbox)
console.log(section)

function checkChecked(){
    if(checkbox.checked == true){
        //frontCard.style.transform = "rotateY(180deg)"
        // backCard.style.transform = "rotateY(180deg)"
        section.style.transform = "rotateY(180deg)"
        //frontCard.style.opacity = "0"
        console.log("check")
    } else {
        section.style.transform = "rotateY(0deg)"
        //frontCard.style.opacity = "1"
        console.log("nothing")
    }
}

// checkChecked();

checkbox.addEventListener("click", checkChecked)