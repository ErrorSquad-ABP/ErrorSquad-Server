const docenteQuery = require('../migrations/docenteQuery');

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

    async createDocente(newDocente) {

        try {
          const nome = newDocente.nome;
          const cor = newDocente.cor;
      
          // Verificar se o nome é nulo ou vazio
          if (!nome || nome.trim() === "") {
              throw new Error("Nome do docente é obrigatório para criação.");
          }

          if (!cor || cor.trim() === "") {
            throw new Error("Cor do docente é obrigatório para criação.");
        }
      
          // Caso o nome seja válido, continuar com a lógica
          return await docenteQuery.createNewDocente(nome, cor);
      
      } catch (erro) {
          return { status: 400, mensagem: erro.message };
      }
    
      }

      static async getAllDocente() {

        return await docenteQuery.searchAllDocentes();
    
      }

      async updateDocente(alterDocente) {
        try {
    
          const id = alterDocente.id;
    
          const nome = alterDocente.nome;

          const cor = alterDocente.cor;
    
          const docenteExists = await docenteQuery.docenteExistsOrNotById(id);
    
          if (docenteExists) {
    
            if (!nome || nome.trim() === "") {
              throw new Error("Nome do docente é obrigatório para atualização.");
    
          }
          if (!cor || cor.trim() === "") {
            throw new Error("cor do docente é obrigatório para atualização.");
  
        }
          return await docenteQuery.updateExistingDocente(id, nome, cor)
        }
    
          if (!docenteExists) {
    
            throw new Error("Docente não encontrado.");
    
          }
    
        } catch (erro) {
    
          return { status: 400, mensagem: erro.message };
    
        }
      }

      static async deleteDocente(id) {

        try {
    
          const docenteExists = await docenteQuery.docenteExistsOrNotById(id);
    
          if (docenteExists) {
    
            await docenteQuery.deleteExistingDocente(id)
    
            return { status: 200, mensagem: "Docente deletado!" };
    
          }
    
          if (!docenteExists) {
    
            throw new Error("Docente não encontrado.");
    
          }
    
        } catch (erro) {
    
          return { status: 400, mensagem: erro.message };
    
        }
      }
    }
    
    module.exports = docente;