import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'

export default function AddNote(props) {
    const [text, onChangeText] = React.useState();

    return (
        <View>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
            />
            <TouchableOpacity style={styles.button} onPress={()=>{
                props.addNewNote(text)
                
                }}>
                <Text>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input:{
        backgroundColor:'red',
        height: 50
    },
    button: {
        backgroundColor:'blue'
    }
  });