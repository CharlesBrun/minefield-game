import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import params from './src/params';
import Field from './src/components/Field';

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.wealcome}> Iniciando o Mines </Text>
      <Text>
        Tamanho da grade: {params.getRowsAmount()} x {params.getColumnsAmount()} 
      </Text>
      <Field mined={false} opened={false} nearMines={0}/>
      <Field mined={false} opened={true} nearMines={0}/>
      <Field mined={false} opened={true} nearMines={2}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  wealcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

export default App;
