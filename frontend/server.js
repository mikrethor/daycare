const express = require('express');
const http = require('http');
const path = require('path');
const port = 3000;
const app = express();

app.set('port', port);

app.use(express.static(path.join(__dirname, 'dist/daycare-frontend')));

app.get('/', (req, res) = > {
    res.sendFile(path.join(__dirname, 'dist/daycare-frontend/index.html'));
})
app.get('/**', (req, res) = > {
    res.sendFile(path.join(__dirname, 'dist/daycare-frontend/index.html'));
})
const server = http.createServer(app);

server.listen(port, () = > console.log(`Daycare SPA running on port : ${port}`);
)