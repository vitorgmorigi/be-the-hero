const express = require('express'); // Importando pacote express
const cors = require('cors'); // Importando cors
const routes = require('./routes'); // Importando arquivo routes

const app = express();


app.use(cors());
app.use(express.json()); // Configuração para receber requisições no formato JSON
app.use(routes);

app.listen(3333);