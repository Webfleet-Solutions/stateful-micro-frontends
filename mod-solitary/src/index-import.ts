/**
 * This is the module entry point for app-import.
 */
export { SolitaryConnected as View } from './solitary-connected'

import { ownColorReducer, OWN_COLOR_STATE } from './own-color-duck'

// All reducers needed by this module
export const reducers = {
    [OWN_COLOR_STATE]: ownColorReducer
}
