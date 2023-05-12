const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const port = 8000;

const mimeType = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

http
  .createServer(function (req, res) {
    console.log(`${req.method} ${req.url}`);

    // parse URL
    const parsedUrl = url.parse(req.url);
    // console.log(`hello ${parsedUrl.pathname}`);

    // extract URL path
    let pathname = `.${parsedUrl.pathname}`;

    // maps file extention to MIME types
    const ext = path.parse(pathname).ext;
    const contentType = mimeType[ext] || 'application/octet-stream';

    if (parsedUrl.pathname === '/') {
      var filesList = fs.readdirSync('./');
      var filesLink = '<ul>';
      filesList.forEach((element) => {
        if (fs.statSync('./' + element).isFile()) {
          filesLink += `<li><a href='./${element}'>${element}</a></li>`;
        }
      });
      filesLink += '</ul>';
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
${filesLink}
</body>
</html>
`;
      res.setHeader('Content-type', 'text/html');
      res.end(html);
    } else {
      fs.readFile(pathname, function (err, data) {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.write('404 Not Found\n');
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

console.log(`Server running at http://localhost:${port}`);
