import { ComponentType } from 'react'
import { combineReducers, ReducersMapObject, Store } from 'redux'

type ModuleType = {
    View: ComponentType
    reducers: ReducersMapObject
}

/**
 * Provides a load() method that imports an ES6 module.
 * The module must have a 'View' property that contains a React component and optionally a map of reducers.
 * The reducers map is added to the overall set of reducers of the central Redux store.
 * The React component is returned to the caller, which uses React.lazy to render it.
 */
export class ModuleLoader {
    private readonly store: Store
    private readonly reducers: ReducersMapObject

    constructor(store: Store, reducers: ReducersMapObject) {
        this.store = store
        this.reducers = reducers
    }

    load = (path: string) => async () => {
        const module: ModuleType = await import(path)
        console.log('Loaded module', module)
        if (module.reducers) {
            // Note: this.reducers is changed in place
            Object.assign(this.reducers, module.reducers)
            this.store.replaceReducer(combineReducers(this.reducers))
        }
        return {
            // React.lazy() expects a default export referring to a React component
            default: module.View
        }
    }
}
