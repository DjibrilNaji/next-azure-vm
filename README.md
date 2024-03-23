Projet

## Stack Utilisée

Voici les principaux composants de notre stack :

### Framework et Langage

- **Next.js avec TypeScript :** Next.js est utilisé comme framework de développement front-end. TypeScript est intégré pour améliorer la maintenabilité et la robustesse du code.

### Styles

- **Tailwind CSS :** J'utilise Tailwind CSS comme framework CSS pour faciliter le développement et la personnalisation des styles.

### Gestion des icônes

- **React Icons :** Pour l'intégration facile d'icônes dans notre application, j'utilise React Icons.

### Authentification

- **jsonwebtoken :** Pour la gestion des tokens (JWT), j'utilise la bibliothèque jsonwebtoken. Elle permet de sécuriser les communications et de gérer l'authentification des utilisateurs de manière sécurisée.

### Intégration avec les services cloud

- **Azure SDK :** Pour l'intégration avec les services Azure, nous utilisons l'Azure SDK.

## Organisation du Code Source

Le code source de notre application est soigneusement organisé pour favoriser la lisibilité, la maintenabilité et la réutilisabilité. Voici comment nous structurons nos dossiers principaux :

### Dossiers Principaux

- **`app`:** Ce dossier contient les routes de notre projet.

- **`components`:** Les composants réutilisables de notre application sont regroupés ici. Chaque composant est soigneusement conçu pour être autonome et réutilisable, ce qui facilite le développement et la maintenance de l'application.

- **`datas`:** Ce dossier contient les données statiques utilisées dans l'application (Users, Vms...).

- **`models`:** Les modèles de données de notre application sont définis dans ce dossier. Ces modèles fournissent une structure claire pour les données manipulées par l'application.

- **`utils`:** Les utilitaires et les fonctions utilitaires sont regroupés dans ce dossier. Cela peut inclure des fonctions de manipulation de chaînes, des fonctions de formatage de dates, des fonctions d'utilité générale, etc.

- **`hooks`:** Les hooks personnalisés utilisés dans notre application sont regroupés ici. Les hooks sont des fonctions qui nous permettent de réutiliser la logique d'état et de cycle de vie entre les composants de manière efficace.

- **`services`:** Ce dossier contient les services utilisés pour interagir avec des API externes ou d'autres services. Il peut inclure des fonctions d'authentification, des clients API, des services de stockage, etc.

Gestion des VMs

La gestion des vms a été faite depuis un fichier que j'ai récupérer de Github : [Sample Azure](https://github.com/Azure-Samples/js-e2e/blob/main/resources/virtual-machines/create-vm.js). Il s'agit d'un sample fait par Microsoft Azure.

La création de la machine virtuelle se fait lorsque l'utilisateur cliquer sur le bouton **`Démarrer`**.

6 étapes dont lancés avant la création totale de la machine virtuelle.

Installation du projet

## Getting Started

First, run the development server:

```bash
npm run dev
```
