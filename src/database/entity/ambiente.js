class ambiente {
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

  static createAmbiente(createAmbienteDto) {
    try {
      const Entity = new ambiente(null, createAmbienteDto.nome);

      return { status: "sucesso", mensagem: "Ambiente cadastrado!" };
    } catch (erro) {
      return { status: "erro", mensagem: erro.message };
    }
  }

  getAllAmbiente() {
    try {
      //Buscar todos os dados no banco (ainda a ser implementado)

      const allEntitys = []; // Aqui será preenchido com os dados do banco

      return allEntitys;
    } catch (erro) {
      return { status: "erro", mensagem: erro.message };
    }
  }

  updateAmbiente(id) {
    try {
      //Buscar ambiente no banco pelo ID (ainda a ser implementado)

      const ambiente = new ambiente(); // Aqui será preenchido com os dados do banco

      if (ambiente.name != null) {
        //Atualizar o ambiente no banco (ainda a ser implementado)
      }
      return { status: "sucesso", mensagem: "Ambiente atualizado!" };
    } catch (erro) {
      return { status: "erro", mensagem: erro.message };
    }
  }

  deleteAmbiente(id) {

    try{
      //Buscar ambiente no banco pelo ID (ainda a ser implementado)

      const ambienteExists = []; // Aqui será feito um boolean verificando se o ambiente existe no banco ou não

      if (ambienteExists) {
          //Atualizar o ambiente no banco (ainda a ser implementado)
      }
      return { status: "sucesso", mensagem: "Ambiente deletado!" };

    }catch (erro){

       return { status: "erro", mensagem: erro.message };
    }
  }
}

