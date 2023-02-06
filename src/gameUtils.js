export function getNextBoard(currentBoard) {
    let newBoard = JSON.parse(JSON.stringify(currentBoard))
    for (let i = 0; i < currentBoard.length; i++) {
        for (let e = 0; e < currentBoard[i].length; e++) {
            let neighbours = countAliveNeighbours(i, e, currentBoard)
            newBoard[i][e] = nextCellState(currentBoard[i][e], neighbours)
        }
    }
    console.log("getting next board")
    return newBoard
}

export function createBoard(size) {
    var board = [];
    for (var i = 0; i < size; i++) {
        board[i] = [];
        for (var j = 0; j < size; j++) {
            board[i][j] = false
        }
    }
    console.log("creating a board")
    return board
}

export const getBoard = (size, setMatrix) => {
    console.log("getting a board")
    setMatrix(createBoard(size));
};

export const onCellClick = (x, y, matrix, setMatrix) => {
    let newMatrix = matrix;
    matrix[y][x] = !matrix[y][x];
    setMatrix(newMatrix);
    console.log("on cell click")
};

export const randomiseBoard = (setMatrix, matrix) => {
    let newMatrix = matrix.map(row => {
        return row.map(cell => {
            return Math.random() < 0.20
        })
    })
    setMatrix(newMatrix)
    console.log("randomising board")
}

export const runInterval = (interval, storeIntervalId, setMatrix, matrix) => {
    console.log("interval: ", interval)
    if (!interval) {
        let id = setInterval(() => {
            console.log("gettingNextBoard")
            setMatrix(getNextBoard(matrix));
        }, 100)
        console.log("IntervalId: ", id)
        storeIntervalId(id);
    } else {
        console.log("clearing interval")
        clearInterval(interval);
        storeIntervalId(null);
    }
};

function displayBoard(board) {
    console.clear();
    board.forEach(row => {
        row.forEach(cell => {
            let char = cell ? "   " : "|||"
            process.stdout.write(char)
        });
        console.log("")
    });
}

function getNeighbours(cellRow, cellColumn, board) {
    let neighbours = [];

    for (let i = cellRow - 1; i <= cellRow + 1; i++) {
        for (let j = cellColumn - 1; j <= cellColumn + 1; j++) {
            if (i != cellRow || j != cellColumn) {
                if (indicesAreOutOfBounds(i, j, board) == false) {
                    neighbours.push(board[i][j])
                }
            }
        }
    }
    // console.log(neighbours)
    return neighbours
}

function indicesAreOutOfBounds(rowIndex, columnIndex, array) {
    return isOutOfBounds(rowIndex, array) || isOutOfBounds(columnIndex, array)
}

function isOutOfBounds(index, array) {

    if (index < array.length && index >= 0) {
        return false
    }

    else {
        return true
    }
}

function isOverPopulated(neighbourCount) {
    if (neighbourCount >= 4) {
        return true
    }
    else {
        return false
    }

}

function isRessurectable(neighbourCount) {
    if (neighbourCount == 3) {
        return true
    } else {
        return false
    }
}

function isUnderPopulated(neighbourCount) {
    if (neighbourCount < 2) {
        return true
    } else {
        return false
    }
}

function nextCellState(cellState, neighbourCount) {
    if (isOverPopulated(neighbourCount) == true){
        return false
    }
    else if (isUnderPopulated(neighbourCount) == true) {
        return false
    }
    else if (isRessurectable(neighbourCount) == true){
        return true
    }
    else {
        return cellState
    }
}

function countAliveNeighbours(cellRow, cellColumn, board) {
    let count = 0
    let cellsToCount = getNeighbours(cellRow, cellColumn, board)
    cellsToCount.forEach(element => {
        if (isAlive(element) == true) {
            count++
        }
    });

    return count
}

function isAlive(cell) {
    if (cell == true) {
        return true
    }
    else {
        return false
    }

}
