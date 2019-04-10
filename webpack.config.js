var path = require("path");

module.exports = {
    mode: "development",
    entry: {
        main: path.resolve('./js/zadanie_STXNext.js')
    },

    output: {
        filename: 'out.js',
        path: path.resolve('./js')
    },
    watch: true,
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }
        }]
    }
}
