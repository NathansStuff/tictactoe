const xClass = 'x';
const circleClass = 'circle';
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board')
const winningMessage = document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
let circleTurn
const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

// Starts the Game
startGame()

// Sets the inital boardstate
function startGame() {
    circleTurn = false;

    cellElements.forEach(cell => {
        cell.classList.remove(xClass)
        cell.classList.remove(circleClass)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true });
    })  
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
};

// Runs on cell click events
function handleClick(e) {
    // check whose turn
    cell = e.target;
    const currentClass = circleTurn ? circleClass : xClass
    // place mark
    placeMark(cell, currentClass)
    // check win
    if (checkWin(currentClass)) {
        console.log('win')
        endGame(false)
    // check draw
    } else if (isDraw()) {
        endGame(true)
    }
    // switch turns
    swapTurns()
    setBoardHoverClass()
};

// places mark
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

// sets turn
function swapTurns() {
    circleTurn = !circleTurn
}

// swaps board x/o hover
function setBoardHoverClass() {
    board.classList.remove(xClass)
    board.classList.remove(circleClass)
    if (circleTurn) {
        board.classList.add(circleClass)

    } else {
        board.classList.add(xClass)
    }
}

// checks every cell for the current turns class, ie, x or circle
// if found, puts that cells index into a list
// for that list, compares it to see if any winning combinations list is met
function checkWin(currentClass) {
    return winningCombinations.some(combination => { 
        return combination.every(index => { 
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

// endgame
function endGame(draw) {
    if (draw) {
        winningMessage.innerText = 'Draw!'
    } else {
        winningMessage.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

// draw
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(circleClass)
    })
}

restartButton.addEventListener('click', startGame)