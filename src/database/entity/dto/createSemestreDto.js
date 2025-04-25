class createSemestreDto{

    constructor(nivel, ano, id_curso, id_turno){
        this.nivel = nivel;
        this.ano = ano,
        this.id_curso = id_curso;
        this.id_turno = id_turno;
    }
}

module.exports = createSemestreDto;