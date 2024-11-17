import './GameConsole.css';
import react, { useState, useEffect, createContext } from 'react';
import Screen from '../Screen/Screen.jsx';
import InputArea from '../InputArea/InputArea.jsx';

//Here I will track the current logged in user, the current game mode(waiting-for-server, game, menu,...)


function GameConsole(){

    return(
        <div className="wrap-original-transform">
            <div className="original-transform">
                <div className="game-console game-console-front">
                    <Screen/>
                    <InputArea/>
                </div>
                <div className='game-console-bottom'>what face is this</div>
                <div className='game-console-right rightSide'>what face is this</div>
            </div>
        </div>
    )
}

export default GameConsole;