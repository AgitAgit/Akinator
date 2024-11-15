//Matan suggests I add a typing sound for each "keystroke"
//of the updateScreen effect.

//Maybe break it into separate functions. On to write 
//sentences that will be pretty quick(50 milliseconds delay 
//for each character?) and a slower one for a small
//delay at the end of each word.

//Will replacing the p element with text area allow me to enter line breaks?
//Maybe I should just attach spans and <br> elements for each sentence
//In the update screen function.

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
    const intervalId = setInterval(screenFlicker, 1500);
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
    // if(counter % 40 === 0){
    //     document.querySelector(".screen-text").textContent += `\n${text.charAt(counter)}`;
    //     setTimeout(() => updateScreen(text, counter + 1), 1);//change back after testing
    // }
    // else{
        document.querySelector(".screen-text").textContent += text.charAt(counter);
        setTimeout(() => updateScreen(text, counter + 1), 1);//change back after testing
    // }
}

async function screenFlicker(){
    screenOff();
    setTimeout(screenOn, 100);
}

function screenOn(){
    document.querySelector(".screen-text")?.classList.remove("hidden");
}

function screenOff(){
    document.querySelector(".screen-text")?.classList.add("hidden");
}

function clearScreen(){
    document.querySelector(".deviceScreen").innerHTML = "";
}

function playRandomClick(){}