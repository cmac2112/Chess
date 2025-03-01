# Chess in react

This is a simple remaking of chess in react using no outside sources or help as much as possible

## List of times i queried AI, Count: 1
1. Had an issue where captures were not being processed correctly
```
switch (peice){
        case "wpawn":
          possibleMoves.current = getPossiblePawnMoves(row, col, team, testboard);
          break;
        case "pawn":
          possibleMoves.current = getPossiblePawnMoves(row, col, team, testboard);
          break;
      }
      setSelected({ peice, team, row, col });
      return;


if (selected.peice == "" && selected.team == "") {
      
      console.log('selected', peice, team, row, col) //initial selection of a peice
      
    } else if (selected.col === col && selected.row === row) { //handle selecting the same item again to deselect
      console.log('resetting')
        setSelected({ peice: "", team: "", row: -1, col: -1 })
    }else if(selected.peice != "" && team != "" && selected.team != team) { //capture selection of a peice
      //handle capturing a peice
      console.log('capture', peice, team, row, col)
      console.log('capturer', selected.peice, selected.team, selected.row, selected.col)
      
      //check to see if the capture move is valid
      if (possibleMoves.current) {
        const isValidMove = possibleMoves.current.some(
          ([r, c]) => r === row && c === col
        );
      if(isValidMove){
        console.log('move is valid')
      
      const newBoard = [...testboard];
      newBoard[row][col] = "";
      newBoard[selected.row][selected.col] = ""
      newBoard[row][col] = selected.peice
      
      setTestBoard(newBoard);
      setSelected({peice: "", team: "", row: -1, col: -1})
      }
      }
```
this was happening because when a user selects a piece initially, that piece gets stored in the state where they can then select another box on the board to 'move' that piece to. However when capturing a piece, the possible moves were being calculate because it automatically happens at the top of the function so it would alter the array of moves before checking them to see if it was a valid move which would give bad results.

The fix was to move the possible move calculations after the selection of the piece which will also allow me to color moves in css eventually as well

<u>AI did not figure this out</u>



<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>







# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
