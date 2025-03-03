const game = (function() {
    let gameboard = ["", "", "", "", "", "", "", "", ""];
    
    const addPlayer = function(name, marker) {
        return {
            name: name,
            marker: marker
        };
    } 

    const playerOne = addPlayer("Player One", "X");
    const playerTwo = addPlayer("Player Two", "O");

    let currentPlayer = playerOne;

    const playerTurnSwitch = function() {
        if (currentPlayer === playerTwo) {
            currentPlayer = playerOne;
        } else {
            currentPlayer = playerTwo;
        }
    }

    const addMarker = function(i) {
        if (gameboard[i] === "")  {
            gameboard[i] = currentPlayer.marker;
            console.log(gameboard);
            winCheck();
        }
    }

    const gameOver = function() {
        document.querySelectorAll('.square').forEach(element => {
            element.style = "pointer-events: none";
        });
    }

    document.querySelectorAll('.square').forEach((square, index) => {
        square.addEventListener("click", (event) => {
            clickHandler(event, index);
        });
    });

    const clickHandler = function(event, index) {
        if (gameboard[index] === "") {
            addMarker(index); 
            event.target.textContent = currentPlayer.marker;
            playerTurnSwitch();
            currentPlayerArrow();
        }
    }

    const winCheck = function() {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (gameboard[a] && gameboard[a] === gameboard[b] && gameboard[a] === gameboard[c]) {
                gameOver();
                displayWinner(gameboard[a]);
                return gameboard[a];
                
            }
        }
        return null;
    }

    let playerOneWins = 0;
    let playerTwoWins = 0;

    const displayWinner = function(winningMarker) {
        const winnerDiv = document.querySelector(".winner-container")
        const playerOneWinsDiv = document.querySelector(".player-one-wins")
        const playerTwoWinsDiv = document.querySelector(".player-two-wins")
        
        if (winningMarker === "X" || winningMarker === "O") {
            gameOver();
            if (winningMarker === "X") {
                playerOneWins++;
                winnerDiv.textContent = playerOneNameDiv.textContent + " Wins!";
                playerOneWinsDiv.textContent = "Wins : " + playerOneWins;
            } else {
                playerTwoWins++;
                winnerDiv.textContent = playerTwoNameDiv.textContent + " Wins!";
                playerTwoWinsDiv.textContent = "Wins : " + playerTwoWins;
            }
        }

    }

    const resetButton = document.getElementById('reset-button');
    const newGameButton = document.getElementById('new-game-button');

    const newGame = function() {
        const winnerDiv = document.querySelector(".winner-container")
        const playerOneWinsDiv = document.querySelector(".player-one-wins")
        const playerTwoWinsDiv = document.querySelector(".player-two-wins")
        document.querySelectorAll('.square').forEach(element => {
            element.style = "pointer-events: auto";
        });
        document.querySelectorAll(".square").forEach((element) => {
        element.textContent = '';
        }) 
        document.querySelector(".winner-container").textContent = "";
        gameboard = ["", "", "", "", "", "", "", "", ""]
    }

    const reset = function() {
        const winnerDiv = document.querySelector(".winner-container")
        const playerOneWinsDiv = document.querySelector(".player-one-wins")
        const playerTwoWinsDiv = document.querySelector(".player-two-wins")
        document.querySelectorAll(".square").forEach((element) => {
            element.textContent = '';
            }) 
            document.querySelectorAll('.square').forEach(element => {
                element.style = "pointer-events: auto";
            });
        winnerDiv.textContent = "";
        playerOneWins = 0;
        playerTwoWins = 0;
        playerOneWinsDiv.textContent = "Wins : " + playerOneWins;
        playerTwoWinsDiv.textContent = "Wins : " + playerTwoWins;
        gameboard = ["", "", "", "", "", "", "", "", ""]
    }

    resetButton.addEventListener('click', reset);
    newGameButton.addEventListener('click', newGame);

    const playerOneSubmit = document.getElementById("player-one-submit");
    const playerTwoSubmit = document.getElementById("player-two-submit");
    const playerOneNameDiv = document.getElementById("player-one-name-div");
    const playerTwoNameDiv = document.getElementById("player-two-name-div");
    const playerOneInputText = document.getElementById("player-one-input-text");
    const playerTwoInputText = document.getElementById("player-two-input-text");

    playerOneSubmit.addEventListener('click', () => {
        playerOneNameDiv.textContent = playerOneInputText.value;
        playerOneInputText.remove();
        playerOneSubmit.remove();
    });

    playerTwoSubmit.addEventListener('click', () => {
        playerTwoNameDiv.textContent = playerTwoInputText.value;
        playerTwoInputText.remove();
        playerTwoSubmit.remove();
    });

    const currentPlayerContainer = document.querySelector(".current-player-container");

    const currentPlayerArrow = function() {
        if (currentPlayer === playerOne) {
            currentPlayerContainer.textContent = "←";
        } else {
            currentPlayerContainer.textContent = "→";
        }
    }

    currentPlayerArrow();

    return {
        
    };
})();