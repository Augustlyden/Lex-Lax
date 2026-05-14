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
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ success: true, data: user })
  } catch (error) {
    console.error('getUserById failed:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch user' })
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
    res.status(500).json({ success: false, error: 'Failed to create user' })
  }
}