
document.addEventListener('DOMContentLoaded', () => {
    const counterElement = document.getElementById('workout-counter');
    const hippoElement = document.getElementById('hippo-character-sprite');
    const speechBubble = document.getElementById('speech-bubble');

    // Initial count: 1 Gyeong (10^16)
    let currentCount = 10000000000000000n;

    // Click tracking for encouragement
    let clickCount = 0;
    let encouragementThreshold = getRandomThreshold();

    // Encouragement messages
    const messages = [
        "조금만 더!",
        "힘내라!",
        "멋져!",
        "할 수 있어!",
        "지방이 타고 있어!",
        "최고야!",
        "포기하지 마!",
        "으라차차!",
        "달려라 달려!",
        "땀은 배신하지 않아!",
        "건강해지고 있어!",
        "오운완 가자!"
    ];

    function getRandomThreshold() {
        return Math.floor(Math.random() * 51) + 50; // Random between 50 and 100
    }

    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function showEncouragement() {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        speechBubble.textContent = randomMessage;
        speechBubble.classList.remove('hidden');
        speechBubble.classList.add('visible');

        setTimeout(() => {
            speechBubble.classList.remove('visible');
            speechBubble.classList.add('hidden');
        }, 3000);
    }

    function handleInteraction(e) {
        // Decrement counter
        if (currentCount > 0n) {
            currentCount--;
            counterElement.textContent = formatNumber(currentCount);
        }

        // Add run animation effect (speed up temporarily)
        hippoElement.classList.add('running-fast');
        hippoElement.classList.add('running-hard'); // Scale effect

        // Remove fast run after short delay
        setTimeout(() => {
            hippoElement.classList.remove('running-fast');
            hippoElement.classList.remove('running-hard');
        }, 200);

        // Encouragement logic
        clickCount++;
        if (clickCount >= encouragementThreshold) {
            showEncouragement();
            clickCount = 0;
            encouragementThreshold = getRandomThreshold();
        }
    }

    hippoElement.addEventListener('click', handleInteraction);

    // Also allow clicking the container area for easier mobile usage
    hippoElement.parentElement.addEventListener('click', (e) => {
        if (e.target !== hippoElement) {
            handleInteraction(e);
        }
    });
});
