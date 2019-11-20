import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { MenuConnected, menuColorReducer, moduleColorReducer, MENU_COLOR_STATE, MODULE_COLOR_STATE } from 'lib-common'
import { ModuleLoaderContext } from './module-loader-context'
import { ModuleLoader } from './module-loader'
import './index.css'

// The URL path prefix for this application
const ROOT_PATH = '/app-script'

// All reducers needed by the application (for either action creation or consumption)
const reducers = {
    [MENU_COLOR_STATE]: menuColorReducer,
    [MODULE_COLOR_STATE]: moduleColorReducer
}

const store = createStore(combineReducers(reducers), applyMiddleware(createLogger()))

// The module-loader function specific for this application
const loadModule = (moduleName: string): ReactNode => (
    <ModuleLoader url={`${ROOT_PATH}/mod-${moduleName}.js`} name={capitalize(moduleName)}/>
)

// Capitalize the module name to match the names of mount*/unmount* functions exposes by each module
const capitalize = (moduleName: string): string => (
    moduleName.charAt(0).toUpperCase() + moduleName.slice(1)
)

ReactDOM.render(
    <Provider store={store}>
        <ModuleLoaderContext.Provider value={{ store, reducers }}>
            <MenuConnected rootPath={ROOT_PATH} loadModule={loadModule}/>
        </ModuleLoaderContext.Provider>
    </Provider>,
    document.getElementById('root')
)
