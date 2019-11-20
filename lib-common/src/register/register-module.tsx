/**
 * Helper functions that register/unregister uniquely named functions on the global window object.
 * Those functions are later called by React Router of the surrounding application. When executed
 * the function mount/unmount the module to/from the div provided by the caller using ReactDOM methods.
 *
 * Used by app-script only.
 *
 * Credits: Cam Jackson (https://martinfowler.com/articles/micro-frontends.html)
 */

import React, { ComponentType } from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, combineReducers, createStore, ReducersMapObject, Store } from 'redux'
import { Provider } from 'react-redux'
import logger from 'redux-logger'

export function registerModule(moduleName: string, rootComponent: ComponentType, moduleReducers: ReducersMapObject | null = null): void {
    registerMountFunction(moduleName, rootComponent, moduleReducers)
    registerUnmountFunction(moduleName)
}

function registerMountFunction(moduleName: string, RootComponent: ComponentType, moduleReducers: ReducersMapObject | null): void {
    const funcName = `mount${moduleName}`;
    (window as any)[funcName] = function (elementId: string, store: Store | null, allReducers: ReducersMapObject | null): void {
        const effectiveStore = enhanceStore(store, allReducers, moduleReducers) || createModuleStore(moduleReducers)
        const WrappedComponent = effectiveStore
            ? <Provider store={effectiveStore}><RootComponent /></Provider>
            : <RootComponent/>

        ReactDOM.render(WrappedComponent, document.getElementById(elementId))
        console.info(`Module '${moduleName}' mounted`)
    }
}

function registerUnmountFunction(moduleName: string): void {
    const funcName = `unmount${moduleName}`;
    (window as any)[funcName] = function (elementId: string): void {
        const element: HTMLElement | null = document.getElementById(elementId);
        if (element) {
            // Note: Dan Abramov recommends to *not* remove the reducers of an unloaded module,
            // that is, keep "allReducers" unchanged. See https://stackoverflow.com/a/34125207
            ReactDOM.unmountComponentAtNode(element);
            console.info(`Module '${moduleName}' unmounted`);
        }
    }
}

// Create a module-local Redux store in case the module is running standalone
function createModuleStore(moduleReducers: ReducersMapObject | null): Store | null {
    if (moduleReducers) {
        return createStore(combineReducers(moduleReducers), applyMiddleware(logger));
    }
    return null
}

function enhanceStore(store: Store | null, allReducers: ReducersMapObject | null, moduleReducers: ReducersMapObject | null): Store | null {
    if (store && allReducers && moduleReducers) {
        // Note that Object.assign call modifies its first argument, which is the global map of all reducers
        const rootReducer = combineReducers(Object.assign(allReducers, moduleReducers));
        store.replaceReducer(rootReducer)
    }
    return store
}
