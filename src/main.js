const express = require('express');
const PORT = process.env.port || 80;
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const video = require('./video.js');

app.use(cors());
app.use(bodyParser.json());
app.use('/video', video);

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname + '/View/index.html'));
});

app.use(express.static(__dirname + "/View/"));
app.use(express.static(__dirname + "/Script/"));

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});