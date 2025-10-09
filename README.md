# myContacts

Application Fullstack de gestion de contacts (Node.js/Express/MongoDB + React + Docker).

## Sommaire

- [Description](#description)
- [Prérequis](#prérequis)
- [Installation & Lancement](#installation--lancement)
- [Variables d’environnement](#variables-denvironnement)
- [Scripts utiles](#scripts-utiles)
- [Accès de test](#accès-de-test)
- [API Endpoints](#api-endpoints)
- [Utilisation avec Docker](#utilisation-avec-docker)
- [Structure du projet](#structure-du-projet)

---

## Description

- **Backend** : API REST Node.js/Express, authentification JWT, MongoDB, validation, tests Jest/Supertest.
- **Frontend** : React + Vite, gestion des contacts, authentification, requêtes API.
- **Docker** : Orchestration complète (MongoDB, backend, frontend, mongo-express).

---

## Prérequis

- [Node.js](https://nodejs.org/) >= 18.x
- [npm](https://www.npmjs.com/) >= 9.x
- [Docker](https://www.docker.com/) (pour l’environnement conteneurisé)
- [Git](https://git-scm.com/)

---

## Installation & Lancement

### 1. Cloner le repo

```bash
git clone <url-du-repo>
cd myContacts
```

### 2. Configurer les variables d’environnement

Copier `.env.sample` en `.env` et adapter si besoin :

```bash
cp .env.sample .env
```

### 3. Lancer en local (hors Docker)

#### Backend

```bash
cd backend
npm install
npm run dev
```

#### Frontend

```bash
cd ../frontend
npm install
npm run dev
```

#### MongoDB

- Lancer un MongoDB local ou utiliser Docker (voir plus bas).

---

## Variables d’environnement

Voir `.env.sample` pour tous les paramètres.  
Principaux à adapter :

- `APP_PORT` : port du backend (ex: 8000)
- `APP_DB_PORT` : port MongoDB (ex: 27017)
- `JWT_SECRET` : secret JWT (à personnaliser)
- `VITE_API_URL` : URL de l’API pour le frontend

---

## Scripts utiles

Dans `/backend` :

- `npm run dev` : démarre le serveur Express en mode développement
- `npm run test` : lance tous les tests Jest/Supertest
- `npm run build` : build de production (si configuré)

Dans `/frontend` :

- `npm run dev` : démarre le serveur Vite (React)
- `npm run build` : build de production

---

## Accès de test

- **Utilisateur test** :
  - Email : `testuser@example.com`
  - Mot de passe : `TestPassword123!`
- **Accès Mongo Express** :
  - URL : [http://localhost:8081](http://localhost:8081)
  - Login : `root`
  - Mot de passe : `change_me_root` (ou valeur de `.env`)

---

## API Endpoints principaux

### Auth

- `POST /api/auth/register`
  - Body : `{ "email": "...", "password": "..." }`
- `POST /api/auth/login`
  - Body : `{ "email": "...", "password": "..." }`
- `GET /api/auth/check`
  - Header : `Authorization: Bearer <token>`

### Contacts (auth requis)

- `GET /api/contacts` : liste des contacts
- `POST /api/contacts` : créer un contact
- `GET /api/contacts/:id` : récupérer un contact
- `PUT /api/contacts/:id` : modifier un contact
- `DELETE /api/contacts/:id` : supprimer un contact

---

## Utilisation avec Docker

### 1. Construire et lancer tous les services

```bash
docker-compose up --build
```

- Backend : [http://localhost:8000](http://localhost:8000)
- Frontend : [http://localhost:5173](http://localhost:5173)
- Mongo Express : [http://localhost:8081](http://localhost:8081)

### 2. Arrêter les services

```bash
docker-compose down
```

---

## Structure du projet

```
myContacts/
├── backend/         # API Node.js/Express
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── tests/
│   ├── app.js
│   ├── server.js
│   └── ...
├── frontend/        # Application React (Vite)
│   ├── src/
│   ├── public/
│   └── ...
├── docker-compose.yaml
├── .env.sample
└── README.md
```

---

## Tests

- Lancer tous les tests backend :
  ```bash
  cd backend
  npm run test
  ```
- Les tests utilisent une base MongoDB in-memory (aucun impact sur vos données réelles).

---

## Remarques

- Swagger/OpenAPI disponible sur `/api/docs` (si activé dans le backend).

---

**Contact** : Emmanuelle Curiant
