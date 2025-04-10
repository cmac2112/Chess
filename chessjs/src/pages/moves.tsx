export const getPossiblePawnMoves = (
  row: number,
  col: number,
  team: string,
  board: Array<string[]>
): number[][] => {
  //calculate moves based off of the current position, make sure moves are not invalid and off of the board,
  // if the pawn is not in its starting position do not allow it to move two spaces

  let possibleMoves: Array<number[]> = [];
  switch (team) {
    case "white":
      //check for attacks first
      //wont worry about enpessants for now because i dont even know what they are
      //add a check for out of bounds selections
      let attacks: Array<number[]> = checkAttacks(
        1,
        ["dr", "dl"],
        board,
        row,
        col,
        team
      );

      console.log("attacks", attacks);
      if (row == 6) {
        //starting position
        possibleMoves.push([row - 1, col], [row - 2, col]);
      } else {
        //check for promotion later
        if (board[row - 1][col] == "") {
          possibleMoves.push([row - 1, col]);
        }
      }
      possibleMoves = possibleMoves.concat(attacks);

      break;
    // make case statement for black peices
  }
  console.log(possibleMoves);
  return possibleMoves;
};
export const getPossibleBishopMoves = (
  row: number,
  col: number,
  team: string,
  board: Array<string[]>
): number[][] =>{
  let possibleMoves: Array<number[]> = []

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
  for(let k = rightRow; k < 7; k++){
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
  for(let i = leftRow; i < 7; i++){
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
    if(k > 7){
      break;
    }
  }
  possibleMoves = possibleMoves.concat(diagLeft);
  possibleMoves = possibleMoves.concat(diagRight);
  console.log(possibleMoves)
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
  }

  return possibleMoves;
};

//refactor and remove this
const checkAttacks = (
  distance: number,
  direction: Array<string>,
  board: Array<string[]>,
  row: number,
  col: number,
  team: string
): number[][] => {
  let attacks: Array<number[]> = [];

  console.log(direction);

  if (direction.includes("dr")) {
    if (board[row - 1][col + 1] != "") {
      if (team == "white" && !board[row - 1][col + 1].startsWith("w")) {
        attacks.push([row - 1, col + 1]);
        console.log("attack found r-1 c+1");
      } else if (team == "black" && board[row - 1][col + 1].startsWith("w")) {
        attacks.push([row - 1, col + 1]);
      }
    }
  }
  if (direction.includes("dl")) {
    if (board[row - 1][col - 1] != "") {
      if (team == "white" && !board[row - 1][col - 1].startsWith("w")) {
        attacks.push([row - 1, col - 1]);
        console.log("attack found r-1 c-1");
      } else if (team == "black" && board[row - 1][col - 1].startsWith("w")) {
        attacks.push([row - 1, col + 1]);
      }
    }
  }
  //console.log('new possible attacks', attacks)
  return attacks;
};

export const getPossibleKnightMoves = (row: number, col: number, team: string, board: Array<string[]>): number[][] => {

  let possibleMoves: Array<number[]> = [];

  console.log(team);
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
  console.log(possibleMoves);
  return possibleMoves;

}

//todo for next weekend, King moves, queen moves, turn system
export const getPossibleKingMoves = (row: number, col: number, team: string, board:Array<string[]>):Array<number[]> =>{

  let possibleMoves: Array<number[]> = []

  let otherTeamMoves: Array<number[]> = []

  for(let i = 0; i < 7; i ++){
    //outer is going to keep track of the row
    for(let k = 0; k < 7; k++){
      //inner loop is going to iterate from left to right "col" 
    }
  }
  

  return possibleMoves;
}