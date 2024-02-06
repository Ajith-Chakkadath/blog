import { configureStore } from '@reduxjs/toolkit';
import userReducer from './User/userSlice'; // Make sure the path is correct
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist'; // Import persistStore here

const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

// Wrap the rootReducer with persistReducer, passing in the persistConfig and rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer); // Correct usage of persistReducer

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

export const persistor = persistStore(store); // Create a persistor for your store
