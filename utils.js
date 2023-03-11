function animatePress(id){
    ele = document.getElementById(id)
    ele.style.opacity = 0.4;
    setTimeout(() => { ele.style.opacity = 1}, 200);
}
function playSound(name="sound"){
    let audio = new Audio(`${name}.mp3`);
    audio.play();
}

function timer(){
    time+=1
    document.getElementById("timer").innerHTML = `<span>Time: ${time} </span>`
}

function displayHigh(){
    if(localStorage.getItem(`highest_${n}`)){
        let arr = localStorage.getItem(`highest_${n}`).split("__ __");
        document.getElementById("high").innerHTML = `<h3>${arr[0]} - ${arr[1]}  <br>time : ${arr[2]}sec</h3>`
    }else document.getElementById("high").innerHTML = `<h3>No score yet</h3>`
}
function createBtn(){
    n = prompt("Enter grit count:");
    while (!/^[2-6]+$/.test(n)) {
        alert("Enter number between 2-6");
        n = prompt("Enter grit count:");
    }
    n=parseInt(n)
    !isMulti && displayHigh();
    for(let i=0;i<n;i++){
        let row = document.createElement('div');
        row.classList.add("row")
        for(let j=0;j<n;j++){
          var button = document.createElement('div')
          button.setAttribute('class', 'btn')
          button.setAttribute('type', 'button')
          button.setAttribute('id',`${i}${j}`)
          row.appendChild(button);
          // console.log(button)
        }
        let container = document.getElementsByClassName("container")[0]
        container.appendChild(row);
    }
    let btn= document.getElementsByClassName('btn')
    for(let i=0;i<btn.length;i++){
        buttonColurs.push(btn[i].id)
        // console.log(btn[i].id)
    }
}
