import express from 'express';
import { 
  getHistoryByListId,
  getStats,
  upsertStats 
} from '../controllers/statisticController.js';


const router = express.Router();

router.get('/', getStats);
router.get('/history', getHistoryByListId);
router.post('/', upsertStats);

export default router;