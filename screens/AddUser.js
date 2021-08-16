import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import Btn from '../components/Btn';
import { io, broadcast } from "socket.io-client";
import {addNewNote, deleteList, fetchNotes, setUser} from '../redux/Actions';
import { connect } from 'react-redux';

function AddUser(props) {
    const [text, onChangeText] = React.useState('');

    const saveUser=(user)=>{
    console.log("🚀 ~ file: AddUser.js ~ line 12 ~ saveUser ~ user", user)
        props.dispatch(setUser(user))
        props.navigation.navigate('Home')
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={80}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <View style={{justifyContent:'space-between', flex:1}}>
                    <View>
                        <Text style={styles.text}>What is your username?</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeText}
                            value={text}
                            //multiline={true}
                            placeholder={'Username'}
                            maxLength={30}
                        />
                    </View>
                

                <Btn 
                btnFunc={saveUser}
                note={text}
                btnText={'Save'}
                btnColor={'white'}
                />
            </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default connect()(AddUser);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    input: {

        borderWidth: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'white',
        height: 50,
        borderRadius: 20,
        marginHorizontal: 20,
        marginVertical: 20,
        justifyContent:'center'
    },
    btn: {
        backgroundColor: 'white',
        marginBottom: 50,
        marginHorizontal: 20,
        borderRadius: 20

    },
    btnText: {
        alignSelf: 'center',
        paddingVertical: 15,
        fontWeight: '700',
        fontSize: 15
    },
    text:{
        color:'white',
        marginHorizontal: 20,
        fontWeight: '700',
        fontSize: 24
    }

})