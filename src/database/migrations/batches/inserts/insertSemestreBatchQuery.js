const bigquery = require('../../../../lib/bigquery');

async function insertSemestreBatch(tableName, columns, records) {

  if (!records || records.length === 0) return;
  
  // Criar arrays para cada tipo de parâmetro sem formatação SQL
  const niveis_semestre = [];
  const anos_semestre = [];
  const siglas_curso = [];
  const nomes_turno = [];
  
  // Preencher os arrays com os valores dos registros (sem aspas ou formatação SQL)
  records.forEach(record => {
 
    const nivel_semestre = record[columns[0]];
    const ano_semestre = record[columns[1]];
    const sigla_curso = record[columns[2]];
    const nome_turno = record[columns[3]];
    
    if (nivel_semestre !== undefined && nivel_semestre !== null) {
      niveis_semestre.push(nivel_semestre);
    }
    
    if (ano_semestre !== undefined && ano_semestre !== null) {
      anos_semestre.push(ano_semestre);
    }
    
    if (sigla_curso !== undefined && sigla_curso !== null) {
      siglas_curso.push(sigla_curso);
    }

    if (nome_turno !== undefined && nome_turno !== null) {
      nomes_turno.push(nome_turno);
    }
    
  });
  
  const query = `
  CALL \`sitefatecdsm-01-2025\`.\`SiteFatecDSM\`.\`inserir_semestre\`(
    @niveis_semestre,
    @anos_semestre,
    @siglas_curso,
    @nomes_turno
  );`;
  
  const options = { 
    query, 
    params: {
      niveis_semestre: niveis_semestre,
      anos_semestre: anos_semestre,
      siglas_curso: siglas_curso,
      nomes_turno: nomes_turno,
    },
    
    useLegacySql: false 
  };
  
  try {
    await bigquery.query(options);
    console.log(`Inseridos ${records.length} registros em ${tableName}`);
    return { status: 201, mensagem: `Registros inseridos com sucesso em ${tableName}!` };
  } catch (erro) {
    console.error(`Erro ao inserir em batch em ${tableName}:`, erro);
    throw erro;
  }
}

module.exports = { insertSemestreBatch }