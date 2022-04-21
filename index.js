const express = require('express');
const cors = require('cors');
const app = express(); 
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // without this line, server will not get the data. Because we have sent the data in    the form of stringify. we have to parse it. There is another method to do it. if you want to do that method go   to expressjs site http://expressjs.com/ > "Resources" > "Middleware" > "body-parser" > now follow the instructions as you  followed for cors.

app.get('/', (req, res) => {
    res.send('Look Mama! I can code Node now!!!')
});

const users = [
    { id: 1, name: "Sabana", email: 'sabana@gmail.com', phone: '0188888888' },
    { id: 2, name: "Sabnur", email: 'sabnur@gmail.com', phone: '0188888888' },
    { id: 3, name: "Suchorita", email: 'suchorita@gmail.com', phone: '0188888888' },
    { id: 4, name: "Sabila", email: 'sabila@gmail.com', phone: '0188888888' },
    { id: 5, name: "Suhana", email: 'suhana@gmail.com', phone: '0188888888' },
    { id: 6, name: "Srabonti", email: 'srabonti@gmail.com', phone: '0188888888' },
    { id: 7, name: "Suchonda", email: 'suchonda@gmail.com', phone: '0188888888' }
];

app.get('/users', (req, res) => {
    //filter by query parameter
    if (req.query.name) {
        console.log('query', req.query);
        const search = req.query.name.toLowerCase();
        const matched = users.filter(user => user.name.toLowerCase().includes(search))
        res.send(matched);
    }
    else {
        res.send(users);
    }
});

app.get('/user/:id', (req, res) => {
    console.log(req.params);
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    res.send(user);
});

app.post('/user', (req, res) => {
    console.log('request', req.body);
    const user = req.body; // we have got the user in req.body, previously we have seen it in the command prompt of server
    user.id = users.length + 1; // we have already 7 uers. That's why we are counting new users from 8 
    users.push(user); // it is not the proper way. if you restart the server this data will not be saved. when we will set mongoDb it will be solved 
    res.send(user);
})

app.listen(port, () => {
    console.log('Listening to port', port);
});