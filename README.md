# 🎨 Image Converter - Frontend

Ce projet est le **Frontend** de l'application de conversion d'images.  
Il permet à l'utilisateur d'envoyer des fichiers ou une URL d'image pour les convertir dans différents formats et de télécharger les fichiers convertis.

## 🚀 Installation & Lancement

### 1️⃣ Cloner le dépôt et installer les dépendances

```
git clone https://github.com/ton-utilisateur/frontend-image-converter.git
cd frontend-image-converter
npm install
```

### 2️⃣ Lancer l'application

```
npm start
```

## 🛠 Fonctionnalités

📂 Upload de fichiers (sélection de plusieurs fichiers ou un dossier complet)
🌐 Conversion d'une image depuis une URL
🎨 Choix du format de conversion : WEBP, JPG, PNG, GIF
📥 Téléchargement individuel des fichiers convertis
📦 Téléchargement d'un ZIP contenant toutes les images converties
🚀 Interface simple et intuitive avec React.js

## 🔗 Connexion avec le Backend

## 📡 API Endpoints

Le backend expose plusieurs **endpoints** pour convertir et télécharger des images :

| 🛠️ **Méthode** | 🌍 **Endpoint**    | 📄 **Description**                        |
|---------------|------------------|----------------------------------------|
| **POST**      | `/convert`       | Convertit les images uploadées         |
| **POST**      | `/convert-url`   | Convertit une image depuis une URL     |
| **GET**       | `/download-zip`  | Télécharge un ZIP de toutes les images |

💡 **Remarque :** Le serveur doit être démarré à `http://localhost:5000` pour que ces endpoints soient accessibles.

Le Backend doit être lancé sur http://localhost:5000.

## 🖼️ Interface utilisateur
L'interface est développée avec React.js et stylisée avec SCSS.

## 📌 Composants principaux :
ImageConverter.jsx : Gère l'interface utilisateur et les requêtes au backend
App.js : Charge le composant ImageConverter
imageConverter.scss : Feuille de styles pour le design de l'application

## 📜 Exemple d'utilisation
Sélectionner un fichier ou une URL
Choisir le format de conversion
Lancer la conversion
Télécharger l'image convertie ou un ZIP contenant toutes les images

## 🏗️ Technologies utilisées
⚛️ React.js
🎨 SCSS
📡 Fetch API pour communiquer avec le backend
