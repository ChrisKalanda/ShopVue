import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getFactureByCommande } from '../controllers/factureController.js';

const router = express.Router();
router.get('/:id_commande', authMiddleware, getFactureByCommande);

export default router;
