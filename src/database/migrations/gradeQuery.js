const bigquery = require('../../lib/bigquery');

// Função que insere múltiplos registros em lote em uma tabela
async function insertBatch(tableName, columns, records) {
  if (!records || records.length === 0) return;
  
  // Preparação dos valores para inserção em lote
  const values = records.map(record => {
    const vals = columns.map(col => {
      const val = record[col];
      return typeof val === 'string' ? `'${val.replace(/'/g, "''")}'` : val;
    });
    return `(${vals.join(', ')})`;
  }).join(', ');
  
  const query = `
    INSERT INTO sitefatecdsm-01-2025.SiteFatecDSM.${tableName} (${columns.join(', ')})
    VALUES ${values};
  `;

  const options = { query, useLegacySql: false };
  
  try {
    await bigquery.query(options);
    console.log(`Inseridos ${records.length} registros em ${tableName}`);
    return { status: 201, mensagem: `Registros inseridos com sucesso em ${tableName}!` };
  } catch (erro) {
    console.error(`Erro ao inserir em ${tableName}:`, erro);
    throw erro;
  }
}

// Funções específicas para inserção em lote de cada tipo de dados
async function insertTurnosEmLote(turnos) {
  return insertBatch('turno', ['id', 'nome'], turnos);
}

async function insertCursosEmLote(cursos) {
  return insertBatch('curso', ['id', 'nome'], cursos);
}

async function insertSemestresEmLote(semestres) {
  return insertBatch('semestre_cronograma', ['id', 'nivel', 'ano', 'id_curso', 'id_turno'], semestres);
}

// Processador principal dos dados CSV
async function processCSVData(data) {
  try {
    // Extração de dados únicos para cada tabela
    const turnosMap = new Map();
    const cursosMap = new Map();
    const semestres = [];
    
    // Processar todos os registros uma única vez
    data.forEach(item => {
      // Processar turnos
      if (!turnosMap.has(item.id_turno)) {
        turnosMap.set(item.id_turno, {
          id: parseInt(item.id_turno),
          nome: item.nome_turno
        });
      }
      
      // Processar cursos
      if (!cursosMap.has(item.id_curso)) {
        cursosMap.set(item.id_curso, {
          id: parseInt(item.id_curso),
          nome: item.nome_curso
        });
      }
      
      // Adicionar semestres (todos são únicos pelo ID)
      semestres.push({
        id: parseInt(item.id_semestre),
        nivel: parseInt(item.nivel),
        ano: parseInt(item.ano),
        id_curso: parseInt(item.id_curso),
        id_turno: parseInt(item.id_turno)
      });
    });
    
    // Converter maps para arrays
    const turnos = Array.from(turnosMap.values());
    const cursos = Array.from(cursosMap.values());
    
    console.log(`Processando ${turnos.length} turnos, ${cursos.length} cursos e ${semestres.length} semestres`);
    
    // Executar todas as inserções em paralelo para máxima performance
    await Promise.all([
      insertTurnosEmLote(turnos),
      insertCursosEmLote(cursos),
      insertSemestresEmLote(semestres)
    ]);
    
    return { status: 200, mensagem: 'Todos os dados processados com sucesso!' };
  } catch (error) {
    console.error('Erro ao processar dados:', error);
    throw error;
  }
}

// Função para parse do CSV e chamada do processador
async function processCSV(csvString) {
  // Converter string CSV em array de objetos
  const lines = csvString.trim().split('\n');
  const headers = lines[0].split(',');
  
  const data = lines.slice(1).filter(line => line.trim()).map(line => {
    const values = line.split(',');
    const record = {};
    headers.forEach((header, i) => {
      record[header] = values[i];
    });
    return record;
  });
  
  return processCSVData(data);
}

module.exports = {
  processCSV,
  processCSVData,
  insertTurnosEmLote,
  insertCursosEmLote,
  insertSemestresEmLote
};