let gameBoard = (function () {
   let _gameBoard = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN];

   let toggle = true;

   let createNewGame = (a, b) => {
      let player_1 = createPlayer(a, "x");
      let player_2 = createPlayer(b, "o");
      gameBoard.players = { player_1, player_2 };
   };

   let currentPlayer = () => {
      if (toggle) {
         toggle = !toggle;
         return gameBoard.players.player_1;
      } else if (!toggle) {
         toggle = !toggle;
         return gameBoard.players.player_2;
      }
   };

   let bindDomToGameBoard = (a) => {
      _gameBoard[a.getAttribute("id")] = a.innerText;
      // console.log(_gameBoard);
   };
   let checkResult = () => {
      // check the rows
      for (let i = 0; i <= 6; i += 3) {
         if (
            _gameBoard[i] === _gameBoard[i + 1] &&
            _gameBoard[i + 1] === _gameBoard[i + 2]
         )
            return `winner is ${_gameBoard[i]}`;
      }
      // check the columns
      for (let i = 0; i <= 3; i += 1) {
         if (
            _gameBoard[i] === _gameBoard[i + 3] &&
            _gameBoard[i + 3] === _gameBoard[i + 6]
         )
            return `winner is ${_gameBoard[i]}`;
      }
      // check cross
      if (
         (_gameBoard[0] == _gameBoard[4] && _gameBoard[4] == _gameBoard[8]) ||
         (_gameBoard[2] == _gameBoard[4] && _gameBoard[4] == _gameBoard[6])
      ) {
         return `winner is ${_gameBoard[4]}`;
      }

      return _gameBoard.every((a) => a == "x" || a == "o")
         ? "tie"
         : "keep play";
   };

   return {
      currentPlayer,
      createNewGame,
      bindDomToGameBoard,
      checkResult,
      _gameBoard,
   };
})();

// ***************************************

let displayController = (function () {
   let gameBoardFields = document.querySelectorAll("button");

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
         console.log(gameBoard.checkResult());
      })
   );

   let fillTheGameBoard = () => {
      let counter = 0;
      gameBoardFields.forEach((a) => {
         a.innerText = gameBoard._gameBoard[counter];
         counter++;
      });
   };

   return {
      fillTheGameBoard,
   };
})();

// **********************
let createPlayer = function (name, role) {
   let score = 0;

   return { name, score, role };
};
gameBoard.createNewGame("d", "f");
