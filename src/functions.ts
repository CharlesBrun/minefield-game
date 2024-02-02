import { createBoardListType, createBoardType, createMinedBoardFunctionType, spreadMinesFunctionType } from "./types"

const createBoard:createBoardListType = (rows, columns) => {
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_, column) => {
            return {
                row,
                column,
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearMines: 0,
                bigger:false,
            }
        })
    })
}

const spreadMines:spreadMinesFunctionType = (board, minesAmount) => {
    const rows = board.length
    const columns = board[0].length
    let minesPlanted = 0
    
    while (minesPlanted < minesAmount) {
        const rowSel = parseInt((Math.random() * rows).toString(), 10)
        const columnSel = parseInt((Math.random() * columns).toString(), 10)

        if (!board[rowSel][columnSel].mined) {
            board[rowSel][columnSel].mined = true
            minesPlanted++
        }
    }
}

const createMinedBoard:createMinedBoardFunctionType = (rows, columns, minesAmount) => {
    const board = createBoard(rows, columns)
    spreadMines(board, minesAmount)
    return board
}

const cloneBoard:(board:createBoardType[][]) => createBoardType[][] = board => {
    return board.map(rows => {
        return rows.map(field => {
            return { ...field }
        })
    })
}

const getNeighbors = (board: createBoardType[][], row: number, column: number) => {
    const neighbors: any[] = []
    const rows = [row - 1, row, row + 1]
    const columns = [column - 1, column, column + 1]
    rows.forEach(r => {
        columns.forEach(c => {
            const different = r !== row || c !== column
            const validRow = r >= 0 && r < board.length
            const validColumn = c >= 0 && c < board[0].length
            if (different && validRow && validColumn) {
                neighbors.push(board[r][c])
            }
        })
    })
    return neighbors
}

const safeNeighborhood = (board: createBoardType[][], row: number, column: number) => {
    const safes = (result: any, neighbor: { mined: any }) => result && !neighbor.mined
    return getNeighbors(board, row, column).reduce(safes, true)
}

const openField = (board: createBoardType[][], row: number, column: number) => {
    const field = board[row][column]
    if (!field.opened) {
        field.opened = true
        if (field.mined) {
            field.exploded = true
        } else if (safeNeighborhood(board, row, column)) {
            getNeighbors(board, row, column)
                .forEach(n => openField(board, n.row, n.column))
        } else {
            const neighbors = getNeighbors(board, row, column)
            field.nearMines = neighbors.filter(n => n.mined).length
        }
    }
}

const fields = (board: any) => [].concat(...board)
const hadExplosion = (board: createBoardType) => fields(board).filter(field => (field as createBoardType).exploded).length > 0
const pendding = (field: createBoardType) => (field.mined && !field.flagged) || (!field.mined && !field.opened)
const wonGame = (board: createBoardType) => fields(board).filter(pendding).length === 0
const showMines = (board: createBoardType) => fields(board)
.filter(field => (field as createBoardType).mined).forEach(field => (field as createBoardType).opened = true)

const invertFlag = (board: createBoardType[][], row: number, column: number) => {
    const field = board[row][column]
    field.flagged = !field.flagged
}

const flagsUsed = (board: createBoardType) => fields(board).filter(field => (field as createBoardType).flagged).length

export { 
    createMinedBoard,
    cloneBoard,
    openField,
    hadExplosion,
    wonGame,
    showMines,
    invertFlag,
    flagsUsed
}