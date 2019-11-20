import { ChangeEvent } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { MENU_COLOR_STATE } from '../ducks/menu-color-duck'
import { setModuleColor, MODULE_COLOR_STATE } from '../ducks/module-color-duck'
import { Menu, MenuDispatchProps, MenuStateProps } from './menu'

const mapStateToProps = (state: Record<string, any>): MenuStateProps => ({
    menuHighlighted: state[MENU_COLOR_STATE],
    moduleColorChecked: state[MODULE_COLOR_STATE]
})

const mapDispatchToProps = (dispatch: Dispatch): MenuDispatchProps => ({
    setModuleColor: (event: ChangeEvent<HTMLInputElement>) => dispatch(setModuleColor(event.target.checked))
})

export const MenuConnected = connect(mapStateToProps, mapDispatchToProps)(Menu)
