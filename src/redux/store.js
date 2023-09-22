import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
const persistConfig = {
  key: "root",
  storage,
};
const RootReducer = combineReducers({
  app: appReducer,
});

const persistedReducer = persistReducer(persistConfig, RootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);