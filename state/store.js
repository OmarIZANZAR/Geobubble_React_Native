import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducer'

const middlewares = [ thunk ]

const initialState = {
    locator: { currentLocation: null },
    locationSettings: {
        safeDistance: 1.5,
        safeAreaDiameter: 14,
        safeAreas: [
            // {
            //     isHome: Boolean,
            //     location: currentLocation,
            //     areaDiameter: safeAreaDiameter
            // }
        ],
    },

    timer: { currentTime: null },
    timeSettings: {
        curfewTime: '2021-06-11T22:00:00.601Z',
        curfewAlertTime: '2021-06-11T21:30:00.601Z',
        curfewAlertReminder: '2021-06-11T21:25:00.601Z',
    },

    appConfig: {
        appIsSilent: false,
        appIsOff: false,
        carModeIsOn: false,
        appTheme: 'light',
    },

    modal: {
        isVisible: false,
        types: ['mask', 'curfewTime', 'curfewReminder', 'distance'],
        activeType: '',
        response: null,
        remindMe: false,
        remindTime: null,
    },

    sound: { sound: null },
}

const Store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middlewares))
)

export default Store