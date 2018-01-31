function fileDownload(fileName) {

    var url = 'http://rutas.nachoagudo.com/tracks/',
        uri = url + fileName;

    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fsAccess, fsFail);

    function fsAccess(fileSystem) {
        fileSystem.root.getDirectory('TrailCanfranc', { create: true, exclusive: false }, dirReady, dirFail);
    }

    function fsFail() {
        showToast('Fallo en el sistema de ficheros');
    }

    function dirReady(entry) {

        window.appRootDir = entry;

        var fileTransfer = new FileTransfer(),
            filePath = window.appRootDir.nativeURL + uri.substr(uri.lastIndexOf('/') + 1);

        fileTransfer.download(uri, filePath, dlComplete, dlFail);

    }

    function dirFail() {
        showToast('Fallo accediendo al directorio');
    }

    function dlComplete(theFile) {
        showToast('Descarga completada: ' + theFile.toURL());
    }

    function dlFail(error) {
        showToast('Descarga fallida: ' + theFile.toURL());
    }

}

function getList() {
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fsAccess, fsFail);

    function fsAccess(fileSystem) {
        fileSystem.root.getDirectory('TrailCanfranc', { create: true, exclusive: false }, dirReady, dirFail);
    }

    function fsFail() {
        showToast('Fallo en el sistema de ficheros');
    }

    function dirReady(entry) {

        window.appRootDir = entry;

        var reader = window.appRootDir.createReader();
        reader.readEntries(listReady, listFail);

    }

    function dirFail() {
        showToast('Fallo accediendo al directorio');
    }

    function listReady(items) {

        if (items.length === 0) {
            showToast('No se encontraron ficheros');
        } else {
            var names = [];
            for (var i = 0; i < items.length; i++) {
                names.push(items[i].name);
            }
            showToast('Encontrados: ' + names.join(', '));
        }

    }

    function listFail() {
        showToast('Fallo obteniendo la lista del directorio');
    }
}

function showToast(message) {
    // https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin
    window.plugins.toast.showWithOptions({
        message: message,
        duration: 'long',
        position: 'bottom'
    });
}