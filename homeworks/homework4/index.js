const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());

let uniqueId = 0;

const getAllUsers = () => {
    return JSON.parse(fs.readFileSync('./users.json', 'utf8'));
}

const getUserById = (id) => {
    const users = getAllUsers();
    const user = users.users.find(user => user.id === +id);
    return user ? user : { user: null };
}

const createUser = (data) => {
    ++uniqueId;
    const users = getAllUsers();
    const user = {
        id: uniqueId,
        ...data
    };
    users.users.push(user);
    fs.writeFileSync('./users.json', JSON.stringify(users), 'utf8');
    return uniqueId;
}

const updateUser = (id, data) => {
    const users = getAllUsers();
    const user = users.users.find(user => user.id === +id);
    if (user) {
        user.name = data.name;
        user.age = data.age;
        user.city = data.city;
        fs.writeFileSync('./users.json', JSON.stringify(users), 'utf8');
        return user;
    } else {
        return { user: null };
    }
}

const removeUser = (id) => {
    const users = getAllUsers();
    const user = users.users.find(user => user.id === +id);
    if (user) {
        console.log("zawel if");
        const userIndex = users.users.indexOf(user);
        console.log("index", userIndex);
        users.users.splice(userIndex, 1);
        fs.writeFileSync('./users.json', JSON.stringify(users), 'utf8');
        return user;
    } else {
        console.log("zawel else");
        return { user: null };
    }
}

app.get('/users', (req, res) => {
    console.log("Получен запрос на получение всех пользователей");
    res.send(getAllUsers());
})
app.get('/users/:id', (req, res) => {
    const id = req.url.split('/')[2];
    console.log(`Получен запрос на получение пользователя с id=${id}`);
    res.send(getUserById(id));
})
app.post('/users', (req, res) => {
    console.log('Получен запрос на создание пользователя');
    const id = createUser(req.body);
    console.log(`Создан пользователь с id=${id}`);
    res.send({ id });
})
app.put('/users/:id', (req, res) => {
    const id = req.url.split('/')[2];
    console.log(`Получен запрос на изменение пользователя с id=${id}`);
    res.send(updateUser(id, req.body));
})
app.delete('/users/:id', (req, res) => {
    const id = req.url.split('/')[2];
    console.log(`Получен запрос на удаление пользователя с id=${id}`);
    res.send(removeUser(id));
})

const port = 3000;

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`)
});