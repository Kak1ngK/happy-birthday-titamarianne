// --- Navigation Logic ---
function goToScreen(currentId, nextId) {
    const current = document.getElementById(`screen-${currentId}`);
    const next = document.getElementById(`screen-${nextId}`);
    
    current.classList.remove('active');
    
    setTimeout(() => {
        next.classList.add('active');
        window.scrollTo(0, 0);
    }, 800); // Matches CSS transition duration
}

// --- Cake Interaction Logic ---
function readyToWish() {
    document.getElementById('btn-ready').classList.add('hidden');
    document.getElementById('wish-text').innerText = "WISHHH WISELYYY BEYBB ✨";
    document.getElementById('btn-blow').classList.remove('hidden');
}

function blowCandle() {
    const flame = document.getElementById('flame');
    const smoke = document.getElementById('smoke');
    
    // Hide flame, show smoke
    flame.style.display = 'none';
    smoke.classList.add('smoke-anim');

    // Fire Confetti
    fireConfetti();

    // Change button text briefly
    const btnBlow = document.getElementById('btn-blow');
    btnBlow.innerText = "YAYYYYY! 🎉";
    btnBlow.disabled = true;
    document.getElementById('wish-text').innerText = "WISH GRANTED! 💫";

    // Wait 3 seconds, then transition to letter screen
    setTimeout(() => {
        goToScreen(2, 3);
    }, 3000);
}

// --- Hidden Surprise Logic ---
function revealSurprise() {
    const trigger = document.getElementById('surprise-trigger-container');
    const surprise = document.getElementById('hidden-surprise');
    
    trigger.style.display = 'none';
    surprise.classList.remove('hidden');
    surprise.classList.add('fade-in-up');
    
    // Start floating hearts effect
    startFloatingHearts();
}

// --- Floating Hearts Effect ---
function startFloatingHearts() {
    const icons = ['💙', '💜', '✨'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.style.fontSize = Math.floor(Math.random() * 15 + 20) + 'px';
        heart.innerText = icons[Math.floor(Math.random() * icons.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's'; // 4s to 7s
        document.body.appendChild(heart);

        // Clean up DOM after animation completes
        setTimeout(() => {
            heart.remove();
        }, 7000);
    }, 300);
}

// --- Lightweight Canvas Confetti System ---
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createParticles() {
    const colors = ['#c2a3d1', '#b3d9eb', '#ffffff', '#7cb9e8', '#e0f2fe'];
    for (let i = 0; i < 150; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2 + 50,
            r: Math.random() * 6 + 2,
            dx: Math.random() * 10 - 5,
            dy: Math.random() * -15 - 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.floor(Math.random() * 10) - 10,
            tiltAngleInc: (Math.random() * 0.07) + 0.05,
            tiltAngle: 0
        });
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, index) => {
        p.tiltAngle += p.tiltAngleInc;
        p.y += (Math.cos(p.tiltAngle) + 1 + p.r / 2) / 2;
        p.x += Math.sin(p.tiltAngle) * 2;
        
        // Add gravity and slow down dx
        p.dy += 0.2; 
        p.x += p.dx;
        p.y += p.dy;

        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
        ctx.stroke();

        // Remove particles that fall off screen
        if (p.y > canvas.height) {
            particles.splice(index, 1);
        }
    });

    if (particles.length > 0) {
        requestAnimationFrame(drawParticles);
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function fireConfetti() {
    createParticles();
    drawParticles();
}

