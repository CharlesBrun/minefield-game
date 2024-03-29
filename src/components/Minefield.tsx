import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Field from './Field'
import { createBoardType } from '../types'

const Minefield:React.FC<{board:createBoardType[][], onOpenField:any, onSelectField:any}> = ({board, onOpenField, onSelectField}) => {
    const rows = board.map((row, r) => {
        const columns = row.map((field, c) => {
            return <Field {...field} key={c} 
            onOpen={() => onOpenField(r, c)} 
            onSelect={() => onSelectField(r, c)} 
            />
        })
        return <View key={r}
            style={{flexDirection: 'row'}}>{columns}</View>
    })
    return <View style={styles.container}>{rows}</View>
}

export default Minefield

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEE',
    }
})