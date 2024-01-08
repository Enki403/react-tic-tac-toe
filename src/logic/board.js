import { WINNER_COMBOS } from "../constants";

export const checkWinnerFor = (boardToCheck)=>{
    for(const combo of WINNER_COMBOS){
        const [first, second, third] = combo;
        if(
        boardToCheck[first] &&
        boardToCheck[first] === boardToCheck[second] &&
        boardToCheck[first] === boardToCheck[third]
        ){
        return boardToCheck[first];
        }
    }
    return null;
}

export const checkEndGameFor = (boardToCheck) => {
    return boardToCheck.every(cell=>cell!==null);
}