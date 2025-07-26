//main method to handle calculation game should only call this method, 
// similar to a Iservice from c#

import { GetAllPossibleMovesForTeam, GetPossibleMovesForAPeiceAtAPosition, IsMoveArrayInGivenArray, PeiceAtGivenPosition } from "./Utilities";

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
const CalculateHighestPointValueAiCanReachEasy = (board: Array<string[]>, pointBoard: Array<number[]>): AIMove => {
    
  
  //find the max value of the board, continually iterate to see if a piece from the ai's team can reach it
  // if it cant, then go to the second highest point value, so on and so forth

  // Flatten the matrix and find the maximum value
  let flatPoints = pointBoard.flat();
  console.log(flatPoints)
  console.log(pointBoard)
  while(flatPoints.length > 0){
  const maxPoint = Math.max(...flatPoints);
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

    const blackPiecePositions: { row: number, col: number, piece: string }[] = [];
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[0].length; c++) {
        const pieceAtPos = PeiceAtGivenPosition(board, r, c);
        if (pieceAtPos && pieceAtPos.startsWith("black")) {
          blackPiecePositions.push({ row: r, col: c, piece: pieceAtPos });
        }
      }
    }
    // Iterate over black pieces only
    for (const { row, col, piece } of blackPiecePositions) {
      const pieceMoves = GetPossibleMovesForAPeiceAtAPosition(board, row, col, "black");
      
      console.log('checking piece at position', piece, row, col);
      console.log('its possible moves', pieceMoves);
      if (IsMoveArrayInGivenArray([maxRow, maxCol], pieceMoves)) {
        console.log('max point move found');
        return {
          fromRow: row,
          fromCol: col,
          toRow: maxRow,
          toCol: maxCol,
          piece: piece,
          score: 0,
          noMovesFound: false,
        };
      }
      console.log('max point move not found for piece', piece);
    
    }
  }
  console.log(maxPoint);
  }
    return {
        fromRow: 1,
        fromCol: 1,
        toRow: 1,
        toCol: 1,
        piece: "pawn",
        score: 15,
        noMovesFound: false,
    };
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

    //lol this is going to take a lot of tuning and research
    // i can already see how this is going to behave

    for(let r = 0; r < board.length; r++){
        for(let c = 0; c < board[0].length; c++){
            const piece = PeiceAtGivenPosition(board, r, c);
            switch(piece){
                 case "wpawn":
                        defaultPointsBoard[r][c] += 3
                          break;
                        case "wrook":
                            defaultPointsBoard[r][c] += 7
                          break;
                        case "wbishop":
                            defaultPointsBoard[r][c] += 7
                          break;
                        case "wknight":
                            defaultPointsBoard[r][c] += 6
                          break;
                        case "wking":
                            defaultPointsBoard[r][c] -= 100
                          break;
                        case "wqueen":
                            defaultPointsBoard[r][c] += 12
                          break;
                        case "pawn":
                            defaultPointsBoard[r][c] += AI_PIECE_PENALTY
                          break;
                        case "knight":
                            defaultPointsBoard[r][c] += AI_PIECE_PENALTY
                          break;
                        case "rook":
                            defaultPointsBoard[r][c] += AI_PIECE_PENALTY
                          break;
                        case "bishop":
                            defaultPointsBoard[r][c] += AI_PIECE_PENALTY
                          break;
                        case "king":
                            defaultPointsBoard[r][c] += AI_PIECE_PENALTY
                          break;
                        case "queen":
                            defaultPointsBoard[r][c] += AI_PIECE_PENALTY
                          break;
            }
        }
    }
    

    //iterate throughthe board, assign default points 
    console.log(defaultPointsBoard)
    return CalculateHighestPointValueAiCanReachEasy(board, defaultPointsBoard)
}