import Question from '../models/questionModel.js';

export const GetQuestionsByList = async (req, res) => {
  try {
    const { listId } = req.query;

    if (!listId) {
      return res.status(400).json({ success: false, error: 'List-ID krävs för att visa listan' });
    }

    const questions = await Question.findByListId(listId);
    res.json({ success: true, data: questions });
  } catch (error) {
    console.error('getQuestionsByListId failed:', error);
    res.status(500).json({ success: false, error: 'Misslyckades att hämta frågor/ord' });
  }
}

export const createQuestions = async (req, res) => {
  try {
    const { listId, questions } = req.body;

    if (!listId || !questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ success: false, error: 'List-ID och en lista med frågor/ord behövs' });
    }

    const newQuestions = await Question.create(listId, questions);
    res.status(201).json({ success: true, data: newQuestions });
  } catch (error) {
    console.error('createQuestions failed:', error);
    res.status(500).json({ success: false, error: 'Misslyckades att skapa frågor/ord' });
  }
}

export const updateQuestion = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ success: false, error: 'Både fråga och svar behövs' });
    }

    const updatedQuestion = await Question.update(question, answer, req.params.id);

    if (!updatedQuestion) {
      return res.status(404).json({ success: false, error: 'Frågan/ordet hittades ej' });
    }
    res.json({ success: true, data: updatedQuestion});
  } catch (error) {
    console.error('updateQuestion failed:', error);
    res.status(500).json({ success: false, error: 'Misslyckades att uppdatera frågan/ordet' });
  }
}

export const deleteQuestion = async (req, res) => {
  try {
    const deleted = await Question.delete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Frågan/ordet hittades ej' });
    }
    
    res.json({ success: true, message: 'Fråga/ord raderad' });
  } catch (error) {
    console.error('deleteQuestion failed:', error);
    res.status(500).json({ success: false, error: 'Misslyckades att radera fråga/ord' });
  }
}