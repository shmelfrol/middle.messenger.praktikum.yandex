module.exports = {
    plugins: [
        require('precss'),
        require('autoprefixer')({
            html: ['./index.html']
        }),
        require('postcss-flexbox')({
            html: ['./index.html']
        }),
    ]
}