import React, { useState, useEffect, useRef } from "react";
import Box from "../components/Box";
import { getPossiblePawnMoves, getPossibleRookMoves, getPossibleBishopMoves, getPossibleKnightMoves, getPossibleKingMoves, getPossibleQueenMoves } from "./moves";

const Home = () => {
  const [selected, setSelected] = useState({
    peice: "",
    team: "",
    row: -1,
    col: -1,
  });

  const possibleMoves = useRef<number[][]>([]);
  //const testMoves: number[][] = [];
  const startingPositions: Array<string[]>  = [
    ["rook", "knight", "bishop", "king", "queen", "bishop", "knight", "rook"],
    ["pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["wpawn", "wpawn", "wpawn", "wpawn", "wpawn", "wpawn", "wpawn", "wpawn"],
    ["wrook","wbishop","wbishop","wqueen","wking","wbishop","wknight","wrook",],
  ]

  //used as playing board, should rename this
  const [testboard, setTestBoard] = useState<string[][]>([
    ["rook", "knight", "bishop", "king", "queen", "bishop", "knight", "rook"],
    ["pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["wpawn", "wpawn", "wpawn", "wpawn", "wpawn", "wpawn", "wpawn", "wpawn"],
    ["wrook","wbishop","wbishop","wqueen","wking","wbishop","wknight","wrook",],
  ]);

  const [turn, setTurn] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);

  const ResetGame= () =>{
    if(!confirm){
      let button = document.getElementById("reset")
      if(button){
        button.innerText = "Confirm"
      }
      setConfirm(true)
    }else{
      setTestBoard(startingPositions)
      setConfirm(false)
      setTurn(false)
      let button = document.getElementById("reset")
      if(button){
      button.innerText = "Reset"
      }
    }
    
  }
  const handleOnClick = (
    peice: string,
    team: string,
    row: number,
    col: number
  ) => {
    
    if (selected.peice == "" && selected.team == "") {
      switch (peice){
        case "wpawn":
          possibleMoves.current = getPossiblePawnMoves(row, col, team, testboard);
          break;
        case "wrook":
          possibleMoves.current = getPossibleRookMoves(row, col, team, testboard);
          break;
        case "wbishop":
          possibleMoves.current = getPossibleBishopMoves(row, col, team, testboard);
          break;
        case "wknight":
          possibleMoves.current = getPossibleKnightMoves(row, col, team, testboard);
          break;
        case "wking":
          possibleMoves.current = getPossibleKingMoves(row, col, team, testboard);
          break;
        case "wqueen":
          possibleMoves.current = getPossibleQueenMoves(row, col, team, testboard);
          break;
        case "pawn":
          possibleMoves.current = getPossiblePawnMoves(row, col, team, testboard);
          break;
        case "knight":
          possibleMoves.current = getPossibleKnightMoves(row, col, team, testboard);
          break;
        case "rook":
          possibleMoves.current = getPossibleRookMoves(row, col, team, testboard);
          break;
        case "bishop":
          possibleMoves.current = getPossibleBishopMoves(row, col, team, testboard);
          break;
        case "king":
          possibleMoves.current = getPossibleKingMoves(row, col, team, testboard);
          break;
        case "queen":
          possibleMoves.current = getPossibleQueenMoves(row, col, team, testboard);
          break;

      }
    
      if(!turn && !peice.startsWith("w")){
        return
      }
      if(turn && peice.startsWith("w")){
        return
      }

      setSelected({ peice, team, row, col });
      console.log(selected)
      //highlight the possible moves here
      console.log(possibleMoves.current);
    
      HighlightPossibleMoves(possibleMoves.current);
      return;
    } else if (selected.col === col && selected.row === row) {
      ClearHighlights();
        setSelected({ peice: "", team: "", row: -1, col: -1 })
    }else if(selected.peice != "" && team != "" && selected.team != team) { 
      //handle capturing a peice
      console.log('capture', peice, team, row, col)
      console.log('capturer', selected.peice, selected.team, selected.row, selected.col)
      
      //check to see if the capture move is valid
      if (possibleMoves.current) {
        const isValidMove = possibleMoves.current.some(
          ([r, c]) => r === row && c === col && team != selected.team
        );
      if(isValidMove){
      
      const newBoard = [...testboard];
      newBoard[row][col] = "";
      newBoard[selected.row][selected.col] = ""
      newBoard[row][col] = selected.peice
      
      setTestBoard(newBoard);
      setSelected({peice: "", team: "", row: -1, col: -1})
      ClearHighlights();
      
      setTurn(!turn);
      } }
    }else{
      //if something is selected this will run down here
      let check = false;      
        possibleMoves.current.forEach((e) => {
          if(e[0] == row && e[1] == col){
            console.log('good move');
            check = true;
          }
          }
        )
        if(check){
        const newBoard = [...testboard]; //create a copy of the board
        newBoard[row][col] = selected.peice; //copy the peice to the new board at the selected location
        newBoard[selected.row][selected.col] = ""; //remove the peice from the old location
        setTestBoard(newBoard); //update board with new board copy, rerender board and rerender the entire component
        setSelected({ peice: "", team: "", row: -1, col: -1 });
        ClearHighlights();
        setTurn(!turn);
        }else{
          console.log('bad move')
          return;
        }

    }
  };

  const HighlightPossibleMoves = (moves: number[][]) => {
    console.log(moves);
    moves.forEach(([row, col]) => {
      const cell = document.getElementById(`${row}, ${col}`);
      if (cell) {
        cell.style.backgroundColor = 'red';
      }
    });
  };

  const ClearHighlights = () => {
    const cells = document.querySelectorAll("div[class*='box']");
    console.log(cells);
    cells.forEach((cell) => {
      (cell as HTMLElement).style.backgroundColor = '#f0f0f0';
    });
    possibleMoves.current = [];
  };

  //every peice needs a unique id probably
  //highlight a piece when clicked

  let board = [];
  for (let i = 0; i < 8; i++) {
    let row = [];
    for (let j = 0; j < 8; j++) {
      const piece = testboard[i][j];
      if (piece) {
        const team = piece.startsWith("w") ? "white" : "black";
        const pieceType = piece;
        row.push(
          <Box
          row={i}
          col={j}
            key={`${i}-${j}`}
            peice={pieceType}
            team={team}
            onClick={() => handleOnClick(pieceType, team, i, j)}
            isSelected={selected.row === i && selected.col === j}
          />
        );
      } else {
        row.push(
          <Box
          row={i}
          col={j}
            key={`${i}-${j}`}
            peice=""
            team=""
            onClick={() => handleOnClick("", "", i, j)}
            isSelected={selected.row === i && selected.col === j}
          />
        );
      }
    }
    board.push(
      <div key={i} className="row">
        {row}
      </div>
    );
  }

  return (
    <div className="game">
     <div className="board">{board}</div>
     <button id="reset" onClick={() => ResetGame()}>Reset</button>
     <p>Turn: {turn ? "Black" : "White"}</p>
</div>
  );
};

export default Home;
