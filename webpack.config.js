module.exports = {
    entry: {
        main: './app.js'
    },
    output: {
        filename: './dist/app/app.js'
    },
    devtool: 'source-map', 
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            }, {
                test: /\.css$/,
                loader: 'style!css'
            }, {
                test: /\.scss/,
                loader: 'style!css!sass'
            }
        ]
    }
}