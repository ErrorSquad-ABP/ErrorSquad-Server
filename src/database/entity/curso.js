class curso {

  constructor(id, nome) {

    this.id = id;
    this.nome = nome;

  }
  getNome() {
    return this.nome;
  }

  setNome(nome) {
    this.nome = nome;
  }

  static createCurso(createCursoDto) {
    try{

      const Entity = new curso(null, createCursoDto.nome);
      return Entity;

    } catch (erro){

      return erro.message;
      
    }
  }

  getAllCurso() {

  }

  updateCurso(id) {

  }

  deleteCurso(id) {

  }
}