import { gapi } from 'gapi-script';

export default function insertFile(fileData, fileName, callback) {
  const boundary = '-------314159265358979323846';
  const delimiter = "\r\n--" + boundary + "\r\n";
  const close_delim = "\r\n--" + boundary + "--";

  var reader = new FileReader();
  reader.readAsBinaryString(fileData);
  reader.onload = function (e) {
    var contentType = fileData.type || 'application/octet-stream';
    var metadata = {
      'title': fileName,
      'parents': [{"id":"17Ui0Dd04vmg1Mnmxa3lao-fJtubzEw4X"}],
      'mimeType': contentType
    };

    var base64Data = btoa(reader.result);
    var multipartRequestBody =
      delimiter +
      'Content-Type: application/json\r\n\r\n' +
      JSON.stringify(metadata) +
      delimiter +
      'Content-Type: ' + contentType + '\r\n' +
      'Content-Transfer-Encoding: base64\r\n' +
      '\r\n' +
      base64Data +
      close_delim;

    var request = gapi.client.request({
      'path': '/upload/drive/v2/files',
      'method': 'POST',
      'params': { 'uploadType': 'multipart' },
      'headers': {
        'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
      },
      'body': multipartRequestBody
    });
    if (!callback) {
      callback = function (file) {
        console.log(file);
        // var node = document.createElement("P");
        // node.innerHTML = "Dodano zdjęcie";
        // document.getElementById('newDoc').appendChild(node);
      };
    }
    request.execute(callback);
  }
}