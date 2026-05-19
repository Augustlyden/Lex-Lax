import User from '../models/userModel.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ success: true, data: users });
  } catch (error) {
    console.error('getAllUsers failed:', error);
    res.status(500).json({ success: false, error: 'Misslyckades att hämta användare' });
  }
}

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, error: 'Användare hittades ej' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    console.error('getUserById failed:', error);
    res.status(500).json({ success: false, error: 'Misslyckades att hämta användare' });
  }
}

export const createUser = async (req, res) => {
  try {
    const { username, profileImg } = req.body;

    if (!username || !profileImg) {
      return res.status(400).json({ success: false, error: 'Användarnamn och profilbild behövs' });
    }

    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(409).json({ success: false, error: 'Användarnamnet är upptaget' });
    }

    const newUser = await User.create(username, profileImg);
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.error('createUser failed:', error);
    res.status(500).json({ success: false, error: 'Misslyckades att skapa användare' });
  }
}

export const updateUser = async (req, res) => {
  try {
    const { username, profileImg } = req.body;

    if (!username || !profileImg) {
      return res.status(400).json({ success: false, error: 'Användarnamn och profilbild behövs' })
    }

    const existingUser = await User.findByUsername(username);
    if (existingUser && existingUser.id !== req.params.id) {
      return res.status(409).json({ success: false, error: 'Användarnamnet är upptaget' })
    }

    const user = await User.update(req.params.id, username, profileImg);
    if (!user) {
      return res.status(404).json({ success: false, error: 'Användare hittades ej' });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.log('updateUser failed:', error);
    res.status(500).json({ success: false, error: 'Misslyckades att uppdatera användare' });
  }
}

export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.delete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ succes: false, error: 'Användare hittades ej' });
    }

    res.json({ success: true, message: 'Användare raderad' });
  } catch (error) {
    console.error('deleteUser failed:', error);
    res.status(500).json({ success: false, error: 'Misslyckades att radera användare' });
  }
}