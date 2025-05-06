class createSemestreDto{

    constructor(nivel, ano, nome_curso, nome_turno){
        this.nivel = nivel;
        this.ano = ano,
        this.nome_curso = nome_curso;
        this.nome_turno = nome_turno;
    }
}

module.exports = createSemestreDto;