import { registerUser, loginUser } from "./Communication_Center/userData.js";
import { prompt, restartSession, restartGame } from "./Communication_Center/gptData.js";
import { initScreen, updateScreen, displayMenu } from "./ConsoleManager/consoleManager.js";

const menuButton = document.querySelector("#menu");

const yesButton = document.querySelector("#yes");
const noButton = document.querySelector("#no");
const maybeButton = document.querySelector("#maybe");

const choiceButtons = [yesButton, noButton, maybeButton];

menuButton.addEventListener('click', goToMenu);
choiceButtons.forEach(button => {
    button.addEventListener('click', (event) => handleChoiceButtonClick(event));
})

const defaultUser = {
    fName: "guest",
    userName: "guest",
    password: "guest",
    email: "guest"
}

let mode = 'pre-game';
let token = '';
let startMessage = "Welcome to the akinator game!\n";

async function startGame(user = defaultUser){
    try{
        console.log("Trying to login user...");
        const data = await loginUser(user.email, user.password);
        token = data.token;
        restartSession(token);
        const response = await prompt(token, '');
        const message = `Hello ${user.fName}. ${startMessage}\n${response.response}`;;
        updateScreen(message);
        mode = 'game';
    } catch(error){
        console.log(error);
    }
}

async function handleChoiceButtonClick(event){
    const text = event.target.textContent;
    console.log("handle choice button click says:", text);
    if(mode === 'pre-game'){
        startGame(defaultUser);
    }
    if(mode === 'game'){
        const response = await prompt(token, text);
        updateScreen(response.response);
    }
}

function goToMenu(index=0){
    mode = "menu";
    displayMenu(index);
}

// initScreen("Hello. To start as a guest, press one of the choice buttons. To login or sign up, press the menu button.");
