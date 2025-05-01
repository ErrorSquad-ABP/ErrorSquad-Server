class createSemestreDto{

    constructor(nivel, ano, nome_curso, nome_turno, inicio, fim){
        this.nivel = nivel;
        this.ano = ano,
        this.nome_curso = nome_curso;
        this.nome_turno = nome_turno;
        this.inicio = inicio;
        this.fim = fim;
    }
}

module.exports = createSemestreDto;