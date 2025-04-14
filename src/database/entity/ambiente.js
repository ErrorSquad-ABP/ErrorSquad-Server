const ambienteQuery = require('../migrations/ambienteQuery');

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

  async createAmbiente(newAmbiente) {
  
      try {
        const nome = newAmbiente.nome;
    
        // Verificar se o nome é nulo ou vazio
        if (!nome || nome.trim() === "") {
            throw new Error("Nome do ambiente é obrigatório para criação.");
        }
    
        // Caso o nome seja válido, continuar com a lógica
        return await ambienteQuery.createNewAmbiente(nome);
    
    } catch (erro) {
        return { status: 400, mensagem: erro.message };
    }
  
    }

  static async getAllAmbiente() {
  
      return await ambienteQuery.searchAllAmbientes();
  
    }

  async updateAmbiente(alterAmbiente) {
      try {
  
        const id = alterAmbiente.id;
  
        const nome = alterAmbiente.nome;
  
        const ambienteExists = await ambienteQuery.ambienteExistsOrNotById(id);
  
        if (ambienteExists) {
  
          if (!nome || nome.trim() === "") {
            throw new Error("Nome do ambiente é obrigatório para atualização.");
  
        }
        return await ambienteQuery.updateExistingAmbiente(id, nome)
      }
  
        if (!ambienteExists) {
  
          throw new Error("Ambiente não encontrado.");
  
        }
  
      } catch (erro) {
  
        return { status: 400, mensagem: erro.message };
  
      }
    }
  
  static async deleteAmbiente(id) {
  
      try {
  
        const ambienteExists = await ambienteQuery.ambienteExistsOrNotById(id);
  
        if (ambienteExists) {
  
          await ambienteQuery.deleteExistingAmbiente(id)
  
          return { status: 200, mensagem: "Ambiente deletado!" };
  
        }
  
        if (!ambienteExists) {
  
          throw new Error("Ambiente não encontrado.");
  
        }
  
      } catch (erro) {
  
        return { status: 400, mensagem: erro.message };
  
      }
    }
}

module.exports = ambiente;