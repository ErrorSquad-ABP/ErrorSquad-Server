const diaQuery = require('../migrations/diaQuery');


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

      async createDia(newDia) {
      
          try {
            const nome = newDia.nome;
        
            // Verificar se o nome é nulo ou vazio
            if (!nome || nome.trim() === "") {
                throw new Error("Nome do dia é obrigatório para criação.");
            }
        
            // Caso o nome seja válido, continuar com a lógica
            return await diaQuery.createNewDia(nome);
        
        } catch (erro) {
            return { status: 400, mensagem: erro.message };
        }
      
        }
    
     static async getAllDia() {
     
         return await diaQuery.searchAllDias();
     
       }
    
      async updateDia(alterDia) {
          try {
      
            const id = alterDia.id;
      
            const nome = alterDia.nome;
      
            const diaExists = await diaQuery.diaExistsOrNotById(id);
      
            if (diaExists) {
      
              if (!nome || nome.trim() === "") {
                throw new Error("Nome do dia é obrigatório para atualização.");
      
            }
            return await diaQuery.updateExistingDia(id, nome)
          }
      
            if (!diaExists) {
      
              throw new Error("Dia não encontrado.");
      
            }
      
          } catch (erro) {
      
            return { status: 400, mensagem: erro.message };
      
          }
        }
    
      static async deleteDia(id) {
      
          try {
      
            const diaExists = await diaQuery.diaExistsOrNotById(id);
      
            if (diaExists) {
      
              await diaQuery.deleteExistingDia(id)
      
              return { status: 200, mensagem: "Dia deletado!" };
      
            }
      
            if (!diaExists) {
      
              throw new Error("Dia não encontrado.");
      
            }
      
          } catch (erro) {
      
            return { status: 400, mensagem: erro.message };
      
          }
        }
}

module.exports = dia;