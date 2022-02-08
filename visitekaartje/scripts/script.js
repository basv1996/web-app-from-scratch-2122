const checkbox = document.querySelector('.checkbox');
const section = document.querySelector('section')
const frontCard = document.querySelector('.front')
const backCard = document.querySelector('.back')

console.log(checkbox)
console.log(section)

function checkChecked(){
    if(checkbox.checked == true){
        section.style.transform = "rotateY(180deg)"
        console.log("check")
    } else {
        section.style.transform = "rotateY(0deg)"
        console.log("nothing")
    }
}

checkbox.addEventListener("click", checkChecked)