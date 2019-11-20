import React, { ChangeEvent, EventHandler, FunctionComponent } from 'react'

type CheckboxProps = {
    label: string,
    cssClass: string,
    checked: boolean,
    onChange: EventHandler<ChangeEvent<HTMLInputElement>>
}

export const Checkbox: FunctionComponent<CheckboxProps> = ({ label, cssClass, checked, onChange }) => (
    <div className={cssClass}>
        <label>
            <input type='checkbox' checked={checked} onChange={onChange} />
            {label}
        </label>
    </div>
)
