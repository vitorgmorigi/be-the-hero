const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const { page = 1 } = request.query; 

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5) // limita a 5 casos por página
            .offset((page - 1) * 5) // a cada página que é incrementada, pega ps próximos 5 registros do banco 
            .select([
                    'incidents.*',
                    'ongs.name',
                    'ongs.email',
                    'ongs.whatsapp',
                    'ongs.city',
                    'ongs.uf'        
                    ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        }); // cria caso e armazena numa variável o id da caso

        return response.json({ id }); // retorna o id do caso
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id) // filtra o registro no banco em que o id é o do parametro da requisição
            .select('ong_id') // projeta apenas a coluna "ong_id"
            .first(); // retorna apenas o primeiro resultado


        if (incident.ong_id !== ong_id) { // caso o id passado na requisição seja diferente do id logado, retorna 401
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send(); // retorna uma resposta OK, porém sem conteúdo

    },
}