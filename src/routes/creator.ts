import express from 'express';
import creator from '@/controllers/creator';

const router = express.Router();

router.get('/', creator.getCreators);
router.post('/', creator.createCreator);

export default router;