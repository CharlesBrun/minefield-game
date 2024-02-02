import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import params from './src/params';
import Field from './src/components/Field';

import { createMinedBoard } from './src/functions'
import Minefield from './src/components/Minefield';

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
      board: createMinedBoard(rows, cols, minesAmount())
    }
  }

  const [state, setState] = useState(createState());

  return (
    <View style={styles.container}>
      <View style={styles.board}>
          <Minefield board={state.board} />
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
