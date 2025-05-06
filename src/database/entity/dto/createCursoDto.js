class createCursoDto {

  constructor(nome, coordenador, sigla, inicio, fim){
    this.nome = nome;
    this.coordenador = coordenador;
    this.sigla = sigla;
    this.inicio = inicio;
    this.fim = fim;
  }
}

module.exports = createCursoDto;