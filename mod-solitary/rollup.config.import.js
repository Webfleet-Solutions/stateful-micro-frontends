import plugins from '../rollup.module-plugins'

export default {
    input: 'src/index-import.ts',
    output: [{
        file: '../public/app-import/mod-solitary.js',
        format: 'esm'
    }],
    plugins: plugins
}
