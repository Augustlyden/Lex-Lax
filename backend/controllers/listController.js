import List from '../models/listModel.js';

export const getAllLists = async (req, res) => {
  try {
    const lists = await List.findAll();
    res.json({ success: true, data: lists });
  } catch (error) {
    console.error('getAllLists failed:', error);
    res.status(500).json({ success: false, error: 'Misslyckades att hämta listor' });
  }
}

export const getListById = async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ success: false, error: 'Listan hittades ej' });
    }
    res.json({ success: true, data: list });
  } catch (error) {
    console.error('getListByid failed', error);
    res.status(500).json({ success: false, error: 'Misslyckades att hämta listan' });
  }
}

export const createList = async (req, res) => {
  try {
    const { title, targetLanguage, userId, subjectId } = req.body;

    if (!title || !targetLanguage) {
      return res.status(400).json({ success: false, error: 'Titel och språk behövs' });
    }

    const existingTitle = await List.findByTitle(title, userId);
    if (existingTitle) {
      return res.status(409).json({ success: false, error: 'Titeln finns redan'});
    }

    const newList = await List.create(title, targetLanguage, userId, subjectId);
    res.status(201).json({ success: true, data: newList });
  } catch (error) {
    console.error('createList failed:', error);
    res.status(500).json({ success: false, error: 'Misslyckades att skapa lista' });
  }
}

export const updateList = async (req, res) => {
  try {
    const { title, targetLanguage } = req.body;

    if (!title || !targetLanguage) {
      return res.status(400).json({ success: false, error: 'Titel och språk behövs' });
    } 

    const currentList = await List.findById(req.params.id);
    if (!currentList) {
      return res.status(404).json({ success: false, error: 'Listan hittades ej'});
    }

    const existingTitle = await List.findByTitle(title, currentList.user_id);
    if (existingTitle && existingTitle.id !== req.params.id) {
      return res.status(409).json({ success: false, error: 'Titeln finns redan' });
    }

    const list = await List.update(title, targetLanguage, req.params.id);

    res.json({ success: true, data: list });
  } catch (error) {
    console.error('updateList failed:', error);
    res.status(500).json({ success: false, error: 'Misslyckades att uppdatera lista' });
  }
}

export const deleteList = async (req, res) => {
  try {
    const deleted = await List.delete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Listan hittades ej' });
    }

    res.json({ success: true, message: 'Lista raderad' });
  } catch (error) {
    console.error('deleteList failed:', error);
    res.status(500).json({ success: false, error: 'Misslyckades att radera lista' });
  }
}