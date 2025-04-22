const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const dataFilePath = path.join(__dirname, '/json/tasks.json');

app.get('/api/data', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('при прочтении файла произошла ошибка');
        res.json(JSON.parse(data));
    });
});

app.post('/api/data', (req, res) => {
    const newData = req.body;

    fs.writeFile(dataFilePath, JSON.stringify(newData, null, 2), err => {
        if (err) return res.status(500).send('ошибка записи файла');
        res.send('Данные сохранены');
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});