let gameBoard = (function () {
   let _gameBoard = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN];

   let toggle = true;

   let createNewGame = (a, b) => {
      let player_1 = createPlayer(a, "X");
      let player_2 = createPlayer(b, "O");
      gameBoard.players = [player_1, player_2];
      let info = document.querySelector(".info");
      info.innerText = ` ${gameBoard.players[0].name} 'X' ....VS.... 'O' ${gameBoard.players[1].name} `;
   };

   let clearTheArray = () =>
      (_gameBoard = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN]);

   let currentPlayer = () => {
      if (toggle) {
         toggle = !toggle;
         return gameBoard.players[0];
      } else if (!toggle) {
         toggle = !toggle;
         return gameBoard.players[1];
      }
   };

   let bindDomToGameBoard = (a) => {
      _gameBoard[a.getAttribute("id")] = a.innerText;
      // console.log(_gameBoard);
   };
   let checkResult = () => {
      console.log(_gameBoard);
      // check the rows
      for (let i = 0; i <= 6; i += 3) {
         if (
            _gameBoard[i] === _gameBoard[i + 1] &&
            _gameBoard[i + 1] === _gameBoard[i + 2]
         )
            return `Winner is ${
               gameBoard.players.find((a) => a.role == _gameBoard[i]).name
            }`;
      }
      // check the columns
      for (let i = 0; i <= 3; i += 1) {
         if (
            _gameBoard[i] === _gameBoard[i + 3] &&
            _gameBoard[i + 3] === _gameBoard[i + 6]
         )
            return `Winner is ${
               gameBoard.players.find((a) => a.role == _gameBoard[i]).name
            }`;
      }
      // check cross
      if (
         (_gameBoard[0] == _gameBoard[4] && _gameBoard[4] == _gameBoard[8]) ||
         (_gameBoard[2] == _gameBoard[4] && _gameBoard[4] == _gameBoard[6])
      ) {
         return `Winner is ${
            gameBoard.players.find((a) => a.role == _gameBoard[4]).name
         }`;
      }

      return _gameBoard.every((a) => a == "X" || a == "O") ? "Tie!!" : 1;
   };

   return {
      currentPlayer,
      createNewGame,
      bindDomToGameBoard,
      checkResult,
      clearTheArray,
      _gameBoard,
   };
})();

// *******************************************************************************************************************************
// *******************************************************************************************************************************
// *******************************************************************************************************************************

let displayController = (function () {
   let main = document.querySelector("main");
   let gameBoardFields = document.querySelectorAll(".gameboard-field");

   let checkIfPressed = (a) => {
      if (a.getAttribute("data") == 1) {
         return;
      } else {
         a.setAttribute("data", 1);
         a.innerText = `${gameBoard.currentPlayer().role}`;
      }
   };

   gameBoardFields.forEach((a) =>
      a.addEventListener("click", (e) => {
         checkIfPressed(e.target);
         gameBoard.bindDomToGameBoard(e.target);
         let a = gameBoard.checkResult();
         showResult(a);
         console.log(a);
      })
   );

   let fillTheGameBoard = () => {
      let counter = 0;
      gameBoardFields.forEach((a) => {
         a.innerText = gameBoard._gameBoard[counter];
         counter++;
      });
   };
   // form
   let firstSection = document.querySelector(".start-new-game");
   let playerOne = document.querySelector("#player_1");
   let playerTow = document.querySelector("#player_2");
   let startNewGameBtn = document.querySelector("#start-new-game");

   startNewGameBtn.addEventListener("click", () => {
      gameBoard.createNewGame(`${playerOne.value}`, ` ${playerTow.value}`);
      firstSection.classList.toggle("hide");
      main.classList.toggle("hide");
   });
   // result display
   let resultPage = document.querySelector(".result-section");
   let resultMassage = document.querySelector(".result-massage");
   let playAgainBtn = document.querySelector("#play-again");

   let showResult = (result) => {
      if (result == 1) {
         console.log("keep playing");
         return;
      } else {
         resultPage.classList.toggle("hide");
         resultMassage.innerText = result;
         gameBoard.clearTheArray();
      }
   };
   playAgainBtn.addEventListener("click", () => {
      resultPage.classList.toggle("hide");
      gameBoardFields.forEach((a) => {
         a.innerText = "";
         a.removeAttribute("data");
      });
   });
   // --------------------RETURN
   return {
      fillTheGameBoard,
   };
})();

// **********************
let createPlayer = function (name, role) {
   let score = 0;

   return { name, score, role };
};
