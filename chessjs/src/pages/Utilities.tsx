//file for holding useful utilities to do things for the game that have no other place
import {getPawnAttacksForKingMoveCalculation, getPossibleBishopMoves, getPossibleKnightMoves, getPossibleQueenMoves, getPossibleRookMoves } from "./moves";


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
              /*case "king":
                otherTeamMoves = otherTeamMoves.concat(getDefaultKingMoves(i, k));
                break;
                */
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
              /*case "wking":
                otherTeamMoves = otherTeamMoves.concat(getDefaultKingMoves(i, k));
                break;
                */
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


