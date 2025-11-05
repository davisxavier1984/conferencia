const Participant = require('../models/Participant');

class ParticipantsController {
  // Criar novo participante (inscrição)
  async create(req, res) {
    try {
      const participantData = req.body;

      // Verificar se email já existe
      const existingEmail = await Participant.findByEmail(participantData.email);
      if (existingEmail) {
        return res.status(400).json({
          error: 'Email já cadastrado'
        });
      }

      // Verificar se CPF já existe
      const existingCPF = await Participant.findByCPF(participantData.cpf);
      if (existingCPF) {
        return res.status(400).json({
          error: 'CPF já cadastrado'
        });
      }

      // Criar participante
      const result = await Participant.create(participantData);
      const participant = await Participant.findById(result.id);

      res.status(201).json({
        success: true,
        message: 'Inscrição realizada com sucesso',
        participant
      });
    } catch (error) {
      console.error('Erro ao criar participante:', error);
      res.status(500).json({
        error: 'Erro ao processar inscrição'
      });
    }
  }

  // Listar todos os participantes (apenas admin)
  async list(req, res) {
    try {
      const filters = {
        category: req.query.category,
        status: req.query.status,
        search: req.query.search
      };

      const participants = await Participant.findAll(filters);
      const total = await Participant.count(filters);

      res.json({
        success: true,
        total,
        participants
      });
    } catch (error) {
      console.error('Erro ao listar participantes:', error);
      res.status(500).json({
        error: 'Erro ao listar participantes'
      });
    }
  }

  // Buscar participante por ID (apenas admin)
  async getById(req, res) {
    try {
      const { id } = req.params;
      const participant = await Participant.findById(id);

      if (!participant) {
        return res.status(404).json({
          error: 'Participante não encontrado'
        });
      }

      res.json({
        success: true,
        participant
      });
    } catch (error) {
      console.error('Erro ao buscar participante:', error);
      res.status(500).json({
        error: 'Erro ao buscar participante'
      });
    }
  }

  // Atualizar participante (apenas admin)
  async update(req, res) {
    try {
      const { id } = req.params;
      const participantData = req.body;

      // Verificar se participante existe
      const existing = await Participant.findById(id);
      if (!existing) {
        return res.status(404).json({
          error: 'Participante não encontrado'
        });
      }

      // Verificar se email já está em uso por outro participante
      if (participantData.email !== existing.email) {
        const existingEmail = await Participant.findByEmail(participantData.email);
        if (existingEmail && existingEmail.id !== parseInt(id)) {
          return res.status(400).json({
            error: 'Email já cadastrado para outro participante'
          });
        }
      }

      // Verificar se CPF já está em uso por outro participante
      if (participantData.cpf !== existing.cpf) {
        const existingCPF = await Participant.findByCPF(participantData.cpf);
        if (existingCPF && existingCPF.id !== parseInt(id)) {
          return res.status(400).json({
            error: 'CPF já cadastrado para outro participante'
          });
        }
      }

      // Atualizar participante
      await Participant.update(id, participantData);
      const updatedParticipant = await Participant.findById(id);

      res.json({
        success: true,
        message: 'Participante atualizado com sucesso',
        participant: updatedParticipant
      });
    } catch (error) {
      console.error('Erro ao atualizar participante:', error);
      res.status(500).json({
        error: 'Erro ao atualizar participante'
      });
    }
  }

  // Deletar participante (apenas admin)
  async delete(req, res) {
    try {
      const { id } = req.params;

      // Verificar se participante existe
      const existing = await Participant.findById(id);
      if (!existing) {
        return res.status(404).json({
          error: 'Participante não encontrado'
        });
      }

      // Deletar participante
      await Participant.delete(id);

      res.json({
        success: true,
        message: 'Participante deletado com sucesso'
      });
    } catch (error) {
      console.error('Erro ao deletar participante:', error);
      res.status(500).json({
        error: 'Erro ao deletar participante'
      });
    }
  }

  // Obter estatísticas (apenas admin)
  async getStats(req, res) {
    try {
      const stats = await Participant.getStats();

      res.json({
        success: true,
        stats
      });
    } catch (error) {
      console.error('Erro ao obter estatísticas:', error);
      res.status(500).json({
        error: 'Erro ao obter estatísticas'
      });
    }
  }

  // Buscar participante por email ou CPF (público - para verificação)
  async checkRegistration(req, res) {
    try {
      const { email, cpf } = req.query;

      if (!email && !cpf) {
        return res.status(400).json({
          error: 'Email ou CPF deve ser fornecido'
        });
      }

      let participant = null;

      if (email) {
        participant = await Participant.findByEmail(email);
      } else if (cpf) {
        participant = await Participant.findByCPF(cpf);
      }

      if (!participant) {
        return res.json({
          success: true,
          registered: false
        });
      }

      // Retornar apenas informações básicas
      res.json({
        success: true,
        registered: true,
        participant: {
          name: participant.name,
          email: participant.email,
          category: participant.category,
          registration_date: participant.registration_date,
          status: participant.status
        }
      });
    } catch (error) {
      console.error('Erro ao verificar inscrição:', error);
      res.status(500).json({
        error: 'Erro ao verificar inscrição'
      });
    }
  }
}

module.exports = new ParticipantsController();
