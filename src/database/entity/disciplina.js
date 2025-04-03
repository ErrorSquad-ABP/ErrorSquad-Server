class disciplina {
    constructor(id, nome, docente_id) {
       this.id = id;
       this.nome = nome;
       this.docente_id = docente_id;
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

      getDocente_id() {
        return this.docente_id;
      }

      setDocente_id(docente_id) {
        this.docente_id = docente_id;
      }

      static createDisciplina(createDisciplinaDto) {
        try {
          const Entity = new disciplina(null, createDisciplinaDto.nome);
    
          return { status: "sucesso", mensagem: "Disciplina cadastrada!" };
        } catch (erro) {
          return { status: "erro", mensagem: erro.message };
        }
      }
    
      getAllDisciplina() {
        try {
          //Buscar todos os dados no banco (ainda a ser implementado)
    
          const allEntitys = []; // Aqui será preenchido com os dados do banco
    
          return allEntitys;
        } catch (erro) {
          return { status: "erro", mensagem: erro.message };
        }
      }
    
      updateDisciplina(id) {
        try {
          //Buscar disciplina no banco pelo ID (ainda a ser implementado)
    
          const disciplina = new disciplina(); // Aqui será preenchido com os dados do banco
    
          if (ambiente.name != null) {
            //Atualizar a disciplina no banco (ainda a ser implementado)
          }
          return { status: "sucesso", mensagem: "Disciplina atualizada!" };
        } catch (erro) {
          return { status: "erro", mensagem: erro.message };
        }
      }
    
      deleteDisciplina(id) {
    
        try{
          //Buscar disciplina no banco pelo ID (ainda a ser implementado)
    
          const disciplinaExists = []; // Aqui será feito um boolean verificando se a disciplina existe no banco ou não
    
          if (disciplinaExists) {
              //Atualizar a disciplina no banco (ainda a ser implementado)
          }
          return { status: "sucesso", mensagem: "Disciplina deletada!" };
    
        }catch (erro){
    
           return { status: "erro", mensagem: erro.message };
        }
      }
    }

