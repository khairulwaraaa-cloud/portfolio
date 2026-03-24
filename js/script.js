// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. Canvas Particles Background
const canvas = document.getElementById('particles-bg');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = Math.random() > 0.5 ? '#22d3ee' : '#39ff14'; // cyan or neon
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    let numberOfParticles = (canvas.width * canvas.height) / 10000;
    for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        // Connect particles
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 120) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(34, 211, 238, ${0.12 - distance/1000})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}
initParticles();
animateParticles();

// 2. Navbar Scroll Effect & Mobile Menu
const navbar = document.querySelector('nav > div');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('nav-scrolled');
    } else {
        navbar.classList.remove('nav-scrolled');
    }
});

const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// 3. Bio-Signal Simulator Widget
const bioCanvas = document.getElementById('biosignal-canvas');
const bioCtx = bioCanvas.getContext('2d');
const signalTypeEl = document.getElementById('signal-type');

let bioWidth, bioHeight;
function resizeBio() {
    const parent = bioCanvas.parentElement;
    bioWidth = bioCanvas.width = parent.clientWidth || 300;
    bioHeight = bioCanvas.height = parent.clientHeight || 150;
}
resizeBio();

let time = 0;
let prevX = 0;
let prevY = bioHeight / 2;
let currentSignal = 0; // 0: ECG, 1: PPG, 2: EEG
const signals = ['ECG', 'PPG', 'EEG'];

document.querySelector('.hero-widget').addEventListener('click', () => {
    currentSignal = (currentSignal + 1) % 3;
    signalTypeEl.innerText = signals[currentSignal];
    // Reset canvas path
    bioCtx.clearRect(0, 0, bioWidth, bioHeight);
    time = 0;
    prevX = 0;
    prevY = bioHeight / 2;
});

function drawSignal() {
    bioCtx.fillStyle = 'rgba(10, 15, 26, 0.05)'; // Fade effect
    bioCtx.fillRect(0, 0, bioWidth, bioHeight);
    
    let y = bioHeight / 2;
    let t = time * 0.1;
    
    if (currentSignal === 0) { // ECG approx
        let beat = time % 120;
        if(beat > 40 && beat < 50) y -= 12 * Math.sin((beat-40)*Math.PI/10); // P wave
        else if(beat > 55 && beat < 60) y += 6; // Q
        else if(beat >= 60 && beat < 65) y -= 60; // R
        else if(beat >= 65 && beat < 70) y += 20; // S
        else if(beat > 80 && beat < 95) y -= 18 * Math.sin((beat-80)*Math.PI/15); // T wave
        else y += Math.random() * 2 - 1; // baseline noise
    } else if (currentSignal === 1) { // PPG approx
        let beat = time % 100;
        y -= 40 * Math.sin(beat * Math.PI / 50) * Math.exp(-beat/30);
        y += Math.random() * 2 - 1;
    } else { // EEG approx
        y += 15 * Math.sin(t*5) + 20 * Math.sin(t*12) + 8 * Math.sin(t*25) + (Math.random()*15 - 7.5);
    }
    
    const x = time % bioWidth;
    
    bioCtx.beginPath();
    bioCtx.lineWidth = 2;
    bioCtx.strokeStyle = currentSignal === 0 ? '#39ff14' : (currentSignal === 1 ? '#22d3ee' : '#fbbf24');
    
    if (x < prevX || time === 0) {
        bioCtx.moveTo(x, y);
    } else {
        bioCtx.moveTo(prevX, prevY);
        bioCtx.lineTo(x, y);
        bioCtx.stroke();
    }
    
    prevX = x;
    prevY = y;
    time += 2;
    requestAnimationFrame(drawSignal);
}
drawSignal();

window.addEventListener('resize', resizeBio);

// 4. GSAP Scroll Animations
// Fade Up
gsap.utils.toArray('.gsap-fade-up').forEach(elem => {
    gsap.fromTo(elem, 
        { y: 50, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: elem, start: 'top 85%' } }
    );
});

// Scale Up
gsap.utils.toArray('.gsap-scale-up').forEach((elem, i) => {
    gsap.fromTo(elem, 
        { scale: 0.8, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.8, ease: 'back.out(1.7)', scrollTrigger: { trigger: elem, start: 'top 85%' } }
    );
});

// Slide Right
gsap.utils.toArray('.gsap-slide-right').forEach(elem => {
    gsap.fromTo(elem, 
        { x: -50, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: elem, start: 'top 85%' } }
    );
});

// Slide Left
gsap.utils.toArray('.gsap-slide-left').forEach(elem => {
    gsap.fromTo(elem, 
        { x: 50, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: elem, start: 'top 85%' } }
    );
});

// 5. Cursor Parallax Effect for Hero 3D Icons
document.addEventListener("mousemove", (e) => {
    const icons = document.querySelectorAll(".floating-icon");
    const x = (e.clientX / window.innerWidth - 0.5) * 30; // 30 is the multiplier for movement
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    
    icons.forEach((icon, index) => {
        const speed = (index + 1) * 0.8;
        gsap.to(icon, {
            x: x * speed,
            y: y * speed,
            duration: 1,
            ease: "power1.out"
        });
    });
});
