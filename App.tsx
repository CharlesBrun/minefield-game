import React, { useState } from 'react';

import {
  Alert,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import params from './src/params';
import { cloneBoard, createMinedBoard, hadExplosion, invertFlag, openField, showMines, wonGame } from './src/functions'
import Minefield from './src/components/Minefield';
import { createBoardType } from './src/types';

interface AppState {
  board: createBoardType[][];
  lost: boolean;
  won: boolean;
}

function App(): React.JSX.Element {
  const minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()

    return Math.ceil(cols * rows * params.difficultLevel)
  }

  const createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()

    return {
      board: createMinedBoard(rows, cols, minesAmount()),
      lost: false,
      won: false,
    };
  }

  const onOpenField = (row: number, column: number) => {
    const board = cloneBoard(state.board)
    openField(board, row, column)
    const lost = hadExplosion(board)
    const won = wonGame(board)

    if (lost) {
      showMines(board)
      Alert.alert('Perdeeeeu!', 'Que buuuurro!')
    }

    if (won) {
      Alert.alert('Parabéns', 'Você Venceu!')
    }

    setState({ ...state, board, lost, won });
  }

  const [state, setState] = useState<AppState>(createState());

  const onSelectField = (row: number, column: number) => {
    const board = cloneBoard(state.board)
    invertFlag(board, row, column)
    const won = wonGame(board)

    if (won) {
      Alert.alert('Parabéns', 'Você Venceu!')
    }

    setState({ board, won, lost: false })
  }

  const onLevelSelected = (level: number) => {
    params.difficultLevel = level
    setState(createState())
  }

  return (
    <View style={styles.container}>
      <View style={styles.board}>
          <Minefield board={state.board} 
          onOpenField={onOpenField}
          onSelectField={onSelectField}
          />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA'
  }
});

export default App;
