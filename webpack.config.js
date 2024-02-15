module.exports = {
    // Other webpack configurations...
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules\/(?!(rrule)\/).*/,
                use: ['source-map-loader'],
                enforce: 'pre',
            },
        ],
    },
};