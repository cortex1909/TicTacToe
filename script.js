const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const cells = document.querySelectorAll('[data-cell]')
const hiddenMessage = document.querySelector('[data-winning-message]')
const hiddenMessageElement = document.getElementById('hiddenMessage')
const restartButton = document.getElementById('restartButton')
let circleTurn

const WINNER_COMBO = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
]

let handleClick = (e) => {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if(checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
    switchTurns()
    }
}

let endGame = (draw) => {
    if(draw) {
        hiddenMessage.innerText = `It's a DRAW!`
    } else {
        hiddenMessage.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    hiddenMessageElement.classList.add('show')
}

let isDraw = () => {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

let startGame = () => {
    circleTurn = false
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once:true })
    })
    hiddenMessageElement.classList.remove('show')
}

let placeMark = (cell, currentClass) => {
    cell.classList.add(currentClass)
}

let switchTurns = () => {
    circleTurn = !circleTurn
}

let checkWin = (currentClass) => {
    return WINNER_COMBO.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass)
        })
    })
}

restartButton.addEventListener('click', startGame)


startGame()