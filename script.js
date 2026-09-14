let currentTurn = 'red';

function playTurn() {
    const diceValue = Math.floor(Math.random() * 6) + 1;
    document.getElementById('dice-view').innerText = diceValue;
    const turnText = document.getElementById('turn-text');

    if (currentTurn === 'red') {
        currentTurn = 'blue';
        turnText.innerHTML = Navbat: <span style="color: #4da6ff; font-weight: bold;">Ko'k</span>;
    } else {
        currentTurn = 'red';
        turnText.innerHTML = Navbat: <span style="color: #ff4d4d; font-weight: bold;">Qizil</span>;
    }
}