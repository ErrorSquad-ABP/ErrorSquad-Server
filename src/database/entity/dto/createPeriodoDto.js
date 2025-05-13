class createPeriodoDto {

  constructor( id, nome_disciplina, nome_docente_disciplina, nome_ambiente) {

    this.id = id;
    this.nome_disciplina = nome_disciplina;
    this.nome_docente_disciplina = nome_docente_disciplina;
    this.nome_ambiente = nome_ambiente;
    
  }
}

module.exports = createPeriodoDto;