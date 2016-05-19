"use strict"

module.paths.push(require('path').resolve('node_modules'))
module.paths.push(require('path').resolve('../node_modules'))
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const globalShortcut = electron.globalShortcut

let mainWindow, maximized

function createWindow () {

    mainWindow = new BrowserWindow({
        width: 1067,
        height: 600,
        frame: false,
        icon: __dirname + '/images/ic_launcher.png'
    })
    mainWindow.loadURL('file://' + __dirname + '/index.html')
    mainWindow.on('closed', function () { mainWindow = null })
    maximized = false
}

app.on('ready', createWindow)
app.on('window-all-closed', quitall)
app.on('activate', checkandcreate)

function quitall() {
    if (process.platform !== 'darwin')
        app.quit()
}

function toggleMax () {
    if (maximized) {
        window.moveTo(20, 20)
        window.resizeTo(1067, 600)
    }
    else {
        window.moveTo(0, 0)
        window.resizeTo(screen.width, screen.height)
    }
    maximized = !maximized
}

function loadPage (event) {

    webview = document.getElementById('webview')
    box = document.getElementById('box')

    if (event.keyCode === 13) {
        address = box.value
        if (address.indexOf(' ') === -1 && address.indexOf('.') > -1) {
            if (address.startsWith('http://') || address.startsWith('https://'))
                webview.loadURL(address)
            else
                webview.loadURL('http://' + address)
        } else {
            webview.loadURL('http://google.com/?q=' + address.replace('+', '%20').replace(' ', '+'))
        }
    }
}

function goBack() {
    if (webview.canGoBack())
        webview.goBack()
}

function checkandcreate() {
    if (mainWindow === null)
        createWindow()
}
