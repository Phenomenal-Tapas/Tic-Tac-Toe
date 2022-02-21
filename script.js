// selecting all required elements:-
const selectBox = document.querySelector(".select-box");
selectXBtn = selectBox.querySelector(".playerX");
selectOBtn = selectBox.querySelector(".playerO");
playBoard = document.querySelector(".playboard");
allBox = document.querySelectorAll("section span");
players = document.querySelector(".players");
resultBox = document.querySelector(".result-box");
wonText = resultBox.querySelector(".won-text");
replayBtn = resultBox.querySelector("button");

// once window loaded:-
window.onload = () => {

    // add onclick attribute in all avaiable section's span
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)");
        
    } 

    selectXBtn.onclick = () => {
        // hide the select box on playerX button clicked
        selectBox.classList.add("hide");

        // show the playboard on playerX button clicked
        playBoard.classList.add("show");
    }

    selectOBtn.onclick = () => {
        // hide the select box on playerO button clicked
        selectBox.classList.add("hide");

        // show the playboard on playerO button clicked
        playBoard.classList.add("show");

        players.setAttribute("class", "players active player");
    }
}

let playerXIcon = "fas fa-times" // class name of fontawesome cross icon
let playerOIcon = "far fa-circle" // class name of fontawesome circle icon
let playerSign = "X" // suppose player will be X
let runBox = true;

// user click function:-
function clickedBox(element){
    // if players element has contains .player
    if(players.classList.contains("player")){
        // adding circle icon tag inside user clicked element
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.add("active");
        playerSign = "O";
        element.setAttribute("id", playerSign)
    }
    else{
        // adding cross icon tag inside user clicked element
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    
    // winner function calling
    selectWinner();
    playBoard.style.pointerEvents = "none";

    // once user select any box then that box can't be selected again
    element.style.pointerEvents = "none";

    // generating random time delay so box will delay randomly to select box
    let randomDelayTime = (Math.random() * 1000 + 200).toFixed();
    setTimeout(()=>{
        // calling box function
        box(runBox);
    }, randomDelayTime)
}

// box click function:-
function box(runBox){
    if(runBox){
        playerSign = "O";
    // creating empty array. we'll store unselected box index in this array
    let arr = [];
    for(let i = 0; i < allBox.length; i++){
        // if span has no any child element
        if(allBox[i].childElementCount == 0){
            // inserting unclicked or unselected boxes inside array
            arr.push(i);
        }
    }

    // getting random index from array so box will select
    let randomBox = arr[Math.floor(Math.random() * arr.length)];
    if(arr.length > 0){
        // if players element has contains .player
    if(players.classList.contains("player")){
        // adding cross icon tag inside user clicked element
        allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
        players.classList.remove("active");
        playerSign = "X";
        allBox[randomBox].setAttribute("id", playerSign);
    }
    else{
        // adding circle icon tag inside user clicked element
        allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.remove("active");
        allBox[randomBox].setAttribute("id", playerSign);
    }
    // winner function calling
    selectWinner();
   
    }
    allBox[randomBox].style.pointerEvents = "none";
    playBoard.style.pointerEvents = "auto";
    playerSign = "X";
    }
}

// select winner:-
function getClass(idname){ 
    // returning id name
    return document.querySelector(".box" + idname).id;
}

function checkClass(val1, val2, val3, sign){
    if(getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign){
        return true;
    }
}

function selectWinner(){
    // winner combinations
    if(checkClass(1, 2, 3, playerSign) || checkClass(4, 5, 6, playerSign) || checkClass(7, 8, 9, playerSign) || checkClass(1, 4, 7, playerSign) || checkClass(2, 5, 8, playerSign) || checkClass(3, 6, 9, playerSign) || checkClass(1, 5, 9, playerSign) || checkClass(3, 5, 7, playerSign)){
        runBox = false;
        box(runBox);
        setTimeout(() => {
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700);
        wonText.innerHTML = `Player <p>${playerSign}</p> won the game..!!`
    }
    else{
        if(getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != ""){
            runBox = false;
            box(runBox);
            setTimeout(() => {
                playBoard.classList.remove("show");
                resultBox.classList.add("show");
            }, 700);
            wonText.innerHTML = `Match Drawn..!!`
        }
    }
}

replayBtn.onclick = () => {
    window.location.reload();
}