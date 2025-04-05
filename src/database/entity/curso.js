const cursoQuery = require('../migrations/cursoQuery');

class curso {

  constructor(id, nome) {

    this.id = id;
    this.nome = nome;

  }
  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getNome() {
    return this.nome;
  }

  setNome(nome) {
    this.nome = nome;
  }

  static async createCurso(id , nome) {

    return await cursoQuery.createNewCurso(id , nome); 

  }

  static async getAllCurso() {

    return await cursoQuery.searchAllCursos();

  }

  updateCurso(id) {
    try{
      //Buscar curso no banco pelo ID (ainda a ser implementado)

      const curso = new curso(); // Aqui será preenchido com os dados do banco

      if (curso.name != null) {
          //Atualizar o curso no banco (ainda a ser implementado)
      }
      return { status: "sucesso", mensagem: "Curso atualizado!" };

    }catch (erro){

       return { status: "erro", mensagem: erro.message };
      
    }
  }

  deleteCurso(id) {

    try{
      //Buscar curso no banco pelo ID (ainda a ser implementado)

      const cursoExists = []; // Aqui será feito um boolean verificando se o curso existe no banco ou não

      if (cursoExists) {
          //Atualizar o curso no banco (ainda a ser implementado)
      }
      return { status: "sucesso", mensagem: "Curso deletado!" };

    }catch (erro){

       return { status: "erro", mensagem: erro.message };
    }
  }
}

module.exports = curso;