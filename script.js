//easy words
const easyWords = [
  { word: "Door", hint: "Clue: You open it" },
  { word: "Fish", hint: "Clue: Lives in water" },
  { word: "Book", hint: "Clue: You read it" },
  { word: "Ball", hint: "Clue: Used in games" },
  { word: "Tree", hint: "Clue: Has leaves" },
  { word: "Lamp", hint: "Clue: Gives light" },
  { word: "Ring", hint: "Clue: Worn on finger" },
  { word: "Cake", hint: "Clue: Sweet dessert" },
  { word: "Fire", hint: "Clue: It burns" },
  { word: "Sand", hint: "Clue: Found on beach" },
  { word: "Milk", hint: "Clue: White drink" },
  { word: "Wind", hint: "Clue: Moves trees" },
  { word: "Rain", hint: "Clue: Comes from clouds" },
  { word: "Moon", hint: "Clue: In the night sky" },
  { word: "Rock", hint: "Clue: Hard material" },
  { word: "Gold", hint: "Clue: Precious metal" },
  { word: "Cold", hint: "Clue: Opposite of hot" },
  { word: "Snow", hint: "Clue: Falls in winter" },
  { word: "Iron", hint: "Clue: Used to press clothes" },
  { word: "Star", hint: "Clue: Shines at night" }
];

//medium words
const mediumWords = [
  { word: "Apple", hint: "Clue: A red fruit" },
  { word: "Chair", hint: "Clue: You sit on it" },
  { word: "Water", hint: "Clue: You drink it" },
  { word: "Stars", hint: "Clue: Comes out at night" },
  { word: "Piano", hint: "Clue: Musical instrument" },
  { word: "Grass", hint: "Clue: Grows on ground" },
  { word: "Shirt", hint: "Clue: Worn on body" },
  { word: "Brush", hint: "Clue: Used for hair" },
  { word: "Bread", hint: "Clue: You eat it" },
  { word: "Drink", hint: "Clue: Opposite of eat" },
  { word: "Light", hint: "Clue: Bright thing" },
  { word: "Plant", hint: "Clue: Grows in soil" },
  { word: "Sweet", hint: "Clue: Sugary taste" },
  { word: "Stone", hint: "Clue: Small rock" },
  { word: "World", hint: "Clue: The Earth" },
  { word: "Glass", hint: "Clue: Breakable cup" },
  { word: "Cloud", hint: "Clue: In the sky" },
  { word: "Sound", hint: "Clue: You hear it" },
  { word: "Bread", hint: "Clue: Toast it" },
  { word: "Brush", hint: "Clue: For painting" }
];

//difficult words
const difficultWords = [
  { word: "Puzzle", hint: "Clue: Something to solve" },
  { word: "Rocket", hint: "Clue: Flies into space" },
  { word: "Garden", hint: "Clue: Where flowers bloom" },
  { word: "Laptop", hint: "Clue: Portable computer" },
  { word: "Window", hint: "Clue: Lets you see outside" },
  { word: "Pencil", hint: "Clue: Used to write" },
  { word: "Candle", hint: "Clue: Gives light" },
  { word: "Shadow", hint: "Clue: Follows you in light" },
  { word: "Orange", hint: "Clue: A citrus fruit" },
  { word: "Flight", hint: "Clue: Airplane journey" },
  { word: "Circle", hint: "Clue: Round shape" },
  { word: "Button", hint: "Clue: Press to start" },
  { word: "Bridge", hint: "Clue: Over a river" },
  { word: "Father", hint: "Clue: Male parent" },
  { word: "Guitar", hint: "Clue: Has six strings" },
  { word: "Breeze", hint: "Clue: Soft wind" },
  { word: "Bottles", hint: "Clue: Holds liquids" },
  { word: "Basket", hint: "Clue: Used to carry things" },
  { word: "Kitten", hint: "Clue: Baby cat" },
  { word: "Castle", hint: "Clue: A royal home" }
];


let score=0;
let totalRounds =5;
let round=0;
let gameOver=false;
let recentWords = [];
let recentLimit = 15;


function startGame(wordsList) {
    if(round>totalRounds){
        alert("Game Over!");
        gameOver=true;
        return;
    }
    round++;
    //display score and round
    let displayScore=document.querySelector(".score");
    displayScore.textContent=`  PTS:${score}`;
    let displayRound=document.querySelector(".round");
    displayRound.textContent=`Round: ${round} `;

    let selectedWord;

do {
    selectedWord = wordsList[Math.floor(Math.random() * wordsList.length)];
} while (recentWords.includes(selectedWord.word) && recentWords.length < wordsList.length);

// Add to recentWords
recentWords.push(selectedWord.word);

// Maintain recent limit
if (recentWords.length > recentLimit) {
    recentWords.shift();
}

    let container = document.querySelector(".word");
    //select word  
    container.innerHTML = "";
    //boxes for selected word
    for (let i = 0; i < selectedWord.word.length; i++) {
        let box = document.createElement("div")
        box.classList.add("box");
        container.appendChild(box);
    }
    //letters to display
    let letterCount = Math.floor(Math.random() * 3) + 1;
    const boxes = document.querySelectorAll(".box");
    let index;
    let indeces = [];
    //display letters
    for (let i = 0; i < letterCount;) {
        index = Math.floor(Math.random() * selectedWord.word.length);

        if (!indeces.includes(index)) {
            indeces.push(index);
            boxes[index].textContent = selectedWord.word[index];
            i++;
        }

    }
    //input boxes
    for (let i = 0; i < selectedWord.word.length; i++) {
        if (!indeces.includes(i)) {
            let inputBox = document.createElement("input");
            inputBox.setAttribute("type", "text");
            inputBox.setAttribute("maxLength", "1");
            boxes[i].appendChild(inputBox);
        }
       
    }
    //display hint
    let hint = document.querySelector(".hint");
    hint.textContent = selectedWord.hint;

    //check input
    let check = document.querySelector(".check");
    let result = document.querySelector(".result");
    let display = document.querySelector(".display");
    display.querySelector("p").textContent = "";
    result.textContent = "";
    
    let newCheck = check.cloneNode(true); 
    
    check.parentNode.replaceChild(newCheck, check); 

    newCheck.addEventListener("click", () => {
        if(gameOver) return;
        let allCorrect = true;
        for (let i = 0; i < boxes.length; i++) {
            const input = boxes[i].querySelector("input");
            if (input) {
                const userInput = input.value.toUpperCase();
                const correctLetter = selectedWord.word[i].toUpperCase();
                if (userInput === "") {
                    allCorrect = false;
                    input.style.backgroundColor = "#f4cc87ff";
                }
                else if (userInput === correctLetter) {
                    input.style.backgroundColor = "rgb(121, 179, 34)";
                }
                else if (userInput !== correctLetter) {
                    allCorrect = false;
                    input.style.backgroundColor = "rgb(188, 19, 19)";
                }

            }
        }
        if (allCorrect ) {
            score+=10;
            result.style.display="none";
            result.textContent = "Correct!";
            result.style.backgroundColor = "green";
            displayScore.textContent=`PTS: ${score} `;
        }
        else if (!allCorrect ) {
             result.style.display="none";
            result.textContent = "Wrong";
            result.style.backgroundColor = "red";
        }
        else{
        alert("Game Over!");
        score=0;
        round=0;
        }

        //disable inputs
        for (let i = 0; i < boxes.length; i++) {
            const input = boxes[i].querySelector("input");
            if (input) {
                input.disabled = true;
            }
        }

     //display correct word
     setTimeout(()=>{
        for (let i = 0; i < selectedWord.word.length; i++) {
        if (!indeces.includes(i)) {
        boxes[i].textContent = selectedWord.word[i];
           }
        }
        setTimeout(()=>{
          if(round<totalRounds){
            startGame(wordsList);
          } else{
            gameOver=true;
            alert("Game Over!");
          }
        },3000);

     },1000);
    

    });
}



// click Start Button
let start=document.querySelector(".play");
let startScreen=document.querySelector(".startScreen");
let intro=document.querySelector(".intro")
start.addEventListener("click",()=>{
    setTimeout(()=>{
        intro.style.display="none";
    startScreen.style.display="flex";
    },1000);
});

//choose difficulty level
let play=document.querySelector(".start");
play.disabled=true;
let easy=document.querySelector(".easy");
let ease=false;
let medium=document.querySelector(".medium");
let med=false;
let difficult=document.querySelector(".difficult");
let diff=false;
easy.addEventListener("click",()=>{
    play.disabled=false;
    ease=true;
    easy.style.animation="none";
    easy.style.backgroundColor="#4c4cff";
    
})
medium.addEventListener("click",()=>{
    play.disabled=false;
    med=true;
    medium.style.animation="none";
    medium.style.backgroundColor="#4c4cff";
    
})
difficult.addEventListener("click",()=>{
    play.disabled=false;
    diff=true;
    difficult.style.animation="none";
    difficult.style.backgroundColor="#4c4cff";
    
})
let main=document.querySelector(".container");

//click play
play.addEventListener("click",()=>{
    if(ease && !med && !diff){
       startScreen.style.display="none";
       main.style.display="flex";
       const words=[...easyWords];
       startGame(words);
    }
    else if(med && !ease && !diff){
        startScreen.style.display="none";
       main.style.display="flex";
       const words=[... mediumWords];
       startGame(words);
    }
    else if(diff && !ease && !med){
     startScreen.style.display="none";
       main.style.display="flex";
       const words=[... difficultWords];
       startGame(words);
    }
    else if(!ease&& !med &&!diff){
        alert("Pick a level !");
    }
});