import db from '../config/database.js'

export const findAll = async () => {
  const result = await db.query('SELECT * FROM subjects');
  return result.rows;
}
