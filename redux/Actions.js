import * as ActionTypes from './ActionTypes'
import axios from 'axios';
import { io, broadcast } from "socket.io-client";
import { reject } from 'lodash';


const socket = io("https://guarded-thicket-10496.herokuapp.com/");


// export const deleteList = () => ({
//     type: ActionTypes.INCREMENT,
// })



export const fetchNotes = (data) => {
    return dispatch => {
      return new Promise((resolve, reject) => {
          
            dispatch({ type: ActionTypes.FECTCH_NOTES, payload: data})
            resolve('notes fetched')
  
        }).catch(function (error) {
          console.log("error 2", error);
          reject("something wrong")
        });
      }
    }

export const updateNote = (note, id) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
    let noteObj = {
      note: note
    }
      socket.emit('update', {'note': noteObj, 'id': id})
      resolve('addNote')
    }).catch(function (error) {
      console.log("🚀 ~ file: Actions.js ~ line 72 ~ returnnewPromise ~ error", error)

    })
  }}

  export const deleteNote = (id) => {
    return dispatch => {
      return new Promise((resolve, reject) => {
      
        socket.emit('delete', id)
        resolve('deleteNote')
      }).catch(function (error) {
        console.log("🚀 ~ file: Actions.js ~ line 72 ~ returnnewPromise ~ error", error)
  
      })
    }}

export const addNewNote = (note, user) => {
console.log("🚀 ~ file: Actions.js ~ line 38 ~ addNewNote ~ note", note)
  let noteObj = {
    note: note,
    author: user
  }
  return dispatch => {
    return new Promise((resolve, reject) => {
      socket.emit('add', noteObj)
      resolve('addNote')
    }).catch(function (error) {
      console.log("🚀 ~ file: Actions.js ~ line 72 ~ returnnewPromise ~ error", error)

    })
  }}

  export const setUser = (user) => {
    return dispatch => {
      return new Promise((resolve, reject) => {
        dispatch({ type: ActionTypes.SET_USER, payload: user })
        resolve('user set')
  
      }).catch(function (error) {
        reject('user set')
      })
    }}

  //   export const removeSelected = () => ({
  //     type: ActionTypes.REMOVE,
  // })
  


    // export const fetchNotes = () => {
    //   return dispatch => {
    //     return new Promise((resolve, reject) => {
    //       axios.post(urls.serverUrl + '/api/v1/log/measure',
    //       {
    //         logged_time: time,
    //         type: type,
    //         value: value,
    //       },
    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //           "eb-token": code
    //         },
    //       }).then((responseJson) => {  
    //           dispatch({ type: ActionTypes.FECTCH_NOTES, payload: responseJson.data})
    //           resolve('notes fetched')
    
    //         }).catch(function (error) {
    //           reject("something wrong")
    //         });
    //       }).catch(function (error) {
    //         console.log("error 2", error);
    //         reject("something wrong")
    //       });
    
    //     }
    
    //   }
  
  
// export const incrementAction = () => ({
//     type: ActionTypes.INCREMENT,
// })


// export const resetAction = () => ({
//     type: ActionTypes.RESET,
// })
