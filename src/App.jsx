import confetti from 'canvas-confetti';

import './App.css';
import { Square } from './components/Square.jsx';
import { useState } from 'react';

import { TURNS } from './constants.js';
import { checkWinnerFor, checkEndGameFor } from './logic/board.js';
import { WinnerModal } from './components/WinnerModal.jsx';
import { resetGameStorage, saveGameStorage } from './logic/storage.js';

function App() {
  const [board, setBoard] = useState(()=>{
    const boardFromStorage = window.localStorage.getItem('board');
    if (boardFromStorage) return JSON.parse(boardFromStorage);    
    return Array(9).fill(null);
  });
  const [turn, setTurn] = useState(()=>{
    const turnFromStorage = window.localStorage.getItem('turn');
    if (turnFromStorage) return JSON.parse(turnFromStorage);    
    return TURNS.X;
  });  
  const [winner, setWinner] = useState(null); // null: no winner, false: tie, true: winner

  const updateBoard = (index)=>{
    // if not available or winner return
    if(board[index] || winner) return;
        
    // updates board
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // handles turns
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // saves game
    saveGameStorage({board: newBoard, turn: newTurn});
    
    // check for winner
    const newWinner = checkWinnerFor(newBoard);
    if (newWinner){
      confetti();
      setWinner(newWinner);
    }
    
    // game ends if winner detected
    if(newWinner) return;

    if(checkEndGameFor(newBoard)){
      setWinner(false);
    }
    
  }

  const resetGame = ()=>{
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    resetGameStorage();
  }

  return (
    <>
    {winner}
      <main className="board">
        <h1>Tic Tac Toe</h1>
        <section className="game">
          {
            board.map((square, index)=>{
              return (
                <div className="cell" key={index}>
                  <Square key={index} index={index} updateBoard={updateBoard}>
                    {square}
                  </Square>
                </div>
              )
            })
          }
        </section>
        <section className="turn">
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>

        <button onClick={resetGame}>Restart game</button>
        {
          <WinnerModal resetGame={resetGame}>{winner}</WinnerModal>
        }
      </main>
    </>
  )
}

export default App
