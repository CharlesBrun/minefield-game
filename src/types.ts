export type createBoardType = {
    row: number;
    column: number;
    opened: boolean;
    flagged: boolean;
    mined: boolean;
    exploded: boolean;
    nearMines: number;
    bigger: boolean;
}

export type createBoardListType = (rows: number, columns: number) => createBoardType[][]
export type spreadMinesFunctionType = (board: createBoardType[][], minesAmount: number) => void
export type createMinedBoardFunctionType = (rows: number, columns: number, minesAmount: number) => createBoardType[][]