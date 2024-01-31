import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import params from '../params'

type props = {
  mined:boolean, 
  opened:boolean, 
  nearMines:number
}

const Field:React.FC<props> = ({mined, opened, nearMines}) => {

    const styleFields:any = [styles.field]
    if(opened) styleFields.push(styles.opened)
    if(styleFields.length === 1) styleFields.push(styles.regular)

let color
if(nearMines > 0){
  if(nearMines == 1) color = '#2A28D7'
  if(nearMines == 2) color = '#2B520F'
  if(nearMines > 2 && nearMines < 6) color = '#F9060A'
  if(nearMines >= 6) color = '#F221A9'
}

  return (
    <View style={styleFields}>
      {!mined && opened && nearMines > 0 ?
        <Text style={[styles.label, { color:color }]}>
          {nearMines}
        </Text> : false
      }
    </View>
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
    }
})