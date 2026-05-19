import db from '../config/database.js'

class List {
  static async findAll() {
    const result = await db.query(`
      SELECT 
        lists.id,
        lists.title,
        lists.target_language,
        lists.created_at,
        users.username AS creator,
        subjects.subject_name AS subject
      FROM lists
      JOIN users ON lists.user_id = users.id
      JOIN subjects ON lists.subject_id = subjects.id
      ORDER BY lists.target_language DESC;
    `);
    return result.rows;
  }

  static async findById(id) {
    const result = await db.query(`
      SELECT 
        lists.id,
        lists.title,
        lists.target_language,
        lists.created_at,
        users.username AS creator,
        subjects.subject_name AS subject
      FROM lists
      JOIN users ON lists.user_id = users.id
      JOIN subjects ON lists.subject_id = subjects.id
      WHERE lists.id = $1;
      `, [id]
    );
    return result.rows[0];
  }

  static async findByTitle(title) {
    const result = await db.query(
      'SELECT * FROM lists WHERE title = $1;', [title]
    );
    return result.rows[0];
  }

  static async create(title, targetLanguage, userId, subjectId) {
    const result = await db.query(`
      INSERT INTO lists 
        (title, target_language, user_id, subject_id)
      VALUES 
        ($1, $2, $3, $4)
      RETURNING *;  
      `, [title, targetLanguage, userId, subjectId]
    );
    return result.rows[0];
  }

  static async update(title, targetLanguage, id) {
    const result = await db.query(`
      UPDATE lists
      SET title = $1, target_language = $2
      WHERE id = $3
      RETURNING *;   
      `, [title, targetLanguage, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query(
      'DELETE FROM lists WHERE id = $1;', [id]
    );
    return result.rowCount > 0;
  }
}