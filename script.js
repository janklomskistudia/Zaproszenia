// --- KOD EFEKTU MATRIX (CANVAS) ---
function runMatrixEffect() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    // Ustawiamy canvas na pełny ekran
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    // Znaki, które będą spadać (możesz dodać japońskie katakana dla realizmu)
    // const characters = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZQWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
    const charArray = characters.split('');

    const fontSize = 16;
    const columns = canvas.width / fontSize; // Liczba kolumn znaków

    // Tablica przechowująca pozycję Y dla każdej kolumny
    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1; // Każda kolumna zaczyna od góry (Y=1)
    }

    // Funkcja rysująca klatkę animacji
    function draw() {
        // Tło z lekką przezroczystością, co daje efekt "smugi" za znakami
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#00ff46"; // Kolor znaków (neonowy zielony)
        ctx.font = fontSize + "px monospace"; // Używamy monospace

        // Rysujemy znaki
        for (let i = 0; i < drops.length; i++) {
            // Losowy znak z naszej puli
            const text = charArray[Math.floor(Math.random() * charArray.length)];

            // Rysujemy znak w kolumnie i na aktualnej wysokości Y
            // x = i * fontSize, y = drops[i] * fontSize
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Jeśli znak doszedł do dołu ekranu LUB losowo zdecydujemy (dla efektu losowości)
            // resetujemy go na górę
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            // Przesuwamy znak w dół
            drops[i]++;
        }
    }

    // Odpalamy animację - 30 klatek na sekundę
    setInterval(draw, 33);

    // Obsługa zmiany rozmiaru okna
    window.addEventListener('resize', () => {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        // Opcjonalnie: zresetuj liczbę kolumn, jeśli drastycznie zmieniono rozmiar
    });
}


// --- TWOJA BAZA DANYCH (BEZ ZMIAN) ---
const guestList = {
    "kuba123": { name: "Kuba", photo: "images/kuba.jpg" },
    "ania789": { name: "Ania", photo: "images/ania.png" },
    // ...
};

// --- LOGIKA LOGOWANIA (BEZ ZMIAN) ---
function checkLogin() {
    const codeInput = document.getElementById('passcode');
    const code = codeInput.value.toLowerCase().trim();
    loginUser(code);
}

function loginUser(code) {
    const errorMsg = document.getElementById('error-msg');

    if (guestList[code]) {
        localStorage.setItem('guestCode', code);
        showInvitation(code);
        if (!sessionStorage.getItem('confettiDone')) {
            launchConfetti();
            sessionStorage.setItem('confettiDone', 'true');
        }
    } else {
        if (errorMsg) errorMsg.style.display = 'block';
        codeInput.style.borderColor = 'red';
    }
}

function showInvitation(code) {
    const user = guestList[code];
    document.getElementById('welcome-text').innerText = `Cześć ${user.name}!`;
    document.getElementById('user-photo').src = user.photo;

    document.getElementById('login-section').style.display = 'none';
    document.getElementById('invitation-section').style.display = 'block';
}

function logout() {
    localStorage.removeItem('guestCode');
    sessionStorage.removeItem('confettiDone');
    location.reload();
}

function init() {
    // !!! WAŻNE: Odpalamy efekt Matrixa przy starcie !!!
    runMatrixEffect();

    const urlParams = new URLSearchParams(window.location.search);
    const codeFromUrl = urlParams.get('k');

    if (codeFromUrl && guestList[codeFromUrl]) {
        loginUser(codeFromUrl);
        return;
    }

    const savedCode = localStorage.getItem('guestCode');
    if (savedCode && guestList[savedCode]) {
        showInvitation(savedCode);
    }
}

// Funkcja konfetti - bez zmian
function launchConfetti() {
    // Może warto zmienić kolory konfetti na zielone/czarne dla klimatu?
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00ff46', '#111', '#fff']
    });
}

window.onload = init;