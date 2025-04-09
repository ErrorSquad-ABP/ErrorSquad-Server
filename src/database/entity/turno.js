class turno {

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

    static createTurno(createTurnoDto) {
        try {

            const Entity = new turno(null, createTurnoDto.nome);
            //Lógica de inserção de dados no banco...

            return { "status": "sucesso", "mensagem": "Turno cadastrado!" };

        } catch (erro) {

            return { status: "erro", mensagem: erro.message };

        }
    }

    getAllTurno() {

        try {

            //Buscar todos os turnos no banco (ainda a ser implementado)

            const allEntitys = []; // Aqui será preenchido com os dados do banco

            return allEntitys

        } catch (erro) {

            return { status: "erro", mensagem: erro.message };

        }

    }

    updateTurno(id) {

        try {
            //Buscar turno no banco pelo ID (ainda a ser implementado)

            const turno = new turno(); // Aqui será preenchido com os dados do banco

            if (turno.name != null) {
                //Atualizar o turno no banco (ainda a ser implementado)
            }
            return { status: "sucesso", mensagem: "turno atualizado!" };

        } catch (erro) {

            return { status: "erro", mensagem: erro.message };

        }

    }

    deleteTurno(id) {

        try{
          //Buscar turno no banco pelo ID (ainda a ser implementado)
    
          const turnoExists = []; // Aqui será feito um boolean verificando se o turno existe no banco ou não
    
          if (turnoExists) {
              //Atualizar o turno no banco (ainda a ser implementado)
          }
          return { status: "sucesso", mensagem: "turno deletado!" };
    
        }catch (erro){
    
           return { status: 400, mensagem: erro.message };
        }
      }

}