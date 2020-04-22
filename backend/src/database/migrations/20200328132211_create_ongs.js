exports.up = function(knex) { // responsável pela criação da tabela
    return knex.schema.createTable('ongs', function(table) {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.decimal('whatsapp').notNullable();
        table.decimal('city').notNullable();
        table.decimal('uf', 2).notNullable();
    })
  };
  
  exports.down = function(knex) { // caso dê algum problema, executa o que tá aqui
    return knex.schema.dropTable('ongs');
  };