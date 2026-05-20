import express from 'express';
import { 
  getStats,
  upsertStats 
} from '../controllers/statisticController.js';


const router = express.Router();

router.get('/', getStats);
router.post('/', upsertStats);

export default router;