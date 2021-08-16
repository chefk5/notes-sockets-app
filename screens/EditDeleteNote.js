import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native'
import * as actions from '../redux/Actions';
import { connect } from 'react-redux';
function AddNote(props) {
    const [text, onChangeText] = React.useState();

    return (
        <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={props.modalVis}
        >
          <View style={styles.centeredView}>
          {/* <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder={props.selectedNote}
            />
            <TouchableOpacity style={styles.button} onPress={()=>{
                props.updateNote(props.selectedId, text)
                onChangeText('')
               // props.removeSelected()
                props.openCloseModal()
                }}>
                <Text>Save</Text>
            </TouchableOpacity> */}

            <TouchableOpacity onPress={()=>{
                                props.removeSelected()

                props.openCloseModal()
            }}>
                <Text>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
      </View>
        
    )
}

const mapStateToProps = (state) => ({
   selectedNote: state.selectedNote,
   selectedId:state.selectedId
   });
   
   function mapDispatchToProps(dispatch) {
     return {
          removeSelected: () => dispatch(actions.removeSelected()),
        //  selectInfo: (id, note) => dispatch(actions.selectInfo(id, note)),
     }
   }
   
   export default connect(mapStateToProps, mapDispatchToProps)(AddNote);

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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
    
  });