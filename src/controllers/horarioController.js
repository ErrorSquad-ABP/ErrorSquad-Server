const Horario = require("../database/entity/horario");

async function createHorario(req, res) {
  try {
    const { hr_inicio, hr_fim } = req.body;
    const result = await Horario.createHorario({ hr_inicio, hr_fim });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function listHorarios(req, res) {
  try {
    const horarios = await Horario.getAllHorario();
    res.status(200).json(horarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateHorario(req, res) {
  try {
    const { id } = req.params;
    const { hr_inicio, hr_fim } = req.body;
    const result = await Horario.updateHorario(id, { hr_inicio, hr_fim });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteHorario(req, res) {
  try {
    const { id } = req.params;
    const result = await Horario.deleteHorario(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createHorario,
  listHorarios,
  updateHorario,
  deleteHorario,
};