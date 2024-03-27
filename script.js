// Seleciona todas as células do jogo
const cells = document.querySelectorAll('[data-cell]');

// Seleciona o botão de reiniciar o jogo
const restartButton = document.getElementById('restartButton');

// Seleciona o elemento que exibe a pontuação do jogador X
const playerXScoreEl = document.getElementById('playerXScore');

// Seleciona o elemento que exibe a pontuação do jogador O
const playerOScoreEl = document.getElementById('playerOScore');

// Define a variável para controlar de quem é a vez de jogar
let xTurn = true;

// Inicializa a pontuação dos jogadores
let playerXScore = 0;
let playerOScore = 0;

// Define as combinações vencedoras do jogo da velha
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Função para iniciar o jogo
function startGame() {
    // Remove as classes 'x' e 'o' de todas as células e configura os eventos de clique
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    // Atualiza a pontuação dos jogadores
    updateScores();
}

// Função para lidar com o clique em uma célula
function handleClick(e) {
    const cell = e.target;
    const currentClass = xTurn ? 'x' : 'o';
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

// Função para finalizar o jogo
function endGame(draw) {
    if (draw) {
        setTimeout(() => {
            alert("Empate!");
            startGame();
        }, 100);
    } else {
        setTimeout(() => {
            alert(`${xTurn ? "Jogador X" : "Jogador O"} Venceu!`);
            if (xTurn) playerXScore++; else playerOScore++;
            updateScores();
            startGame();
        }, 100);
    }
}

// Função para atualizar a pontuação dos jogadores
function updateScores() {
    playerXScoreEl.textContent = playerXScore;
    playerOScoreEl.textContent = playerOScore;
}

// Função para marcar uma célula com o símbolo do jogador atual
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

// Função para alternar a vez de jogar entre os jogadores
function swapTurns() {
    xTurn = !xTurn;
}

// Função para verificar se algum jogador venceu
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

// Função para verificar se houve um empate
function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
}

// Adiciona um evento de clique para reiniciar o jogo ao botão de reiniciar
restartButton.addEventListener('click', startGame);

// Seleciona o botão de resetar pontuação e adiciona um evento de clique para resetar a pontuação
const resetScoreButton = document.getElementById('resetScoreButton');
resetScoreButton.addEventListener('click', resetScores);

// Função para resetar a pontuação dos jogadores
function resetScores() {
    playerXScore = 0;
    playerOScore = 0;
    updateScores();
}

// Inicia o jogo quando a página é carregada
startGame();
