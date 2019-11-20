import { ModuleLoader } from './module-loader'
import React, { FunctionComponent, Suspense } from 'react'
import './module-wrapper.css'

type ModuleWrapperProps = {
    loader: ModuleLoader
    filePath: string;
}

export const ModuleWrapper: FunctionComponent<ModuleWrapperProps> = ({ loader, filePath }) => {
    const Module = React.lazy(loader.load(filePath))
    return (
        <div className='ModuleWrapper'>
            <Suspense fallback={<div>{`Loading module ${filePath}...`}</div>}>
                <Module/>
            </Suspense>
        </div>
    )
}
