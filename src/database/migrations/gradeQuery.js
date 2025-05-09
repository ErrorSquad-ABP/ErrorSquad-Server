const bigquery = require('../../lib/bigquery');

async function searchAllInfos() {

  const query =
    `SELECT * 
      FROM \`sitefatecdsm-01-2025.SiteFatecDSM.dia\`
      order by id asc`;

  const [rows] = await bigquery.query({ query });

  if (rows.length > 0) {

    return { status: 200, data: rows, };

  }

  if (rows.length <= 0) {

    return { status: 200, mensagem: "Sem informações cadastradas." };

  }


}

module.exports = {
  searchAllInfos,
};