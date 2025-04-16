const disciplina = require('../database/entity/disciplina');
const createDisciplinaDto = require('../database/entity/dto/createDisciplinaDto');
const defaultStrings = require('../utils/firstLetterUppercase');

async function requestNewDisciplina(req, res) {

    const defaultNomeString = defaultStrings.firstLetterUppercase(req.body.nome);
    const newDisciplinaDto = new createDisciplinaDto(defaultNomeString, req.body.docente_id);

    try {
        const newDisciplina = new disciplina(null, newDisciplinaDto.nome, newDisciplinaDto.docente_id)
        const createDisciplina = await newDisciplina.createDisciplina(newDisciplina);
        res.status(createDisciplina.status).json(createDisciplina);
    } catch (error) {
        console.error('Erro ao criar disciplina:', error);
        res.status(500).json({ erro: 'Erro interno ao criar disciplina' });
    }
}

async function listDisciplinas(req, res) {
    try {
        const disciplinas = await disciplina.getAllDisciplina();
        res.status(disciplinas.status).json(disciplinas.data);
    } catch (error) {
        console.error('Erro ao listar disciplinas:', error);
        res.status(500).json({ erro: 'Erro interno ao buscar disciplinas' });
    }
}

async function requestAlterDisciplina(req, res) {

    const defaultNomeString = defaultStrings.firstLetterUppercase(req.body.nome);
    const alterDisciplina = new disciplina(req.body.id, defaultNomeString, req.body.docente_id);

    try {
        const updateDisciplina = await alterDisciplina.updateDisciplina(alterDisciplina);
        res.status(updateDisciplina.status).json(updateDisciplina);
    } catch (error) {
        console.error('Erro ao atualizar disciplina:', error);
        res.status(500).json({ erro: 'Erro interno ao atualizar disciplina' });
    }
}

async function requestDeleteDisciplina(req, res) {

    const id = req.body.id;

    try {
        const deleteDisciplina = await disciplina.deleteDisciplina(id);
        res.status(deleteDisciplina.status).json(deleteDisciplina);
    } catch (error) {
        console.error('Erro ao atualizar disciplina:', error);
        res.status(500).json({ erro: 'Erro interno ao atualizar disciplina' });
    }
}

module.exports = {
    listDisciplinas,
    requestNewDisciplina,
    requestAlterDisciplina,
    requestDeleteDisciplina
};