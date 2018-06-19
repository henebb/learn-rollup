// https://code.lengstorf.com/learn-rollup-js/


import dotenv from 'dotenv';
dotenv.config();

// Rollup plugins
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import postcss from 'rollup-plugin-postcss';

// PostCSS plugins
import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';

const commonPlugins = [
    postcss({
        extensions: ['.css'],
        plugins: [
            simplevars(),
            nested(),
            cssnext({ warnForDuplicates: false }),
            cssnano(),
        ],
    }),
    // Enable nodejs packages
    resolve({
        jsnext: true,
        main: true, // resolver will look for the main file.
        browser: true, // If they define a browser version, use that.
    }),
    commonjs({
        namedExports: {
            'node_modules/immutable/dist/immutable.js': [ 
                'Map', 'Set', 'is', 'Seq', 'fromJS',
            ],
        }
    }),
    eslint({
        exclude: [
            'src/styles/**',
        ],
    }),
    babel({
        exclude: ['node_modules/**'],
    }),
    replace({
        //  Replace every ENV in code with the value set to the right.
        ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    // Only uglify in production.
    (process.env.NODE_ENV === 'production' && uglify()),
];


function createConfig(name) {
    return {
        input: 'src/scripts/' + name + '.js',
        output: {
            file: 'build/js/' + name + '.min.js',
            format: 'iife', // immediately invoced function expression (the bundle will be created as a such)
            sourceMap: 'inline', // creates a data uri.
        },
        plugins: commonPlugins,
    };
}

// We're using multiple bundles here, just use an array with different input/output
export default [
    createConfig('main'),
    createConfig('immutable'),
];
