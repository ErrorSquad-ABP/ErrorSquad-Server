class createDisciplinaDto {

    constructor(nome, id_docente, id_curso){
      this.nome = nome;
      this.id_docente = id_docente;
      this.id_curso = id_curso;
    }
  }
  
module.exports = createDisciplinaDto;