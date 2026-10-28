# Portfolio — Louai Entamene

Mon portfolio, en français et en anglais, dans un style « néo-brutaliste » : papier crème à pointillés, bordures
épaisses, ombres décalées, une fenêtre de terminal en guise d'accueil.

Sections : accueil, à propos, parcours (dès qu'il est rempli), compétences, projets clés, contact.
Thème clair et sombre, menu adapté au téléphone, animations coupées si le système le demande.

Aucun framework, aucune étape de build : du HTML, du CSS et du JavaScript.

## Lancer en local

```bash
python -m http.server 5500
```

puis ouvrir http://localhost:5500.

## Modifier le contenu

Tout est dans [`js/data.js`](js/data.js). Un texte traduit s'écrit `{ fr: '…', en: '…' }` ; dans les paragraphes,
`**mot**` met le mot en valeur. Un champ vide masque l'élément correspondant.

- `profil` : e-mail, GitHub, LinkedIn, CV, photo, phrase de recherche, phrases tapées dans le terminal, présentation.
- `chiffres` : les trois encadrés de « À propos ».
- `parcours` : formation et expériences ; la section apparaît dès la première entrée (un modèle est en commentaire).
- `competences` : les outils par groupe ; `icone` est le nom d'une icône de [simpleicons.org](https://simpleicons.org).
- `projets` : un bloc par projet. Pour en ajouter un, copier un bloc et changer les valeurs.

Les fichiers à ajouter (photo, CV, captures d'écran des projets) vont dans un dossier `assets/` :
`photo: 'assets/photo.jpg'`, `cv: 'assets/cv.pdf'`, `image: 'assets/reflo.png'`.

## Pages projet

Chaque projet qui a un bloc `etude` a sa propre page, `projet.html?p=<id>`, reliée depuis sa carte :
problème, solution, architecture, choix techniques, défis relevés, chiffres, stack, ce que j'ai appris et la suite.
Une partie laissée vide est masquée, et la numérotation suit. Une démo vidéo se met dans `video` (fichier `.mp4`) :
elle remplace la couverture en haut de la page.

`apprentissages` est vide pour l'instant : c'est la partie à écrire avec mes propres mots.

## Couvertures

Sans capture d'écran, Reflo et le bot bâtisseur ont une couverture dessinée en HTML (`couverture: 'reflo'` ou
`'minecraft'`) ; un nouveau projet sans image affiche simplement son nom.

## Langue

Le site s'ouvre dans la langue du navigateur, puis retient le choix fait avec le bouton FR / EN.
Pour envoyer directement la version anglaise : `?lang=en` à la fin de l'adresse.

## Mettre en ligne

Le site est statique : sur GitHub, **Settings → Pages → Deploy from a branch → `main` / racine** suffit.

## Anciennes versions

`archive/version-ide/` contient la version précédente, présentée comme un éditeur de code. Elle ne sert plus au
site et peut être supprimée.
