import express from 'express';
import { 
  createQuestions, 
  deleteQuestion, 
  getQuestionsByList, 
  updateQuestion 
} from '../controllers/questionController.js';


const router = express.Router();

router.get('/', getQuestionsByList);
router.post('/', createQuestions);
router.put('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);

export default router;