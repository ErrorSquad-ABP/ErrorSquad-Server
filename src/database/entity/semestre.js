class semestre {

    constructor(id, nivel, ano, curso_id, turno_id) {
        this.id = id;
        this.nivel = nivel;
        this.ano = ano,
            this.curso_id = curso_id;
        this.turno_id = turno_id;
    }
    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getNivel() {
        return this.nivel;
    }

    setNivel(nivel) {
        this.nivel = nivel;
    }

    getAno() {
        return this.ano;
    }

    setAno(ano) {
        this.ano = ano;
    }

    getCurso_id() {
        return this.curso_id;
    }

    setCurso_id(curso_id) {
        this.curso_id = curso_id;
    }

    getTurno_id() {
        return this.turno_id;
    }

    setTurno_id(turno_id) {
        this.turno_id = turno_id;
    }

    static createSemestre(createSemestreDto) {

        try {

            const Entity = new semestre(null, createSemestreDto.nivel);
            //Lógica de inserção de dados no banco...

            return { status: "sucesso", mensagem: "semestre cadastrado!" };

        } catch (erro) {

            return { status: "erro", mensagem: erro.message };

        }

    }

    getAllSemestre() {

        try {

            //Buscar todos os semestres no banco (ainda a ser implementado)

            const allEntitys = []; // Aqui será preenchido com os dados do banco

            return allEntitys

        } catch (erro) {

            return { status: "erro", mensagem: erro.message };

        }

    }

    updateSemestre(id) {

        try {
            //Buscar semestre no banco pelo ID (ainda a ser implementado)

            const semestre = new semestre(); // Aqui será preenchido com os dados do banco

            if (semestre.nivel != null) {
                //Atualizar o semestre no banco (ainda a ser implementado)
            }
            return { status: "sucesso", mensagem: "semestre atualizado!" };

        } catch (erro) {

            return { status: "erro", mensagem: erro.message };

        }

    }

    deletesemestre(id) {

        try{
          //Buscar semestre no banco pelo ID (ainda a ser implementado)
    
          const semestreExists = []; // Aqui será feito um boolean verificando se o semestre existe no banco ou não
    
          if (semestreExists) {
              //Atualizar o semestre no banco (ainda a ser implementado)
          }
          return { status: "sucesso", mensagem: "semestre deletado!" };
    
        }catch (erro){
    
           return { status: "erro", mensagem: erro.message };
        }
      }
}