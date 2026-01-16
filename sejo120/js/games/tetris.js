
const TetrisGame = (function () {
    let canvas, ctx;
    let gameLoop;
    let score = 0;
    let onScoreUpdate;

    const ROW = 20;
    const COL = 10;
    const SQ = 20; // Square size
    const VACANT = "#0f172a"; // Background color

    // Tetrominos Definitions
    const I = [
        [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0]
        ]
    ];

    const J = [
        [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        [
            [0, 1, 1],
            [0, 1, 0],
            [0, 1, 0]
        ],
        [
            [0, 0, 0],
            [1, 1, 1],
            [0, 0, 1]
        ],
        [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0]
        ]
    ];

    const L = [
        [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0]
        ],
        [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1]
        ],
        [
            [0, 0, 0],
            [1, 1, 1],
            [1, 0, 0]
        ],
        [
            [1, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
        ]
    ];

    const O = [
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ]
    ];

    const S = [
        [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ],
        [
            [0, 1, 0],
            [0, 1, 1],
            [0, 0, 1]
        ],
        [
            [0, 0, 0],
            [0, 1, 1],
            [1, 1, 0]
        ],
        [
            [1, 0, 0],
            [1, 1, 0],
            [0, 1, 0]
        ]
    ];

    const T = [
        [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        [
            [0, 1, 0],
            [0, 1, 1],
            [0, 1, 0]
        ],
        [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0]
        ],
        [
            [0, 1, 0],
            [1, 1, 0],
            [0, 1, 0]
        ]
    ];

    const Z = [
        [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ],
        [
            [0, 0, 1],
            [0, 1, 1],
            [0, 1, 0]
        ],
        [
            [0, 0, 0],
            [1, 1, 0],
            [0, 1, 1]
        ],
        [
            [0, 1, 0],
            [1, 1, 0],
            [1, 0, 0]
        ]
    ];

    // Tetrominos
    const PIECES = [
        [Z, "red"],
        [S, "green"],
        [T, "yellow"],
        [O, "blue"],
        [L, "purple"],
        [I, "cyan"],
        [J, "orange"]
    ];

    let board = [];
    let p;

    function init(container, scoreCallback) {
        container.innerHTML = '';
        onScoreUpdate = scoreCallback;
        score = 0;
        onScoreUpdate(score);

        canvas = document.createElement('canvas');
        canvas.width = COL * SQ;
        canvas.height = ROW * SQ;
        canvas.style.border = '1px solid #333';
        canvas.style.backgroundColor = VACANT;
        container.appendChild(canvas);

        ctx = canvas.getContext('2d');

        createBoard();
        drawBoard();

        p = randomPiece();

        document.removeEventListener('keydown', handleInput);
        document.addEventListener('keydown', handleInput);

        if (gameLoop) cancelAnimationFrame(gameLoop);
        dropStart = Date.now();
        drop();

        return {
            controls: "Arrows to move and rotate.",
            cleanup: cleanup
        };
    }

    function createBoard() {
        board = [];
        for (let r = 0; r < ROW; r++) {
            board[r] = [];
            for (let c = 0; c < COL; c++) {
                board[r][c] = VACANT;
            }
        }
    }

    function drawBoard() {
        for (let r = 0; r < ROW; r++) {
            for (let c = 0; c < COL; c++) {
                drawSquare(c, r, board[r][c]);
            }
        }
    }

    function drawSquare(x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x * SQ, y * SQ, SQ, SQ);
        ctx.strokeStyle = "#334155";
        ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
    }

    function randomPiece() {
        let r = Math.floor(Math.random() * PIECES.length);
        return new Piece(PIECES[r][0], PIECES[r][1]);
    }

    function Piece(tetromino, color) {
        this.tetromino = tetromino;
        this.color = color;
        this.tetrominoN = 0; // The first rotation pattern
        this.activeTetromino = this.tetromino[this.tetrominoN];

        // Starting position
        this.x = 3;
        this.y = -2;
    }

    Piece.prototype.fill = function (color) {
        for (let r = 0; r < this.activeTetromino.length; r++) {
            for (let c = 0; c < this.activeTetromino.length; c++) {
                if (this.activeTetromino[r][c]) {
                    drawSquare(this.x + c, this.y + r, color);
                }
            }
        }
    }

    Piece.prototype.draw = function () {
        this.fill(this.color);
    }

    Piece.prototype.unDraw = function () {
        this.fill(VACANT);
    }

    Piece.prototype.moveDown = function () {
        if (!this.collision(0, 1, this.activeTetromino)) {
            this.unDraw();
            this.y++;
            this.draw();
        } else {
            this.lock();
            p = randomPiece();
        }
    }

    Piece.prototype.moveRight = function () {
        if (!this.collision(1, 0, this.activeTetromino)) {
            this.unDraw();
            this.x++;
            this.draw();
        }
    }

    Piece.prototype.moveLeft = function () {
        if (!this.collision(-1, 0, this.activeTetromino)) {
            this.unDraw();
            this.x--;
            this.draw();
        }
    }

    Piece.prototype.rotate = function () {
        let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
        let kick = 0;

        if (this.collision(0, 0, nextPattern)) {
            if (this.x > COL / 2) {
                // It's the right wall
                kick = -1; // Move left
            } else {
                // It's the left wall
                kick = 1; // Move right
            }
        }

        if (!this.collision(kick, 0, nextPattern)) {
            this.unDraw();
            this.x += kick;
            this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
            this.activeTetromino = this.tetromino[this.tetrominoN];
            this.draw();
        }
    }

    Piece.prototype.lock = function () {
        for (let r = 0; r < this.activeTetromino.length; r++) {
            for (let c = 0; c < this.activeTetromino.length; c++) {
                if (!this.activeTetromino[r][c]) {
                    continue;
                }
                if (this.y + r < 0) {
                    alert("Game Over");
                    score = 0;
                    createBoard();
                    drawBoard();
                    break;
                }
                board[this.y + r][this.x + c] = this.color;
            }
        }
        // Remove full rows
        for (let r = 0; r < ROW; r++) {
            let isRowFull = true;
            for (let c = 0; c < COL; c++) {
                isRowFull = isRowFull && (board[r][c] != VACANT);
            }
            if (isRowFull) {
                // If the row is full
                // we move down all the rows above it
                for (let y = r; y > 1; y--) {
                    for (let c = 0; c < COL; c++) {
                        board[y][c] = board[y - 1][c];
                    }
                }
                // the top row board[0][..] has no row above it
                for (let c = 0; c < COL; c++) {
                    board[0][c] = VACANT;
                }
                score += 10;
                if (onScoreUpdate) onScoreUpdate(score);
            }
        }
        drawBoard();
    }

    Piece.prototype.collision = function (x, y, piece) {
        for (let r = 0; r < piece.length; r++) {
            for (let c = 0; c < piece.length; c++) {
                if (!piece[r][c]) {
                    continue;
                }
                let newX = this.x + c + x;
                let newY = this.y + r + y;

                if (newX < 0 || newX >= COL || newY >= ROW) {
                    return true;
                }
                if (newY < 0) {
                    continue;
                }
                if (board[newY][newX] != VACANT) {
                    return true;
                }
            }
        }
        return false;
    }

    function handleInput(e) {
        // Prevent default scrolling for arrow keys
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            e.preventDefault();
        }

        if (e.key == "ArrowLeft") p.moveLeft();
        if (e.key == "ArrowRight") p.moveRight();
        if (e.key == "ArrowUp") p.rotate();
        if (e.key == "ArrowDown") p.moveDown();
    }

    let dropStart = Date.now();
    function drop() {
        let now = Date.now();
        let delta = now - dropStart;
        if (delta > 1000) {
            p.moveDown();
            dropStart = Date.now();
        }
        if (!gameLoop) return;
        gameLoop = requestAnimationFrame(drop);
    }

    function cleanup() {
        cancelAnimationFrame(gameLoop);
        gameLoop = null; // Important to stop the loop flag
        document.removeEventListener('keydown', handleInput);
    }




    return {
        init: init,
        cleanup: cleanup
    };
})();

window.Games = window.Games || {};
window.Games['tetris'] = TetrisGame;
