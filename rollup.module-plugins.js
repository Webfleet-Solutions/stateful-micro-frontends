/**
 * Rollup plugins needed by all modules in all build variants.
 */
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import externalGlobals from 'rollup-plugin-external-globals'
import postcss from 'rollup-plugin-postcss'

export default [
    resolve(),
    typescript(),
    postcss(),
    externalGlobals({
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-router-dom': 'ReactRouterDOM',
        'redux': 'Redux',
        'react-redux': 'ReactRedux',
        'redux-logger': 'reduxLogger'
    })
]
