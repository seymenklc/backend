import express from 'express';
import tags from '@/controllers/tag';
import isAuthenticated from '@/middleware/auth';

const router = express.Router();

router.get('/', isAuthenticated, tags.getTags);
router.get('/:id', isAuthenticated, tags.getTagById);
router.post('/', isAuthenticated, tags.createTag);

export default router;