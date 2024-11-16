//Matan suggests I add a typing sound for each "keystroke"
//of the updateScreen effect.

//Matan suggest longer spans between text flicker.

//Maybe break it into separate functions. On to write 
//sentences that will be pretty quick(50 milliseconds delay 
//for each character?) and a slower one for a small
//delay at the end of each word.

//Will replacing the p element with text area allow me to enter line breaks?
//Maybe I should just attach spans and <br> elements for each sentence
//In the update screen function.

//Need to add a "loading content..." message.

const screen = document.querySelector(".deviceScreen");

const testText = "This is a test for the update screen.\nTell all the truth but tell it slant\nsuccess in circuit lies\nToo bright for our infirm delight\nthe truths superb surprise\nAs lightning to the children eased\nwith explanation kind\nThe truth must dazzle gradually\nor every man be blind";

// const click1 = new Audio('./Assets/Sounds/key-press-263640.mp3');

const clickSound = document.getElementById('click-sound-1');
const yesButton = document.getElementById('yes');
document.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
    console.log("yes button clicked");
    clickSound.play();
}));

//could add a click sound to all buttons with query selector all

export const initScreen = function(message){
    const intervalId = setInterval(screenFlicker, 3000);
    updateScreen(message);
}

export const updateScreen = function(text, counter = 0){
    if(counter === 0){
        clearScreen();
        const screenText = document.createElement("p");
        screenText.classList.add("screen-text");
        screen.appendChild(screenText);
    }

    if(counter === text.length){
        return;
    }
    
    document.querySelector(".screen-text").textContent += text.charAt(counter);
    setTimeout(() => updateScreen(text, counter + 1), 30);
}

function gradualText(element, text, counter = 0){
    if(counter === 0){
        const screenText = element;
        screenText.classList.add("screen-text");
    }

    if(counter === text.length){
        return;
    }
    
    element.textContent += text.charAt(counter);
    setTimeout(() => gradualText(element, text, counter + 1), 30);
}

async function screenFlicker(){
    screenOff();
    setTimeout(screenOn, 100);
}

function screenOn(){
    document.querySelectorAll(".screen-text")?.forEach(textItem => textItem.classList.remove("hidden"));
}

function screenOff(){
    document.querySelectorAll(".screen-text")?.forEach(textItem => textItem.classList.add("hidden"));
}

function clearScreen(){
    document.querySelector(".deviceScreen").innerHTML = "";
}

export async function displayMenu(markerIndex){
    clearScreen();
    const options = [];
    for(let i = 0; i < 3; i++){
        const item = document.createElement('p');
        item.classList.add("screen-text");
        const newLine = document.createElement('br');
        if(i == 0){
            item.textContent += "Log in";
        }
        if(i == 1){
            item.textContent += "Sign up";
        }
        if(i == 2){
            item.textContent += "Return to game";
        }
        if(i === 0){
            item.textContent += '<';
        }
        screen.appendChild(item);
        screen.appendChild(newLine);
    }
}