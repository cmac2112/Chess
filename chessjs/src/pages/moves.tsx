const checkAttacks = (distance: number, direction: Array<string>, board: Array<string[]>, row:number, col: number, team: string): number[][] => {
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

    if(direction.includes('dr')) {
        //check for attacks in diagright position
        if(board[row + 1][col + 1] != ""){
            attacks.push([row + 1, col + 1])
        }
    }
    if(direction.includes('dl')){
        console.log('dl')
        if(board[row - 1][col - 1] != ""){
            attacks.push([row - 1, col - 1])
        }
    }
    //console.log('new possible attacks', attacks)
    return attacks;
}
export const getPossiblePawnMoves = (row: number, col: number, team: string, board: Array<string[]>): number[][] =>{
	//calculate moves based off of the current position, make sure moves are not invalid and off of the board,
    // if the pawn is not in its starting position do not allow it to move two spaces

    let possibleMoves: Array<number[]> = [];
    switch(team){
        case "white":
            //check for attacks first
            //wont worry about enpessants for now because i dont even know what they are
            let attacks: Array<number[]> = checkAttacks(1, ['dr', 'dl'], board, row, col, team);
            console.log(attacks);
            if(row == 6){ //starting position
                possibleMoves.push([row - 1, col], [row - 2, col])
                //check for attacks
                if((board[row - 1][col - 1]) != ""){
                    possibleMoves.push([row - 1, col - 1])
                }
                if((board[row - 1][col + 1]) != ""){
                    possibleMoves.push([row - 1, col + 1])
                }

            }else{
                //check for promotion later
                possibleMoves.push([row - 1, col])
            }

            possibleMoves = possibleMoves.concat(attacks)
            console.log(possibleMoves)
            break;
    
    }

    return possibleMoves;
	
}