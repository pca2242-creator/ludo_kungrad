let currentTurn = 'red';
let currentDice = 1;
let hasRolled = false;

// Toshlarning pozitsiyasi (0 - uyda, 1 dan 12 gacha - kataklarda)
let positions = {
    'red-p1': 0, 'red-p2': 0,
    'blue-p1': 0, 'blue-p2': 0
};

function playTurn() {
    if (hasRolled) return;

    currentDice = Math.floor(Math.random() * 6) + 1;
    document.getElementById('dice-view').innerText = currentDice;
    hasRolled = true;

    // Harakatlana oladigan toshlarni qimirlatish (sakrash animatsiyasi)
    highlightPieces();
}

function highlightPieces() {
    let pieces = currentTurn === 'red' ? ['red-p1', 'red-p2'] : ['blue-p1', 'blue-p2'];
    let canMoveAny = false;

    pieces.forEach(id => {
        let currentPos = positions[id];
        // Ludo qoidasi: Uydan chiqish uchun 6 kerak, yo'ldagilar esa istalgan songa yuraveradi
        if ((currentPos === 0 && currentDice === 6) || currentPos > 0) {
            document.getElementById(id).classList.add('active-piece');
            canMoveAny = true;
        }
    });

    // Agar yura oladigan bitta ham tosh bo'lmasa, avtomat navbat almashadi
    if (!canMoveAny) {
        setTimeout(() => {
            hasRolled = false;
            switchTurn();
        }, 1200);
    }
}

function movePiece(player, pieceNum) {
    if (!hasRolled) return;
    if (player !== currentTurn) return;

    let pieceId = ${player}-p${pieceNum};
    let currentPos = positions[pieceId];

    // 1. Uydan chiqish (Faqat 6 chiqqanda va uyda bo'lsa)
    if (currentPos === 0 && currentDice === 6) {
        positions[pieceId] = player === 'red' ? 1 : 2; // Qizil 1-katakka, Ko'k 2-katakka chiqadi
        placePieceOnBoard(pieceId, positions[pieceId]);
    } 
    // 2. Yo'lakda harakatlanish
    else if (currentPos > 0) {
        let nextPos = currentPos + currentDice;
        
        // Kataklar soni 12 ta, undan o'tib ketsa marraga yetadi
        if (nextPos <= 12) {
            positions[pieceId] = nextPos;
            placePieceOnBoard(pieceId, nextPos);
        } else {
            alert(player + " o'yinchisi marraga yetdi! 🎉");
            document.getElementById(pieceId).style.display = 'none'; // Toshni o'chirish
        }
    } else {
        // Agar uyda tursa va 6 chiqmagan bo'lsa, bosganda yurmaydi
        return;
    }

    // Tozalash va navbatni berish
    removeHighlights();
    hasRolled = false;
    switchTurn();
}

function placePieceOnBoard(pieceId, cellNum) {
    const piece = document.getElementById(pieceId);
    const targetCell = document.getElementById(cell-${cellNum});
    
    if (targetCell) {
        targetCell.appendChild(piece); // Toshni uyidan sug'urib, katak ichiga joylaydi
        piece.style.transform = "none"; // Eski surilishlarni nol qiladi
    }
}

function removeHighlights() {
    document.querySelectorAll('.piece').forEach(p => p.classList.remove('active-piece'));
}

function switchTurn() {
    const turnText = document.getElementById('turn-text');
    if (currentTurn === 'red') {
        currentTurn = 'blue';
        turnText.innerHTML = Navbat: <span style="color: #3498db; font-weight: bold;">Ko'k</span>;
    } else {
        currentTurn = 'red';
        turnText.innerHTML = Navbat: <span style="color: #e74c3c; font-weight: bold;">Qizil</span>;
    }
}