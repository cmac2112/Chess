//main method to handle calculation game should only call this method, 
// similar to a Iservice from c#

import { PeiceAtGivenPosition } from "./Utilities";

//ai will always play team black
export const HandleAICalculation = (board: Array<string[]>, difficulty: string | null): number[] =>{
    let move: number[] = [];
    if(difficulty == "easy"){
      const test = CalculateFavorableMoveEasy(board)
    }

    return move;
}
const CalculateHighestPointValueAiCanReach = (board: Array<string[]>, pointBoard: Array<string[]>): number[][] => {
    let move:number[][] = [];

    return move;
}
const CalculateFavorableMoveEasy = (board: Array<string[]>): number[][] => {
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
            console.log(piece)
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
                            defaultPointsBoard[r][c] -= 1000
                          break;
                        case "knight":
                            defaultPointsBoard[r][c] -= 1000
                          break;
                        case "rook":
                            defaultPointsBoard[r][c] -= 1000
                          break;
                        case "bishop":
                            defaultPointsBoard[r][c] -= 1000
                          break;
                        case "king":
                            defaultPointsBoard[r][c] -= 1000
                          break;
                        case "queen":
                            defaultPointsBoard[r][c] -= 1000
                          break;
            }
        }
    }

    //iterate throughthe board, assign default points 
    console.log(defaultPointsBoard)
    console.log(board);
    return defaultPointsBoard
}