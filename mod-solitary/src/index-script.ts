/**
 * This is the module entry point for app-script.
 */
import { registerModule } from 'lib-common'
import { SolitaryConnected } from './solitary-connected'
import { ownColorReducer, OWN_COLOR_STATE } from './own-color-duck'

// All reducers needed by this module
const reducers = {
    [OWN_COLOR_STATE]: ownColorReducer
}

registerModule('Solitary', SolitaryConnected, reducers)
