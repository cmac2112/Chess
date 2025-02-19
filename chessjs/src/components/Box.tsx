import React from 'react'
import './Box.css'
//this will hold a box to hold the pieces, chess board is 8x8
//need some sort of event handler to detect if this component is clicked as well, could just be a simple button

interface BoxProps {
    peice: string;
    team: string;
    canMoveTo: boolean; //dont know what else we may need here
    onClick: () => void;
    isSelected: boolean;
}
const Box: React.FC<BoxProps> = ({
    peice,
    team,
    canMoveTo,
    onClick,
    isSelected

}) => {

  return (
    <div className={`box ${isSelected ? 'highlight' : ''}`} onClick={() => { onClick(); }}>
      {peice}
    </div>
  )
}

export default Box
