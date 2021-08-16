import React, {useEffect} from 'react'
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import Btn from '../components/Btn';
import {addNewNote, deleteNote, fetchNotes, updateNote} from '../redux/Actions';
import { connect } from 'react-redux';

function ViewEdit(props) {
    const [text, onChangeText] = React.useState('');

    useEffect(() => {
        onChangeText(props.route.params.note)
        
    }, [])

    const update = async (note) =>{
        if(note){
        await props.dispatch(updateNote(note, props.route.params.id))
        props.navigation.goBack()
        } else {
            console.log('no')
        }
    }

    const deleteNote1= async(note) =>{
     
        await props.dispatch(deleteNote(props.route.params.id))
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
                    editable={props.route.params.canEdit}
                    placeholder={'Add your note...'}
                    maxLength={200}
                />
                {props.route.params.canEdit && <View>
                <Btn
                    btnFunc={deleteNote1}
                    note={text}
                    btnText={'Delete'}
                    btnColor={'red'}
                />

                <Btn
                    btnFunc={update}
                    note={text}
                    btnText={'Edit'}
                    btnColor={'white'}
                />
                </View>}
                
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
const mapStateToProps = (state) => ({
    user: state.user
 });
export default connect(mapStateToProps)(ViewEdit);
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