// Module (un)mounting needed by app-script
export { registerModule } from './register/register-module'

// Redux actions and reducers shared by module and applications
export { menuColorReducer, setMenuColor, MENU_COLOR_STATE, SET_MENU_COLOR } from './ducks/menu-color-duck'
export { moduleColorReducer, setModuleColor, MODULE_COLOR_STATE, SET_MODULE_COLOR } from './ducks/module-color-duck'

// React components shared by module and applications
export { Checkbox } from './components/checkbox'

// Higher oder widgets needed by all applications (but not modules)
export { MenuConnected } from './application/menu-connected'

