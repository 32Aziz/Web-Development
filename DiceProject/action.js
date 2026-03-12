let player1Score = 0;
let player2Score = 0;

function rollDice() {
  let randomNumber1 = Math.floor(Math.random() * 6) + 1;
  let player1 = document.getElementById("img-1");

  let randomNumber2 = Math.floor(Math.random() * 6) + 1;
  let player2 = document.getElementById("img-2");

  player1.setAttribute("src", "./sample/images/dice" + randomNumber1 + ".png");
  player2.setAttribute("src", "./sample/images/dice" + randomNumber2 + ".png");

  let title = document.getElementById("title");

  if (randomNumber1 > randomNumber2) {
    title.textContent = "Player 1 Win 🤩";
    player1Score++;
  } else if (randomNumber2 > randomNumber1) {
    title.textContent = "Player 2 Win 🤩";
    player2Score++;
  } else {
    title.textContent = "Draw 🤝";
  }

  document.getElementById("score1").textContent = "Score: " + player1Score;
  document.getElementById("score2").textContent = "Score: " + player2Score;
}
