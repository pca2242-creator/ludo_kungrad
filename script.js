let currentTurn = 'red';

function playTurn() {
    // 1 dan 6 gacha tasodifiy son chiqarish
    const diceValue = Math.floor(Math.random() * 6) + 1;
    document.getElementById('dice-view').innerText = diceValue;
    const turnText = document.getElementById('turn-text');

    if (currentTurn === 'red') {
        currentTurn = 'blue';
        turnText.innerHTML = Navbat: <span style="color: #3498db; font-weight: bold;">Ko'k</span>;
    } else {
        currentTurn = 'red';
        turnText.innerHTML = Navbat: <span style="color: #e74c3c; font-weight: bold;">Qizil</span>;
    }
}