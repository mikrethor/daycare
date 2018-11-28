const express = require('express');
const http = require('http');
const path = require('path');
const port = 3000;
const app = express();

app.set('port', port);

app.use(express.static(path.join(__dirname, 'dist/')));

app.get('/', (req, res) = > {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
})
app.get('/**', (req, res) = > {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
})
const server = http.createServer(app);

server.listen(port, () = > console.log(`Daycare SPA running on port : ${port}`);
)