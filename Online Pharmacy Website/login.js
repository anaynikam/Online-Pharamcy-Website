const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  const pathName = url.parse(req.url).pathname;

  if (pathName === '/') {
    fs.readFile('./Login.html', (err, data) => {
      if (err) {
        console.log(err);
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h1>404 Not Found</h1>');
        return res.end();
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end();
    });
  } else if (pathName === '/authenticate') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const formData = querystring.parse(body);
      const username = formData.username;
      const password = formData.password;
      if (username === 'myusername' && password === 'mypassword') {
        res.writeHead(302, { 'Location': '/home.html' });
        return res.end();
      } else {
        res.writeHead(302, { 'Location': '/Login.html' });
        return res.end();
      }
    });
  } else if (pathName === '/home.html') {
    fs.readFile('./Home.html', (err, data) => {
      if (err) {
        console.log(err);
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h1>404 Not Found</h1>');
        return res.end();
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end();
    });
  } else {
    console.log('Invalid request');
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('<h1>404 Not Found</h1>');
    return res.end();
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
