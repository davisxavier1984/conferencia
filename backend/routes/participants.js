const express = require('express');
const { body, query } = require('express-validator');
const router = express.Router();
const participantsController = require('../controllers/participantsController');
const authMiddleware = require('../middleware/auth');
const validate = require('../middleware/validation');

// Validações para criar/atualizar participante
const participantValidation = [
  body('name').notEmpty().withMessage('Nome é obrigatório').trim(),
  body('email').isEmail().withMessage('Email inválido').normalizeEmail(),
  body('cpf').notEmpty().withMessage('CPF é obrigatório').matches(/^\d{11}$/).withMessage('CPF deve conter 11 dígitos'),
  body('phone').optional().trim(),
  body('address').optional().trim(),
  body('city').optional().trim(),
  body('state').optional().trim().isLength({ max: 2 }).withMessage('Estado deve ter 2 caracteres'),
  body('zipcode').optional().trim().matches(/^\d{8}$/).withMessage('CEP deve conter 8 dígitos'),
  body('category').notEmpty().withMessage('Categoria é obrigatória').trim(),
  body('organization').optional().trim(),
  body('notes').optional().trim()
];

// POST /api/participants - Criar novo participante (público)
router.post(
  '/',
  participantValidation,
  validate,
  participantsController.create
);

// GET /api/participants/check - Verificar inscrição (público)
router.get(
  '/check',
  [
    query('email').optional().isEmail().withMessage('Email inválido'),
    query('cpf').optional().matches(/^\d{11}$/).withMessage('CPF deve conter 11 dígitos')
  ],
  validate,
  participantsController.checkRegistration
);

// GET /api/participants/stats - Obter estatísticas (apenas admin)
router.get('/stats', authMiddleware, participantsController.getStats);

// GET /api/participants - Listar participantes (apenas admin)
router.get('/', authMiddleware, participantsController.list);

// GET /api/participants/:id - Buscar participante por ID (apenas admin)
router.get('/:id', authMiddleware, participantsController.getById);

// PUT /api/participants/:id - Atualizar participante (apenas admin)
router.put(
  '/:id',
  authMiddleware,
  [
    ...participantValidation,
    body('status').optional().isIn(['active', 'inactive']).withMessage('Status inválido')
  ],
  validate,
  participantsController.update
);

// DELETE /api/participants/:id - Deletar participante (apenas admin)
router.delete('/:id', authMiddleware, participantsController.delete);

module.exports = router;
