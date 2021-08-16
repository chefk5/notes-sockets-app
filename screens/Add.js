import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import Btn from '../components/Btn';
import { io, broadcast } from "socket.io-client";
import {addNewNote, deleteList, fetchNotes} from '../redux/Actions';
import { connect } from 'react-redux';

function Add(props) {
    const [text, onChangeText] = React.useState('');



    const saveNewNote=async(note)=>{
        await props.dispatch(addNewNote(note, props.user))
        props.navigation.goBack()
    }


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={100}
            style={styles.container}
        >
            <ScrollView style={styles.container} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}>

                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    multiline={true}
                    placeholder={'Add your note...'}
                    maxLength={200}
                />

                <Btn 
                btnFunc={saveNewNote}
                note={text}
                btnText={'Add'}
                btnColor={'white'}
                
                />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
 });

export default connect(mapStateToProps)(Add);

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
        minHeight: 150,
        maxHeight: 200,
        borderRadius: 20,
        marginHorizontal: 20,
        marginVertical: 20

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

    }

})