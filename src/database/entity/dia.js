class dia {
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

      static createDia(createDiaDto) {
        try {
          const Entity = new dia(null, createDiaDto.nome);
    
          return { status: "sucesso", mensagem: "Dia cadastrado!" };
        } catch (erro) {
          return { status: "erro", mensagem: erro.message };
        }
      }
    
      getAllDia() {
        try {
          //Buscar todos os dados no banco (ainda a ser implementado)
    
          const allEntitys = []; // Aqui será preenchido com os dados do banco
    
          return allEntitys;
        } catch (erro) {
          return { status: "erro", mensagem: erro.message };
        }
      }
    
      updateDia(id) {
        try {
          //Buscar dia no banco pelo ID (ainda a ser implementado)
    
          const dia = new dia(); // Aqui será preenchido com os dados do banco
    
          if (dia.name != null) {
            //Atualizar o dia no banco (ainda a ser implementado)
          }
          return { status: "sucesso", mensagem: "Dia atualizado!" };
        } catch (erro) {
          return { status: "erro", mensagem: erro.message };
        }
      }
    
      deleteDia(id) {
    
        try{
          //Buscar dia no banco pelo ID (ainda a ser implementado)
    
          const diaExists = []; // Aqui será feito um boolean verificando se o dia existe no banco ou não
    
          if (diaExists) {
              //Atualizar o dia no banco (ainda a ser implementado)
          }
          return { status: "sucesso", mensagem: "dia deletado!" };
    
        }catch (erro){
    
           return { status: "erro", mensagem: erro.message };
        }
      }
}
