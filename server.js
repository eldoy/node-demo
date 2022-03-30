const fs = require('fs')
const http = require('http')

// Create a local server to receive data from
const server = http.createServer(function(req, res) {

  let result = ''
  let file = req.url

  if (file == '/') file = '/index.html'

  if (file == '/favicon.ico') {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('')

  } else {


    // Serve HTML files
    if (file.endsWith('.html')) {
      res.writeHead(200, { 'Content-Type': 'text/html' })

      result = fs.readFileSync(`./${file}`, 'utf8')

      // Send result
      res.end(result)

    // Serve JSON data
    } else if (file.endsWith('.json')) {

      res.writeHead(200, { 'Content-Type': 'application/json' })

      const data = [
        {
          name: 'My coolest project for real'
        },
        {
          name: 'Mega project'
        }
      ]

      // Stringify object before send
      res.end(JSON.stringify(data))
    }

  }
})

server.listen(8000)