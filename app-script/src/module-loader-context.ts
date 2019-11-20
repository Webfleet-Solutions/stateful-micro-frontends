import React from 'react'
import { createStore, ReducersMapObject, Store } from 'redux'

type LoaderContextType = {
    store: Store;
    reducers: ReducersMapObject;
}

// An default-value argument is mandatory, but the defaults are not used
// https://reactjs.org/docs/context.html#reactcreatecontext
const defaultValue: LoaderContextType = {
    store: createStore(state => state),
    reducers: {}
};

export const ModuleLoaderContext = React.createContext<LoaderContextType>(defaultValue)
