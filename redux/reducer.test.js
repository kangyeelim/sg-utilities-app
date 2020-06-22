import { rootReducer, appReducer } from './reducer'
import * as actions from './actions'

const DEFAULT_STATE = {
  electReadings: [],
  markedDates: {},
  waterReadings: [],
  gasReadings: [],
  bills: [],
  photos: [],
  reminder: [],
}

describe('reset store  reducer', () => {

  it('successfully reset', () => {
    expect(rootReducer(DEFAULT_STATE, actions.resetStore())).toMatchSnapshot()
  })

})

describe('electricity readings reducer', () => {

  it('successfully adds new electricity reading', () => {
    expect(rootReducer(DEFAULT_STATE, actions.updateElectReading({
      id: '2020-01-01',
      reading: '100'
    }))).toMatchSnapshot()

  })

  it('successfully updated existent electricity reading', () => {
    const originalError = console.error;
    console.error = jest.fn();
    var newState = appReducer(DEFAULT_STATE, actions.updateElectReading({
      id: '2020-01-01',
      reading: '100'
    }));
    expect(appReducer(newState, actions.updateElectReading({
      id: '2020-01-01',
      reading: '200'
    }))).toMatchSnapshot()
    console.error = originalError;

  })

  it('successfully delete electricity reading', () => {
    const originalError = console.error;
    console.error = jest.fn();
    var newState = appReducer(DEFAULT_STATE, actions.updateElectReading({
      id: '2020-01-01',
      reading: '100'
    }));
    expect(appReducer(newState, actions.deleteElectReading({
      id: '2020-01-01'
    }))).toMatchSnapshot()
    console.error = originalError;

  })

  it('delete non existent electricity reading', () => {
    const originalError = console.error;
    console.error = jest.fn();
    var newState = appReducer(DEFAULT_STATE, actions.updateElectReading({
      id: '2020-01-01',
      reading: '100'
    }));
    expect(appReducer(newState, actions.deleteElectReading({
      id: '2020-01-02'
    }))).toMatchSnapshot()
    console.error = originalError;
  })
})
