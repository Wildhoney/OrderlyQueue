module.exports = {
    entry: './src/orderly-queue.js',
    output: {
        path: __dirname + '/dist',
        filename: 'orderly-queue.js',
        library: 'orderly-queue',
        libraryTarget: 'commonjs2'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    }
};
