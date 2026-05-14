import db from '../config/database.js'

class User {
  static async findAll() {
    const result = await db.query('SELECT * FROM users');
    return result.rows;
  }

  static async findById(id) {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(username) {
    const [result] = await db.query('INSERT INTO users (username) VALUES ($1) RETURNING *', 
      [username]
    );
    return result.rows[0];
  }
}

export default User;