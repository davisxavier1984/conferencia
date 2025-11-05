const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const validate = require('../middleware/validation');

// POST /api/auth/login - Login administrativo
router.post(
  '/login',
  [
    body('password').notEmpty().withMessage('Senha é obrigatória')
  ],
  validate,
  authController.login
);

// GET /api/auth/verify - Verificar token
router.get('/verify', authMiddleware, authController.verify);

// POST /api/auth/refresh - Renovar token
router.post('/refresh', authMiddleware, authController.refresh);

module.exports = router;
