class createPeriodoDto {

  constructor( id, disciplina_id, docente_id, ambiente_id) {

    this.id = id;
    this.disciplina_id = disciplina_id;
    this.docente_id = docente_id;
    this.ambiente_id = ambiente_id;
    
  }
}

module.exports = createPeriodoDto;