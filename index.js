let gameBoard = (function () {
   let _gameBoard = ["j", "x", "o", "x", "x", "o", "x", "o", "x"];
   let toggle = true;

   let createNewGame = (a, b) => {
      let player_1 = createPlayer(a, "x");
      let player_2 = createPlayer(b, "o");

      gameBoard.players = { player_1, player_2 };
   };

   let currentPlayer = () => {
      if (toggle) {
         toggle = !toggle;
         // console.log(toggle);
         return gameBoard.players.player_1;
      } else if (!toggle) {
         toggle = !toggle;
         // console.log(toggle);
         return gameBoard.players.player_2;
      }
   };
   return {
      currentPlayer,
      createNewGame,
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
