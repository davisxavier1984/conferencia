const Participant = require('../models/Participant');

async function initDatabase() {
  try {
    console.log('Inicializando banco de dados...');

    // Criar tabela de participantes
    await Participant.createTable();
    console.log('✓ Tabela de participantes criada com sucesso');

    console.log('\nBanco de dados inicializado com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('Erro ao inicializar banco de dados:', error);
    process.exit(1);
  }
}

initDatabase();
