import { removeIntersection } from "./Utilities";

export const getPossiblePawnMoves = (
  row: number,
  col: number,
  team: string,
  board: Array<string[]>
): number[][] => {

  //calculate moves based off of the current position, make sure moves are not invalid and off of the board,
  // if the pawn is not in its starting position do not allow it to move two spaces

  //pawn promotions later here

  //wont worry about enpessants for now because i dont even know what they are

  let possibleMoves: Array<number[]> = [];
  
  switch (team) {
    case "white":
      let attacks: Array<number[]> = []
      
      if ((row - 1 >= 0 && col + 1 <= 7) && (board[row - 1][col + 1] != "") && (!board[row - 1][col + 1].startsWith("w"))) {
            attacks.push([row - 1, col + 1]);
          }
        
      if ((row - 1 >= 0 && col - 1 >= 0) && (board[row - 1][col - 1] != "") && (!board[row - 1][col - 1].startsWith("w"))) {
            attacks.push([row - 1, col - 1]);
          }
      if (row == 6) {
        //starting position
        possibleMoves.push([row - 2, col]);
      } 
        //check for promotion later
      if ((row - 1 >= 0) && board[row - 1][col] == "") {
          possibleMoves.push([row - 1, col]);
        }
      
      possibleMoves = possibleMoves.concat(attacks);
      break;
    case "black":
      let blackAttacks: Array<number[]> = []

      if ((row + 1 <= 7 && col + 1 <= 7) && (board[row + 1][col + 1] != "") && (board[row + 1][col + 1].startsWith("w"))) {
        blackAttacks.push([row + 1, col + 1]);
      }
    
      if ((row + 1 <= 7 && col - 1 >= 0) && (board[row + 1][col - 1] != "") && (board[row + 1][col - 1].startsWith("w"))) {
        blackAttacks.push([row + 1, col - 1]);
      }

      if(row == 1){
        possibleMoves.push([row + 2, col]);
      }
      
      if((row + 1 <= 7) && board[row + 1][col] == ""){
          possibleMoves.push([row + 1, col]);
      }
      
      possibleMoves = possibleMoves.concat(blackAttacks);
  }
  return possibleMoves;
};

export const getPawnAttacksForKingMoveCalculation = (row: number, col: number, team: string): number[][] =>{


  //just return the col + 1 row +- 1 for each pawn depending on the team here
  //should individually call this for each pawn on the board so just return this

  // no out of bounds checking so come back to this if index errors happen
  if(team == "black"){
    
    return [[row + 1, col + 1], [row + 1, col - 1]];
  }
  if(team == "white"){
    return [[row - 1, col + 1], [row - 1, col - 1]];
  }

  return []
}
export const getPossibleBishopMoves = (
  row: number,
  col: number,
  team: string,
  board: Array<string[]>
): number[][] =>{

  let possibleMoves: Array<number[]> = []

  switch(team){
    case "white":

  let diagLeft: Array<number[]> = []
  let diagRight: Array<number[]> = []

  let afterPieceRight: boolean = false;
  let afterPeiceLeft: boolean = false;

  //these will iterate through and find the starting place
  //building the movement array from boarder in instead of from
  //piece out
  let leftRow = row;
  let leftCol = col;

  while(leftRow > 0 && leftCol > 0){
    leftRow -= 1;
    leftCol -= 1;
  }
  
  let rightRow = row;
  let rightCol = col;

  while(rightRow > 0 && rightCol < 7){
    rightCol += 1;
    rightRow -= 1;
  }

  let j = rightCol;
  for(let k = rightRow; k < 8; k++){
    if(board[k][j] == undefined){
      break;
    }
    if(k == row){
      j -= 1;
      afterPieceRight = true;
      continue;
    }
    if(board[k][j] == ""){
      diagRight.push([k, j])
    }else if(board[k][j] != ""){
      if(!afterPieceRight){
        diagRight = [];
      }
      if(!board[k][j].startsWith("w")){
        diagRight.push([k, j])
      }
      if(afterPieceRight){
        break;
      }
    }
    j -= 1;
    if(j < 0){
      break;
    }
  }

  let k = leftCol;
  for(let i = leftRow; i < 8; i++){
    if(board[i][k] == undefined){
      break;
    }
    if(i == row){
      k += 1
      afterPeiceLeft = true;
      continue;
    }
    if(board[i][k] == ""){
      diagLeft.push([i, k])
    }else if(board[i][k] != ""){
      if(!afterPeiceLeft){
        diagLeft = [];
      }
      if(!board[i][k].startsWith("w")){
        diagLeft.push([i, k])
      }
      if(afterPeiceLeft){
        break;
      }
    }
    
    k += 1;
    if(k > 8){
      break;
    }
  }


  possibleMoves = possibleMoves.concat(diagLeft);
  possibleMoves = possibleMoves.concat(diagRight);
  break;

  case "black":
    
  let diagLeftBlack: Array<number[]> = []
  let diagRightBlack: Array<number[]> = []

  let afterPieceRightBlack: boolean = false;
  let afterPeiceLeftBlack: boolean = false;

  //these will iterate through and find the starting place
  //building the movement array from boarder in instead of from
  //piece out
  let leftRowBlack = row;
  let leftColBlack = col;

  while(leftRowBlack > 0 && leftColBlack > 0){
    leftRowBlack -= 1;
    leftColBlack -= 1;
  }
  
  let rightRowBlack = row;
  let rightColBlack = col;

  while(rightRowBlack > 0 && rightColBlack < 7){
    rightColBlack += 1;
    rightRowBlack -= 1;
  }

  let p = rightColBlack;
  for(let k = rightRowBlack; k < 8; k++){
    if(board[k][p] == undefined){
      break;
    }
    if(k == row){
      p -= 1;
      afterPieceRightBlack = true;
      continue;
    }
    if(board[k][p] == ""){
      diagRightBlack.push([k, p])
    }else if(board[k][p] != ""){
      if(!afterPieceRightBlack){
        diagRightBlack = [];
      }
      if(board[k][p].startsWith("w")){
        diagRightBlack.push([k, p])
      }
      if(afterPieceRightBlack){
        break;
      }
    }
    p -= 1;
    if(p < 0){
      break;
    }
  }

  let n = leftColBlack;
  for(let i = leftRowBlack; i < 8; i++){
    if(board[i][n] == undefined){
      break;
    }
    if(i == row){
      n += 1
      afterPeiceLeftBlack = true;
      continue;
    }
    if(board[i][n] == ""){
      diagLeftBlack.push([i, n])
    }else if(board[i][n] != ""){
      if(!afterPeiceLeftBlack){
        diagLeftBlack = [];
      }
      if(board[i][n].startsWith("w")){
        diagLeftBlack.push([i, n])
      }
      if(afterPeiceLeftBlack){
        break;
      }
    }
    
    n += 1;
    if(n > 8){
      break;
    }
  }


  possibleMoves = possibleMoves.concat(diagLeftBlack);
  possibleMoves = possibleMoves.concat(diagRightBlack);
}
  return possibleMoves;

}
export const getPossibleRookMoves = (
  row: number,
  col: number,
  team: string,
  board: Array<string[]>
): number[][] => {
  let possibleMoves: Array<number[]> = [];

  switch (team) {
    case "white":
      let tempMoveHorizontal: Array<number[]> = [];
      let rookCheckHorizontal: boolean = false;

      let tempMoveVertical: Array<number[]> = [];
      let rookCheckVertical: boolean = false;

      for(let i = 0; i < 8; i++){
        if(i == row){
          rookCheckVertical = true;
          continue;
        }
        if(board[i][col] == ""){
          tempMoveVertical.push([i, col]);
        }else if(board[i][col] != ""){
          if(!rookCheckVertical){
            tempMoveVertical = [];
          }
          if(!board[i][col].startsWith("w")){
            tempMoveVertical.push([i, col])
          }
          if(rookCheckVertical){
            break;
          }
        }
      }
      
      for(let i = 0; i < 8; i++){
        if(i == col){
          rookCheckHorizontal = true;
          continue;
        }
        if(board[row][i] == ""){
          tempMoveHorizontal.push([row, i])
        }else if(board[row][i] != ""){
          if(!rookCheckHorizontal){
            tempMoveHorizontal = [];
          }
          if(!(board[row][i]).startsWith("w")){
            tempMoveHorizontal.push([row, i])
          }
          if(rookCheckHorizontal){
            break;
          }
        }
      }
      
        
      possibleMoves = possibleMoves.concat(tempMoveHorizontal);
      possibleMoves = possibleMoves.concat(tempMoveVertical);
      break;

      case "black":
      let tempMoveHorizontalBlack: Array<number[]> = [];
      let rookCheckHorizontalBlack: boolean = false;

      let tempMoveVerticalBlack: Array<number[]> = [];
      let rookCheckVerticalBlack: boolean = false;

      for(let i = 0; i < 8; i++){
        if(i == row){
          rookCheckVerticalBlack = true;
          continue;
        }
        if(board[i][col] == ""){
          tempMoveVerticalBlack.push([i, col]);
        }else if(board[i][col] != ""){
          if(!rookCheckVerticalBlack){
            tempMoveVerticalBlack = [];
          }
          if(board[i][col].startsWith("w")){
            tempMoveVerticalBlack.push([i, col])
          }
          if(rookCheckVerticalBlack){
            break;
          }
        }
      }
      
      for(let i = 0; i < 8; i++){
        if(i == col){
          rookCheckHorizontalBlack= true;
          continue;
        }
        if(board[row][i] == ""){
          tempMoveHorizontalBlack.push([row, i])
        }else if(board[row][i] != ""){
          if(!rookCheckHorizontalBlack){
            tempMoveHorizontalBlack = [];
          }
          if((board[row][i]).startsWith("w")){
            tempMoveHorizontalBlack.push([row, i])
          }
          if(rookCheckHorizontalBlack){
            break;
          }
        }
      }
      
        
      possibleMoves = possibleMoves.concat(tempMoveHorizontalBlack);
      possibleMoves = possibleMoves.concat(tempMoveVerticalBlack);
      break;
  }

  return possibleMoves;
};

export const getPossibleKnightMoves = (row: number, col: number, team: string, board: Array<string[]>): number[][] => {

  let possibleMoves: Array<number[]> = [];

  //investigate better way to do this, this hurts my eyes
 
  if((row - 2 >= 0 && col - 1 >= 0) && ((team == "white" ? !board[row - 2][col - 1].startsWith("w") : board[row - 2][col - 1].startsWith("w")) || board[row - 1][col - 2] == "")) {
    possibleMoves.push([row - 2, col - 1]);
  }
  if((row - 1 >= 0 && col - 2 >= 0) && ((team == "white" ? !board[row - 1][col - 2].startsWith("w") : board[row - 1][col - 2].startsWith("w")) || board[row - 1][col - 2] == "")){
    possibleMoves.push([row - 1, col - 2]);
  }
  //second quadrant
  if((row - 2 >= 0 && col + 1 <= 7) && ((team == "white" ? !board[row - 2][col + 1].startsWith("w") : board[row - 2][col + 1].startsWith("w")) || board[row - 2][col + 1] == "" && board[row - 2][col + 1] != undefined)){
    possibleMoves.push([row - 2, col + 1])
  }
  if((row - 1 >= 0 && col + 2 <= 7) && ((team == "white" ? !board[row - 1][col + 2].startsWith("w") : board[row - 1][col + 2].startsWith("w")) || board[row - 1][col + 2] == "")){
    possibleMoves.push([row - 1, col + 2])
  }
  //third
  if((row + 1 <= 7 && col + 2 <= 7) && ((team == "white" ? !board[row + 1][col + 2].startsWith("w") : board[row + 1][col + 2].startsWith("w")) || board[row + 1][col + 2] == "")){
    possibleMoves.push([row + 1, col + 2])
  }
  if((row + 2 <= 7 && col + 1 <= 7) && ((team == "white" ? !board[row + 2][col + 1].startsWith("w") : board[row + 2][col + 1].startsWith("w")) || board[row + 2][col + 1] == "")){
    possibleMoves.push([row + 2, col + 1])
  }
  //forth 
  if((row + 1 <= 7 && col - 2 >= 0) && ((team == "white" ? !board[row + 1][col - 2].startsWith("w") : board[row + 1][col - 2].startsWith("w")) || board[row + 1][col - 2] == "")){
    possibleMoves.push([row + 1, col - 2])
  }
  if((row + 2 <= 7 && col - 1 >= 0) && ((team == "white" ? !board[row + 2][col - 1].startsWith("w") : board[row + 2][col - 1].startsWith("w")) || board[row + 2][col - 1] == "")){
    possibleMoves.push([row + 2, col - 1])
  }
  
  return possibleMoves; 

}

export const getPossibleKingMoves = (row: number, col: number, team: string, board:Array<string[]>):Array<number[]> =>{

  let otherTeamMoves: Array<number[]> = []


  for(let i = 0; i < 8; i ++){
    //outer is going to keep track of the row
    for(let k = 0; k < 8; k++){
      //inner loop is going to iterate from left to right "col" 
      //this will probably be ugly but im unsure of any better way to do this at the moment

      //we have the selected team
      let peice = board[i][k];
     
      if(team == "white"){
        const otherTeam = "black";
        //console.log('entered switch')
      switch(peice){
          case "":
          break;
          case "pawn":
            otherTeamMoves = otherTeamMoves.concat(getPawnAttacksForKingMoveCalculation(i, k, otherTeam));
            break;
          case "knight":
            otherTeamMoves = otherTeamMoves.concat(getPossibleKnightMoves(i, k, otherTeam, board));
            break;
          case "bishop":
            otherTeamMoves = otherTeamMoves.concat(getPossibleBishopMoves(i, k, otherTeam, board));
            break;
          case "rook":
            otherTeamMoves = otherTeamMoves.concat(getPossibleRookMoves(i, k, otherTeam, board));
            break;
          case "queen":
            otherTeamMoves = otherTeamMoves.concat(getPossibleQueenMoves(i, k, otherTeam, board));
            break;
          case "king":
            otherTeamMoves = otherTeamMoves.concat(getDefaultKingMoves(i, k));
            break;
          default:
            break;
          
      }
    }else{
      const otherTeam = "white";
      switch(peice){
        case "":
          break;
          case "wpawn":
            otherTeamMoves = otherTeamMoves.concat(getPawnAttacksForKingMoveCalculation(i, k, otherTeam));
            break;
            case "wknight":
            otherTeamMoves = otherTeamMoves.concat(getPossibleKnightMoves(i, k, otherTeam, board));
            break;
          case "wbishop":
            otherTeamMoves = otherTeamMoves.concat(getPossibleBishopMoves(i, k, otherTeam, board));
            break;
          case "wrook":
            otherTeamMoves = otherTeamMoves.concat(getPossibleRookMoves(i, k, otherTeam, board));
            break;
          case "wqueen":
            otherTeamMoves = otherTeamMoves.concat(getPossibleQueenMoves(i, k, otherTeam, board));
            break;
          case "wking":
            otherTeamMoves = otherTeamMoves.concat(getDefaultKingMoves(i, k));
            break;
          default:
            break;
      }
    }
  }
}

  let kingMoves: Array<number[]> = [
    [row - 1, col],
    [row - 1, col - 1],
    [row - 1, col + 1],
    [row, col + 1],
    [row, col - 1],
    [row + 1, col],
    [row + 1, col - 1],
    [row + 1, col + 1]
  ]

  const validKingMoves = removeIntersection(kingMoves, otherTeamMoves);
  
  const filteredKingMoves = validKingMoves.filter(([r, c]) => {
    // Check if the move is within bounds
    const inBounds = r >= 0 && r <= 7 && c >= 0 && c <= 7;

    if(!inBounds){
      console.log("not in bounds")
      return false;
    }
  
    // Check if the destination square is valid for the "white" team
    if(team == "white"){
    const isValidForWhite = !board[r][c]?.startsWith("w");
    return isValidForWhite;
    }else{
      const isValidForBlack = board[r][c] === "" || board[r][c]?.startsWith("w");
      return isValidForBlack;
    }
  });
 
  return filteredKingMoves;
}

const getDefaultKingMoves = (row: number, col: number): Array<number[]> => {
  let kingMoves: Array<number[]> = [
    [row - 1, col],
    [row - 1, col - 1],
    [row - 1, col + 1],
    [row, col + 1],
    [row, col - 1],
    [row + 1, col],
    [row + 1, col - 1],
    [row + 1, col + 1]
  ]
  return kingMoves;
}

export const getPossibleQueenMoves = (row: number, col: number, team: string, board:Array<string[]>): Array<number[]> =>{

  let possibleMoves: Array<number[]> = [];

  possibleMoves = possibleMoves.concat(getPossibleBishopMoves(row, col, team, board));
  possibleMoves = possibleMoves.concat(getPossibleRookMoves(row, col, team, board));

  return possibleMoves
}



