const express = require('express');
const routes = require('./routes')

const app = express();
const port = process.env.PORT || 3000;

routes(app);

app.get('/', (req, res) => {
    res.send('<h1 style="text-align: center;">Bem vindo à API</h1>')
})

app.listen(port, () => {
    console.log(`O servidor está rodando na porta ${port}`)
})

module.exports = app;