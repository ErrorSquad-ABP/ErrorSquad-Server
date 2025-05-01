/*require('dotenv').config();
const { BigQuery } = require('@google-cloud/bigquery');

// Parseia o JSON da variável de ambiente
const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

// Configura o cliente BigQuery com as credenciais
const bigquery = new BigQuery({ credentials });

module.exports = bigquery;

"Comente o código acima e descomente o abaixo para rodar fora do render, com um arquivo dentro da pasta config"*/
require('dotenv').config();
const { BigQuery } = require('@google-cloud/bigquery');

const bigquery = new BigQuery();

module.exports = bigquery;

