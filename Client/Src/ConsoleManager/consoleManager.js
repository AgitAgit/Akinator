//Matan suggests I add a typing sound for each "keystroke"
//of the updateScreen effect.

//Maybe break it into separate functions. On to write 
//sentences that will be pretty quick(50 miliseconds delay 
//for each character?) and a slower one for a small
//delay at the end of each word.

const screenText = document.querySelector("#screen-text");

const testText = "This is a test for the update screen.\nTell all the truth but tell it slant\nsuccess in circuit lies\nToo bright for our infirm delight\nthe truths superb surprise\nAs lightning to the children eased\nwith explanation kind\nThe truth must dazzle gradually\nor every man be blind";

// const click1 = new Audio('./Assets/Sounds/key-press-263640.mp3');

const clickSound = document.getElementById('click-sound-1');
const yesButton = document.getElementById('yes');
document.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
    console.log("yes button clicked");
    clickSound.play();
}));

//could add a click sound to all buttons with query selector all

export const initScreen = function(){
    screenText.textContent = "test2 test2 test2";
    const intervalId = setInterval(screenFlicker, 1500);
    updateScreen(testText);
}

export const updateScreen = function(text, counter = 0){
    if(counter === 0){
        clearScreen();
    }
    if(counter === text.length){
        return;
    }
    screenText.textContent += text.charAt(counter);
    setTimeout(() => updateScreen(text, counter + 1), 100);
}

async function screenFlicker(){
    screenOff();
    setTimeout(screenOn, 100);
}

function screenOn(){
    screenText.classList.remove("hidden");
}

function screenOff(){
    screenText.classList.add("hidden");
}

function clearScreen(){
    screenText.textContent = "";
}