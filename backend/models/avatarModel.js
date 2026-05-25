import pool from "../config/database.js";
export const getAllAvatars = async () => {

    const result = await pool.query("SELECT * FROM avatars ORDER BY id ASC");
    return result.rows;
};