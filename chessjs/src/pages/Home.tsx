import React, { useState, useEffect, useRef } from "react";
import Box from "../components/Box";
import { getPossiblePawnMoves, getPossibleRookMoves, getPossibleBishopMoves, getPossibleKnightMoves, getPossibleKingMoves, getPossibleQueenMoves } from "./moves";
import { FindAGivenPeice, GetAllPossibleMovesForTeam, IsMoveArrayInGivenArray } from "./Utilities";

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
    ["wrook","wknight","wbishop","wqueen","wking","wbishop","wknight","wrook",],
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
    ["wrook","wknight","wbishop","wqueen","wking","wbishop","wknight","wrook",],
  ]);

  //false = white turn
  //true = black turn
  const [turn, setTurn] = useState<boolean>(false);

  //used to confirm board reset
  const [confirm, setConfirm] = useState<boolean>(false);

  //track the checks of kings
  const [whiteCheck, setWhiteCheck] = useState<boolean>(false); // tracks the state of check for white team
  const [blackCheck, setBlackCheck] = useState<boolean>(false); 


  const CheckForCheck = (board: Array<string[]>, team: boolean) => {
    //get the king position, get all moves for all other peices and check against it
    // do not allow for a move that wont get the king out of check
    
    //highlight king
    //highlight checking peice
    console.log(team);
    let kingString;
    if(team){
      kingString = 'wking'
    }else{
      kingString = 'king'
    }
    console.log(kingString)


    const kingPosition = FindAGivenPeice(board, kingString);
    console.log(`king position for team: ${team ? "white" : "black"}, ${kingPosition}` )
    //now that we have the other team kings position that is about to go, we need to check to see if any of the moves
    // of the team that just went threaten the king on the next turn

    //get all possible moves for the team that just went
    let movesArray: Array<number[]> = GetAllPossibleMovesForTeam(board, (team ? "black" : "white"))

    //check to see if king position of the other team is in the moves just gotten

    if(kingPosition){
      let check = IsMoveArrayInGivenArray(kingPosition, movesArray)
      console.log(movesArray)
      console.log('a peice is in check: ', check)
      if(!team){
        setBlackCheck(check)
      }else{
        setWhiteCheck(check)
      }
    }
    movesArray = [];
    console.log(movesArray)
  }
  const CheckForMate = (board: Array<string[]>, team: string) =>{
    //if king cannot make any moves and is in check, end the game
  }
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
      CheckForCheck(newBoard, turn);
      CheckForMate(newBoard, team);
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
        //need to check for check or checkmate here
        CheckForCheck(newBoard, turn)
        

        }else{
          console.log('bad move')
          return;
        }

    }
  };
  // Store original background colors in a Map
  const originalBgColors = useRef<Map<string, string>>(new Map());

  const HighlightPossibleMoves = (moves: number[][]) => {
    moves.forEach(([row, col]) => {
      const cell = document.getElementById(`${row}, ${col}`);
      if (cell) {
        // Save original background color if not already saved
        if (!originalBgColors.current.has(`${row},${col}`)) {
          originalBgColors.current.set(`${row},${col}`, cell.style.backgroundColor);
        }
        cell.style.backgroundColor = 'red';
      }
    });
  };

  const ClearHighlights = () => {
    originalBgColors.current.forEach((color, key) => {
      const cell = document.getElementById(key.replace(',', ', '));
      if (cell) {
        cell.style.backgroundColor = color;
      }
    });
    originalBgColors.current.clear();
    possibleMoves.current = [];
  };

  //every peice needs a unique id probably
  //highlight a piece when clicked

  let board = [];
  let boxColor = false;
  for (let i = 0; i < 8; i++) {
    let row = [];
    for (let j = 0; j < 8; j++) {
      //track board color as well
      boxColor = !boxColor;
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
            boxColor={boxColor}
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
            boxColor={boxColor}
          />
        );
      }
    }
    boxColor = !boxColor;
    board.push(
      <div key={i} className="row">
        {row}
      </div>
    );
  }

  return (
    <div className="game">
      <div className="board-container">
        <div className="board-wood">
          <div className="board">{board}</div>
          <div className="info-bar">
            <button id="reset" className="reset-button" onClick={() => ResetGame()}>Reset</button>
            {whiteCheck ? <p>White King In Check!</p> : <p></p>}
            {blackCheck ? <p>Black King In Check!</p> : <p></p>}
            <p className="turn-indicator">Turn: {turn ? "Black" : "White"}</p>
          </div>
        </div>
     </div>
    </div>
  );
};

export default Home;
