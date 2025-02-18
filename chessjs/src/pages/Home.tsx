import React from 'react'
import Box from '../components/Box'
const Home = () => {
    let board = [];
    // assuming this will change, but for now just a simple 8x8 board
    for(let i = 0; i < 8; i++){
        let row = [];
        for(let j = 0; j < 8; j++){
            if (j % 2 == 0){
                row.push(<Box peice="pawn" team="black" canMoveTo={true}/>)
            }else{
                row.push(<Box peice="rook" team="white" canMoveTo={true}/>)
            }
        }
        board.push(row);
    }

    //event handlers, check if the clicked box has a peice,
    //iterate and find valid moves, highlight those boxes
    //if a valid move is clicked, move the peice to that box
    //check for checkmate, check for stalemate
    //check for pawn promotion
  return (
    <div className="board">
        <div className="row">
            {board[0]}
        </div>
        <div className="row">
            {board[1]}
        </div>
        <div className="row">
            {board[2]}
        </div>
        <div className="row">
            {board[3]}
        </div>
        <div className="row">
            {board[4]}
        </div>
        <div className="row">
            {board[5]}
        </div>
        <div className="row">
            {board[6]}
        </div>
        <div className="row">
            {board[7]}
        </div>
    
    </div>
  )
}

export default Home
