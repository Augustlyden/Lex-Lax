import db from '../config/database.js'

class List {
  static async findAll(subjectId, userId) {
    const result = await db.query(`
      SELECT 
        lists.id,
        lists.title,
        lists.target_language,
        lists.created_at,
        lists.user_id,
        users.username AS creator,
        subjects.subject_name AS subject
      FROM lists
      JOIN users ON lists.user_id = users.id
      JOIN subjects ON lists.subject_id = subjects.id
      WHERE lists.subject_id = $1 AND lists.user_id = $2
      ORDER BY lists.title DESC;
      `, [subjectId, userId]
    );
    return result.rows;
  }

  static async findById(id) {
    const result = await db.query(`
      SELECT 
        lists.id,
        lists.title,
        lists.target_language,
        lists.created_at,
        lists.user_id,
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

  static async findByTitle(title, userId, subjectId) {
    const result = await db.query(
      'SELECT * FROM lists WHERE title = $1 AND user_id = $2 AND subject_id = $3;', 
      [title, userId, subjectId]
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

export default List;