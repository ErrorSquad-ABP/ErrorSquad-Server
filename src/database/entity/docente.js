class docente{

    constructor(id, nome, cor){
        this.id = id;
        this.nome = nome;
        this.cor = cor;
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

    getCor() {
        return this.cor;
    }

    setCor(cor){
        this.cor = cor;
    }

    static createDocente(createDocenteDto) {

        try {

            const Entity = new docente(null, createDocenteDto.nivel);
            //Lógica de inserção de dados no banco...

            return { status: "sucesso", mensagem: "docente cadastrado!" };

        } catch (erro) {

            return { status: "erro", mensagem: erro.message };

        }

    }

    getAllDocente() {

        try {

            //Buscar todos os docentes no banco (ainda a ser implementado)

            const allEntitys = []; // Aqui será preenchido com os dados do banco

            return allEntitys

        } catch (erro) {

            return { status: "erro", mensagem: erro.message };

        }

    }

    updateDocente(id) {

        try {
            //Buscar docente no banco pelo ID (ainda a ser implementado)

            const docente = new docente(); // Aqui será preenchido com os dados do banco

            if (docente.nivel != null) {
                //Atualizar o docente no banco (ainda a ser implementado)
            }
            return { status: "sucesso", mensagem: "docente atualizado!" };

        } catch (erro) {

            return { status: "erro", mensagem: erro.message };

        }

    }

    deleteDocente(id) {

        try{
          //Buscar docente no banco pelo ID (ainda a ser implementado)
    
          const docenteExists = []; // Aqui será feito um boolean verificando se o docente existe no banco ou não
    
          if (docenteExists) {
              //Atualizar o docente no banco (ainda a ser implementado)
          }
          return { status: "sucesso", mensagem: "docente deletado!" };
    
        }catch (erro){
    
           return { status: "erro", mensagem: erro.message };
        }
      }
}