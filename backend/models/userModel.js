import db from '../config/database.js'

class User {
  static async findAll() {
    const result = await db.query('SELECT * FROM users;');
    return result.rows;
  }

  static async findById(id) {
    const result = await db.query(
      'SELECT * FROM users WHERE id = $1;', [id]
    );
    return result.rows[0];
  }

  static async findByUsername(username) {
    const result = await db.query(
      'SELECT * FROM users WHERE username = $1;', [username]
    );
    return result.rows[0];
  }

  static async create(username, profileImg) {
    const result = await db.query(
      'INSERT INTO users (username, profile_img) VALUES ($1, $2) RETURNING *;',
      [username, profileImg]
    );
    return result.rows[0];
  }

  static async update(id, username, profileImg) {
    const result = await db.query(
      'UPDATE users SET username = $1, profile_img = $2 WHERE id = $3 RETURNING *;',
      [username, profileImg, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query(
      'DELETE FROM users WHERE id = $1;', [id]
    );
    return result.rowCount > 0;
  }
}

export default User;