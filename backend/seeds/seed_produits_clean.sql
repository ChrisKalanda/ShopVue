-- Seed file pour ajouter 30+ produits de test à la table Produit
-- URLs d'images stables via placeholder.com
-- Exécutez ce script dans votre base MySQL après avoir créé la table Produit.

DELETE FROM Produit;

INSERT INTO Produit (nom, description, prix, stock, image, categorie) VALUES
('Laptop HP Pavilion 15', 'Ordinateur portable performant pour le telétravail.', 899.99, 12, 'https://via.placeholder.com/600x500/0066CC/FFFFFF', 'Informatique'),
('Ecran 27 4K UHD', 'Moniteur haute resolution pour le multitache.', 349.99, 10, 'https://via.placeholder.com/600x500/FF6600/FFFFFF', 'Informatique'),
('Tablette 10.4 Android', 'Tablette tactile pour navigation et streaming.', 239.99, 14, 'https://via.placeholder.com/600x500/9933FF/FFFFFF', 'Informatique'),
('Routeur Wi-Fi 6', 'Routeur haute performance pour connexion stable.', 129.99, 16, 'https://via.placeholder.com/600x500/00CC99/FFFFFF', 'Informatique'),
('SSD 1To NVMe', 'Disque SSD rapide pour demarrages instantanes.', 119.99, 28, 'https://via.placeholder.com/600x500/CC0066/FFFFFF', 'Informatique'),
('Imprimante multifonction', 'Imprimante 3-en-1 impression scan copie.', 159.99, 9, 'https://via.placeholder.com/600x500/FF9933/FFFFFF', 'Informatique'),
('Souris Logitech MX Master 3', 'Souris ergonomique sans fil.', 79.99, 25, 'https://via.placeholder.com/600x500/333333/FFFFFF', 'Accessoires'),
('Clavier mecanique RGB', 'Clavier gaming retroeclaire.', 119.99, 18, 'https://via.placeholder.com/600x500/000000/FF00FF', 'Accessoires'),
('Sac a dos gaming', 'Sac renforce pour portable.', 69.99, 30, 'https://via.placeholder.com/600x500/333333/FFFFFF', 'Accessoires'),
('Montre connectee FitPro', 'Montre intelligente suivi activite.', 129.99, 15, 'https://via.placeholder.com/600x500/00CCFF/000000', 'Accessoires'),
('Station de charge USB-C', 'Station multiappareils.', 49.99, 35, 'https://via.placeholder.com/600x500/FFCC00/000000', 'Accessoires'),
('Tapis de souris RGB', 'Tapis gaming eclairage RGB.', 29.99, 26, 'https://via.placeholder.com/600x500/FF00FF/FFFFFF', 'Accessoires'),
('Casque Bluetooth ANC', 'Casque reduction bruit active.', 149.99, 20, 'https://via.placeholder.com/600x500/000000/FFFF00', 'Audio'),
('Enceinte portable JBL', 'Enceinte Bluetooth etanche.', 89.99, 22, 'https://via.placeholder.com/600x500/0066CC/FFFFFF', 'Audio'),
('Casque gaming HyperX', 'Casque microphone pour jeux.', 99.99, 16, 'https://via.placeholder.com/600x500/FF0000/FFFFFF', 'Audio'),
('Haut-parleur stereo Bose', 'Systeme stereo haut gamme.', 199.99, 8, 'https://via.placeholder.com/600x500/333333/FFFFFF', 'Audio'),
('Ecouteurs sans fil TWS', 'Ecouteurs true wireless charge.', 49.99, 40, 'https://via.placeholder.com/600x500/FFFFFF/000000', 'Audio'),
('Lampe LED de bureau', 'Lampe intensite variable.', 39.99, 42, 'https://via.placeholder.com/600x500/FFFF00/000000', 'Maison'),
('Cafetiere automatique', 'Cafetiere broyeur integre.', 229.99, 6, 'https://via.placeholder.com/600x500/8B4513/FFFFFF', 'Maison'),
('Thermostat intelligent', 'Thermostat connecte domotique.', 89.99, 11, 'https://via.placeholder.com/600x500/00CC66/FFFFFF', 'Maison'),
('Ventilateur de plafond', 'Ventilateur telecommande.', 69.99, 9, 'https://via.placeholder.com/600x500/CCCCCC/333333', 'Maison'),
('Grille-pain numerique', 'Grille-pain affichage digital.', 29.99, 24, 'https://via.placeholder.com/600x500/CC6600/FFFFFF', 'Maison'),
('Chaise ergonomique', 'Chaise bureau support lombaire.', 189.99, 7, 'https://via.placeholder.com/600x500/666666/FFFFFF', 'Bureau'),
('Chaussures de course', 'Chaussures sport running.', 99.99, 20, 'https://via.placeholder.com/600x500/FF3300/FFFFFF', 'Sport'),
('Montre GPS sportive', 'Montre GPS tracker activites.', 179.99, 12, 'https://via.placeholder.com/600x500/00FF00/000000', 'Sport'),
('Tapis de yoga', 'Tapis antiderapant yoga.', 39.99, 18, 'https://via.placeholder.com/600x500/FF00FF/FFFFFF', 'Sport'),
('Halteres reglables', 'Set halteres musculation domicile.', 149.99, 10, 'https://via.placeholder.com/600x500/333333/FFFF00', 'Sport'),
('Ceinture de massage', 'Ceinture massante chauffante.', 59.99, 14, 'https://via.placeholder.com/600x500/CC0000/FFFFFF', 'Sport'),
('Smartphone Galaxy S24', 'Smartphone appareil photo qualite.', 999.99, 8, 'https://via.placeholder.com/600x500/0033FF/FFFFFF', 'Téléphonie'),
('Appareil photo hybride', 'Appareil compact photos videos.', 749.99, 5, 'https://via.placeholder.com/600x500/333333/FFFF00', 'Photo');
