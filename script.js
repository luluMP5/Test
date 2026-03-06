const ROWS = 6;
const COLS = 7;
const PLAYER1 = 1;
const PLAYER2 = 2;

let board = [];
let currentPlayer = PLAYER1;
let gameOver = false;

// Initialiser le plateau
function initBoard() {
    board = [];
    for (let i = 0; i < ROWS; i++) {
        board[i] = [];
        for (let j = 0; j < COLS; j++) {
            board[i][j] = 0;
        }
    }
    currentPlayer = PLAYER1;
    gameOver = false;
    updateUI();
    renderBoard();
}

// Rendre le plateau
function renderBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';

    for (let col = 0; col < COLS; col++) {
        const column = document.createElement('div');
        column.className = 'column';

        for (let row = ROWS - 1; row >= 0; row--) {
            const cell = document.createElement('div');
            cell.className = 'cell';

            if (board[row][col] === PLAYER1) {
                cell.classList.add('player1');
            } else if (board[row][col] === PLAYER2) {
                cell.classList.add('player2');
            } else {
                cell.classList.add('empty');
            }

            column.addEventListener('click', () => dropPiece(col));
            column.appendChild(cell);
        }

        gameBoard.appendChild(column);
    }
}

// Laisser tomber un jeton
function dropPiece(col) {
    if (gameOver) return;

    // Trouver la première ligne libre dans la colonne EN PARTANT DU BAS
    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row][col] === 0) {
            board[row][col] = currentPlayer;
            
            // Vérifier si c'est une victoire
            if (checkWin(row, col)) {
                gameOver = true;
                document.getElementById('status').textContent = `🎉 Joueur ${currentPlayer} a gagné !`;
            } else {
                // Changer de joueur
                currentPlayer = currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1;
                updateUI();
            }
            
            renderBoard();
            return;
        }
    }
}

// Vérifier si c'est une victoire
function checkWin(row, col) {
    const player = board[row][col];

    // Vérifier horizontal
    if (checkDirection(row, col, 0, 1, player)) return true;

    // Vérifier vertical
    if (checkDirection(row, col, 1, 0, player)) return true;

    // Vérifier diagonal (bas-gauche à haut-droite)
    if (checkDirection(row, col, 1, 1, player)) return true;

    // Vérifier diagonal (haut-gauche à bas-droite)
    if (checkDirection(row, col, 1, -1, player)) return true;

    return false;
}

// Vérifier une direction
function checkDirection(row, col, rowDir, colDir, player) {
    let count = 1;

    // Vérifier dans une direction
    for (let i = 1; i < 4; i++) {
        const newRow = row + rowDir * i;
        const newCol = col + colDir * i;
        if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS && board[newRow][newCol] === player) {
            count++;
        } else {
            break;
        }
    }

    // Vérifier dans la direction opposée
    for (let i = 1; i < 4; i++) {
        const newRow = row - rowDir * i;
        const newCol = col - colDir * i;
        if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS && board[newRow][newCol] === player) {
            count++;
        } else {
            break;
        }
    }

    return count >= 4;
}

// Mettre à jour l'interface
function updateUI() {
    document.getElementById('current-player').textContent = currentPlayer;
    if (!gameOver) {
        document.getElementById('status').textContent = `Au tour du joueur ${currentPlayer}`;
    }
}

// Bouton Nouvelle Partie
document.getElementById('reset-btn').addEventListener('click', initBoard);

// Initialiser le jeu
initBoard();
function computerMove() {
    let col;
    do {
        col = Math.floor(Math.random() * COLS);
    } while (board[0][col] !== 0);

    dropPiece(col);
}
document.getElementById('current-player').textContent =
currentPlayer === PLAYER1 ? "🔴 Joueur 1" : "🟡 Joueur 2";
