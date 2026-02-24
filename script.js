const grid = document.getElementById('grid-container');
const startBtn = document.getElementById('start-btn');
const timerLabel = document.getElementById('timer-label');
const timeSlider = document.getElementById('time-slider');
const statusText = document.getElementById('status-text');

const TOTAL_DOTS = 100;
let DURATION = parseInt(timeSlider.value);
let timeLeft = DURATION;
let isRunning = false;
let dotsData = [];
let logicInterval;
let currentTheme = 'sunset';

const themes = {
    sunset: (i) => `hsl(${280 + (i / TOTAL_DOTS) * 80}, 70%, 60%)`,
    ocean: (i) => `hsl(${180 + (i / TOTAL_DOTS) * 60}, 70%, 50%)`,
    forest: (i) => `hsl(${80 + (i / TOTAL_DOTS) * 60}, 50%, 50%)`,
    random: () => `hsl(${Math.random() * 360}, 70%, 60%)`,
    stars: () => `#fff`
};

let audioCtx;

// Функция инициализации (вызывать при клике на START)
function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    // Если контекст в режиме ожидания (бывает в Chrome), запускаем его
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

// Фоновый белый шум космоса
function playSpaceNoise() {
    const bufferSize = audioCtx.sampleRate * 2;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) output[i] = Math.random() * 2 - 1;

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400; // Глухой гул

    const gain = audioCtx.createGain();
    gain.gain.value = 0.015; // Очень тихо

    noise.connect(filter).connect(gain).connect(audioCtx.destination);
    noise.start();
}

// Короткий звук при замирании точки
function playPopSound(theme) {
    if (!audioCtx || audioCtx.state !== 'running') return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain).connect(audioCtx.destination);

    const now = audioCtx.currentTime;
    
    // НАСТРОЙКИ ЗВУКА ДЛЯ КАЖДОЙ ТЕМЫ
    if (theme === 'stars') {
        osc.type = 'sine'; // Чистый высокий звон
        osc.frequency.setValueAtTime(1000 + Math.random() * 500, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.1);
    } 
    else if (theme === 'sunset') {
        osc.type = 'triangle'; // Мягкий "бам"
        osc.frequency.setValueAtTime(150 + Math.random() * 50, now);
        osc.frequency.linearRampToValueAtTime(40, now + 0.2);
    } 
    else if (theme === 'ocean') {
        osc.type = 'sine'; // Глубокий "бульк"
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.3);
    } 
    else if (theme === 'forest') {
        osc.type = 'triangle'; // Короткий деревянный "тук"
        osc.frequency.setValueAtTime(400 + Math.random() * 100, now);
        osc.frequency.linearRampToValueAtTime(100, now + 0.05);
    } 
    else { // Chaos / Random
        osc.type = 'square'; // Ретро-пиксельный звук
        osc.frequency.setValueAtTime(Math.random() * 600 + 200, now);
        osc.frequency.linearRampToValueAtTime(10, now + 0.1);
    }

    // Настройка громкости (плавное затухание)
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

    osc.start();
    osc.stop(now + 0.2);
}

function createGrid() {
    grid.innerHTML = '';
    dotsData = [];
    for (let i = 0; i < TOTAL_DOTS; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        const color = themes[currentTheme](i);
        dot.style.backgroundColor = color;
        dot.style.color = color; // Добавь это, чтобы вспышка была цветной
        
        if (currentTheme === 'stars') {
            dot.classList.add('star-style');
        }

        grid.appendChild(dot);
        dotsData.push({
            el: dot,
            x: 0, y: 0, 
            baseVx: (Math.random() - 0.5) * 1.5,
            baseVy: (Math.random() - 0.5) * 1.5,
            phase: Math.random() * Math.PI * 2,
            isCalm: false
        });
    }
}

function updatePhysics() {
    const time = Date.now() * 0.002;
    dotsData.forEach(d => {
        if (!d.isCalm) {
            const speedMod = Math.sin(time + d.phase) * 0.5 + 0.7;
            d.x += d.baseVx * speedMod;
            d.y += d.baseVy * speedMod;

            const limit = 15;
            if (Math.abs(d.x) > limit) { d.baseVx *= -1; d.x = Math.sign(d.x) * limit; }
            if (Math.abs(d.y) > limit) { d.baseVy *= -1; d.y = Math.sign(d.y) * limit; }
        } else {
            d.x *= 0.97;
            d.y *= 0.97;
            if (Math.abs(d.x) < 0.1) d.x = 0;
            if (Math.abs(d.y) < 0.1) d.y = 0;
        }
        d.el.style.transform = `translate3d(${d.x}px, ${d.y}px, 0)`;
    });
    requestAnimationFrame(updatePhysics);
}

function toggleProcess() {
    if (timeLeft <= 0) { resetApp(); return; }
    if (!isRunning) {
        isRunning = true;
        startBtn.innerText = "PAUSE";
        statusText.innerText = "Entropy in motion...";
        timeSlider.disabled = true;
        logicInterval = setInterval(() => {
            timeLeft -= 0.05;
            if (timeLeft <= 0.05) {
                timeLeft = 0;
                isRunning = false;
                clearInterval(logicInterval);
                updateUI();
                finishApp();
            } else { updateUI(); }
        }, 50);
    } else {
        isRunning = false;
        clearInterval(logicInterval);
        startBtn.innerText = "RESUME";
        statusText.innerText = "Time stands still";
    }
}

function updateUI() {
    const totalSeconds = Math.ceil(timeLeft);
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    if (timeLeft <= 0) {
        timerLabel.innerText = "Stillness";
    } else {
        timerLabel.innerText = `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
    }
    const targetActive = Math.floor((timeLeft / DURATION) * TOTAL_DOTS);
    const activeDots = dotsData.filter(d => !d.isCalm);
    if (activeDots.length > targetActive) {
        const toCalm = activeDots.length - targetActive;
        for (let i = 0; i < toCalm; i++) {
            const currentActive = dotsData.filter(d => !d.isCalm);
            if (currentActive.length > 0) {
                const randomDot = currentActive[Math.floor(Math.random() * currentActive.length)];
                randomDot.isCalm = true;
                randomDot.el.classList.add('calm');
                randomDot.el.style.backgroundColor = '';
                playPopSound(currentTheme);
            }
        }
    }
}

function finishApp() {
    startBtn.innerText = "RESTART";
    statusText.innerText = "Order restored";
}

function resetApp() {
    DURATION = parseInt(timeSlider.value);
    timeLeft = DURATION;
    isRunning = false;
    startBtn.innerText = "START";
    statusText.innerText = "Ambient chaos";
    timeSlider.disabled = false;
    createGrid();
    updateUI();
}

timeSlider.addEventListener('input', () => {
    DURATION = parseInt(timeSlider.value);
    timeLeft = DURATION;
    updateUI();
});

document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Убираем активный класс у кнопок
        document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        currentTheme = e.target.getAttribute('data-theme');
        
        // ВМЕСТО createGrid() вызываем умную перекраску:
        // В script.js найди обработчик клика по .theme-btn и измени цикл:
        dotsData.forEach((d, i) => {
            const newColor = themes[currentTheme](i);
            
            // Красим ТОЛЬКО те точки, которые еще двигаются
            if (!d.isCalm) {
                d.el.style.backgroundColor = newColor;
                d.el.style.color = newColor; 
            }
            
            // Стиль звезд меняем для всех, чтобы сетка была однородной
            if (currentTheme === 'stars') {
                d.el.classList.add('star-style');
            } else {
                d.el.classList.remove('star-style');
            }
        });
    });
});

createGrid();
updatePhysics();
startBtn.addEventListener('click', () => {
    // Сначала инициализируем аудио (разблокируем звук в браузере)
    initAudio(); 
    
    // Если процесс не запущен, включаем фоновый шум
    if (!isRunning) {
        playSpaceNoise();
    }
    
    // Запускаем твою стандартную функцию
    toggleProcess();
});