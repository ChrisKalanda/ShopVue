import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import produitRoutes from './routes/produitRoutes.js';
import commandeRoutes from './routes/commandeRoutes.js';
import factureRoutes from './routes/factureRoutes.js';
import livraisonRoutes from './routes/livraisonRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'API e-commerce active' });
});

app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/produits', produitRoutes);
app.use('/api/commandes', commandeRoutes);
app.use('/api/factures', factureRoutes);
app.use('/api/livraisons', livraisonRoutes);
app.use('/api/payments', paymentRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route introuvable.' });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Serveur lancé sur http://localhost:${process.env.PORT || 3000}`);
});
