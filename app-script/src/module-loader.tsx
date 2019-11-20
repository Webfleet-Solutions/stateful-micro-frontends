// Credits: Cam Jackson (https://martinfowler.com/articles/micro-frontends.html)

import React, {Component, FunctionComponent} from 'react'
import { ReducersMapObject, Store } from 'redux'
import { ModuleLoaderContext } from './module-loader-context'
import './module-loader.css'

const MOUNT_POINT = 'mount'

type LoaderProps = {
    name: string
    url: string
}

export const ModuleLoader: FunctionComponent<LoaderProps> = (props) => (
    <ModuleLoaderContext.Consumer>
        { value => <LoaderInternal {...props} {...value}/> }
    </ModuleLoaderContext.Consumer>
)

type LoaderInternalProps = LoaderProps & {
    store: Store,
    reducers: ReducersMapObject
}

class LoaderInternal extends Component<LoaderInternalProps> {
    componentDidMount(): void {
        const { name, url } = this.props
        const scriptId = `loader-script-${name}`

        if (document.getElementById(scriptId)) {
            this.mountModule()
            return
        }

        const script = document.createElement('script')
        script.id = scriptId
        script.src = url
        script.onload = this.mountModule
        document.head.appendChild(script)
    }

    componentWillUnmount() {
        const { name } = this.props
        const functionName = `unmount${name}`;
        (window as any)[functionName](MOUNT_POINT)
    }

    mountModule = () => {
        const { name, store, reducers } = this.props
        const functionName = `mount${name}`;
        (window as any)[functionName](MOUNT_POINT, store, reducers)
    }

    render() {
        return <div id={MOUNT_POINT} className='ModuleLoader'/>
    }
}
