# PROJET VM AZURE NEXT

## Description

## Installation du projet

Commencez par créer et remplir le fichier `.env` avec les configurations Azure nécessaires :

```bash
## Config Azure
JWT_SECRET=''
AZURE_CLIENT_ID=''
AZURE_TENANT_ID=''
AZURE_CLIENT_SECRET=''
AZURE_SUBSCRIPTION_ID=''
```

### Pour le faire il faudra se rendre sur le portail Azure et s'y connecter

Afin de récupérer la valeur <span style="color: #FF0000">AZURE_SUBSCRIPTION_ID</span> :

1. Dans la barre de recherche, tapez "Abonnements" et sélectionnez cette option.
2. Choisissez l'abonnement que vous souhaitez utiliser.
3. Récupérer l'ID de l'abonnement

> ID de l'abonnement --> **AZURE_SUBSCRIPTION_ID**

---

Afin de récupérer les valeurs suivantes <span style="color: #FF0000">AZURE_CLIENT_ID // AZURE_CLIENT_SECRET // AZURE_TENANT_ID</span> :

1. Dans la barre de recherche du portail Azure, tapez "Inscriptions d'applications".
2. Sélectionnez "Nouvelle inscription".
3. Configurez votre application et cliquez sur "S'inscrire".
4. Une fois dans votre application, accédez à "Certificats et secrets", puis "Nouveau secret client".
5. Assurez-vous de noter le secret lors de sa création.

> Le secret --> **AZURE_CLIENT_SECRET**

6. Ensuitre rendez vous sur "Vue d'ensemble" de votre application et récupérez y les valeurs suivantes :

> ID d'application (client) --> **AZURE_CLIENT_ID**

> ID de l'annuaire (locataire) --> **AZURE_TENANT_ID**

---

### Pour lancer le projet **manuellement** :

```bash
npm install
```

```bash
npm run dev
```

Votre serveur sera en marche sur :

> http://localhost:3000

## Connexion

Les 3 comptes utilisateurs déjà créés sont :

- **L'utilisateur qui peut choisir sa VM** :
  - _Login_ : **Admin**
  - _Password_ : **admin**
- **L'utilisateur qui peut lancer sa VM préselectionné** :
  - _Login_ : **Editor**
  - _Password_ :**editor**
- **L'utilisateur n'ayant aucun crédit**
  - _Login_ : **Viewer**
  - _Password_ : **viewer**

## Pour se connecter aux VMS

Pour ce projet, nous avons deux types de machines : les machines Windows et les machines Unix.

### Pour les machines Windows :

Pour vous connecter à une machine Windows, vous devrez utiliser RDP (Remote Desktop Protocol). Vous avez deux options :

> 1.  **Installer l'application "Microsoft Remote Desktop" disponible sur l'Apple Store.**

Pour vous connecter, récupérez l'URL à mettre dans la partie "PC Name" de l'application. Lorsque vous tenterez de vous connecter, un nom d'utilisateur et un mot de passe vous seront demandés. Assurez-vous de les renseigner également.

N'oubliez pas de sélectionner "Ask when required" au début.

> 2. **Utiliser FreeRDP, un client open-source.**

### Pour les machines Unix

Une commande s'affichera à l'écran. Il vous suffira de la copier et de la coller dans votre terminal. Un mot de passe vous sera demandé, assurez-vous de récupérer celui également affiché à l'écran.

##### Il est possible que lorsque vous tenterez de vous connecter, une erreur "Permission denied" apparaisse. Il suffira seulement d'attendre quelques secondes avant que cela fonctionne.

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

- **`hooks`:** Les hooks personnalisés utilisés dans notre application sont regroupés ici. Les hooks sont des fonctions qui nous permettent de réutiliser la logique d'état et de cycle de vie entre les composants de manière efficace.

- **`models`:** Les modèles de données de notre application sont définis dans ce dossier. Ces modèles fournissent une structure claire pour les données manipulées par l'application.

- **`services`:** Ce dossier contient les services utilisés pour interagir avec des API externes ou d'autres services. Il peut inclure des fonctions d'authentification, des clients API, des services de stockage, etc.

- **`utils`:** Les utilitaires et les fonctions utilitaires sont regroupés dans ce dossier. Cela peut inclure des fonctions de manipulation de chaînes, des fonctions de formatage de dates, des fonctions d'utilité générale, etc.

## Gestion des VMs

La gestion des vms a été faite depuis un fichier que j'ai récupérer de Github : [Sample Azure](https://github.com/Azure-Samples/js-e2e/blob/main/resources/virtual-machines/create-vm.js).
Il s'agit d'un sample fait par Microsoft Azure.

La création de la machine virtuelle débute lorsque l'utilisateur a cliqué sur le bouton **`Démarrer`** présent sur la page.

6 étapes sont lancés avant la création totale de la machine virtuelle.

#### Création :

- du groupe de ressource
- du compte de stockage
- de vnet (réseau virtuel...)
- d'une IP publique
- de l'interface réseau
- de la machine virtuelle

Si une erreur survient, la suppression se fera automatiquement après la capture de l'erreur.

Si aucune erreur n'est détécté, la VM, le groupe de ressource, etc... seront supprimés automatiquement après 10 min de vie.

> À savoir :

> - La création de la machine virtuelle prend quelques minutes (2-3min)

> - La suppression se fait 10 minutes après sa création mais elle n'est pas instantanée. Il faudra aussi attendre 2-3 minutes avant qu'elle soit totalement supprimé.

> - Si vous avez déjà atteint le nombre maximum de machines virtuelles que votre compte peut supporter, il sera inutile de tenter d'en créer une nouvelle.

# Démo :

https://drive.google.com/file/d/1H8zpAj9SEDIhNDPl52ANhoETjLxVc4QJ/view?usp=sharing
