module.exports = {
    content: [
        './index.html'
    ],
    css: [
        './styles/style.css'
    ],
    extractors: [
        {
            extractor: content => {
                return content.match(/[A-z0-9-:\/]+/g) || []
            },
            extensions: ['css', 'html']
        }
    ],
    output: './style.css'
}