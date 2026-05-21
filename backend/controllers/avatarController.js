import {getAllAvatars} from '../models/avatarModel.js';

export const getAllAvatarsController = async (req, res) => {
  try {
    const avatars = await getAllAvatars();
    res.json(avatars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch avatars' });
  }
};
