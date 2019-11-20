import React, { ChangeEvent, EventHandler, FunctionComponent, ReactNode } from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import { Checkbox } from '../components/checkbox'
import { Home } from './home'
import './menu.css'

type MenuOwnProps = {
    rootPath: string
    loadModule: (moduleName: string) => ReactNode
}

export type MenuStateProps = {
    menuHighlighted: boolean,
    moduleColorChecked: boolean
}

export type MenuDispatchProps = {
    setModuleColor: EventHandler<ChangeEvent<HTMLInputElement>>
}

type MenuProps = MenuOwnProps & MenuStateProps & MenuDispatchProps

export const Menu: FunctionComponent<MenuProps> = ({ rootPath, loadModule, menuHighlighted, moduleColorChecked, setModuleColor }) => (
    <BrowserRouter>
        <nav>
            <ul className={'Menu' + (menuHighlighted ? ' MenuHighlighted' : '')}>
                <li><a href='/'>...</a></li>
                <li><Link to={`${rootPath}/`}>Home</Link></li>
                <li><Link to={`${rootPath}/consumer`}>Consumer</Link></li>
                <li><Link to={`${rootPath}/producer`}>Producer</Link></li>
                <li><Link to={`${rootPath}/solitary`}>Solitary</Link></li>
                <li>
                    <Checkbox cssClass='MenuCheckbox' label='Change color of Consumer module' checked={moduleColorChecked} onChange={setModuleColor}/>
                </li>
            </ul>
        </nav>
        <Route path={`${rootPath}/`} exact component={Home} />
        <Route path={`${rootPath}/consumer`} render={() => loadModule('consumer')} />
        <Route path={`${rootPath}/producer`} render={() => loadModule('producer')} />
        <Route path={`${rootPath}/solitary`} render={() => loadModule('solitary')} />
    </BrowserRouter>
)
