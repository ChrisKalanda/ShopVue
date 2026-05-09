import pool from '../config/db.js';

export async function getLivraisonByCommande(req, res) {
  try {
    const { id_commande } = req.params;

    const [commandes] = await pool.query(
      `SELECT * FROM Commande WHERE id_commande = ? AND id_client = ?`,
      [id_commande, req.client.id_client]
    );

    if (commandes.length === 0) {
      return res.status(404).json({ message: 'Commande introuvable.' });
    }

    const [rows] = await pool.query('SELECT * FROM Livraison WHERE id_commande = ?', [id_commande]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Livraison introuvable.' });
    }

    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
