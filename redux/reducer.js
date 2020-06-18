import {combineReducers} from 'redux';

import { UPDATE_E_READING, DELETE_E_READING, UPDATE_MARKED_DATE, UPDATE_W_READING, DELETE_W_READING,
  UPDATE_G_READING, DELETE_G_READING, UPDATE_BILL, DELETE_BILL, UPDATE_PHOTO, DELETE_PHOTO,
  DELETE_UNSAVED_PHOTOS, UPDATE_REMINDER, DELETE_REMINDER } from './actions';

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

const billReducer = (state=[], action) => {
  switch (action.type) {
    case UPDATE_BILL:
      var newState = state.filter((bill) => !(bill.month == action.payload.month && bill.year == action.payload.year));
      return newState.concat(action.payload);
    case DELETE_BILL:
      return state.filter((bill) => !(bill.month == action.payload.month && bill.year == action.payload.year));
    default:
      return state;
  }
}

const photoReducer = (state=[], action) => {
  switch (action.type) {
    case UPDATE_PHOTO:
      var newState = state.filter((photo) => photo.uri != action.payload.uri);
      return newState.concat(action.payload);
    case DELETE_PHOTO:
      return state.filter((photo) => photo.uri != action.payload.uri);
    case DELETE_UNSAVED_PHOTOS:
      var newState = state.filter((photo) => photo.saved == true);
      return newState;
    default:
      return state;
  }
}

const reminderReducer = (state=[], action) => {
  switch (action.type) {
    case UPDATE_REMINDER:
      var newState = state.filter((reminder) => reminder.type != action.payload.type);
      return newState.concat(action.payload);
    case DELETE_REMINDER:
      return state.filter((reminder) => reminder.type != action.payload);
    default:
      return state;
  }
}

const reducer = combineReducers({
  electReadings: electReadingReducer,
  markedDates: markedDatesReducer,
  waterReadings: waterReadingReducer,
  gasReadings: gasReadingReducer,
  bills: billReducer,
  photos: photoReducer,
  reminder: reminderReducer,
})

export default reducer;
