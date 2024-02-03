import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import params from '../params'
import Mine from './Mine'
import Flag from './Flag'

type props = {
  mined: boolean, 
  opened: boolean, 
  nearMines: number,
  exploded: boolean,
  flagged: boolean,
  bigger: boolean,
  onOpen: any,
  onSelect: any
}

const Field:React.FC<props> = ({mined, opened, nearMines, exploded, flagged, bigger, onOpen, onSelect}) => {

    const styleFields:any = [styles.field]
    if (opened) styleFields.push(styles.opened)
    if (exploded) styleFields.push(styles.exploded)
    // if (flagged) styleFields.push(styles.flagged)
    if (!opened && !exploded) styleFields.push(styles.regular)

let color
if(nearMines > 0){
  if(nearMines == 1) color = '#2A28D7'
  if(nearMines == 2) color = '#2B520F'
  if(nearMines > 2 && nearMines < 6) color = '#F9060A'
  if(nearMines >= 6) color = '#F221A9'
}

  return (
    <TouchableWithoutFeedback onPress={onOpen} onLongPress={onSelect}>
      <View style={styleFields}>
        {!mined && opened && nearMines > 0 ?
          <Text style={[styles.label, { color:color }]}>
            {nearMines}
          </Text> : false
        }
        { mined && opened ? <Mine/> : false }
        {flagged && !opened ? <Flag bigger={bigger} /> : false}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Field

const styles = StyleSheet.create({
    field: {
        width: params.blockSize,
        height: params.blockSize,
        borderWidth: params.borderSize,
    },
    regular: {
        backgroundColor: '#999',
        borderLeftColor: '#CCC',
        borderTopColor: '#CCC',
        borderRightColor: '#333',
        borderBottomColor: '#333',
    },
    opened: {
      backgroundColor: '#999',
      borderColor: '#777',
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      fontWeight: 'bold',
      fontSize: params.fontSize,
    },
    exploded: {
      backgroundColor: 'red',
      borderColor: 'red',
    }
})