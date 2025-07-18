import { useState, useRef } from "react";
import Box from "../components/Box";
import { getPossiblePawnMoves, getPossibleRookMoves, getPossibleBishopMoves, getPossibleKnightMoves, getPossibleKingMoves, getPossibleQueenMoves } from "../Utilities/moves";
import { FindAGivenPeice, GetAllPossibleMovesForTeam, IsMoveArrayInGivenArray, PeiceAtGivenPosition, ValidMoveCheckForCheck, GetAllPeicesForTeam, GetPossibleMovesForAPeiceAtAPosition, SimulateMovesFromAnArray } from "../Utilities/Utilities";

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
    
    ["", "", "", "", "", "", "", "king"],
    ["", "", "", "wpawn", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["queen", "", "", "", "", "", "", ""],
    ["", "", "", "wking", "wpawn", "", "queen", ""],
    ["queen", "", "", "", "", "", "", ""],
    ["","","","","","","","",],
  ]);

  //false = white turn
  //true = black turn
  const [turn, setTurn] = useState<boolean>(false);

  //used to confirm board reset
  const [confirm, setConfirm] = useState<boolean>(false);

  const [winner, setWinner] = useState<string>("");

  //track the checks of kings
  const whiteCheck = useRef<boolean>(false);
  const blackCheck = useRef<boolean>(false); 

  const [message, setMessage] = useState<string>("");

  const [pawnPromotion, setPawnPromotion] = useState<string>("");


  const HandlePromotion = (peiceType: string) => {
    if (pawnPromotion === "white") {
      const newBoard = playingBoard.map(row => [...row]);
      for (let i = 0; i < newBoard[0].length; i++) {
        if (newBoard[0][i] === "wpawn") {
          newBoard[0][i] = "w" + peiceType.toLowerCase();
        }
      }
      setPlayingBoard(newBoard);
      setPawnPromotion("");
    }
    if (pawnPromotion === "black") {
      const newBoard = playingBoard.map(row => [...row]);
      for (let i = 0; i < newBoard[7].length; i++) {
        if (newBoard[7][i] === "pawn") {
          newBoard[7][i] = peiceType.toLowerCase();
        }
      }
      setPlayingBoard(newBoard);
      setPawnPromotion("");
    }
  }
  const HandleTurnChange = (newBoard: Array<string[]>) =>{
        setPlayingBoard(newBoard); //update board with new board copy, rerender board and rerender the entire component
        setSelected({ peice: "", team: "", row: -1, col: -1 });
        ClearHighlights();
        setTurn(!turn);
        TurnEndCheckForPawnPromotion(newBoard);
        TurnEndCheckForCheck(newBoard)
        CheckForMate(newBoard, turn)
        setMessage("");
        return;
  }
  //TODO move these methods to their own file and use a context provider to provide state context to them and the board
  // would make code look a lot better

  
  const TurnEndCheckForPawnPromotion = (board: Array<string[]>) => {
    //check top board for white pawns
    console.log("cheacking for promotions")
    for(let i = 0; i < board.length; i ++){
      if(board[0][i] == "wpawn"){
        console.log(board[0][i])
        setPawnPromotion("white")
      }
      if(board[7][i] == "pawn"){
        setPawnPromotion("black")
      }
    }
    //check bottom board for black pawns
  }

  const TurnEndCheckForCheck = (board: Array<string[]>) => {
    const whiteKingPosition = FindAGivenPeice(board, "wking");
    const blackKingPosition = FindAGivenPeice(board, "king");

    const allWhiteMoves: Array<number[]> = GetAllPossibleMovesForTeam(board, "white");
    const allBlackMoves: Array<number[]> = GetAllPossibleMovesForTeam(board, "black");


    if(blackKingPosition){
      let check = IsMoveArrayInGivenArray(blackKingPosition, allWhiteMoves); //check if the black king is in the white team moves array after a turn
      blackCheck.current = check;
      if(check == true){
        HandleFlash();
      }
    }
    if(whiteKingPosition){
      let check = IsMoveArrayInGivenArray(whiteKingPosition, allBlackMoves);
      whiteCheck.current = check;
      if(check == true){
        HandleFlash();
      }
    } 
  }
  
  const CheckForMate = (board: Array<string[]>, team: boolean) =>{
      
    //straight forward enough, implementation will be interesting though after a 2 week vacation
    // fortunately brainstorming the code is 90% of the battle

    /*
    this method will simulate every single move the defending team in check can make
    
    1. iterate through the board, when you come to a defending team peice, simulate its moves

    2. the simulation method should check to see if the king is in check after each move simulation
    2a. if it finds that there is a possible move where the king is not in check, break the loop and break the check
    2b. If it finds that there is no possible moves to bring the king out of check, return false and iterate to the next possible peice
    3. continue
    4. if the king is in check, no moves have been found to bring it out of check, and the king itself cannot move anywhere, End the game
    */

    //1
    //lets make it easy and check for white and black seperately for now
    console.log(team)
    
    if(team){        //white

    for(let i = 0; i < board.length; i++){
      for(let k = 0; k < board[i].length; k++){
        if(board[i][k].startsWith("w")){
          let movesToSimulate: number[][] = GetPossibleMovesForAPeiceAtAPosition(board, i, k, "white")
          //now we have the moves to simulate, throw them into the simulator method and it should check the rest for us
          let possibleMove = SimulateMovesFromAnArray(board, i, k, movesToSimulate, "white");
          if(possibleMove){
            return; //found a valid move to bring the king out of check, skip the rest
          }
        }
      }
    }
    //nothing has been found, end the game, black wins
    setWinner("Black")
  }else{
    for(let i = 0; i < board.length; i++){
      for(let k = 0; k < board[i].length; k++){
        if(!board[i][k].startsWith("w") && board[i][k] != ""){
          let movesToSimulate: number[][] = GetPossibleMovesForAPeiceAtAPosition(board, i, k, "black")
          //now we have the moves to simulate, throw them into the simulator method and it should check the rest for us
          let possibleMove = SimulateMovesFromAnArray(board, i, k, movesToSimulate, "black");
          if(possibleMove){
            return; //found a valid move to bring the king out of check, skip the rest
          }
        }
      }
    }
    setWinner("White");
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
      setWinner("");
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
      
        //deep copy the board
      const newBoard = playingBoard.map(row => [...row]);
      newBoard[row][col] = "";
      newBoard[selected.row][selected.col] = ""
      newBoard[row][col] = selected.peice


      //could in the future possibly refactor this repeated code down into its own module
      if(!turn && whiteCheck.current){
          //!turn means it is still white teams turn, so lets check to see if the move they just did will block the check for their king
          let result = ValidMoveCheckForCheck(newBoard, "black");
          if(result){
            setPlayingBoard(playingBoard)
            setSelected({ peice: "", team: "", row: -1, col: -1 })
            ClearHighlights();
            HandleFlash();
            return;
          }
        }
        if(turn && blackCheck.current){
          let result = ValidMoveCheckForCheck(newBoard, "white");
          if(result){
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
        
        if(!turn){
          let result = ValidMoveCheckForCheck(newBoard, "black");
          if(result){
            setPlayingBoard(playingBoard)
            if(!whiteCheck.current){
            setMessage("Your king would be in check")
            }
            setSelected({ peice: "", team: "", row: -1, col: -1 })
            ClearHighlights();
            HandleFlash();
            return;
          }
        }
        if(turn){
          let result = ValidMoveCheckForCheck(newBoard, "white");
          if(result){
            setPlayingBoard(playingBoard)
            setSelected({ peice: "", team: "", row: -1, col: -1 })
            if(!blackCheck.current){
            setMessage("Your king would be in check")
            }
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
            {whiteCheck.current ? <p className={`check-warning ${isFlashing ? "flash" : ""}`}>White King In Check!</p> : <></>}
            {blackCheck.current ? <p className={`check-warning ${isFlashing ? "flash" : ""}`}>Black King In Check!</p> : <></>}
            {message ? <p className={`check-warning ${isFlashing ? "flash" : ""}`}>{message}</p> : <></>} 
            </div>
            <p className="turn-indicator">Turn: {turn ? "Black" : "White"}</p>
          </div>
        
        </div>

        {winner != "" ? 
        <div className="winner-box">
        <p className="winner-text">Checkmate: {winner} team wins!</p>
     </div> : <></>}

     
     </div>
    {pawnPromotion != "" ? 
    <div className="pawn-promotion-menu-container">
      <div className="pawn-promotion-header-container">
        <h2 className="pawn-promotion-header">Promote Pawn</h2>
      </div>
      <div className="pawn-promotion-list">
        <button className="promotion-button" onClick={() => HandlePromotion("queen")}>Queen</button>
        <button className="promotion-button" onClick={() => HandlePromotion("rook")}>Rook</button>
        <button className="promotion-button" onClick={() => HandlePromotion("bishop")}>Bishop</button>
        <button className="promotion-button" onClick={() => HandlePromotion("knight")}>Knight</button>
      </div>
    </div>
    
    : <></>}
    </div>
  );
};

export default Home;
