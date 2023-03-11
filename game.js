let buttonColurs=[]
var n
let score =1;
let gamePattern=[],userClickedPattern=[];
let gameOn=false
var userName;
var time =0;
let isMulti = 0,user1,user2,turn=1,mScore1=0,mTime1=0;
isMulti = prompt("Enter 0 for single player and 1 for multi player");
while (!/^[0-1]+$/.test(isMulti)) {
    alert("Enter number 0/1");
    isMulti = prompt("Enter 0 for single player and 1 for multi player");
}
isMulti=parseInt(isMulti);
createBtn()

// console.log(buttonColurs)
// document.createElement('button')

// console.log(userName)
function nextSequence(){
    
   let randomNumber =Math.floor(Math.random()*buttonColurs.length)
   let randomChosenColour= buttonColurs[randomNumber] 
   gamePattern.push(randomChosenColour)
   playSound();
   animatePress(randomChosenColour);
}


function handler(e){
    let userChosenColour = e.target.id;    
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour)
    checkPattern(userChosenColour)
}

function checkPattern(choice){
    if(userClickedPattern[userClickedPattern.length-1]== gamePattern[userClickedPattern.length-1]){
        playSound();
        if(userClickedPattern.length==gamePattern.length){
            score+=1
            userClickedPattern=[];
            document.getElementById("level-title").innerHTML=`Level ${score}`;
            setTimeout(() => { nextSequence()}, 1000);
        }
    }else{
        playSound("wrong");
        if(isMulti){
            if(turn==1){
                mScore1=score;
                mTime1=time;
                reset(turn);
                turn=2;
            }else{
                if(score>mScore1) document.getElementById("level-title").innerHTML=`${user2} Wins the Match`;
                else if(score<mScore1) document.getElementById("level-title").innerHTML=`${user1} Wins the Match`;
                else if(score==mScore1 ) document.getElementById("level-title").innerHTML=`Match Tie`;
                turn=0
                reset(turn);
            }
            // multiSpecial();
            if(turn) setTimeout(nextSequence,2000);
        }else{
            let isHighest= storeScore();
            document.getElementById("level-title").innerHTML=`Game Over <br> You  reached level ${score} <br>
            press any key to restart`;
            if(isHighest){
                document.getElementById("level-title").innerHTML +=`<br> <span class="win"> Highest Score Ever!!! </span>`;
            }
            reset()
        }
  

    }
}
document.addEventListener("keypress",startGame)
function startGame(){
    if(!gameOn){
        gameOn=true;
        if(isMulti){
            document.getElementById("high").innerHTML= `<span class=mulText></>Multiplayer <br> Mode<\span>`;
            document.getElementById("timer").innerHTML=``;
            user1=prompt("Enter name of player1");
            user2=prompt("Enter name of player2");
            if(!user1)user1="Anonymous1";
            if(!user2)user2="Anonymous2";
            document.getElementById("multi").innerHTML=`<h1>${user1}</h1>`;
        }else{
            userName=prompt("Enter Your Name");  
            if(!userName)userName="Anonymous";
            let x=setInterval(function (){
                timer()
                if (!gameOn) {
                    time=0
                    clearInterval(x);
                }
            },1000)    
        }
              document.getElementById("level-title").innerHTML=`Level ${score}`;
            btns = document.getElementsByClassName("btn");
            for(let i=0;i<btns.length;i++){
                btns[i].addEventListener("click", handler);
            }
            
            setTimeout(() => { nextSequence()}, 500);
    }
}
function reset(multi=false){
    // document.getElementById("level-title").innerHTML=`Level ${score}`;
    // console.log(turn)
    if(!multi){
        btns = document.getElementsByClassName("btn");
        for(let i=0;i<btns.length;i++){
            btns[i].removeEventListener("click", handler);
        }
        if(turn==0)document.getElementById("multi").innerHTML="";
    }else{
        if(turn==1) document.getElementById("multi").innerHTML=`<h1>${user2}</h1>`;
        
    }
    score=1;
    gamePattern=[];
    userClickedPattern=[];
    gameOn=false;
}
function storeScore(){
    let hScore=localStorage.getItem(`highest_${n}`)
    let highScore= hScore ? parseInt(hScore.split("__ __")[1]) : 0
    let lowTime = hScore ? parseInt(hScore.split("__ __")[2]) : 0
      if((highScore<score|| (highScore==score && lowTime> time))|| !hScore){
        localStorage.setItem(`highest_${n}`,`${userName}__ __${score}__ __${time} `)
        displayHigh();
        return true
      }
    return false
}

