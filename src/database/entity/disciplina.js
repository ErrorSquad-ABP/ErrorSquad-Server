const disciplinaQuery = require('../migrations/disciplinaQuery');

class disciplina {
    constructor(id, nome, id_docente) {
       this.id = id;
       this.nome = nome;
       this.id_docente = id_docente;
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

      getid_docente() {
        return this.id_docente;
      }

      setId_docente(id_docente) {
        this.id_docente = id_docente;
      }

      async createDisciplina(newDisciplina) {
        try {
          const nome = newDisciplina.nome;
          const id_docente = newDisciplina.id_docente;
      
          // Verificar se o nome é nulo ou vazio
          if (!nome || nome.trim() === "") {
              throw new Error("Nome da disciplina é obrigatório para criação.");
          }

          if (!id_docente) {
            throw new Error("ID do docente é obrigatório para criação.");
        }
      
          // Caso o nome seja válido, continuar com a lógica
          return await disciplinaQuery.createNewDisciplina(nome, id_docente);
      
      } catch (erro) {
          return { status: 400, mensagem: erro.message };
      }
    
      }
    
      static async getAllDisciplina() {
       return await disciplinaQuery.searchAllDisciplinas();
      }
    
      async updateDisciplina(alterDisciplina) {
        try {
       
          const id = alterDisciplina.id;
    
          const nome = alterDisciplina.nome;

          const id_docente = alterDisciplina.id_docente;
    
          const disciplinaExists = await disciplinaQuery.disciplinaExistsOrNotById(id);
    
          if (disciplinaExists) {
    
            if (!nome || nome.trim() === "") {
              throw new Error("Nome da disciplina é obrigatório para atualização.");
    
          }

          if (!id_docente) {
            throw new Error("ID do docente é obrigatório para atualização.");
  
        }
          return await disciplinaQuery.updateExistingDisciplina(id, nome, id_docente)
        }
    
          if (!disciplinaExists) {
    
            throw new Error("Disciplina não encontrada.");
    
          }
    
        } catch (erro) {
    
          return { status: 400, mensagem: erro.message };
    
        }
      }
       
      
    
static async deleteDisciplina(id) {

    try {

      const disciplinaExists = await disciplinaQuery.disciplinaExistsOrNotById(id);

      if (disciplinaExists) {

        await disciplinaQuery.deleteExistingDisciplina(id)

        return { status: 200, mensagem: "Disciplina deletada!" };

      }

      if (!disciplinaExists) {

        throw new Error("Disciplina não encontrada.");

      }

    } catch (erro) {

      return { status: 400, mensagem: erro.message };

    }
  }
}
  
module.exports = disciplina;
