const pool = require('../../../../lib/pool');

async function insertDisciplinaBatch(tableName, columns, records) {
  if (!records || records.length === 0) return;

  const nomes_disciplinas = [];
  const nomes_docentes = [];
  const siglas_cursos = [];
  const codigos = [];

  records.forEach(record => {
    const nome_disciplina = record[columns[0]];
    const nome_docente = record[columns[1]];
    const sigla_curso = record[columns[2]];
    const codigo_disciplina = record[columns[3]];

    if (nome_disciplina !== undefined && nome_disciplina !== null)
      nomes_disciplinas.push(nome_disciplina);

    if (nome_docente !== undefined && nome_docente !== null)
      nomes_docentes.push(nome_docente);

    if (sigla_curso !== undefined && sigla_curso !== null)
      siglas_cursos.push(sigla_curso);

    if (codigo_disciplina !== undefined && codigo_disciplina !== null)
      codigos.push(codigo_disciplina);
  });

  const query = `
    CALL errorsquad.inserir_disciplina_por_nome($1, $2, $3, $4);
  `;

  const values = [nomes_disciplinas, nomes_docentes, siglas_cursos, codigos];
  console.log("query", query,"values", values);


   
  try {
    await pool.query(query, values);
    console.log(`Inseridos ${records.length} registros em ${tableName}`);
    return {
      status: 201,
      mensagem: `Registros inseridos com sucesso em ${tableName}!`,
    };
  } catch (erro) {
    console.error(`Erro ao inserir em batch em ${tableName}:`, erro);
    throw erro;
  }
}

module.exports = { insertDisciplinaBatch }
