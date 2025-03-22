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
export const getPossibleRookMoves = (
  row: number,
  col: number,
  team: string,
  board: Array<string[]>
): number[][] => {
  let possibleMoves: Array<number[]> = [];

  switch (team) {
    case "white":
      //two pointer, capture entire column and array, two loops iterate through col and array, mark closest
      //store closet peice, continue iterating closer to selected peice
      // when one pointer beats another, just keep it on the peice, let the other keep iterating
      // once all pointers are at the peice, take the distance at which the last closest peice was
      // then calculate moves based off of that

      //column loop
      let p1 = 0;
      let p2 = 7;

      let p1Closest = -1;
      let p2Closest = -1;

      let c1 = 0;
      let c2 = 7;

      let c2Closest = -1;
      let c1Closest = -1;

      while (p1 != p2) {
        if (p1 != col) {
          if (board[row][p1] == "") {
            p1 += 1;
          } else if (board[row][p1] != "") {
            p1Closest = col - p1 - 1;
            p1 += 1;
          }
        }
    

        if (p2 != col) {
          if (board[row][p2] == "") {
            p2 -= 1;
          } else if (board[row][p1] != "") {
            p2Closest = p2 - col - 1;
            p2 -= 1;
          }
        }
      }

      //vertical checks
      while (c1 != c2) {
        console.log(c1);
        if (c1 != row) {
          if (board[c1][col] == "") {
            c1 += 1;
          } else if (board[c1][col] != "") {
            c1Closest = row - c1 - 1;
            c1 += 1;
          }
        }
        if (c2 != row) {
          if (board[c2][col] == "") {
            c2 -= 1;
          } else if (board[c2][col] != "") {
            c2Closest = c2 - row - 1;
            c2 -= 1;
          }
        }
      }
      console.log(p1Closest, p2Closest, c1Closest, c2Closest);

      //p1closest negative col direction
      if(p1Closest != -1){
        while (p1Closest != 0) {
          possibleMoves.push([row, col - p1Closest]);
          p1Closest -= 1;
        }
      }else{
        for(let i = col; i > 0; i--){
            possibleMoves.push([row, col - i ])
        }
      }
      if (p2Closest != -1) {
        while (p2Closest != 0) {
          possibleMoves.push([row, col + p2Closest]);
          p2Closest -= 1;
        }
      }else{
        for(let i = col; i < 7; i++){
            possibleMoves.push([row, i + 1])
        }
      }
      if(c1Closest != -1){
        while(c1Closest != 0){
            possibleMoves.push([row - c1Closest, col]);
            c1Closest -= 1;
        }
      }else{
        for(let i = row; i > 0; i--){
            possibleMoves.push([row - i, col])
        }
      }
      if(c2Closest != -1){
        while(c2Closest != 0){
            possibleMoves.push([row + c2Closest, col])
            c2Closest -= 1;
        }
      }else{
        for(let i = row; i < 7; i++){
            possibleMoves.push([i + 1, col])
        }
      }
      console.log(possibleMoves);
      break;
  }
  return possibleMoves;
};
const checkAttacks = (
  distance: number,
  direction: Array<string>,
  board: Array<string[]>,
  row: number,
  col: number,
  team: string
): number[][] => {
  //l: left
  //r: right,
  //dr: diag right,
  //dl: diag left,
  //f: forward
  //b: backward
  //br: backrightdiag
  //bl: backleftdiag
  //h: horse --handle in function
  let attacks: Array<number[]> = [];

  //attacks will hold all of the attacks a peice can make.
  //[ [3,2],[4,5] ]etc.
  console.log(direction);

  if (direction.includes("dr")) {
    // doesnt account for same team TODO
    //only accounts for pawns right now
    // col + distance (change later)
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
