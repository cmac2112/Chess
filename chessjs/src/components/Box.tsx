import React from 'react'
//this will hold a box to hold the pieces, chess board is 8x8
//need some sort of event handler to detect if this component is clicked as well, could just be a simple button

interface BoxProps {
    peice: string;
    team: string;
    canMoveTo: boolean; //dont know what else we may need here
}
const Box: React.FC<BoxProps> = ({
    peice,
    team,
    canMoveTo

}) => {

    console.log(peice, team, canMoveTo);
  return (
    <div className='box'>
      {peice}
    </div>
  )
}

export default Box
