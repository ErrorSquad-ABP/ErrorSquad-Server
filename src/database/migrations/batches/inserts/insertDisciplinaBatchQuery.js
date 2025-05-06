const bigquery = require('../../../../lib/bigquery');

async function insertDisciplinaBatch(tableName, columns, records) {
  if (!records || records.length === 0) return;
  
  // Criar arrays para cada tipo de parâmetro sem formatação SQL
  const nomes_disciplinas = [];
  const nomes_docentes = [];
  const siglas_cursos = [];
  
  // Preencher os arrays com os valores dos registros (sem aspas ou formatação SQL)
  records.forEach(record => {
    // Assumindo que a ordem das colunas é [nome_disciplina, nome_docente, sigla_curso]
    const nome_disciplina = record[columns[0]];
    const nome_docente = record[columns[1]];
    const sigla_curso = record[columns[2]];
    
    if (nome_disciplina !== undefined && nome_disciplina !== null) {
      nomes_disciplinas.push(nome_disciplina);
    }
    
    if (nome_docente !== undefined && nome_docente !== null) {
      nomes_docentes.push(nome_docente);
    }
    
    if (sigla_curso !== undefined && sigla_curso !== null) {
      siglas_cursos.push(sigla_curso);
    }
  });

  const query = `
  CALL \`sitefatecdsm-01-2025\`.\`SiteFatecDSM\`.\`inserir_disciplina_por_nome\`(
    @nomes_disciplinas,
    @nomes_docentes,
    @siglas_cursos
  );`;
  
  const options = { 
    query, 
    params: {
      nomes_disciplinas: nomes_disciplinas,
      nomes_docentes: nomes_docentes,
      siglas_cursos: siglas_cursos
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

module.exports = { insertDisciplinaBatch }