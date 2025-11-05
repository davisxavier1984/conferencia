const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class AuthController {
  // Login administrativo
  async login(req, res) {
    try {
      const { password } = req.body;

      if (!password) {
        return res.status(400).json({
          error: 'Senha não fornecida'
        });
      }

      // Verificar senha
      const adminPassword = process.env.ADMIN_PASSWORD;

      if (password !== adminPassword) {
        return res.status(401).json({
          error: 'Senha incorreta'
        });
      }

      // Gerar token JWT
      const token = jwt.sign(
        {
          role: 'admin',
          timestamp: Date.now()
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN || '24h'
        }
      );

      res.json({
        success: true,
        token,
        expiresIn: process.env.JWT_EXPIRES_IN || '24h'
      });
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({
        error: 'Erro ao processar login'
      });
    }
  }

  // Verificar token
  async verify(req, res) {
    try {
      // Se chegou aqui, o token é válido (passou pelo middleware de auth)
      res.json({
        success: true,
        user: req.user
      });
    } catch (error) {
      console.error('Erro na verificação:', error);
      res.status(500).json({
        error: 'Erro ao verificar token'
      });
    }
  }

  // Renovar token
  async refresh(req, res) {
    try {
      // Gerar novo token
      const token = jwt.sign(
        {
          role: 'admin',
          timestamp: Date.now()
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN || '24h'
        }
      );

      res.json({
        success: true,
        token,
        expiresIn: process.env.JWT_EXPIRES_IN || '24h'
      });
    } catch (error) {
      console.error('Erro ao renovar token:', error);
      res.status(500).json({
        error: 'Erro ao renovar token'
      });
    }
  }
}

module.exports = new AuthController();
