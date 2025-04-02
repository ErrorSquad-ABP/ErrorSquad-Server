class Horario {
  constructor(id, hr_inicio, hr_fim) {
    this.id = id;
    this.hr_inicio = hr_inicio;
    this.hr_fim = hr_fim;
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getHrInicio() {
    return this.hr_inicio;
  }

  setHrInicio(hr_inicio) {
    this.hr_inicio = hr_inicio;
  }

  getHrFim() {
    return this.hr_fim;
  }

  setHrFim(hr_fim) {
    this.hr_fim = hr_fim;
  }

  static createHorario(createHorarioDto) {
    try {
      const Entity = new Horario(
        null,
        createHorarioDto.hr_inicio,
        createHorarioDto.hr_fim
      );
      //Lógica de inserção de dados no banco

      return { status: "sucesso", mensagem: "Horário cadastrado!" };
    } catch (erro) {
      return { status: "erro", mensagem: erro.message };
    }
  }
}
