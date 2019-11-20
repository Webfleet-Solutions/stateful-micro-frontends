import React, { FunctionComponent } from 'react'
import Iframe from 'react-iframe'
import './module-loader.css'

type LoaderProps = {
    id: string
    url: string
}

export const ModuleLoader: FunctionComponent<LoaderProps> = ({ id, url }) => (
    <Iframe id={id} url={url} className="ModuleLoader"/>
)
