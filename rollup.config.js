import babel from 'rollup-plugin-babel';
import async from 'rollup-plugin-async';

export default {
    format: 'cjs',
    plugins: [
        async(),
        babel({ exclude: 'node_modules/**' })
    ]
};
