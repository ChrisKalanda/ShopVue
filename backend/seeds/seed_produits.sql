-- Seed file pour ajouter 30+ produits de test a la table Produit
-- URLs d'images stables via placeholder.com
-- Executez ce script dans votre base MySQL apres avoir cree la table Produit.

DELETE FROM Produit;

INSERT INTO Produit (nom, description, prix, stock, image, categorie) VALUES
('Laptop HP Pavilion 15', 'Ordinateur portable performant pour le travail.', 899.99, 12, '.png?text=Laptop', 'Informatique'),
('Ecran 27 4K UHD', 'Moniteur haute resolution pour le multitache.', 349.99, 10, '.png?text=Ecran', 'Informatique'),
('Tablette 10.4 Android', 'Tablette tactile pour navigation et streaming.', 239.99, 14, '.png?text=Tablette', 'Informatique'),
('Routeur Wi-Fi 6', 'Routeur haute performance pour connexion stable.', 129.99, 16, '.png?text=Routeur', 'Informatique'),
('SSD 1To NVMe', 'Disque SSD rapide pour demarrages instantanes.', 119.99, 28, '.png?text=SSD', 'Informatique'),
('Imprimante multifonction', 'Imprimante impression scan copie.', 159.99, 9, '.png?text=Imprimante', 'Informatique'),
('Souris Logitech MX Master 3', 'Souris ergonomique sans fil.', 79.99, 25, '.png?text=Souris', 'Accessoires'),
('Clavier mecanique RGB', 'Clavier gaming retroeclaire.', 119.99, 18, '.png?text=Clavier', 'Accessoires'),
('Sac a dos gaming', 'Sac renforce pour portable.', 69.99, 30, '.png?text=Sac', 'Accessoires'),
('Montre connectee FitPro', 'Montre intelligente suivi activite.', 129.99, 15, '.png?text=Montre', 'Accessoires'),
('Station de charge USB-C', 'Station multiappareils.', 49.99, 35, '.png?text=Station', 'Accessoires'),
('Tapis de souris RGB', 'Tapis gaming eclairage RGB.', 29.99, 26, '.png?text=Tapis', 'Accessoires'),
('Casque Bluetooth ANC', 'Casque reduction bruit active.', 149.99, 20, '.png?text=Casque', 'Audio'),
('Enceinte portable JBL', 'Enceinte Bluetooth etanche.', 89.99, 22, '.png?text=Enceinte', 'Audio'),
('Casque gaming HyperX', 'Casque microphone pour jeux.', 99.99, 16, '.png?text=Gaming', 'Audio'),
('Haut-parleur stereo Bose', 'Systeme stereo haut gamme.', 199.99, 8, '.png?text=Bose', 'Audio'),
('Ecouteurs sans fil TWS', 'Ecouteurs true wireless charge.', 49.99, 40, '.png?text=Ecouteurs', 'Audio'),
('Lampe LED de bureau', 'Lampe intensite variable.', 39.99, 42, '.png?text=Lampe', 'Maison'),
('Cafetiere automatique', 'Cafetiere broyeur integre.', 229.99, 6, '.png?text=Cafe', 'Maison'),
('Thermostat intelligent', 'Thermostat connecte domotique.', 89.99, 11, '.png?text=Thermostat', 'Maison'),
('Ventilateur de plafond', 'Ventilateur telecommande.', 69.99, 9, '.png?text=Ventilateur', 'Maison'),
('Grille-pain numerique', 'Grille-pain affichage digital.', 29.99, 24, '.png?text=Grille', 'Maison'),
('Chaise ergonomique', 'Chaise bureau support lombaire.', 189.99, 7, '.png?text=Chaise', 'Bureau'),
('Chaussures de course', 'Chaussures sport running.', 99.99, 20, '.png?text=Chaussures', 'Sport'),
('Montre GPS sportive', 'Montre GPS tracker activites.', 179.99, 12, '.png?text=Montre', 'Sport'),
('Tapis de yoga', 'Tapis antiderapant yoga.', 39.99, 18, '.png?text=Yoga', 'Sport'),
('Halteres reglables', 'Set halteres musculation domicile.', 149.99, 10, '.png?text=Halteres', 'Sport'),
('Ceinture de massage', 'Ceinture massante chauffante.', 59.99, 14, '.png?text=Massage', 'Sport'),
('Smartphone Galaxy S24', 'Smartphone appareil photo qualite.', 999.99, 8, '.png?text=Smartphone', 'Téléphonie'),
('Appareil photo hybride', 'Appareil compact photos videos.', 749.99, 5, '.png?text=Photo', 'Photo');
