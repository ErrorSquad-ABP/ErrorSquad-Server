const pool = require('../../lib/pool');

async function createNewTurno( nome ) {

  const query = 
   `INSERT INTO errorsquad.turno(nome)
VALUES
($1);`;
 

  const values = [nome];

  try {
    const result = await pool.query(query, values);
    return { status: 201, mensagem: 'Turno inserido com sucesso!' };
  } catch (erro) {
    console.error('Erro ao inserir turno:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}


async function searchAllTurnos() {
  
  const query = 
   `SELECT * 
    FROM errorsquad.turno
    order by id asc`;

  const { rows } = await pool.query(query);

  if ( rows.length > 0 ){

    return { status: 200, data: rows, };

  }

  if ( rows.length <= 0 ){

    return { status:200, mensagem: "Sem turnos cadastrados." };

  }


}

async function turnoExistsOrNotById(id) {
  const query = `
    SELECT * FROM errorsquad.turno
    WHERE id = $1;
  `;

  const values = [id];

  const { rows } = await pool.query(query, values);

  return rows.length > 0;
}


async function updateExistingTurno(id, nome) {
  const query = `
    UPDATE errorsquad.turno
    SET nome = $1
    WHERE id = $2;
  `;

  const values = [nome, id];


  try {
    const result = await pool.query(query, values);
    return { status:200, mensagem: 'Turno atualizado com sucesso!' };
    
  } catch (erro) {
    console.error('Erro ao alterar turno:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

async function deleteExistingTurno(id) {
  const query = `
    DELETE FROM errorsquad.turno
    WHERE id = $1;
  `;

 const values = [id];


  try {
    const result = await pool.query(query, values);
    return { sucesso: true, mensagem: 'Turno atualizado com sucesso!' };
    
  } catch (erro) {
    console.error('Erro ao alterar turno:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}


module.exports = {
  searchAllTurnos,
  createNewTurno,
  turnoExistsOrNotById,
  updateExistingTurno,
  deleteExistingTurno
};