import db from '../config/database.js';

class Question {
  static async findByListId(listId) {
    const result = await db.query(`
      SELECT 
        questions.id,
        questions.question,
        questions.answer,
        lists.title AS title,
        lists.target_language AS language,
        lists.created_at AS created
      FROM questions
      JOIN lists ON questions.list_id = lists.id
      WHERE questions.list_id = $1
      ORDER BY questions.id DESC;
      `, [listId]
    );
    return result.rows;
  }

  static async create(listId, questions) {
    const values = [];
    const valuePlaceholder = [];
    let counter = 1;

    // Dynamically build a single parameterized bulk INSERT query
    for (const item of questions) {
      values.push(item.question, item.answer, listId);
      // Creates placeholders, e.g., ($1, $2, $3), ($4, $5, $6)
      valuePlaceholder.push(`($${counter}, $${counter + 1}, $${counter + 2})`);
      counter += 3;
    }

    const result = await db.query(`
      INSERT INTO questions (question, answer, list_id)
      VALUES ${valuePlaceholder.join(', ')}
      RETURNING *;
      `, values
    );

    return result.rows;
  }

  static async update(question, answer, id) {
    const result = await db.query(`
      UPDATE questions
      SET question = $1, answer = $2
      WHERE id = $3
      RETURNING *;
      `, [question, answer, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query(
      'DELETE FROM questions WHERE id = $1;', [id]
    );
    return result.rowCount > 0;
  }
}

export default Question;