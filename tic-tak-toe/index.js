
let currentPlayer = 'X';
let cells = document.querySelectorAll(".cell");
let isWin = false;

function makeMove(index){
    if (isWin){
        alert("You need to reset to play further");
        return ;
    }
    if (cells[index].innerHTML){
        return ;
    }

    cells[index].innerHTML = currentPlayer;
    currentPlayer = currentPlayer === "X"?"O":"X";
    isWinnerCheck();
}

function checkEqualOrNot(arr){
    if (cells[arr[0]].innerHTML === cells[arr[1]].innerHTML && 
        cells[arr[1]].innerHTML === cells[arr[2]].innerHTML && 
        cells[arr[2]].innerHTML !== ""
    )
        return true;
    return false;
}

/*

0 1 2
3 4 5
6 7 8

*/

function isWinnerCheck(){
    // we have 8 winning possibilities
    const winningSets = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8],
        [0, 3, 6], 
        [1, 4, 7], 
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 5]
    ];
    // now need to check, if the character is same or not in any one of these position
    for (let i=0 ;i<winningSets.length; i++){
        if (checkEqualOrNot(winningSets[i])){
            isWin = true;
            let winnerName = cells[winningSets[i][0]].innerHTML === "X"?"First player win":"Second Player win";
            document.querySelector("h2").innerHTML = winnerName;
            return ;
        }
    }
}

function resetGame(){
    currentPlayer = 'X';
    isWin = false;
    cells.forEach((cell)=>{
        cell.addEventListener("click",makeMove);
        cell.innerHTML = null;
    })
    document.querySelector("h2").innerHTML = "";
}
