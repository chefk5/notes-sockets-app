import { createStore, applyMiddleware } from "redux"
import Reducer from './Reducer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'

const persistConfig = {

    key: 'persistedReducer',
 
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, Reducer)

const store = createStore(persistedReducer, applyMiddleware(thunk))

let persistor = persistStore(store)

export {store, persistor}


