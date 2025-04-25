const semestreQuery = require('../migrations/semestreQuery');

class semestre {

    constructor(id, nivel, ano, id_curso, id_turno) {
        this.id = id;
        this.nivel = nivel;
        this.ano = ano,
        this.id_curso = id_curso;
        this.id_turno = id_turno;
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

    getid_curso() {
        return this.id_curso;
    }

    setid_curso(id_curso) {
        this.id_curso = id_curso;
    }

    getid_turno() {
        return this.id_turno;
    }

    setid_turno(id_turno) {
        this.id_turno = id_turno;
    }

    async createSemestre(newSemestre) {

        try {
          const nivel = newSemestre.nivel;
          const ano = newSemestre.ano;
          const id_curso = newSemestre.id_curso;
          const id_turno = newSemestre.id_turno;
      
          // Verificar se o nivel é nulo ou vazio
          if (!nivel) {
              throw new Error("nivel do semestre é obrigatório para criação.");
          }

          if (!ano) {
            throw new Error("ano do semestre é obrigatório para criação.");
        }

        if (!id_curso) {
            throw new Error("ID do curso do semestre é obrigatório para criação.");
        }

        if (!id_turno) {
            throw new Error("ID do turno do semestre é obrigatório para criação.");
        }
      
          // Caso o nivel seja válido, continuar com a lógica
          return await semestreQuery.createNewSemestre(nivel, ano, id_curso, id_turno);
      
      } catch (erro) {
          return { status: 400, mensagem: erro.message };
      }
    
      }

      static async getAllSemestre() {

        return await semestreQuery.searchAllSemestres();
    
      }

      async updateSemestre(alterSemestre) {
        try {
    
          const id = alterSemestre.id;
    
          const nivel = alterSemestre.nivel;

          const ano = alterSemestre.ano;

          const id_curso = alterSemestre.id_curso;

          const id_turno = alterSemestre.id_turno;
    
          const semestreExists = await semestreQuery.semestreExistsOrNotById(id);
    
          if (semestreExists) {
    
            if (!nivel) {
              throw new Error("nivel do semestre é obrigatório para atualização.");
    
          }
          if (!ano) {
            throw new Error("ano do semestre é obrigatório para atualização.");
  
        }
        if (!id_curso) {
            throw new Error("ID do curso do semestre é obrigatório para atualização.");
  
        }
        if (!id_turno) {
            throw new Error("ID do turno do semestre é obrigatório para atualização.");
  
        }
          return await semestreQuery.updateExistingSemestre(id, nivel, ano, id_curso, id_turno)
        }
    
          if (!semestreExists) {
    
            throw new Error("semestre não encontrado.");
    
          }
    
        } catch (erro) {
    
          return { status: 400, mensagem: erro.message };
    
        }
      }

      static async deleteSemestre(id) {

        try {
    
          const semestreExists = await semestreQuery.semestreExistsOrNotById(id);
    
          if (semestreExists) {
    
            await semestreQuery.deleteExistingSemestre(id)
    
            return { status: 200, mensagem: "Semestre deletado!" };
    
          }
    
          if (!semestreExists) {
    
            throw new Error("Semestre não encontrado.");
    
          }
    
        } catch (erro) {
    
          return { status: 400, mensagem: erro.message };
    
        }
      }
    }
    
    module.exports = semestre;