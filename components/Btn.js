import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function Btn(props) {
    return (
        <TouchableOpacity style={[styles.btn,{ backgroundColor: props.btnColor}]} onPress={()=> props.btnFunc(props.note)}>
                <Text style={styles.btnText}>{props.btnText}</Text>
            </TouchableOpacity>
            
    )
}

const styles = StyleSheet.create({

      btn:{
          backgroundColor:'white',
          marginBottom: 50,
          marginHorizontal: 20,
          borderRadius: 20

      },
      btnText: {
          alignSelf: 'center',
          paddingVertical: 15,
          fontWeight:'700',
          fontSize: 15
          
      }

})