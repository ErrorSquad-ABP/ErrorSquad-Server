class createDisciplinaDto {

    constructor(nome, nome_docente, nome_curso, codigo){
      this.nome = nome;
      this.nome_docente = nome_docente;
      this.nome_curso = nome_curso;
      this.codigo = codigo;
    }
  }
  
module.exports = createDisciplinaDto;