import express from 'express';
import { 
  createQuestions, 
  deleteQuestion, 
  GetQuestionsByList, 
  updateQuestion 
} from '../controllers/questionController.js';


const router = express.Router();

router.get('/', GetQuestionsByList);
router.post('/', createQuestions);
router.put('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);

export default router;