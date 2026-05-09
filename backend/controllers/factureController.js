import pool from '../config/db.js';

export async function getFactureByCommande(req, res) {
  try {
    const { id_commande } = req.params;

    const [commandes] = await pool.query(
      `SELECT * FROM Commande WHERE id_commande = ? AND id_client = ?`,
      [id_commande, req.client.id_client]
    );

    if (commandes.length === 0) {
      return res.status(404).json({ message: 'Commande introuvable.' });
    }

    const [factures] = await pool.query('SELECT * FROM Facture WHERE id_commande = ?', [id_commande]);
    if (factures.length === 0) {
      return res.status(404).json({ message: 'Facture introuvable.' });
    }

    const [lignes] = await pool.query(
      `SELECT lc.*, p.nom
       FROM Ligne_Commande lc
       JOIN Produit p ON p.id_produit = lc.id_produit
       WHERE lc.id_commande = ?`,
      [id_commande]
    );

    return res.json({ commande: commandes[0], facture: factures[0], lignes });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
