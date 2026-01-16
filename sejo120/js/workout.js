document.addEventListener('DOMContentLoaded', () => {
    // --- Global Visitor Counter ---
    const VISITOR_KEY = 'sejo120_total_visits';
    let totalVisits = localStorage.getItem(VISITOR_KEY);

    if (!totalVisits) {
        totalVisits = 0;
    }

    // Increment only on first session load? Or every refresh?
    // User requested "counting when visitor comes to main page", often implies unique or session based, but "on refresh" usually means page view count.
    // Let's increment on every load for simplicity as requested "counting...".
    totalVisits = parseInt(totalVisits) + 1;
    localStorage.setItem(VISITOR_KEY, totalVisits);

    // Display Visitor Count
    // Create a display element if it doesn't exist, usually in footer
    let footer = document.querySelector('footer');
    if (!footer) {
        // If no footer, create one at the end of body container
        const container = document.querySelector('.container');
        if (container) {
            footer = document.createElement('footer');
            footer.style.textAlign = 'center';
            footer.style.marginTop = '3rem';
            footer.style.padding = '1rem';
            footer.style.color = '#888';
            footer.style.fontSize = '0.9rem';
            container.appendChild(footer);
        }
    }

    if (footer) {
        const visitDisplay = document.createElement('div');
        visitDisplay.innerHTML = `🌟 총 방문자 수: <strong>${totalVisits.toLocaleString()}</strong>명`;
        footer.appendChild(visitDisplay);
    }


    // --- Workout Page Logic ---
    const counterElement = document.getElementById('workout-counter');
    const hippoElement = document.getElementById('hippo-character-sprite');
    const speechBubble = document.getElementById('speech-bubble');

    // Only proceed if we are on the workout page
    if (counterElement && hippoElement) {
        const WORKOUT_COUNT_KEY = 'sejo120_workout_count';

        // Initial count: 1 Gyeong (10^16)
        // BigInt cannot be directly serialized to JSON/localStorage without conversion, so we store as string
        let savedCount = localStorage.getItem(WORKOUT_COUNT_KEY);
        let currentCount = savedCount ? BigInt(savedCount) : 10000000000000000n;

        // Update display immediately
        counterElement.textContent = formatNumber(currentCount);

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
                // Save to localStorage
                localStorage.setItem(WORKOUT_COUNT_KEY, currentCount.toString());
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
    }
});
