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