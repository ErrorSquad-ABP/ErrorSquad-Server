const semestreQuery = require('../migrations/semestreQuery');

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

    async createSemestre(newSemestre) {

        try {
          const nivel = newSemestre.nivel;
          const ano = newSemestre.ano;
          const curso_id = newSemestre.curso_id;
          const turno_id = newSemestre.turno_id;
      
          // Verificar se o nivel é nulo ou vazio
          if (!nivel) {
              throw new Error("nivel do semestre é obrigatório para criação.");
          }

          if (!ano) {
            throw new Error("ano do semestre é obrigatório para criação.");
        }

        if (!curso_id) {
            throw new Error("ID do curso do semestre é obrigatório para criação.");
        }

        if (!turno_id) {
            throw new Error("ID do turno do semestre é obrigatório para criação.");
        }
      
          // Caso o nivel seja válido, continuar com a lógica
          return await semestreQuery.createNewSemestre(nivel, ano, curso_id, turno_id);
      
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

          const curso_id = alterSemestre.curso_id;

          const turno_id = alterSemestre.turno_id;
    
          const semestreExists = await semestreQuery.semestreExistsOrNotById(id);
    
          if (semestreExists) {
    
            if (!nivel) {
              throw new Error("nivel do semestre é obrigatório para atualização.");
    
          }
          if (!ano) {
            throw new Error("ano do semestre é obrigatório para atualização.");
  
        }
        if (!curso_id) {
            throw new Error("ID do curso do semestre é obrigatório para atualização.");
  
        }
        if (!turno_id) {
            throw new Error("ID do turno do semestre é obrigatório para atualização.");
  
        }
          return await semestreQuery.updateExistingSemestre(id, nivel, ano, curso_id, turno_id)
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