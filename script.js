// --- TWOJA BAZA DANYCH (BEZ ZMIAN) ---
const guestList = {
    "kuba123": { name: "Kuba", task: "ognisko" },
    "ania789": { name: "Ania", task: "jedzenie" },
    "marek456": { name: "Marek", task: "impreza" },
    "agatka526": { name: "Agata Kuczyńska", task: "jedzenie" },
    "macius2137": { name: "Maciej Wojtyła", task: "impreza" },
    "wojtaskrul1": { name: "Wojciech Prigara", task: "porzadkowi" },

};

// --- SŁOWNIK ZADAŃ ---
// Tu wpisujesz własne teksty. Jeśli ktoś ma mieć inne zadanie, dodaj tu nową linijkę.
const taskDictionary = {
    "ognisko": {
        desc: "[SEKCJA: PIROTECHNIKA]\n21 wiek a my dalej w erze gdzie gdzie jedzenie robimy na ognisku. Pomóż cywilizowanym ludziom zrobić spaloną kiełbaskę. Pamiętaj o zachowaniu zasad BHP",
        contact: "KRZYSZTOF KŁOMSKI"
    },
    "zaopatrzenie": {
        desc: "[SEKCJA: ZAOPATRZENIOWA]\nSam Jezus jak się skończyło wino to musiał coś z tym zrobić. Stoły nie mogą być puste. Zapewnij by na stołach nie brakowało zaopatrzenia (zaopatrzenie będzie zapewnione)",
        contact: "AGATA KUCZYŃSKA"
    },
    "jedzenie": {
        desc: "[SEKCJA: JEDZONKO]\nNie samym chlebem (i kiełbasą) żyje człowiek. Prośba by w ramach prezentu zrobić jedną miskę jakiejś prostej sałatki / blaszkę ciasta dla urozmaicenia diety biesiadników",
        contact: "AGATA KUCZYŃSKA"
    },
    "impreza": {
        desc: "[SEKCJA: OBROŃCÓW IMPREZY]\nTwoim zadaniem jest pilnowanie głośności i playlisty. Zabwianie gości to nasz piorytet!",
        contact: "MACIEK WOJTYŁA"
    },
    "naglosnienie": {
        desc: "[SEKCJA: ŁUBUDUBU]\nDobra muzyka i światło to podstawa. Reszte zostawiam w waszych rękach",
        contact: "MARCIN HORODECKI"
    },
    "dokumentacja": {
        desc: "[SEKCJA: ARCHIWUM]\nTwoim zadaniem jest przechwytywanie obrazu. Rób zdjęcia, nagrywaj dowody zabawy. Pamiętaj: co wydarzyło się w Bazie Alfa, zostaje w chmurze (którą udostępnimy po misji).",
        contact: "?"
    },
    "porzadkowi": {
        desc: "[SEKCJA: CZYSZCZENIE ŚLADÓW]\nOperacja musi pozostać nieuchwytna. Twoim zadaniem jest dbanie o to, by puste opakowania trafiały do czarnych worków w sektorze G. Po zakończeniu misji pomoc w przywróceniu Bazy Alfa do stanu pierwotnego.",
        contact: "?"
    },
};



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

// --- LOGIKA LOGOWANIA (BEZ ZMIAN) ---
function checkLogin() {
    const codeInput = document.getElementById('passcode');
    const code = codeInput.value.toLowerCase().trim();
    loginUser(code);
}

function loginUser(code) {
    const errorMsg = document.getElementById('error-msg');
    const loginContent = document.querySelector('#login-section h1, #login-section input, #login-section button');
    const loaderContainer = document.getElementById('loader-container');
    const loaderBar = document.getElementById('loader-bar');
    const loaderStatus = document.getElementById('loader-status');

    if (guestList[code]) {
        localStorage.setItem('guestCode', code);

        // Ukrywamy błąd i inputy
        if (errorMsg) errorMsg.style.display = 'none';
        document.getElementById('passcode').style.display = 'none';
        document.querySelector('#login-section button').style.display = 'none';
        document.querySelector('#login-section h1').innerText = "DOSTĘP AUTORYZOWANY";

        // Pokazujemy loader
        loaderContainer.style.display = 'block';

        const stages = [
            { p: 5, t: "ŁĄCZENIE Z SERWEREM PROXY...", d: 1000 },
            { p: 15, t: "OMIJANIE ZAPORY FIREWALL...", d: 1500 },
            { p: 30, t: "PRZECHWYTYWANIE PAKIETÓW...", d: 800 },
            { p: 45, t: "DEKRYPCJA KLUCZA RSA_4096...", d: 2000 },
            { p: 48, t: "BŁĄD SUMY KONTROLNEJ! PONAWIANIE...", d: 1200, color: "#ff3333" },
            { p: 65, t: "SYNCHRONIZACJA BAZY DANYCH...", d: 1500, color: "#00ff46" },
            { p: 85, t: "POBIERANIE AKT AGENTA: " + guestList[code].name.toUpperCase(), d: 1500 },
            { p: 95, t: "FINALIZOWANIE SESJI...", d: 1000 },
            { p: 100, t: "DOSTĘP PRZYZNANY!", d: 500 }
        ];

        let currentStage = 0;

        const interval = setInterval(() => {
            if (currentStage < stages.length) {
                loaderBar.style.width = stages[currentStage].p + "%";
                loaderStatus.innerText = stages[currentStage].t;
                loaderStatus.style.color = stages[currentStage].color || "#00ff46";
                loaderBar.style.backgroundColor = stages[currentStage].color || "#00ff46";
                currentStage++;
            } else {
                clearInterval(interval);
                // Dopiero po zakończeniu animacji pokazujemy zaproszenie
                setTimeout(() => {
                    showInvitation(code);
                    if (!sessionStorage.getItem('confettiDone')) {
                        launchConfetti();
                        sessionStorage.setItem('confettiDone', 'true');
                    }
                }, 500);
            }
        }, 600); // Co 0.6 sekundy kolejna faza

    } else {
        if (errorMsg) errorMsg.style.display = 'block';
        document.getElementById('passcode').style.borderColor = 'red';
    }
}

function showInvitation(code) {
    const user = guestList[code];
    if (!user) return;

    document.getElementById('login-section').style.display = 'none';
    document.getElementById('invitation-section').style.display = 'block';

    // 1. Powitanie (bez zmian)
    const welcomeElement = document.getElementById('welcome-text');
    if (welcomeElement) {
        const coolGreeting = `[SYSTEM]: ZALOGOWANO\n[AGENT]: ${user.name.toUpperCase()}\n`;
        welcomeElement.style.whiteSpace = "pre-line";
        decryptEffect('welcome-text', coolGreeting);
    }

    // 2. Obsługa zadań - NOWA LOGIKA ROZDZIELANIA
    const taskSection = document.getElementById('task-section');
    const taskHeader = document.getElementById('task-header');
    const taskBody = document.getElementById('task-body');
    const targetAgent = document.getElementById('target-agent');

    if (user.task && taskDictionary[user.task]) {
        taskSection.style.display = 'block';

        // Wyciągamy dane ze słownika
        const fullDesc = taskDictionary[user.task].desc;

        // Dzielimy tekst na linie
        const lines = fullDesc.split('\n');
        const headerText = lines[0]; // Pierwsza linia: [SEKCJA: ...]
        const bodyText = lines.slice(1).join('\n'); // Wszystko poniżej pierwszej linii

        // EFEKT: Tylko nagłówek się deszyfruje
        taskHeader.innerText = ""; // Czyścimy przed startem
        decryptEffect('task-header', headerText);

        // TREŚĆ: Pojawia się od razu (lub z minimalnym opóźnieniem)
        taskBody.style.whiteSpace = "pre-line";
        taskBody.innerText = bodyText;

        if (targetAgent) {
            targetAgent.innerText = taskDictionary[user.task].contact;
        }

        // Reset checkboxa
        document.getElementById('task-confirm-checkbox').checked = false;
        document.getElementById('extra-info-box').style.display = 'none';

    } else if (taskSection) {
        taskSection.style.display = 'none';
    }
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
    if (typeof confetti === 'function') { // Sprawdza, czy biblioteka istnieje
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#00ff46', '#111', '#fff']
        });
    } else {
        console.log("Biblioteka confetti nie została załadowana.");
    }
}
window.onload = init;

function sendRSVP(decision) {
    const userCode = localStorage.getItem('guestCode');
    const user = guestList[userCode];
    const userName = user ? user.name : "NIEZNANY";

    const isTaskAccepted = document.getElementById('task-confirm-checkbox').checked;
    const taskStatus = isTaskAccepted ? "TAK" : "BRAK";

    // TWOJE DANE (ID zweryfikowane z Twojego screena)
    const formURL = "https://docs.google.com/forms/d/e/1FAIpQLSeZgySCSFoMG-Aq8JilGwshSpi7CDVWk_2inSZi_DOkScFK5g/formResponse";
    const entryCodeID = "entry.2056322567";
    const entryNameID = "entry.1508024900";
    const entryTaskID = "entry.1814490593";
    const entryStatusID = "entry.1686139881";

    const formData = new FormData();
    // KLUCZOWE: Lewa strona to ID z Google, prawa to zmienna z JS
    formData.append(entryCodeID, userCode);
    formData.append(entryNameID, userName);
    formData.append(entryStatusID, decision);
    formData.append(entryTaskID, taskStatus);

    fetch(formURL, {
        method: "POST",
        mode: "no-cors",
        body: formData
    }).then(() => {
        // Zmiana napisu po wysłaniu
        const rsvpSection = document.getElementById('rsvp-section');
        if (rsvpSection) {
            rsvpSection.innerHTML = `
                <h2 style='color: #00ff46;'>STATUS: TRANSMISJA ZAKOŃCZONA.</h2>
                <p style='color: #ff9900;'>Witaj w zespole, ${userName}.</p>
            `;
        }
    }).catch(err => {
        console.error("Błąd transmisji:", err);
    });
}

function decryptEffect(elementId, finalText) {
    const chars = "!@#$%^&*()_+1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const element = document.getElementById(elementId);
    if (!element) return;
    let iteration = 0;

    const interval = setInterval(() => {
        element.innerText = finalText.split("")
            .map((letter, index) => {
                if (index < iteration) return finalText[index];
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");

        if (iteration >= finalText.length) clearInterval(interval);
        iteration += 1 / 3;
    }, 30);
}


function playHackSound(type) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (type === 'beep') {
        oscillator.type = 'square'; // Kwadratowa fala brzmi jak stary komputer
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.1);
        oscillator.stop(audioCtx.currentTime + 0.1);
    } else if (type === 'error') {
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.5);
        oscillator.stop(audioCtx.currentTime + 0.5);
    }
}

function toggleExtraInfo() {
    const isChecked = document.getElementById('task-confirm-checkbox').checked;
    const infoBox = document.getElementById('extra-info-box');

    if (isChecked) {
        infoBox.style.display = 'block';
    } else {
        infoBox.style.display = 'none';
    }
}
