import { useState, useRef } from "react";
import Box from "../components/Box";
import { getPossiblePawnMoves, getPossibleRookMoves, getPossibleBishopMoves, getPossibleKnightMoves, getPossibleKingMoves, getPossibleQueenMoves } from "./moves";
import { FindAGivenPeice, GetAllPossibleMovesForTeam, IsMoveArrayInGivenArray, PeiceAtGivenPosition, DetermineTargetingPeiceCausingCheck, ValidMoveCheckForCheck } from "./Utilities";

const Home = () => {
  const [selected, setSelected] = useState({
    peice: "",
    team: "",
    row: -1,
    col: -1,
  });

  const [isFlashing, setIsFlashing] = useState<boolean>(false);

  const possibleMoves = useRef<number[][]>([]);
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
  const [playingBoard, setPlayingBoard] = useState<string[][]>([
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
  const whiteCheck = useRef<boolean>(false);
  const blackCheck = useRef<boolean>(false); 

  const HandleTurnChange = (newBoard: Array<string[]>) =>{
    console.log("handling turn change")
        setPlayingBoard(newBoard); //update board with new board copy, rerender board and rerender the entire component
        setSelected({ peice: "", team: "", row: -1, col: -1 });
        ClearHighlights();
        setTurn(!turn);
        TurnEndCheckForCheck(newBoard)
        CheckForMate(newBoard)
        return;
  }
  // Checks for initial check on the board
  const TurnEndCheckForCheck = (board: Array<string[]>) => {
    const whiteKingPosition = FindAGivenPeice(board, "wking");
    const blackKingPosition = FindAGivenPeice(board, "king");

    const allWhiteMoves: Array<number[]> = GetAllPossibleMovesForTeam(board, "white");
    const allBlackMoves: Array<number[]> = GetAllPossibleMovesForTeam(board, "black");


    if(blackKingPosition){
      let check = IsMoveArrayInGivenArray(blackKingPosition, allWhiteMoves); //check if the black king is in the white team moves array after a turn
      blackCheck.current = check;
      console.log('setting black as: ', check)
      if(check == true){
        HandleFlash();
      }
    }
    if(whiteKingPosition){
      let check = IsMoveArrayInGivenArray(whiteKingPosition, allBlackMoves);
      whiteCheck.current = check;
      console.log('setting white as: ', check)
      if(check == true){
        HandleFlash();
      }
    } 
  }
  const CheckForMate = (board: Array<string[]>) =>{
    //if next team king cannot make any moves and is in check, end the game
    // also need to account for blocking of other peices

    // so we need to run every single move and calculate the only possible moves someone can make,
    // so maybe in check, only return a possibleMoves array that will either
    // A. Move the king out of check
    // B. Block the king from being in check

    console.log('checking for checkmate')
    const whiteKingPosition = FindAGivenPeice(board, "wking");
    const blackKingPosition = FindAGivenPeice(board, "king");

    const allWhiteMoves = GetAllPossibleMovesForTeam(board, "white");
    const allBlackMoves = GetAllPossibleMovesForTeam(board, "black");

    if(blackCheck.current && blackKingPosition){
      const blackKingMoves = getPossibleKingMoves(blackKingPosition[0], blackKingPosition[1], "black", board)
      console.log('black king moves in check', blackKingMoves)
      // if blackKing moves comes back empty, and no other valid moves can be calculated to ensure no check, and black is in check, end the game

      //implement a calculation here to determine if any possible moves could block the king from being in check, what the f would that look like? 
      // maybe take the moves of the item putting the king in check, find the direction of its moves that is putting it in check, then check to see if any of your peices
      // can move into those array of squares to block?

      const targetingPeice = DetermineTargetingPeiceCausingCheck(board, "black", [blackKingPosition[0], blackKingPosition[1]])
      /*const canBlock = CanAPeiceBlockACheck(board, "black", targetingPeice);
      if(!canBlock){
        //end game
        console.log('game over add more stuff here later')
      }
        */
    }
    if(whiteCheck.current && whiteKingPosition){
      const whiteKingMoves = getPossibleKingMoves(whiteKingPosition[0], whiteKingPosition[1], "white", board);
      console.log('white king moves in check', whiteKingMoves)
    }

  }
  const ResetGame= () =>{
    if(!confirm){
      let button = document.getElementById("reset")
      if(button){
        button.innerText = "Confirm"
      }
      setConfirm(true)
    }else{
      setPlayingBoard(startingPositions)
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
          possibleMoves.current = getPossiblePawnMoves(row, col, team, playingBoard);
          break;
        case "wrook":
          possibleMoves.current = getPossibleRookMoves(row, col, team, playingBoard);
          break;
        case "wbishop":
          possibleMoves.current = getPossibleBishopMoves(row, col, team, playingBoard);
          break;
        case "wknight":
          possibleMoves.current = getPossibleKnightMoves(row, col, team, playingBoard);
          break;
        case "wking":
          possibleMoves.current = getPossibleKingMoves(row, col, team, playingBoard);
          break;
        case "wqueen":
          possibleMoves.current = getPossibleQueenMoves(row, col, team, playingBoard);
          break;
        case "pawn":
          possibleMoves.current = getPossiblePawnMoves(row, col, team, playingBoard);
          break;
        case "knight":
          possibleMoves.current = getPossibleKnightMoves(row, col, team, playingBoard);
          break;
        case "rook":
          possibleMoves.current = getPossibleRookMoves(row, col, team, playingBoard);
          break;
        case "bishop":
          possibleMoves.current = getPossibleBishopMoves(row, col, team, playingBoard);
          break;
        case "king":
          possibleMoves.current = getPossibleKingMoves(row, col, team, playingBoard);
          break;
        case "queen":
          possibleMoves.current = getPossibleQueenMoves(row, col, team, playingBoard);
          break;

      }
    
      if(!turn && !peice.startsWith("w")){
        return
      }
      if(turn && peice.startsWith("w")){
        return
      }

      setSelected({ peice, team, row, col });
      HighlightPossibleMoves(possibleMoves.current);

      return;
    } else if (selected.col === col && selected.row === row) {

      ClearHighlights();
      setSelected({ peice: "", team: "", row: -1, col: -1 })
      possibleMoves.current = [];
      return;

    }else if(selected.peice != "" && team != "" && selected.team != team) { 
      
      //check to see if the capture move is valid
      if (possibleMoves.current) {
        const isValidMove = possibleMoves.current.some(
          ([r, c]) => r === row && c === col && team != selected.team
        );
      if(isValidMove){
      
      const newBoard = playingBoard.map(row => [...row]);
      newBoard[row][col] = "";
      newBoard[selected.row][selected.col] = ""
      newBoard[row][col] = selected.peice


      //could in the future possibly refactor this repeated code down into its own module
      if(!turn && whiteCheck.current){
          //!turn means it is still white teams turn, so lets check to see if the move they just did will block the check for their king
          console.log("checking to see if white king in check after move")
          let result = ValidMoveCheckForCheck(newBoard, "black");
          console.log('simulating white result:', result);
          if(result){
            console.log("white king will still be in check after move: resetting")
            setPlayingBoard(playingBoard)
            setSelected({ peice: "", team: "", row: -1, col: -1 })
            ClearHighlights();
            HandleFlash();
            return;
          }
        }
        if(turn && blackCheck.current){
          console.log("checking to see if black king in check after move")
          let result = ValidMoveCheckForCheck(newBoard, "white");
          console.log('simulating black result:', result);
          if(result){
            console.log("black king will still be in check after move: resetting")
            setPlayingBoard(playingBoard)
            setSelected({ peice: "", team: "", row: -1, col: -1 })
            ClearHighlights();
            HandleFlash();
            return;
          }
        }
      
      HandleTurnChange(newBoard);
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
        const newBoard = playingBoard.map(row => [...row]); //create a copy of the board
        newBoard[row][col] = selected.peice; //copy the peice to the new board at the selected location
        newBoard[selected.row][selected.col] = ""; //remove the peice from the old location

        //now check the newboard to see iff a king is in check for the team and if it blocks the check for them, if it does not we do not update the board or flip the turn we just reset
        
        if(!turn && whiteCheck.current){
          //!turn means it is still white teams turn, so lets check to see if the move they just did will block the check for their king
          console.log("checking to see if white king in check after move")
          let result = ValidMoveCheckForCheck(newBoard, "black");
          console.log('simulating white result:', result);
          if(result){
            console.log("white king will still be in check after move: resetting")
            setPlayingBoard(playingBoard)
            setSelected({ peice: "", team: "", row: -1, col: -1 })
            ClearHighlights();
            HandleFlash();
            return;
          }
        }
        if(turn && blackCheck.current){
          console.log("checking to see if black king in check after move")
          let result = ValidMoveCheckForCheck(newBoard, "white");
          console.log('simulating black result:', result);
          if(result){
            console.log("black king will still be in check after move: resetting")
            setPlayingBoard(playingBoard)
            setSelected({ peice: "", team: "", row: -1, col: -1 })
            ClearHighlights();
            HandleFlash();
            return;
          }
        }

        HandleTurnChange(newBoard);
        

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
      const piece = playingBoard[i][j];
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


  const HandleFlash = () =>{
    setIsFlashing(true);
    setTimeout(() => {
      setIsFlashing(false);

    }, 500)
  }
  
  return (
    <div className="game">
      <div className="board-container">
        <div className="board-wood">
          <div className="board">{board}</div>
          <div className="info-bar">
            <button id="reset" className="reset-button" onClick={() => ResetGame()}>Reset</button>
            <div className="check-signal">
            {whiteCheck.current ? <p className={`check-warning ${isFlashing ? "flash" : ""}`}>White King In Check!</p> : <p></p>}
            {blackCheck.current ? <p className={`check-warning ${isFlashing ? "flash" : ""}`}>Black King In Check!</p> : <p></p>}
            </div>
            <p className="turn-indicator">Turn: {turn ? "Black" : "White"}</p>
          </div>
        </div>
     </div>
    </div>
  );
};

export default Home;
