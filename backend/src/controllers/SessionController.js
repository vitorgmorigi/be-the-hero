const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const ong = await connection('ongs')
            .where('id', id) // busca o id passado na request
            .select('name') // retorna apenas o nome, que é o que será passado ao front-end
            .first(); // como só retornará 1, utilizamos o first()

        if (!ong) {
            return response.status(400).json({ error: 'No ONG found with this ID.'});
        }

        return response.json(ong);
    }
}
