import { combineReducers,configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice';
import {persistReducer,persistStore} from 'redux-persist';
// import CombineReducers from 'redux-persist/es/persistCombineReducers';
// import { version } from 'mongoose';
import storage from 'redux-persist/lib/storage';
// import persistStore from 'redux-persist/es/persistStore';
// import persistReducer from 'redux-persist/es/persistReducer';
// import { GetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'

const rootReducer = combineReducers({user:userReducer})

const persistConfig = {
  key: 'root',
  storage,
  version:1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware:(GetDefaultMiddleware) =>
  GetDefaultMiddleware({
    serializableCheck: false,
  }),
});
export const persistor = persistStore(store);
