import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Mine:React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.coreMine} />
      <View style={styles.line} />
      <View style={[styles.line, { transform: [{rotate:'45deg'}] }]} />
      <View style={[styles.line, { transform: [{rotate:'90deg'}] }]} />
      <View style={[styles.line, { transform: [{rotate:'135deg'}] }]} />
    </View>
  )
}

export default Mine

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  coreMine: {
    height: 14,
    width: 14,
    borderRadius: 10,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    position: 'absolute',
    height: 3,
    width: 20,
    borderRadius: 3,
    backgroundColor: 'black',
  }
})