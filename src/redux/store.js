import { configureStore, combineReducers} from "@reduxjs/toolkit";
import membersReducer from "./slices/membersSlice"
import roleReducer from "./slices/roleSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['members', 'role'],
};

const rootReducer = combineReducers({
    members: membersReducer,
    role: roleReducer,
});

const perReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: perReducer,
    middleware: (DefaultMid) => DefaultMid({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);