import { removeIntersection, FindAGivenPeice, RemovePeiceAtPosition } from "./Utilities";

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
      let attacks: Array<number[]> = [];

      if (
        row - 1 >= 0 &&
        col + 1 <= 7 &&
        board[row - 1][col + 1] != "" &&
        !board[row - 1][col + 1].startsWith("w")
      ) {
        attacks.push([row - 1, col + 1]);
      }

      if (
        row - 1 >= 0 &&
        col - 1 >= 0 &&
        board[row - 1][col - 1] != "" &&
        !board[row - 1][col - 1].startsWith("w")
      ) {
        attacks.push([row - 1, col - 1]);
      }
      if (row == 6) {
        //starting position
        possibleMoves.push([row - 2, col]);
      }
      //check for promotion later
      if (row - 1 >= 0 && board[row - 1][col] == "") {
        possibleMoves.push([row - 1, col]);
      }

      possibleMoves = possibleMoves.concat(attacks);
      break;
    case "black":
      let blackAttacks: Array<number[]> = [];

      if (
        row + 1 <= 7 &&
        col + 1 <= 7 &&
        board[row + 1][col + 1] != "" &&
        board[row + 1][col + 1].startsWith("w")
      ) {
        blackAttacks.push([row + 1, col + 1]);
      }

      if (
        row + 1 <= 7 &&
        col - 1 >= 0 &&
        board[row + 1][col - 1] != "" &&
        board[row + 1][col - 1].startsWith("w")
      ) {
        blackAttacks.push([row + 1, col - 1]);
      }

      if (row == 1) {
        possibleMoves.push([row + 2, col]);
      }

      if (row + 1 <= 7 && board[row + 1][col] == "") {
        possibleMoves.push([row + 1, col]);
      }

      possibleMoves = possibleMoves.concat(blackAttacks);
  }
  return possibleMoves;
};

export const getPawnAttacksForKingMoveCalculation = (
  row: number,
  col: number,
  team: string
): number[][] => {
  //just return the col + 1 row +- 1 for each pawn depending on the team here
  //should individually call this for each pawn on the board so just return this

  // no out of bounds checking so come back to this if index errors happen
  if (team == "black") {
    return [
      [row + 1, col + 1],
      [row + 1, col - 1],
    ];
  }
  if (team == "white") {
    return [
      [row - 1, col + 1],
      [row - 1, col - 1],
    ];
  }

  return [];
};
export const getPossibleBishopMoves = (
  row: number,
  col: number,
  team: string,
  board: Array<string[]>,
  returnAttackingSquares: boolean = false
): number[][] => {
  let possibleMoves: Array<number[]> = [];

  let boardCopy = board.map(row => [...row]);

  console.log("test'")

  switch (team) {
    case "white":
       if(returnAttackingSquares){
  const blackKingPosition = FindAGivenPeice(boardCopy, "king")
  
  if(blackKingPosition != null){
    boardCopy = RemovePeiceAtPosition(boardCopy, blackKingPosition);
  }
}

    //up right
    let UpRight:Array<number[]> = [];
    for(let r = row; r >= 0; r--){
      for(let c = col; c <=7; c++){
        if(boardCopy[r][c] === ""){
          UpRight.push([r, c]);
          continue;
        }
        if(!boardCopy[r][c].startsWith("w")){
          UpRight.push([r, c]);
          break;
        }
        break;
      }
    }
    let UpLeft: Array<number[]> = [];
    for(let r = row; r >= 0; r--){
      for(let c = col; c >= 0; c--){
        if(boardCopy[r][c] === ""){
          UpLeft.push([r, c])
          continue;
        }
        if(!boardCopy[r][c].startsWith("w")){
          UpLeft.push([r, c])
          break;
        }
        break;
      }
    }
    let downRight: Array<number[]> = [];
    for(let r = row; r <= 7; r++){
      for(let c = col; c <= 7; c++){
        if(boardCopy[r][c] === ""){
          downRight.push([r, c])
          continue;
        }
        if(!boardCopy[r][c].startsWith("w")){
          downRight.push([r, c])
          break;
        }
        break;
      }
    }

    let downLeft: Array<number[]> = [];
    for(let r = row; r <= 7; r++){
      for(let c = col; c >= 0; c--){
        if(boardCopy[r][c] === ""){
          downLeft.push([r, c])
          continue;
        }
        if(!boardCopy[r][c].startsWith("w")){
          downLeft.push([r, c])
          break;
        }
        break;
      }
    }
      possibleMoves = possibleMoves.concat(
        UpRight,
        UpLeft,
        downLeft,
        downRight
      );
      console.log(possibleMoves)
      break;
    case "black":

    if(returnAttackingSquares){
  const whiteKingPosition = FindAGivenPeice(boardCopy, "wking")
  
  if(whiteKingPosition != null){
    boardCopy = RemovePeiceAtPosition(boardCopy, whiteKingPosition);
  }
}

    //up right
    let UpRightBlack:Array<number[]> = [];
    for(let r = row - 1; r >= 0; r--){
      for(let c = col + 1; c <=7; c++){
        if(boardCopy[r][c] === ""){
          UpRightBlack.push([r, c]);
          continue;
        }
        if(boardCopy[r][c].startsWith("w")){
          UpRightBlack.push([r, c]);
          break;
        }
        break;
      }
    }
    let UpLeftBlack: Array<number[]> = [];
    for(let r = row - 1; r >= 0; r--){
      for(let c = col - 1; c >= 0; c--){
        if(boardCopy[r][c] === ""){
          UpLeftBlack.push([r, c])
          continue;
        }
        if(boardCopy[r][c].startsWith("w")){
          UpLeftBlack.push([r, c])
          break;
        }
        break;
      }
    }
    let downRightBlack: Array<number[]> = [];
    for(let r = row + 1; r <= 7; r++){
      for(let c = col + 1; c <= 7; c++){
        if(boardCopy[r][c] === ""){
          downRightBlack.push([r, c])
          continue;
        }
        if(boardCopy[r][c].startsWith("w")){
          downRightBlack.push([r, c])
          break;
        }
        break;
      }
    }

    let downLeftBlack: Array<number[]> = [];
    for(let r = row + 1; r <= 7; r++){
      for(let c = col - 1; c >= 0; c--){
        if(boardCopy[r][c] === ""){
          downLeftBlack.push([r, c])
          continue;
        }
        if(boardCopy[r][c].startsWith("w")){
          downLeftBlack.push([r, c])
          break;
        }
        break;
      }
    }
    possibleMoves = possibleMoves.concat(
        UpRightBlack,
        UpLeftBlack,
        downLeftBlack,
        downRightBlack
      );
      break;
  }

  return possibleMoves;
};
export const getPossibleRookMoves = (
  row: number,
  col: number,
  team: string,
  board: Array<string[]>,
  returnAttackingSquares: boolean = false //option to return the attacking squares by removing the king
  //should only be used when getting king moves calculation
): number[][] => {
  let possibleMoves: Array<number[]> = [];


  let boardCopy = board.map(row => [...row]);

  switch (team) {
    case "white":

    if(returnAttackingSquares){
  const blackKingPosition = FindAGivenPeice(boardCopy, "king")
  
  if(blackKingPosition != null){
    boardCopy = RemovePeiceAtPosition(boardCopy, blackKingPosition);
  }
}
      //build it from the peice out

      //north
      let rookMoveNorth: Array<number[]> = [];

      for (let i = row - 1; i >= 0; i--) {
        if (boardCopy[i][col] === "") {
          rookMoveNorth.push([i, col]);
          continue;
        }
        if (!boardCopy[i][col].startsWith("w")) {
          rookMoveNorth.push([i, col]);
          break;
        }
        break;
      }
      let rookMoveSouth: Array<number[]> = [];
      for (let i = row + 1; i <= 7; i++) {
        if (boardCopy[i][col] === "") {
          rookMoveSouth.push([i, col]);
          continue;
        }
      
        if (!boardCopy[i][col].startsWith("w")) {
          rookMoveSouth.push([i, col]);
          break;
        }
        break;
      }

      // East
      let rookMoveEast: Array<number[]> = [];
      for (let j = col + 1; j <= 7; j++) {
        if (boardCopy[row][j] === "") {
          rookMoveEast.push([row, j]);
          continue;
        }
        if (!boardCopy[row][j].startsWith("w")) {
          rookMoveEast.push([row, j]);
          break;
        }
        break;
      }

      // West
      let rookMoveWest: Array<number[]> = [];
      for (let j = col - 1; j >= 0; j--) {
        if (boardCopy[row][j] === "") {
          rookMoveWest.push([row, j]);
          continue;
        }
        if (!boardCopy[row][j].startsWith("w")) {
          rookMoveWest.push([row, j]);
          break;
        }
        break;
      }

      // Combine all directions
      possibleMoves = possibleMoves.concat(
        rookMoveNorth,
        rookMoveSouth,
        rookMoveEast,
        rookMoveWest
      );

      break;
    case "black":

    if(returnAttackingSquares){
  const whiteKingPosition = FindAGivenPeice(boardCopy, "wking")
  
  if(whiteKingPosition != null){
    boardCopy = RemovePeiceAtPosition(boardCopy, whiteKingPosition);
  }
}
      let rookMoveNorthBlack: Array<number[]> = [];

      for (let i = row - 1; i >= 0; i--) {
        if (boardCopy[i][col] === "") {
          rookMoveNorthBlack.push([i, col]);
          continue;
        }
        if (boardCopy[i][col].startsWith("w")) {
          rookMoveNorthBlack.push([i, col]);
          break;
        }
        break;
      }
      let rookMoveSouthBlack: Array<number[]> = [];
      for (let i = row + 1; i <= 7; i++) {
        if (boardCopy[i][col] === "") {
          rookMoveSouthBlack.push([i, col]);
          continue;
        }
        if (boardCopy[i][col].startsWith("w")) {
          rookMoveSouthBlack.push([i, col]);
          break;
        }
        break;
      }

      // East
      let rookMoveEastBlack: Array<number[]> = [];
      for (let j = col + 1; j <= 7; j++) {
        if (boardCopy[row][j] === "") {
          rookMoveEastBlack.push([row, j]);
          continue;
        }
        if (boardCopy[row][j].startsWith("w")) {
          rookMoveEastBlack.push([row, j]);
          break;
        }
        break;
      }

      // West
      let rookMoveWestBlack: Array<number[]> = [];
      for (let j = col - 1; j >= 0; j--) {
        if (boardCopy[row][j] === "") {
          rookMoveWestBlack.push([row, j]);
          continue;
        }
        if (boardCopy[row][j].startsWith("w")) {
          rookMoveWestBlack.push([row, j]);
          break;
        }
        break;
      }

      // Combine all directions
      possibleMoves = possibleMoves.concat(
        rookMoveNorthBlack,
        rookMoveSouthBlack,
        rookMoveEastBlack,
        rookMoveWestBlack
      );
      break;
  }
  return possibleMoves;
};

export const getPossibleKnightMoves = (
  row: number,
  col: number,
  team: string,
  board: Array<string[]>
): number[][] => {
  let possibleMoves: Array<number[]> = [];

  //investigate better way to do this, this hurts my eyes

  if (
    row - 2 >= 0 &&
    col - 1 >= 0 &&
    ((team == "white"
      ? !board[row - 2][col - 1].startsWith("w")
      : board[row - 2][col - 1].startsWith("w")) ||
      board[row - 1][col - 2] == "")
  ) {
    possibleMoves.push([row - 2, col - 1]);
  }
  if (
    row - 1 >= 0 &&
    col - 2 >= 0 &&
    ((team == "white"
      ? !board[row - 1][col - 2].startsWith("w")
      : board[row - 1][col - 2].startsWith("w")) ||
      board[row - 1][col - 2] == "")
  ) {
    possibleMoves.push([row - 1, col - 2]);
  }
  //second quadrant
  if (
    row - 2 >= 0 &&
    col + 1 <= 7 &&
    ((team == "white"
      ? !board[row - 2][col + 1].startsWith("w")
      : board[row - 2][col + 1].startsWith("w")) ||
      (board[row - 2][col + 1] == "" && board[row - 2][col + 1] != undefined))
  ) {
    possibleMoves.push([row - 2, col + 1]);
  }
  if (
    row - 1 >= 0 &&
    col + 2 <= 7 &&
    ((team == "white"
      ? !board[row - 1][col + 2].startsWith("w")
      : board[row - 1][col + 2].startsWith("w")) ||
      board[row - 1][col + 2] == "")
  ) {
    possibleMoves.push([row - 1, col + 2]);
  }
  //third
  if (
    row + 1 <= 7 &&
    col + 2 <= 7 &&
    ((team == "white"
      ? !board[row + 1][col + 2].startsWith("w")
      : board[row + 1][col + 2].startsWith("w")) ||
      board[row + 1][col + 2] == "")
  ) {
    possibleMoves.push([row + 1, col + 2]);
  }
  if (
    row + 2 <= 7 &&
    col + 1 <= 7 &&
    ((team == "white"
      ? !board[row + 2][col + 1].startsWith("w")
      : board[row + 2][col + 1].startsWith("w")) ||
      board[row + 2][col + 1] == "")
  ) {
    possibleMoves.push([row + 2, col + 1]);
  }
  //forth
  if (
    row + 1 <= 7 &&
    col - 2 >= 0 &&
    ((team == "white"
      ? !board[row + 1][col - 2].startsWith("w")
      : board[row + 1][col - 2].startsWith("w")) ||
      board[row + 1][col - 2] == "")
  ) {
    possibleMoves.push([row + 1, col - 2]);
  }
  if (
    row + 2 <= 7 &&
    col - 1 >= 0 &&
    ((team == "white"
      ? !board[row + 2][col - 1].startsWith("w")
      : board[row + 2][col - 1].startsWith("w")) ||
      board[row + 2][col - 1] == "")
  ) {
    possibleMoves.push([row + 2, col - 1]);
  }

  return possibleMoves;
};

export const getPossibleKingMoves = (
  row: number,
  col: number,
  team: string,
  board: Array<string[]>
): Array<number[]> => {
  let otherTeamMoves: Array<number[]> = [];

  for (let i = 0; i <= 7; i++) {
    for (let k = 0; k <= 7; k++) {
      let peice = board[i][k];


      if (team == "white") {
        const otherTeam = "black"; // todo, put this in a this in some sort of enum or something
        switch (peice) {
          case "":
            break;
          case "pawn":
            otherTeamMoves = otherTeamMoves.concat(
              getPawnAttacksForKingMoveCalculation(i, k, otherTeam)
            );
            break;
          case "knight":
            otherTeamMoves = otherTeamMoves.concat(
              getPossibleKnightMoves(i, k, otherTeam, board)
            );
            break;
          case "bishop":
            otherTeamMoves = otherTeamMoves.concat(
              getPossibleBishopMoves(i, k, otherTeam, board, true)
            );
            break;
          case "rook":
            otherTeamMoves = otherTeamMoves.concat(
              getPossibleRookMoves(i, k, otherTeam, board, true)
            );
            break;
          case "queen":
            otherTeamMoves = otherTeamMoves.concat(
              getPossibleQueenMoves(i, k, otherTeam, board, true)
            );
            break;
          case "king":
            otherTeamMoves = otherTeamMoves.concat(getDefaultKingMoves(i, k));
            break;
          default:
            break;
        }
      } else {
        const otherTeam = "white";
        switch (peice) {
          case "":
            break;
          case "wpawn":
            otherTeamMoves = otherTeamMoves.concat(
              getPawnAttacksForKingMoveCalculation(i, k, otherTeam)
            );
            break;
          case "wknight":
            otherTeamMoves = otherTeamMoves.concat(
              getPossibleKnightMoves(i, k, otherTeam, board)
            );
            break;
          case "wbishop":
            otherTeamMoves = otherTeamMoves.concat(
              getPossibleBishopMoves(i, k, otherTeam, board, true)
            );
            break;
          case "wrook":
            otherTeamMoves = otherTeamMoves.concat(
              getPossibleRookMoves(i, k, otherTeam, board, true)
            );
            break;
          case "wqueen":
            otherTeamMoves = otherTeamMoves.concat(
              getPossibleQueenMoves(i, k, otherTeam, board, true)
            );
            break;
          case "wking":
            // checkmate issue lies with this method
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
    [row + 1, col + 1],
  ];

  // i need to get all of the attack squares rather than just calculating their moves here
  // so remove the king and simulate the attacks from the other team would be the easy way

  // or re-write a bunch of methods
  const validKingMoves = removeIntersection(kingMoves, otherTeamMoves);

  const filteredKingMoves = validKingMoves.filter(([r, c]) => {
    // Check if the move is within bounds
    const inBounds = r >= 0 && r <= 7 && c >= 0 && c <= 7;

    if (!inBounds) {
      return false;
    }

    // Check if the destination square is valid for the "white" team
    if (team == "white") {
      const isValidForWhite = !board[r][c]?.startsWith("w");
      return isValidForWhite;
    } else {
      const isValidForBlack =
        board[r][c] === "" || board[r][c]?.startsWith("w");
      return isValidForBlack;
    }
  });

  return filteredKingMoves;
};

const getDefaultKingMoves = (row: number, col: number): Array<number[]> => {
  let kingMoves: Array<number[]> = [
    [row - 1, col],
    [row - 1, col - 1],
    [row - 1, col + 1],
    [row, col + 1],
    [row, col - 1],
    [row + 1, col],
    [row + 1, col - 1],
    [row + 1, col + 1],
  ];
  return kingMoves;
};

export const getPossibleQueenMoves = (
  row: number,
  col: number,
  team: string,
  board: Array<string[]>,
  returnAttackingSquares: boolean = false
): Array<number[]> => {
  let possibleMoves: Array<number[]> = [];

  possibleMoves = possibleMoves.concat(
    getPossibleBishopMoves(row, col, team, board)
  );
  possibleMoves = possibleMoves.concat(
    getPossibleRookMoves(row, col, team, board, returnAttackingSquares)
  );

  return possibleMoves;
};

//still some issues regarding checkmates such as when a targing peice is threatening the king from one side
// program thinks that the king can move 1 space away since the program thinnks that space is free next turn
