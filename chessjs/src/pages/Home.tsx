import React, { useState } from "react";
import Box from "../components/Box";

const Home = () => {
  const [selected, setSelected] = useState({
    peice: "",
    team: "",
    row: -1,
    col: -1,
  });

  const [testboard, setTestBoard] = useState([
    ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"],
    ["pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["wpawn", "wpawn", "wpawn", "wpawn", "wpawn", "wpawn", "wpawn", "wpawn"],
    [
      "wrook",
      "wknight",
      "wbishop",
      "wqueen",
      "wking",
      "wbishop",
      "wknight",
      "wrook",
    ],
  ]);
  const handleOnClick = (
    peice: string,
    team: string,
    row: number,
    col: number
  ) => {
    console.log(peice, team);
    if (selected.peice == "" && selected.team == "") {
      setSelected({ peice, team, row, col });
      return;
    }else{
        //handle moving the peice to the new location, dont worry about peice rules at the moment
        console.log('test move')
        const newBoard = [...testboard]; //create a copy of the board
        newBoard[row][col] = selected.peice; //copy the peice to the new board at the selected location
        newBoard[selected.row][selected.col] = ""; //remove the peice from the old location
        setTestBoard(newBoard); //update board with new board copy
        setSelected({ peice: "", team: "", row: -1, col: -1 });

    }
  };
  //evvery peice needs a unique id probably
  //highlight a piece when clicked

  let board = [];
  for (let i = 0; i < 8; i++) {
    let row = [];
    for (let j = 0; j < 8; j++) {
      const piece = testboard[i][j];
      if (piece) {
        const team = piece.startsWith("w") ? "white" : "black";
        const pieceType = piece.startsWith("w") ? piece.slice(1) : piece;
        row.push(
          <Box
            key={`${i}-${j}`}
            peice={pieceType}
            team={team}
            canMoveTo={true}
            onClick={() => handleOnClick(pieceType, team, i, j)}
            isSelected={selected.row === i && selected.col === j}
          />
        );
        console.log(i, j);
      } else {
        row.push(
          <Box
            key={`${i}-${j}`}
            peice=""
            team=""
            canMoveTo={true}
            onClick={() => handleOnClick("", "", i, j)}
            isSelected={selected.row === i && selected.col === j}
          />
        );
      }
    }
    board.push(
      <div key={i} className="row">
        {row}
      </div>
    );
  }

  return <div className="board">{board}</div>;
};

export default Home;
