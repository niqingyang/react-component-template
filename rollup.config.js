// https://github.com/rollup/plugins/tree/master/packages/multi-entry
// https://github.com/rollup/awesome
import alias from '@rollup/plugin-alias';
import {babel} from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import progress from 'rollup-plugin-progress';
import cleanup from 'rollup-plugin-cleanup';
import typescript from '@rollup/plugin-typescript';
// https://github.com/Swatinem/rollup-plugin-dts
import dts from "rollup-plugin-dts";

// rollup.config.js
export default [
    {
        input: 'src/index.tsx',
        output: [
            {file: 'dist/rbc-picker.bundle.cjs.js', format: 'cjs'},
            {file: 'dist/rbc-picker.bundle.esm.js', format: 'esm'},
        ],
        global: {
            vue: "Vue" // 告诉rollup全局变量Vue即是vue
        },
        // 告诉rollup不要将此lodash打包，而作为外部依赖
        external: ['react', 'react-dom'],
        plugins: [
            // https://github.com/rollup/plugins/tree/master/packages/alias
            alias({
                resolve: ['.jsx', '.js', '.tsx', '.ts'],
                entries: [
                    // {
                    //     find: 'utils',
                    //     replacement: '../../../utils'
                    // },
                    // {
                    //     find: 'batman-1.0.0',
                    //     replacement: './joker-1.5.0'
                    // }
                    {find: '@/', replacement: './src/'}
                ]
            }),
            resolve(),
            // https://github.com/rollup/plugins/tree/master/packages/typescript
            typescript({
                lib: ["es5", "es6", "dom"],
                target: "es6",
                cacheDir: '.rollup.tscache',
            }),
            // https://github.com/rollup/plugins/tree/master/packages/babel
            babel({
                exclude: /node_modules/,
                babelHelpers: 'bundled'
            }),
            // https://github.com/rollup/plugins/tree/master/packages/commonjs
            commonjs({
                include: /node_modules/
            }),
            // https://github.com/jkuri/rollup-plugin-progress
            progress({
                clearLine: false // default: true
            }),
            cleanup()
        ]
    },
    // 生成类型的头文件
    {
        input: "./src/index.tsx",
        output: [{
            file: "dist/rbc-picker.d.ts",
            format: "es"
        }],
        plugins: [
            // https://github.com/Swatinem/rollup-plugin-dts
            dts()
        ],
    }
];
