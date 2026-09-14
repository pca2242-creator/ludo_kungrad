let turn = 'red'; // O'yinni qizil boshlaydi
let redPosition = 0;
let bluePosition = 0;

function rollDice() {
    // 1 dan 6 gacha tasodifiy son olish
    const diceValue = Math.floor(Math.random() * 6) + 1;
    document.getElementById('dice-result').innerText = diceValue;
    
    const status = document.getElementById('status-text');
    
    if (turn === 'red') {
        redPosition += diceValue;
        // Toshni vizual surish (oddiylik uchun o'ngga suriladi)
        document.getElementById('red1').style.transform = translateX(${redPosition * 5}px);
        status.innerText = Qizil ${diceValue} qadam yurdi.;
        
        // Navbatni ko'kka berish
        turn = 'blue';
        document.getElementById('dice-btn').style.backgroundColor = '#4da6ff';
    } else {
        bluePosition += diceValue;
        // Toshni vizual surish (chapga suriladi)
        document.getElementById('blue1').style.transform = translateX(-${bluePosition * 5}px);
        status.innerText = Ko'k ${diceValue} qadam yurdi.;
        
        // Navbatni qizilga berish
        turn = 'red';
        document.getElementById('dice-btn').style.backgroundColor = '#ff4d4d';
    }
}