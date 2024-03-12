import { combineReducers, configureStore } from '@reduxjs/toolkit';
import Reducer from './reducer'

export const store = configureStore({
    reducer: { appReducer: Reducer }
});
// export const store = combineReducers({
//     appReducer:Reducer
// });