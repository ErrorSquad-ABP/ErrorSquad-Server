const disciplinaQuery = require('../migrations/disciplinaQuery');

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

      async createDisciplina(newDisciplina) {
        try {
          const nome = newDisciplina.nome;
          const docente_id = newDisciplina.docente_id;
      
          // Verificar se o nome é nulo ou vazio
          if (!nome || nome.trim() === "") {
              throw new Error("Nome da disciplina é obrigatório para criação.");
          }

          if (!docente_id) {
            throw new Error("ID do docente é obrigatório para criação.");
        }
      
          // Caso o nome seja válido, continuar com a lógica
          return await disciplinaQuery.createNewDisciplina(nome, docente_id);
      
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

          const docente_id = alterDisciplina.docente_id;
    
          const disciplinaExists = await disciplinaQuery.disciplinaExistsOrNotById(id);
    
          if (disciplinaExists) {
    
            if (!nome || nome.trim() === "") {
              throw new Error("Nome da disciplina é obrigatório para atualização.");
    
          }

          if (!docente_id) {
            throw new Error("ID do docente é obrigatório para atualização.");
  
        }
          return await disciplinaQuery.updateExistingDisciplina(id, nome, docente_id)
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
