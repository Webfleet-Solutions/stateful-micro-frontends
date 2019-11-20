import plugins from '../rollup.module-plugins'

export default {
    input: 'src/index-iframe.tsx',
    output: [{
        file: '../public/app-iframe/mod-solitary.js',
        format: 'iife'
    }],
    plugins: plugins
}
