require('dotenv').config();
const { BigQuery } = require('@google-cloud/bigquery');

// Parseia o JSON da variável de ambiente
const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

// Configura o cliente BigQuery com as credenciais
const bigquery = new BigQuery({ credentials });

module.exports = bigquery;
