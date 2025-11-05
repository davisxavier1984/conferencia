const db = require('../config/database');

class Participant {
  // Criar tabela de participantes
  static createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS participants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        cpf TEXT UNIQUE NOT NULL,
        phone TEXT,
        address TEXT,
        city TEXT,
        state TEXT,
        zipcode TEXT,
        category TEXT NOT NULL,
        organization TEXT,
        registration_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'active',
        notes TEXT
      )
    `;

    return new Promise((resolve, reject) => {
      db.run(sql, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  // Criar novo participante
  static create(participantData) {
    const { name, email, cpf, phone, address, city, state, zipcode, category, organization, notes } = participantData;

    const sql = `
      INSERT INTO participants (name, email, cpf, phone, address, city, state, zipcode, category, organization, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    return new Promise((resolve, reject) => {
      db.run(
        sql,
        [name, email, cpf, phone || null, address || null, city || null, state || null, zipcode || null, category, organization || null, notes || null],
        function(err) {
          if (err) reject(err);
          else resolve({ id: this.lastID });
        }
      );
    });
  }

  // Buscar todos os participantes
  static findAll(filters = {}) {
    let sql = 'SELECT * FROM participants WHERE 1=1';
    const params = [];

    if (filters.category) {
      sql += ' AND category = ?';
      params.push(filters.category);
    }

    if (filters.status) {
      sql += ' AND status = ?';
      params.push(filters.status);
    }

    if (filters.search) {
      sql += ' AND (name LIKE ? OR email LIKE ? OR cpf LIKE ?)';
      const searchTerm = `%${filters.search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    sql += ' ORDER BY registration_date DESC';

    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  // Buscar participante por ID
  static findById(id) {
    const sql = 'SELECT * FROM participants WHERE id = ?';

    return new Promise((resolve, reject) => {
      db.get(sql, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  // Buscar participante por email
  static findByEmail(email) {
    const sql = 'SELECT * FROM participants WHERE email = ?';

    return new Promise((resolve, reject) => {
      db.get(sql, [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  // Buscar participante por CPF
  static findByCPF(cpf) {
    const sql = 'SELECT * FROM participants WHERE cpf = ?';

    return new Promise((resolve, reject) => {
      db.get(sql, [cpf], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  // Atualizar participante
  static update(id, participantData) {
    const { name, email, cpf, phone, address, city, state, zipcode, category, organization, status, notes } = participantData;

    const sql = `
      UPDATE participants
      SET name = ?, email = ?, cpf = ?, phone = ?, address = ?, city = ?, state = ?, zipcode = ?, category = ?, organization = ?, status = ?, notes = ?
      WHERE id = ?
    `;

    return new Promise((resolve, reject) => {
      db.run(
        sql,
        [name, email, cpf, phone, address, city, state, zipcode, category, organization, status, notes, id],
        function(err) {
          if (err) reject(err);
          else resolve({ changes: this.changes });
        }
      );
    });
  }

  // Deletar participante
  static delete(id) {
    const sql = 'DELETE FROM participants WHERE id = ?';

    return new Promise((resolve, reject) => {
      db.run(sql, [id], function(err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      });
    });
  }

  // Contar participantes
  static count(filters = {}) {
    let sql = 'SELECT COUNT(*) as total FROM participants WHERE 1=1';
    const params = [];

    if (filters.category) {
      sql += ' AND category = ?';
      params.push(filters.category);
    }

    if (filters.status) {
      sql += ' AND status = ?';
      params.push(filters.status);
    }

    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row.total);
      });
    });
  }

  // Obter estatísticas
  static getStats() {
    const sql = `
      SELECT
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active,
        COUNT(CASE WHEN status = 'inactive' THEN 1 END) as inactive,
        category,
        COUNT(*) as count_by_category
      FROM participants
      GROUP BY category
    `;

    return new Promise((resolve, reject) => {
      db.all(sql, [], (err, rows) => {
        if (err) reject(err);
        else {
          // Buscar totais gerais
          const totalSql = `
            SELECT
              COUNT(*) as total,
              COUNT(CASE WHEN status = 'active' THEN 1 END) as active,
              COUNT(CASE WHEN status = 'inactive' THEN 1 END) as inactive
            FROM participants
          `;

          db.get(totalSql, [], (err, totals) => {
            if (err) reject(err);
            else resolve({
              totals,
              byCategory: rows
            });
          });
        }
      });
    });
  }
}

module.exports = Participant;
