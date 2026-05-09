import express from 'express';
import { getAllProduits, getProduitById, createProduit } from '../controllers/produitController.js';

const router = express.Router();
router.get('/', getAllProduits);
router.get('/:id', getProduitById);
router.post('/', createProduit);

export default router;
