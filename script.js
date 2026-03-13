const guestList = {
    "kuba123": { name: "Kuba", photo: "images/kuba.jpg" },
    "ania789": { name: "Ania", photo: "images/ania.png" },
    // ... tu dopisz resztę swoich 40 gości
};

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
        // Konfetti tylko przy pierwszym "wejściu", nie po F5
        if (!sessionStorage.getItem('confettiDone')) {
            launchConfetti();
            sessionStorage.setItem('confettiDone', 'true');
        }
    } else {
        if (errorMsg) errorMsg.style.display = 'block';
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
    location.reload(); // Odświeżamy, by wrócić do ekranu logowania
}

function init() {
    // 1. Sprawdź czy kod jest w URL (np. ?k=kuba123)
    const urlParams = new URLSearchParams(window.location.search);
    const codeFromUrl = urlParams.get('k'); // 'k' jak kod

    if (codeFromUrl && guestList[codeFromUrl]) {
        loginUser(codeFromUrl);
        return;
    }

    // 2. Jeśli nie ma w URL, sprawdź localStorage
    const savedCode = localStorage.getItem('guestCode');
    if (savedCode && guestList[savedCode]) {
        showInvitation(savedCode);
    }
}

function launchConfetti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });
}

window.onload = init;