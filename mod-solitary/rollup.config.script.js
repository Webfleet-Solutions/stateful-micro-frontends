import plugins from '../rollup.module-plugins'

export default {
    input: 'src/index-script.ts',
    output: [{
        file: '../public/app-script/mod-solitary.js',
        format: 'iife'
    }],
    plugins: plugins
}
