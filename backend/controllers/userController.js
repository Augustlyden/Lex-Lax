import User from '../models/userModel.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ success: true, data: users });
  } catch (error) {
    console.error('getAllUsers failed', error)
    res.status(500).json({ success: false, error: 'Failed to fetch users' })
  }
}

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    console.error('getUserById failed:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch user' });
  }
}

export const createUser = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ success: false, error: 'Username required' });
    }

    const newUser = await User.create(username);

    res.status(201).json({ success: true, data: newUser });

  } catch (error) {
    console.error('createUser failed', error);
    res.status(500).json({ success: false, error: 'Failed to create user' });
  }
}

export const updateUser = async (req, res) => {
  try {
    const { username, profileImg } = req.body;

    if (!username || !profileImg) {
      return res.status(400).json({ success: false, error: 'Username and profile image are required'})
    }

    const user = await User.update(req.params.id, username, profileImg);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.log('updateUser failed:', error);
    res.status(500).json({ success: false, error: 'failed to update user' });
  }
}

export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.delete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ succes: false, error: 'User not found' });
    }

    res.json({ success: true, message: 'User deleted' });
  } catch (error) {
    console.error('deleteUser failed:', error);
    res.status(500).json({ success: false, error: 'Failed to delete user' });
  }
}