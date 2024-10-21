// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "./Slice/cartSlice"
// import userReducer from "./Slice/userSlice"

// const store = configureStore({
//     reducer:{
//         cart: cartReducer,
//         userinfo: userReducer,
//     }
// })

// export default store;


import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import cartReducer from "./Slice/cartSlice"
import userReducer from "./Slice/userSlice"

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};
const rootReducer = combineReducers({ userinfo: userReducer, cart: cartReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store =  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })

export const persistor = persistStore(store)
