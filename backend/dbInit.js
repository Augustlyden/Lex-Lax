import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const initializeDatabase = async (pool) => {
  try {
    const sqlPath = path.join(__dirname, 'schema.sql');
    const sqlRaw = fs.readFileSync(sqlPath, 'utf8');

    const sqlStatements = sqlRaw
      .split(';')
      .map(query => query.trim())
      .filter(query => query.length > 0);

    for (const statement of sqlStatements) {
      await pool.query(statement);
    }
    console.log('Database tables verified/created successfully');
  } catch (error) {
    console.error('Error initializing database tables:', error.message);
  }
}