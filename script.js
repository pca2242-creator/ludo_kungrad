let currentTurn = 'red'; // O'yinni Qizil boshlaydi

function playTurn() {
    // 1 dan 6 gacha tasodifiy son (Zark natijasi)
    const diceValue = Math.floor(Math.random() * 6) + 1;
    
    // Zark qutisida sonni ko'rsatish
    const diceBox = document.getElementById('dice-view');
    diceBox.innerText = diceValue;
    
    const turnText = document.getElementById('turn-text');
    
    // Hamma toshlardan qimirlash animatsiyasini olib tashlash
    removeAnimations();

    if (currentTurn === 'red') {
        // Qizil o'yinchining toshlarini faollashtirish (sakrash effekti)
        document.getElementById('red-p1').style.animation = "bounce 0.5s infinite alternate";
        document.getElementById('red-p2').style.animation = "bounce 0.5s infinite alternate";
        
        // Keyingi navbatni Ko'kka o'tkazish
        currentTurn = 'blue';
        turnText.innerHTML = Navbat: <span style="color: #4da6ff; font-weight: bold;">Ko'k</span>;
    } else {
        // Ko'k o'yinchining toshlarini faollashtirish
        document.getElementById('blue-p1').style.animation = "bounce 0.5s infinite alternate";
        document.getElementById('blue-p2').style.animation = "bounce 0.5s infinite alternate";
        
        // Keyingi navbatni Qizilga o'tkazish
        currentTurn = 'red';
        turnText.innerHTML = Navbat: <span style="color: #ff4d4d; font-weight: bold;">Qizil</span>;
    }
}

function removeAnimations() {
    document.getElementById('red-p1').style.animation = "none";
    document.getElementById('red-p2').style.animation = "none";
    document.getElementById('blue-p1').style.animation = "none";
    document.getElementById('blue-p2').style.animation = "none";
}