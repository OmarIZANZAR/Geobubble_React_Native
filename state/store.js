import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducer'

const middlwares = [ thunk ]

const initialState = {
    locator: { currentLocation: null },

    location: {
        deviceID: '',
        safeAreaDiameter: 14,
        safeAreas: []
    },

    timer: { currentTime: null },

    timeSettings: {
        curfewTime: null,
        curfewAlertTime: null,
        curfewAlertReminder: null,
    },

    appConfig: {
        appIsSilent: false,
        appIsOff: false,
        carModeIsOn: false,
        appTheme: 'light',

        defaultAreaDiameter: 7,
        defaultCurfewTime: '20:00:00',
        defaultCurfewAlertTime: '19:30:00',
        defaultCurfewAlertReminder: '19:25:00',
    },

    modal: {
        isVisible: false,
        types: ['mask', 'curfewTime', 'curfewReminder', 'distance'],
        activeType: '',
        repeat: false,
        response: null,
    },

    sound: { sound: null },
}

const Store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middlwares))
)

export default Store