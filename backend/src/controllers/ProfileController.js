const connection = require('../database/connection'); // importa conexão com o banco de dados

module.exports = {
    async index(request, response) {
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents')
            .where('ong_id', ong_id) // seleciona os registros da ong que foi passada na requisição
            .select('*'); // projeta todos as colunas

        return response.json(incidents);
    }
}