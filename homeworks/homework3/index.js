const fs = require('fs');
const express = require('express');
const app = express();

const updateNumberVisit = (pageName) => {
    const visits = JSON.parse(fs.readFileSync('visits.json', 'utf8'));
    const visit = ++visits[pageName];
    fs.writeFileSync('visits.json', JSON.stringify(visits), 'utf8');
    return visit;
}

app.get('/', (req, res) => {
    console.log('Запрос получен');
    res.send(`<h1>Корневая страница</h1>
              <p>Просмотров: ${updateNumberVisit('main')}</p>
              <a href='/about'>На страницу About</a>`);
});
app.get('/about', (req, res) => {
    console.log('Запрос получен');
    res.send(`<h1>Страница About</h1>
              <p>Просмотров: ${updateNumberVisit('about')}</p>
              <a href='/'>На корневую страницу</a>`);
});

const port = 3000;

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`)
});