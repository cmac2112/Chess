//file for holding useful utilities to do things for the game that have no other place
import {getPawnAttacksForKingMoveCalculation, getPossibleBishopMoves, getPossibleKingMoves, getPossibleKnightMoves, getPossibleQueenMoves, getPossibleRookMoves } from "./moves";

//this method should return some sort of indicator to let the program know if it found any possible move where the king is no longer in check
export const SimulateMovesFromAnArray = (initialBoard: Array<string[]>, peicePositionRow: number, peicePositionCol: number, peicePossibleMoves: number[][], team: string): boolean => {
  
  let peice = PeiceAtGivenPosition(initialBoard, peicePositionRow, peicePositionCol)

  //got peice type, iterate through its possible moves then calculate its possible moves from that position again
  //then using that new updated board, check for check again


if(team == "white"){
  for(let i = 0; i < peicePossibleMoves.length; i++){
    let simBoard = initialBoard.map(row => [...row])
    simBoard[peicePositionRow][peicePositionCol] = "";
    simBoard[peicePossibleMoves[i][0]][peicePossibleMoves[i][1]] = peice;
    
    console.log("this is my sim board",simBoard)
    let inCheck = ValidMoveCheckForCheck(simBoard, "black")
    if(!inCheck){
    return true; //found a valid move that wont put the king in check
    }
  }
}
if(team == "black"){
  for(let i = 0; i < peicePossibleMoves.length; i++){
    let simBoard = initialBoard.map(row => [...row])
    simBoard[peicePositionRow][peicePositionCol] = "";
    simBoard[peicePossibleMoves[i][0]][peicePossibleMoves[i][1]] = peice;
    
    console.log("this is my sim board",simBoard)
    let inCheck = ValidMoveCheckForCheck(simBoard, "white")
    if(!inCheck){
    return true; //found a valid move that wont put the king in check
    }
  }
}
return false; // no moves found for this peice to make its king not in check
}
export const GetAllPeicesForTeam = (board: Array<string[]>, team: string): Array<[number, number, string]> =>{
  let result: Array<[number, number, string]> = [];

  for(let i = 0; i < board.length; i++){
    for(let k = 0; k < board[i].length; k++){
      if(team === "white" && board[i][k].startsWith("w")){
        result.push([i, k, board[i][k]])
      }
      if(team === "black" && !board[i][k].startsWith("w") && board[i][k] != ""){
        result.push([i, k, board[i][k]])
      }
    }
  }

  return result;
}

/// This method will be used to check if a position (array) on the board exists in the positions (array of arrays) passed in
/// returns a boolean 
export const IsMoveArrayInGivenArray = (position: number[], givenMoves: number[][]): boolean =>{
return givenMoves.some(
        move => move.length === position.length && move[0] === position[0] && move[1] === position[1]
    );
}

//finds a given peice in the board and then returns its postion as [r][c], returns null if not found
export const FindAGivenPeice = (board: Array<string[]>, peice: string,): number[] | null =>{
    for(let i = 0; i < board.length; i++){
        for(let k = 0; k < board[i].length; k++){
            if(board[i][k] === peice){
                return [i, k];
            }
        }
    }
    return null;
}


/// This function will find the intersection amongst these two arrays and remove it from kingMoves and return a possible moves array for the king
export const removeIntersection = (kingMoves: Array<number[]>, otherTeamMoves: Array<number[]>): Array<number[]> => {
return kingMoves.filter(kingMove => {
  // For each kingMove, check if it exists in otherTeamMoves
  return !otherTeamMoves.some(otherMove => {
    // Compare each element of the inner arrays
    return kingMove.length === otherMove.length && 
           kingMove[0] === otherMove[0] && 
           kingMove[1] === otherMove[1];
  });
});
};

export const GetAllPossiblePawnMovesForTeam =(board: Array<string[]>, team: string): number[][] =>{
  let possibleMoves: number[][] = [];

  for(let i = 0; i < 8; i ++){
    for(let k = 0; k < 8; k++){
      let peice = board[i][k]
      if(team == "black"){
        switch(peice){
          case "pawn":
            possibleMoves = possibleMoves.concat(getPawnAttacksForKingMoveCalculation(i, k, team))
            break;
            default:
              break;
        }
      }else{
        switch(peice){
          case "wpawn":
            possibleMoves = possibleMoves.concat(getPawnAttacksForKingMoveCalculation(i, k, team))
            break;
            default:
            break;
        }
      }
    }
  }
  return possibleMoves;
}

/// This method will give all of the possible moves of a team based on the position of the board given
export const GetAllPossibleMovesForTeam = (board: Array<string[]>, team: string): number[][] => {
    let possibleMoves: number[][] = []

    for(let i = 0; i < 8; i ++){
        //outer is going to keep track of the row
        for(let k = 0; k < 8; k++){
          //inner loop is going to iterate from left to right "col" 
          //this will probably be ugly but im unsure of any better way to do this at the moment
    
          //we have the selected team
          let peice = board[i][k];
         
          if(team == "black"){
          switch(peice){
              case "":
              break;
              case "pawn":
                possibleMoves = possibleMoves.concat(getPawnAttacksForKingMoveCalculation(i, k, team));
                break;
              case "knight":
                possibleMoves = possibleMoves.concat(getPossibleKnightMoves(i, k, team, board));
                break;
              case "bishop":
                possibleMoves = possibleMoves.concat(getPossibleBishopMoves(i, k, team, board));
                break;
              case "rook":
                possibleMoves = possibleMoves.concat(getPossibleRookMoves(i, k, team, board));
                break;
              case "queen":
                possibleMoves = possibleMoves.concat(getPossibleQueenMoves(i, k, team, board));
                break;
              case "king":
                possibleMoves = possibleMoves.concat(getPossibleKingMoves(i, k, team, board));
                break;
                
              default:
                break;
              
          }
        }else{

          switch(peice){
            case "":
              break;
              case "wpawn":
                possibleMoves = possibleMoves.concat(getPawnAttacksForKingMoveCalculation(i, k, team));
                break;
                case "wknight":
                possibleMoves = possibleMoves.concat(getPossibleKnightMoves(i, k, team, board));
                break;
              case "wbishop":
                possibleMoves = possibleMoves.concat(getPossibleBishopMoves(i, k, team, board));
                break;
              case "wrook":
                possibleMoves = possibleMoves.concat(getPossibleRookMoves(i, k, team, board));
                break;
              case "wqueen":
                possibleMoves = possibleMoves.concat(getPossibleQueenMoves(i, k, team, board));
                break;
              case "wking":
                possibleMoves = possibleMoves.concat(getPossibleKingMoves(i, k, team, board));
                break;
                
              default:
                break;
          }
        }
      }
    }

    return possibleMoves;

}


// this method will return the peice at a given position passed to it
// probably could have just done this in the method itself but this makes things more readable
export const PeiceAtGivenPosition = (board: Array<string[]>, peicePositionRow: number, peicePositionCol: number): string =>{
  return board[peicePositionRow][peicePositionCol];
}

//returns just the move array for a given peice at a position, will be used in the check and checkmate blocking funtionality
export const GetPossibleMovesForAPeiceAtAPosition = (board: Array<string[]>, peicePositionRow: number, peicePositionCol: number, team: string): number[][] => {

  let moves: number[][] = [];

  let peice = board[peicePositionRow][peicePositionCol]
  if(team == "black"){
          switch(peice){
              case "":
              break;
              case "pawn":
                moves = getPawnAttacksForKingMoveCalculation(peicePositionRow, peicePositionCol, team);
                break;
              case "knight":
                moves = moves.concat(getPossibleKnightMoves(peicePositionRow, peicePositionCol, team, board));
                break;
              case "bishop":
                moves = moves.concat(getPossibleBishopMoves(peicePositionRow, peicePositionCol, team, board));
                break;
              case "rook":
                moves = moves.concat(getPossibleRookMoves(peicePositionRow, peicePositionCol, team, board));
                break;
              case "queen":
                moves = moves.concat(getPossibleQueenMoves(peicePositionRow, peicePositionCol, team, board));
                break;
              case "king":
                moves = moves.concat(getPossibleKingMoves(peicePositionRow, peicePositionCol, team, board));
                break;
                
              default:
                break;
              
          }
        }else{

          switch(peice){
            case "":
              break;
              case "wpawn":
                moves = getPawnAttacksForKingMoveCalculation(peicePositionRow, peicePositionCol, team);
                break;
                case "wknight":
                moves = getPossibleKnightMoves(peicePositionRow, peicePositionCol, team, board);
                break;
              case "wbishop":
                moves = getPossibleBishopMoves(peicePositionRow, peicePositionCol, team, board);
                break;
              case "wrook":
                moves = getPossibleRookMoves(peicePositionRow, peicePositionCol, team, board);
                break;
              case "wqueen":
                moves = getPossibleQueenMoves(peicePositionRow, peicePositionCol, team, board);
                break;
              case "wking":
                moves = moves.concat(getPossibleKingMoves(peicePositionRow, peicePositionCol, team, board));
                break;
                
              default:
                break;
          }
        }
      return moves;
}

export const ValidMoveCheckForCheck = (board: Array<string[]>, targetingTeam: string):boolean => {

  let result:boolean = false;

  if(targetingTeam == "black"){
    const whiteKingPosition = FindAGivenPeice(board, "wking");
    const blackTeamMovesNextTurn = GetAllPossibleMovesForTeam(board, "black");
    if(whiteKingPosition != null){
    result = IsMoveArrayInGivenArray(whiteKingPosition, blackTeamMovesNextTurn);
    }else{
      console.error("white king does not exist, how?")
    }
  }
  if(targetingTeam == "white"){
    const blackKingPosition = FindAGivenPeice(board, "king");
    const whiteTeamMovesNextTurn = GetAllPossibleMovesForTeam(board, "white");
    if(blackKingPosition != null){
      result = IsMoveArrayInGivenArray(blackKingPosition, whiteTeamMovesNextTurn);
    }else{
      console.error("black king does not exist, how?")
    }
  }

  return result;
}

