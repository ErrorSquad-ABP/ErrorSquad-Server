require('dotenv').config();
const { BigQuery } = require('@google-cloud/bigquery');

const bigquery = new BigQuery();

module.exports = bigquery;