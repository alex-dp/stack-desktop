let aboutWindow

function launchAbout () {
    window.open('file://' + __dirname + '/about.html', 'about', 'width = 600, height = 400, resizable = false')
}

window.onload = function () {
    var pjson = require('./package.json')
    element = document.getElementById('about-app-name')
    if (element)
        element.innerHTML += ' ' + pjson.version
}
