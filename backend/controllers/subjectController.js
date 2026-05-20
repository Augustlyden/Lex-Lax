import { findAll } from '../models/subjectModel.js'

export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await findAll();
    res.json({ success: true, data: subjects });
  } catch (error) {
    console.error('getAllSubjects failed', error);
    res.status(500).json({ success: false, error: 'Misslyckades att hämta ämnen' });
  }
}