import React from 'react'
import './Box.css'
import {useState, useEffect} from 'react'
//this will hold a box to hold the pieces, chess board is 8x8
//need some sort of event handler to detect if this component is clicked as well, could just be a simple button

interface BoxProps {
    peice: string;
    team: string;
    onClick: () => void;
    isSelected: boolean;
}
const Box: React.FC<BoxProps> = ({
    peice,
    team,
    onClick,
    isSelected

}) => {
  const [imagePath, setImagePath] = React.useState<string>('');

  useEffect(() =>{
    const loadImage = async () => {
      if(!peice || peice == "") {
        setImagePath('');
        return;
      }
      try{
        if (team === "white") {
          const image = await import(`../assets/white/${peice}.svg`);
          setImagePath(image.default);
        }else if (team === "black") {
          const image = await import(`../assets/black/${peice}.svg`);
          setImagePath(image.default);
        }
      } catch (error) {
        console.error(error);
        setImagePath('');
      }
    }
    loadImage();
  }, [peice, team]);

  return (
    <div className={`box ${isSelected ? 'highlight' : ''}`} onClick={() => { onClick(); }}>
      {imagePath && (
      <img
        src={imagePath}
        alt="peice"
        className="peice"
  />
      )}
    </div>
  )
}


export default Box
