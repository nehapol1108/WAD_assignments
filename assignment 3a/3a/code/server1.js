const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const port = 8000;

const mimeType = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/js',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg',
};

http
  .createServer((req, res) => {
    const parseUrl = url.parse(req.url);
    let pathname = `.${parseUrl.pathname}`;

    const ext = path.parse(pathname).ext;
    const contentType = mimeType[ext] || 'application/octet-stream';

    if (parseUrl.pathname === '/') {
      var fileList = fs.readdirSync('./');
      var fileLink = '<ul>';

      fileList.forEach((element) => {
        if (fs.statSync('./' + element).isFile()) {
          fileLink += `<li><a href=./${element}>${element}</a></li>`;
        }
      });

      fileLink += '</ul>';

      var html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Directory Listing</title>
</head>
<body>
<h1>Welcome To My Web Server <br></h1><h2 style="text-align: center"> We have following files to
offer</h2>
${fileLink}
</body>
</html>
`;
      res.setHeader('Content-type', 'text/html');
      res.end(html);
    } else {
      fs.readFile(pathname, (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.write('Error 404');
          res.end();
        } else {
          res.writeHead(200, { 'Content-Type': contentType });
          res.write(data);
          res.end();
        }
      });
    }
  })
  .listen(port);

console.log(`Listening on http://localhost:${port}`);
