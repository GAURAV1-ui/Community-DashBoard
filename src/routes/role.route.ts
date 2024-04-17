import express from 'express';
 import { createUserRole, getUserRole } from '../controllers/role.controller';

const router = express.Router();

router.post('/role', createUserRole)
router.get('/role', getUserRole);

export default router;