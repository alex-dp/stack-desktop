onload = () => {
    const webview = document.getElementById('webview')
    const box = document.getElementById('box')

    const loadstart = () => {
        box.value = webview.getURL()
    }

    const loadstop = () => {
        box.value = webview.getURL()
    }

    const updateFav = (favicons) => {

        selected = false
        for (url of favicons.favicons)
            if (!selected && url.endsWith('png')) {
                document.getElementById('favicon').src = url
                selected = true
            }
        if (!selected)
            document.getElementById('favicon').src = favicons.favicons[0].endsWith('svg') ? favicons.favicons[1] : favicons.favicons[0]
    }

    const resizeElems = () => {
        webview.style.height = window.innerHeight - 81
        box.style.width = window.innerWidth - 156
        if (window.innerHeight < 200)
            window.resizeTo(window.innerWidth, 200)
        if (window.innerWidth < 200)
            window.resizeTo(200, window.innerHeight)
    }

    webview.addEventListener('did-start-loading', loadstart)
    webview.addEventListener('did-stop-loading', loadstop)
    webview.addEventListener('page-favicon-updated', updateFav)
    window.addEventListener('resize', resizeElems)

    resizeElems()
}
