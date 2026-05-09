import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { creerCommande, historiqueCommandes, getCommandeDetails } from '../controllers/commandeController.js';

const router = express.Router();
router.post('/', authMiddleware, creerCommande);
router.get('/historique', authMiddleware, historiqueCommandes);
router.get('/:id', authMiddleware, getCommandeDetails);

export default router;
