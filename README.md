<h1>Assignment App by Mathias et Narindra - section backend</h1>
<strong>url : https://frontmbds2021angular.herokuapp.com/</strong>
<hr>
    <p>Pour lancer il suffit de faire npm install puis npm start</p>
<hr>
<h3>Fonctionnalités clés</h3>
<li>Pour lancer il suffit de faire npm install puis ng serve</li>
<ul>
    <li>Upload des fichiers vers cloudinary (un cdn - https://cloudinary.com/) dans le cadre de l'ajout des matières (photo du prof) afin d'obtenir après un lien pour référencer les images au niveau de l'affichage</li>
    <li>Ajout d'une collection user pour les utilisateurs (dans le dossier model ) , de la validation des token avant chaque requête  , de la gestion du rôle administrateur au niveau du serveur grâce au middleware middlewares/AuthGuard</li>
    <li>Ajout d'une collection pour les matières (dans le dossier model)</li>
    <li>Ajout d'une collection pour les élèves(dans le dossier model)</li>
    <li>Ajout d'une API qui permet de peupler la base </li>
    <li>Ajout de la validation de données au niveau des modèles afin d'éviter les données invalides</li>
</ul>
<hr>
<h2>Upload des fichiers vers le cdn</h2>
<ul>
    <li>Le principe est : récupérer le blob de fichier depuis le frontend -> envoyer vers le cdn cloudinary -> obtenir un lien après -> mettre ce lien dans les assignments</li>
    <li>dans services/matieres.service.js , à la ligne 31 , on envoie l'image recue dans cloudinary en faisant usage de l'api cloudinary (api pour manipuler cloudinary depuis ses clients) et streamifier(https://github.com/gagle/node-streamifier) qui permet de transformer le blob en flux de données afin d'envoyer vers cloudinary )</li>
    <li>Sur cette même ligne, on obtient l'url de la nouvelle image ainsi uploadée </li>
    <li>J'ai utilisé ce tutoriel afin de configurer le serveur nodejs afin qu'il fonctionne avec cloudinary https://dev.to/ebereplenty/image-upload-to-cloudinary-with-nodejs-and-dotenv-4fen</li>
</ul>
