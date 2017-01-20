import async from 'rollup-plugin-async';
import regenerator from 'rollup-plugin-regenerator';
import babel from 'rollup-plugin-babel';

export default {
    format: 'cjs',
    plugins: [async(), babel({ exclude: 'node_modules/**' }), regenerator()]
};
