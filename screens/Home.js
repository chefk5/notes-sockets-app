import React, {useEffect, useState, useLayoutEffect} from 'react'
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, TextInput, FlatList } from 'react-native'
import { FadeInFlatList } from '@ja-ka/react-native-fade-in-flatlist';
import axios from 'axios';
import {addNewNote, deleteList, fetchNotes} from '../redux/Actions';
import { connect } from 'react-redux';
import { io, broadcast } from "socket.io-client";
import EditDeleteNote from '../screens/EditDeleteNote'
import AddNote from './AddNote';
import { color } from 'react-native-reanimated';
import NetInfo from '@react-native-community/netinfo';

const socket = io("https://guarded-thicket-10496.herokuapp.com/");

const colors = ['#409caf','#1e90ff','#ae5d5d','#ed6476']
function Home(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading]= useState(true)
  const [notesItemsList, setNotesItemsList ] = useState('')
  const [searchText, setSearchText] = useState('')

  useLayoutEffect(() => {
    if (!props.user) {
      setTimeout(() => {
       props.navigation.navigate('AddUser')
      }, 1000)
    }
  }, [])


  useEffect(() => {
    socket.on('list', async data => {
   // console.log("🚀 ~ file: Home.js ~ line 23 ~ useEffect ~ data", data)
      await props.dispatch(fetchNotes(data))
    });

   
    setLoading(false)
    console.log('rr')
    
    props.navigation.setOptions({
      headerLeft: () => (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Notes</Text>
        </View>
      ),
  })
  }, [])

  // const addNewNote = (note) => {
  // console.log("🚀 ~ file: Home.js ~ line 36 ~ addNewNote ~ note", note)
  //   let noteObj = {
  //     note: note,
  //     author: 'test1'
  //   }
  //   socket.emit('add', noteObj)
  // }

  const updateNote = (id, note) => {
    console.log("🚀 ~ file: Home.js ~ line 36 ~ addNewNote ~ note", id)
    let noteObj = {
      note: note,
    }
      socket.emit('update', {'note': noteObj, 'id': id})
    }
  // const renderItem = ({ item, index }) => { 
  //   return(
  //   <TouchableOpacity onPress={()=>{
  //     props.selectInfo(item.note, item._id)
  //     openCloseModal()
      
  //     }}>
  //     <Text>{item.note}</Text>
  //   </TouchableOpacity>
  // )}

  const openCloseModal = () => {
    setModalVisible(modalVisible => !modalVisible)
  }


  const renderItem = ({ item, index }) => (
    <Item title={item.note} index={index} id={item._id} author={item.author}/>
  );

  const Item = ({ title , index, id, author}) => (
    <TouchableOpacity
      style={[styles.item, { backgroundColor: colors[index % colors.length] }]}
      onPress={() => props.navigation.navigate('ViewEdit',{
        note: title,
        id:id,
        canEdit: props.user == author ? true : false
      })}>
      <Text numberOfLines={2} style={styles.itemContent}>{title}</Text>
      <View style={styles.author}>
        <Text style={styles.authorText}>{author}</Text>
        {/* <Text style={styles.authorText}>{'address.length' < 35
                ? `${address}`
                : `${address.substring(0, 32)}...`}</Text> */}
      </View>
    </TouchableOpacity>
  );


  // const searchFilterFunction =(text)=> {
  //   setSearchText(text)
  //   if (!text) {
  //     setNotesItemsList(props.notesList)
  //     return;
  //   }
  //   const newData = props.notesList.filter((item) => {
  //     const itemData = `${item.note.toUpperCase()}`;
  //     const textData = text.toUpperCase();
  //     return itemData.indexOf(textData) > -1;
  //   });


   
  //   setNotesItemsList(newData)

  // }

  return (
    <View style={styles.container}>
      

  
      {!loading&&<FlatList
        data={props.notesList}
        renderItem={renderItem}
        initialNumToRender={5}
        keyExtractor={item => item._id}
        contentContainerStyle={{ paddingBottom: 200 }}
      />}

      <TouchableOpacity style={styles.addBtn} onPress={()=> props.navigation.navigate('Add')}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
      
       {/* {!props.user && <AddNote
        addNewNote={addNewNote}
        
      />} */}
      {/*<FadeInFlatList
        initialDelay={0}
        durationPerItem={500}
        parallelItems={10}
        itemsToFadeIn={10}
        data={props.notesList}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />*/}
      
  </View>
  )
}

const mapStateToProps = (state) => ({
   notesList: state.notesList,
   user: state.user
});

// function mapDispatchToProps(dispatch) {
//   return {
//       //addNewNote: (note) => dispatch(actions.addNewNote(note)),
//       selectInfo: (id, note) => dispatch(actions.selectInfo(id, note)),
//   }
// }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  headerTitle: {
    color:'white',
    fontSize: 24,
    fontWeight: '700'
  },
  header:{
    marginLeft: 20
  },
  input: {
    backgroundColor: '#747272',
    marginVertical: 25,
    marginHorizontal: 20,
    borderRadius: 20,
    height: 40,
    paddingHorizontal: 15,
    color: 'white',
    fontSize: 18,
    fontWeight: '600'
  },
  item: {
    backgroundColor:'red',
    marginHorizontal: 20,
    borderRadius: 10,
    minHeight: 70,
    maxHeight: 100,
    marginVertical: 10
  },
  itemContent: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontWeight: '700',
    color:'#fff',
    fontSize: 15
  },
  author: {
    position: "absolute",
    bottom: 0,
    alignSelf: "flex-end",
  },
  authorText: {
    marginTop:10,
    marginRight: 10,
    marginBottom: 10,
    color: '#ebe9f0'
  },
  addBtn: {
    backgroundColor:'white',
    position: 'absolute',
    bottom: 40,
    right: 15,
    height: 70,
    width: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,

  },
  plus: {
    fontSize: 30,
  },
  banner:{
    backgroundColor:'red',
    height: 50,
    justifyContent:'center',
    alignItems:'center'
  },
  bannerText:{
    fontSize: 18,
    fontWeight: '700',
    color:'white'
  }
});



export default connect(mapStateToProps)(Home);
