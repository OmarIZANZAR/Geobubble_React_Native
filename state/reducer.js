import * as Actions from './actions'

export default ( state, { type, payload }) => {
    switch(type){
        // TIMER ACTIONS:
        case Actions.SET_CURRENT_TIME: 
            return {
                ...state,
                timer: {
                    ...state.timer,
                    currentTime: payload.currentTime
                }
            };

        // TIME SETTINGS ACTIONS:
        case Actions.SET_CURFEW_TIME:
            return {
                ...state,
                timeSettings: {
                    ...state.timeSettings,
                    curfewTime: payload.curfewTime,
                    curfewAlertTime: payload.curfewAlertTime,
                    curfewAlertReminder: payload.curfewAlertReminder,
                }
            };

        case Actions.SET_CURFEW_ALERT_TIME:
            return {
                ...state,
                timeSettings: {
                    ...state.timeSettings,
                    curfewAlertTime: payload.curfewAlertTime,
                    curfewAlertReminder: payload.curfewAlertReminder,
                }
            };

        // MODAL ACTIONS:
        case Actions.TOGGLE_MODAL: 
            return {
                ...state,
                modal: {
                    ...state.modal,
                    isVisible: !state.modal.isVisible
                }
            };

        case Actions.OPEN_MODAL: 
            return {
                ...state,
                modal: {
                    ...state.modal,
                    isVisible: true,
                    activeType: payload.activeType
                }
            };

        case Actions.CLOSE_MODAL: 
            return {
                ...state,
                modal: {
                    ...state.modal,
                    isVisible: false,
                    activeType: '',
                }
            };

        // AUDIO ACTIONS:
        case Actions.LOAD_SOUND:
            return {
                ...state,
                sound: { sound: payload.sound }
            };

        case Actions.UNLOAD_SOUND:
            return { ...state, sound: { sound: null } };

        // LOCATION ACTIONS:
        case Actions.SET_CURRENT_LOCATION:
            return {
                ...state,
                locator: { currentLocation: payload.currentLocation }
            };

        case Actions.SET_SAFE_AREA:
            let newArea = {
                isHome: false,
                location: payload.location,
                areaDiameter: state.location.safeAreaDiameter,
            }
            return {
                ...state,
                location: {
                    ...state.location,
                    safeAreas: [...state.location.safeAreas, newArea ]
                }
            };

        case Actions.UNSET_SAFE_AREA:
            let newSafeAreas = state.location.safeAreas.filter( (area, id) => id !== payload.areaId )

            return {
                ...state,
                location: {
                    ...state.location,
                    safeAreas: newSafeAreas,
                }
            };

        case Actions.TOGGLE_IS_HOME:
            let updatedSafeAreas = state.location.safeAreas.map( (area, id) => {
                if( id === payload.areaId ){
                    return {
                        isHome: !area.isHome,
                        location: area.location,
                        areaDiameter: area.areaDiameter,
                    }
                } else {
                    return area
                }
            })

            return {
                ...state,
                location: {
                    ...state.location,
                    safeAreas: updatedSafeAreas,
                }
            };

        case Actions.SET_SAFE_AREA_DIAMETER:
            return {
                ...state,
                location: {
                    ...state.location,
                    safeAreaDiameter: payload.safeAreaDiameter
                }
            };

        // APP CONFIG ACTIONS:
        case Actions.TOGGLE_APP_IS_SILENT:
            return {
                ...state,
                appConfig: {
                    ...state.appConfig,
                    appIsSilent: !state.appConfig.appIsSilent,
                }
            };

        case Actions.TOGGLE_APP_IS_OFF:
            return {
                ...state,
                appConfig: {
                    ...state.appConfig,
                    appIsOff: !state.appConfig.appIsOff,
                }
            };

        case Actions.TOGGLE_CAR_MODE_IS_ON:
            return {
                ...state,
                appConfig: {
                    ...state.appConfig,
                    carModeIsOn: !state.appConfig.carModeIsOn,
                }
            };

        default: return state;
    }
}