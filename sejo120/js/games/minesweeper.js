
const MinesweeperGame = (function () {
    let container;
    let score = 0;
    let onScoreUpdate;
    let grid = [];
    let rows = 10;
    let cols = 10;
    let mines = 15;
    let gameOver = false;

    function init(containerElement, scoreCallback) {
        container = containerElement;
        onScoreUpdate = scoreCallback;
        score = 0;
        onScoreUpdate(score);
        gameOver = false;

        container.innerHTML = '';
        const style = document.createElement('style');
        style.innerHTML = `
            .minesweeper-grid {
                display: grid;
                grid-template-columns: repeat(${cols}, 40px);
                gap: 2px;
                background-color: #334155;
                padding: 10px;
                border: 4px solid #475569;
                margin: 0 auto;
            }
            .cell {
                width: 40px;
                height: 40px;
                background-color: #94a3b8;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                cursor: pointer;
                user-select: none;
                font-family: monospace;
                font-size: 1.2rem;
            }
            .cell:hover { background-color: #cbd5e1; }
            .cell.revealed { background-color: #e2e8f0; cursor: default; }
            .cell.mine { background-color: #ef4444; }
            .cell.flagged { background-color: #f59e0b; }
        `;
        container.appendChild(style);

        const gridEl = document.createElement('div');
        gridEl.className = 'minesweeper-grid';
        container.appendChild(gridEl);

        createBoard(gridEl);

        return {
            controls: "Left click to reveal. Right click to flag.",
            cleanup: cleanup
        };
    }

    function createBoard(gridEl) {
        grid = [];
        gridEl.innerHTML = ''; // Start fresh

        // Initialize grid data
        for (let r = 0; r < rows; r++) {
            grid[r] = [];
            for (let c = 0; c < cols; c++) {
                grid[r][c] = {
                    isMine: false,
                    revealed: false,
                    flagged: false,
                    neighborMines: 0,
                    element: null,
                    r: r,
                    c: c
                };
            }
        }

        // Place Mines
        let minesPlaced = 0;
        while (minesPlaced < mines) {
            let r = Math.floor(Math.random() * rows);
            let c = Math.floor(Math.random() * cols);
            if (!grid[r][c].isMine) {
                grid[r][c].isMine = true;
                minesPlaced++;
            }
        }

        // Calculate Neighbors
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (!grid[r][c].isMine) {
                    let count = 0;
                    for (let x = -1; x <= 1; x++) {
                        for (let y = -1; y <= 1; y++) {
                            let nr = r + x;
                            let nc = c + y;
                            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc].isMine) {
                                count++;
                            }
                        }
                    }
                    grid[r][c].neighborMines = count;
                }
            }
        }

        // Render Grid
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.addEventListener('click', () => reveal(r, c));
                cell.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    flag(r, c);
                });
                grid[r][c].element = cell;
                gridEl.appendChild(cell);
            }
        }
    }

    function reveal(r, c) {
        if (gameOver || grid[r][c].revealed || grid[r][c].flagged) return;

        const cellData = grid[r][c];
        cellData.revealed = true;
        cellData.element.classList.add('revealed');

        if (cellData.isMine) {
            cellData.element.classList.add('mine');
            cellData.element.textContent = '💣';
            gameOver = true;
            alert('Game Over!');
            revealAll();
            return;
        }

        if (cellData.neighborMines > 0) {
            cellData.element.textContent = cellData.neighborMines;
            // Color code numbers
            const colors = ['#0000ff', '#008000', '#ff0000', '#000080', '#800000', '#008080', '#000000', '#808080'];
            cellData.element.style.color = colors[cellData.neighborMines - 1] || 'black';
        } else {
            // Flood fill
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    let nr = r + x;
                    let nc = c + y;
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                        reveal(nr, nc);
                    }
                }
            }
        }

        checkWin();
    }

    function flag(r, c) {
        if (gameOver || grid[r][c].revealed) return;
        const cellData = grid[r][c];
        cellData.flagged = !cellData.flagged;
        cellData.element.classList.toggle('flagged');
        cellData.element.textContent = cellData.flagged ? '🚩' : '';
    }

    function revealAll() {
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                grid[r][c].revealed = true;
                grid[r][c].element.classList.add('revealed');
                if (grid[r][c].isMine) {
                    grid[r][c].element.classList.add('mine');
                    grid[r][c].element.textContent = '💣';
                }
            }
        }
    }

    function checkWin() {
        let revealedCount = 0;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (grid[r][c].revealed) revealedCount++;
            }
        }
        if (revealedCount === (rows * cols) - mines) {
            gameOver = true;
            score = 100; // Arbitrary win score
            if (onScoreUpdate) onScoreUpdate(score);
            alert('You Win!');
        }
    }

    function cleanup() {
        // Nothing special to cleanup for DOM, container clearing handles it
        // Just reset state
        gameOver = true;
    }

    return {
        init: init,
        cleanup: cleanup
    };
})();

window.Games = window.Games || {};
window.Games['minesweeper'] = MinesweeperGame;
