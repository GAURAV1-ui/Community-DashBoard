import express from 'express';
import { createCommunity, getCommunityUser } from '../controllers/community.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/community',verifyToken, createCommunity);
router.get('/community', verifyToken, getCommunityUser);

export default router;