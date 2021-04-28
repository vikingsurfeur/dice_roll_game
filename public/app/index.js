// BUNCH OF VARIABLES

const 
    btnNewGame            = document.querySelector('#btnNewGame'),
    btnRollDice           = document.querySelector('#btnRollDice'),
    btnHold               = document.querySelector('#btnHold'),
    playerOneInterface    = document.querySelector('#playerOneInterface'),
    playerTwoInterface    = document.querySelector('#playerTwoInterface'),
    playerOneBar          = document.querySelector('#progressBar__0'),
    playerTwoBar          = document.querySelector('#progressBar__1'),
    playerBar             = [playerOneBar, playerTwoBar],
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
    winningScore          = 100,
    rollAudio             = new Audio('../public/audio/dice_roll.mp3'),
    holdAudio             = new Audio('../public/audio/hold_score.wav'),
    looseAudio            = new Audio('../public/audio/loose_one.wav'),
    winAudio              = new Audio('../public/audio/win_game.wav');  

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

    playerBar.forEach((setZero) => {
        setZero.style.width = 0;
    });

    playersInterface.forEach((setUnactive) => {
        setUnactive.classList.remove('active');
    })
    playerOneInterface.classList.add('active');
}

function rollDice(event) {
    event.preventDefault();

    if (gamePlay) {
        chanceNumber = Math.floor(Math.random() * numberOfDiceFace + 1);
        let indexChanceNumber = chanceNumber - 1;
        faceResult.setAttribute('src', diceFace[indexChanceNumber]);

        rollAudio.play();

        currentRolls[currentPlayer]++;

        if (chanceNumber !== 1) {
            currentScore += chanceNumber;
            document.querySelector('#currentScorePlayer__' + currentPlayer).textContent = currentScore;
        } else {
            setTimeout(() => {
                looseAudio.play();
            }, 500);

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

function holdTheScore(event) {
    event.preventDefault();
    
    if (gamePlay) {
        globalScore[currentPlayer] += currentScore;
        document.querySelector('#globalScorePlayer__' + currentPlayer).textContent = globalScore[currentPlayer];

        document.querySelector('#progressBar__' + currentPlayer).style.width = globalScore[currentPlayer] + '%';

        holdAudio.play();

        currentScore = 0;
        document.querySelector('#currentScorePlayer__' + currentPlayer).textContent = currentScore;

        if (globalScore[currentPlayer] >= winningScore) {
            document.querySelector("#globalScorePlayer__" + currentPlayer).textContent =
                "You're the Winner by " +
                currentRolls[currentPlayer] +
                " of dice rolls.";
            
            winAudio.play();

            btnRollDice.classList.add('disabled');
            btnHold.classList.add('disabled');

            setTimeout(() => {
                btnRollDice.classList.remove('disabled');
                btnHold.classList.remove('disabled');
                newGame();
            }, 5000);
        }
        
        changePlayer();
    }
}