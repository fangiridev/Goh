const { XMLHttpRequest } = require('xmlhttprequest')

function get(url, async = false) {
    const request = new XMLHttpRequest(url)
    request.open('GET', url, async)
    request.send()
    return JSON.parse(request)
}

module.exports = get
/*
console.log(fetch(`https://nekos.life/api/v2/img/neko`).url);
Returns: https://cdn.nekos.life/neko/neko368.jpeg
*/