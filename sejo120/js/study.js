
const questionBank = [
    // --- 국어 (Korean) ---
    { subject: "국어", question: "다음 중 표준어가 아닌 것은 무엇일까요?", options: ["사랑해", "예쁘다", "주책이다", "끄적거리다"], answer: 2 },
    { subject: "국어", question: "글을 읽고 글쓴이의 주장을 파악하는 방법으로 알맞지 않은 것은?", options: ["글의 제목을 살펴본다.", "글쓴이가 반복해서 강조하는 말을 찾는다.", "글의 내용을 내 마음대로 상상해서 고친다.", "각 문단의 중심 내용을 확인한다."], answer: 2 },
    { subject: "국어", question: "'사과'의 뜻으로 알맞지 않은 것은?", options: ["과일의 한 종류", "자기의 잘못을 인정하고 용서를 빎", "모래와 과자", "어떤 일에 대하여 미안하다고 함"], answer: 2 },
    { subject: "국어", question: "문장의 호응 관계가 자연스러운 것은?", options: ["나는 어제 도서관에 갈 것이다.", "할아버지께서 밥을 먹는다.", "동생은 키가 큽니다.", "선생님께 말씀을 드린다."], answer: 3 },
    { subject: "국어", question: "다음 중 순우리말이 아닌 것은?", options: ["미리내", "가람", "컴퓨터", "시나브로"], answer: 2 },
    { subject: "국어", question: "'낫 놓고 ㄱ자도 모른다'는 속담의 뜻은?", options: ["아주 무식하다.", "낫을 본 적이 없다.", "글자를 배울 필요가 없다.", "농사일을 아주 잘한다."], answer: 0 },
    { subject: "국어", question: "높임말을 바르게 사용한 문장은?", options: ["선생님, 넥타이가 멋있으세요.", "할머니, 진지 잡수세요.", "교장 선생님의 말씀이 계시겠습니다.", "이 상품은 품절이십니다."], answer: 1 },

    // --- 수학 (Math) ---
    { subject: "수학", question: "가로가 5cm, 세로가 8cm인 직사각형의 넓이는 얼마입니까?", options: ["20㎠", "30㎠", "40㎠", "50㎠"], answer: 2 },
    { subject: "수학", question: "분수 1/2과 크기가 같은 분수는?", options: ["2/4", "1/3", "2/3", "3/5"], answer: 0 },
    { subject: "수학", question: "삼각형의 세 각의 합은 몇 도 입니까?", options: ["90도", "180도", "270도", "360도"], answer: 1 },
    { subject: "수학", question: "12와 18의 최대공약수는?", options: ["2", "3", "4", "6"], answer: 3 },
    { subject: "수학", question: "소수 0.5를 분수로 나타내면?", options: ["1/5", "1/2", "5/100", "2/5"], answer: 1 },
    { subject: "수학", question: "정육면체의 면의 개수는 몇 개입니까?", options: ["4개", "6개", "8개", "12개"], answer: 1 },
    { subject: "수학", question: "다음 중 다각형이 아닌 것은?", options: ["삼각형", "사각형", "원", "오각형"], answer: 2 },

    // --- 사회 (Social Studies) ---
    { subject: "사회", question: "우리나라의 동쪽은 높고 서쪽은 낮은 지형 특징을 무엇이라고 합니까?", options: ["동고서저", "삼면이 바다", "배산임수", "동서남북"], answer: 0 },
    { subject: "사회", question: "조선 시대를 세운 왕의 이름은 무엇입니까?", options: ["이방원", "세종대왕", "이순신", "이성계"], answer: 3 },
    { subject: "사회", question: "우리나라의 가장 큰 섬은 어디입니까?", options: ["울릉도", "독도", "제주도", "거제도"], answer: 2 },
    { subject: "사회", question: "임진왜란 때 거북선을 만들어 왜군을 물리친 장군은?", options: ["강감찬", "권율", "이순신", "김유신"], answer: 2 },
    { subject: "사회", question: "우리나라의 행정 구역 중 '특별시'는 몇 개일까요?", options: ["1개", "2개", "3개", "없음"], answer: 0 },
    { subject: "사회", question: "경주에 있는 신라 시대의 절로, 다보탑과 석가탑이 있는 곳은?", options: ["불국사", "석굴암", "해인사", "통도사"], answer: 0 },

    // --- 과학 (Science) ---
    { subject: "과학", question: "식물이 빛을 이용하여 양분을 만드는 작용을 무엇이라고 합니까?", options: ["호흡", "광합성", "증산 작용", "소화"], answer: 1 },
    { subject: "과학", question: "물에 녹는 물질을 용질, 녹이는 물질을 용매라고 합니다. 소금물의 용매는 무엇입니까?", options: ["소금", "물", "소금물", "유리막대"], answer: 1 },
    { subject: "과학", question: "다음 중 태양계의 행성이 아닌 것은?", options: ["지구", "화성", "달", "목성"], answer: 2 },
    { subject: "과학", question: "자석의 N극과 S극이 서로 만날 때 일어나는 현상은?", options: ["서로 밀어낸다.", "서로 당긴다.", "아무 변화 없다.", "회전한다."], answer: 1 },
    { subject: "과학", question: "우리 몸에서 혈액을 온몸으로 보내는 펌프 역할을 하는 기관은?", options: ["위", "간", "심장", "폐"], answer: 2 },
    { subject: "과학", question: "다음 중 곤충이 아닌 동물은?", options: ["개미", "거미", "잠자리", "나비"], answer: 1 }, // 거미는 절지동물(다리 8개)

    // --- 상식 (General Knowledge) ---
    { subject: "상식", question: "대한민국의 수도는 어디입니까?", options: ["부산", "인천", "서울", "광주"], answer: 2 },
    { subject: "상식", question: "태극기의 4괘가 아닌 것은?", options: ["건", "곤", "감", "강"], answer: 3 }, // 건곤감리
    { subject: "상식", question: "한글날은 몇 월 며칠입니까?", options: ["8월 15일", "10월 3일", "10월 9일", "3월 1일"], answer: 2 },
    { subject: "상식", question: "우리나라 애국가는 몇 절까지 있을까요?", options: ["1절", "2절", "3절", "4절"], answer: 3 },
    { subject: "상식", question: "임진왜란이 일어난 해는?", options: ["1392년", "1592년", "1894년", "1910년"], answer: 1 },
    { subject: "상식", question: "다음 중 악기가 아닌 것은?", options: ["단소", "리코더", "장구", "지휘봉"], answer: 3 }
];

document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('result-container');
    const scoreDisplay = document.getElementById('score-display');
    const retryBtn = document.getElementById('retry-btn');
    const nameInput = document.getElementById('participant-name');
    const scoreboardList = document.getElementById('scoreboard-list');

    const SCOREBOARD_KEY = 'sejo120_quiz_scores';
    const QUIZ_SIZE = 10; // 하루 10문제

    if (!quizContainer) return;

    let currentQuizData = []; // Store the currently selected random questions

    // Initial Render
    renderScoreboard();
    initQuiz(); // Initialize and render first set of random questions

    function initQuiz() {
        // Reset state UI
        quizContainer.style.display = 'block';
        resultContainer.style.display = 'none';

        // Select random questions
        currentQuizData = getRandomQuestions(QUIZ_SIZE);
        renderQuiz();
    }

    // Helper: Select N random unique questions
    function getRandomQuestions(count) {
        // Shuffle array using Fisher-Yates algorithm
        const shuffled = [...questionBank].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    function renderQuiz() {
        quizContainer.innerHTML = '';
        currentQuizData.forEach((item, index) => {
            const questionEl = document.createElement('div');
            questionEl.className = 'quiz-card';

            const subjectBadge = `<span class="badge ${getSubjectClass(item.subject)}">${item.subject}</span>`;

            let optionsHtml = '';
            item.options.forEach((option, optIndex) => {
                optionsHtml += `
                    <label class="quiz-option">
                        <input type="radio" name="q${index}" value="${optIndex}">
                        <span class="option-text">${option}</span>
                    </label>
                `;
            });

            questionEl.innerHTML = `
                <div class="quiz-header">
                    ${subjectBadge}
                    <h3 class="quiz-question">${index + 1}. ${item.question}</h3>
                </div>
                <div class="quiz-options">
                    ${optionsHtml}
                </div>
            `;
            quizContainer.appendChild(questionEl);
        });

        // Add Submit Button at the end
        const submitBtn = document.createElement('button');
        submitBtn.className = 'btn btn-primary submit-quiz-btn';
        submitBtn.textContent = '채점하기';
        submitBtn.onclick = calculateScore;
        quizContainer.appendChild(submitBtn);
    }

    function getSubjectClass(subject) {
        switch (subject) {
            case '국어': return 'badge-kr';
            case '수학': return 'badge-math';
            case '사회': return 'badge-soc';
            case '과학': return 'badge-sci';
            default: return 'badge-def';
        }
    }

    function calculateScore() {
        // Validation: Check Name
        const name = nameInput.value.trim();
        if (!name) {
            alert('채점하기 전에 이름을 입력해주세요!');
            nameInput.focus();
            return;
        }

        let score = 0;
        let correctCount = 0;
        let unanswered = 0;

        // Reset previous feedback styles
        const questions = document.querySelectorAll('.quiz-card');

        currentQuizData.forEach((item, index) => {
            const selected = document.querySelector(`input[name="q${index}"]:checked`);
            const card = questions[index];

            // Remove old feedback classes
            card.classList.remove('correct', 'incorrect');

            if (selected) {
                const val = parseInt(selected.value);
                if (val === item.answer) {
                    score += 10;
                    correctCount++;
                    card.classList.add('correct');
                } else {
                    card.classList.add('incorrect');
                }
            } else {
                unanswered++;
                card.classList.add('incorrect');
            }
        });

        if (unanswered > 0) {
            if (!confirm(`${unanswered}개의 문제를 풀지 않았습니다. 그래도 채점하시겠습니까?`)) {
                return;
            }
        }

        // Save Score
        const now = new Date();
        const record = {
            name: name,
            score: score,
            date: now.toLocaleDateString(),
            time: now.toLocaleTimeString(),
            timestamp: now.getTime()
        };
        saveScore(record);

        // Show result
        quizContainer.style.display = 'none';
        resultContainer.style.display = 'block';

        let message = '';
        if (score === 100) message = "완벽해요! 참 잘했어요! 🎉";
        else if (score >= 80) message = "훌륭해요! 조금만 더 힘내세요! 👍";
        else if (score >= 50) message = "노력하면 더 잘할 수 있어요! 💪";
        else message = "복습이 필요해 보여요! 화이팅! 🌱";

        document.getElementById('score-value').textContent = `${score}점`;
        document.getElementById('score-message').textContent = message;

        window.scrollTo(0, 0);
    }

    function saveScore(record) {
        let scores = JSON.parse(localStorage.getItem(SCOREBOARD_KEY) || '[]');
        scores.unshift(record); // Add new record to the top
        // Limit to 50 records if needed, but 'never disappear' requested so keep all? 
        // Let's keep all for now as requested.
        localStorage.setItem(SCOREBOARD_KEY, JSON.stringify(scores));
        renderScoreboard(record.timestamp); // Pass current timestamp to highlight
    }

    function renderScoreboard(highlightTimestamp = null) {
        const scores = JSON.parse(localStorage.getItem(SCOREBOARD_KEY) || '[]');

        if (scores.length === 0) {
            scoreboardList.innerHTML = '<div style="text-align:center; color:#ccc; padding: 2rem;">아직 기록이 없어요.<br>첫 번째 주인공이 되어보세요!</div>';
            return;
        }

        scoreboardList.innerHTML = '';
        scores.forEach((record, index) => {
            const item = document.createElement('div');
            item.className = 'score-item';
            if (highlightTimestamp && record.timestamp === highlightTimestamp) {
                item.classList.add('new-record');
            }

            item.innerHTML = `
                <div style="display:flex; align-items:center;">
                    <div class="score-left">
                        <span class="score-name">${record.name}</span>
                        <span class="score-date">${record.date} ${record.time}</span>
                    </div>
                </div>
                <div class="score-right">
                    <span class="score-value">${record.score}점</span>
                </div>
            `;
            scoreboardList.appendChild(item);
        });
    }

    retryBtn.addEventListener('click', () => {
        // For standard "Daily Learning", maybe we should NOT reset the name? 
        // But user might want to try again.
        // Let's regenerate questions for a "New Try" experience

        // Clear inputs
        document.querySelectorAll('input[type="radio"]').forEach(el => el.checked = false);
        // Clear classes
        document.querySelectorAll('.quiz-card').forEach(el => el.classList.remove('correct', 'incorrect'));

        initQuiz(); // Re-roll questions and show
        window.scrollTo(0, 0);
    });

});
