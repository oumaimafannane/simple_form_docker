
const http = require('http');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    const form = `
      <html>
        <head>
          <title>My simple Form</title>
        </head>
        <body>
          <h1>My Simple Form</h1>
          <form method="post">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required><br>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required><br>

            <button type="submit">Submit</button>
          </form>
        </body>
      </html>
    `;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(form);
    res.end();
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const data = querystring.parse(body);
      const name = data.name;
      const email = data.email;
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(`Thank you for submitting the form, ${name}! Your email address is ${email}.`);
      res.end();
    });
  }
});

const port = 3001;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
