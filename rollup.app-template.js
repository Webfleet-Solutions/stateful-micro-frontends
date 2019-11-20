/**
 * Function that returns a rollup config for a given application name.
 */
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'

export default (appName) =>  ({
    input: 'src/index.tsx',
    output: [{
        file: `../public/${appName}/application.js`,
        format: 'iife',
        sourcemap: false,
        globals: {
            'react': 'React',
            'react-dom': 'ReactDOM',
            'react-router-dom': 'ReactRouterDOM',
            'react-redux': 'ReactRedux',
            'redux': 'Redux',
            'redux-logger': 'reduxLogger'
        }
    }],
    external: [
        'react',
        'react-dom',
        'react-router-dom',
        'react-redux',
        'redux',
        'redux-logger'
    ],
    plugins: [
        replace({
            'process.env.NODE_ENV': '"development"'
        }),
        resolve(),
        commonjs({
            namedExports: {
                'react-is': [ 'isValidElementType' ],
                'react-iframe': [ 'Iframe' ]
            }
        }),
        typescript(),
        postcss()
    ]
})
