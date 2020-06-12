import {combineReducers} from 'redux';

import { UPDATE_E_READING, DELETE_E_READING, UPDATE_MARKED_DATE, UPDATE_W_READING, DELETE_W_READING, UPDATE_G_READING, DELETE_G_READING, } from './actions';

const electReadingReducer = (state=[], action) => {
  switch (action.type) {
    case UPDATE_E_READING:
      var newState = state.filter((reading) => reading.id != action.payload.id);
      return newState.concat(action.payload);
    case DELETE_E_READING:
      return state.filter((reading) => reading.id != action.payload.id);
    default:
      return state;
  }
}

const markedDatesReducer = (state={}, action) => {
  switch (action.type) {
    case UPDATE_MARKED_DATE:
      return {
        ...state, [action.payload.date]: { dots: action.payload.dots }}
    default:
      return state;
  }
}

const waterReadingReducer = (state=[], action) => {
  switch (action.type) {
    case UPDATE_W_READING:
      var newState = state.filter((reading) => reading.id != action.payload.id);
      return newState.concat(action.payload);
    case DELETE_W_READING:
      return state.filter((reading) => reading.id != action.payload.id);
    default:
      return state;
  }
}

const gasReadingReducer = (state=[], action) => {
  switch (action.type) {
    case UPDATE_G_READING:
      var newState = state.filter((reading) => reading.id != action.payload.id);
      return newState.concat(action.payload);
    case DELETE_G_READING:
      return state.filter((reading) => reading.id != action.payload.id);
    default:
      return state;
  }
}

const reducer = combineReducers({
  electReadings: electReadingReducer,
  markedDates: markedDatesReducer,
  waterReadings: waterReadingReducer,
  gasReadings: gasReadingReducer,
})

export default reducer;
