function sanitize(regex) {
    return regex.replace(/[\\\.\+\*\?\^\$\[\]\(\)\{\}\/\'\#\:\!\=\|]/ig, "\\$&");
}

module.exports = { sanitize }