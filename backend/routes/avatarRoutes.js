import express from 'express';
import {
  getAllAvatars,
} from '../controllers/avatarController.js';

const router = express.Router();

router.get('/', getAllAvatars);

export default router;