import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getProfil, updateProfil } from '../controllers/clientController.js';

const router = express.Router();
router.get('/profil', authMiddleware, getProfil);
router.put('/profil', authMiddleware, updateProfil);

export default router;
