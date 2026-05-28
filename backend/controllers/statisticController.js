import Statistic from "../models/statisticModel.js";

export const getStats = async (req, res) => {
  try {
    // Extract filters from query parameters
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'Välj användare för att se statistik'
      });
    }

    const stats = await Statistic.findAll(userId);
    res.json({ success: true, data: stats });
  } catch (error) {
    console.error('getStats failed:', error);
    res.status(500).json({ success: false, error: 'Misslyckades att hämta statistik'});
  }
}

export const upsertStats = async (req, res) => {
  try {
    const { userId, listId, correctCount, wrongCount } = req.body;

    // Validate required fields and data types
    if (!userId || !listId || typeof correctCount !== 'number' || typeof wrongCount !== 'number') {
      return res.status(400).json({ 
        success: false, 
        error: 'Användar-ID, list-ID, samt giltiga antal för rätt och fel krävs'
      });
    }

    // Log this specific run in history before updating overall statistics
    await Statistic.createHistory(userId, listId, correctCount, wrongCount);

    // Update existing stats or insert a new entery if it's the first attempt
    const updatedStats = await Statistic.upsert(userId, listId, correctCount, wrongCount);
    res.status(200).json({ success: true, data: updatedStats });
  } catch (error) {
    console.error('upsertStats failed:', error);
    res.status(500).json({ success: false, error: 'Misslyckades att uppdatera statistik' });
  }
}

export const getHistoryByListId = async (req, res) => {
  try {
    // Extract filters from query parameters
    const { userId, listId } = req.query;

    if (!userId || !listId) {
      return res.status(400).json({ 
        success: false, 
        error: 'Både användar-ID och list-ID behövs' 
      });
    }

    const history = await Statistic.findByListId(userId, listId);
    res.json({ success: true, data: history });
  } catch (error) {
    console.error('getHistoryByListId failed:', error);
    res.status(500).json({ success: false, error: 'Misslyckades att hämta historik' });
  }
}