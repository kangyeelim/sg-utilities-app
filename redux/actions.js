export const UPDATE_E_READING = 'UPDATE_E_READING'
export const DELETE_E_READING = 'DELETE_E_READING'
export const UPDATE_MARKED_DATE = 'UPDATE_MARKED_DATE'
export const FORMAT_MARKED_DATE = 'FORMAT_MARKED_DATE'
export const UPDATE_W_READING = 'UPDATE_W_READING'
export const DELETE_W_READING = 'DELETE_W_READING'
export const UPDATE_G_READING = 'UPDATE_G_READING'
export const DELETE_G_READING = 'DELETE_G_READING'
export const UPDATE_BILL = 'UPDATE_BILL'
export const DELETE_BILL = 'DELETE_BILL'
export const UPDATE_PHOTO = 'UPDATE_PHOTO'
export const DELETE_PHOTO = 'DELETE_PHOTOs'
export const DELETE_UNSAVED_PHOTOS = 'DELETE_UNSAVED_PHOTOS'
export const UPDATE_REMINDER = 'UPDATE_REMINDER'
export const DELETE_REMINDER = 'DELETE_REMINDER'
export const RESET = 'RESET'
// action creators
export const updateElectReading = update => ({
  type: UPDATE_E_READING,
  payload: update,
})

export const deleteElectReading = reading => ({
  type: DELETE_E_READING,
  payload: reading,
})

export const updateMarkedDate = date => ({
  type: UPDATE_MARKED_DATE,
  payload: date,
})

export const updateWaterReading = update => ({
  type: UPDATE_W_READING,
  payload: update,
})

export const deleteWaterReading = reading => ({
  type: DELETE_W_READING,
  payload: reading,
})

export const updateGasReading = update => ({
  type: UPDATE_G_READING,
  payload: update,
})

export const deleteGasReading = reading => ({
  type: DELETE_G_READING,
  payload: reading,
})

export const updateBill = bill => ({
  type: UPDATE_BILL,
  payload: bill,
})

export const deleteBill = bill => ({
  type: DELETE_BILL,
  payload: bill,
})

export const updatePhoto = photo => ({
  type: UPDATE_PHOTO,
  payload: photo,
})

export const deletePhoto = photo => ({
  type: DELETE_PHOTO,
  payload: photo,
})

export const deleteUnsavedPhotos = () => ({
  type: DELETE_UNSAVED_PHOTOS
})

export const updateReminder = time => ({
  type: UPDATE_REMINDER,
  payload: time
})

export const deleteReminder = type => ({
  type: DELETE_REMINDER,
  payload: type
})

export const resetStore = () => ({
  type: RESET
})
