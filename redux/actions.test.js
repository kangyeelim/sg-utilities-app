import * as actions from './actions'

//from ReadingForm.js:
const electricity = {key:'electricity', color: 'red'};
const water = {key:'water', color: 'blue'};
const gas = {key:'gas', color: 'green'};

//from SettingsScreen.js
const DAILY_READING_REMINDER = 'daily_reading_reminder';

describe('updateElectReading returns actions', () => {
  it('returns an action', () => {
    expect(actions.updateElectReading({id: '2020-01-01', reading: '100'})).toMatchSnapshot()
  })

  it('handles empty object', () => {
    expect(actions.updateElectReading({})).toMatchSnapshot()
  })

  it('handles empty reading', () => {
    expect(actions.updateElectReading({reading: ''})).toMatchSnapshot()
  })

  it('handles empty date', () => {
    expect(actions.updateElectReading({id: ''})).toMatchSnapshot()
  })
})

describe('updateWaterReading returns actions', () => {
  it('returns an action', () => {
    expect(actions.updateWaterReading({id: '2020-01-01', reading: '100'})).toMatchSnapshot()
  })

  it('handles empty object', () => {
    expect(actions.updateWaterReading({})).toMatchSnapshot()
  })

  it('handles empty reading', () => {
    expect(actions.updateWaterReading({reading: ''})).toMatchSnapshot()
  })

  it('handles empty date', () => {
    expect(actions.updateWaterReading({id: ''})).toMatchSnapshot()
  })
})

describe('updateGasReading returns actions', () => {
  it('returns an action', () => {
    expect(actions.updateGasReading({id: '2020-01-01', reading: '100'})).toMatchSnapshot()
  })

  it('handles empty object', () => {
    expect(actions.updateGasReading({})).toMatchSnapshot()
  })

  it('handles empty reading', () => {
    expect(actions.updateGasReading({reading: ''})).toMatchSnapshot()
  })

  it('handles empty date', () => {
    expect(actions.updateGasReading({id: ''})).toMatchSnapshot()
  })
})

describe('updateMarkedDate returns actions', () => {
  it('returns an action', () => {
    expect(actions.updateMarkedDate({date: '2020-01-01', dots: [electricity]})).toMatchSnapshot()
    expect(actions.updateMarkedDate({date: '2020-01-01', dots: [electricity, water]})).toMatchSnapshot()
    expect(actions.updateMarkedDate({date: '2020-01-01', dots: [electricity, water, gas]})).toMatchSnapshot()
  })

  it('handles empty object', () => {
    expect(actions.updateMarkedDate({})).toMatchSnapshot()
  })

  it('handles empty dots', () => {
    expect(actions.updateMarkedDate({dots: []})).toMatchSnapshot()
  })

  it('handles empty date', () => {
    expect(actions.updateGasReading({date: ''})).toMatchSnapshot()
  })
})

describe('updateBill returns actions', () => {
  it('returns an action', () => {
    expect(actions.updateBill({month:'10', year:'2020', captures:['directory/test/jpg']})).toMatchSnapshot()
  })

  it('handles empty object', () => {
    expect(actions.updateBill({})).toMatchSnapshot()
  })

  it('handles empty month', () => {
    expect(actions.updateBill({month: []})).toMatchSnapshot()
  })

  it('handles empty year', () => {
    expect(actions.updateBill({year: ''})).toMatchSnapshot()
  })

  it('handles empty captures', () => {
    expect(actions.updateBill({captures: []})).toMatchSnapshot()
  })
})

describe('updatePhoto returns actions', () => {
  it('returns an action', () => {
    expect(actions.updatePhoto({uri:'directory/test.jpg', saved:false})).toMatchSnapshot()
  })

  it('handles empty object', () => {
    expect(actions.updatePhoto({})).toMatchSnapshot()
  })

  it('handles empty uri', () => {
    expect(actions.updatePhoto({uri: ''})).toMatchSnapshot()
  })

  it('handles empty saved', () => {
    expect(actions.updatePhoto({saved: ''})).toMatchSnapshot()
  })

  it('handles empty captures', () => {
    expect(actions.updateBill({captures: []})).toMatchSnapshot()
  })
})

describe('updateReminder returns actions', () => {
  it('returns an action', () => {
    var date = new Date('2020-01-01');
    expect(actions.updateReminder({type:DAILY_READING_REMINDER, date:date, notification_id:'12345678'})).toMatchSnapshot()
  })

  it('handles empty object', () => {
    expect(actions.updateReminder({})).toMatchSnapshot()
  })

  it('handles empty type', () => {
    expect(actions.updateReminder({type: ''})).toMatchSnapshot()
  })

  it('handles empty date', () => {
    expect(actions.updateReminder({date: ''})).toMatchSnapshot()
  })

  it('handles empty notification id', () => {
    expect(actions.updateReminder({notification_id: ''})).toMatchSnapshot()
  })
})

describe('resetStore returns actions', () => {
  it('returns an action', () => {
    expect(actions.resetStore()).toMatchSnapshot()
  })
})

describe('deleteUnsavedPhotos returns actions', () => {
  it('returns an action', () => {
    expect(actions.deleteUnsavedPhotos()).toMatchSnapshot()
  })
})

describe('deleteElectReading returns actions', () => {
  it('returns an action', () => {
    expect(actions.deleteElectReading({id:'2020-01-01'})).toMatchSnapshot()
  })

  it('handles empty object', () => {
    expect(actions.deleteElectReading({})).toMatchSnapshot()
  })

  it('handles empty date', () => {
    expect(actions.deleteElectReading({id: ''})).toMatchSnapshot()
  })
})

describe('deleteWaterReading returns actions', () => {
  it('returns an action', () => {
    expect(actions.deleteWaterReading({id:'2020-01-01'})).toMatchSnapshot()
  })

  it('handles empty object', () => {
    expect(actions.deleteWaterReading({})).toMatchSnapshot()
  })

  it('handles empty date', () => {
    expect(actions.deleteWaterReading({id: ''})).toMatchSnapshot()
  })
})

describe('deleteGasReading returns actions', () => {
  it('returns an action', () => {
    expect(actions.deleteGasReading({id:'2020-01-01'})).toMatchSnapshot()
  })

  it('handles empty object', () => {
    expect(actions.deleteGasReading({})).toMatchSnapshot()
  })

  it('handles empty date', () => {
    expect(actions.deleteGasReading({id: ''})).toMatchSnapshot()
  })
})

describe('deletePhoto returns actions', () => {
  it('returns an action', () => {
    expect(actions.deletePhoto({uri:'directory/test.jpg', saved: false})).toMatchSnapshot()
    expect(actions.deletePhoto({uri:'directory/test.jpg', saved: true})).toMatchSnapshot()
  })

  it('handles empty object', () => {
    expect(actions.deletePhoto({})).toMatchSnapshot()
  })

  it('handles empty uri', () => {
    expect(actions.deletePhoto({uri: ''})).toMatchSnapshot()
  })

  it('handles empty saved', () => {
    expect(actions.deletePhoto({saved: ''})).toMatchSnapshot()
  })
})

describe('deleteBill returns actions', () => {
  it('returns an action', () => {
    expect(actions.deleteBill({month:'03', year: '2020'})).toMatchSnapshot()
  })

  it('handles empty object', () => {
    expect(actions.deleteBill({})).toMatchSnapshot()
  })

  it('handles empty month, no year', () => {
    expect(actions.deleteBill({month: ''})).toMatchSnapshot()
  })

  it('handles empty year, no month', () => {
    expect(actions.deleteBill({year: ''})).toMatchSnapshot()
  })
})

describe('deleteReminder returns actions', () => {
  it('returns an action', () => {
    expect(actions.deleteReminder({type:DAILY_READING_REMINDER})).toMatchSnapshot()
  })

  it('handles empty object', () => {
    expect(actions.deleteReminder({})).toMatchSnapshot()
  })

  it('handles empty type', () => {
    expect(actions.deleteReminder({type: ''})).toMatchSnapshot()
  })
})
