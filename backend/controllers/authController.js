import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function register(req, res) {
  try {
    const { nom, prenom, email, mot_de_passe, telephone, adresse, ville, code_postal } = req.body;

    if (!nom || !prenom || !email || !mot_de_passe) {
      return res.status(400).json({ message: 'Veuillez remplir les champs obligatoires.' });
    }

    const [existing] = await pool.query('SELECT id_client FROM client WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    await pool.query(
      `INSERT INTO Client (nom, prenom, email, mot_de_passe, telephone, adresse, ville, code_postal)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [nom, prenom, email, hashedPassword, telephone || null, adresse || null, ville || null, code_postal || null]
    );

    return res.status(201).json({ message: 'Compte créé avec succès.' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, mot_de_passe } = req.body;

    const [rows] = await pool.query('SELECT * FROM client WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Utilisateur introuvable.' });
    }

    const client = rows[0];
    const isMatch = await bcrypt.compare(mot_de_passe, client.mot_de_passe);
    if (!isMatch) {
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    const token = jwt.sign(
      { id_client: client.id_client, email: client.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.json({
      message: 'Connexion réussie.',
      token,
      client: {
        id_client: client.id_client,
        nom: client.nom,
        prenom: client.prenom,
        email: client.email
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
