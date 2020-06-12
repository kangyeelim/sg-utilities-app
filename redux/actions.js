export const UPDATE_E_READING = 'UPDATE_E_READING'
export const DELETE_E_READING = 'DELETE_E_READING'
export const UPDATE_MARKED_DATE = 'UPDATE_MARKED_DATE'
export const FORMAT_MARKED_DATE = 'FORMAT_MARKED_DATE'
export const UPDATE_W_READING = 'UPDATE_W_READING'
export const DELETE_W_READING = 'DELETE_W_READING'
export const UPDATE_G_READING = 'UPDATE_G_READING'
export const DELETE_G_READING = 'DELETE_G_READING'
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
