import pool from '../config/db.js';

export async function getAllProduits(req, res) {
  try {
    const search = req.query.search || '';
    const categorie = req.query.categorie || '';

    let query = 'SELECT * FROM Produit WHERE 1=1';
    const params = [];

    if (search) {
      query += ' AND (nom LIKE ? OR description LIKE ? OR categorie LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (categorie) {
      const normalizedCategorie = categorie.normalize('NFD').replace(/\p{Diacritic}/gu, '') ;
      query += ' AND REPLACE(REPLACE(categorie, "é", "e"), "É", "E") = ?';
      params.push(normalizedCategorie);
    }

    query += ' ORDER BY date_ajout DESC';

    const [rows] = await pool.query(query, params);
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getProduitById(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM Produit WHERE id_produit = ?', [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Produit introuvable.' });
    }

    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function createProduit(req, res) {
  try {
    const { nom, description, prix, stock, image, categorie } = req.body;

    if (!nom || prix === undefined || stock === undefined) {
      return res.status(400).json({ message: 'Nom, prix et stock sont obligatoires.' });
    }

    const [result] = await pool.query(
      `INSERT INTO Produit (nom, description, prix, stock, image, categorie)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nom, description || null, prix, stock, image || null, categorie || null]
    );

    return res.status(201).json({ message: 'Produit ajouté avec succès.', id_produit: result.insertId });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
