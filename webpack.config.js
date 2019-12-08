module.exports = {
    // production development
    mode: "production",
    entry: './public/src/score.js',
    output: {
        filename: 'score.bundle.js',
        path: __dirname + '/public/dist'
    }
};