
const SnakeGame = (function() {
    let canvas, ctx;
    let gameLoop;
    let score = 0;
    let snake = [];
    let food = {};
    let direction = 'RIGHT';
    let nextDirection = 'RIGHT';
    const gridSize = 20;
    let tileCountX, tileCountY;
    let isPaused = false;
    let onScoreUpdate;

    function init(container, scoreCallback) {
        // Cleanup previous if exists
        container.innerHTML = '';
        onScoreUpdate = scoreCallback;
        score = 0;
        onScoreUpdate(score);

        canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 400;
        canvas.style.backgroundColor = '#000';
        canvas.style.border = '1px solid #333';
        container.appendChild(canvas);
        
        ctx = canvas.getContext('2d');
        tileCountX = canvas.width / gridSize;
        tileCountY = canvas.height / gridSize;

        resetGame();
        
        // Remove old listeners to avoid duplicates if any (simple approach)
        document.removeEventListener('keydown', handleInput);
        document.addEventListener('keydown', handleInput);

        if (gameLoop) clearInterval(gameLoop);
        gameLoop = setInterval(draw, 1000/10); // 10 FPS
        
        return {
            controls: "Arrows to move. Don't hit walls or yourself!",
            cleanup: cleanup
        };
    }

    function cleanup() {
       if (gameLoop) clearInterval(gameLoop);
       document.removeEventListener('keydown', handleInput);
    }

    function resetGame() {
        snake = [
            {x: 10, y: 10},
            {x: 9, y: 10},
            {x: 8, y: 10}
        ];
        direction = 'RIGHT';
        nextDirection = 'RIGHT';
        placeFood();
        score = 0;
        if(onScoreUpdate) onScoreUpdate(score);
    }

    function placeFood() {
        food = {
            x: Math.floor(Math.random() * tileCountX),
            y: Math.floor(Math.random() * tileCountY)
        };
        // Ensure food doesn't spawn on snake
        for (let part of snake) {
            if (part.x === food.x && part.y === food.y) {
                placeFood();
                break;
            }
        }
    }

    function handleInput(e) {
        switch(e.key) {
            case 'ArrowUp': 
                if (direction !== 'DOWN') nextDirection = 'UP'; 
                break;
            case 'ArrowDown': 
                if (direction !== 'UP') nextDirection = 'DOWN'; 
                break;
            case 'ArrowLeft': 
                if (direction !== 'RIGHT') nextDirection = 'LEFT'; 
                break;
            case 'ArrowRight': 
                if (direction !== 'LEFT') nextDirection = 'RIGHT'; 
                break;
        }
    }

    function draw() {
        direction = nextDirection;

        // Move Snake Head
        let headX = snake[0].x;
        let headY = snake[0].y;

        if (direction === 'UP') headY--;
        if (direction === 'DOWN') headY++;
        if (direction === 'LEFT') headX--;
        if (direction === 'RIGHT') headX++;

        // Wall Collision
        if (headX < 0 || headX >= tileCountX || headY < 0 || headY >= tileCountY) {
            alert("Game Over! Score: " + score);
            resetGame();
            return;
        }

        // Self Collision
        for (let i = 0; i < snake.length; i++) {
            if (snake[i].x === headX && snake[i].y === headY) {
                alert("Game Over! Score: " + score);
                resetGame();
                return;
            }
        }

        snake.unshift({x: headX, y: headY});

        // Eat Food
        if (headX === food.x && headY === food.y) {
            score += 10;
            if (onScoreUpdate) onScoreUpdate(score);
            placeFood();
        } else {
            snake.pop();
        }

        // Draw Everything
        // Background
        ctx.fillStyle = '#0f172a'; // Dark blueish slate
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Food
        ctx.fillStyle = '#ef4444'; // Red
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

        // Snake
        ctx.fillStyle = '#22c55e'; // Green
        for (let i = 0; i < snake.length; i++) {
            ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize - 2, gridSize - 2);
        }
    }

    return {
        init: init,
        cleanup: cleanup
    };
})();

// Register to window
window.Games = window.Games || {};
window.Games['snake'] = SnakeGame;
