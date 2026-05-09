import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getLivraisonByCommande } from '../controllers/livraisonController.js';

const router = express.Router();
router.get('/:id_commande', authMiddleware, getLivraisonByCommande);

export default router;
