import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { MenuConnected, menuColorReducer, moduleColorReducer, MENU_COLOR_STATE, MODULE_COLOR_STATE } from 'lib-common'
import { ModuleLoader } from './module-loader'
import { ModuleWrapper } from './module-wrapper'
import './index.css'

// The URL path prefix for this application
const ROOT_PATH = '/app-import'

// All reducers needed by the application (for either action creation or consumption)
const reducers = {
    [MENU_COLOR_STATE]: menuColorReducer,
    [MODULE_COLOR_STATE]: moduleColorReducer
}

const store = createStore(combineReducers(reducers), applyMiddleware(createLogger()))

// The module-loader function specific for this application
const loader = new ModuleLoader(store, reducers)
const loadModule = (moduleName: string): ReactNode => (
    <ModuleWrapper loader={loader} filePath={`${ROOT_PATH}/mod-${moduleName}.js`}/>
)

ReactDOM.render(
    <Provider store={store}>
        <MenuConnected rootPath={ROOT_PATH} loadModule={loadModule}/>
    </Provider>,
    document.getElementById('root')
)
