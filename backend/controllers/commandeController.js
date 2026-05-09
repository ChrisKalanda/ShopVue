import pool from '../config/db.js';

export async function creerCommande(req, res) {
  const connection = await pool.getConnection();

  try {
    const { panier, livraison, mode_paiement } = req.body;
    const id_client = req.client.id_client;

    if (!Array.isArray(panier) || panier.length === 0) {
      return res.status(400).json({ message: 'Le panier est vide.' });
    }

    if (!livraison?.adresse_livraison || !livraison?.ville_livraison || !livraison?.code_postal_livraison) {
      return res.status(400).json({ message: 'Informations de livraison incomplètes.' });
    }

    await connection.beginTransaction();

    let total = 0;

    for (const item of panier) {
      const [produits] = await connection.query('SELECT * FROM Produit WHERE id_produit = ?', [item.id_produit]);
      if (produits.length === 0) {
        throw new Error(`Produit introuvable: ${item.id_produit}`);
      }

      const produit = produits[0];
      if (produit.stock < item.quantite) {
        throw new Error(`Stock insuffisant pour le produit ${produit.nom}`);
      }

      total += Number(produit.prix) * Number(item.quantite);
    }

    const [commandeResult] = await connection.query(
      `INSERT INTO Commande (id_client, total, statut)
       VALUES (?, ?, ?)`,
      [id_client, total, 'En attente']
    );

    const id_commande = commandeResult.insertId;

    for (const item of panier) {
      const [produits] = await connection.query('SELECT * FROM Produit WHERE id_produit = ?', [item.id_produit]);
      const produit = produits[0];

      await connection.query(
        `INSERT INTO Ligne_Commande (id_commande, id_produit, quantite, prix_unitaire)
         VALUES (?, ?, ?, ?)`,
        [id_commande, item.id_produit, item.quantite, produit.prix]
      );

      await connection.query(
        `UPDATE Produit SET stock = stock - ? WHERE id_produit = ?`,
        [item.quantite, item.id_produit]
      );
    }

    const statut_paiement = mode_paiement === 'À la livraison' ? 'En attente' : 'Payé';
    await connection.query(
      `INSERT INTO Facture (id_commande, montant_total, mode_paiement, statut_paiement)
       VALUES (?, ?, ?, ?)`,
      [id_commande, total, mode_paiement || 'Carte', statut_paiement]
    );

    await connection.query(
      `INSERT INTO Livraison (id_commande, adresse_livraison, ville_livraison, code_postal_livraison, date_livraison_prevue, statut_livraison)
       VALUES (?, ?, ?, ?, DATE_ADD(CURDATE(), INTERVAL 3 DAY), ?)`,
      [
        id_commande,
        livraison.adresse_livraison,
        livraison.ville_livraison,
        livraison.code_postal_livraison,
        'Préparation'
      ]
    );

    await connection.commit();
    return res.status(201).json({ message: 'Commande créée avec succès.', id_commande });
  } catch (error) {
    await connection.rollback();
    return res.status(500).json({ message: error.message });
  } finally {
    connection.release();
  }
}

export async function historiqueCommandes(req, res) {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM Commande WHERE id_client = ? ORDER BY date_commande DESC`,
      [req.client.id_client]
    );

    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getCommandeDetails(req, res) {
  try {
    const { id } = req.params;

    const [commandes] = await pool.query(
      `SELECT * FROM Commande WHERE id_commande = ? AND id_client = ?`,
      [id, req.client.id_client]
    );

    if (commandes.length === 0) {
      return res.status(404).json({ message: 'Commande introuvable.' });
    }

    const [lignes] = await pool.query(
      `SELECT lc.*, p.nom, p.image
       FROM Ligne_Commande lc
       JOIN Produit p ON p.id_produit = lc.id_produit
       WHERE lc.id_commande = ?`,
      [id]
    );

    return res.json({ commande: commandes[0], lignes });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
