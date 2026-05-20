import Statistic from "../models/statisticModel.js";

export const getStats = async (req, res) => {
  try {
    const { userId, listId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'Välj användare för att se statistik'
      });
    }

    let stats;

    if (listId) {
      stats = await Statistic.findByListId(userId, listId);
    } else {
      stats = await Statistic.findAll(userId);
    }

    res.json({ success: true, data: stats });
  } catch (error) {
    console.error('getStats failed:', error);
    res.status(500).json({ success: false, error: 'Misslyckades att hämta statistik'});
  }
}

export const upsertStats = async (req, res) => {
  try {
    const { userId, listId, correctCount, wrongCount } = req.body;

    if (!userId || !listId || typeof correctCount !== 'number' || typeof wrongCount !== 'number') {
      return res.status(400).json({ 
        success: false, 
        error: 'Användar-ID, list-ID, samt giltiga antal för rätt och fel krävs'
      });
    }

    const updatedStats = await Statistic.upsert(userId, listId, correctCount, wrongCount);
    res.status(200).json({ success: true, data: updatedStats });
  } catch (error) {
    console.error('upsertStats failed:', error);
    res.status(500).json({ success: false, error: 'Misslyckades att uppdatera statistik' });
  }
}