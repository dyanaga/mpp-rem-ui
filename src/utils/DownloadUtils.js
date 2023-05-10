import {downloadFileSecured} from "../api/rest-call";

function downloadFile(url, filename, onError) {
    let request = new Request(url, {
        method: 'GET',
    });

    downloadFileSecured(request, (blob, status) => handleBlob(filename, blob), onError)
}

const handleBlob = (filename, blob) => {
    const href = window.URL.createObjectURL(blob)
    const tempLink = document.createElement('a');

    tempLink.href = href;
    tempLink.setAttribute('download', filename);
    tempLink.click();
}

export {downloadFile}