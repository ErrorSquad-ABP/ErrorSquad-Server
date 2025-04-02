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
      //Lógica de inserção de dados no banco...

      return { "status": "sucesso", "mensagem": "Curso cadastrado!" };

    } catch (erro){

       return { status: "erro", mensagem: erro.message };
      
    }
  }

  getAllCurso() {
    try{

     //Buscar todos os cursos no banco (ainda a ser implementado)

     const allEntitys = []; // Aqui será preenchido com os dados do banco

      return allEntitys

    }catch (erro){

       return { status: "erro", mensagem: erro.message };

    }


  }

  updateCurso(id) {
    

  }

  deleteCurso(id) {

  }
}