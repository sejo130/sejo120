document.addEventListener('DOMContentLoaded', () => {
    initWhiteboard();
    initNoiseMeter();
    initQRGenerator();
});

// --- Whiteboard ---
function initWhiteboard() {
    const canvas = document.getElementById('whiteboard-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // Set canvas size to match container
    function resizeCanvas() {
        canvas.width = container.offsetWidth;
        canvas.height = 400; // Fixed height preference
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = document.getElementById('pen-size').value;
        ctx.strokeStyle = '#000000';
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Drawing Logic
    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = getPos(e);
    }

    function draw(e) {
        if (!isDrawing) return;
        const [currX, currY] = getPos(e);

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(currX, currY);
        ctx.stroke();

        [lastX, lastY] = [currX, currY];
    }

    function stopDrawing() {
        isDrawing = false;
    }

    function getPos(e) {
        const rect = canvas.getBoundingClientRect();
        let clientX = e.clientX;
        let clientY = e.clientY;

        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }

        return [
            clientX - rect.left,
            clientY - rect.top
        ];
    }

    // Event Listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Touch support
    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startDrawing(e); });
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e); });
    canvas.addEventListener('touchend', stopDrawing);

    // Controls
    document.getElementById('clear-board').addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const color = e.target.getAttribute('data-color');
            ctx.strokeStyle = color;
            // Visual feedback
            document.querySelectorAll('.color-btn').forEach(b => b.style.transform = 'scale(1)');
            e.target.style.transform = 'scale(1.2)';
        });
    });

    document.getElementById('pen-size').addEventListener('input', (e) => {
        ctx.lineWidth = e.target.value;
    });
}

// --- Noise Meter ---
function initNoiseMeter() {
    const startBtn = document.getElementById('start-mic-btn');
    const bar = document.getElementById('noise-bar');
    const valDisplay = document.getElementById('noise-value');
    const statusDisplay = document.getElementById('noise-status');
    let audioContext;
    let analyser;
    let microphone;
    let isRunning = false;
    let animationId;

    if (!startBtn) return;

    startBtn.addEventListener('click', async () => {
        if (isRunning) {
            // Stop logic could be added but simpler to just let it run or refresh
            // Let's implement toggle?
            // Actually stopping AudioContext is good practice.
            if (audioContext && audioContext.state !== 'closed') {
                audioContext.close();
                cancelAnimationFrame(animationId);
                isRunning = false;
                startBtn.textContent = "마이크 켜기";
                startBtn.classList.remove('btn-secondary');
                startBtn.classList.add('btn-primary');
                bar.style.width = '0%';
                valDisplay.textContent = '0 dB';
                statusDisplay.textContent = '중지됨';
                return;
            }
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            microphone = audioContext.createMediaStreamSource(stream);
            microphone.connect(analyser);
            analyser.fftSize = 256;

            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            isRunning = true;
            startBtn.textContent = "마이크 끄기";
            startBtn.classList.remove('btn-primary');
            startBtn.classList.add('btn-secondary');

            function updateMeter() {
                if (!isRunning) return;
                analyser.getByteFrequencyData(dataArray);

                // Calculate average volume
                let sum = 0;
                for (let i = 0; i < bufferLength; i++) {
                    sum += dataArray[i];
                }
                let average = sum / bufferLength;

                // Normalize roughly to 0-100 scale for UI
                // Note: accurate dB is complex, this is "relative volume level"
                let percentage = Math.min(100, Math.max(0, average * 1.5));

                bar.style.width = `${percentage}%`;

                // Color coding
                if (percentage < 30) {
                    bar.style.backgroundColor = '#2ed573';
                    statusDisplay.textContent = "조용함 🤫";
                    statusDisplay.style.color = '#2ed573';
                } else if (percentage < 70) {
                    bar.style.backgroundColor = '#ffa502';
                    statusDisplay.textContent = "적당함 🗣️";
                    statusDisplay.style.color = '#ffa502';
                } else {
                    bar.style.backgroundColor = '#ff4757';
                    statusDisplay.textContent = "시끄러움! 📢";
                    statusDisplay.style.color = '#ff4757';
                }

                valDisplay.textContent = `Vol: ${Math.round(percentage)}`;

                animationId = requestAnimationFrame(updateMeter);
            }

            updateMeter();

        } catch (err) {
            console.error(err);
            alert("마이크 사용 권한이 필요합니다. 브라우저 설정에서 허용해주세요.");
        }
    });
}

// --- QR Generator ---
function initQRGenerator() {
    const btn = document.getElementById('generate-qr-btn');
    const input = document.getElementById('qr-input');
    const resultDiv = document.getElementById('qr-result');

    if (!btn) return;

    btn.addEventListener('click', () => {
        const url = input.value.trim();
        if (!url) {
            alert("변환할 주소를 입력해주세요!");
            return;
        }

        // Use QR Server API
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`;

        resultDiv.innerHTML = `
            <div style="text-align:center;">
                <img src="${qrUrl}" alt="QR Code" style="border:5px solid white; border-radius:10px; box-shadow:0 2px 10px rgba(0,0,0,0.1);">
                <div style="margin-top:0.5rem; font-size:0.8rem; color:#888;">${url}</div>
            </div>
        `;
    });

    // Allow enter key
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') btn.click();
    });
}
