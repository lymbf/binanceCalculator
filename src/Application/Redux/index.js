import { combineReducers } from 'redux';
import inputs from './Reducers/inputs';
import outputs from './Reducers/outputs';

let combinedReducers = combineReducers({ inputs, outputs });

export default combinedReducers;
