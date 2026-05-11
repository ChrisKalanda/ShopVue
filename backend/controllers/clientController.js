import pool from '../config/db.js';

export async function getProfil(req, res) {
  try {
    const [rows] = await pool.query(
      `SELECT id_client, nom, prenom, email, telephone, adresse, ville, code_postal, date_creation
       FROM client
       WHERE id_client = ?`,
      [req.client.id_client]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Client introuvable.' });
    }

    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function updateProfil(req, res) {
  try {
    const { nom, prenom, telephone, adresse, ville, code_postal } = req.body;

    await pool.query(
      `UPDATE Client
       SET nom = ?, prenom = ?, telephone = ?, adresse = ?, ville = ?, code_postal = ?
       WHERE id_client = ?`,
      [nom, prenom, telephone || null, adresse || null, ville || null, code_postal || null, req.client.id_client]
    );

    return res.json({ message: 'Profil mis à jour avec succès.' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
