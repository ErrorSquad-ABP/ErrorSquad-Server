class periodo {

  constructor(id, dia_id, horario_id, disciplina_id, docente_id, semestre_id, ambiente_id) {

    this.id = id;
    this.dia_id = dia_id;
    this.horario_id = horario_id;
    this.disciplina_id = disciplina_id;
    this.docente_id = docente_id;
    this.semestre_id = semestre_id;
    this.ambiente_id = ambiente_id;
    
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getDia_id() {
    return this.dia_id;
  }

  setDia(dia_id) {
    this.dia_id = dia_id;
  }

  getHorario_id() {
    return this.horario_id;
  }

  setHorario(horario_id) {
    this.horario_id = horario_id;
  }

  getDisciplina_id() {
    return this.disciplina_id;
  }

  setDisciplina(disciplina_id) {
    this.disciplina_id = disciplina_id;
  }

  getDocente_id() {
    return this.docente_id;
  }

  setDocente(docente_id) {
    this.docente_id = docente_id;
  }

  getSemestre_id() {
    return this.semestre_id;
  }

  setSemestre(semestre_id) {
    this.semestre_id = semestre_id;
  }

  getAmbiente_id() {
    return this.ambiente_id;
  }

  setAmbiente(ambiente_id) {
    this.ambiente_id = ambiente_id;
  }

  static createPeriodo(createPeriodoDto) {
    try{

      const Entity = new periodo(null, 
                                 createPeriodoDto.dia_id,
                                 createPeriodoDto.horario_id,
                                 createPeriodoDto.disciplina_id,
                                 createPeriodoDto.docente_id,
                                 createPeriodoDto.semestre_id,
                                 createPeriodoDto.ambiente_id);
      //Lógica de inserção de dados no banco...

      return { "status": "sucesso", "mensagem": "Periodo cadastrado!" };

    } catch (erro){

       return { status: "erro", mensagem: erro.message };
      
    }
  }

  getAllPeriodo() {
    try{

     //Buscar todos os cursos no banco (ainda a ser implementado)
     
     const allEntitys = []; // Aqui será preenchido com os dados do banco

      return allEntitys

    }catch (erro){

       return { status: "erro", mensagem: erro.message };

    }
  }

  updatePeriodo(id) {
    try{
      //Buscar periodo no banco pelo ID (ainda a ser implementado)

      const periodo = new periodo(); // Aqui será preenchido com os dados do banco

      if (periodo.dia_id != null) {
          //Atualizar o periodo no banco (ainda a ser implementado)
      }

      if (periodo.horario_id != null) {
        //Atualizar o periodo no banco (ainda a ser implementado)
      }

      if (periodo.disciplina_id != null) {
        //Atualizar o periodo no banco (ainda a ser implementado)
      }

      if (periodo.docente_id != null) {
        //Atualizar o periodo no banco (ainda a ser implementado)
      }

      if (periodo.semestre_id != null) {
        //Atualizar o periodo no banco (ainda a ser implementado)
      }

      if (periodo.ambiente_id != null) {
        //Atualizar o periodo no banco (ainda a ser implementado)
      }

      return { status: "sucesso", mensagem: "Periodo atualizado!" };

    }catch (erro){

       return { status: "erro", mensagem: erro.message };
      
    }
  }

}