import express from 'express';
import { createMember,removeMember } from '../controllers/member.controller';

const router = express.Router();

router.post('/member',createMember);
router.delete("/member/:memberId", removeMember);

export default router;