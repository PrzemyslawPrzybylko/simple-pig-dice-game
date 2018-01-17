var scores, roundScores, activePlayer, gamePlaying, previousDice;
function namePlayers(className) {
	var elements = document.getElementsByClassName(className);
	var i = 0;
	while (i < elements.length) {
		elements[i].textContent = prompt("Name Player " + (i + 1), "Player " + (i + 1));
		i++;
	}
}
function init() {
	gamePlaying = true;
	scores = [0,0];
	activePlayer = 0;
	roundScores = 0;
	document.querySelector(".dice").style.display = "none";
	document.getElementById("score-0").textContent = "0";
	document.getElementById("score-1").textContent = "0";
	document.getElementById("current-0").textContent = "0";
	document.getElementById("current-1").textContent = "0";
	document.querySelector(".player-0-panel").classList.remove("winner");
	document.querySelector(".player-1-panel").classList.remove("winner");
	document.querySelector(".player-0-panel").classList.remove("active");
	document.querySelector(".player-1-panel").classList.remove("active");
	document.querySelector(".player-0-panel").classList.add("active");
	namePlayers("player-name");
}
function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScores = 0;
	document.getElementById("current-0").textContent = "0";
	document.getElementById("current-1").textContent = "0";
	document.querySelector(".player-0-panel").classList.toggle("active");
	document.querySelector(".player-1-panel").classList.toggle("active");
	document.querySelector(".dice").style.display = "none";
}
init();
document.querySelector(".btn-roll").addEventListener("click", function() {
	if (gamePlaying) {
		var dice = Math.floor(Math.random() * 6) + 1;
		var diceDOM = document.querySelector(".dice");
		diceDOM.style.display = "block";
		diceDOM.src = "dice-" + dice + ".png";
		if (dice !== 1) {
			if (dice === 6 && previousDice === 6) {
				scores[activePlayer] = 0;
				document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];	
				nextPlayer();
			} else {
				roundScores += dice;
				previousDice = dice;
				document.querySelector("#current-" + activePlayer).textContent = roundScores;
		}
		} else {
			nextPlayer();
		}
	}
});
document.querySelector(".btn-hold").addEventListener("click", function(){
	if (gamePlaying) {
		var finalScore;
		scores[activePlayer] += roundScores;
		document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
		var input = document.querySelector(".final-score").value;
		finalScore = input > 0 ? input : 50;
		if (scores[activePlayer] >= finalScore) {
			document.querySelector("#name-" + activePlayer).textContent = "Winner!";
			document.querySelector(".dice").style.display = "none";
			document.querySelector(".player-"+activePlayer+"-panel").classList.add("winner");
			document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");
			gamePlaying = false;
		} else {
			nextPlayer();
		}
	}
})
document.querySelector(".btn-new").addEventListener("click",init);
