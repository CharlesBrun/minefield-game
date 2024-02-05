import React, { useState } from 'react';

import {
  Alert,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import params from './src/params';
import { cloneBoard, createMinedBoard, flagsUsed, hadExplosion, invertFlag, openField, showMines, wonGame } from './src/functions'
import Minefield from './src/components/Minefield';
import { createBoardType } from './src/types';
import Header from './src/components/Header';
import LevelSelection from './src/screens/LevelSelection';

interface AppState {
  board: createBoardType[][];
  lost: boolean;
  won: boolean;
  showLevelSelection: boolean;
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
      showLevelSelection: false,
    };
  }

  const onOpenField = (row: number, column: number) => {
    const board = cloneBoard(state.board)
    openField(board, row, column)
    const lost = hadExplosion(board)
    const won = wonGame(board)

    if (lost) {
      showMines(board)
      Alert.alert('Booom!', 'Perdeu!')
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

    setState({ board, won, lost: false, showLevelSelection:false })
  }

  const onLevelSelected = (level: number) => {
    params.difficultLevel = level
    setState(createState())
  }

  return (
    <View style={styles.container}>
      <LevelSelection isVisible={state.showLevelSelection}
          onLevelSelected={onLevelSelected}
          onCancel={() => setState({ board: state.board, won: false, lost: false, showLevelSelection: false })} />
      <Header flagsLeft={minesAmount() - flagsUsed(state.board)}
          onNewGame={() => setState(createState())} 
          onFlagPress={() => setState({ board: state.board, won: false, lost: false, showLevelSelection: true })} />
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
