import { useEffect, useState } from "react"
import confetti  from 'canvas-confetti'

import { TURNS } from "./constants.js"
import { checkWinnerFrom, checkEndGame } from "./logic/board.js"
import { WinnerModal } from "./components/WinnerModal.jsx"
import { GameBoard } from "./components/GameBoard.jsx"
import { Counter } from "./components/Counter.jsx"
import { saveGameToStorage, resetGameStorage } from "./logic/storage/index.js"
import ResetButton from "./components/ResetButton.jsx"
import LoadingBar from "./components/LoadingBar.jsx"
import './variables.css';




function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage) 
      return Array(9).fill(null)
  }
)
  
  const [turn, setTurn] = useState(() => {
    const  turnFormStorage = window.localStorage.getItem('turn')
    return  turnFormStorage ?? TURNS.X
  }
)
    
  const [winner, setWinner] = useState(null) //null es que no hay ganador, false que hay empate
  
  //reseteamos el juego
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  const updateBoard = (index) => {
    //no actualizamos si tiene algo
    if (board[index] || winner) return
    
    //actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    
    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    

    // revisar si hay  ganador
    const newWinner =  checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if(
      checkEndGame(newBoard))
      {
        setWinner(false) // empate
      }
    }

  useEffect(() => {
    // guardar partida
    saveGameToStorage({
        board,
        turn
      })
  }, [turn, board]);

  useEffect(() => {
    const logoDiv = document.querySelector(".logoImg");
    setTimeout(() => {
      logoDiv.classList.add("shrink");
    }, 1000); // Cambia después de 1 segundo
  }, []);

  
  return (
    <main className="board">

      <div className="logoImg">
        <img src="https://i.ibb.co/5cy32w1/3enraya.png" alt="logo"/>

        <LoadingBar />

      </div>
      
      <GameBoard board={board} updateBoard={updateBoard} />

      <Counter turn={turn} TURNS={TURNS} />
      
      <WinnerModal resetGame={resetGame} winner={winner} />

      <div 
        onClick={board.every(cell => cell === null) ? null : resetGame}  
        className={`btn--reset ${board.every(cell => cell === null) ? 'disabled' : ''}`}
        disabled={board.every(cell => cell === null)}>
        <ResetButton />
      </div>
    </main>
    
  )
}

export default App
