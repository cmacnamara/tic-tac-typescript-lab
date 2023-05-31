/*-------------------- Constants ---------------------------- */
const winningCombos: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

/*-------------------- Variables ---------------------------- */
let board: number[], turn: number, winner: boolean, tie: boolean

/*--------------- Cached Element References ------------------ */
const squareEls = document.querySelectorAll<HTMLDivElement>('.sqr')
const messageEl = document.getElementById('message') as HTMLHeadingElement
const resetBtnEl = document.querySelector<HTMLButtonElement>('button')!

/*-------------------- Event Listeners ----------------------- */
document.querySelector<HTMLDivElement>('.board')?.addEventListener('click', handleClick)
resetBtnEl?.addEventListener('click', init)

/*-------------------- Functions ----------------------- */

init()

function init(): void {
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  turn = 1
  winner = false
  tie = false
  render()
}

function placePiece(idx: number): void {
  board[idx] = turn
}

function handleClick(evt: MouseEvent): void {
  if(!evt.target || !('id' in evt.target)) return
  
  const target = evt.target as HTMLDivElement

  
  
  const sqIdx: number = parseInt(target.id.replace('sq', ''))
  console.log('Board at sqIdx', board[sqIdx]);

  if(isNaN(sqIdx) || board[sqIdx] || winner) return
  placePiece(sqIdx)
  checkForTie()
  checkForWinner()
  switchPlayerTurn()
  render()
}

function checkForTie(): void {
  if(board.includes(0)) return
  tie = true
}

function checkForWinner(): void {
  winningCombos.forEach(combo => {
    if(Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]]) === 3) {
      winner = true
    }
  })
}

function switchPlayerTurn(): void {
  if (winner) return
  turn *= -1
}

function render(): void {
  updateBoard()
  updateMessage()
}

function updateBoard(): void {
  board.forEach((boardVal, idx) => {
    if (boardVal === 1) {
      squareEls[idx].textContent = 'X'
    } else if (boardVal === -1) {
      squareEls[idx].textContent = 'O'
    } else {
      squareEls[idx].textContent = ''
    }
  })
}

function updateMessage() {
  if (!winner && !tie) {
    messageEl.textContent = `It's ${turn === 1 ? 'X' : 'O'}'s turn!`
  } else if (!winner && tie) {
    messageEl.textContent = "Cat's game! Meow!!!"
  } else {
    messageEl.textContent = `Congratulations! ${turn === 1 ? 'X' : 'O'} wins! `
  }
}