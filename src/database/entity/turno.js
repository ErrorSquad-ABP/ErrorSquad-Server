const turnoQuery = require('../migrations/turnoQuery');

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

    async createTurno(newTurno) {

        try {
          const nome = newTurno.nome;
      
          // Verificar se o nome é nulo ou vazio
          if (!nome || nome.trim() === "") {
              throw new Error("Nome do turno é obrigatório para criação.");
          }
      
          // Caso o nome seja válido, continuar com a lógica
          return await turnoQuery.createNewTurno(nome);
      
      } catch (erro) {
          return { status: 400, mensagem: erro.message };
      }
    
      }

    static async getAllTurno() {

        return await turnoQuery.searchAllTurnos();
    
      }

    async updateTurno(alterTurno) {
        try {
    
          const id = alterTurno.id;
    
          const nome = alterTurno.nome;
    
          const turnoExists = await turnoQuery.turnoExistsOrNotById(id);
    
          if (turnoExists) {
    
            if (!nome || nome.trim() === "") {
              throw new Error("Nome do turno é obrigatório para atualização.");
    
          }
          return await turnoQuery.updateExistingTurno(id, nome)
        }
    
          if (!turnoExists) {
    
            throw new Error("Turno não encontrado.");
    
          }
    
        } catch (erro) {
    
          return { status: 400, mensagem: erro.message };
    
        }
      }

    static async deleteTurno(id) {

        try {
    
          const turnoExists = await turnoQuery.turnoExistsOrNotById(id);
    
          if (turnoExists) {
    
            await turnoQuery.deleteExistingTurno(id)
    
            return { status: 200, mensagem: "Turno deletado!" };
    
          }
    
          if (!turnoExists) {
    
            throw new Error("Turno não encontrado.");
    
          }
    
        } catch (erro) {
    
          return { status: 400, mensagem: erro.message };
    
        }
      }
    }
    
module.exports = turno;