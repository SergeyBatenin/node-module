const visits = {
    'main': 0,
    'about': 0,
    'wrong': 0,
}

const http = require('http');

const server = http.createServer((req, res) => {
    console.log('request received');
    if (req.url === '/') {
        visits.main++;

        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
        });
        res.end(`
        <h1>Welcome to my Site!</h1>
        <a href='/about'>Обо мне</a>
        <p>Посещено ${visits.main} раз</p>
        `);
    } else if (req.url === '/about') {
        visits.about++;

        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
        });
        res.end(`
        <h1>About Page</h1>
        <a href='/'>На главную</a>
        <p>Посещено ${visits.about} раз</p>
        `);
    } else {
        visits.wrong++;

        res.writeHead(404, {
            'Content-Type': 'text/html; charset=UTF-8',
        });
        res.end(`
        <h1>Чаво надобно старче??</h1>
        <a href='/'>На главную</a>
        <p>Посещено ${visits.wrong} раз</p>
        `);
    }
});

const port = 3000;

server.listen(port, () => {
    console.log('Server is running');
})