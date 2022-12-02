# Opendata

## Besoins secondaire d'une ville

###### BIAGIONI Robin, CORE Clémence, GENAY Clément, MICHEL--PICQUE Théodore, TEYSSIER Célia


## Cas pratique
Une personne déménage et cherche à se loger dans un département qu’elle ne connaît pas
Une personne déménage et cherche à se loger autour d’une adresse/ville où se déroule son nouveau travail
→ rentre le département ou l’adresse/ville et ça retourne les villes alentour les plus attrayantes.
Possibilité de modifier les critères.

## Choix des données 
Différentes données des besoins par ville (voir plus bas)
HTTP POST : note utilisateur (entre 0 et 10)

À travers notre API, nous avons souhaité mettre à disposition des données permettant de livrer un aperçu rapide de(s) : 
- la qualité du débit internet
- la qualité du gaz
- résultats scolaires au brevet et au bac
- nombre d’hectares d’agriculture biologique par commune

Ces données sont téléchargées à partir de leurs URL stables et sont transformées, mergées et stockées sur notre repo Github. Nous avons calculé un score de qualité compris entre 0 et 1 pour chacune de ces données. Ces scores sont renseignés lors de la recherche d’une ville par un utilisateur.

L’utilisateur de notre API peut également donner une note à une commune (requête “http post”). 

Les données font toutes références à un code commune. Ce code est universel, différent du code postal et correspond à l’identifiant unique d’une ville, peu importe que plusieurs villes aient le même nom ou qu’un code postal correspondent à plusieurs villes ou villages.

## Source : Data Gouv

Par ailleurs, nos sources sont récentes et donc cohérentes avec la problématique de l’utilisateur. Des données intéressantes mais trop datées n’ont pas été retenues. Idem pour des datasets ne comprenant pas de code commune. Enfin, nos différentes données couvrent à peu près le même nombre de villes.

## Différents routes sont disponibles via notre API (celles qui sont utilisées sont détaillées dans le swagger) :

- / : page d’accueil ; formulaire utilisateur. Le formulaire de recherche, bien que fonctionnel, n’a pas pu être livré à la forme finale désirée (voir incompatibilités Scalingo). Il permet de demander les nom et code postal d'une ville afin d’afficher ses caractéristiques. L'utilisateur peut aussi y rentrer une note qui sera ajoutée à celles utilisées pour la note moyenne de la ville.
- /majData : merge les json
- routes de téléchargements des données : /dlBio : télécharge les données biologiques ; /dlInternet ;
- /post : récupérer formulaire (récupérer formulaire : ville, code postal : moyenne note
- /Resultats/:commune/:CP : récupérer données en fonction de la ville et cp, renvoie à l’utilisateur vers la page des résultats
- **Grâce à notre route /get/*ville* ; l’équipe de Corentin TEYSSIER peut récupérer nos données**
- /getAll : récupère toutes les données de toutes les villes

## Git

Durant le projet, nous avons été contraints de migrer vers un second repo git à cause de la période d'essai Scalingo. De plus, travaillant jusqu’à 4 sur une seule problématique notamment en fin de projet avec des résolutions d’erreurs, nous avons échangé du code en local pour éviter des conflits. Le github n’est donc pas représentatif du travail fourni par chaque membre de l’équipe.

## Incompatibilités Scalingo

Des alert() indiquant une mauvaise saisie (champ vide par ex) dans le formulaire fonctionnent en local, mais pas sur Scalingo, sans que nous ayons pu comprendre l’origine de l’incompatibilité.
Alors qu’une auto-complétion complétant le nom de ville et son code postal fonctionne en local à partir d’un début de saisie, il a été impossible de la rendre fonctionnelle sur l’app Scalingo…, sans savoir pourquoi ? On soupçonne l'origine du problème, cf image <img src="https://www.geeksleague.be/wp-content/uploads/2010/05/PEBKAC-Preview.png" width="100" height="100">



## Pour la suite...
Nous pouvons imaginer une version améliorée du projet, avec davantage de temps et des sources de données plus complètes. En effet, avec des données plus récentes et une interface plus travaillée, les scores donnés par commune pourraient être plus précis. Une autre possibilité serait l’ajout de filtre afin de se renseigner également sur les communes aux alentours. Par exemple en entrant “ Commune : Montpellier, Distance aux alentours: 30 km”. De cette façon, si nous cherchons à emménager près de Montpellier, savoir qu’une commune aux alentours possède un meilleur score peut être une information intéressante.
Un filtre pourrait être ajouté afin d’afficher les communes ayant un score choisi par l’utilisateur, comme en choisissant d’afficher les communes ayant un bon débit internet.
