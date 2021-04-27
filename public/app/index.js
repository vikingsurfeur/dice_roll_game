// BUNCH OF VARIABLES

const 
    btnNewGame            = document.querySelector('#btnNewGame'),
    btnRollDice           = document.querySelector('#btnRollDice'),
    btnHold               = document.querySelector('#btnHold'),
    playerOneInterface    = document.querySelector('#playerOneInterface'),
    playerTwoInterface    = document.querySelector('#playerTwoInterface'),
    playersInterface      = [playerOneInterface, playerTwoInterface],
    faceResult            = document.querySelector('#diceFace'),
    numberOfDiceFace      = 6,
    faceOne               = './img/dice_img/dice_one.png',
    faceTwo               = './img/dice_img/dice_two.png',
    faceThree             = './img/dice_img/dice_three.png',
    faceFour              = './img/dice_img/dice_four.png',
    faceFive              = './img/dice_img/dice_five.png',
    faceSix               = './img/dice_img/dice_six.png',
    diceFace              = [faceOne, faceTwo, faceThree, faceFour, faceFive, faceSix],
    winningScore          = 100;

let 
    globalScorePlayerOne  = document.querySelector('#globalScorePlayer__0'),
    currentScorePlayerOne = document.querySelector('#currentScorePlayer__0'),
    globalScorePlayerTwo  = document.querySelector('#globalScorePlayer__1'),
    currentScorePlayerTwo = document.querySelector('#currentScorePlayer__1'),
    scoreDisplay          = [globalScorePlayerOne, currentScorePlayerOne, globalScorePlayerTwo, currentScorePlayerTwo],
    globalScore,
    gamePlay,
    currentRolls,
    currentScore,
    currentPlayer,
    chanceNumber;

// LISTENERS

btnNewGame.addEventListener('click', newGame);
btnRollDice.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdTheScore);

// INTIALIZING THE GAME

newGame();

// FUNCTIONS

function newGame() {
    globalScore = [0, 0];
    gamePlay = true;
    currentRolls = [0, 0];
    currentScore = 0;
    currentPlayer = 0;

    scoreDisplay.forEach((setZero) => {
        setZero.textContent = '0';
    });

    playersInterface.forEach((setUnactive) => {
        setUnactive.classList.remove('active');
    })
    playerOneInterface.classList.add('active');
}

function rollDice(event) {
    event.stopPropagation();

    if (gamePlay) {
        chanceNumber = Math.floor(Math.random() * numberOfDiceFace + 1);
        let indexChanceNumber = chanceNumber - 1;
        faceResult.setAttribute('src', diceFace[indexChanceNumber]);

        currentRolls[currentPlayer]++;

        if (chanceNumber !== 1) {
            currentScore += chanceNumber;
            document.querySelector('#currentScorePlayer__' + currentPlayer).textContent = currentScore;
        } else {
            changePlayer();
        }
    }
}

function changePlayer() {
    currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);

    currentScore = 0;
    currentScorePlayerOne.textContent = '0';
    currentScorePlayerTwo.textContent = '0';

    playersInterface.forEach((setActive) => {
        setActive.classList.toggle('active');
    });
}

function holdTheScore() {
    if (gamePlay) {
        globalScore[currentPlayer] += currentScore;
        document.querySelector('#globalScorePlayer__' + currentPlayer).textContent = globalScore[currentPlayer];
        
        currentScore = 0;
        document.querySelector('#currentScorePlayer__' + currentPlayer).textContent = currentScore;

        if (globalScore[currentPlayer] >= winningScore) {
            document.querySelector("#globalScorePlayer__" + currentPlayer).textContent =
                "You're the Winner by " +
                currentRolls[currentPlayer] +
                " of dice rolls.";

            btnRollDice.classList.add('disabled');
            btnHold.classList.add('disabled');

            setTimeout(() => {
                btnRollDice.classList.remove('disabled');
                btnHold.classList.remove('disabled');
                newGame();
            }, 3000);
        }
    }
}