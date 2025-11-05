const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // Obter token do header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: 'Token de autenticação não fornecido'
      });
    }

    // Formato: "Bearer TOKEN"
    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({
        error: 'Formato de token inválido'
      });
    }

    const token = parts[1];

    // Verificar token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          error: 'Token inválido ou expirado'
        });
      }

      // Adicionar informações do usuário à requisição
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Erro ao processar autenticação'
    });
  }
};

module.exports = authMiddleware;
