const express = require('express');
const video = express.Router();
const path = require('path');
const bodyParser = require('body-parser');

video.use(bodyParser.json());

const { Pool } = require("pg");
const pool = new Pool({
    user: "admin",
    host: "localhost",
    database: "site_data",
    password: "",
    port: 5432
});



video.get('/home', (req, res, next) => {
    let data;

    pool.query(`SELECT * FROM videos`, (err, resData) => {
        if (err) next(err);

        data = resData.rows;

        res.status(202).send(data);
    });
});

video.get('/:title', (req, res, next) => {
    res.status(200).sendFile(path.join(__dirname + '/View/video.html'));
});

video.get('/:title/data', (req, res, next) => {
    let data; 

    pool.query(`SELECT * FROM videos WHERE video_title = '${req.params.title}'`, (err, resData) => {
        if (err) next(err);
        if (!resData) {
            res.status(404).send();
            return;
        }

        data = resData.rows[0];

        res.status(200).send(data);
    });
});

video.post('/:title', (req, res, next) => {
    pool.query(`SELECT video_data FROM videos WHERE video_title = '${req.params.title}'`, (err, resData) => {
        if (err) {
            throw err;
            return;
        }

        if (!resData) {
            res.status(404).send();
        }

        let data = resData.rows[0].video_data;

        res.status(202).send(data);

    });
});

video.put('/:title', (req, res) => {
    console.log(req.body);
    pool.query(`UPDATE videos SET video_data = '${req.body.data}' WHERE video_id = 1`, (err, resData) => {
        if (err) throw err;

        res.status(200).send();
    });
});


module.exports = video;
