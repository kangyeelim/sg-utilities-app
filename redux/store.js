import {createStore, applyMiddleware} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducer from './reducer'

const persistConfig = {
  key: 'root',
  storage,
}

/*const persistedReducer = persistReducer(persistConfig, reducer);
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);*/
export const store = createStore(reducer);
