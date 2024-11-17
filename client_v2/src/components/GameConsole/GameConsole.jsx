import './GameConsole.css';
import react, { useState, useEffect, createContext } from 'react';
import Screen from '../Screen/Screen.jsx';
import InputArea from '../InputArea/InputArea.jsx';

//Here I will track the current logged in user, the current game mode(waiting-for-server, game, menu,...)


function GameConsole(){

    return(
        <div className="game-console">
            <Screen/>
            <InputArea/>
        </div>
    )
}

export default GameConsole;