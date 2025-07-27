//main method to handle calculation game should only call this method, 
// similar to a Iservice from c#

import { GetAllPossibleMovesForTeam, GetPossibleMovesForAPeiceAtAPosition, IsMoveArrayInGivenArray, PeiceAtGivenPosition, ValidMoveCheckForCheck } from "./Utilities";

//ai will always play team black

export interface AIMove{
  fromRow: number;
  fromCol: number;
  toRow: number;
  toCol: number;
  piece: string;
  capturedPiece?: string;
  score: number;
  noMovesFound: boolean;
}

//ai will return [[piece_X, piece_y], [movedPiece_x, movedPiece_y]]
// it will choose the piece's position it wants to move, and chooses its ending spot
export const HandleAICalculation = (board: Array<string[]>, difficulty: string | null): AIMove | null =>{
    if(difficulty === "easy"){
       return CalculateFavorableMoveEasy(board)
    }

    return null;
}
const CalculateHighestPointValueAiCanReachEasy = (board: Array<string[]>, pointBoard: (number | null)[][]): AIMove => {
    
  
  //find the max value of the board, continually iterate to see if a piece from the ai's team can reach it
  // if it cant, then go to the second highest point value, so on and so forth

  // Flatten the matrix and find the maximum value
  let flatPoints = pointBoard.flat();
  console.log(flatPoints)
  console.log(pointBoard)
  while(flatPoints.length > 0){
  const maxPoint = Math.max(...flatPoints.filter((v): v is number => v !== null));
  console.log(maxPoint)

  // Find the row and column index of the max point
  let maxRow = -1;
  let maxCol = -1;
  for (let r = 0; r < pointBoard.length; r++) {
    for (let c = 0; c < pointBoard[r].length; c++) {
      if (pointBoard[r][c] === maxPoint) {
        maxRow = r;
        maxCol = c;
        break;
      }
    }
  }
  const possibleAIMoves: number[][] = GetAllPossibleMovesForTeam(board, "black", true);
  console.log(possibleAIMoves)
  const canAiMoveToMaxPointCurrently: boolean = IsMoveArrayInGivenArray([maxRow, maxCol], possibleAIMoves);
  // this is not going to work, because there are multiple instances of the same number
  // in the pointsboard so it will only find the first instance when it goes to find the max
  // of that number, so we need to alter the pointsboard and null out values it cannot reach
  console.log(canAiMoveToMaxPointCurrently)
  console.log('looking to move to', maxRow, maxCol)
  if(!canAiMoveToMaxPointCurrently){
    const index = flatPoints.indexOf(maxPoint);
    if (index > -1) {
      flatPoints.splice(index, 1);
      console.log(flatPoints)
      // change value of the max number that the ai cannot get to, to a horrifcally small number
      pointBoard[maxRow][maxCol] = -99999
      //bruh that actually works, this is going to be the dumbest ai ever
    }
    if (flatPoints.length === 0){
      return{
        fromRow: 0,
        fromCol: 0,
        toRow: 0,
        toCol: 0,
        piece: "",
        score: 0,
        noMovesFound: true
      }
    }
  }else{
    //if ai can make it, figure out what piece can do it
    // since this is the first iteration of this lets just loop through
    // all pieces and move the first one we find

    for(let r = 0; r < board.length; r++){
      for(let c = 0; c < board[0].length; c++){
        const pieceAtPos = board[r][c]
        const pieceMoves = GetPossibleMovesForAPeiceAtAPosition(board, r, c, "black", true)

        console.log("i want to move to", maxRow, maxCol)
        if(IsMoveArrayInGivenArray([maxRow, maxCol], pieceMoves)){
          console.log('max point move found')


          const boardCopy = board.map(row => [...row]);
          boardCopy[r][c] = "";
          boardCopy[maxRow][maxCol] = pieceAtPos;
          console.log(pointBoard)
          console.log(board)
          console.log(boardCopy)
          let exposedKing = ValidMoveCheckForCheck(boardCopy, "white")
          console.log("king is exposed", exposedKing)
          if(exposedKing){
            console.log("move found but it would expose my king")
            //move would lose the game for ai
            //break this iteration and contiue to look for another move
            const index = flatPoints.indexOf(maxPoint);
            if (index > -1) {
              flatPoints.splice(index, 1);
              console.log(flatPoints)
              pointBoard[maxRow][maxCol] = -99999
              continue;
            }
          }
          return {
            fromRow: r,
            fromCol: c,
            toRow: maxRow,
            toCol: maxCol,
            piece: pieceAtPos,
            score: 0,
            noMovesFound: false,
          }
        }
        console.log('max point move not found for piece', pieceAtPos)
      }
    }
  }
  console.log(maxPoint);

  }
    return{
        fromRow: 0,
        fromCol: 0,
        toRow: 0,
        toCol: 0,
        piece: "",
        score: 0,
        noMovesFound: true
      }
}
const CalculateFavorableMoveEasy = (board: Array<string[]>): AIMove => {
    let defaultPointsBoard: number[][] = [
        [1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1],
        [1,2,2,2,2,2,2,3],
        [3,4,4,4,4,4,4,3],
        [3,4,4,4,4,4,4,3],
        [1,2,2,2,2,2,2,1],
        [1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1],
    ]



    for(let r = 0; r < board.length; r++){
        for(let c = 0; c < board[0].length; c++){
            if(board[r][c].startsWith("w")){
                defaultPointsBoard[r][c] = GetPieceValue(board[r][c]) + (defaultPointsBoard[r][c] || 0);
            }
        }
    }

    // FILTER OUT DANGEROUS MOVES FIRST
    const safePointsBoard = FilterSafeMoves(board, defaultPointsBoard);

    return CalculateHighestPointValueAiCanReachEasy(board, safePointsBoard);
}
const GetPieceValue = (piece: string): number => {
  // Standard chess piece values
  switch(piece.toLowerCase().replace('w', '')) {
    case 'pawn':
      return 10;
    case 'knight':
      return 30;
    case 'bishop':
      return 30;
    case 'rook':
      return 50;
    case 'queen':
      return 90;
    case 'king':
      return 1000; 
    default:
      return 0;
  }
}

const FilterSafeMoves = (board: Array<string[]>, pointBoard: (number | null)[][]): (number | null)[][] => {
  const safeBoardCopy = pointBoard.map(row => [...row]); // Deep copy
  
  // Get all possible AI moves
  for(let fromRow = 0; fromRow < board.length; fromRow++){
    for(let fromCol = 0; fromCol < board[0].length; fromCol++){
      const piece = board[fromRow][fromCol];
      
      // Only check black pieces (AI pieces)
      if(!piece.startsWith("w") && piece !== ""){
        const pieceMoves = GetPossibleMovesForAPeiceAtAPosition(board, fromRow, fromCol, "black", true);
        
        // Check each possible move for this piece
        pieceMoves.forEach(([toRow, toCol]) => {
          // Simulate the move
          const boardCopy = board.map(row => [...row]);
          boardCopy[fromRow][fromCol] = "";
          boardCopy[toRow][toCol] = piece;
          
          // Check if this move would expose the AI's king
          const exposedKing = ValidMoveCheckForCheck(boardCopy, "white");
          
          if(exposedKing){
            // Mark this destination as dangerous
            safeBoardCopy[toRow][toCol] = -99999;
            console.log(`Marking move from (${fromRow},${fromCol}) to (${toRow},${toCol}) as dangerous - would expose king`);
          }
        });
      }
    }
  }
  
  return safeBoardCopy;
}