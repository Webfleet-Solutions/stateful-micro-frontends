import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { createModuleEventSender, installEventListener, makeStoreGlobal } from 'redux-iframe'
import {
    MenuConnected,
    menuColorReducer,
    moduleColorReducer,
    MENU_COLOR_STATE,
    MODULE_COLOR_STATE,
    SET_MENU_COLOR,
    SET_MODULE_COLOR
} from 'lib-common'
import { ModuleLoader } from './module-loader'
import './index.css'

// The URL path prefix for this application and the html element id of the iframe
const ROOT_PATH = '/app-iframe'
const IFRAME_ID = 'module'

// All reducers needed by the application (for either action creation or consumption)
const reducers = {
    [MENU_COLOR_STATE]: menuColorReducer,
    [MODULE_COLOR_STATE]: moduleColorReducer
}

// Send Redux actions as messages to modules (loaded into iframe content windows)
const eventSenderMiddleware = createModuleEventSender([SET_MODULE_COLOR], IFRAME_ID)

const store = createStore(combineReducers(reducers), applyMiddleware(createLogger(), eventSenderMiddleware))

// The module-loader function specific for this application
const loadModule = (moduleName: string): ReactNode => (
    <ModuleLoader id={IFRAME_ID} url={`index-${moduleName}.html`}/>
)

ReactDOM.render(
    <Provider store={store}>
        <MenuConnected rootPath={ROOT_PATH} loadModule={loadModule}/>
    </Provider>,
    document.getElementById('root')
)

// Listen to "message" events and create + dispatch corresponding Redux actions
installEventListener(store, [SET_MENU_COLOR])

// Make the Redux store accessible (read only) by modules via window.parent
makeStoreGlobal(store)
