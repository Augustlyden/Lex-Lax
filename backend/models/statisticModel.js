import db from '../config/database.js';

class Statistic {
  static async findAll(userId) {
    const result = await db.query(`
      SELECT 
        us.id,
        us.correct_answers,
        us.wrong_answers,
        us.last_practiced,
        lists.title AS title,
        lists.subject_id AS subject_id,
        subjects.title AS subject_title
      FROM user_statistics us
      JOIN lists ON us.list_id = lists.id
      JOIN subjects ON lists.subject_id = subjects.id
      WHERE us.user_id = $1
      ORDER BY us.last_practiced DESC;
      `, [userId]
    );
    return result.rows;
  }

  static async upsert(userId, listId, correctCount, wrongCount) {
    const result = await db.query(`
      INSERT INTO user_statistics 
        (user_id, list_id, correct_answers, wrong_answers, last_practiced)
      VALUES ($1, $2, $3, $4, NOW())
      ON CONFLICT (user_id, list_id)
      DO UPDATE SET
        correct_answers = user_statistics.correct_answers + EXCLUDED.correct_answers,
        wrong_answers = user_statistics.wrong_answers + EXCLUDED.wrong_answers,
        last_practiced = NOW()
      RETURNING *;
      `, [userId, listId, correctCount, wrongCount]
    );
    return result.rows[0];
  }
}

export default Statistic;