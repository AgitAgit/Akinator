import { registerUser, loginUser } from "./Communication_Center/userData.js";
import { prompt, restartSession, restartGame } from "./Communication_Center/gptData.js";
import { initScreen } from "./ConsoleManager/consoleManager.js";

const yesButton = document.querySelector("#yes");
const noButton = document.querySelector("#no");
const maybeButton = document.querySelector("#maybe");

document.querySelectorAll(".choice-button").forEach(button => {
    button.addEventListener('click', (event) => handleChoiceButtonClick(event));
})

const defaultUser = {
    fName: "guest",
    userName: "guest",
    password: "guest",
    email: "guest"
}

let mode = 'pre-game';

async function startGame(user = defaultUser){
    console.log("Trying to login user...");
    const data = await loginUser(user.email, user.password);
    mode = 'game';
    console.log("mode:", mode, "data:", data);
}

function handleChoiceButtonClick(event){
    const text = event.target.textContent;
    console.log("handle choice button click says:", text);
    if(mode === 'game'){
        prompt(token, text);
    }
}

initScreen();

startGame();

//main flow:
//Show the menu in the console -> start as guest -> initGame


//menu options: start as guest, login(opens login/signup page)