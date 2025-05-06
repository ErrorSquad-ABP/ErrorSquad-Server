const cursoQuery = require('../migrations/cursoQuery');

class curso {

  constructor(id, nome, coordenador, sigla, inicio, fim) {

    this.id = id;
    this.nome = nome;
    this.coordenador = coordenador;
    this.sigla = sigla;
    this.inicio = inicio;
    this.fim = fim;

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

  getCoordenador() {
    return this.coordenador;
  }

  setCoordenador(coordenador) {
    this.coordenador = coordenador;
  }

  getSigla() {
    return this.sigla;
  }

  setSigla(sigla) {
    this.sigla = sigla;
  }

  getInicio() {
    return this.inicio;
  }

  setInicio(inicio) {
    this.inicio = inicio;
  }

  getFim() {
    return this.fim;
  }

  setFim(fim) {
    this.fim = fim;
  }

  async createCurso(newCurso) {

    try {

      const nome = newCurso.nome;

      const coordenador = newCurso.coordenador;

      const sigla = newCurso.sigla;

      const inicio = newCurso.inicio;

      const fim = newCurso.fim;

      // Verificar se o nome é nulo ou vazio
      if (!nome || nome.trim() === "") {
        throw new Error("Nome do curso é obrigatório para criação.");
      }

      if (!coordenador || coordenador.trim() === "") {
        throw new Error("Coordenador do curso é obrigatório para criação.");
      }

      if (!sigla || sigla.trim() === "") {
        throw new Error("Sigla do curso é obrigatório para criação.");
      }

      if (!inicio || inicio.trim() === "") {
        throw new Error("Data de inicio do curso é obrigatório para criação.");
      }

      if (!fim || fim.trim() === "") {
        throw new Error("Data de fim do curso é obrigatório para criação.");
      }

      // Caso o nome seja válido, continuar com a lógica
      return await cursoQuery.createNewCurso(nome, coordenador, sigla, inicio, fim);

    } catch (erro) {
      return { status: 400, mensagem: erro.message };
    }

  }

  static async getAllCurso() {

    return await cursoQuery.searchAllCursos();

  }

  async updateCurso(alterCurso) {
    try {

      const id = alterCurso.id;

      const nome = alterCurso.nome;

      const coordenador = newCurso.coordenador;

      const sigla = newCurso.sigla;

      const inicio = newCurso.inicio;

      const fim = newCurso.fim;

      const cursoExists = await cursoQuery.cursoExistsOrNotById(id);

      if (cursoExists) {

        if (!nome || nome.trim() === "") {
          throw new Error("Nome do curso é obrigatório para criação.");
        }
  
        if (!coordenador || coordenador.trim() === "") {
          throw new Error("Coordenador do curso é obrigatório para criação.");
        }
  
        if (!sigla || sigla.trim() === "") {
          throw new Error("Sigla do curso é obrigatório para criação.");
        }
        
        if (!inicio || inicio.trim() === "") {
          throw new Error("Data de inicio do curso é obrigatório para criação.");
        }
  
        if (!fim || fim.trim() === "") {
          throw new Error("Data de fim do curso é obrigatório para criação.");
        }

        return await cursoQuery.updateExistingCurso(id, nome, coordenador, sigla)
      }

      if (!cursoExists) {

        throw new Error("Curso não encontrado.");

      }

    } catch (erro) {

      return { status: 400, mensagem: erro.message };

    }
  }


  static async deleteCurso(id) {

    try {

      const cursoExists = await cursoQuery.cursoExistsOrNotById(id);

      if (cursoExists) {

        await cursoQuery.deleteExistingCurso(id)

        return { status: 200, mensagem: "Curso deletado!" };

      }

      if (!cursoExists) {

        throw new Error("Curso não encontrado.");

      }

    } catch (erro) {

      return { status: 400, mensagem: erro.message };

    }
  }
}

module.exports = curso;